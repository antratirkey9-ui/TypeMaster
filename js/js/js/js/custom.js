// Custom Text Typing Practice - Modular JS

import { getMotivationalQuote } from './data.js';
import { generateTextAI, playSuccess, playError, showFunnyAnimation, saveHistory, loadHistory } from './ai.js';

let customText = '', score = 0, correct = 0, total = 0, startTime = null;

function init() {
  document.getElementById('customPrompt').value = '';
  document.getElementById('customTextBox').textContent = '';
  document.getElementById('customInput').value = '';
  document.getElementById('funnyAnim').textContent = '';
  updateMetrics();
  showHistory();
}

function updateMetrics() {
  let wpm = startTime ? Math.round((correct / ((Date.now() - startTime) / 60000))) : 0;
  let acc = total ? Math.round((correct / total) * 100) : 100;
  document.getElementById('wpmStat').textContent = `WPM: ${wpm}`;
  document.getElementById('accuracyStat').textContent = `Accuracy: ${acc}%`;
  document.getElementById('scoreStat').textContent = `Score: ${score}`;
}

document.getElementById('generateBtn').addEventListener('click', async () => {
  let prompt = document.getElementById('customPrompt').value;
  customText = await generateTextAI(prompt);
  document.getElementById('customTextBox').textContent = customText;
  document.getElementById('customInput').value = '';
  score = 0; correct = 0; total = 0; startTime = null;
  updateMetrics();
});

document.getElementById('customInput').addEventListener('input', e => {
  if (!startTime) startTime = Date.now();
  let typed = e.target.value;
  total = typed.length;
  correct = [...typed].filter((c, i) => c === customText[i]).length;
  score = correct * 2;
  if (typed === customText) {
    playSuccess();
    showFunnyAnimation('success', document.getElementById('funnyAnim'));
    saveHistory({ prompt: document.getElementById('customPrompt').value, text: customText, score, wpm: Math.round((correct / ((Date.now() - startTime) / 60000))) });
    setTimeout(showResult, 320);
  } else if (typed.length >= customText.length) {
    playError();
    showFunnyAnimation('error', document.getElementById('funnyAnim'));
  }
  updateMetrics();
});

function showResult() {
  document.querySelector('.practice-container').classList.add('hidden');
  document.getElementById('resultScreen').classList.remove('hidden');
  let wpm = Math.round((correct / ((Date.now() - startTime) / 60000)));
  let acc = total ? Math.round((correct / total) * 100) : 100;
  document.getElementById('scoreSummary').innerHTML =
    `WPM: <b>${wpm}</b><br>Accuracy: <b>${acc}%</b><br>Score: <b>${score}</b><br>`;
}

document.getElementById('backBtn').addEventListener('click', () => {
  document.querySelector('.practice-container').classList.remove('hidden');
  document.getElementById('resultScreen').classList.add('hidden');
});
function showHistory() {
  let history = loadHistory();
  let div = document.getElementById('practiceHistory');
  div.innerHTML = '<h3>Practice History</h3>' + (history.map((h, i) =>
    `<div>#${i+1}: <b>${h.prompt}</b> - Score: ${h.score}, WPM: ${h.wpm}</div>`).join('') || 'No history yet.');
}

window.addEventListener('DOMContentLoaded', init);
