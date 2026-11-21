// 录入生词的识别与预填：纯函数、无 React/DOM；静态依赖 data/ 下两份离线词典数据
// （构建期产物，运行期纯本地读取，不触网）。
// 契约：normalizeWord / lookupWord / breakdownWord / guessPos / isDuplicate 五个导出，
// 拆解结果满足硬不变量 parts.join('').replace(/-/g, '') === word。
// lookupWord 查找链：words → stories glossary → dictionary → examples；entry 恒为
// 七个字段：w/p/pos/zh/ex/exZh 查不到一律 ''，origin 是运行期提示字段，取
// 'builtin' | 'glossary' | 'dictionary' | 'none'，按音标/释义的实际命中来源标记
// （examples 只补例句时 origin 不变），不随保存入库。

import { dictionary } from './data/dictionary.js';
import { wordExamples } from './data/examples.js';

// 模块顶层用 Object.fromEntries 各建一张索引（与数据文件里的 *ById 同款），只建一次，
// 不随每次查找重建。
const DICTIONARY_BY_W = Object.fromEntries(dictionary.map((item) => [item.w, item]));
const EXAMPLE_BY_W = Object.fromEntries(wordExamples.map((item) => [item.w, item]));

const WORD_RE = /^[a-z]+$/;

const MISSING_NOTE = '没有找到已知词根词缀，建议按整体拼写记忆。';

// 输入归一化：只接受单个纯字母单词。多词短语、空格、数字、符号、连字符、撇号一律不合法。
export function normalizeWord(raw) {
  const word = String(raw ?? '').trim().toLowerCase();
  return WORD_RE.test(word) ? word : '';
}

// 词库查找：先内置词条（全字段），再原著 glossary（只有 w/p/zh），前两级命中照旧返回；
// 再查内置词典（音标/词性/释义），并接例句库补例句；词典也没有时例句库只补例句。
// origin 按音标/释义的实际命中来源标记；查不到的信息一律 ''，绝不返回 undefined。
export function lookupWord(word, sources) {
  const target = normalizeWord(word);
  const words = Array.isArray(sources?.words) ? sources.words : [];
  const stories = Array.isArray(sources?.stories) ? sources.stories : [];
  const builtin = words.find((item) => item && item.w === target);
  if (builtin) {
    return {
      found: true,
      entry: {
        w: target,
        p: builtin.p || '',
        pos: builtin.pos || '',
        zh: builtin.zh || '',
        ex: builtin.ex || '',
        exZh: builtin.exZh || '',
        origin: 'builtin',
      },
    };
  }
  for (const story of stories) {
    const glossary = Array.isArray(story?.glossary) ? story.glossary : [];
    const item = glossary.find((g) => g && g.w === target);
    if (item) {
      return {
        found: true,
        entry: { w: target, p: item.p || '', pos: '', zh: item.zh || '', ex: '', exZh: '', origin: 'glossary' },
      };
    }
  }
  const dictHit = DICTIONARY_BY_W[target];
  if (dictHit) {
    const example = EXAMPLE_BY_W[target];
    return {
      found: true,
      entry: {
        w: target,
        p: dictHit.ipa || '',
        pos: dictHit.pos || '',
        zh: dictHit.zh || '',
        ex: example?.en || '',
        exZh: example?.zh || '',
        origin: 'dictionary',
      },
    };
  }
  const exampleOnly = EXAMPLE_BY_W[target];
  if (exampleOnly) {
    return {
      found: true,
      entry: { w: target, p: '', pos: '', zh: '', ex: exampleOnly.en || '', exZh: exampleOnly.zh || '', origin: 'none' },
    };
  }
  return { found: false, entry: { w: target, p: '', pos: '', zh: '', ex: '', exZh: '', origin: 'none' } };
}

// 组合项（如 '-mit- / -miss-'）按 ' / ' 拆成变体各自匹配；
// 单字母变体（'-a- / an-' 的 'a'、'-y'）剔除，避免 apple 被拆成 a- + pple。
function affixVariants(affixes) {
  const variants = [];
  (Array.isArray(affixes) ? affixes : []).forEach((affix, index) => {
    const item = typeof affix?.item === 'string' ? affix.item : '';
    if (!item) return;
    for (const piece of item.split(' / ')) {
      const letters = piece.replace(/-/g, '');
      if (!WORD_RE.test(letters) || letters.length < 2) continue;
      variants.push({ letters, affix, index });
    }
  });
  return variants;
}

// 同长取 affixes 数组靠前者（稳定排序）。
function pickBest(candidates) {
  let best = null;
  for (const candidate of candidates) {
    if (!best
      || candidate.letters.length > best.letters.length
      || (candidate.letters.length === best.letters.length && candidate.index < best.index)) {
      best = candidate;
    }
  }
  return best;
}

// 每轮只吃一个词缀，优先级：① 最长前缀（余部 ≥ 1）→ ② 词干内最长词根（左右残段为 0 或 ≥ 2）→ ③ 尾段最长后缀（余部 ≥ 1）。
function matchAffix(rest, variants) {
  let best = pickBest(variants.filter((variant) => variant.affix.kind === 'prefix'
    && rest.startsWith(variant.letters)
    && rest.length > variant.letters.length));
  if (best) return { ...best, kind: 'prefix' };
  best = pickBest(variants.filter((variant) => {
    if (variant.affix.kind !== 'root') return false;
    const idx = rest.indexOf(variant.letters);
    if (idx < 0) return false;
    const left = idx;
    const right = rest.length - idx - variant.letters.length;
    return (left === 0 || left >= 2) && (right === 0 || right >= 2);
  }));
  if (best) return { ...best, kind: 'root' };
  best = pickBest(variants.filter((variant) => variant.affix.kind === 'suffix'
    && rest.endsWith(variant.letters)
    && rest.length > variant.letters.length));
  if (best) return { ...best, kind: 'suffix' };
  return null;
}

// 残段清理：≤2 字母的词干片段吸收一个相邻词缀（1 字母片段吸更长的，否则吸更短的；
// 平局吸左侧，再平局取数据序靠前），词缀字母并入词干而非删除。收敛后无词缀存活则整词返回。
function absorbShortStems(segments) {
  const list = segments.map((segment) => ({ ...segment }));
  for (;;) {
    let merged = false;
    for (let i = 0; i < list.length; i += 1) {
      const stem = list[i];
      if (stem.type !== 'stem' || stem.letters.length < 1 || stem.letters.length > 2) continue;
      const candidates = [];
      if (i > 0 && list[i - 1].type === 'affix') candidates.push({ side: 'left', segment: list[i - 1] });
      if (i < list.length - 1 && list[i + 1].type === 'affix') candidates.push({ side: 'right', segment: list[i + 1] });
      if (!candidates.length) continue;
      const pick = candidates.reduce((best, candidate) => {
        if (candidate.segment.letters.length !== best.segment.letters.length) {
          const wantLonger = stem.letters.length === 1;
          const better = wantLonger
            ? candidate.segment.letters.length > best.segment.letters.length
            : candidate.segment.letters.length < best.segment.letters.length;
          return better ? candidate : best;
        }
        if (candidate.side !== best.side) return candidate.side === 'left' ? candidate : best;
        return candidate.segment.index < best.segment.index ? candidate : best;
      }, candidates[0]);
      const letters = pick.side === 'left'
        ? pick.segment.letters + stem.letters
        : stem.letters + pick.segment.letters;
      list[i] = { type: 'stem', letters };
      list.splice(list.indexOf(pick.segment), 1);
      merged = true;
      break;
    }
    if (!merged) return list;
  }
}

// 拆解推测：最长匹配 + 残段清理。只做记忆参考，不写入词条。
export function breakdownWord(word, affixes) {
  const target = normalizeWord(word);
  if (!target) return { parts: [], note: MISSING_NOTE, related: [] };
  const variants = affixVariants(affixes);
  const left = [];
  const right = [];
  let rest = target;

  while (rest) {
    const hit = matchAffix(rest, variants);
    if (!hit) break;
    const segment = { type: 'affix', letters: hit.letters, kind: hit.kind, affix: hit.affix };
    if (hit.kind === 'prefix') {
      left.push(segment);
      rest = rest.slice(hit.letters.length);
    } else if (hit.kind === 'suffix') {
      right.unshift(segment);
      rest = rest.slice(0, rest.length - hit.letters.length);
    } else {
      const idx = rest.indexOf(hit.letters);
      if (idx > 0) left.push({ type: 'stem', letters: rest.slice(0, idx) });
      left.push(segment);
      rest = rest.slice(idx + hit.letters.length);
    }
  }

  const segments = rest ? [...left, { type: 'stem', letters: rest }, ...right] : [...left, ...right];
  const cleaned = absorbShortStems(segments);
  if (!cleaned.some((segment) => segment.type === 'affix')) {
    return { parts: [target], note: MISSING_NOTE, related: [] };
  }
  const parts = cleaned.map((segment) => {
    if (segment.type === 'stem') return segment.letters;
    if (segment.kind === 'prefix') return `${segment.letters}-`;
    if (segment.kind === 'suffix') return `-${segment.letters}`;
    return `-${segment.letters}-`;
  });
  const hits = [];
  for (const segment of cleaned) {
    if (segment.type === 'affix' && !hits.some((hit) => hit.affix.item === segment.affix.item)) {
      hits.push(segment);
    }
  }
  const related = [];
  for (const hit of hits) {
    for (const example of Array.isArray(hit.affix.words) ? hit.affix.words : []) {
      if (example === target || related.includes(example)) continue;
      related.push(example);
      if (related.length >= 3) break;
    }
    if (related.length >= 3) break;
  }
  return {
    parts,
    note: `可拆成 ${parts.join(' + ')}：${hits.map((hit) => `${hit.affix.item} 表示「${hit.affix.zh}」`).join('；')}。拆解仅供记忆参考。`,
    related,
  };
}

// 按词尾推测词性：后缀按长度降序匹配，同长保持声明顺序（n. → adj. → adv. → v.）。
// -ly 会把 friendly / lovely 判成 adv.，契约固定如此，UI 标注「推测」并允许改。
const POS_RULES = [
  ['tion', 'n.'], ['sion', 'n.'], ['ment', 'n.'], ['ness', 'n.'], ['ance', 'n.'], ['ence', 'n.'],
  ['ship', 'n.'], ['ity', 'n.'], ['er', 'n.'], ['or', 'n.'],
  ['able', 'adj.'], ['ible', 'adj.'], ['ful', 'adj.'], ['ous', 'adj.'], ['ive', 'adj.'], ['less', 'adj.'], ['ish', 'adj.'], ['al', 'adj.'],
  ['ly', 'adv.'],
  ['ize', 'v.'], ['ise', 'v.'], ['fy', 'v.'],
].sort((a, b) => b[0].length - a[0].length);

export function guessPos(word) {
  const target = normalizeWord(word);
  if (!target) return '';
  const rule = POS_RULES.find(([suffix]) => target.endsWith(suffix));
  return rule ? rule[1] : '';
}

// 重复判断：word 已存在于内置词库或自定义词列表。excludeW 只作用于自定义词表——
// 编辑态排除被编辑词条自身（改释义可保存），改名撞上内置词或其他自定义词仍拦截。
export function isDuplicate(word, words, customWords, excludeW = '') {
  const target = normalizeWord(word);
  const inWords = Array.isArray(words) && words.some((item) => item && item.w === target);
  const inCustom = Array.isArray(customWords)
    && customWords.some((item) => item && item.w === target && item.w !== excludeW);
  return inWords || inCustom;
}
