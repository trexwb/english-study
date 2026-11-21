#!/usr/bin/env node
// 内容校验：把 data/*.js 的源码求值成对象，逐条断言渲染层依赖的字段契约。
// 只做一次性静态检查，不启动应用、不联网、不读写 localStorage。
// 用法：node epacks/validate.mjs
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const MODULES = {
  'data/words.js': ['decks', 'words'],
  'data/phrases.js': ['phraseGroups', 'phrases'],
  'data/grammar.js': ['grammarLessons'],
  'data/reading.js': ['stories'],
  'data/writing.js': ['essayStructures', 'modelEssays', 'writingPrompts'],
  'data/knowledge.js': ['knowledgeTabs', 'irregularVerbs', 'affixes', 'confusables', 'wordForms'],
  'data/examTypes.js': ['examTabs', 'grammarFills', 'clozes', 'sevenFives', 'errorFixes'],
};

const errors = [];
const notes = [];
const fail = (where, msg) => errors.push(`${where}: ${msg}`);

function load(rel, names) {
  const file = path.join(ROOT, rel);
  const src = readFileSync(file, 'utf8').replace(/^export /gm, '');
  const body = `${src}\nreturn { ${names.join(', ')} };`;
  // eslint-disable-next-line no-new-func
  return new Function(body)();
}

// 解析点名了某个选项、却不是标记为正确的那个：说明 a 下标或解析写错了。
const AUX_PREFIX = /^(?:to|am|is|are|was|were|be|been|being|have|has|had|having|will|would|shall|should|can|could|may|might|must|need|not)\s+/;
// 解析里常写词干（see / visit / modern）或带助动词的完整形式，比较前先归一到词干。
function lemma(t) {
  let s = String(t).toLowerCase().replace(/[’']/g, "'").replace(/n't/g, '').replace(/\s+/g, ' ').trim();
  let prev;
  do { prev = s; s = s.replace(AUX_PREFIX, ''); } while (s !== prev);
  s = s.replace(/(ing|ed|en|es|s)$/, '');
  if (/([bdgklmnprstv])\1$/.test(s)) s = s.slice(0, -1);
  return s;
}
const REJECT_MARK = /相反|不符|不对|不是|而非|排除|不合|对照|对比|错误|干扰/;
function answerMismatch(opts, a, explain) {
  if (!Array.isArray(opts) || !explain || !Number.isInteger(a) || !opts[a]) return null;
  const norm = (t) => String(t).toLowerCase().replace(/[’']/g, "'").replace(/\s+/g, ' ').trim();
  const text = norm(explain);
  const right = lemma(opts[a]);
  const sameFamily = (o) => {
    const l = lemma(o);
    return l === right || (Math.min(l.length, right.length) >= 3 && (l.startsWith(right) || right.startsWith(l)));
  };
  if (text.includes(norm(opts[a]))) return null;
  // 解析明确把某选项判为错项时，点名它不算答案不一致。
  if (REJECT_MARK.test(explain)) return null;
  const named = opts.filter((o, i) => i !== a && norm(o).length > 2 && text.includes(norm(o)) && !sameFamily(o));
  return named.length ? named.join(' / ') : null;
}

// 例句必须真的用到这个词（含常见变形与不规则三态），否则学生背不到语境。
const IRREGULAR_EXTRA = {
  be: ['am', 'is', 'are', 'was', 'were', 'been', 'being'],
  have: ['has', 'had', 'having'],
  do: ['does', 'did', 'done', 'doing'],
  go: ['goes', 'went', 'gone', 'going'],
  can: ['could'],
  will: ['would'],
  shall: ['should'],
  may: ['might'],
};
function exampleForms(w, verbs) {
  const forms = new Set([w, `${w}s`, `${w}es`, `${w}ed`, `${w}d`, `${w}ing`,
    w.replace(/e$/, '') + 'ing', w.replace(/y$/, 'ied'), w.replace(/([^aeiou])y$/, '$1ies')]);
  if (/[^aeiou][aeiou][^aeiouwxy]$/.test(w)) {
    forms.add(w + w.slice(-1) + 'ing');
    forms.add(w + w.slice(-1) + 'ed');
  }
  for (const extra of IRREGULAR_EXTRA[w] || []) forms.add(extra);
  const verb = verbs && verbs[w];
  if (verb) for (const f of [...String(verb.past).split('/'), ...String(verb.pp).split('/')]) forms.add(f.trim());
  return [...forms].filter(Boolean);
}

const data = {};
for (const [rel, names] of Object.entries(MODULES)) {
  try {
    data[rel] = load(rel, names);
  } catch (error) {
    fail(rel, `语法或结构错误，无法求值：${error.message}`);
    data[rel] = {};
  }
}

const cjk = /[一-龥]/;
const endsWith = (s, ch) => typeof s === 'string' && s.trim().endsWith(ch);
const EN_END = /[.!?]["'”’]?$/;
const ZH_END = /[。！？]["'”’]?$/;
const BLANK_RE = /___(\d+)___/g;

/* ---------- words ---------- */
// 不规则三态供例句变形校验使用
const verbForms = Object.fromEntries((data['data/knowledge.js'].irregularVerbs || []).map((v) => [v.base, v]));
{
  const { decks = [], words = [] } = data['data/words.js'];
  const deckIds = new Set(decks.map((d) => d.id));
  if (decks.length !== deckIds.size) fail('words.js', 'decks 里有重复 id');
  for (const d of decks) for (const k of ['id', 'name', 'icon']) if (!d[k]) fail('words.js', `deck ${d.id || '?'} 缺 ${k}`);
  const seen = new Map();
  words.forEach((word, index) => {
    const at = `words[${index}] ${word.w || '?'}`;
    for (const k of ['w', 'p', 'pos', 'zh', 'deck', 'ex', 'exZh']) {
      if (typeof word[k] !== 'string' || !word[k]) fail('words.js', `${at} 缺字段 ${k}（渲染层会显示 undefined）`);
    }
    if (word.w && !/^[a-z]+$/.test(word.w)) fail('words.js', `${at} 的 w 不是纯小写单词，默写无法判分`);
    if (word.deck && !deckIds.has(word.deck)) fail('words.js', `${at} 的 deck='${word.deck}' 不在 decks 里`);
    if (word.p && !/^\/.+\/$/.test(word.p)) fail('words.js', `${at} 的音标没被斜杠包住：${word.p}`);
    if (word.ex && !EN_END.test(word.ex)) fail('words.js', `${at} 的 ex 结尾没有标点`);
    if (word.exZh && !ZH_END.test(word.exZh)) fail('words.js', `${at} 的 exZh 结尾没有中文标点`);
    if (word.ex && cjk.test(word.ex)) fail('words.js', `${at} 的英文例句里混进了中文，朗读会读错`);
    if (word.w && word.ex && !exampleForms(word.w, verbForms).some((f) => new RegExp(`\\b${f}\\b`, 'i').test(word.ex))) {
      fail('words.js', `${at} 的例句里没有出现 ${word.w} 或其变形，语境与词条脱节`);
    }
    if (word.w) {
      if (seen.has(word.w)) fail('words.js', `重复词条 ${word.w}（第 ${seen.get(word.w)} 与 ${index} 条，Object.fromEntries 会静默丢一条）`);
      else seen.set(word.w, index);
    }
  });
  const byDeck = {};
  for (const w of words) byDeck[w.deck] = (byDeck[w.deck] || 0) + 1;
  notes.push(`单词 ${words.length} 条 / ${decks.length} 库：${Object.entries(byDeck).map(([k, v]) => `${k} ${v}`).join('，')}`);
}

/* ---------- phrases ---------- */
{
  const { phraseGroups = [], phrases = [] } = data['data/phrases.js'];
  const groupIds = new Set(phraseGroups.map((g) => g.id));
  const used = new Set(phrases.map((p) => p.group));
  for (const g of phraseGroups) if (!used.has(g.id)) fail('phrases.js', `分组 ${g.id} 里一条短语都没有，卡片模式会取到 undefined`);
  for (const p of phrases) if (!groupIds.has(p.group)) fail('phrases.js', `${p.id} 的 group='${p.group}' 不在 phraseGroups 里`);
  const seen = new Map();
  phrases.forEach((p, index) => {
    const at = `phrases[${index}] ${p.id || '?'}`;
    for (const k of ['id', 'group', 'en', 'zh', 'note', 'ex', 'exZh']) {
      if (typeof p[k] !== 'string' || !p[k]) fail('phrases.js', `${at} 缺字段 ${k}`);
    }
    if (p.en && cjk.test(p.en)) fail('phrases.js', `${at} 的 en 含中文，朗读按钮会读中文`);
    if (p.exZh && !ZH_END.test(p.exZh)) fail('phrases.js', `${at} 的 exZh 结尾没有中文标点`);
    if (p.note && p.note.length < 6) fail('phrases.js', `${at} 的 note 太短，像占位文本`);
    if (p.id) {
      if (seen.has(p.id)) fail('phrases.js', `重复 id ${p.id}`);
      else seen.set(p.id, index);
    }
  });
  const byGroup = {};
  for (const p of phrases) byGroup[p.group] = (byGroup[p.group] || 0) + 1;
  notes.push(`短语 ${phrases.length} 条 / ${phraseGroups.length} 组：${Object.entries(byGroup).map(([k, v]) => `${k} ${v}`).join('，')}`);
}

/* ---------- grammar ---------- */
{
  const { grammarLessons = [] } = data['data/grammar.js'];
  const levels = new Set(['基础', '进阶', '高阶']);
  const exams = new Set(['中考', '高考', '通用']);
  const ids = new Set();
  let quizzes = 0;
  grammarLessons.forEach((lesson, index) => {
    const at = `grammar[${index}] ${lesson.id || '?'}`;
    for (const k of ['id', 'title', 'en', 'level', 'intro', 'sections', 'pitfall', 'quiz']) {
      if (lesson[k] === undefined || lesson[k] === null) fail('grammar.js', `${at} 缺字段 ${k}`);
    }
    if (ids.has(lesson.id)) fail('grammar.js', `重复 id ${lesson.id}`);
    ids.add(lesson.id);
    if (lesson.level && !levels.has(lesson.level)) fail('grammar.js', `${at} 的 level='${lesson.level}' 不在筛选条里（基础/进阶/高阶）`);
    if (lesson.exam && !exams.has(lesson.exam)) fail('grammar.js', `${at} 的 exam='${lesson.exam}' 不在筛选条里（中考/高考/通用）`);
    if (!Array.isArray(lesson.keyPoints) || lesson.keyPoints.length < 3 || lesson.keyPoints.length > 4) {
      fail('grammar.js', `${at} keyPoints 应为 3-4 条，实际 ${Array.isArray(lesson.keyPoints) ? lesson.keyPoints.length : '无'}`);
    } else {
      if (new Set(lesson.keyPoints).size !== lesson.keyPoints.length) fail('grammar.js', `${at} keyPoints 有重复（React key 冲突）`);
      lesson.keyPoints.forEach((point) => {
        const len = [...String(point)].length;
        if (len < 15 || len > 45) fail('grammar.js', `${at} 考点「${point}」长 ${len} 字，应在 15-45 之间`);
        if (point === lesson.pitfall) fail('grammar.js', `${at} 考点与 pitfall 完全重复`);
      });
    }
    if (!Number.isFinite(lesson.mins)) fail('grammar.js', `${at} 的 mins 不是数字`);
    if (!Array.isArray(lesson.sections) || lesson.sections.length < 2) fail('grammar.js', `${at} sections 少于 2 段`);
    (lesson.sections || []).forEach((section, s) => {
      if (!section.h || !section.body) fail('grammar.js', `${at} 第 ${s + 1} 段缺 h 或 body`);
      if (!Array.isArray(section.examples) || section.examples.length < 1) fail('grammar.js', `${at} 第 ${s + 1} 段没有 examples`);
      const heads = (lesson.sections || []).map((x) => x.h);
      if (heads.filter((h) => h === section.h).length > 1) fail('grammar.js', `${at} 小节标题重复：${section.h}`);
      (section.examples || []).forEach((ex) => {
        if (!ex.en || !ex.zh) fail('grammar.js', `${at} 有 example 缺 en/zh`);
      });
      const ens = (section.examples || []).map((e) => e.en);
      if (new Set(ens).size !== ens.length) fail('grammar.js', `${at} 第 ${s + 1} 段例句 en 重复（React key 冲突）`);
    });
    const quiz = lesson.quiz || [];
    if (quiz.length === 0) fail('grammar.js', `${at} 的 quiz 为空，打开课文会直接崩`);
    if (quiz.length < 3) fail('grammar.js', `${at} 只有 ${quiz.length} 题，建议至少 3 题`);
    quizzes += quiz.length;
    quiz.forEach((q, qi) => {
      const qat = `${at} 第 ${qi + 1} 题`;
      if (!q.q) fail('grammar.js', `${qat} 缺题干`);
      if (!Array.isArray(q.opts) || q.opts.length !== 4) fail('grammar.js', `${qat} 选项数应为 4，实际 ${q.opts ? q.opts.length : '无'}`);
      if (q.opts && new Set(q.opts).size !== q.opts.length) fail('grammar.js', `${qat} 选项文本有重复（React key 冲突）`);
      if (!Number.isInteger(q.a) || q.a < 0 || q.a >= (q.opts || []).length) fail('grammar.js', `${qat} 的答案下标 a=${q.a} 越界`);
      if (!q.explain) fail('grammar.js', `${qat} 缺 explain`);
      if (q.q && !q.q.includes('____') && !/[?？]/.test(q.q)) fail('grammar.js', `${qat} 题干里既没有空格 ____ 也不是问句`);
      const mismatch = answerMismatch(q.opts, q.a, q.explain);
      if (mismatch) fail('grammar.js', `${qat} 解析点名的是「${mismatch}」，但正确项标的是「${(q.opts || [])[q.a]}」`);
    });
  });
  notes.push(`语法课 ${grammarLessons.length} 节 / 练习 ${quizzes} 题`);
}

/* ---------- writing ---------- */
{
  const { essayStructures = [], modelEssays = [], writingPrompts = [] } = data['data/writing.js'];
  const checkIds = (list, label) => {
    const seen = new Set();
    for (const item of list) {
      if (seen.has(item.id)) fail('writing.js', `${label} 重复 id ${item.id}`);
      seen.add(item.id);
    }
    return seen;
  };
  const writingExams = new Set(['中考', '高考', '通用']);
  const checkExam = (item, label) => {
    if (!writingExams.has(item.exam)) fail('writing.js', `${label} ${item.id} 的 exam='${item.exam}' 不在筛选条里（中考/高考/通用）`);
  };
  checkIds(essayStructures, '模板');
  essayStructures.forEach((s) => {
    if (!s.title || !s.en || !s.when || !Array.isArray(s.outline) || !Array.isArray(s.frames)) {
      fail('writing.js', `模板 ${s.id} 字段不全`);
    }
    if (s.frames && s.frames.some((f) => !f.en || !f.zh)) fail('writing.js', `模板 ${s.id} 有 frame 缺 en/zh`);
    if (s.frames && new Set(s.frames.map((f) => f.en)).size !== s.frames.length) fail('writing.js', `模板 ${s.id} frame 文本重复`);
    checkExam(s, '模板');
  });
  checkIds(modelEssays, '范文');
  modelEssays.forEach((m) => {
    const at = `范文 ${m.id}`;
    for (const k of ['title', 'type', 'exam', 'prompt', 'essay', 'zh']) if (m[k] === undefined) fail('writing.js', `${at} 缺 ${k}`);
    checkExam(m, '范文');
    if (m.cefr !== undefined && !m.cefr) fail('writing.js', `${at} 的 cefr 是空值，要么写等级要么整个字段不要留`);
    if ('level' in m) fail('writing.js', `${at} 还留着旧 level 字段，渲染层已改读 exam`);
    if (!Array.isArray(m.essay) || !Array.isArray(m.zh)) { fail('writing.js', `${at} essay/zh 不是数组`); return; }
    if (m.essay.length !== m.zh.length) fail('writing.js', `${at} 段数不等：essay ${m.essay.length} vs zh ${m.zh.length}（译文按位置索引，会错位）`);
    if (!Number.isFinite(m.words)) fail('writing.js', `${at} 的 words 不是数字`);
    else {
      const actual = m.essay.join(' ').split(/\s+/).filter(Boolean).length;
      if (Math.abs(actual - m.words) > Math.max(15, actual * 0.25)) fail('writing.js', `${at} words 标 ${m.words}，实际约 ${actual}`);
    }
    if (!Array.isArray(m.expressions) || m.expressions.length === 0) fail('writing.js', `${at} 缺 expressions`);
    if (m.expressions && new Set(m.expressions).size !== m.expressions.length) fail('writing.js', `${at} expressions 有重复`);
  });
  checkIds(writingPrompts, '题目');
  writingPrompts.forEach((w) => {
    const at = `题目 ${w.id}`;
    for (const k of ['title', 'en', 'type', 'target', 'tips']) if (w[k] === undefined) fail('writing.js', `${at} 缺 ${k}`);
    if (w.target && !/\d/.test(w.target)) fail('writing.js', `${at} 的 target '${w.target}' 不含数字，字数目标会退回默认值`);
    if (w.tips && w.tips.length < 2) fail('writing.js', `${at} tips 少于 2 条`);
    if (!Array.isArray(w.tips)) fail('writing.js', `${at} tips 不是数组`);
    checkExam(w, '题目');
  });
  const examTally = (list) => ['中考', '高考', '通用'].map((e) => `${e} ${list.filter((x) => x.exam === e).length}`).join('，');
  notes.push(`写作：模板 ${essayStructures.length} / 范文 ${modelEssays.length} / 题目 ${writingPrompts.length}`);
  notes.push(`  考段分布 模板（${examTally(essayStructures)}）范文（${examTally(modelEssays)}）题目（${examTally(writingPrompts)}）`);
}

/* ---------- reading ---------- */
{
  const { stories = [] } = data['data/reading.js'];
  const ids = new Set();
  let paragraphs = 0;
  stories.forEach((story) => {
    const at = `原著 ${story.id || '?'}`;
    for (const k of ['id', 'title', 'zhTitle', 'author', 'year', 'level', 'minutes', 'accent', 'blurb', 'question', 'paragraphs', 'glossary']) {
      if (story[k] === undefined) fail('reading.js', `${at} 缺 ${k}`);
    }
    if (ids.has(story.id)) fail('reading.js', `重复 id ${story.id}`);
    ids.add(story.id);
    if (!/^#[0-9a-fA-F]{6}$/.test(story.accent || '')) fail('reading.js', `${at} 的 accent 不是 #rrggbb：${story.accent}`);
    if (!Array.isArray(story.paragraphs) || story.paragraphs.some((p) => !p.en || !p.zh)) fail('reading.js', `${at} 段落字段不全`);
    paragraphs += (story.paragraphs || []).length;
    const ws = (story.glossary || []).map((g) => g.w);
    if (new Set(ws).size !== ws.length) fail('reading.js', `${at} glossary 有重复词（React key 冲突）`);
    for (const g of story.glossary || []) if (!g.w || !g.p || !g.zh) fail('reading.js', `${at} 词表项缺 w/p/zh`);
  });
  notes.push(`原著 ${stories.length} 篇 / ${paragraphs} 段`);
}

/* ---------- knowledge ---------- */
{
  const { knowledgeTabs = [], irregularVerbs = [], affixes = [], confusables = [], wordForms = [] } = data['data/knowledge.js'];
  const tabIds = new Set(knowledgeTabs.map((t) => t.id));
  for (const need of ['verbs', 'roots', 'confuse', 'forms']) if (!tabIds.has(need)) fail('knowledge.js', `knowledgeTabs 缺少 id '${need}'，Lab 屏按这个 id 切换`);
  const bases = new Set();
  irregularVerbs.forEach((v, i) => {
    const at = `动词[${i}] ${v.base || '?'}`;
    for (const k of ['base', 'past', 'pp', 'zh', 'exam']) if (!v[k]) fail('knowledge.js', `${at} 缺 ${k}`);
    if (v.base && !/^[a-z]+$/.test(v.base)) fail('knowledge.js', `${at} 的 base 不是纯小写单词`);
    if (v.base && bases.has(v.base)) fail('knowledge.js', `重复动词 ${v.base}`);
    bases.add(v.base);
    if (v.exam && !['中考', '高考', '常错'].includes(v.exam)) fail('knowledge.js', `${at} 的 exam='${v.exam}' 不在筛选项里`);
  });
  const kindKeys = new Set();
  affixes.forEach((a, i) => {
    const at = `词缀[${i}] ${a.item || '?'}`;
    for (const k of ['item', 'kind', 'zh', 'note']) if (!a[k]) fail('knowledge.js', `${at} 缺 ${k}`);
    if (a.kind && !['prefix', 'suffix', 'root'].includes(a.kind)) fail('knowledge.js', `${at} 的 kind='${a.kind}' 非法（prefix/suffix/root）`);
    if (kindKeys.has(`${a.item}|${a.kind}`)) fail('knowledge.js', `重复词缀 ${a.item}/${a.kind}`);
    kindKeys.add(`${a.item}|${a.kind}`);
    if (!Array.isArray(a.words) || a.words.length < 2) fail('knowledge.js', `${at} 的 words 至少 2 个例词`);
    else if (new Set(a.words).size !== a.words.length) fail('knowledge.js', `${at} 的 words 有重复`);
    if (a.zh && cjk.test(a.zh) === false) fail('knowledge.js', `${at} 的 zh 应该是中文`);
  });
  const cids = new Set();
  confusables.forEach((c, i) => {
    const at = `易混词[${i}] ${c.id || '?'}`;
    for (const k of ['id', 'pair', 'zh', 'tip', 'examples']) if (!c[k]) fail('knowledge.js', `${at} 缺 ${k}`);
    if (cids.has(c.id)) fail('knowledge.js', `重复 id ${c.id}`);
    cids.add(c.id);
    if (!Array.isArray(c.examples) || c.examples.length < 2) fail('knowledge.js', `${at} 至少 2 个 example`);
    else {
      const ens = c.examples.map((e) => e.en);
      if (new Set(ens).size !== ens.length) fail('knowledge.js', `${at} example 的 en 重复`);
      if (c.examples.some((e) => !e.en || !e.zh)) fail('knowledge.js', `${at} 有 example 缺 en/zh`);
    }
  });
  const WF_SLOTS = ['n', 'v', 'adj', 'adv'];
  const WF_POS = { 'n.': 'n', 'v.': 'v', 'adj.': 'adj', 'adv.': 'adv' };
  const wfIds = new Set();
  const wfBases = new Set();
  wordForms.forEach((f, i) => {
    const at = `词性转换[${i}] ${f.id || '?'}`;
    for (const k of ['id', 'base', 'pos', 'zh', 'exam', 'tip', ...WF_SLOTS]) {
      if (f[k] === undefined || f[k] === null) fail('knowledge.js', `${at} 缺 ${k}`);
    }
    if (wfIds.has(f.id)) fail('knowledge.js', `${at} 重复 id，wordFormById 会静默丢弃一条`);
    wfIds.add(f.id);
    if (wfBases.has(f.base)) fail('knowledge.js', `${at} 重复 base ${f.base}`);
    wfBases.add(f.base);
    if (!/^[a-z]+$/.test(f.base || '')) fail('knowledge.js', `${at} base 不是纯小写单词`);
    const slot = WF_POS[f.pos];
    if (!slot) fail('knowledge.js', `${at} pos='${f.pos}' 非法（n./v./adj./adv.）`);
    else if (f[slot] !== f.base) fail('knowledge.js', `${at} pos 是 ${f.pos}，但 ${slot} 槽写的是 '${f[slot]}'，应等于 base`);
    const filled = WF_SLOTS.map((k) => f[k]).filter((v) => v !== '');
    if (filled.length < 2) fail('knowledge.js', `${at} 非空词性槽少于 2 个，查表没有意义`);
    if (new Set(filled).size < 2) fail('knowledge.js', `${at} 各槽全是同一个词，没有任何派生形式`);
    if (filled.some((v) => !/^[a-z]+$/.test(v))) fail('knowledge.js', `${at} 派生形式不是纯小写单词`);
    if (!['中考', '高考'].includes(f.exam)) fail('knowledge.js', `${at} exam='${f.exam}' 不在筛选项里（中考/高考）`);
    if (!f.tip || !filled.some((v) => f.tip.includes(v))) fail('knowledge.js', `${at} tip 没点名任何派生词，学生看不出该填哪个`);
    if (f.zh && [...f.zh].length > 12) fail('knowledge.js', `${at} zh 超过 12 字，卡片头会挤`);
  });
  notes.push(`知识速查：不规则动词 ${irregularVerbs.length} / 词根词缀 ${affixes.length} / 易混词 ${confusables.length} / 词性转换 ${wordForms.length}`);
}

/* ---------- examTypes ---------- */
{
  const { examTabs = [], grammarFills = [], clozes = [], sevenFives = [], errorFixes = [] } = data['data/examTypes.js'];
  const tabs = new Set(examTabs.map((t) => t.id));
  for (const need of ['gfill', 'cloze', 'seven', 'error']) if (!tabs.has(need)) fail('examTypes.js', `examTabs 缺 id '${need}'`);
  const blanksIn = (text) => {
    const out = [];
    const re = new RegExp(BLANK_RE);
    let m = re.exec(text || '');
    while (m) { out.push(m[1]); m = re.exec(text || ''); }
    return out;
  };
  const seenIds = new Set();
  const claim = (id, label) => {
    if (seenIds.has(id)) fail('examTypes.js', `跨题型重复 id ${id}（${label}）`);
    seenIds.add(id);
  };
  grammarFills.forEach((item) => {
    const at = `语法填空 ${item.id}`;
    claim(item.id, at);
    for (const k of ['title', 'exam', 'mins', 'text', 'answers']) if (!item[k]) fail('examTypes.js', `${at} 缺 ${k}`);
    const blanks = blanksIn(item.text);
    const nums = (item.answers || []).map((a) => String(a.n));
    if (blanks.length !== 10) fail('examTypes.js', `${at} 正文有 ${blanks.length} 个空，语法填空标准是 10 空`);
    if (blanks.length !== nums.length) fail('examTypes.js', `${at} 正文有 ${blanks.length} 个 ___n___，答案却有 ${nums.length} 条`);
    if (blanks.join(',') !== nums.join(',')) fail('examTypes.js', `${at} 正文空位序号 [${blanks}] 与答案序号 [${nums}] 不一致`);
    if (new Set(nums).size !== nums.length) fail('examTypes.js', `${at} 答案序号重复`);
    (item.answers || []).forEach((a) => { if (!a.answer || !a.explain) fail('examTypes.js', `${at} 第 ${a.n} 空缺 answer/explain`); });
    if (item.exam && !['中考', '高考'].includes(item.exam)) fail('examTypes.js', `${at} exam='${item.exam}' 非法`);
  });
  clozes.forEach((item) => {
    const at = `完形填空 ${item.id}`;
    claim(item.id, at);
    for (const k of ['title', 'exam', 'mins', 'text', 'questions']) if (!item[k]) fail('examTypes.js', `${at} 缺 ${k}`);
    const blanks = blanksIn(item.text);
    const nums = (item.questions || []).map((q) => String(q.n));
    if (nums.length !== 15 || nums.join(',') !== Array.from({ length: 15 }, (_, i) => String(i + 1)).join(',')) {
      fail('examTypes.js', `${at} 题目序号应为 1-15 共 15 题，实际 [${nums}]（完形标准 15 空）`);
    }
    if (blanks.join(',') !== nums.join(',')) fail('examTypes.js', `${at} 正文空位 [${blanks}] 与题目 [${nums}] 不匹配`);
    (item.questions || []).forEach((q) => {
      if (!Array.isArray(q.opts) || q.opts.length !== 4) fail('examTypes.js', `${at} 第 ${q.n} 题选项应为 4 个`);
      else if (new Set(q.opts).size !== q.opts.length) fail('examTypes.js', `${at} 第 ${q.n} 题选项文本重复（React key 冲突）`);
      if (!Number.isInteger(q.a) || q.a < 0 || q.a >= (q.opts || []).length) fail('examTypes.js', `${at} 第 ${q.n} 题 a=${q.a} 越界`);
      if (!q.explain) fail('examTypes.js', `${at} 第 ${q.n} 题缺 explain`);
      const mismatch = answerMismatch(q.opts, q.a, q.explain);
      if (mismatch) fail('examTypes.js', `${at} 第 ${q.n} 题解析点名「${mismatch}」，正确项却是「${(q.opts || [])[q.a]}」`);
    });
    const positions = (item.questions || []).map((q) => q.a);
    if (positions.length > 3 && new Set(positions).size < 2) notes.push(`${at} 正确答案全落在同一个下标，学生可能蒙对`);
  });
  sevenFives.forEach((item) => {
    const at = `七选五 ${item.id}`;
    claim(item.id, at);
    for (const k of ['title', 'exam', 'mins', 'text', 'options', 'answers']) if (!item[k]) fail('examTypes.js', `${at} 缺 ${k}`);
    const gaps = blanksIn(item.text);
    const keys = (item.answers || []).map((a) => a.g);
    const standard = ['36', '37', '38', '39', '40'];
    if (gaps.join(',') !== standard.join(',')) fail('examTypes.js', `${at} 正文空位应严格是 36-40，实际 [${gaps}]`);
    if ((item.answers || []).length !== 5) fail('examTypes.js', `${at} 答案 ${keys.length} 条，七选五应是 5 条`);
    if (gaps.join(',') !== keys.join(',')) fail('examTypes.js', `${at} 正文空位 [${gaps}] 与答案 [${keys}] 不一致`);
    const letters = (item.options || []).map((o) => o.k);
    if (item.options && new Set(letters).size !== letters.length) fail('examTypes.js', `${at} 选项编号重复`);
    if (letters.length !== 7) fail('examTypes.js', `${at} 选项 ${letters.length} 个，七选五应给 7 个（含 2 个干扰项）`);
    (item.options || []).forEach((o) => { if (!o.en || cjk.test(o.en)) fail('examTypes.js', `${at} 选项 ${o.k} 的 en 为空或含中文`); });
    (item.answers || []).forEach((a) => {
      if (!letters.includes(a.k)) fail('examTypes.js', `${at} 空位 ${a.g} 指向不存在的选项 ${a.k}`);
      if (!a.explain) fail('examTypes.js', `${at} 空位 ${a.g} 缺 explain`);
    });
    const used = (item.answers || []).map((a) => a.k);
    if (new Set(used).size !== used.length) fail('examTypes.js', `${at} 同一个选项被两个空位用了`);
  });
  errorFixes.forEach((item) => {
    const at = `短文改错 ${item.id}`;
    claim(item.id, at);
    for (const k of ['title', 'exam', 'mins', 'lines', 'fixes']) if (!item[k]) fail('examTypes.js', `${at} 缺 ${k}`);
    const lineNos = (item.lines || []).map((l) => l.no);
    if (new Set(lineNos).size !== lineNos.length) fail('examTypes.js', `${at} 行号重复`);
    (item.fixes || []).forEach((f, i) => {
      if (!lineNos.includes(f.no)) fail('examTypes.js', `${at} 第 ${i + 1} 处修改指向不存在的行 ${f.no}`);
      if (!['增', '删', '改'].includes(f.type)) fail('examTypes.js', `${at} 第 ${i + 1} 处 type='${f.type}' 应为 增/删/改`);
      if (!f.from || !f.to || !f.explain) fail('examTypes.js', `${at} 第 ${i + 1} 处缺 from/to/explain`);
    });
    if ((item.fixes || []).length !== 10) fail('examTypes.js', `${at} 有 ${(item.fixes || []).length} 处错误，短文改错标准是 10 处`);
  });
  notes.push(`题型专项：语法填空 ${grammarFills.length} / 完形 ${clozes.length} / 七选五 ${sevenFives.length} / 改错 ${errorFixes.length}`);
}

/* ---------- cross-module ---------- */
{
  const gloss = new Set();
  for (const story of data['data/reading.js'].stories || []) for (const g of story.glossary || []) gloss.add(g.w.toLowerCase());
  const vocab = new Map((data['data/words.js'].words || []).map((w) => [w.w, w]));
  let overlap = 0;
  for (const word of gloss) if (vocab.has(word)) overlap += 1;
  notes.push(`原著词表与主词库重合约 ${overlap} 个（点词查释义走的是本篇 glossary，不算错误）`);
}

console.log('—— 内容规模 ——');
for (const note of notes) console.log(`  ${note}`);
console.log('');
if (errors.length) {
  console.log(`—— 发现问题 ${errors.length} 条 ——`);
  for (const error of errors.slice(0, 200)) console.log(`  ✗ ${error}`);
  if (errors.length > 200) console.log(`  …另外 ${errors.length - 200} 条`);
  process.exit(1);
}
console.log('校验通过：没有发现会让渲染出错或数据被静默丢弃的问题。');
