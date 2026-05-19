import { state, GRADE_LABELS } from './state.js';
import { showScreen, showModal, showToast } from './utils.js';
import { rollCharacter, spawnParticles } from './gacha.js';

export async function openCamera() {
  showScreen('ar-screen');
  await startCamera();
  renderARChar();
  setupDrag();
}

export async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: { ideal: 'environment' }, width: { ideal: 1920 }, height: { ideal: 1080 } }
    });
    state.stream = stream;
    const v = document.getElementById('cam-video'); v.srcObject = stream; await v.play();
  } catch(e) {
    showModal('카메라 오류', '카메라 접근 권한을 허용해주세요.');
    showScreen('home');
  }
}

export function closeCamera() { stopStream(); showScreen('home'); }

export function stopStream() {
  if (state.stream) { state.stream.getTracks().forEach(t => t.stop()); state.stream = null; }
}

export function renderARChar() {
  const char = state.currentChar; if (!char) return;
  const hud = document.getElementById('hud-grade');
  hud.className = 'hud-grade ' + char.grade; hud.textContent = GRADE_LABELS[char.grade];
  document.getElementById('ar-grade-ring').className = 'ar-grade-ring ' + char.grade;
  const disp = document.getElementById('ar-char-display');
  disp.innerHTML = char.imgData
    ? `<img src="${char.imgData}" class="ar-char-img">`
    : `<div class="ar-char-emoji">${char.emoji || '✨'}</div>`;
  document.getElementById('ar-char-nameplate').textContent = char.name;
  const ov = document.getElementById('ar-char-overlay');
  ov.style.bottom = state.charY + '%'; ov.style.left = state.charX + '%';
}

export function setupDrag() {
  const el = document.getElementById('ar-char-overlay');
  let dragging = false, sx, sy, ol, ob;
  const gp = e => e.touches ? { x:e.touches[0].clientX, y:e.touches[0].clientY } : { x:e.clientX, y:e.clientY };
  function onStart(e) {
    dragging = true; el.classList.add('dragging');
    const p = gp(e); sx = p.x; sy = p.y;
    const r = el.getBoundingClientRect(); ol = r.left + r.width/2; ob = window.innerHeight - r.bottom + r.height/2;
  }
  function onMove(e) {
    if (!dragging) return; if (e.cancelable) e.preventDefault();
    const p = gp(e);
    state.charX = Math.max(10, Math.min(90, (ol + (p.x-sx)) / window.innerWidth  * 100));
    state.charY = Math.max(5,  Math.min(80, (ob - (p.y-sy)) / window.innerHeight * 100));
    el.style.left = state.charX + '%'; el.style.bottom = state.charY + '%';
  }
  function onEnd() { dragging = false; el.classList.remove('dragging'); }
  el.addEventListener('mousedown', onStart);
  el.addEventListener('touchstart', onStart, { passive: true });
  window.addEventListener('mousemove', onMove);
  window.addEventListener('touchmove', onMove, { passive: false });
  window.addEventListener('mouseup', onEnd);
  window.addEventListener('touchend', onEnd);
}

export function rerollCharacter() {
  state.currentChar = rollCharacter();
  renderARChar(); spawnParticles(state.currentChar.grade);
  showToast('🎲 ' + state.currentChar.name + ' 등장!');
}
