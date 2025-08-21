// Paragraph Typing Practice - Modular JS

import { getParagraphs, getLevelParagraph, getMotivationalQuote } from './data.js';
import { playSuccess, playError, showFunnyAnimation, saveProgress, loadProgress, showVideoAd } from './ai.js';

let para = '', level = 0, score = 0, correct = 0, total = 0, startTime = null;

function init() {
  level = loadProgress('paraLevel') || 0;
  para = getLevelParagraph(level);
  score = 0; correct = 0; total = 0; startTime = null;
  document.getElementById('levelIndicator').textContent = `Level: ${['Basic','Intermediate','Advanced','Expert'][level]}`;
  document.getElementById('paragraphBox').textContent = para;
  document.getElementById('paragraphInput').value = '';
  document.getElementById('funnyAnim').textContent = '';
  updateMetrics();
  showDailyTracker();
  showVideoAd();
}

function showDailyTracker() {
  let today = new Date().toISOString().slice(0,10);
  let tracked = loadProgress('dailyTracker') || {};
  let todayVal = tracked[today] || 0;
  document.getElementById('dailyTracker').textContent = `Today's Practice: ${todayVal} paragraphs`;
}

function updateMetrics() {
  let wpm = startTime ? Math.round((correct / ((Date.now() - startTime) / 60000))) : 0;
  let acc = total ? Math.round((correct / total) * 100) : 100;
  document.getElementById('wpmStat').textContent = `WPM: ${wpm}`;
  document.getElementById('accuracyStat').textContent = `Accuracy: ${acc}%`;
  document.getElementById('scoreStat').textContent = `Score: ${score}`;
}

document.getElementById('paragraphInput').addEventListener('input', e => {
  if (!startTime) startTime = Date.now();
  let typed = e.target.value;
  total = typed.length;
  correct = [...typed].filter((c, i) => c === para[i]).length;
  score = correct * 2 + level * 5;
  if (typed === para) {
    playSuccess();
    showFunnyAnimation('success', document.getElementById('funnyAnim'));
    let today = new Date().toISOString().slice(0,10);
    let tracked = loadProgress('dailyTracker') || {};
    tracked[today] = (tracked[today] || 0) + 1;
    saveProgress('dailyTracker', tracked);
    setTimeout(showResult, 320);
  } else if (typed.length >= para.length) {
    playError();
    showFunnyAnimation('error', document.getElementById('funnyAnim'));
  }
  updateMetrics();
});

function showResult() {
  saveProgress('paraLevel', level);
  document.querySelector('.practice-container').classList.add('hidden');
  document.getElementById('resultScreen').classList.remove('hidden');
  let wpm = Math.round((correct / ((Date.now() - startTime) / 60000)));
  let acc = total ? Math.round((correct / total) * 100) : 100;
  document.getElementById('scoreSummary').innerHTML =
    `WPM: <b>${wpm}</b><br>Accuracy: <b>${acc}%</b><br>Score: <b>${score}</b><br>`;
  document.getElementById('motivationalQuote').textContent = getMotivationalQuote();
}

document.getElementById('nextLevelBtn').addEventListener('click', () => {
  if (level < 3) level++; else level = 0;
  init();
  document.querySelector('.practice-container').classList.remove('hidden');
  document.getElementById('resultScreen').classList.add('hidden');
});
document.getElementById('backBtn').addEventListener('click', () => window.location.href = 'index.html');

window.addEventListener('DOMContentLoaded', init);
