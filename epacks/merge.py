#!/usr/bin/env python3
"""把 epacks 下的内容包机械合并进 english-study 的 data 主文件。
每个 pack 只含数组元素（无 export、无方括号），插入到主文件对应数组闭合 ]; 之前。
所有断言失败即中止该文件，绝不落盘半成品。"""
import os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
APP = os.path.join(HERE, "..", "data")
PACKS = HERE

EOF_ANCHOR = "__EOF__"

CONFIG = {
    "words.js": [
        ("pack-words-main.pack", "];\n\nexport const wordById"),
        ("pack-words-school.pack", "];\n\nexport const wordById"),
    ],
    "phrases.js": [
        ("pack-phrases.pack", "];\n\nexport const phraseById"),
    ],
    "grammar.js": [
        ("pack-grammar.pack", "];\n\nexport const grammarById"),
    ],
    "reading.js": [
        ("pack-reading.pack", "];\n\nexport const storyById"),
    ],
    "writing.js": [
        ("pack-writing-templates.pack", "];\n\nexport const modelEssays"),
        ("pack-writing-essays.pack", "];\n\nexport const writingPrompts"),
        ("pack-writing-prompts.pack", EOF_ANCHOR),
    ],
}

BANNED_PREFIXES = ("export", "import ", "const ", "let ", "var ", "module.exports")


def load_pack(name):
    path = os.path.join(PACKS, name)
    if not os.path.exists(path):
        raise FileNotFoundError(f"pack 缺失: {path}")
    raw = open(path, encoding="utf-8").read()
    lines = raw.rstrip("\n").split("\n")
    nonempty = [l for l in lines if l.strip()]
    if not nonempty:
        raise ValueError(f"pack 为空: {name}")
    for l in nonempty:
        s = l.lstrip()
        if any(s.startswith(p) for p in BANNED_PREFIXES):
            raise ValueError(f"{name} 含非法行: {l[:60]}")
    last = nonempty[-1].rstrip()
    if not (last.endswith("},") or last.endswith("},")):
        raise ValueError(f"{name} 最后一个元素行尾错误: …{last[-40:]}")
    return "\n".join(lines).rstrip("\n") + "\n\n"


def insert_before(text, pack_text, anchor):
    if anchor == EOF_ANCHOR:
        pos = text.rfind("];")
        if pos == -1 or text[pos + 2:].strip() != "":
            raise ValueError("EOF 锚点不唯一或后面还有内容")
        return text[:pos] + pack_text + text[pos:]
    count = text.count(anchor)
    if count != 1:
        raise ValueError(f"锚点出现 {count} 次（应为 1）: {anchor[:40]!r}")
    pos = text.find(anchor)
    return text[:pos] + pack_text + text[pos:]


def main():
    for fname, jobs in CONFIG.items():
        fpath = os.path.join(APP, fname)
        with open(fpath, encoding="utf-8") as f:
            text = f.read()
        original = text
        applied = []
        for pack_name, anchor in jobs:
            pack_text = load_pack(pack_name)
            text = insert_before(text, pack_text, anchor)
            applied.append(pack_name)
        if text == original:
            print(f"{fname}: 无变化（pack 与锚点重合？）——跳过")
            continue
        with open(fpath, "w", encoding="utf-8") as f:
            f.write(text)
        print(f"{fname}: 已插入 {len(applied)} 个包 -> {', '.join(applied)}")


if __name__ == "__main__":
    main()
