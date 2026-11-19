import { useEffect, useState } from 'react';
import './styles.css';
import { grammarLessons } from './data/grammar.js';
import { phrases } from './data/phrases.js';
import { words } from './data/words.js';
import { stories } from './data/reading.js';
import { irregularVerbs, affixes, confusables, wordForms } from './data/knowledge.js';
import { grammarFills, clozes, sevenFives, errorFixes } from './data/examTypes.js';
import { useStudy } from './useStudy.js';
import { Icon, Sheet } from './ui.jsx';
import Home from './screens/Home.jsx';
import Words from './screens/Words.jsx';
import Grammar from './screens/Grammar.jsx';
import Studio from './screens/Studio.jsx';
import Lab from './screens/Lab.jsx';
import Reading from './screens/Reading.jsx';

const tabs = [
  { id: 'home', label: '今日', icon: 'sun' },
  { id: 'words', label: '单词', icon: 'cards' },
  { id: 'grammar', label: '语法', icon: 'book' },
  { id: 'studio', label: '素材', icon: 'pen' },
  { id: 'lab', label: '提分', icon: 'trophy' },
  { id: 'reading', label: '原著', icon: 'bookmark' },
];

function Settings({ open, onClose, data, actions }) {
  const learned = Object.keys(data.wordProgress).length;
  const grammar = Object.keys(data.grammarDone).length;
  const phraseCount = Object.keys(data.phraseDone).length;
  const writing = Object.keys(data.writingDone).length;
  const reading = Object.values(data.reading).reduce((sum, item) => sum + (item.read || []).length, 0);

  return (
    <Sheet open={open} onClose={onClose} title="设置">
      <div className="settings-body">
        <div className="setting-block">
          <div className="setting-label">
            <strong>每日单词目标</strong>
            <span>决定首页进度环和每轮学习的词数</span>
          </div>
          <div className="goal-options">
            {[5, 10, 15, 20].map((goal) => (
              <button type="button" key={goal} className={data.settings.dailyGoal === goal ? 'active' : ''} onClick={() => actions.updateSettings({ dailyGoal: goal })}>
                {goal}
              </button>
            ))}
          </div>
        </div>

        <div className="setting-row">
          <div className="setting-label">
            <strong>阅读时默认显示译文</strong>
            <span>也可以随时在阅读页切换</span>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={data.settings.translation}
            className={`switch ${data.settings.translation ? 'on' : ''}`}
            onClick={() => actions.updateSettings({ translation: !data.settings.translation })}
          >
            <span />
          </button>
        </div>

        <div className="setting-block">
          <div className="setting-label">
            <strong>我的学习数据</strong>
            <span>只保存在这台手机上，不会上传</span>
          </div>
          <div className="data-grid">
            <div><strong>{learned}</strong><span>学过的词</span></div>
            <div><strong>{grammar}</strong><span>语法课</span></div>
            <div><strong>{phraseCount}</strong><span>短语</span></div>
            <div><strong>{reading}</strong><span>阅读段落</span></div>
            <div><strong>{writing}</strong><span>练笔</span></div>
            <div><strong>{data.xp}</strong><span>XP</span></div>
          </div>
        </div>

        <div className="about-block">
          <p><strong>英语小站</strong> · 离线可用</p>
          <p>内置 {words.length} 个单词、{grammarLessons.length} 节语法、{phrases.length} 个短语、{irregularVerbs.length + affixes.length + confusables.length + wordForms.length} 条知识速查、{grammarFills.length + clozes.length + sevenFives.length + errorFixes.length} 篇题型练习、{stories.length} 篇原著选段。发音由系统语音提供，离线时也能朗读。</p>
        </div>

        <button
          type="button"
          className="danger-button"
          onClick={() => {
            if (window.confirm('确定要清除全部学习记录吗？单词进度、草稿和统计都会删除，这个操作不能撤销。')) {
              actions.resetProgress();
            }
          }}
        >
          <Icon name="trash" size={17} /> 清除学习记录
        </button>
        <p className="form-note">清除后设置会保留，学习内容会重新开始。</p>
      </div>
    </Sheet>
  );
}

export default function App() {
  const study = useStudy();
  const [tab, setTab] = useState('home');
  const [intent, setIntent] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [tab]);

  function navigate(nextTab, nextIntent) {
    setTab(nextTab);
    setIntent(nextIntent ? { ...nextIntent, nonce: Date.now() } : null);
  }

  return (
    <div className="app-shell">
      <main className="app-main" key={tab}>
        {tab === 'home' && (
          <Home
            data={study.data}
            todayData={study.todayData}
            liveStreak={study.liveStreak}
            onNavigate={navigate}
            onOpenSettings={() => setSettingsOpen(true)}
          />
        )}
        {tab === 'words' && <Words data={study.data} actions={study} intent={intent} />}
        {tab === 'grammar' && <Grammar data={study.data} actions={study} />}
        {tab === 'studio' && <Studio data={study.data} actions={study} intent={intent} />}
        {tab === 'lab' && <Lab intent={intent} />}
        {tab === 'reading' && <Reading data={study.data} actions={study} />}
      </main>

      <nav className="tabbar" aria-label="主导航">
        {tabs.map((item) => (
          <button
            type="button"
            key={item.id}
            className={`tab ${tab === item.id ? 'active' : ''}`}
            onClick={() => { if (tab !== item.id) setIntent(null); setTab(item.id); }}
            aria-current={tab === item.id ? 'page' : undefined}
          >
            <span className="tab-icon"><Icon name={item.icon} size={21} /></span>
            <span>{item.label}</span>
            {tab === item.id && <i className="tab-dot" />}
          </button>
        ))}
      </nav>

      <Settings
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        data={study.data}
        actions={study}
      />
    </div>
  );
}
