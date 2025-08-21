// TypeMaster Main Script (homepage, dark mode, lazy loading, engagement, AdSense)
// Handles dark mode, button effects, local storage, and homepage engagement features

document.addEventListener('DOMContentLoaded', () => {
  // Dark Mode Toggle
  const darkBtn = document.getElementById('darkModeToggle');
  const setMode = (mode) => {
    document.body.classList.toggle('light', mode === 'light');
    localStorage.setItem('darkMode', mode);
  }
  darkBtn.addEventListener('click', () => {
    const newMode = document.body.classList.contains('light') ? 'dark' : 'light';
    setMode(newMode);
  });
  setMode(localStorage.getItem('darkMode') === 'light' ? 'light' : 'dark');

  // Animated Buttons
  document.querySelectorAll('.glow-btn').forEach(btn => {
    btn.addEventListener('mousedown', () => {
      btn.classList.add('active');
      setTimeout(() => btn.classList.remove('active'), 200);
    });
  });

  // Lazy Load AdSense Placeholder (simulate)
  setTimeout(() => {
    document.querySelectorAll('.adsense-placeholder').forEach(el => el.style.opacity = '1');
  }, 350);

  // Engagement Feature Example
  // Motivational quote on homepage
  const quotes = [
    "Every keystroke brings you closer to mastery!",
    "The fastest typists started slow. Keep going!",
    "Typing is the language of productivity.",
    "Speed comes with practice — and fun!",
    "Accuracy beats haste. Type smart!"
  ];
  if (location.pathname.endsWith('index.html')) {
    const features = document.querySelector('.features');
    if (features) {
      const quote = document.createElement('div');
      quote.id = 'motivationalQuote';
      quote.textContent = quotes[Math.floor(Math.random() * quotes.length)];
      features.appendChild(quote);
    }
  }
});
