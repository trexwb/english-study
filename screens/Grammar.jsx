import { useEffect, useState } from 'react';
import { grammarLessons, grammarById } from '../data/grammar.js';
import { Chip, Icon, LevelBadge, ScreenHeader, SpeakButton } from '../ui.jsx';

const levels = ['全部', '基础', '进阶', '高阶'];

export default function Grammar({ data, actions }) {
  const [level, setLevel] = useState('全部');
  const [selectedId, setSelectedId] = useState(null);
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [done, setDone] = useState(false);

  const selected = selectedId ? grammarById[selectedId] : null;
  const filtered = level === '全部' ? grammarLessons : grammarLessons.filter((lesson) => lesson.level === level);
  const doneCount = Object.keys(data.grammarDone).length;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedId]);

  function openLesson(id) {
    setSelectedId(id);
    setStep(0);
    setPicked(null);
    setAnswers([]);
    setDone(false);
  }

  function choose(index) {
    if (picked !== null) return;
    setPicked(index);
    setAnswers((prev) => [...prev, index === selected.quiz[step].a]);
  }

  function next() {
    if (step + 1 >= selected.quiz.length) {
      const score = answers.filter(Boolean).length;
      actions.markGrammar(selected.id, score, selected.quiz.length);
      setDone(true);
    } else {
      setStep((prev) => prev + 1);
      setPicked(null);
    }
  }

  function retry() {
    setStep(0);
    setPicked(null);
    setAnswers([]);
    setDone(false);
  }

  function nextLesson() {
    const index = grammarLessons.findIndex((lesson) => lesson.id === selected.id);
    const nextItem = grammarLessons[(index + 1) % grammarLessons.length];
    openLesson(nextItem.id);
  }

  if (selected) {
    const quiz = selected.quiz[step];
    const score = answers.filter(Boolean).length;
    const isLast = step + 1 >= selected.quiz.length;
    const previous = data.grammarDone[selected.id];

    return (
      <div className="screen lesson-screen">
        <button type="button" className="back-button" onClick={() => setSelectedId(null)}>
          <Icon name="left" size={18} /> 返回语法列表
        </button>

        <header className="lesson-header">
          <div className="lesson-tags">
            <LevelBadge tone={selected.level === '基础' ? 'green' : selected.level === '进阶' ? 'amber' : 'rose'}>{selected.level}</LevelBadge>
            <span className="lesson-meta"><Icon name="clock" size={14} /> {selected.mins} 分钟</span>
            <span className="lesson-meta">{selected.quiz.length} 道练习</span>
          </div>
          <p className="lesson-en">{selected.en}</p>
          <h1>{selected.title}</h1>
          <p className="lesson-intro">{selected.intro}</p>
          {previous && (
            <p className="lesson-record"><Icon name="check" size={14} /> 已完成 · 最好成绩 {previous.score} / {previous.total}</p>
          )}
        </header>

        <div className="lesson-body">
          {selected.sections.map((section, index) => (
            <section className="lesson-section" key={section.h}>
              <div className="lesson-section-head">
                <span className="section-number">{String(index + 1).padStart(2, '0')}</span>
                <h2>{section.h}</h2>
              </div>
              <p className="lesson-text">{section.body}</p>
              <div className="example-list">
                {section.examples.map((example) => (
                  <div className="example-item" key={example.en}>
                    <div className="example-en-row">
                      <p className="example-en">{example.en}</p>
                      <SpeakButton text={example.en} small />
                    </div>
                    <p className="example-zh">{example.zh}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}

          <aside className="pitfall-card">
            <span className="pitfall-icon"><Icon name="sparkle" size={18} /></span>
            <div>
              <strong>容易踩的坑</strong>
              <p>{selected.pitfall}</p>
            </div>
          </aside>

          <section className="quiz-card">
            <div className="quiz-head">
              <div>
                <p className="eyebrow">QUICK CHECK</p>
                <h2>随堂小测</h2>
              </div>
              <span className="quiz-progress">{done ? '已完成' : `${step + 1} / ${selected.quiz.length}`}</span>
            </div>

            {!done ? (
              <>
                <div className="quiz-track"><span style={{ width: `${(step / selected.quiz.length) * 100}%` }} /></div>
                <p className="quiz-question">{quiz.q}</p>
                <div className="quiz-options">
                  {quiz.opts.map((option, index) => {
                    let className = 'quiz-option';
                    if (picked !== null) {
                      if (index === quiz.a) className += ' correct';
                      else if (index === picked) className += ' wrong';
                      else className += ' dim';
                    }
                    return (
                      <button type="button" key={option} className={className} onClick={() => choose(index)} disabled={picked !== null}>
                        <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                        <span>{option}</span>
                        {picked !== null && index === quiz.a && <Icon name="check" size={17} />}
                        {picked !== null && index === picked && index !== quiz.a && <Icon name="close" size={17} />}
                      </button>
                    );
                  })}
                </div>
                {picked !== null && (
                  <div className={`quiz-explain ${picked === quiz.a ? 'ok' : 'bad'}`}>
                    <strong>{picked === quiz.a ? '答对了' : '再理解一下'}</strong>
                    <p>{quiz.explain}</p>
                    <button type="button" className="primary-button" onClick={next}>
                      {isLast ? '查看成绩' : '下一题'} <Icon name="arrow" size={17} />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="quiz-result">
                <div className="result-score"><strong>{score}</strong><span>/ {selected.quiz.length}</span></div>
                <p>{score === selected.quiz.length ? '完全掌握。可以去下一节了。' : score >= 2 ? '基本掌握，建议再读一遍例句。' : '别急，回到上面的讲解再看一次。'}</p>
                <div className="quiz-result-actions">
                  <button type="button" className="secondary-button" onClick={retry}>再测一次</button>
                  <button type="button" className="primary-button" onClick={nextLesson}>下一节 <Icon name="arrow" size={17} /></button>
                </div>
              </div>
            )}
          </section>

          <p className="lesson-foot">语法不是规则清单，而是句子为什么这样说的解释。</p>
        </div>
      </div>
    );
  }

  return (
    <div className="screen grammar-screen">
      <ScreenHeader
        eyebrow="GRAMMAR"
        title="语法"
        sub="从“知道规则”走到“读懂句子”。"
        right={<span className="header-count">{doneCount}<small> / {grammarLessons.length}</small></span>}
      />

      <div className="grammar-progress card">
        <div className="grammar-progress-copy">
          <strong>{Math.round((doneCount / grammarLessons.length) * 100)}%</strong>
          <div>
            <span>学习进度</span>
            <p>{doneCount} 节已完成 · 共 {grammarLessons.length} 节</p>
          </div>
        </div>
        <div className="mastery-track"><span style={{ width: `${(doneCount / grammarLessons.length) * 100}%` }} /></div>
      </div>

      <div className="chip-row sticky-chips">
        {levels.map((item) => <Chip key={item} active={level === item} onClick={() => setLevel(item)}>{item}</Chip>)}
      </div>

      <div className="lesson-list">
        {filtered.map((lesson) => {
          const record = data.grammarDone[lesson.id];
          return (
            <button type="button" className={`lesson-card ${record ? 'completed' : ''}`} key={lesson.id} onClick={() => openLesson(lesson.id)}>
              <span className="lesson-index">{String(grammarLessons.findIndex((item) => item.id === lesson.id) + 1).padStart(2, '0')}</span>
              <span className="lesson-card-copy">
                <span className="lesson-card-top">
                  <LevelBadge tone={lesson.level === '基础' ? 'green' : lesson.level === '进阶' ? 'amber' : 'rose'}>{lesson.level}</LevelBadge>
                  <span className="muted tiny"><Icon name="clock" size={13} /> {lesson.mins} 分钟</span>
                  {record && <span className="done-mark"><Icon name="check" size={13} /> {record.score}/{record.total}</span>}
                </span>
                <strong>{lesson.title}</strong>
                <span className="lesson-card-en">{lesson.en}</span>
                <span className="lesson-card-desc">{lesson.intro}</span>
              </span>
              <Icon name="right" size={18} />
            </button>
          );
        })}
      </div>

      <div className="grammar-note">
        <Icon name="leaf" size={20} />
        <p>建议顺序：先读讲解，再读例句，最后做小测。做错时回到例句，而不是只背规则。</p>
      </div>
    </div>
  );
}
