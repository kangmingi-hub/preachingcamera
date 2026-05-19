import { state, GRADE_LABELS } from './state.js';
import { showScreen, showToast } from './utils.js';
import { stopStream, renderARChar, setupDrag, startCamera } from './camera.js';
import { saveToCollection, arUser } from './supabase.js';

export async function takePhoto() {
  const flash = document.getElementById('flash');
  flash.classList.remove('bang'); void flash.offsetWidth; flash.classList.add('bang');
  setTimeout(async () => {
    await captureAndShow();
    if (state.currentChar && arUser?.id) saveToCollection(state.currentChar);
  }, 80);
}

export async function captureAndShow() {
  const video = document.getElementById('cam-video');
  const char  = state.currentChar;
  const canvas = document.getElementById('result-canvas');
  const W = video.videoWidth || 1280, H = video.videoHeight || 720;
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(video, 0, 0, W, H);
  if (char) {
    const cx = state.charX / 100 * W, cy = (1 - state.charY / 100) * H, sz = Math.min(W, H) * .28;
    await drawChar(ctx, char, cx, cy, sz);
    drawNameplate(ctx, char, cx, cy, W);
    drawBadge(ctx, char, W);
  }
  const wSz = Math.max(12, W * .018);
  ctx.font = wSz + 'px sans-serif'; ctx.fillStyle = 'rgba(255,255,255,.5)';
  ctx.textAlign = 'right'; ctx.textBaseline = 'bottom';
  ctx.fillText('전도 AR 인증샷', W - 12, H - 10);
  document.getElementById('result-char-name').textContent = char ? char.name : '';
  const tag = document.getElementById('result-grade-tag');
  tag.className = 'result-grade-tag ' + (char ? char.grade : '');
  tag.textContent = char ? GRADE_LABELS[char.grade] : '';
  showScreen('result-screen');
}

async function drawChar(ctx, char, x, y, sz) {
  ctx.save(); ctx.shadowColor = 'rgba(255,215,0,.8)'; ctx.shadowBlur = 30;
  if (char.imgData) {
    const img = new Image(); img.src = char.imgData;
    await new Promise(r => { img.onload = r; img.onerror = r; });
    ctx.drawImage(img, x - sz/2, y - sz, sz, sz);
  } else {
    ctx.font = (sz * .85) + 'px serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
    ctx.fillText(char.emoji || '✨', x, y);
  }
  ctx.restore();
}

function drawNameplate(ctx, char, x, y, W) {
  const ny = y + 14, fs = Math.max(16, W * .022), pad = 14;
  ctx.font = 'bold ' + fs + 'px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  const nw = ctx.measureText(char.name).width + pad * 2, by = ny - fs * .8, bh = fs * 1.6;
  ctx.fillStyle = 'rgba(0,0,0,.65)'; rr(ctx, x - nw/2, by, nw, bh, fs * .8); ctx.fill();
  ctx.strokeStyle = 'rgba(255,215,0,.5)'; ctx.lineWidth = 1.5; rr(ctx, x - nw/2, by, nw, bh, fs * .8); ctx.stroke();
  ctx.fillStyle = '#FFD700'; ctx.fillText(char.name, x, ny);
}

function drawBadge(ctx, char, W) {
  const gc = { common:'#88aacc', rare:'#aa88ff', epic:'#ff9900', legend:'#FFD700' };
  const txt = GRADE_LABELS[char.grade] || '', fs = Math.max(12, W * .016);
  ctx.font = 'bold ' + fs + 'px sans-serif';
  const bw = ctx.measureText(txt).width + 20, bx = W - bw - 16, by = 16;
  ctx.fillStyle = 'rgba(0,0,0,.55)'; rr(ctx, bx, by, bw, fs * 1.8, fs * .9); ctx.fill();
  ctx.strokeStyle = gc[char.grade] || '#FFD700'; ctx.lineWidth = 1.5; rr(ctx, bx, by, bw, fs * 1.8, fs * .9); ctx.stroke();
  ctx.fillStyle = gc[char.grade] || '#FFD700'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText(txt, bx + bw/2, by + fs * .9);
}

function rr(ctx, x, y, w, h, r) {
  ctx.beginPath(); ctx.moveTo(x+r, y); ctx.lineTo(x+w-r, y); ctx.quadraticCurveTo(x+w, y, x+w, y+r);
  ctx.lineTo(x+w, y+h-r); ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h); ctx.lineTo(x+r, y+h);
  ctx.quadraticCurveTo(x, y+h, x, y+h-r); ctx.lineTo(x, y+r); ctx.quadraticCurveTo(x, y, x+r, y); ctx.closePath();
}

export function savePhoto() {
  const c = document.getElementById('result-canvas');
  const l = document.createElement('a'); l.download = '전도인증샷_' + Date.now() + '.png';
  l.href = c.toDataURL('image/png'); l.click(); showToast('📸 사진이 저장되었습니다!');
}

export function retakePhoto() {
  showScreen('ar-screen');
  if (!state.stream) startCamera().then(() => { renderARChar(); setupDrag(); });
}

export function goHome() { stopStream(); showScreen('home'); updateHomeUI(); }
