#!/usr/bin/env python3
"""writing.js 中三个新插入的块（s7–s10 / m5–m8 / w5–w10）整体加 2 空格，
与原文件 2/4 空格缩进风格一致。断言失败即中止，不落盘。"""
import re

P = "/Users/wbtrex/website/localServer/node/trexwb/git/english-study/data/writing.js"
text = open(P, encoding="utf-8").read()

regions = [
    ("export const essayStructures = [", "\n];\n\nexport const modelEssays"),
    ("export const modelEssays = [", "\n];\n\nexport const writingPrompts"),
    ("export const writingPrompts = [", None),
]

for decl, end_marker in regions:
    start = text.find(decl)
    assert start != -1, decl
    if end_marker is None:
        end = text.rfind("];")
        assert end > start and text[end + 2:].strip() == "", "EOF 锚点异常"
    else:
        end = text.find(end_marker, start)
        assert end != -1, end_marker
    seg = text[start:end]
    assert seg.count("\n{") == 0 or True
    m = re.search(r"\n\{", seg)
    assert m, f"{decl} 区域内未找到 0 列 '{{' 行"
    blk_start = start + m.start() + 1
    blk = text[blk_start:end]
    # 块内不允许再出现数组闭合符
    assert "];" not in blk, "插入块内含 ];"
    lines = []
    for line in blk.split("\n"):
        lines.append("  " + line if line.strip() else line)
    text = text[:blk_start] + "\n".join(lines) + text[end:]

# 重排后不再存在 0 列的 "{" 行
assert not re.search(r"\n\{", text), "仍残留 0 列块"
open(P, "w", encoding="utf-8").write(text)
print("writing.js 重排完成")
