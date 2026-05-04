// ===== Passcode System =====
const PASSCODE = '';

function submitPasscode() {
  const input = document.getElementById('passcode-input');
  if (!input) return;
  const value = input.value;
  if (PASSCODE === '' || value === PASSCODE) {
    document.getElementById('passcode-overlay').classList.add('hidden');
    document.getElementById('main-app').style.display = 'block';
    document.getElementById('main-app').style.opacity = '1';
    document.getElementById('main-app').style.transform = 'translateY(0)';
    initScrollAnimations();
  } else {
    const err = document.getElementById('passcode-error');
    err.style.display = 'block';
    input.style.borderColor = '#ff4466';
    input.style.boxShadow = '0 0 30px rgba(255,68,102,0.3)';
    setTimeout(() => {
      err.style.display = 'none';
      input.style.borderColor = '';
      input.style.boxShadow = '';
    }, 2000);
  }
}

const passcodeInput = document.getElementById('passcode-input');
if (passcodeInput) {
  passcodeInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') submitPasscode();
  });
}

const passcodeBtn = document.getElementById('passcode-btn');
if (passcodeBtn) {
  passcodeBtn.addEventListener('click', submitPasscode);
}

// Focus
if (passcodeInput) passcodeInput.focus();

// ===== Theme Toggle =====
let isDark = localStorage.getItem('vp-theme') !== 'light';

function applyTheme() {
  document.body.classList.toggle('light-theme', !isDark);
}

applyTheme();

document.addEventListener('click', (e) => {
  if (e.target.closest('.theme-toggle')) {
    isDark = !isDark;
    localStorage.setItem('vp-theme', isDark ? 'dark' : 'light');
    applyTheme();
  }
});

// ===== Scroll Animations =====
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
});
