import { useEffect, useMemo, useState } from 'react';
import { stories } from '../data/reading.js';
import { speak } from '../utils.js';
import { Icon, LevelBadge, ScreenHeader, Sheet, SpeakButton } from '../ui.jsx';

function StoryText({ text, glossary, onWord }) {
  const glossaryMap = useMemo(() => {
    const map = {};
    for (const item of glossary) map[item.w.toLowerCase()] = item;
    return map;
  }, [glossary]);

  const tokens = text.split(/([A-Za-z][A-Za-z'’-]*)/g);
  return (
    <p className="reader-en">
      {tokens.map((token, index) => {
        const key = token.toLowerCase();
        const entry = glossaryMap[key];
        if (!entry) return token;
        return (
          <button
            type="button"
            className="gloss-word"
            key={`${token}-${index}`}
            onClick={() => onWord(entry)}
            aria-label={`查看 ${entry.w} 的释义`}
          >
            {token}
          </button>
        );
      })}
    </p>
  );
}

export default function Reading({ data, actions }) {
  const [selectedId, setSelectedId] = useState(null);
  const [index, setIndex] = useState(0);
  const [showZh, setShowZh] = useState(data.settings.translation);
  const [selectedGloss, setSelectedGloss] = useState(null);
  const [finished, setFinished] = useState(false);

  const selected = stories.find((story) => story.id === selectedId);
  const totalParagraphs = stories.reduce((sum, story) => sum + story.paragraphs.length, 0);
  const readParagraphs = Object.values(data.reading).reduce((sum, item) => sum + (item.read || []).length, 0);
  const readStories = stories.filter((story) => data.reading[story.id]?.done).length;

  useEffect(() => {
    if (selectedId) window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedId, index]);

  function openStory(story) {
    const progress = data.reading[story.id];
    let start = 0;
    if (progress && progress.read.length) {
      const unread = story.paragraphs.findIndex((_, paragraphIndex) => !progress.read.includes(paragraphIndex));
      start = unread === -1 ? Math.min(progress.last || 0, story.paragraphs.length - 1) : unread;
    }
    setSelectedId(story.id);
    setIndex(start);
    setFinished(false);
    setSelectedGloss(null);
    setShowZh(data.settings.translation);
  }

  function closeStory() {
    setSelectedId(null);
    setFinished(false);
    setSelectedGloss(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function markAndNext() {
    actions.markReading(selected.id, index, selected.paragraphs.length);
    if (index + 1 >= selected.paragraphs.length) {
      setFinished(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setIndex(index + 1);
    }
  }

  function restart() {
    setIndex(0);
    setFinished(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (selected) {
    const paragraph = selected.paragraphs[index];
    const progress = data.reading[selected.id] || { read: [], last: 0, done: false };
    const percent = Math.round((progress.read.length / selected.paragraphs.length) * 100);

    if (finished) {
      return (
        <div className="screen reader-screen">
          <button type="button" className="back-button" onClick={closeStory}>
            <Icon name="left" size={18} /> 返回书库
          </button>
          <div className="reading-finish">
            <div className="finish-seal"><Icon name="bookmark" size={34} /></div>
            <p className="eyebrow">STORY COMPLETE</p>
            <h1>读完《{selected.zhTitle}》</h1>
            <p className="finish-sub">你读完了 {selected.paragraphs.length} 段英文。阅读不是逐词翻译，而是慢慢听见另一种声音。</p>
            <div className="finish-stats">
              <div><strong>{selected.paragraphs.length}</strong><span>段落</span></div>
              <div><strong>{progress.read.length}</strong><span>已读</span></div>
              <div><strong>{selected.level}</strong><span>难度</span></div>
            </div>
            <div className="after-question">
              <p className="eyebrow">AFTER READING</p>
              <h3>读后一问</h3>
              <p>{selected.question}</p>
            </div>
            <div className="summary-actions">
              <button type="button" className="primary-button" onClick={restart}>再读一遍 <Icon name="rotate" size={17} /></button>
              <button type="button" className="secondary-button" onClick={closeStory}>返回书库</button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="screen reader-screen">
        <button type="button" className="back-button" onClick={closeStory}>
          <Icon name="left" size={18} /> 返回书库
        </button>

        <header className="reader-head">
          <div className="reader-tags">
            <LevelBadge tone="teal">{selected.level}</LevelBadge>
            <span>{selected.author}</span>
            <span>{selected.minutes} 分钟</span>
          </div>
          <h1>{selected.title}</h1>
          <p className="reader-zh-title">{selected.zhTitle}</p>
          <div className="reader-progress-row">
            <span>第 {index + 1} / {selected.paragraphs.length} 段</span>
            <span>已读 {progress.read.length} 段 · {percent}%</span>
          </div>
          <div className="session-track"><span style={{ width: `${((index) / selected.paragraphs.length) * 100}%` }} /></div>
        </header>

        <article className={`reader-card ${showZh ? 'with-zh' : ''}`}>
          <div className="reader-card-top">
            <span className="reader-paragraph-number">{String(index + 1).padStart(2, '0')}</span>
            <div className="reader-actions">
              <button type="button" className={`text-button ${showZh ? 'on' : ''}`} onClick={() => setShowZh(!showZh)}>
                <Icon name={showZh ? 'hide' : 'eye'} size={15} /> {showZh ? '隐藏译文' : '显示译文'}
              </button>
              <SpeakButton text={paragraph.en} small />
            </div>
          </div>

          <StoryText text={paragraph.en} glossary={selected.glossary} onWord={setSelectedGloss} />
          {showZh && <p className="reader-zh">{paragraph.zh}</p>}

          <p className="gloss-hint"><Icon name="sparkle" size={13} /> 带虚线的单词可以点开看释义</p>
        </article>

        <div className="reader-nav">
          <button type="button" className="round-button" onClick={() => setIndex(Math.max(0, index - 1))} disabled={index === 0} aria-label="上一段">
            <Icon name="left" size={19} />
          </button>
          <button type="button" className="primary-button reader-next" onClick={markAndNext}>
            {index + 1 >= selected.paragraphs.length ? '完成精读' : progress.read.includes(index) ? '下一段' : '读完这段'} <Icon name="arrow" size={17} />
          </button>
          <button type="button" className="icon-button soft" onClick={() => speak(paragraph.en)} aria-label="朗读本段">
            <Icon name="volume" size={19} />
          </button>
        </div>

        <div className="reader-glossary">
          <button type="button" className="glossary-toggle" onClick={(event) => event.currentTarget.nextElementSibling.classList.toggle('open')}>
            <span><Icon name="book" size={17} /> 本篇词汇 {selected.glossary.length}</span>
            <Icon name="down" size={16} />
          </button>
          <div className="glossary-list">
            {selected.glossary.map((item) => (
              <button type="button" className="glossary-item" key={item.w} onClick={() => setSelectedGloss(item)}>
                <strong>{item.w}</strong>
                <span>{item.zh}</span>
              </button>
            ))}
          </div>
        </div>

        <Sheet open={!!selectedGloss} onClose={() => setSelectedGloss(null)} title="词汇卡片">
          {selectedGloss && (
            <div className="gloss-sheet">
              <div className="gloss-sheet-top">
                <h3>{selectedGloss.w}</h3>
                <SpeakButton text={selectedGloss.w} small />
              </div>
              <p className="phonetic">{selectedGloss.p}</p>
              <p className="gloss-sheet-zh">{selectedGloss.zh}</p>
              <button type="button" className="secondary-button wide-button" onClick={() => setSelectedGloss(null)}>回到阅读</button>
            </div>
          )}
        </Sheet>
      </div>
    );
  }

  const continueStory = stories.find((story) => data.reading[story.id]?.read?.length && !data.reading[story.id]?.done)
    || stories.find((story) => !data.reading[story.id]?.done)
    || stories[0];

  return (
    <div className="screen reading-screen">
      <ScreenHeader
        eyebrow="READING"
        title="原著"
        sub="不查每一个词，也能读懂故事。"
        right={<span className="header-count">{readParagraphs}<small> 段</small></span>}
      />

      <div className="reading-overview">
        <div className="reading-stat">
          <strong>{readStories}</strong>
          <span>本读完</span>
        </div>
        <div className="reading-stat">
          <strong>{readParagraphs}</strong>
          <span>段已读</span>
        </div>
        <div className="reading-stat">
          <strong>{Math.round((readParagraphs / totalParagraphs) * 100)}%</strong>
          <span>总进度</span>
        </div>
      </div>

      <button type="button" className="continue-card" onClick={() => openStory(continueStory)}>
        <div className="continue-copy">
          <p className="eyebrow">CONTINUE READING</p>
          <h2>{continueStory.zhTitle}</h2>
          <p>{continueStory.title} · {continueStory.author}</p>
          <span className="continue-link">
            {data.reading[continueStory.id]?.read?.length ? '继续阅读' : '从这一本开始'} <Icon name="arrow" size={15} />
          </span>
        </div>
        <div className="continue-emblem" style={{ background: continueStory.accent }}>
          <span>{continueStory.paragraphs.length}</span>
          <small>段</small>
        </div>
      </button>

      <div className="section-title"><h2>书架</h2><span className="muted tiny">{stories.length} 本</span></div>
      <div className="story-list">
        {stories.map((story) => {
          const progress = data.reading[story.id];
          const readCount = progress?.read?.length || 0;
          const percent = Math.round((readCount / story.paragraphs.length) * 100);
          return (
            <button type="button" className="story-card" key={story.id} onClick={() => openStory(story)}>
              <span className="story-spine" style={{ background: story.accent }} />
              <span className="story-copy">
                <span className="story-top">
                  <LevelBadge tone="teal">{story.level}</LevelBadge>
                  <span className="muted tiny">{story.minutes} 分钟</span>
                  {progress?.done && <span className="done-mark"><Icon name="check" size={12} /> 已读完</span>}
                </span>
                <strong>{story.zhTitle}</strong>
                <span className="story-en">{story.title}</span>
                <span className="story-author">{story.author} · {story.year}</span>
                <span className="story-blurb">{story.blurb}</span>
                <span className="story-progress">
                  <span className="story-progress-track"><i style={{ width: `${percent}%` }} /></span>
                  <small>{readCount} / {story.paragraphs.length}</small>
                </span>
              </span>
              <Icon name="right" size={18} />
            </button>
          );
        })}
      </div>

      <div className="reading-guide">
        <h3>怎么读原著</h3>
        <div className="guide-step"><span>1</span><p><strong>先读英文，别急着翻译。</strong>让句子先形成画面，猜错也没关系。</p></div>
        <div className="guide-step"><span>2</span><p><strong>只点真正卡住的词。</strong>带虚线的词有释义，其他词可以跳过。</p></div>
        <div className="guide-step"><span>3</span><p><strong>读完再看译文。</strong>对照一下，你会发现自己其实读懂了很多。</p></div>
      </div>
      <p className="reading-source-note">均为公版作品节选，保留原文用词、拼写与标点。</p>
    </div>
  );
}
