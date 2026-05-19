import { state, GRADE_WEIGHTS, GRADE_LABELS, DEFAULT_CHARS } from './state.js';
import { showScreen } from './utils.js';

export function rollCharacter() {
  const pool = state.characters.length > 0 ? state.characters : DEFAULT_CHARS;
  const r = Math.random() * 100; let cum = 0; let grade = 'common';
  for (const [g, w] of Object.entries(GRADE_WEIGHTS)) { cum += w; if (r < cum) { grade = g; break; } }
  const gp = pool.filter(c => c.grade === grade);
  const src = gp.length > 0 ? gp : pool;
  return src[Math.floor(Math.random() * src.length)];
}

export function startGacha() {
  const char = rollCharacter();
  state.currentChar = char; state.charX = 50; state.charY = 28;
  const card = document.getElementById('gacha-card');
  card.className = 'gacha-card ' + char.grade;
  document.getElementById('gacha-badge').textContent = GRADE_LABELS[char.grade];
  document.getElementById('gacha-char-name').textContent = char.name;
  document.getElementById('gacha-char-desc').textContent = char.desc || '';
  const disp = document.getElementById('gacha-char-display');
  disp.innerHTML = char.imgData
    ? `<img src="${char.imgData}" class="gacha-char-img">`
    : `<div class="gacha-char-emoji">${char.emoji || '✨'}</div>`;
  card.style.animation = 'none'; void card.offsetWidth; card.style.animation = '';
  spawnParticles(char.grade);
  showScreen('gacha-screen');
}

export function spawnParticles(grade) {
  const colors = { common:'#88aacc', rare:'#aa88ff', epic:'#ff9900', legend:'#FFD700' };
  const c = colors[grade] || '#FFD700';
  const ct = document.getElementById('particles'); ct.innerHTML = '';
  for (let i = 0; i < 24; i++) {
    const p = document.createElement('div'); p.className = 'particle';
    p.style.cssText = `background:${c};left:50%;top:50%;--tx:${(Math.random()-.5)*300}px;--ty:${(Math.random()-.5)*300}px;animation-delay:${Math.random()*.3}s;animation-duration:${.8+Math.random()*.6}s;`;
    ct.appendChild(p); setTimeout(() => p.remove(), 2000);
  }
}
