import { useMemo, useState } from 'react';
import { affixes, confusables, irregularVerbs, knowledgeTabs, wordForms } from '../data/knowledge.js';
import { clozes, errorFixes, examTabs, grammarFills, sevenFives } from '../data/examTypes.js';
import { Chip, EmptyState, Icon, LevelBadge, ScreenHeader, Segmented, SpeakButton } from '../ui.jsx';

const kindLabels = { prefix: '前缀', suffix: '后缀', root: '词根' };
const LIST_PAGE = 60;
const FORM_PAGE = 30;
const FORM_SLOTS = [
  { key: 'n', pos: 'n.', label: '名词' },
  { key: 'v', pos: 'v.', label: '动词' },
  { key: 'adj', pos: 'adj.', label: '形容词' },
  { key: 'adv', pos: 'adv.', label: '副词' },
];

function splitBlanks(text) {
  const parts = [];
  const re = /___(\d+)___/g;
  let last = 0;
  let match = re.exec(text);
  while (match) {
    if (match.index > last) parts.push({ kind: 'text', value: text.slice(last, match.index) });
    parts.push({ kind: 'gap', number: match[1] });
    last = match.index + match[0].length;
    match = re.exec(text);
  }
  if (last < text.length) parts.push({ kind: 'text', value: text.slice(last) });
  return parts;
}

function PassageText({ text, filled }) {
  return (
    <p className="passage-text">
      {splitBlanks(text).map((part, index) => {
        if (part.kind === 'text') return <span key={`t${index}`}>{part.value}</span>;
        const answer = filled ? filled[part.number] : null;
        if (answer) {
          return (
            <span className="passage-gap filled" key={`g${part.number}`}>
              {answer}
              <small>{part.number}</small>
            </span>
          );
        }
        return (
          <span className="passage-gap" key={`g${part.number}`}>
            <span className="gap-line" />
            <small>{part.number}</small>
          </span>
        );
      })}
    </p>
  );
}

function VerbsView() {
  const [exam, setExam] = useState('全部');
  const [query, setQuery] = useState('');
  const [shown, setShown] = useState(LIST_PAGE);

  const exams = useMemo(() => {
    const set = new Set(irregularVerbs.map((verb) => verb.exam).filter(Boolean));
    return ['全部', ...set];
  }, []);

  const rows = useMemo(() => {
    const pool = exam === '全部' ? irregularVerbs : irregularVerbs.filter((verb) => verb.exam === exam);
    const key = query.trim().toLowerCase();
    if (!key) return pool;
    return pool.filter((verb) => verb.base.includes(key) || (verb.zh || '').includes(query.trim()));
  }, [exam, query]);

  const visible = rows.slice(0, shown);

  return (
    <div className="lab-block">
      <div className="search-box">
        <Icon name="search" size={18} />
        <input
          value={query}
          onChange={(event) => { setQuery(event.target.value); setShown(LIST_PAGE); }}
          placeholder="搜动词原形或中文"
          aria-label="搜索不规则动词"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck="false"
        />
      </div>
      <div className="chip-row">
        {exams.map((item) => (
          <Chip key={item} active={exam === item} onClick={() => { setExam(item); setShown(LIST_PAGE); }}>{item}</Chip>
        ))}
      </div>
      <p className="lab-legend">三态按原形／过去式／过去分词排列。同形的一栏里用 / 分开两种写法。</p>
      <p className="list-count">共 {rows.length} 个{rows.length > visible.length ? `，已显示 ${visible.length} 个` : ''}</p>
      {visible.length === 0 ? (
        <EmptyState title="没有这个动词">换个拼写试试，不规则动词按原形收录。</EmptyState>
      ) : (
        <div className="verb-table">
          <div className="verb-head"><span>原形</span><span>过去式</span><span>过去分词</span><span>释义</span></div>
          {visible.map((verb) => (
            <div className="verb-row" key={verb.base}>
              <span className="verb-base">
                <strong>{verb.base}</strong>
                <SpeakButton text={verb.base} small />
              </span>
              <span className="verb-form">{verb.past}</span>
              <span className="verb-form">{verb.pp}</span>
              <span className="verb-zh">
                {verb.zh}
                {verb.exam && <LevelBadge tone={verb.exam === '中考' ? 'teal' : 'blue'}>{verb.exam}</LevelBadge>}
              </span>
            </div>
          ))}
        </div>
      )}
      {rows.length > visible.length && (
        <button type="button" className="secondary-button wide-button load-more-button" onClick={() => setShown((n) => n + LIST_PAGE)}>
          加载更多（还剩 {rows.length - visible.length} 个）
        </button>
      )}
    </div>
  );
}

function WordFormView() {
  const [exam, setExam] = useState('全部');
  const [query, setQuery] = useState('');
  const [shown, setShown] = useState(FORM_PAGE);

  const exams = useMemo(() => {
    const set = new Set(wordForms.map((item) => item.exam).filter(Boolean));
    return ['全部', ...set];
  }, []);

  const rows = useMemo(() => {
    const pool = exam === '全部' ? wordForms : wordForms.filter((item) => item.exam === exam);
    const key = query.trim().toLowerCase();
    if (!key) return pool;
    return pool.filter((item) => FORM_SLOTS.some((slot) => (item[slot.key] || '').includes(key)) || (item.zh || '').includes(query.trim()));
  }, [exam, query]);

  const visible = rows.slice(0, shown);

  return (
    <div className="lab-block">
      <div className="search-box">
        <Icon name="search" size={18} />
        <input
          value={query}
          onChange={(event) => { setQuery(event.target.value); setShown(FORM_PAGE); }}
          placeholder="搜任一形式或中文，如 successful"
          aria-label="搜索词性转换"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck="false"
        />
      </div>
      <div className="chip-row">
        {exams.map((item) => (
          <Chip key={item} active={exam === item} onClick={() => { setExam(item); setShown(FORM_PAGE); }}>{item}</Chip>
        ))}
      </div>
      <p className="lab-legend">题目给出的词标了底色。空格前是冠词或介词填名词，空格后是名词填形容词，修饰动词或整句填副词，作谓语填动词并注意时态语态。— 表示该词性没有常用形式。</p>
      <p className="list-count">共 {rows.length} 组{rows.length > visible.length ? `，已显示 ${visible.length} 组` : ''}</p>
      {visible.length === 0 ? (
        <EmptyState title="没有这组词">换个拼写试试，也可以搜它的派生形式。</EmptyState>
      ) : (
        <div className="wordform-list">
          {visible.map((item) => (
            <div className="wordform-card" key={item.id}>
              <div className="wordform-head">
                <span className="wordform-base">
                  <strong>{item.base}</strong>
                  <SpeakButton text={item.base} small />
                </span>
                <span className="wordform-zh">{item.zh}</span>
                {item.exam && <LevelBadge tone={item.exam === '中考' ? 'teal' : 'blue'}>{item.exam}</LevelBadge>}
              </div>
              <div className="wordform-grid">
                {FORM_SLOTS.map((slot) => (
                  <div
                    className={`wordform-slot${item[slot.key] ? '' : ' empty'}${item.pos === slot.pos ? ' origin' : ''}`}
                    key={slot.key}
                  >
                    <small>{slot.label}</small>
                    <span>{item[slot.key] || '—'}</span>
                  </div>
                ))}
              </div>
              <p className="wordform-tip">{item.tip}</p>
            </div>
          ))}
        </div>
      )}
      {rows.length > visible.length && (
        <button type="button" className="secondary-button wide-button load-more-button" onClick={() => setShown((n) => n + FORM_PAGE)}>
          加载更多（还剩 {rows.length - visible.length} 组）
        </button>
      )}
    </div>
  );
}

function AffixView() {
  const [kind, setKind] = useState('全部');
  const [query, setQuery] = useState('');

  const kinds = useMemo(() => {
    const set = new Set(affixes.map((item) => item.kind).filter(Boolean));
    return ['全部', ...set];
  }, []);

  const rows = useMemo(() => {
    const pool = kind === '全部' ? affixes : affixes.filter((item) => item.kind === kind);
    const key = query.trim().toLowerCase();
    if (!key) return pool;
    return pool.filter((item) => item.item.toLowerCase().includes(key) || (item.zh || '').includes(query.trim()));
  }, [kind, query]);

  if (rows.length === 0) return <EmptyState title="没有这个词缀">换个关键词，或切回“全部”。</EmptyState>;

  return (
    <div className="lab-block">
      <div className="search-box">
        <Icon name="search" size={18} />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="搜词缀或中文意思"
          aria-label="搜索词根词缀"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck="false"
        />
      </div>
      <div className="chip-row">
        {kinds.map((item) => <Chip key={item} active={kind === item} onClick={() => setKind(item)}>{item}</Chip>)}
      </div>
      <p className="list-count">共 {rows.length} 条</p>
      <div className="affix-list">
        {rows.map((item) => (
          <div className="affix-card" key={`${item.item}-${item.kind}`}>
            <div className="affix-top">
              <strong className="affix-item">{item.item}</strong>
              {item.kind && <LevelBadge tone={item.kind === 'root' ? 'amber' : 'green'}>{kindLabels[item.kind] || item.kind}</LevelBadge>}
              <span className="affix-zh">{item.zh}</span>
            </div>
            {Array.isArray(item.words) && item.words.length > 0 && (
              <div className="affix-words">
                {item.words.map((word) => (
                  <span className="affix-word" key={word}>
                    {word}
                    <SpeakButton text={word} small />
                  </span>
                ))}
              </div>
            )}
            {item.note && <p className="affix-note">{item.note}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

function ConfusableView() {
  const [open, setOpen] = useState(null);
  const [query, setQuery] = useState('');

  const rows = useMemo(() => {
    const key = query.trim().toLowerCase();
    if (!key) return confusables;
    return confusables.filter(
      (item) => item.pair.toLowerCase().includes(key) || (item.zh || '').includes(query.trim())
    );
  }, [query]);

  if (rows.length === 0) return <EmptyState title="没有这组辨析">输入词的一个即可，比如 affect。</EmptyState>;

  return (
    <div className="lab-block">
      <div className="search-box">
        <Icon name="search" size={18} />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="搜易混词，例如 affect"
          aria-label="搜索易混词"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck="false"
        />
      </div>
      <p className="list-count">共 {rows.length} 组</p>
      <div className="confuse-list">
        {rows.map((item) => {
          const expanded = open === item.id;
          return (
            <div className={`confuse-card ${expanded ? 'open' : ''}`} key={item.id}>
              <button type="button" className="confuse-head" onClick={() => setOpen(expanded ? null : item.id)}>
                <span className="confuse-pair">{item.pair}</span>
                <span className="confuse-zh">{item.zh}</span>
                <Icon name={expanded ? 'down' : 'right'} size={17} />
              </button>
              {expanded && (
                <div className="confuse-body">
                  {item.tip && <p className="confuse-tip">{item.tip}</p>}
                  {(item.examples || []).map((example) => (
                    <div className="confuse-example" key={example.en}>
                      <p>{example.en}</p>
                      <p className="example-zh">{example.zh}</p>
                      <SpeakButton text={example.en} small />
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function GrammarFillView({ items }) {
  const [index, setIndex] = useState(0);
  const [reveal, setReveal] = useState(false);
  const item = items[Math.min(index, items.length - 1)];
  if (!item) return <EmptyState title="还没有语法填空">稍后再来，语篇正在补充。</EmptyState>;
  const filled = Object.fromEntries((item.answers || []).map((entry) => [String(entry.n), entry.answer]));

  return (
    <div className="exam-item" key={item.id}>
      <div className="exam-item-head">
        <div>
          <strong>{item.title}</strong>
          <span className="muted tiny">{(item.answers || []).length} 空 · 约 {item.mins} 分钟</span>
        </div>
        <div className="exam-picker">
          <button type="button" className="icon-button" onClick={() => { setIndex((n) => Math.max(0, n - 1)); setReveal(false); }} aria-label="上一篇" disabled={index === 0}>
            <Icon name="left" size={18} />
          </button>
          <span>{index + 1} / {items.length}</span>
          <button type="button" className="icon-button" onClick={() => { setIndex((n) => Math.min(items.length - 1, n + 1)); setReveal(false); }} aria-label="下一篇" disabled={index >= items.length - 1}>
            <Icon name="right" size={18} />
          </button>
        </div>
      </div>
      <div className="exam-tags">{item.exam && <LevelBadge tone={item.exam === '中考' ? 'teal' : 'blue'}>{item.exam}</LevelBadge>}</div>
      <PassageText text={item.text} filled={reveal ? filled : null} />
      <div className="exam-actions">
        <button type="button" className="secondary-button" onClick={() => setReveal((v) => !v)}>{reveal ? '收起答案' : '看答案'}</button>
        <SpeakButton text={item.text.replace(/___\d+___/g, 'blank')} label="朗读全文" small />
      </div>
      {reveal && (
        <ol className="answer-list">
          {(item.answers || []).map((entry) => (
            <li key={entry.n}>
              <strong>{entry.n}. {entry.answer}</strong>
              {entry.give && <span className="give-word">（提示词 {entry.give}）</span>}
              <p>{entry.explain}</p>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

function ClozeView({ items }) {
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState({});
  const item = items[Math.min(index, items.length - 1)];
  if (!item) return <EmptyState title="还没有完形填空">稍后再来，语篇正在补充。</EmptyState>;

  const questions = item.questions || [];
  const answered = questions.filter((question) => picked[question.n] !== undefined);
  const score = answered.filter((question) => picked[question.n] === question.a).length;
  const filled = Object.fromEntries(
    answered.map((question) => [String(question.n), question.opts[picked[question.n]]])
  );

  return (
    <div className="exam-item" key={item.id}>
      <div className="exam-item-head">
        <div>
          <strong>{item.title}</strong>
          <span className="muted tiny">{questions.length} 空 · 约 {item.mins} 分钟</span>
        </div>
        <div className="exam-picker">
          <button type="button" className="icon-button" onClick={() => { setIndex((n) => Math.max(0, n - 1)); setPicked({}); }} aria-label="上一篇" disabled={index === 0}>
            <Icon name="left" size={18} />
          </button>
          <span>{index + 1} / {items.length}</span>
          <button type="button" className="icon-button" onClick={() => { setIndex((n) => Math.min(items.length - 1, n + 1)); setPicked({}); }} aria-label="下一篇" disabled={index >= items.length - 1}>
            <Icon name="right" size={18} />
          </button>
        </div>
      </div>
      <div className="exam-tags">{item.exam && <LevelBadge tone={item.exam === '中考' ? 'teal' : 'blue'}>{item.exam}</LevelBadge>}</div>
      <PassageText text={item.text} filled={answered.length === questions.length ? filled : null} />
      <p className="form-note">先通读一遍再选。做完全部 {questions.length} 题才会显示正确答案。</p>
      <div className="cloze-questions">
        {questions.map((question) => {
          const choice = picked[question.n];
          const done = answered.length === questions.length;
          return (
            <div className="cloze-question" key={question.n}>
              <p className="cloze-number">{question.n}.</p>
              <div className="cloze-options">
                {question.opts.map((option, position) => {
                  const isChoice = choice === position;
                  const isRight = done && position === question.a;
                  const isWrong = done && isChoice && position !== question.a;
                  return (
                    <button
                      type="button"
                      key={option}
                      className={`cloze-option ${isChoice ? 'picked' : ''} ${isRight ? 'right' : ''} ${isWrong ? 'wrong' : ''}`}
                      onClick={() => setPicked((prev) => ({ ...prev, [question.n]: position }))}
                    >
                      <span className="option-letter">{String.fromCharCode(65 + position)}</span>
                      {option}
                    </button>
                  );
                })}
              </div>
              {done && <p className="cloze-explain">{question.explain}</p>}
            </div>
          );
        })}
      </div>
      {answered.length === questions.length && (
        <p className="cloze-score">得分 {score} / {questions.length}</p>
      )}
    </div>
  );
}

function SevenFiveView({ items }) {
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState({});
  const item = items[Math.min(index, items.length - 1)];
  if (!item) return <EmptyState title="还没有七选五">稍后再来，语篇正在补充。</EmptyState>;

  const gaps = item.answers || [];
  const filled = Object.fromEntries(gaps.filter((gap) => picked[gap.g]).map((gap) => [gap.g, (item.options.find((option) => option.k === picked[gap.g]) || {}).en]));
  const done = gaps.every((gap) => picked[gap.g]);
  const score = gaps.filter((gap) => picked[gap.g] === gap.k).length;

  return (
    <div className="exam-item" key={item.id}>
      <div className="exam-item-head">
        <div>
          <strong>{item.title}</strong>
          <span className="muted tiny">{gaps.length} 个空位 · {item.options.length} 个选项 · 约 {item.mins} 分钟</span>
        </div>
        <div className="exam-picker">
          <button type="button" className="icon-button" onClick={() => { setIndex((n) => Math.max(0, n - 1)); setPicked({}); }} aria-label="上一篇" disabled={index === 0}>
            <Icon name="left" size={18} />
          </button>
          <span>{index + 1} / {items.length}</span>
          <button type="button" className="icon-button" onClick={() => { setIndex((n) => Math.min(items.length - 1, n + 1)); setPicked({}); }} aria-label="下一篇" disabled={index >= items.length - 1}>
            <Icon name="right" size={18} />
          </button>
        </div>
      </div>
      <div className="exam-tags">{item.exam && <LevelBadge tone={item.exam === '中考' ? 'teal' : 'blue'}>{item.exam}</LevelBadge>}</div>
      <PassageText text={item.text} filled={done ? filled : null} />
      <div className="seven-options">
        {item.options.map((option) => (
          <div className="seven-option" key={option.k}>
            <span className="option-letter">{option.k}</span>
            <span className="seven-option-text">{option.en}</span>
            <SpeakButton text={option.en} small />
          </div>
        ))}
      </div>
      <div className="seven-answer">
        {gaps.map((gap) => (
          <div className="seven-slot" key={gap.g}>
            <span className="seven-num">{gap.g}</span>
            <div className="seven-picks">
              {item.options.map((option) => (
                <button
                  type="button"
                  key={option.k}
                  className={`pick ${picked[gap.g] === option.k ? 'picked' : ''} ${done && option.k === gap.k ? 'right' : ''} ${done && picked[gap.g] === option.k && option.k !== gap.k ? 'wrong' : ''}`}
                  onClick={() => setPicked((prev) => ({ ...prev, [gap.g]: option.k }))}
                >
                  {option.k}
                </button>
              ))}
            </div>
            {done && <p className="cloze-explain">{gap.explain}</p>}
          </div>
        ))}
      </div>
      {done && <p className="cloze-score">得分 {score} / {gaps.length}</p>}
      <p className="form-note">先读空位前后各一句，再回选项里找指代词与连接词。</p>
    </div>
  );
}

function ErrorFixView({ items }) {
  const [index, setIndex] = useState(0);
  const [reveal, setReveal] = useState(false);
  const item = items[Math.min(index, items.length - 1)];
  if (!item) return <EmptyState title="还没有短文改错">稍后再来，语篇正在补充。</EmptyState>;

  return (
    <div className="exam-item" key={item.id}>
      <div className="exam-item-head">
        <div>
          <strong>{item.title}</strong>
          <span className="muted tiny">{(item.fixes || []).length} 处错误 · 约 {item.mins} 分钟</span>
        </div>
        <div className="exam-picker">
          <button type="button" className="icon-button" onClick={() => { setIndex((n) => Math.max(0, n - 1)); setReveal(false); }} aria-label="上一篇" disabled={index === 0}>
            <Icon name="left" size={18} />
          </button>
          <span>{index + 1} / {items.length}</span>
          <button type="button" className="icon-button" onClick={() => { setIndex((n) => Math.min(items.length - 1, n + 1)); setReveal(false); }} aria-label="下一篇" disabled={index >= items.length - 1}>
            <Icon name="right" size={18} />
          </button>
        </div>
      </div>
      <div className="exam-tags">{item.exam && <LevelBadge tone={item.exam === '中考' ? 'teal' : 'blue'}>{item.exam}</LevelBadge>}</div>
      <div className="error-lines">
        {(item.lines || []).map((line) => (
          <p className="error-line" key={line.no}>
            <span className="error-no">{line.no}</span>
            <span>{line.text}</span>
          </p>
        ))}
      </div>
      <div className="exam-actions">
        <button type="button" className="secondary-button" onClick={() => setReveal((v) => !v)}>{reveal ? '收起修改' : '看修改'}</button>
      </div>
      <p className="form-note">每行最多两处错误；多词与缺词也要算。</p>
      {reveal && (
        <ol className="answer-list">
          {(item.fixes || []).map((fix, position) => (
            <li key={`${fix.no}-${position}`}>
              <strong>第 {fix.no} 行 · {fix.type}</strong>
              <p>{fix.from} → {fix.to}</p>
              <p className="fix-explain">{fix.explain}</p>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

const examDataSets = { gfill: grammarFills, cloze: clozes, seven: sevenFives, error: errorFixes };

export default function Lab({ intent }) {
  const [section, setSection] = useState(intent?.section || 'knowledge');
  const [tab, setTab] = useState(intent?.tab || 'verbs');
  const [examTab, setExamTab] = useState('gfill');

  return (
    <div className="screen lab-screen">
      <ScreenHeader
        eyebrow="EXAM BOOST"
        title="提分"
        sub="把初高中要背的表和要练的题型放在一起查。"
        right={<span className="header-count">{irregularVerbs.length + affixes.length + confusables.length + wordForms.length}<small> 条速查</small></span>}
      />

      <Segmented
        ariaLabel="提分模块"
        value={section}
        onChange={setSection}
        options={[
          { value: 'knowledge', label: '知识速查' },
          { value: 'exam', label: '题型专项' },
        ]}
      />

      {section === 'knowledge' && (
        <>
          <div className="chip-row sticky-chips">
            {knowledgeTabs.map((item) => <Chip key={item.id} active={tab === item.id} onClick={() => setTab(item.id)}>{item.name}</Chip>)}
          </div>
          {tab === 'verbs' && <VerbsView />}
          {tab === 'roots' && <AffixView />}
          {tab === 'confuse' && <ConfusableView />}
          {tab === 'forms' && <WordFormView />}
        </>
      )}

      {section === 'exam' && (
        <>
          <div className="chip-row sticky-chips">
            {examTabs.map((item) => (
              <Chip key={item.id} active={examTab === item.id} onClick={() => setExamTab(item.id)}>{item.name}</Chip>
            ))}
          </div>
          {examTab === 'gfill' && <GrammarFillView items={examDataSets.gfill} />}
          {examTab === 'cloze' && <ClozeView items={examDataSets.cloze} />}
          {examTab === 'seven' && <SevenFiveView items={examDataSets.seven} />}
          {examTab === 'error' && <ErrorFixView items={examDataSets.error} />}
        </>
      )}

      <div className="lab-foot">
        <Icon name="leaf" size={20} />
        <p>语篇均为本项目自编，不取自真题；空格标记为 ___数字___ ，做完整篇再对答案。</p>
      </div>
    </div>
  );
}
