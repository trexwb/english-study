#!/usr/bin/env python3
# 从 Tatoeba 英中平行句对为词典词头配例句，生成 data/examples.js 与缺口报告。
#
# 输入：.build-data/eng_sentences.tsv.bz2   Tatoeba 英语句子（id \t eng \t text）
#       .build-data/cmn_sentences.tsv.bz2   Tatoeba 普通话句子（id \t cmn \t text）
#       .build-data/eng-cmn_links.tsv.bz2   英中翻译 ID 对照（id \t translation_id）
#       .build-data/dict_meta.json          build_dictionary.py 的中间产物（词表 + frq/bnc/exchange）
#       tools/gap-examples/*.json           Tatoeba 未覆盖词的人工补写例句（{w, ex, exZh}，入库保管）
# 输出：data/examples.js                    （纯数据 ESM：export const wordExamples / wordExampleById）
#       .build-data/gap_report.json         （配句+合并补写后仍无例句的词 + 溢出数，供 PipelineResult 汇报）
#
# 配句规则（与数据契约一致）：
#   - 每个词典词至多一句；英文 8–25 词、首字母大写、以句号或问号结尾、不含中文；
#   - 按词边界（不区分大小写）命中词典词本身或其 exchange 变形（过去式/分词/ing/三单/
#     复数/比较级/最高级）；句子里的形位本身也是词典词时，优先算那个词（如 saw 归 saw 不归 see）；
#   - 中文译文先经 OpenCC t2s 统一转成简体（Tatoeba 原文有繁简混排），再要求含中文、
#     无英文字母、以中文标点结尾；
#   - 多候选时优先「句子里有该词原形」的句子，其次更短句（更接近常见词义），中英长度做平手裁决；
#   - 先给「只有一句可配」的词占位，再按 frq/bnc 常用度从高到低分配余词，一句不重复使用；
#   - 最后合并人工补写例句：tools/gap-examples/*.json 按 w 并入（Tatoeba 已配到的词不覆盖，
#     词典外的补写词跳过），键名对齐 ex/exZh → en/zh，两源合并后统一按 w 字母序输出；
#   - w 只取词典收录词，输出按 w 字母序排列。
#
# 依赖：pip3 install --target .build-data/pylibs opencc-python-reimplemented
#       （tools/fetch_dictionary_data.sh 已包含此步）
#
# 用法：python3 -I tools/build_examples.py   （从仓库根目录运行）
import bz2
import io
import json
import os
import re
import sys

DIR = ".build-data"
ENG = DIR + "/eng_sentences.tsv.bz2"
CMN = DIR + "/cmn_sentences.tsv.bz2"
LINKS = DIR + "/eng-cmn_links.tsv.bz2"
META = DIR + "/dict_meta.json"
OUT = "data/examples.js"
GAP = DIR + "/gap_report.json"
GAP_DIR = "tools/gap-examples"

GAP_LIMIT = 1200

CJK_RE = re.compile(r"[\u3400-\u9fff\uf900-\ufaff\u3040-\u30ff]")
LATIN_RE = re.compile(r"[A-Za-z]")
ZH_END = tuple("。！？…")
TOKEN_RE = re.compile(r"[a-z]+")

stats = {
    "link_pairs": 0, "pairs_resolved": 0,
    "pairs_rejected_zh": 0, "pairs_rejected_en": 0,
    "eng_sentences_streamed": 0, "eng_sentences_needed": 0,
    "candidate_pairs": 0, "words_with_candidates": 0,
    "words_with_single_candidate": 0, "examples_written": 0,
    "gap_words": 0, "gap_overflow": 0,
    "gap_source_files": 0, "gap_entries_merged": 0,
    "gap_skipped_covered": 0, "gap_skipped_not_in_dict": 0,
}


def load_t2s():
    """OpenCC 位于 .build-data/pylibs（-I 隔离模式不自动加 sys.path，手动挂载）。
    放在函数里而不是模块顶层，本模块才能被单测按函数粒度导入。"""
    sys.path.insert(0, ".build-data/pylibs")
    try:
        from opencc import OpenCC
        return OpenCC("t2s")
    except ImportError as exc:  # pragma: no cover
        sys.exit("缺少 opencc：先运行 bash tools/fetch_dictionary_data.sh（pip 装 .build-data/pylibs）：%s" % exc)


def read_bz2_lines(path):
    with bz2.open(path, "rt", encoding="utf-8", errors="replace") as fh:
        for line in fh:
            yield line.rstrip("\n")


def fix_text(s):
    return re.sub(r"\s+", " ", s.replace("\t", " ")).strip()


def zh_ok(s):
    if not s or len(s) > 60:
        return False
    if not CJK_RE.search(s) or LATIN_RE.search(s):
        return False
    return s.endswith(ZH_END)


def en_ok(s):
    if not s or len(s) < 10:
        return False
    if CJK_RE.search(s) or "\t" in s:
        return False
    if not ("A" <= s[0] <= "Z"):
        return False
    if not (s.endswith(".") or s.endswith("?")):
        return False
    n = len(s.split(" "))
    return 8 <= n <= 25


def load_dictionary_meta():
    with open(META, "r", encoding="utf-8") as fh:
        data = json.load(fh)
    words = data["words"]
    meta = data["meta"]
    word_set = set(words)
    variant_map = {}
    for w in words:
        for form in meta.get(w, {}).get("ex", []):
            if form != w and form not in variant_map:
                variant_map[form] = w
    return words, word_set, variant_map, meta


def load_gap_examples():
    """tools/gap-examples/*.json（文件名序即优先级）→ {w: (en, zh)}；
    键名对齐 ex/exZh → en/zh，w 重复先到先得，缺字段的条目跳过；
    目录不存在（首次构建/老仓库）返回空表，主流程只输出 Tatoeba 配句结果。"""
    out = {}
    if not os.path.isdir(GAP_DIR):
        return out
    for name in sorted(os.listdir(GAP_DIR)):
        if not name.endswith(".json"):
            continue
        with open(os.path.join(GAP_DIR, name), "r", encoding="utf-8") as fh:
            items = json.load(fh)
        stats["gap_source_files"] += 1
        for item in items:
            w = str(item.get("w", "")).strip()
            if w and w not in out and isinstance(item.get("ex"), str) and isinstance(item.get("exZh"), str):
                out[w] = (item["ex"], item["exZh"])
    return out


def merge_gap_examples(assigned, pool_en, pool_zh, word_set, gap_entries):
    """Tatoeba 配句结果（assigned: w → pool 下标）+ 补写条目 → {w: (en, zh)}。
    已配句的词不覆盖（Tatoeba 优先），词典外的补写词跳过，计入 stats 供对账。"""
    merged = {w: (pool_en[idx], pool_zh[idx]) for w, idx in assigned.items()}
    for w, (en, zh) in gap_entries.items():
        if w not in word_set:
            stats["gap_skipped_not_in_dict"] += 1
        elif w in merged:
            stats["gap_skipped_covered"] += 1
        else:
            merged[w] = (en, zh)
            stats["gap_entries_merged"] += 1
    return merged


def resolve_links(cmn_texts):
    """links 行是 (id, translation_id) 无向对；用 cmn 侧 id 集合定出哪边是中文。"""
    pairs = []
    for line in read_bz2_lines(LINKS):
        parts = line.split("\t")
        if len(parts) != 2:
            continue
        try:
            a, b = int(parts[0]), int(parts[1])
        except ValueError:
            continue
        stats["link_pairs"] += 1
        if b in cmn_texts:
            pairs.append((a, b))
        elif a in cmn_texts:
            pairs.append((b, a))
        else:
            continue
        stats["pairs_resolved"] += 1
    return pairs


def main():
    t2s = load_t2s()
    words, word_set, variant_map, meta = load_dictionary_meta()

    # 1) 中文句子全量读入（cmn 只有 1.3MB 压缩）。
    cmn_texts = {}
    for line in read_bz2_lines(CMN):
        parts = line.split("\t")
        if len(parts) >= 3:
            cmn_texts[int(parts[0])] = t2s.convert(fix_text(parts[2]))
    print("cmn sentences loaded: %d" % len(cmn_texts))

    # 2) 解析英中 ID 对，得到需要的英语句子 id。
    pairs = resolve_links(cmn_texts)
    needed = set(en_id for en_id, _ in pairs)
    print("links: %d, resolved en-cmn pairs: %d" % (stats["link_pairs"], stats["pairs_resolved"]))

    # 3) 流式读英语句子，只留被引用的。
    eng_texts = {}
    for line in read_bz2_lines(ENG):
        parts = line.split("\t")
        if len(parts) < 3:
            continue
        stats["eng_sentences_streamed"] += 1
        sid = int(parts[0])
        if sid in needed:
            t = fix_text(parts[2])
            if t:
                eng_texts[sid] = t
                stats["eng_sentences_needed"] += 1
    print("eng sentences streamed: %d, kept (linked to cmn): %d"
          % (stats["eng_sentences_streamed"], stats["eng_sentences_needed"]))

    # 4) 生成候选句池并按词归组。
    pool_en, pool_zh, pool_nw = [], [], []
    candidates = {w: [] for w in words}
    for en_id, zh_id in pairs:
        en = eng_texts.get(en_id)
        zh = cmn_texts.get(zh_id)
        if not en or not zh:
            continue
        if not zh_ok(zh):
            stats["pairs_rejected_zh"] += 1
            continue
        if not en_ok(en):
            stats["pairs_rejected_en"] += 1
            continue
        idx = len(pool_en)
        pool_en.append(en)
        pool_zh.append(zh)
        pool_nw.append(len(en.split(" ")))
        tokens = TOKEN_RE.findall(en.lower())
        matched = set()
        for tok in tokens:
            if tok in word_set:
                matched.add(tok)          # 原形本身是词典词 → 只算它
            elif tok in variant_map:
                matched.add(variant_map[tok])
        for w in matched:
            candidates[w].append(idx)
            stats["candidate_pairs"] += 1

    with_cand = [w for w in words if candidates[w]]
    stats["words_with_candidates"] = len(with_cand)
    stats["words_with_single_candidate"] = sum(1 for w in with_cand if len(candidates[w]) == 1)
    print("dictionary words: %d, with candidates: %d (single-candidate: %d)"
          % (len(words), stats["words_with_candidates"], stats["words_with_single_candidate"]))

    # 5) 分配：先占位单候选词，再按常用度分配多候选词。一句只用一次
    #    （Tatoeba 里有不同 id 的重复句子，所以除 id 外再按文本去重）。
    assigned = {}
    used = set()
    used_texts = set()

    def rank_pool(w):
        # 原形命中 > 句子更短 > 句子更短（字符） > 字典序稳定
        exact = []
        wlow = w
        variants = set(meta.get(w, {}).get("ex", []))
        for idx in candidates[w]:
            toks = set(TOKEN_RE.findall(pool_en[idx].lower()))
            exact.append(0 if wlow in toks else 1)
        order = sorted(range(len(candidates[w])),
                       key=lambda k: (exact[k], pool_nw[candidates[w][k]],
                                      len(pool_en[candidates[w][k]]), pool_en[candidates[w][k]]))
        return [candidates[w][k] for k in order]

    ranked = {w: rank_pool(w) for w in with_cand}

    for w in with_cand:
        if len(ranked[w]) == 1:
            idx = ranked[w][0]
            if idx not in used and pool_en[idx] not in used_texts:
                used.add(idx)
                used_texts.add(pool_en[idx])
                assigned[w] = idx

    def commonness(w):
        frq = meta.get(w, {}).get("frq", 0) or 0
        bnc = meta.get(w, {}).get("bnc", 0) or 0
        return (frq if frq > 0 else 10 ** 9, frq, bnc if bnc > 0 else 10 ** 9, bnc, w)

    for w in sorted((x for x in with_cand if x not in assigned), key=commonness):
        for idx in ranked[w]:
            if idx not in used and pool_en[idx] not in used_texts:
                used.add(idx)
                used_texts.add(pool_en[idx])
                assigned[w] = idx
                break

    # 6) 合并人工补写例句并输出 examples.js：Tatoeba 配句结果 + tools/gap-examples/ 补写条目
    #    按 w 并入（已配句的词不覆盖），统一按字母序、按既有 json.dumps 行格式输出。
    merged = merge_gap_examples(assigned, pool_en, pool_zh, word_set, load_gap_examples())
    example_words = sorted(merged)
    with open(OUT, "w", encoding="utf-8", newline="\n") as fh:
        fh.write("export const wordExamples = [\n")
        for w in example_words:
            en, zh = merged[w]
            fh.write("  { w: %s, en: %s, zh: %s },\n"
                     % (json.dumps(w, ensure_ascii=False),
                        json.dumps(en, ensure_ascii=False),
                        json.dumps(zh, ensure_ascii=False)))
        fh.write("];\n")
        fh.write("export const wordExampleById = Object.fromEntries(wordExamples.map((item) => [item.w, item]));\n")
    stats["examples_written"] = len(example_words)

    # 7) 缺口：配句 + 合并补写之后仍没有例句的词，按 frq/bnc 常用度（越小越常用）排序。
    gap = [w for w in words if w not in merged]
    gap.sort(key=commonness)
    stats["gap_words"] = min(len(gap), GAP_LIMIT)
    stats["gap_overflow"] = max(0, len(gap) - GAP_LIMIT)
    with open(GAP, "w", encoding="utf-8") as fh:
        json.dump({"gapWords": gap[:GAP_LIMIT], "gapOverflow": stats["gap_overflow"],
                   "gapTotal": len(gap)}, fh, ensure_ascii=False, indent=1)

    print("== Tatoeba → data/examples.js ==")
    for k, v in stats.items():
        print("  %s = %s" % (k, v))


if __name__ == "__main__":
    sys.exit(main())
