#!/usr/bin/env bash
# 下载构建「录入单词」离线数据所需的原始文件到 .build-data/（不入库，.gitignore 已忽略）。
#
# 用法：从仓库根目录运行  bash tools/fetch_dictionary_data.sh
# 产物（共约 93MB）：
#   .build-data/ecdict.csv            ECDICT 完整词典 CSV（66,009,548 字节）
#   .build-data/eng_sentences.tsv.bz2 Tatoeba 英语句子表（25MB）
#   .build-data/cmn_sentences.tsv.bz2 Tatoeba 普通话（cmn）句子表（1.3MB）
#   .build-data/eng-cmn_links.tsv.bz2 Tatoeba 英中翻译 ID 对照（0.5MB）
#   .build-data/pylibs/opencc         OpenCC（繁→简，build_examples.py 用）
#
# 网络经验（2026-11 实测）：raw.githubusercontent.com 对 Range/断点续传请求基本无响应，
# 直连「全新整包 GET」也只有 ~90KB/s 且经常整段挂起；gh-proxy.com 镜像实测 ~450KB/s 且
# 内容与源一致（字节数精确匹配），故作为主通道。若镜像失效再回落到：
#   - 直连 raw.githubusercontent.com/skywind3000/ECDICT/master/ecdict.csv
#   - 整仓 tar 包 https://codeload.github.com/skywind3000/ECDICT/tar.gz/refs/heads/master
#     （约 117MB，解开取 ECDICT-master/ecdict.csv）
#   - GitHub API blob 直取（sha 0e527e22e0e0d22f012b0ed251a8dddd5891773b）
# 无论哪个通道，都用「全新下载 + 停滞检测（25 秒低于 500 B/s 即放弃重来）+ 整包重试」，
# 不使用断点续传（对 GitHub raw 发 Range 请求拿不到数据）。若 URL 失效，先 HEAD 探测
# 新地址、核对字节数再替换。
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DEST="$ROOT/.build-data"
mkdir -p "$DEST"

fetch() {
  local url="$1" out="$2" want="$3"
  if [ -f "$DEST/$out" ]; then
    local size
    size="$(wc -c < "$DEST/$out" | tr -d ' ')"
    if [ "$size" = "$want" ]; then
      echo "[skip] $out 已存在且大小正确（$size 字节）"
      return 0
    fi
    echo "[redo] $out 大小不符（实际 $size，期望 $want），重新下载"
    rm -f "$DEST/$out"
  fi
  local attempt size
  for attempt in 1 2 3 4 5; do
    echo "[get ]（第 $attempt 次）$url"
    # 全新整包下载；--speed-time/--speed-limit 用于掐断挂起的连接（无数据即放弃重来）。
    if curl -fL --http1.1 --max-time 1500 --speed-time 25 --speed-limit 500 \
         -o "$DEST/$out.part" "$url"; then
      size="$(wc -c < "$DEST/$out.part" | tr -d ' ')"
      if [ "$size" = "$want" ]; then
        mv "$DEST/$out.part" "$DEST/$out"
        echo "[ok  ] $out（$size 字节）"
        return 0
      fi
      echo "[warn] 大小不符：$size ≠ $want"
    else
      echo "[warn] 连接失败或停滞，准备重试"
    fi
    rm -f "$DEST/$out.part"
    sleep 3
  done
  echo "[fail] $out 下载 5 次未成功（最后大小 ${size:-0} ≠ $want）" >&2
  return 1
}

# ECDICT（MIT 许可）：master 分支内含完整 ecdict.csv，字节数与 GitHub git/trees API 一致。
fetch "https://gh-proxy.com/https://raw.githubusercontent.com/skywind3000/ECDICT/master/ecdict.csv" \
  "ecdict.csv" "66009548"

# Tatoeba 官方导出（CC-BY 2.0 FR，部分句子 CC0）。注意普通话代码是 cmn，不是 zh/zho。
fetch "https://downloads.tatoeba.org/exports/per_language/eng/eng_sentences.tsv.bz2" \
  "eng_sentences.tsv.bz2" "24947715"
fetch "https://downloads.tatoeba.org/exports/per_language/cmn/cmn_sentences.tsv.bz2" \
  "cmn_sentences.tsv.bz2" "1260571"
fetch "https://downloads.tatoeba.org/exports/per_language/eng/eng-cmn_links.tsv.bz2" \
  "eng-cmn_links.tsv.bz2" "482470"

# build_examples.py 需要 OpenCC 把 Tatoeba 的繁体译文统一转成简体（纯 Python 实现，约 1.5MB）。
# 重新下载时再次执行即可（幂等）。
if [ ! -f "$DEST/pylibs/opencc/__init__.py" ]; then
  echo "[get ] pip3 install --target .build-data/pylibs opencc-python-reimplemented"
  python3 -m pip install --quiet --target "$DEST/pylibs" opencc-python-reimplemented
  echo "[ok  ] .build-data/pylibs/opencc"
else
  echo "[skip] .build-data/pylibs/opencc 已存在"
fi

echo
ls -l "$DEST"
echo "原始文件齐备。接下来：python3 -I tools/build_dictionary.py && python3 -I tools/build_examples.py"
echo "（build_examples.py 会自动合并 tools/gap-examples/ 里入库保管的 442 条人工补写例句，重跑不会丢）"
