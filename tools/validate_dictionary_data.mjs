// 校验 data/dictionary.js 与 data/examples.js 的字段契约（录入单词功能依赖）。
// 用法：node tools/validate_dictionary_data.mjs   （Node ≥22 直接按 ESM 动态导入）
// 检查项：ESM 可导入、字母序、w 唯一且纯小写、音标双斜杠、zh ≤24 字含中文、
// 例句 8–25 词/首字母大写/句号问号结尾/不含中文、译文以中文标点结尾、
// w ⊆ 词典词、byId 索引与数组一致。全部通过打印 PASS 并以 0 退出，否则 FAIL 退出 1。

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dictSrc = readFileSync(path.join(root, 'data/dictionary.js'), 'utf8');
const exSrc = readFileSync(path.join(root, 'data/examples.js'), 'utf8');

const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };

const { dictionary, dictionaryById } = await import(
  'file://' + path.join(root, 'data/dictionary.js')
);
const { wordExamples, wordExampleById } = await import(
  'file://' + path.join(root, 'data/examples.js')
);

check(Array.isArray(dictionary) && dictionary.length > 0, 'dictionary 必须是非空数组');
check(Array.isArray(wordExamples), 'wordExamples 必须是数组');

const srcOk = (src, name) => {
  for (const line of src.split('\n')) check(!line.includes('\r'), `${name} 含 CR`);
};
srcOk(dictSrc, 'dictionary.js');
srcOk(exSrc, 'examples.js');

const seen = new Set();
let prev = '';
for (const e of dictionary) {
  check(typeof e.w === 'string' && /^[a-z]+$/.test(e.w), `w 非纯小写字母: ${JSON.stringify(e.w)}`);
  check(prev < e.w, `未按字母序: ${prev} → ${e.w}`);
  prev = e.w;
  check(!seen.has(e.w), `w 重复: ${e.w}`);
  seen.add(e.w);
  check(/^\/[^/]+\/$/.test(e.ipa), `ipa 未被双斜杠包住或含斜杠: ${e.w} ${e.ipa}`);
  check(typeof e.zh === 'string' && e.zh.length >= 1 && e.zh.length <= 24, `zh 长度越界: ${e.w} ${e.zh}`);
  check(/[\u3400-\u9fff]/.test(e.zh), `zh 不含中文: ${e.w} ${e.zh}`);
  check(typeof e.pos === 'string', `pos 非字符串: ${e.w}`);
}

// pos 允许空串（build_dictionary.py 对 pos 列与 translation 前缀都缺的词文档化为空串兜底）；
// 复合词性（如 hopeful 的 "adj. & n."）按 & 拆开逐段检查。
const POS_TOKEN = /^(n\.|v\.|adj\.|adv\.|prep\.|conj\.|pron\.|int\.|num\.|art\.|aux\.|abbr\.|suf\.|pref\.|comb\.|)$/;
const allowedPos = (pos) => pos.split('&').every((t) => POS_TOKEN.test(t.trim()));

const dWords = new Set(dictionary.map((e) => e.w));
check(dictionaryById && Object.keys(dictionaryById).length === dictionary.length,
  'dictionaryById 键数与 dictionary 不一致');
check(dictionary.every((e) => dictionaryById[e.w] === e), 'dictionaryById 映射与数组不一致');

check(wordExamples.length <= dictionary.length, '例句数超过词典词数');
let prevW = '';
for (const ex of wordExamples) {
  check(dWords.has(ex.w), `例句 w 不在词典中: ${ex.w}`);
  check(prevW < ex.w, `例句未按字母序: ${prevW} → ${ex.w}`);
  prevW = ex.w;
  const en = ex.en;
  const n = en.split(' ').length;
  check(n >= 8 && n <= 25, `例句词数越界(${n}): ${ex.w}`);
  check(/^[A-Z]/.test(en), `例句首字母未大写: ${ex.w}`);
  check(/[.?]$/.test(en), `例句结尾不是句号/问号: ${ex.w} ${en}`);
  check(!/[\u3400-\u9fff\u3040-\u30ff]/.test(en), `例句含中文: ${ex.w}`);
  check(/[\u3400-\u9fff]/.test(ex.zh), `译文不含中文: ${ex.w} ${ex.zh}`);
  check(/[。！？…]$/.test(ex.zh), `译文未以中文标点结尾: ${ex.w} ${ex.zh}`);
  check(allowedPos(dictionaryById[ex.w].pos), `词典 pos 超出允许集合: ${ex.w} ${dictionaryById[ex.w].pos}`);
}
check(wordExampleById && Object.keys(wordExampleById).length === wordExamples.length,
  'wordExampleById 键数与 wordExamples 不一致');
check(wordExamples.every((ex) => wordExampleById[ex.w] === ex), 'wordExampleById 映射与数组不一致');

if (failures.length) {
  console.log('FAIL');
  for (const f of failures.slice(0, 50)) console.log('  - ' + f);
  if (failures.length > 50) console.log(`  …共 ${failures.length} 条`);
  process.exit(1);
}
console.log(`PASS  dictionary=${dictionary.length}  wordExamples=${wordExamples.length}`);
