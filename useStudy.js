import { useEffect, useMemo, useState } from 'react';
import { words } from './data/words.js';
import { normalizeWord } from './enrich.js';
import { addDays, dayKey, EMPTY_DAY } from './utils.js';

const STORAGE_KEY = 'english-study-v1';

const initialData = {
  version: 1,
  settings: {
    dailyGoal: 10,
    translation: true,
    dictationLength: 10,
  },
  xp: 0,
  streak: 0,
  lastStudy: null,
  days: {},
  wordProgress: {},
  grammarDone: {},
  phraseDone: {},
  reading: {},
  drafts: {},
  writingDone: {},
  customWords: [],
};

// 录入词的兜底清洗：逐条校验 w 形态、剔除与内置词库重复的条目，再按 w 去重（保留首条），
// 字符串字段统一兜底为 ''——防手工改动存储产出重复 w（撞 React key、due/learning 双计数）或渲染 undefined。
function sanitizeCustomWords(list) {
  if (!Array.isArray(list)) return [];
  const seen = new Set();
  const result = [];
  for (const item of list) {
    if (!item || typeof item.w !== 'string' || !/^[a-z]+$/.test(item.w) || seen.has(item.w)) continue;
    if (words.some((word) => word.w === item.w)) continue;
    seen.add(item.w);
    result.push({
      ...item,
      deck: 'custom',
      p: typeof item.p === 'string' ? item.p : '',
      pos: typeof item.pos === 'string' ? item.pos : '',
      zh: typeof item.zh === 'string' ? item.zh : '',
      ex: typeof item.ex === 'string' ? item.ex : '',
      exZh: typeof item.exZh === 'string' ? item.exZh : '',
    });
  }
  return result;
}

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialData;
    const parsed = JSON.parse(raw);
    return {
      ...initialData,
      ...parsed,
      settings: { ...initialData.settings, ...(parsed.settings || {}) },
      days: parsed.days || {},
      wordProgress: parsed.wordProgress || {},
      grammarDone: parsed.grammarDone || {},
      phraseDone: parsed.phraseDone || {},
      reading: parsed.reading || {},
      drafts: parsed.drafts || {},
      writingDone: parsed.writingDone || {},
      customWords: sanitizeCustomWords(parsed.customWords),
    };
  } catch {
    return initialData;
  }
}

function addActivity(state, activity, amount, xp) {
  const today = dayKey();
  const day = { ...EMPTY_DAY, ...(state.days[today] || {}) };
  day[activity] = (day[activity] || 0) + amount;
  day.xp = (day.xp || 0) + xp;
  let streak = state.streak;
  if (state.lastStudy !== today) {
    streak = state.lastStudy === addDays(today, -1) ? state.streak + 1 : 1;
  }
  return {
    ...state,
    days: { ...state.days, [today]: day },
    xp: (state.xp || 0) + xp,
    streak,
    lastStudy: today,
  };
}

const INTERVALS = { 1: 1, 2: 3, 3: 7, 4: 21, 5: 45 };

export function useStudy() {
  const [data, setData] = useState(loadData);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // Storage may be unavailable in a private window; the session still works.
    }
  }, [data]);

  function record(activity, amount = 1, xp = 0) {
    if (!activity || amount <= 0) return;
    setData((prev) => addActivity(prev, activity, amount, xp));
  }

  function gradeWord(word, grade) {
    setData((prev) => {
      const today = dayKey();
      const previous = prev.wordProgress[word] || { box: 0, seen: 0, right: 0, wrong: 0 };
      let box = previous.box || 0;
      let due = today;
      let xp = 2;
      if (grade === 'again') {
        box = 1;
        due = today;
        xp = 1;
      } else if (grade === 'hard') {
        box = Math.max(1, Math.min(5, box));
        due = addDays(today, box >= 3 ? 2 : 1);
        xp = 2;
      } else {
        box = Math.min(5, (previous.box || 0) + 1);
        due = addDays(today, INTERVALS[box] || 1);
        xp = 3;
      }
      const progress = {
        ...previous,
        box,
        due,
        seen: (previous.seen || 0) + 1,
        right: (previous.right || 0) + (grade === 'again' ? 0 : 1),
        wrong: (previous.wrong || 0) + (grade === 'again' ? 1 : 0),
        last: today,
      };
      const next = addActivity(prev, 'words', 1, xp);
      return { ...next, wordProgress: { ...prev.wordProgress, [word]: progress } };
    });
  }

  function markGrammar(id, score, total) {
    setData((prev) => {
      const previous = prev.grammarDone[id];
      const isNew = !previous;
      const best = previous ? Math.max(previous.score || 0, score) : score;
      let next = isNew ? addActivity(prev, 'grammar', 1, 15) : prev;
      next = {
        ...next,
        grammarDone: {
          ...prev.grammarDone,
          [id]: { score: best, total, at: dayKey() },
        },
      };
      return next;
    });
  }

  function markPhrase(id) {
    setData((prev) => {
      if (prev.phraseDone[id]) return prev;
      const next = addActivity(prev, 'phrases', 1, 3);
      return { ...next, phraseDone: { ...prev.phraseDone, [id]: true } };
    });
  }

  function markReading(storyId, index, total) {
    setData((prev) => {
      const previous = prev.reading[storyId] || { read: [], last: 0, done: false };
      const read = previous.read.includes(index) ? previous.read : [...previous.read, index];
      const isNew = !previous.read.includes(index);
      let next = isNew ? addActivity(prev, 'reading', 1, 4) : prev;
      next = {
        ...next,
        reading: {
          ...prev.reading,
          [storyId]: {
            read,
            last: index,
            done: read.length >= total,
          },
        },
      };
      return next;
    });
  }

  function markWriting(promptId, wordCount) {
    setData((prev) => {
      const previous = prev.writingDone[promptId];
      const isNew = !previous;
      let next = isNew ? addActivity(prev, 'writing', 1, 20) : prev;
      next = {
        ...next,
        writingDone: {
          ...prev.writingDone,
          [promptId]: { at: dayKey(), words: wordCount },
        },
      };
      return next;
    });
  }

  function saveDraft(promptId, text) {
    setData((prev) => ({ ...prev, drafts: { ...prev.drafts, [promptId]: text } }));
  }

  function updateSettings(patch) {
    setData((prev) => ({ ...prev, settings: { ...prev.settings, ...patch } }));
  }

  // 清除学习记录保留设置和自己录入的词——录入的词是内容资产而非进度。
  function resetProgress() {
    setData((prev) => ({
      ...initialData,
      settings: prev.settings,
      customWords: prev.customWords,
    }));
  }

  function addCustomWord(entry) {
    setData((prev) => {
      const w = normalizeWord(entry?.w);
      if (!w) return prev;
      if (words.some((item) => item.w === w) || prev.customWords.some((item) => item.w === w)) return prev;
      return { ...prev, customWords: [...prev.customWords, { ...entry, w, deck: 'custom', added: dayKey() }] };
    });
  }

  function updateCustomWord(oldW, entry) {
    setData((prev) => {
      const w = normalizeWord(entry?.w);
      const target = prev.customWords.find((item) => item.w === oldW);
      if (!w || !target) return prev;
      if (w !== oldW && (words.some((item) => item.w === w) || prev.customWords.some((item) => item.w === w))) return prev;
      const customWords = prev.customWords.map((item) => (
        item.w === oldW ? { ...item, ...entry, w, deck: 'custom', added: item.added } : item
      ));
      if (w === oldW) return { ...prev, customWords };
      // 改名视为新词：旧拼写的进度清掉，从零开始学。
      const wordProgress = { ...prev.wordProgress };
      delete wordProgress[oldW];
      return { ...prev, customWords, wordProgress };
    });
  }

  function deleteCustomWord(w) {
    setData((prev) => {
      const wordProgress = { ...prev.wordProgress };
      delete wordProgress[w];
      return { ...prev, customWords: prev.customWords.filter((item) => item.w !== w), wordProgress };
    });
  }

  const today = dayKey();
  const todayData = data.days[today] || EMPTY_DAY;
  const liveStreak = useMemo(() => {
    if (!data.lastStudy) return 0;
    if (data.lastStudy === today || data.lastStudy === addDays(today, -1)) return data.streak;
    return 0;
  }, [data.lastStudy, data.streak, today]);

  return {
    data,
    todayData,
    liveStreak,
    record,
    gradeWord,
    markGrammar,
    markPhrase,
    markReading,
    markWriting,
    saveDraft,
    updateSettings,
    resetProgress,
    addCustomWord,
    updateCustomWord,
    deleteCustomWord,
  };
}

// 词池统一出口：custom 是用户录入的词，all 是内置 + 录入，其余按 deck 过滤。
export function poolFor(data, deckId = 'all') {
  const custom = Array.isArray(data?.customWords) ? data.customWords : [];
  if (deckId === 'custom') return custom;
  if (deckId === 'all') return [...words, ...custom];
  return words.filter((word) => word.deck === deckId);
}

export function wordCounts(data, deckId = 'all') {
  const pool = poolFor(data, deckId);
  const today = dayKey();
  let due = 0;
  let fresh = 0;
  let mastered = 0;
  let learning = 0;
  for (const word of pool) {
    const progress = data.wordProgress[word.w];
    if (!progress) fresh += 1;
    else {
      if (progress.due <= today) due += 1;
      if (progress.box >= 4) mastered += 1;
      else learning += 1;
    }
  }
  return { total: pool.length, due, fresh, mastered, learning };
}

export function buildWordQueue(data, deckId = 'all', limit = 10) {
  const pool = poolFor(data, deckId);
  const today = dayKey();
  const due = [];
  const fresh = [];
  const later = [];
  for (const word of pool) {
    const progress = data.wordProgress[word.w];
    if (!progress) fresh.push(word);
    else if (progress.due <= today) due.push({ word, due: progress.due });
    else later.push({ word, due: progress.due });
  }
  due.sort((a, b) => a.due.localeCompare(b.due));
  later.sort((a, b) => a.due.localeCompare(b.due));
  return [...due.map((item) => item.word), ...fresh, ...later.map((item) => item.word)].slice(0, limit);
}

export function dictationQueue(data, deckId = 'all', limit = 10) {
  const pool = poolFor(data, deckId);
  const today = dayKey();
  const due = [];
  const fresh = [];
  const later = [];
  for (const word of pool) {
    const progress = data.wordProgress[word.w];
    if (!progress) fresh.push(word);
    else if (progress.due <= today) due.push(word);
    else later.push(word);
  }
  const selected = [...shuffle(due), ...shuffle(fresh), ...shuffle(later)].slice(0, Math.max(limit, 1));
  return selected;
}

function shuffle(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
