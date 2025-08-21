// Word Typing Practice - Modular JS

import { getWords, addWord, getLevelWords, getMotivationalQuote } from './data.js';
import { playSuccess, playError, showFunnyAnimation, saveProgress, loadProgress } from './ai.js';

let words = [], currentIdx = 0, score = 0, correct = 0, total = 0, level = 0, startTime = null;

function init() {
  // Load words and level
  level = loadProgress('wordLevel') || 0;
  words = getLevelWords(level);
  currentIdx = 0;
  score = 0;
  correct = 0;
  total = 0;
  document.getElementById('levelIndicator').textContent = `Level: ${['Basic','Intermediate','Advanced','Expert'][level]}`;
  showWord();
  updateMetrics();
  document.getElementById('wordInput').value = '';
  document.getElementById('funnyAnim').textContent = '';
}

function showWord() {
  document.getElementById('wordBox').textContent = words[currentIdx] || '';
}

function updateMetrics() {
  let wpm = startTime ? Math.round((correct / ((Date.now() - startTime) / 60000))) : 0;
  let acc = total ? Math.round((correct / total) * 100) : 100;
  document.getElementById('wpmStat').textContent = `WPM: ${wpm}`;
  document.getElementById('accuracyStat').textContent = `Accuracy: ${acc}%`;
  document.getElementById('scoreStat').textContent = `Score: ${score}`;
}

document.getElementById('wordInput').addEventListener('input', e => {
  if (!startTime) startTime = Date.now();
  let typed = e.target.value;
  let word = words[currentIdx];
  total++;
  if (typed.trim() === word) {
    correct++;
    score += 10 + level * 2;
    playSuccess();
    showFunnyAnimation('success', document.getElementById('funnyAnim'));
    setTimeout(nextWord, 320);
    e.target.value = '';
  } else if (typed.length >= word.length) {
    playError();
    showFunnyAnimation('error', document.getElementById('funnyAnim'));
  }
  updateMetrics();
});

function nextWord() {
  currentIdx++;
  if (currentIdx >= words.length) {
    showResult();
  } else {
    showWord();
  }
}

function showResult() {
  saveProgress('wordLevel', level);
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
document.getElementById('addWordBtn').addEventListener('click', () => {
  let newWord = prompt("Enter a new word:");
  if (newWord) {
    addWord(newWord);
    alert("Word added! Will appear in future sessions.");
  }
});

window.addEventListener('DOMContentLoaded', init);
