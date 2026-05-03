// ===== Passcode System =====
const PASSCODE = ''; // Empty = open access

document.getElementById('passcode-input').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') submitPasscode();
});

document.getElementById('passcode-submit').addEventListener('click', submitPasscode);

function submitPasscode() {
  const input = document.getElementById('passcode-input').value;
  if (PASSCODE === '' || input === PASSCODE) {
    document.getElementById('passcode-overlay').classList.add('hidden');
    document.getElementById('main-app').classList.add('active');
    startTypingEffect();
    createParticles();
    animateOnScroll();
  } else {
    const error = document.getElementById('passcode-error');
    error.style.display = 'block';
    document.getElementById('passcode-input').style.borderColor = '#ff4444';
    setTimeout(() => {
      error.style.display = 'none';
      document.getElementById('passcode-input').style.borderColor = '';
    }, 2000);
  }
}

// ===== Typing Effect =====
function startTypingEffect() {
  const el = document.getElementById('typed-title');
  if (!el) return;
  const title = 'VIPEN ONLINE';
  let i = 0;
  const interval = setInterval(() => {
    if (i < title.length) {
      el.textContent += title[i];
      i++;
    } else {
      clearInterval(interval);
    }
  }, 120);
}

// ===== Floating Particles =====
function createParticles() {
  if (document.querySelectorAll('.particle').length > 0) return;
  const count = 15;
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (8 + Math.random() * 12) + 's';
    particle.style.animationDelay = Math.random() * 10 + 's';
    const size = (2 + Math.random() * 4) + 'px';
    particle.style.width = size;
    particle.style.height = size;
    document.body.appendChild(particle);
  }
}

// ===== Scroll Animations =====
function animateOnScroll() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.card, .gallery-item, .stat-card, .video-container').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
}

// ===== Theme Toggle =====
let isDark = localStorage.getItem('theme') !== 'light';
function applyTheme() {
  if (!isDark) {
    document.body.classList.add('light-theme');
  } else {
    document.body.classList.remove('light-theme');
  }
}

applyTheme();

document.getElementById('theme-toggle').addEventListener('click', function() {
  isDark = !isDark;
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  applyTheme();
});

// ===== Focus passcode on load =====
document.getElementById('passcode-input').focus();

// ===== Init on page load =====
document.addEventListener('DOMContentLoaded', function() {
  createParticles();
  animateOnScroll();
});
