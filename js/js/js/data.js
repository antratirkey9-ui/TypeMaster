// Typing Data & Motivational Quotes

export function getWords() {
  return ["cat","speed","keyboard","code","practice","accuracy","neon","retro","hacker"];
}

let customWords = JSON.parse(localStorage.getItem('customWords') || '[]');
export function addWord(word) {
  customWords.push(word);
  localStorage.setItem('customWords', JSON.stringify(customWords));
}
export function getLevelWords(level) {
  const base = [
    ["cat","dog","sun","car","book","sky","run","jump"],
    ["speed","keyboard","code","practice","accuracy","neon","retro","hacker"],
    ["enthusiasm","development","javascript","performance","responsive","engagement"],
    ["algorithm","optimization","monetization","analytics","integration","achievement"]
  ];
  return [...base[level], ...(customWords || [])];
}

export function getParagraphs() {
  return [
    "The quick brown fox jumps over the lazy dog.",
    "Typing speed can improve with consistent daily practice.",
    "Modern web apps require responsive and engaging design.",
    "Mastering touch typing opens up new productivity opportunities."
  ];
}
export function getLevelParagraph(level) {
  return getParagraphs()[level % getParagraphs().length];
}

export function getMotivationalQuote() {
  const quotes = [
    "Every keystroke brings you closer to mastery!",
    "The fastest typists started slow. Keep going!",
    "Typing is the language of productivity.",
    "Speed comes with practice — and fun!",
    "Accuracy beats haste. Type smart!"
  ];
  return quotes[Math.floor(Math.random() * quotes.length)];
}
