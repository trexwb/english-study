import { useEffect, useMemo, useRef, useState } from 'react';
import { decks, words } from '../data/words.js';
import { affixes } from '../data/knowledge.js';
import { stories } from '../data/reading.js';
import { breakdownWord, guessPos, isDuplicate, lookupWord, normalizeWord } from '../enrich.js';
import { buildWordQueue, dictationQueue, poolFor, wordCounts } from '../useStudy.js';
import { speak } from '../utils.js';
import { Chip, EmptyState, Icon, ScreenHeader, Segmented, SpeakButton } from '../ui.jsx';

const LIST_PAGE = 80;
const EMPTY_ENTRY_FORM = { p: '', pos: '', zh: '', ex: '', exZh: '' };
const POS_CHIPS = ['n.', 'v.', 'adj.', 'adv.'];

const statusFor = (progress, today) => {
  if (!progress) return { label: '新词', tone: 'new' };
  if (progress.box >= 4) return { label: '已掌握', tone: 'mastered' };
  if (progress.due <= today) return { label: '待复习', tone: 'due' };
  return { label: '学习中', tone: 'learning' };
};

const todayKey = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

// 识别预填：内置命中全字段按词条，原著词表只有 p/zh（词性按词尾推测），未命中全靠推测。
function recognizeForm(word) {
  const { entry } = lookupWord(word, { words, stories });
  return {
    p: entry.p,
    pos: entry.pos || guessPos(word),
    zh: entry.zh,
    ex: entry.ex,
    exZh: entry.exZh,
  };
}

function DeckPicker({ value, onChange, counts }) {
  return (
    <div className="deck-picker">
      <button type="button" className={`deck-pill ${value === 'all' ? 'active' : ''}`} onClick={() => onChange('all')}>
        <span className="deck-pill-icon">◎</span>
        <span>
          <strong>全部词库</strong>
          <small>{counts.total} 词</small>
        </span>
      </button>
      {decks.map((deck) => (
        <button type="button" key={deck.id} className={`deck-pill ${value === deck.id ? 'active' : ''}`} onClick={() => onChange(deck.id)}>
          <span className="deck-pill-icon">{deck.icon}</span>
          <span>
            <strong>{deck.name}</strong>
            <small>{counts.byDeck?.[deck.id] ?? ''}</small>
          </span>
        </button>
      ))}
    </div>
  );
}

function StudyCard({ word, progress, revealed, onReveal, onRate, index, total }) {
  return (
    <div className="study-wrap">
      <div className="session-top">
        <button type="button" className="text-button" onClick={() => onRate('exit')}>
          <Icon name="left" size={16} /> 退出本轮
        </button>
        <span className="muted tiny">{index + 1} / {total}</span>
      </div>
      <div className="session-track"><span style={{ width: `${((index) / total) * 100}%` }} /></div>

      <div className={`study-card ${revealed ? 'revealed' : ''}`}>
        <div className="study-card-top">
          <span className="deck-label">{decks.find((deck) => deck.id === word.deck)?.name}</span>
          <span className={`word-status ${statusFor(progress, todayKey()).tone}`}>{statusFor(progress, todayKey()).label}</span>
        </div>
        <div className={`study-word ${word.w.length > 9 ? 'long' : ''}`}>{word.w}</div>
        <div className="study-meta">
          <span className="phonetic">{word.p}</span>
          <span className="pos">{word.pos}</span>
          <SpeakButton text={word.w} small />
        </div>

        {!revealed ? (
          <div className="study-prompt">
            <p>先在心里回想它的意思，再翻开答案。</p>
            <button type="button" className="reveal-button" onClick={onReveal}>
              <Icon name="eye" size={18} /> 显示释义
            </button>
          </div>
        ) : (
          <div className="study-answer">
            <p className="study-zh">{word.zh}</p>
            {(word.ex || word.exZh) && (
              <div className="study-example">
                {word.ex && <p>{word.ex}</p>}
                {word.exZh && <p className="example-zh">{word.exZh}</p>}
              </div>
            )}
            <div className="study-tip">
              <Icon name="sparkle" size={15} />
              想到意思就点“记得”，不必追求逐字翻译。
            </div>
          </div>
        )}
      </div>

      {revealed ? (
        <div className="rating-row">
          <button type="button" className="rating again" onClick={() => onRate('again')}>
            <span>忘记</span>
            <small>再来一次</small>
          </button>
          <button type="button" className="rating hard" onClick={() => onRate('hard')}>
            <span>模糊</span>
            <small>稍后再见</small>
          </button>
          <button type="button" className="rating good" onClick={() => onRate('good')}>
            <span>记得</span>
            <small>拉长间隔</small>
          </button>
        </div>
      ) : (
        <p className="study-hint">凭记忆作答，效果比反复看更好。</p>
      )}
    </div>
  );
}

function StudySummary({ results, onRestart, onList, onDictation }) {
  const again = results.filter((item) => item.grade === 'again').length;
  const good = results.filter((item) => item.grade === 'good').length;
  const xp = results.reduce((sum, item) => sum + (item.grade === 'again' ? 1 : item.grade === 'hard' ? 2 : 3), 0);
  return (
    <div className="summary-wrap">
      <div className="summary-badge"><Icon name="trophy" size={34} /></div>
      <p className="eyebrow">SESSION COMPLETE</p>
      <h2 className="summary-title">这一轮完成了</h2>
      <p className="summary-sub">你复习了 {results.length} 个单词，记忆正在变牢。</p>
      <div className="summary-stats">
        <div><strong>{good}</strong><span>记得</span></div>
        <div><strong>{again}</strong><span>需重来</span></div>
        <div><strong>+{xp}</strong><span>XP</span></div>
      </div>
      <div className="summary-actions">
        <button type="button" className="primary-button" onClick={onRestart}>再学一组 <Icon name="arrow" size={17} /></button>
        <button type="button" className="secondary-button" onClick={onList}>浏览词库</button>
        <button type="button" className="ghost-button" onClick={onDictation}>去默写这组词</button>
      </div>
    </div>
  );
}

function DictationSetup({ length, setLength, mode, setMode, deck, setDeck, onStart, counts, notice }) {
  return (
    <div className="dict-setup">
      <div className="dict-hero">
        <span className="dict-hero-icon"><Icon name="headphones" size={30} /></span>
        <div>
          <h2>把单词写出来</h2>
          <p>听发音或看中文，拼出完整单词。错了也没关系，马上就能重来。</p>
        </div>
      </div>

      <div className="setup-block">
        <p className="setup-label">练习方式</p>
        <div className="mode-cards">
          <button type="button" className={`mode-card ${mode === 'listen' ? 'active' : ''}`} onClick={() => setMode('listen')}>
            <Icon name="volume" size={21} />
            <strong>听音默写</strong>
            <small>听发音，拼出单词</small>
          </button>
          <button type="button" className={`mode-card ${mode === 'meaning' ? 'active' : ''}`} onClick={() => setMode('meaning')}>
            <Icon name="eye" size={21} />
            <strong>看中文默写</strong>
            <small>根据释义回忆拼写</small>
          </button>
        </div>
      </div>

      <div className="setup-block">
        <p className="setup-label">选择词库</p>
        <div className="chip-row">
          <Chip active={deck === 'all'} onClick={() => setDeck('all')}>全部 {counts.total}</Chip>
          {decks.map((item) => (
            <Chip key={item.id} active={deck === item.id} onClick={() => setDeck(item.id)}>{item.name}</Chip>
          ))}
        </div>
      </div>

      <div className="setup-block">
        <p className="setup-label">题量</p>
        <div className="chip-row">
          {[5, 10, 15].map((count) => (
            <Chip key={count} active={length === count} onClick={() => setLength(count)}>{count} 个</Chip>
          ))}
        </div>
      </div>

      {notice && <p className="input-error">{notice}</p>}

      <button type="button" className="primary-button wide-button" onClick={onStart}>
        开始默写 <Icon name="arrow" size={18} />
      </button>
      <p className="form-note">不区分大小写；拼写错误会显示正确形式和例句。</p>
    </div>
  );
}

export default function Words({ data, actions, intent }) {
  const [mode, setMode] = useState(intent?.mode || 'study');
  const [deck, setDeck] = useState('all');
  const [search, setSearch] = useState('');
  const [shown, setShown] = useState(LIST_PAGE);
  const [expanded, setExpanded] = useState(null);
  const [session, setSession] = useState(null);
  const [dictDeck, setDictDeck] = useState('all');
  const [dictMode, setDictMode] = useState('listen');
  const [dictLength, setDictLength] = useState(10);
  const [dictation, setDictation] = useState(null);
  const [value, setValue] = useState('');
  const [checked, setChecked] = useState(false);
  const [hint, setHint] = useState(false);
  const [emptyError, setEmptyError] = useState(false);
  const [entryInput, setEntryInput] = useState('');
  const [entryQuery, setEntryQuery] = useState('');
  const [entryForm, setEntryForm] = useState(EMPTY_ENTRY_FORM);
  const [entryEditing, setEntryEditing] = useState(null);
  const [entrySaved, setEntrySaved] = useState(null);
  const [dictNotice, setDictNotice] = useState('');
  const inputRef = useRef(null);
  const entryInputRef = useRef(null);

  const counts = wordCounts(data, deck);
  const byDeck = useMemo(() => {
    const result = {};
    for (const item of decks) result[item.id] = wordCounts(data, item.id).total;
    return result;
  }, [data]);
  const allCounts = { ...wordCounts(data, 'all'), byDeck };
  const goal = data.settings.dailyGoal || 10;

  useEffect(() => {
    setShown(LIST_PAGE);
  }, [deck, search]);

  useEffect(() => {
    if (!intent) return;
    if (intent.mode) setMode(intent.mode);
    if (intent.mode === 'study') setSession(null);
    if (intent.mode === 'dictation') setDictation(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [intent?.nonce]);

  // 录入识别走 250ms 防抖；normalizeWord 是同步的，防抖只挡住后续识别计算。
  useEffect(() => {
    const timer = setTimeout(() => setEntryQuery(normalizeWord(entryInput)), 250);
    return () => clearTimeout(timer);
  }, [entryInput]);

  // 识别结果变化时预填表单；编辑态的词条以存储内容为准，改拼写则按新词重新识别。
  useEffect(() => {
    if (!entryQuery) return;
    if (entryEditing) {
      const item = data.customWords.find((word) => word.w === entryEditing);
      setEntryForm(item && entryQuery === entryEditing
        ? { p: item.p || '', pos: item.pos || '', zh: item.zh || '', ex: item.ex || '', exZh: item.exZh || '' }
        : recognizeForm(entryQuery));
      return;
    }
    setEntryForm(recognizeForm(entryQuery));
  }, [entryQuery]);

  const current = session && session.index < session.queue.length ? session.queue[session.index] : null;
  const finished = session && session.index >= session.queue.length;

  function startSession() {
    const queue = buildWordQueue(data, deck, goal);
    setSession({ queue, index: 0, revealed: false, results: [] });
    setMode('study');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function rate(grade) {
    if (grade === 'exit') {
      setSession(null);
      return;
    }
    if (!current) return;
    actions.gradeWord(current.w, grade);
    setSession((prev) => ({
      ...prev,
      index: prev.index + 1,
      revealed: false,
      results: [...prev.results, { word: current, grade }],
    }));
  }

  function startDictation() {
    const items = dictationQueue(data, dictDeck, dictLength);
    if (items.length === 0) {
      setDictNotice('这个词库还没有词，先去「录入」添加。');
      return;
    }
    setDictNotice('');
    setDictation({ items, index: 0, results: [] });
    setValue('');
    setChecked(false);
    setHint(false);
    setEmptyError(false);
  }

  const dictCurrent = dictation && dictation.index < dictation.items.length ? dictation.items[dictation.index] : null;
  const dictFinished = dictation && dictation.index >= dictation.items.length;

  useEffect(() => {
    if (!dictCurrent || checked || dictMode !== 'listen') return undefined;
    const timer = setTimeout(() => speak(dictCurrent.w), 280);
    return () => clearTimeout(timer);
  }, [dictation?.index, checked, dictMode]);

  function checkDictation() {
    if (!dictCurrent || !value.trim()) {
      setEmptyError(true);
      return;
    }
    const correct = value.trim().toLowerCase() === dictCurrent.w.toLowerCase();
    actions.record('dictation', 1, correct ? 4 : 1);
    setDictation((prev) => ({
      ...prev,
      results: [...prev.results, { word: dictCurrent, correct, answer: value.trim() }],
    }));
    setChecked(true);
    setEmptyError(false);
  }

  function nextDictation() {
    if (!dictation) return;
    if (dictation.index + 1 >= dictation.items.length) {
      setDictation((prev) => ({ ...prev, index: prev.index + 1 }));
      return;
    }
    setDictation((prev) => ({ ...prev, index: prev.index + 1 }));
    setValue('');
    setChecked(false);
    setHint(false);
    setEmptyError(false);
    setTimeout(() => inputRef.current?.focus(), 80);
  }

  const filteredWords = useMemo(() => {
    const pool = poolFor(data, deck);
    const query = search.trim().toLowerCase();
    if (!query) return pool;
    return pool.filter((word) => word.w.toLowerCase().includes(query) || word.zh.includes(query));
  }, [data, deck, search]);

  const visibleWords = filteredWords.slice(0, shown);

  // —— 录入视图的派生状态：五态状态条 + 禁用条件，均与 enrich.js 同源。
  const entryWord = entryQuery;
  const entryLookup = entryWord ? lookupWord(entryWord, { words, stories }) : null;
  const entryBuiltinHit = Boolean(entryWord && words.some((item) => item.w === entryWord));
  const entryDuplicate = Boolean(entryWord && isDuplicate(entryWord, words, data.customWords, entryEditing || ''));
  const entryBreakdown = useMemo(() => (entryWord ? breakdownWord(entryWord, affixes) : null), [entryWord]);
  const entrySaveDisabled = !entryWord || entryWord.length > 30 || entryDuplicate || !entryForm.zh.trim();
  // 拆解卡只在「原著词表命中/未命中」两态显示；重复态（含内置词）与编辑自身词条时不显示。
  const showBreakdown = Boolean(entryWord) && !entryDuplicate && !(entryEditing && entryWord === entryEditing);
  const entryCtaWord = normalizeWord(search);
  const studyEmpty = deck === 'custom' && counts.total === 0;

  let entryStatus = null;
  if (entryInput.trim() && !entrySaved) {
    if (!entryWord) {
      entryStatus = { tone: 'guess', text: '暂不识别：目前只支持单个纯字母单词——多词短语、连字符、撇号和数字都不支持。' };
    } else if (entryWord.length > 30) {
      entryStatus = { tone: 'guess', text: `单词太长：目前最多支持 30 个字母（当前 ${entryWord.length} 个）。` };
    } else if (entryEditing && entryWord === entryEditing) {
      entryStatus = { tone: 'guess', text: '正在编辑你录入的词，下面按保存的内容预填，改完保存即可。' };
    } else if (entryDuplicate) {
      // 内置词命中必然带出重复分支（isDuplicate 对内置词不可排除），按来源给差异化文案。
      entryStatus = entryBuiltinHit
        ? { tone: 'error', text: `「${entryWord}」是内置词库里的词，直接去学习吧。` }
        : { tone: 'error', text: `「${entryWord}」已经在你的词库里了（你录入过），直接去学习吧。` };
    } else if (entryLookup.found) {
      entryStatus = { tone: 'glossary', text: '只在原著词表里找到读音和释义（没有词性和例句）；词性是按词尾推测的。' };
    } else {
      entryStatus = { tone: 'guess', text: '词库里没有这个词：释义需要你自己填；音标拿不到，发音按钮始终可用；下面的拆解和词性是按词尾推测的，仅供参考。' };
    }
  }

  function openEntryView(prefill = '') {
    setEntryEditing(null);
    setEntrySaved(null);
    setEntryInput(prefill);
    setEntryForm(prefill ? recognizeForm(normalizeWord(prefill)) : EMPTY_ENTRY_FORM);
    setMode('entry');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function openEdit(word) {
    setEntryEditing(word.w);
    setEntrySaved(null);
    setEntryInput(word.w);
    setEntryForm({ p: word.p || '', pos: word.pos || '', zh: word.zh || '', ex: word.ex || '', exZh: word.exZh || '' });
    setMode('entry');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function cancelEntryEdit() {
    setEntryEditing(null);
    setEntrySaved(null);
    setEntryInput('');
    setEntryForm(EMPTY_ENTRY_FORM);
    setMode('list');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function saveEntry() {
    if (entrySaveDisabled) return;
    const payload = {
      w: entryWord,
      p: entryForm.p.trim(),
      pos: entryForm.pos.trim(),
      zh: entryForm.zh.trim(),
      ex: entryForm.ex.trim(),
      exZh: entryForm.exZh.trim(),
    };
    if (entryEditing) {
      actions.updateCustomWord(entryEditing, payload);
      cancelEntryEdit();
      return;
    }
    actions.addCustomWord(payload);
    setEntrySaved(payload);
  }

  function studySavedWord() {
    setDeck('custom');
    setSession(null);
    setMode('study');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function dictateSavedWord() {
    setDictDeck('custom');
    setDictation(null);
    setDictNotice('');
    setMode('dictation');
  }

  function continueEntry() {
    setEntrySaved(null);
    setEntryInput('');
    setEntryForm(EMPTY_ENTRY_FORM);
    setTimeout(() => entryInputRef.current?.focus(), 80);
  }

  return (
    <div className="screen words-screen">
      <ScreenHeader
        eyebrow="VOCABULARY"
        title="单词"
        sub="间隔复习，让记忆留在长期里。"
        right={<span className="header-count">{counts.total}<small> 词</small></span>}
      />
      <Segmented
        value={mode}
        onChange={setMode}
        options={[
          { value: 'study', label: '学习' },
          { value: 'list', label: '词库' },
          { value: 'dictation', label: '默写' },
          { value: 'entry', label: '录入' },
        ]}
      />

      {mode === 'study' && (
        <>
          {!session && (
            <div className="study-setup">
              {studyEmpty ? (
                <EmptyState
                  icon="pen"
                  title="我的词库还是空的"
                  action={<button type="button" className="primary-button" onClick={() => openEntryView()}>去录入第一个单词</button>}
                >
                  录入的生词会自动排进学习、默写和复习计划。
                </EmptyState>
              ) : (
                <div className="study-overview">
                  <div>
                    <p className="eyebrow">TODAY'S PLAN</p>
                    <h2>{counts.due + counts.fresh} 个待学</h2>
                    <p>{counts.due} 个待复习 · {counts.fresh} 个新词</p>
                  </div>
                  <div className="overview-ring">
                    <strong>{counts.mastered}</strong>
                    <span>已掌握</span>
                  </div>
                </div>
              )}

              <DeckPicker value={deck} onChange={setDeck} counts={allCounts} />

              {!studyEmpty && (
                <>
                  <div className="mastery-line">
                    <div className="mastery-copy">
                      <span>本词库掌握度</span>
                      <strong>{counts.total ? Math.round((counts.mastered / counts.total) * 100) : 0}%</strong>
                    </div>
                    <div className="mastery-track"><span style={{ width: `${counts.total ? (counts.mastered / counts.total) * 100 : 0}%` }} /></div>
                  </div>

                  <button type="button" className="primary-button wide-button" onClick={startSession}>
                    开始学习 {Math.min(goal, counts.total)} 个单词 <Icon name="arrow" size={18} />
                  </button>

                  <div className="srs-note">
                    <Icon name="rotate" size={18} />
                    <div>
                      <strong>复习节奏</strong>
                      <p>1 天 → 3 天 → 7 天 → 21 天。选“忘记”会从今天重新开始。</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {current && (
            <StudyCard
              word={current}
              progress={data.wordProgress[current.w]}
              revealed={session.revealed}
              onReveal={() => setSession((prev) => ({ ...prev, revealed: true }))}
              onRate={rate}
              index={session.index}
              total={session.queue.length}
            />
          )}

          {finished && (
            <StudySummary
              results={session.results}
              onRestart={startSession}
              onList={() => setMode('list')}
              onDictation={() => { setMode('dictation'); setDictDeck(deck); setDictation(null); }}
            />
          )}
        </>
      )}

      {mode === 'list' && (
        <div className="word-list-view">
          <div className="search-box">
            <Icon name="search" size={18} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="搜索单词或中文释义"
              aria-label="搜索单词"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck="false"
            />
            {search && (
              <button type="button" className="icon-button tiny-button" onClick={() => setSearch('')} aria-label="清空搜索">
                <Icon name="close" size={15} />
              </button>
            )}
          </div>

          <div className="chip-row">
            <Chip active={deck === 'all'} onClick={() => setDeck('all')}>全部</Chip>
            {decks.map((item) => <Chip key={item.id} active={deck === item.id} onClick={() => setDeck(item.id)}>{item.name}</Chip>)}
          </div>

          <p className="list-count">
            共 {filteredWords.length} 个单词{filteredWords.length > visibleWords.length ? `，已显示 ${visibleWords.length} 个` : ''}
          </p>
          <div className="word-list">
            {visibleWords.map((word) => {
              const progress = data.wordProgress[word.w];
              const status = statusFor(progress, todayKey());
              const open = expanded === word.w;
              return (
                <div className={`word-list-item ${open ? 'open' : ''}`} key={word.w}>
                  <div className="word-list-row">
                    <button type="button" className="word-main" onClick={() => setExpanded(open ? null : word.w)}>
                      <span className="word-main-text">
                        <span className="word-line"><strong>{word.w}</strong><span className={`word-status ${status.tone}`}>{status.label}</span></span>
                        <span className="word-phonetic">{word.p} <span>{word.pos}</span></span>
                        <span className="word-zh">{word.zh}</span>
                      </span>
                      <span className="word-boxes" aria-label={`记忆阶段 ${progress?.box || 0} / 5`}>
                        {[1, 2, 3, 4, 5].map((step) => <i key={step} className={(progress?.box || 0) >= step ? 'on' : ''} />)}
                      </span>
                    </button>
                    <SpeakButton text={word.w} small />
                  </div>
                  {open && (
                    <div className="word-expand">
                      {word.ex && <p>{word.ex}</p>}
                      {word.exZh && <p className="example-zh">{word.exZh}</p>}
                      <p className="next-review">
                        {progress ? `下次复习：${progress.due}` : '还没有学习过，去“学习”里认识它。'}
                      </p>
                      {word.deck === 'custom' && (
                        <div className="custom-word-actions">
                          <span className="custom-added">{word.added ? `录入于 ${word.added}` : '自己录入的词'}</span>
                          <button type="button" className="text-button" onClick={() => openEdit(word)}>编辑</button>
                          <button
                            type="button"
                            className="text-button"
                            onClick={() => {
                              if (window.confirm('删除这个词？它的学习进度也会一起删除。')) actions.deleteCustomWord(word.w);
                            }}
                          >
                            删除
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
            {filteredWords.length === 0 && !search.trim() && (
              <EmptyState
                icon={deck === 'custom' ? 'pen' : 'search'}
                title={deck === 'custom' ? '我的词库还是空的' : '这个词库暂时没有词'}
                action={deck === 'custom' ? (
                  <button type="button" className="primary-button" onClick={() => openEntryView()}>去录入</button>
                ) : null}
              >
                {deck === 'custom' ? '遇到的生词录进来，就能一起学习、默写和复习。' : '换一个词库看看，或在「录入」里添加。'}
              </EmptyState>
            )}
            {filteredWords.length === 0 && search.trim() !== '' && (
              <div className="no-result">
                <p>没有找到这个词。</p>
                {entryCtaWord && !isDuplicate(entryCtaWord, words, data.customWords) && (
                  <button type="button" className="text-button" onClick={() => openEntryView(entryCtaWord)}>
                    录入「{entryCtaWord}」
                  </button>
                )}
                <button type="button" className="text-button" onClick={() => { setSearch(''); setDeck('all'); }}>清空筛选</button>
              </div>
            )}
          </div>

          {filteredWords.length > visibleWords.length && (
            <button type="button" className="secondary-button wide-button load-more-button" onClick={() => setShown((n) => n + LIST_PAGE)}>
              加载更多（还剩 {filteredWords.length - visibleWords.length} 个）
            </button>
          )}
        </div>
      )}

      {mode === 'dictation' && !dictation && (
        <DictationSetup
          length={dictLength}
          setLength={setDictLength}
          mode={dictMode}
          setMode={setDictMode}
          deck={dictDeck}
          setDeck={(id) => { setDictDeck(id); setDictNotice(''); }}
          onStart={startDictation}
          counts={allCounts}
          notice={dictNotice}
        />
      )}

      {mode === 'dictation' && dictCurrent && (
        <div className="dictation-wrap">
          <div className="session-top">
            <button type="button" className="text-button" onClick={() => setDictation(null)}>
              <Icon name="left" size={16} /> 退出默写
            </button>
            <span className="muted tiny">{dictation.index + 1} / {dictation.items.length}</span>
          </div>
          <div className="session-track"><span style={{ width: `${(dictation.index / dictation.items.length) * 100}%` }} /></div>

          <div className="dict-card">
            <p className="dict-kicker">{dictMode === 'listen' ? 'LISTEN & SPELL' : 'MEANING & SPELL'}</p>
            {dictMode === 'listen' ? (
              <>
                <button type="button" className="audio-orb" onClick={() => speak(dictCurrent.w)} aria-label="播放发音">
                  <Icon name="volume" size={34} />
                </button>
                <p className="dict-hint-text">点击喇叭重听，写出你听到的单词。</p>
              </>
            ) : (
              <>
                <p className="dict-meaning">{dictCurrent.zh}</p>
                <p className="dict-hint-text">根据中文释义，写出对应的英文单词。</p>
              </>
            )}

            {hint && (
              <p className="letter-hint">
                {dictCurrent.w.slice(0, 1)}
                {Array.from({ length: Math.max(0, dictCurrent.w.length - 1) }).map((_, index) => <span key={index}>·</span>)}
                <span className="hint-length">（{dictCurrent.w.length} 个字母）</span>
              </p>
            )}

            <input
              ref={inputRef}
              className={`dict-input ${checked ? (dictation.results[dictation.results.length - 1]?.correct ? 'correct' : 'wrong') : ''}`}
              value={value}
              onChange={(event) => { setValue(event.target.value); setEmptyError(false); }}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  if (checked) nextDictation();
                  else checkDictation();
                }
              }}
              placeholder="在这里拼写…"
              aria-label="输入单词"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck="false"
              disabled={checked}
            />
            {emptyError && <p className="input-error">先写一个答案，再检查。</p>}

            {!checked ? (
              <div className="dict-actions">
                <button type="button" className="text-button" onClick={() => setHint(true)}>首字母提示</button>
                <button type="button" className="primary-button" onClick={checkDictation}>检查拼写</button>
              </div>
            ) : (
              <div className={`dict-feedback ${dictation.results[dictation.results.length - 1]?.correct ? 'ok' : 'bad'}`}>
                <div className="feedback-head">
                  <span>{dictation.results[dictation.results.length - 1]?.correct ? '拼写正确' : '再看一眼'}</span>
                  <SpeakButton text={dictCurrent.w} small />
                </div>
                {!dictation.results[dictation.results.length - 1]?.correct && (
                  <p className="feedback-answer">{dictCurrent.w}</p>
                )}
                <p className="feedback-meta">{[dictCurrent.p, dictCurrent.pos, dictCurrent.zh].filter(Boolean).join(' · ')}</p>
                {dictCurrent.ex && <p className="feedback-ex">{dictCurrent.ex}</p>}
                {dictCurrent.exZh && <p className="feedback-ex-zh">{dictCurrent.exZh}</p>}
                <button type="button" className="primary-button wide-button" onClick={nextDictation}>
                  {dictation.index + 1 >= dictation.items.length ? '查看结果' : '下一题'} <Icon name="arrow" size={17} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {mode === 'dictation' && dictFinished && (
        <div className="summary-wrap">
          <div className="summary-badge amber"><Icon name="headphones" size={34} /></div>
          <p className="eyebrow">DICTATION COMPLETE</p>
          <h2 className="summary-title">默写完成</h2>
          <p className="summary-sub">
            答对 {dictation.results.filter((item) => item.correct).length} / {dictation.results.length} 个。
            {dictation.results.every((item) => item.correct) ? ' 全对，非常稳。' : ' 错过的词已经留在下面。'}
          </p>
          <div className="review-list">
            {dictation.results.map((item, index) => (
              <div className={`review-row ${item.correct ? 'ok' : 'bad'}`} key={`${item.word.w}-${index}`}>
                <span className="review-icon"><Icon name={item.correct ? 'check' : 'close'} size={16} /></span>
                <div>
                  <strong>{item.word.w}</strong>
                  {!item.correct && <span className="review-wrong">你写了 “{item.answer}”</span>}
                  <small>{item.word.zh}</small>
                </div>
                <SpeakButton text={item.word.w} small />
              </div>
            ))}
          </div>
          <div className="summary-actions">
            <button type="button" className="primary-button" onClick={startDictation}>再练一组 <Icon name="arrow" size={17} /></button>
            <button type="button" className="secondary-button" onClick={() => setDictation(null)}>返回设置</button>
            <button type="button" className="ghost-button" onClick={() => setMode('study')}>去背单词</button>
          </div>
        </div>
      )}

      {mode === 'entry' && (
        <div className="entry-setup">
          <div className="entry-head">
            <h2>{entryEditing ? '编辑生词' : '录入生词'}</h2>
            <p>{entryEditing ? '改拼写会当作新词从头学；只改释义不影响进度。' : '识别和拆解只是参考，释义用你自己的话写最记得住。'}</p>
          </div>

          <div className="search-box">
            <Icon name="edit" size={18} />
            <input
              ref={entryInputRef}
              value={entryInput}
              onChange={(event) => { setEntryInput(event.target.value); setEntrySaved(null); }}
              placeholder="输入一个英文单词，如 weary"
              aria-label="输入要录入的单词"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck="false"
            />
            {entryInput && (
              <button
                type="button"
                className="icon-button tiny-button"
                onClick={() => { setEntryInput(''); setEntryForm(EMPTY_ENTRY_FORM); setEntrySaved(null); }}
                aria-label="清空输入"
              >
                <Icon name="close" size={15} />
              </button>
            )}
            {entryWord && <SpeakButton text={entryWord} small />}
          </div>

          {entryStatus && <div className={`entry-status ${entryStatus.tone}`}>{entryStatus.text}</div>}

          {showBreakdown && entryBreakdown && (
            <div className="entry-parts-card">
              <p className="entry-parts-title">词根拆解（推测）</p>
              <div className="entry-parts">
                {entryBreakdown.parts.map((part, index) => (
                  <span key={`${part}-${index}`} className={`part-chip ${part.includes('-') ? 'affix' : ''}`}>{part}</span>
                ))}
              </div>
              <p className="entry-parts-note">{entryBreakdown.note}</p>
              {entryBreakdown.related.length > 0 && (
                <p className="entry-related">同根词：{entryBreakdown.related.join('、')}</p>
              )}
            </div>
          )}

          {entrySaved ? (
            <div className="entry-done">
              <div className="entry-done-icon"><Icon name="check" size={22} /></div>
              <p className="entry-done-title">已加入「我的词库」</p>
              <p className="entry-done-sub">「{entrySaved.w}」已排进下一轮学习计划，之后随时可以回词库编辑。</p>
              <div className="entry-done-actions">
                <button type="button" className="primary-button" onClick={studySavedWord}>去学习它 <Icon name="arrow" size={17} /></button>
                <button type="button" className="secondary-button" onClick={dictateSavedWord}>去默写</button>
                <button type="button" className="text-button" onClick={continueEntry}>继续录入</button>
              </div>
            </div>
          ) : (
            <div className="entry-form">
              <div className="entry-field">
                <span className="entry-label">音标</span>
                <input
                  value={entryForm.p}
                  onChange={(event) => setEntryForm((prev) => ({ ...prev, p: event.target.value }))}
                  placeholder={entryLookup?.found ? '按词表预填，可改' : '没有现成音标，可留空——发音按钮始终可用'}
                  aria-label="音标"
                />
              </div>

              <div className="entry-field">
                <span className="entry-label">{entryBuiltinHit || entryEditing ? '词性' : '词性（按词尾推测，可改）'}</span>
                <input
                  value={entryForm.pos}
                  onChange={(event) => setEntryForm((prev) => ({ ...prev, pos: event.target.value }))}
                  placeholder="如 n. / v. / adj. / adv."
                  aria-label="词性"
                />
                <div className="chip-row entry-pos-chips">
                  {POS_CHIPS.map((pos) => (
                    <Chip key={pos} active={entryForm.pos === pos} onClick={() => setEntryForm((prev) => ({ ...prev, pos }))}>{pos}</Chip>
                  ))}
                </div>
              </div>

              <div className="entry-field">
                <span className="entry-label">释义（必填）</span>
                <input
                  value={entryForm.zh}
                  onChange={(event) => setEntryForm((prev) => ({ ...prev, zh: event.target.value }))}
                  placeholder="必填：用你自己的话写释义"
                  aria-label="释义"
                />
              </div>

              <div className="entry-field">
                <span className="entry-label">例句（选填）</span>
                <input
                  value={entryForm.ex}
                  onChange={(event) => setEntryForm((prev) => ({ ...prev, ex: event.target.value }))}
                  placeholder="一句你记得住的英文例句"
                  aria-label="例句"
                />
              </div>

              <div className="entry-field">
                <span className="entry-label">例句译文（选填）</span>
                <input
                  value={entryForm.exZh}
                  onChange={(event) => setEntryForm((prev) => ({ ...prev, exZh: event.target.value }))}
                  placeholder="例句的中文翻译"
                  aria-label="例句译文"
                />
              </div>

              <button type="button" className="primary-button wide-button" disabled={entrySaveDisabled} onClick={saveEntry}>
                {entryEditing ? '保存修改' : '保存到我的词库'} <Icon name="arrow" size={17} />
              </button>
              {entryEditing && (
                <button type="button" className="secondary-button wide-button" onClick={cancelEntryEdit}>取消</button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
