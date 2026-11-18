import { useEffect, useMemo, useRef, useState } from 'react';
import { decks, words } from '../data/words.js';
import { buildWordQueue, dictationQueue, wordCounts } from '../useStudy.js';
import { speak } from '../utils.js';
import { Chip, Icon, ScreenHeader, Segmented, SpeakButton } from '../ui.jsx';

const LIST_PAGE = 80;

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
            <div className="study-example">
              <p>{word.ex}</p>
              <p className="example-zh">{word.exZh}</p>
            </div>
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

function DictationSetup({ length, setLength, mode, setMode, deck, setDeck, onStart, counts }) {
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
  const inputRef = useRef(null);

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
    const pool = deck === 'all' ? words : words.filter((word) => word.deck === deck);
    const query = search.trim().toLowerCase();
    if (!query) return pool;
    return pool.filter((word) => word.w.toLowerCase().includes(query) || word.zh.includes(query));
  }, [deck, search]);

  const visibleWords = filteredWords.slice(0, shown);

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
        ]}
      />

      {mode === 'study' && (
        <>
          {!session && (
            <div className="study-setup">
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

              <DeckPicker value={deck} onChange={setDeck} counts={allCounts} />

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
                      <p>{word.ex}</p>
                      <p className="example-zh">{word.exZh}</p>
                      <p className="next-review">
                        {progress ? `下次复习：${progress.due}` : '还没有学习过，去“学习”里认识它。'}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
            {filteredWords.length === 0 && (
              <div className="no-result">
                <p>没有找到这个词。</p>
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
          setDeck={setDictDeck}
          onStart={startDictation}
          counts={allCounts}
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
                <p className="feedback-meta">{dictCurrent.p} · {dictCurrent.pos} · {dictCurrent.zh}</p>
                <p className="feedback-ex">{dictCurrent.ex}</p>
                <p className="feedback-ex-zh">{dictCurrent.exZh}</p>
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
    </div>
  );
}
