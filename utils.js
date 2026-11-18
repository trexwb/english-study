export const DAY_MS = 86400000;

export function dayKey(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function addDays(key, days) {
  const [y, m, d] = key.split('-').map(Number);
  const date = new Date(y, m - 1, d + days);
  return dayKey(date);
}

export function formatDateCn(date = new Date()) {
  const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  return `${date.getMonth() + 1}月${date.getDate()}日 · ${weekdays[date.getDay()]}`;
}

export function greeting(date = new Date()) {
  const h = date.getHours();
  if (h < 5) return '夜深了';
  if (h < 11) return '早上好';
  if (h < 14) return '中午好';
  if (h < 18) return '下午好';
  return '晚上好';
}

export function speak(text, rate = 0.86) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return false;
  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = rate;
    utterance.pitch = 1;
    const voices = window.speechSynthesis.getVoices();
    const english = voices.find((voice) => /^en[-_]/i.test(voice.lang) && /Samantha|Daniel|Serena|Alex/i.test(voice.name))
      || voices.find((voice) => /^en[-_]US/i.test(voice.lang))
      || voices.find((voice) => /^en[-_]/i.test(voice.lang));
    if (english) utterance.voice = english;
    window.speechSynthesis.speak(utterance);
    return true;
  } catch {
    return false;
  }
}

export function countWords(text) {
  return (text.trim().match(/[A-Za-z]+(?:['’-][A-Za-z]+)*/g) || []).length;
}

export function shuffle(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export const EMPTY_DAY = { words: 0, dictation: 0, grammar: 0, reading: 0, phrases: 0, writing: 0, xp: 0 };
