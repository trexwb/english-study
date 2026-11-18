#!/usr/bin/env python3
"""把 epacks/ 下的内容片段合并进 data/ 主文件。

特性：
- 路径全部相对本脚本定位，仓库可整体搬动。
- 幂等：已存在的 key 会被跳过，重复运行不会产生第二份。
- 去重：片段之间 headword / id 冲突只保留第一次出现。
- 原子：某个目标文件的所有片段全部校验通过才写盘，失败不动原文件。

用法：
  python3 epacks/apply.py            # 合并 CONFIG 里登记的全部片段
  python3 epacks/apply.py --dry-run  # 只看会插入多少条
"""
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
APP = os.path.join(HERE, "..", "data")
PACKS = HERE

# 目标文件 -> [(片段文件名, 插入锚点, key 前缀正则)]
# 锚点必须在目标文件里唯一；EOF 表示插到最后一个 ]; 之前。
CONFIG = {
    "words.js": [
        ("p2-words-junior.pack", "];\n\nexport const wordById", r"w: '([^']+)'"),
        ("p2-words-junior-a.pack", "];\n\nexport const wordById", r"w: '([^']+)'"),
        ("p2-words-junior-b.pack", "];\n\nexport const wordById", r"w: '([^']+)'"),
        ("p2-words-senior.pack", "];\n\nexport const wordById", r"w: '([^']+)'"),
    ],
    "phrases.js": [
        ("p2-phrases-exam.pack", "];\n\nexport const phraseById", r"id: '([^']+)'"),
        ("p2-phrases-writing.pack", "];\n\nexport const phraseById", r"id: '([^']+)'"),
    ],
    "grammar.js": [
        ("p2-grammar-junior.pack", "];\n\nexport const grammarById", r"id: '([^']+)'"),
        ("p2-grammar-senior.pack", "];\n\nexport const grammarById", r"id: '([^']+)'"),
    ],
    "writing.js": [
        ("p3-writing-templates.pack", "];\n\nexport const modelEssays", r"id: '(s[^']+)'"),
        ("p3-writing-essays.pack", "];\n\nexport const writingPrompts", r"id: '(m[^']+)'"),
        ("p3-writing-prompts.pack", "EOF", r"id: '(w[^']+)'"),
    ],
    "examTypes.js": [
        ("p4-exam-gfill.pack", "];\n\nexport const clozes = [", r"id: '(gf[^']+)'"),
        ("p4-exam-cloze.pack", "];\n\nexport const sevenFives = [", r"id: '(uc[^']+)'"),
        ("p4-exam-seven.pack", "];\n\nexport const errorFixes = [", r"id: '(sf[^']+)'"),
        ("p4-exam-error.pack", "];\n\nexport const examItemById", r"id: '(ef[^']+)'"),
    ],
}

BANNED = ("export", "import ", "const ", "let ", "var ", "module.exports")


def split_units(text):
    """把片段切成顶层对象单元：单行条目按行，多行条目按花括号深度。"""
    units = []
    lines = text.split("\n")
    i = 0
    while i < len(lines):
        stripped = lines[i].strip()
        if not stripped:
            i += 1
            continue
        if stripped.startswith("{") and depth_of(stripped) > 0:
            block = [lines[i]]
            depth = depth_of(stripped)
            i += 1
            while i < len(lines) and depth > 0:
                block.append(lines[i])
                depth += depth_of(lines[i].strip())
                i += 1
            units.append("\n".join(block))
        else:
            units.append(lines[i])
            i += 1
    return units


def depth_of(s):
    if not s:
        return 0
    # 只统计字符串外的花括号，够用于本仓库内容（无跨行字符串）
    depth = 0
    quote = None
    prev = ""
    for ch in s:
        if quote:
            if ch == quote and prev != "\\":
                quote = None
        elif ch in "'\"":
            quote = ch
        elif ch == "{":
            depth += 1
        elif ch == "}":
            depth -= 1
        prev = ch
    return depth


def check_unit(unit, name):
    for line in unit.split("\n"):
        s = line.lstrip()
        if any(s.startswith(p) for p in BANNED):
            raise ValueError(f"{name} 含非法行: {line[:60]}")
    last = [l for l in unit.split("\n") if l.strip()][-1].rstrip()
    if not last.endswith("},"):
        raise ValueError(f"{name} 单元结尾不是 `}},`：…{last[-40:]}")
    if depth_of(unit.split("\n")[0].strip()) != 0:
        for l in unit.split("\n"):
            pass
    return last


def existing_keys(text, pattern):
    return set(re.findall(pattern, text))


def merge(fname, jobs, dry):
    path = os.path.join(APP, fname)
    with open(path, encoding="utf-8") as f:
        text = f.read()
    original = text
    report = []

    for pack_name, anchor, key_pattern in jobs:
        pack_path = os.path.join(PACKS, pack_name)
        if not os.path.exists(pack_path):
            report.append(f"  - {pack_name}: 不存在，跳过")
            continue
        raw = open(pack_path, encoding="utf-8").read().rstrip("\n")
        units = split_units(raw)
        if not units:
            raise ValueError(f"{pack_name} 是空的")

        taken = existing_keys(text, key_pattern)
        kept, dupes, broken = [], 0, []
        for unit in units:
            try:
                check_unit(unit, pack_name)
            except ValueError as e:
                broken.append(str(e))
                continue
            m = re.search(key_pattern, unit)
            if not m:
                broken.append(f"{pack_name}: 单元里找不到 key（{unit[:50]}）")
                continue
            key = m.group(1)
            if key in taken:
                dupes += 1
                continue
            taken.add(key)
            kept.append(unit)

        if broken:
            raise ValueError(f"{pack_name} 格式不合格，已中止 {fname}\n    " + "\n    ".join(broken[:10]))

        if kept:
            if anchor == "EOF":
                pos = text.rfind("];")
                if pos == -1 or text[pos + 2:].strip():
                    raise ValueError(f"{fname}: EOF 锚点不唯一")
                text = text[:pos] + "\n".join(kept) + "\n" + text[pos:]
            else:
                count = text.count(anchor)
                if count != 1:
                    raise ValueError(f"{fname}: 锚点出现 {count} 次（应为 1）: {anchor[:40]!r}")
                pos = text.find(anchor)
                text = text[:pos] + "\n".join(kept) + "\n" + text[pos:]

        report.append(
            f"  - {pack_name}: 插入 {len(kept)} 条，跳过重复 {dupes} 条，单元总数 {len(units)}"
        )

    changed = text != original
    if changed and not dry:
        with open(path, "w", encoding="utf-8") as f:
            f.write(text)
    print(f"{fname}: {'已写入' if changed and not dry else ('将写入（dry-run）' if changed else '无变化')}")
    for line in report:
        print(line)
    return changed


def main():
    dry = "--dry-run" in sys.argv
    total = 0
    for fname, jobs in CONFIG.items():
        try:
            if merge(fname, jobs, dry):
                total += 1
        except Exception as error:  # noqa: BLE001 - 直接打印给用户看
            print(f"!! {fname} 合并失败：{error}", file=sys.stderr)
            sys.exit(1)
    print(f"\n完成。改动文件 {total} 个。接着跑：node epacks/validate.mjs")


if __name__ == "__main__":
    main()
