import { grammarLessons } from '../data/grammar.js';
import { phrases } from '../data/phrases.js';
import { stories } from '../data/reading.js';
import { words } from '../data/words.js';
import { wordCounts } from '../useStudy.js';
import { addDays, dayKey, formatDateCn, greeting } from '../utils.js';
import { Icon, ProgressRing, SectionTitle, SpeakButton } from '../ui.jsx';

const quotes = [
  { en: 'Reading is to the mind what exercise is to the body.', zh: '阅读之于心灵，正如运动之于身体。', source: 'Joseph Addison' },
  { en: 'A room without books is like a body without a soul.', zh: '没有书的房间，就像没有灵魂的身体。', source: 'Cicero' },
  { en: 'The journey of a thousand miles begins with a single step.', zh: '千里之行，始于足下。', source: 'Lao Tzu' },
  { en: 'No man is an island, entire of itself.', zh: '没有人是一座孤岛。', source: 'John Donne' },
  { en: 'Knowledge is power.', zh: '知识就是力量。', source: 'Francis Bacon' },
  { en: 'Well begun is half done.', zh: '好的开始是成功的一半。', source: 'Proverb' },
  { en: 'There is no royal road to learning.', zh: '求知没有捷径。', source: 'Euclid' },
];

export default function Home({ data, todayData, liveStreak, onNavigate, onOpenSettings }) {
  const goal = data.settings.dailyGoal || 10;
  const learnedToday = todayData.words || 0;
  const percent = Math.min(1, learnedToday / goal);
  const counts = wordCounts(data, 'all');
  const date = new Date();
  const dateIndex = Math.floor(new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() / 86400000);
  const quote = quotes[dateIndex % quotes.length];
  const wordOfDay = words[dateIndex % words.length];
  const phraseOfDay = phrases[dateIndex % phrases.length];
  const grammarDone = Object.keys(data.grammarDone).length;
  const phraseDone = Object.keys(data.phraseDone).length;
  const writingDone = Object.keys(data.writingDone).length;
  const readingDone = Object.values(data.reading).reduce((sum, item) => sum + (item.read || []).length, 0);
  const totalReading = stories.reduce((sum, story) => sum + story.paragraphs.length, 0);

  const checklist = [
    {
      id: 'words',
      label: '背单词',
      detail: `${learnedToday} / ${goal} 个`,
      done: learnedToday >= goal,
      progress: Math.min(1, learnedToday / goal),
      icon: 'cards',
      onClick: () => onNavigate('words', { mode: 'study' }),
    },
    {
      id: 'dictation',
      label: '默写',
      detail: `${todayData.dictation || 0} / 5 个`,
      done: (todayData.dictation || 0) >= 5,
      progress: Math.min(1, (todayData.dictation || 0) / 5),
      icon: 'headphones',
      onClick: () => onNavigate('words', { mode: 'dictation' }),
    },
    {
      id: 'grammar',
      label: '语法',
      detail: `${todayData.grammar || 0} / 1 节`,
      done: (todayData.grammar || 0) >= 1,
      progress: Math.min(1, todayData.grammar || 0),
      icon: 'book',
      onClick: () => onNavigate('grammar'),
    },
    {
      id: 'reading',
      label: '原著',
      detail: `${todayData.reading || 0} / 1 段`,
      done: (todayData.reading || 0) >= 1,
      progress: Math.min(1, todayData.reading || 0),
      icon: 'bookmark',
      onClick: () => onNavigate('reading'),
    },
  ];

  const modules = [
    { id: 'learn', title: '背单词', en: 'Vocabulary', desc: `${counts.due + counts.fresh} 个待学习`, icon: 'cards', tint: 'green', onClick: () => onNavigate('words', { mode: 'study' }) },
    { id: 'dictation', title: '默写', en: 'Dictation', desc: '听音拼写，检验记忆', icon: 'headphones', tint: 'amber', onClick: () => onNavigate('words', { mode: 'dictation' }) },
    { id: 'grammar', title: '语法', en: 'Grammar', desc: `${grammarLessons.length - grammarDone} 节待解锁`, icon: 'book', tint: 'blue', onClick: () => onNavigate('grammar') },
    { id: 'phrases', title: '短语', en: 'Phrases', desc: `${phraseDone} / 40 已掌握`, icon: 'layers', tint: 'rose', onClick: () => onNavigate('studio', { view: 'phrases' }) },
    { id: 'writing', title: '作文', en: 'Writing', desc: `${writingDone} / 4 篇练笔`, icon: 'pen', tint: 'violet', onClick: () => onNavigate('studio', { view: 'writing' }) },
    { id: 'reading', title: '原著', en: 'Reading', desc: `${readingDone} / ${totalReading} 段已读`, icon: 'bookmark', tint: 'teal', onClick: () => onNavigate('reading') },
  ];

  const week = Array.from({ length: 7 }, (_, index) => {
    const key = addDays(dayKey(), index - 6);
    const day = data.days[key] || {};
    const score = (day.words || 0) + (day.dictation || 0) + (day.reading || 0) * 2 + (day.grammar || 0) * 3 + (day.phrases || 0) * 0.4 + (day.writing || 0) * 4;
    return { key, score, label: ['日', '一', '二', '三', '四', '五', '六'][new Date(`${key}T12:00:00`).getDay()], today: key === dayKey() };
  });
  const maxWeek = Math.max(...week.map((day) => day.score), 1);
  const weekTotal = week.reduce((sum, day) => sum + day.score, 0);

  return (
    <div className="home screen">
      <header className="home-top">
        <div>
          <p className="eyebrow">{formatDateCn(date)}</p>
          <h1 className="home-title">
            {greeting(date)}，<br />
            <em>今天读一点英语。</em>
          </h1>
        </div>
        <button type="button" className="icon-button soft" onClick={onOpenSettings} aria-label="设置">
          <Icon name="settings" size={21} />
        </button>
      </header>

      <div className="streak-line">
        <span className="streak-pill"><Icon name="flame" size={15} filled /> {liveStreak} 天连续</span>
        <span className="dot-sep">·</span>
        <span>{data.xp} XP</span>
        <span className="dot-sep">·</span>
        <span>{Object.keys(data.wordProgress).length} 词已学习</span>
      </div>

      <section className="hero-card">
        <div className="hero-copy">
          <p className="hero-kicker">DAILY WORDS</p>
          <div className="hero-number">
            <strong>{learnedToday}</strong>
            <span>/ {goal}</span>
          </div>
          <p className="hero-desc">
            {learnedToday >= goal
              ? '今日目标完成。要不要再多读一段？'
              : `还差 ${goal - learnedToday} 个单词，约 4 分钟。`}
          </p>
          <button type="button" className="hero-button" onClick={() => onNavigate('words', { mode: 'study' })}>
            <Icon name="play" size={16} filled />
            {learnedToday >= goal ? '继续学习' : '开始今日学习'}
          </button>
        </div>
        <ProgressRing value={percent} size={108} stroke={9}>
          <strong>{Math.round(percent * 100)}<small>%</small></strong>
          <span>今日</span>
        </ProgressRing>
      </section>

      <section className="card checklist-card">
        <SectionTitle action={<span className="muted tiny">{checklist.filter((item) => item.done).length} / 4 完成</span>}>
          今日清单
        </SectionTitle>
        <div className="checklist">
          {checklist.map((item) => (
            <button type="button" key={item.id} className={`check-row ${item.done ? 'done' : ''}`} onClick={item.onClick}>
              <span className="check-icon">
                {item.done ? <Icon name="check" size={16} /> : <Icon name={item.icon} size={18} />}
              </span>
              <span className="check-copy">
                <span className="check-label">{item.label}</span>
                <span className="check-detail">{item.detail}</span>
              </span>
              <span className="check-track" aria-hidden="true">
                <span style={{ width: `${item.progress * 100}%` }} />
              </span>
              <Icon name="right" size={17} />
            </button>
          ))}
        </div>
      </section>

      <section className="quote-card">
        <div className="quote-mark">“</div>
        <p className="quote-en">{quote.en}</p>
        <p className="quote-zh">{quote.zh}</p>
        <p className="quote-source">— {quote.source}</p>
      </section>

      <section>
        <SectionTitle action={<button type="button" className="text-button" onClick={() => onNavigate('studio', { view: 'phrases' })}>全部短语 <Icon name="arrow" size={14} /></button>}>
          今天学什么
        </SectionTitle>
        <div className="module-grid">
          {modules.map((module) => (
            <button type="button" key={module.id} className="module-tile" onClick={module.onClick}>
              <span className={`module-icon ${module.tint}`}><Icon name={module.icon} size={21} /></span>
              <span className="module-title">{module.title}</span>
              <span className="module-en">{module.en}</span>
              <span className="module-desc">{module.desc}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="card word-day-card">
        <div className="word-day-head">
          <div>
            <p className="eyebrow">WORD OF THE DAY</p>
            <div className="word-day-title">
              <h2>{wordOfDay.w}</h2>
              <SpeakButton text={wordOfDay.w} small />
            </div>
            <p className="phonetic">{wordOfDay.p} <span>{wordOfDay.pos}</span></p>
          </div>
          <span className="word-day-tag">今日一词</span>
        </div>
        <p className="word-day-zh">{wordOfDay.zh}</p>
        <p className="word-day-ex">{wordOfDay.ex}</p>
        <p className="word-day-ex-zh">{wordOfDay.exZh}</p>
      </section>

      <section className="card weekly-card">
        <SectionTitle action={<span className="muted tiny">近 7 天 · {Math.round(weekTotal)} 点</span>}>学习节奏</SectionTitle>
        <div className="week-bars">
          {week.map((day) => (
            <div className={`week-day ${day.today ? 'today' : ''}`} key={day.key}>
              <div className="week-bar-wrap">
                <span className="week-bar" style={{ height: `${Math.max(5, (day.score / maxWeek) * 42)}px` }} />
              </div>
              <span className="week-label">{day.label}</span>
            </div>
          ))}
        </div>
      </section>

      <button type="button" className="mini-phrase" onClick={() => onNavigate('studio', { view: 'phrases' })}>
        <span className="mini-phrase-label">每日短语</span>
        <p>{phraseOfDay.en}</p>
        <span>{phraseOfDay.zh}</span>
      </button>

      <p className="home-foot">每天一点点，胜过偶尔全力以赴。</p>
    </div>
  );
}
