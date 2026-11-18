import { useEffect, useState } from 'react';
import { phraseGroups, phrases } from '../data/phrases.js';
import { essayStructures, modelEssays, writingPrompts } from '../data/writing.js';
import { countWords } from '../utils.js';
import { Chip, Icon, LevelBadge, ScreenHeader, Segmented, SpeakButton } from '../ui.jsx';

const LINKING_WORDS = ['however', 'therefore', 'although', 'moreover', 'furthermore', 'in addition', 'for example', 'for instance', 'as a result', 'on the other hand', 'in contrast', 'while', 'because', 'despite', 'nevertheless', 'ultimately'];

function PhraseView({ data, actions }) {
  const [group, setGroup] = useState('all');
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [layout, setLayout] = useState('card');

  const filtered = group === 'all' ? phrases : phrases.filter((phrase) => phrase.group === group);
  const current = filtered[Math.min(index, filtered.length - 1)];
  const doneCount = Object.keys(data.phraseDone).length;

  useEffect(() => {
    setIndex(0);
    setRevealed(false);
  }, [group]);

  function move(delta) {
    setIndex((prev) => (prev + delta + filtered.length) % filtered.length);
    setRevealed(false);
  }

  function master(phrase) {
    actions.markPhrase(phrase.id);
    setRevealed(true);
  }

  return (
    <div className="phrase-view">
      <div className="phrase-progress">
        <div>
          <p className="eyebrow">USEFUL PHRASES</p>
          <h2>{doneCount} <span>/ {phrases.length} 已掌握</span></h2>
        </div>
        <div className="progress-pill">{Math.round((doneCount / phrases.length) * 100)}%</div>
      </div>

      <div className="chip-row">
        <Chip active={group === 'all'} onClick={() => setGroup('all')}>全部</Chip>
        {phraseGroups.map((item) => <Chip key={item.id} active={group === item.id} onClick={() => setGroup(item.id)}>{item.icon} {item.name}</Chip>)}
      </div>

      <div className="view-toggle">
        <button type="button" className={layout === 'card' ? 'active' : ''} onClick={() => setLayout('card')}>卡片</button>
        <button type="button" className={layout === 'list' ? 'active' : ''} onClick={() => setLayout('list')}>列表</button>
      </div>

      {layout === 'card' && current && (
        <>
          <div className="phrase-card">
            <div className="phrase-card-top">
              <span className="phrase-group-label">{phraseGroups.find((item) => item.id === current.group)?.icon} {phraseGroups.find((item) => item.id === current.group)?.name}</span>
              <span className="muted tiny">{index + 1} / {filtered.length}</span>
            </div>
            <p className="phrase-en">{current.en}</p>
            <div className="phrase-speak"><SpeakButton text={current.en} label="朗读" small /></div>

            {!revealed ? (
              <button type="button" className="phrase-reveal" onClick={() => setRevealed(true)}>
                <Icon name="eye" size={18} />
                点开看中文与用法
              </button>
            ) : (
              <div className="phrase-answer">
                <p className="phrase-zh">{current.zh}</p>
                <p className="phrase-note">{current.note}</p>
                <div className="phrase-example">
                  <p>{current.ex}</p>
                  <p className="example-zh">{current.exZh}</p>
                </div>
              </div>
            )}
            {data.phraseDone[current.id] && <span className="mastered-ribbon"><Icon name="check" size={13} /> 已掌握</span>}
          </div>

          <div className="phrase-actions">
            <button type="button" className="round-button" onClick={() => move(-1)} aria-label="上一个短语"><Icon name="left" size={19} /></button>
            <button type="button" className={`master-button ${data.phraseDone[current.id] ? 'done' : ''}`} onClick={() => master(current)} disabled={data.phraseDone[current.id]}>
              <Icon name="check" size={17} /> {data.phraseDone[current.id] ? '已掌握' : '标记掌握'}
            </button>
            <button type="button" className="round-button" onClick={() => move(1)} aria-label="下一个短语"><Icon name="right" size={19} /></button>
          </div>
        </>
      )}

      {layout === 'list' && (
        <div className="phrase-list">
          {filtered.map((phrase) => (
            <div className={`phrase-row ${data.phraseDone[phrase.id] ? 'done' : ''}`} key={phrase.id}>
              <div className="phrase-row-main">
                <p>{phrase.en}</p>
                <span>{phrase.zh}</span>
                <small>{phrase.ex}</small>
              </div>
              <div className="phrase-row-side">
                <SpeakButton text={phrase.en} small />
                <button
                  type="button"
                  className={`check-button ${data.phraseDone[phrase.id] ? 'done' : ''}`}
                  onClick={() => actions.markPhrase(phrase.id)}
                  aria-label={data.phraseDone[phrase.id] ? '已掌握' : `标记 ${phrase.en} 为已掌握`}
                >
                  <Icon name="check" size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function StructureCard({ item, index, open, onToggle }) {
  return (
    <div className={`structure-card ${open ? 'open' : ''}`}>
      <button type="button" className="structure-head" onClick={onToggle}>
        <span className="structure-number">{String(index + 1).padStart(2, '0')}</span>
        <span className="structure-title">
          <strong>{item.title}</strong>
          <span>{item.en}</span>
        </span>
        <span className="structure-chevron"><Icon name={open ? 'down' : 'right'} size={18} /></span>
      </button>
      {open && (
        <div className="structure-body">
          <p className="structure-when">适用：{item.when}</p>
          <div className="outline-list">
            {item.outline.map((line, lineIndex) => (
              <div className="outline-row" key={line}>
                <span>{lineIndex + 1}</span>
                <p>{line}</p>
              </div>
            ))}
          </div>
          <p className="structure-subhead">可以直接套用的句子</p>
          <div className="frame-list">
            {item.frames.map((frame) => (
              <div className="frame-item" key={frame.en}>
                <div>
                  <p>{frame.en}</p>
                  <span>{frame.zh}</span>
                </div>
                <SpeakButton text={frame.en} small />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function TemplatesView() {
  const [open, setOpen] = useState('s1');
  return (
    <div className="templates-view">
      <div className="writing-intro">
        <span className="writing-intro-icon"><Icon name="layers" size={22} /></span>
        <div>
          <h2>先搭骨架，再填内容</h2>
          <p>好作文不是句子堆叠，而是清楚的结构。选一个题型，记住它的顺序和三个万能句。</p>
        </div>
      </div>
      <div className="structure-list">
        {essayStructures.map((item, index) => (
          <StructureCard key={item.id} item={item} index={index} open={open === item.id} onToggle={() => setOpen(open === item.id ? null : item.id)} />
        ))}
      </div>
    </div>
  );
}

function ModelsView({ actions, onPractice }) {
  const [selectedId, setSelectedId] = useState(null);
  const [showZh, setShowZh] = useState(false);
  const selected = modelEssays.find((essay) => essay.id === selectedId);

  if (selected) {
    return (
      <div className="model-detail">
        <button type="button" className="back-button" onClick={() => setSelectedId(null)}>
          <Icon name="left" size={18} /> 返回范文
        </button>
        <div className="model-detail-head">
          <div className="model-tags">
            <LevelBadge tone="amber">{selected.type}</LevelBadge>
            <LevelBadge tone="green">{selected.level}</LevelBadge>
            <span className="muted tiny">{selected.words} 词</span>
          </div>
          <h1>{selected.title}</h1>
          <p className="model-prompt">{selected.prompt}</p>
        </div>

        <div className="model-toolbar">
          <span>{showZh ? '双语精读' : '英文原文'}</span>
          <button type="button" className="text-button" onClick={() => setShowZh(!showZh)}>
            <Icon name={showZh ? 'hide' : 'eye'} size={15} /> {showZh ? '隐藏译文' : '显示译文'}
          </button>
        </div>

        <article className="essay">
          {selected.essay.map((paragraph, index) => (
            <div className="essay-paragraph" key={paragraph}>
              <div className="essay-number">{String(index + 1).padStart(2, '0')}</div>
              <div className="essay-copy">
                <div className="essay-en-row">
                  <p className="essay-en">{paragraph}</p>
                  <SpeakButton text={paragraph} small />
                </div>
                {showZh && <p className="essay-zh">{selected.zh[index]}</p>}
              </div>
            </div>
          ))}
        </article>

        <div className="expressions-card">
          <p className="eyebrow">USEFUL EXPRESSIONS</p>
          <h3>值得偷走的表达</h3>
          <div className="expression-chips">
            {selected.expressions.map((expression) => <span key={expression}>{expression}</span>)}
          </div>
        </div>

        <button type="button" className="primary-button wide-button" onClick={onPractice}>
          <Icon name="edit" size={17} /> 用这个结构练一篇
        </button>
      </div>
    );
  }

  return (
    <div className="models-view">
      <div className="writing-intro">
        <span className="writing-intro-icon"><Icon name="book" size={22} /></span>
        <div>
          <h2>读一篇，拆一篇</h2>
          <p>留意每一段在做什么：提出观点、给理由、让步，还是收束。读结构比背句子更重要。</p>
        </div>
      </div>
      <div className="model-list">
        {modelEssays.map((essay) => (
          <button type="button" className="model-card" key={essay.id} onClick={() => { setSelectedId(essay.id); setShowZh(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <div className="model-card-top">
              <LevelBadge tone="amber">{essay.type}</LevelBadge>
              <span className="muted tiny">{essay.words} 词 · {essay.level}</span>
            </div>
            <h3>{essay.title}</h3>
            <p>{essay.prompt}</p>
            <span className="model-link">精读范文 <Icon name="arrow" size={15} /></span>
          </button>
        ))}
      </div>
    </div>
  );
}

function PracticeView({ data, actions }) {
  const [promptId, setPromptId] = useState(writingPrompts[0].id);
  const [draft, setDraft] = useState(data.drafts[writingPrompts[0].id] || '');
  const [saveState, setSaveState] = useState('saved');
  const [justDone, setJustDone] = useState(false);

  const prompt = writingPrompts.find((item) => item.id === promptId) || writingPrompts[0];
  const words = countWords(draft);
  const paragraphs = draft.split(/\n+/).filter((paragraph) => paragraph.trim()).length;
  const numbers = (prompt.target.match(/\d+/g) || ['100']).map(Number);
  const minWords = numbers[0] || 100;
  const maxWords = numbers[1] || Math.round(minWords * 1.4);
  const submitMin = Math.max(40, Math.round(minWords * 0.6));
  const linking = LINKING_WORDS.filter((word) => draft.toLowerCase().includes(word));
  const lower = draft.toLowerCase();
  const iThink = (lower.match(/i think/g) || []).length;

  useEffect(() => {
    setSaveState('saving');
    const timer = setTimeout(() => {
      actions.saveDraft(promptId, draft);
      setSaveState('saved');
    }, 700);
    return () => clearTimeout(timer);
  }, [draft, promptId]);

  function choosePrompt(id) {
    actions.saveDraft(promptId, draft);
    setPromptId(id);
    setDraft(data.drafts[id] || '');
    setSaveState('saved');
    setJustDone(false);
  }

  function finish() {
    actions.saveDraft(promptId, draft);
    actions.markWriting(promptId, words);
    setJustDone(true);
  }

  const checks = [
    { label: `达到 ${minWords} 词`, ok: words >= minWords, detail: `${words} / ${minWords}` },
    { label: '至少分 3 段', ok: paragraphs >= 3, detail: `${paragraphs} 段` },
    { label: '使用连接词', ok: linking.length >= 2, detail: linking.length ? `已用 ${linking.length} 个` : '还没有' },
    { label: '避免反复用 I think', ok: iThink <= 1, detail: iThink > 1 ? `${iThink} 次` : '很好' },
  ];
  const passed = checks.filter((check) => check.ok).length;

  return (
    <div className="practice-view">
      <div className="prompt-picker">
        {writingPrompts.map((item) => (
          <button type="button" key={item.id} className={`prompt-chip ${promptId === item.id ? 'active' : ''}`} onClick={() => choosePrompt(item.id)}>
            <span>{item.title}</span>
            <small>{item.type}</small>
          </button>
        ))}
      </div>

      <div className="prompt-card">
        <div className="prompt-card-top">
          <span>{prompt.type}</span>
          <span>{prompt.target}</span>
        </div>
        <h2>{prompt.en}</h2>
        <p className="prompt-zh">{prompt.title}</p>
        <div className="tip-list">
          {prompt.tips.map((tip, index) => (
            <p key={tip}><span>{index + 1}</span>{tip}</p>
          ))}
        </div>
        {data.writingDone[promptId] && (
          <p className="done-banner"><Icon name="check" size={15} /> 已完成过这篇 · {data.writingDone[promptId].words} 词</p>
        )}
      </div>

      <div className="editor-card">
        <div className="editor-head">
          <span className="editor-label"><Icon name="edit" size={15} /> 我的草稿</span>
          <span className={`save-state ${saveState}`}>{saveState === 'saving' ? '保存中…' : '已保存'}</span>
        </div>
        <textarea
          className="writing-editor"
          value={draft}
          onChange={(event) => { setDraft(event.target.value); setJustDone(false); }}
          onBlur={() => actions.saveDraft(promptId, draft)}
          placeholder="Start writing here… 先用简单句把意思写清楚，再回头润色。"
          aria-label="作文草稿"
          spellCheck="false"
        />
        <div className="editor-foot">
          <span className={words > maxWords ? 'over' : ''}>{words} 词 {words > maxWords ? `（超出 ${maxWords} 词）` : ''}</span>
          <button type="button" className="text-button" onClick={() => actions.saveDraft(promptId, draft)}>保存草稿</button>
        </div>
      </div>

      <div className="self-check card">
        <div className="self-check-head">
          <h3>交卷前自检</h3>
          <span>{passed} / 4</span>
        </div>
        {checks.map((check) => (
          <div className={`self-check-row ${check.ok ? 'ok' : ''}`} key={check.label}>
            <span className="self-check-icon"><Icon name={check.ok ? 'check' : 'close'} size={13} /></span>
            <span>{check.label}</span>
            <small>{check.detail}</small>
          </div>
        ))}
        {linking.length > 0 && <p className="used-links">已使用：{linking.join(' · ')}</p>}
      </div>

      {justDone ? (
        <div className="writing-done">
          <div className="summary-badge"><Icon name="check" size={28} /></div>
          <h3>这篇记下来了</h3>
          <p>{words} 词 · +20 XP。可以继续修改，保存后不会丢。</p>
        </div>
      ) : (
        <button type="button" className="primary-button wide-button" onClick={finish} disabled={words < submitMin}>
          {words < submitMin ? `再写 ${submitMin - words} 个词可交卷` : '完成这篇练笔'} <Icon name="check" size={17} />
        </button>
      )}
      <p className="form-note">草稿只保存在这台手机上。写作没有唯一答案，先完成，再完美。</p>
    </div>
  );
}

export default function Studio({ data, actions, intent }) {
  const [view, setView] = useState(intent?.view || 'phrases');
  const [writingView, setWritingView] = useState('templates');
  const [modelPractice, setModelPractice] = useState(false);

  useEffect(() => {
    if (!intent) return;
    if (intent.view) setView(intent.view);
    if (intent.view === 'writing') setWritingView('templates');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [intent?.nonce]);

  const donePhrases = Object.keys(data.phraseDone).length;
  const doneWriting = Object.keys(data.writingDone).length;

  return (
    <div className="screen studio-screen">
      <ScreenHeader
        eyebrow="PHRASES & WRITING"
        title="素材"
        sub="把地道的表达，变成自己的句子。"
        right={<span className="header-count">{donePhrases + doneWriting}<small> 积累</small></span>}
      />
      <Segmented
        value={view}
        onChange={setView}
        options={[
          { value: 'phrases', label: '短语', count: phrases.length },
          { value: 'writing', label: '作文' },
        ]}
      />

      {view === 'phrases' && <PhraseView data={data} actions={actions} />}

      {view === 'writing' && (
        <div className="writing-view">
          <div className="writing-subnav">
            {[
              { id: 'templates', label: '模板' },
              { id: 'models', label: '范文' },
              { id: 'practice', label: '练笔' },
            ].map((item) => (
              <button type="button" key={item.id} className={writingView === item.id ? 'active' : ''} onClick={() => { setWritingView(item.id); setModelPractice(false); }}>
                {item.label}
              </button>
            ))}
          </div>

          {writingView === 'templates' && <TemplatesView />}
          {writingView === 'models' && <ModelsView actions={actions} onPractice={() => { setWritingView('practice'); setModelPractice(true); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />}
          {writingView === 'practice' && <PracticeView data={data} actions={actions} key={modelPractice ? 'model-practice' : 'practice'} />}
        </div>
      )}
    </div>
  );
}
