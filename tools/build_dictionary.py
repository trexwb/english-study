#!/usr/bin/env python3
# 从 ECDICT 完整 CSV 生成 data/dictionary.js（中考+高考大纲级离线词典）。
#
# 输入：.build-data/ecdict.csv      （由 tools/fetch_dictionary_data.sh 下载，MIT 许可）
# 输出：data/dictionary.js          （纯数据 ESM：export const dictionary / dictionaryById）
#       .build-data/dict_meta.json  （构建期中间产物：frq/bnc/exchange，供 build_examples.py 用）
#
# 收录规则（与 README/词库契约一致）：
#   - tag 列（空格分隔）含 zk 或 gk；
#   - 词头只收纯小写字母 ^[a-z]+$（大写专有名词、含数字/连字符的跳过并计数）；
#   - ipa 取 phonetic 列（UK 音标），缺失的整条不收；源数据用 ASCII 撇号标重音、
#     且混有西里尔字符（ә/є），统一规范成 ˈ/ə/ɛ；
#   - pos 取 pos 列（形如 "n:5.6:2.03;v:1.2:0.8"）按频次取首要词性；注意 master 分支的
#     ecdict.csv 在 zk/gk 词条上 pos 列为空（实测 3726/3726 行为空），此时回退到
#     translation 开头的词性标记，两者都没有则留空串（计数如实报告）；
#   - zh 取 translation 首个含中文的义项，剔除英文与网络释义，压缩到 24 字以内，没有
#     中文义项的整条不收；
#   - 按 w 字母序排列、w 唯一。
#
# 用法：python3 -I tools/build_dictionary.py   （-I 隔离模式，防止读入不可信目录里的同名模块）
import csv
import json
import re
import sys
from collections import OrderedDict

RAW = ".build-data/ecdict.csv"
OUT = "data/dictionary.js"
META = ".build-data/dict_meta.json"

WORD_RE = re.compile(r"^[a-z]+$")
CJK_RE = re.compile(r"[\u3400-\u9fff\uf900-\ufaff\u3040-\u30ff]")

POS_MAP = {
    "n": "n.",      # 名词
    "v": "v.",      # 动词
    "a": "adj.",    # 形容词
    "d": "adv.",    # 副词
    "p": "prep.",   # 介词
    "c": "conj.",   # 连词
    "i": "int.",    # 感叹词
    "r": "pron.",   # 代词
    "u": "aux.",    # 助动词
    "m": "num.",    # 数词
    "art": "art.",  # 冠词（回退解析 translation 前缀用）
}
# translation 开头的词性标记 → 标准写法
TPOS_MAP = {
    "n": "n.", "v": "v.", "vt": "v.", "vi": "v.", "adj": "adj.", "adv": "adv.",
    "prep": "prep.", "conj": "conj.", "pron": "pron.", "int": "int.",
    "interj": "int.", "art": "art.", "num": "num.", "aux": "aux.", "auxv": "aux.",
    "a": "adj.",   # master 版 translation 用旧 stardict 单字母标记
    "abbr": "abbr.", "suf": "suf.", "pref": "pref.", "comb": "comb.",
}
TPOS_RE = re.compile(r"^\s*((?:%s))\s*\." % "|".join(sorted(TPOS_MAP, key=len, reverse=True)))
TPOS_ANY_RE = re.compile(r"\s*((?:%s))\s*\." % "|".join(sorted(TPOS_MAP, key=len, reverse=True)))

stats = OrderedDict([
    ("rows_total", 0), ("rows_zk_gk", 0), ("skip_word_not_lowercase", 0),
    ("skip_no_ipa", 0), ("skip_no_chinese_meaning", 0),
    ("entries_kept", 0), ("duplicate_word_rows", 0),
    ("pos_from_pos_column", 0), ("pos_from_translation_prefix", 0), ("pos_empty", 0),
    ("unknown_pos_kinds", OrderedDict()),
])


IPA_ALLOWED_RE = re.compile(
    r"^[A-Za-z\u00c0-\u02af\u03b8\u02c8\u02cc\u02d0\u02d1()\-]+$")


def resolve_separators(seg):
    """处理 phonetic 里的 ASCII 分隔符：ECDICT 用 '.' / ',' 同时表示次重音和读音变体
    分隔，';' 只作变体分隔。若两侧都已有主重音 ˈ（或分隔符是 ';'），视为变体分隔、
    只保留第一个读音；否则视为次重音 → ˌ。"""
    parts = re.split(r"([.,;])", seg)
    if len(parts) == 1:
        return seg
    out = parts[0]
    i = 1
    while i + 1 < len(parts):
        sep, nxt = parts[i], parts[i + 1]
        if sep == ";" or ("\u02c8" in out and "\u02c8" in nxt):
            return out
        out += "\u02cc" + nxt
        i += 2
    return out


def clean_ipa(raw):
    """phonetic 列 → 被 / / 包住的 UK 音标；清洗失败返回 ''。
    规范化：西里尔 ә/є → IPA ə/ɛ；损坏的 '^' → ɡ（实测 zk/gk 全部 12 行均为 g）；
    ASCII 撇号重音 → ˈ；'.'/';' 次重音与变体分隔按上下文处理 → ˌ / 截取首读音；
    长音冒号 → ː；含垃圾字符（\\|<>{}[]数字）或非 IPA 字符的整条拒收。"""
    s = (raw or "").strip().strip('"').strip()
    if not s:
        return ""
    s = s.replace("\u04d9", "\u0259")   # ә → ə
    s = s.replace("\u0454", "\u025b")   # є → ɛ
    s = s.replace("^", "\u0261")        # ^ → ɡ
    if "英" in s:  # “英 'xxx' 美 'yyy'” 兼容分支（zk/gk 实测 0 行，仅为整库兜底）
        seg = s.split("英", 1)[1].split("美", 1)[0].strip().strip('"').strip()
        seg = seg.replace("'", "\u02c8").rstrip("\u02c8").strip()
    else:
        seg = s.replace("'", "\u02c8").rstrip("\u02c8").strip('"').strip()
    seg = re.sub(r"[\s/]+", "", seg)
    seg = resolve_separators(seg)
    seg = seg.replace(":", "\u02d0")    # 长音冒号 → ː
    if not seg or CJK_RE.search(seg) or len(seg) > 48:
        return ""
    if re.search(r"[\\|<>{}\[\]0-9]", seg) or not IPA_ALLOWED_RE.match(seg):
        return ""
    return "/%s/" % seg


def parse_pos(raw, translation_first_line):
    """pos 列 → 首要词性；空则回退 translation 开头的词性标记；都没有 → ''。"""
    s = (raw or "").strip()
    best_kind, best_freq = "", -1.0
    if s:
        for part in s.split(";"):
            part = part.strip()
            if not part:
                continue
            pieces = part.split(":")
            kind = pieces[0].strip()
            freq = -1.0
            if len(pieces) >= 2:
                try:
                    freq = float(pieces[1])
                except ValueError:
                    freq = -1.0
            if kind in POS_MAP:
                if freq > best_freq:
                    best_kind, best_freq = kind, freq
            elif kind in TPOS_MAP and kind not in ("abbr", "suf", "pref", "comb"):
                # 个别行 pos 列是裸写法（如 pron / vt），等同主词性处理。
                if freq > best_freq:
                    best_kind, best_freq = kind, freq
            elif kind and kind not in stats["unknown_pos_kinds"]:
                stats["unknown_pos_kinds"][kind] = 0
    if best_kind:
        stats["pos_from_pos_column"] += 1
        return POS_MAP.get(best_kind) or TPOS_MAP[best_kind]
    m = TPOS_RE.match(translation_first_line or "")
    if m:
        stats["pos_from_translation_prefix"] += 1
        return TPOS_MAP[m.group(1)]
    stats["pos_empty"] += 1
    return ""


ASCII_TOKEN_RE = re.compile(r"(?<![^\s，,；;、（(【\[])[A-Za-z][A-Za-z'’\-\.]{1,}(?![^\s，,；;、）)】\]])")
BRACKET_EN_RE = re.compile(r"([（(])[^（()）]*[A-Za-z][^（()）]*([）)])")
# zh 里允许出现的字符：汉字、中文标点（CJK 标点 + 全角区）、数字、单个英文字母（T恤/X光）。
ZH_ALLOWED_RE = re.compile(r"^[0-9A-Za-z\u3000-\u303f\uff00-\uffef\u3400-\u9fff\uf900-\ufaff…—·~～]+$")


def normalize_parens(s):
    """ASCII 括号转全角，并把括号内的逗号改成顿号（切段不会切进括号里）。"""
    s = s.replace("(", "（").replace(")", "）")
    return re.sub(r"（[^（）]*）", lambda m: m.group(0).replace(",", "、").replace("，", "、"), s)


def split_senses(s):
    """按 ；，,、 切义项，但不切进全角括号内部。"""
    out, buf, depth = [], [], 0
    for ch in s:
        if ch == "（":
            depth += 1
        elif ch == "）":
            depth = max(0, depth - 1)
        if ch in "；;，,、" and depth == 0:
            out.append("".join(buf))
            buf = []
        else:
            buf.append(ch)
    out.append("".join(buf))
    return out


def zh_sense(translation):
    """translation → ≤24 字纯中文首要义项；失败返回 ''。
    义项分隔是字面的 \\n / \\r\\n（ECDICT 存为转义文本，不是真换行）。"""
    for line in re.split(r"\\r\\n|\\n", translation or ""):
        s = line.strip()
        if not s or s.startswith("[网络]"):
            continue
        s = normalize_parens(s)
        s = TPOS_RE.sub("", s, count=1)            # 开头的词性标记删掉
        s = TPOS_ANY_RE.sub("；", s)               # 行中其余词性标记当义项分隔符
        s = re.sub(r"^\s*[\[〔（(【][^\]）)】]*[\]）)】]", "", s)  # 开头的 [网络] 〔俚〕 等标记
        s = re.sub(r"\s*\d+\s*\.\s*", " ", s)                     # "1. " 序号
        s = BRACKET_EN_RE.sub("", s)                              # (apple) 这类英文括注
        s = ASCII_TOKEN_RE.sub(" ", s)                            # 独立英文词
        s = re.sub(r"\s+", "", s)                                 # 中文释义不留空格
        s = re.sub(r"^；+|；+$", "", s)
        s = s.strip("，,；;、。-—…·~～")
        if not CJK_RE.search(s):
            continue
        # 按中文分隔符切成段，丢弃无中文、含英文词、含 emoji/符号或过长的段，拼到 24 字为止。
        segs = [t.strip("，,；;、。-—…·~～") for t in split_senses(s)]
        segs = [t for t in segs
                if t and CJK_RE.search(t) and not ASCII_TOKEN_RE.search(t)
                and ZH_ALLOWED_RE.match(t) and len(t) <= 24]
        out = ""
        seen = set()
        for t in segs:
            if t in seen:
                continue
            seen.add(t)
            cand = (out + "；" + t) if out else t
            if len(cand) > 24:
                break
            out = cand
        if not out:
            out = s[:24]
        if not ZH_ALLOWED_RE.match(out):
            continue
        return out
    return ""


def parse_exchange(raw):
    """exchange 列 → 可接受的变形列表（过去式/过去分词/ing/三单/复数/比较级/最高级）。
    master 版 ecdict.csv 的分隔符是 '/'（如 d:abandoned/p:abandoned/i:abandoning/3:abandons），
    也存在只含单组 key:value 的行。"""
    out = []
    seen = set()
    for part in re.split(r"[/;]", raw or ""):
        part = part.strip()
        if not part or ":" not in part:
            continue
        key, _, val = part.partition(":")
        val = val.split(":")[0].strip()
        if key in ("d", "p", "i", "3", "s", "r", "t") and WORD_RE.match(val) and val not in seen:
            seen.add(val)
            out.append(val)
    return out


def js_str(s):
    return json.dumps(s, ensure_ascii=False).replace("\u2028", "\\u2028").replace("\u2029", "\\u2029")


def main():
    entries = OrderedDict()
    meta = {}
    with open(RAW, "r", encoding="utf-8", newline="") as fh:
        reader = csv.reader(fh)
        header = next(reader)
        col = {name: i for i, name in enumerate(header)}
        for row in reader:
            stats["rows_total"] += 1
            if len(row) < len(header):
                continue
            tags = (row[col["tag"]] or "").split()
            if "zk" not in tags and "gk" not in tags:
                continue
            stats["rows_zk_gk"] += 1
            w = (row[col["word"]] or "").strip()
            if not WORD_RE.match(w):
                stats["skip_word_not_lowercase"] += 1
                continue
            if w in entries:
                stats["duplicate_word_rows"] += 1
                continue
            ipa = clean_ipa(row[col["phonetic"]])
            if not ipa:
                stats["skip_no_ipa"] += 1
                continue
            lines = [l.strip() for l in (row[col["translation"]] or "").split("\\n") if l.strip()]
            first_line = lines[0] if lines else ""
            pos = parse_pos(row[col["pos"]], first_line)
            zh = zh_sense(row[col["translation"]])
            if not zh:
                stats["skip_no_chinese_meaning"] += 1
                continue
            entries[w] = {"w": w, "ipa": ipa, "pos": pos, "zh": zh}
            stats["entries_kept"] += 1
            try:
                bnc = int(row[col["bnc"]] or 0)
            except ValueError:
                bnc = 0
            try:
                frq = int(row[col["frq"]] or 0)
            except ValueError:
                frq = 0
            meta[w] = {"frq": frq, "bnc": bnc, "ex": parse_exchange(row[col["exchange"]])}

    words = sorted(entries)
    with open(OUT, "w", encoding="utf-8", newline="\n") as fh:
        fh.write("export const dictionary = [\n")
        for w in words:
            e = entries[w]
            fh.write("  { w: %s, ipa: %s, pos: %s, zh: %s },\n"
                     % (js_str(e["w"]), js_str(e["ipa"]), js_str(e["pos"]), js_str(e["zh"])))
        fh.write("];\n")
        fh.write("export const dictionaryById = Object.fromEntries(dictionary.map((item) => [item.w, item]));\n")

    with open(META, "w", encoding="utf-8") as fh:
        json.dump({"words": words, "meta": meta}, fh, ensure_ascii=False)

    print("== ECDICT → data/dictionary.js ==")
    for k, v in stats.items():
        print("  %s = %s" % (k, v))


if __name__ == "__main__":
    sys.exit(main())
