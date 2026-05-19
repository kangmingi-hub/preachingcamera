// ── 셔터 ──────────────────────────────────────────────────
async function takePhoto() {
  const flash = document.getElementById('flash');
  flash.classList.remove('bang');
  void flash.offsetWidth;
  flash.classList.add('bang');

  setTimeout(async () => {
    await captureAndShow();
    if (state.currentChar && arUser?.id) saveToCollection(state.currentChar);
  }, 80);
}

// ── 캔버스에 사진 합성 + 결과 화면 이동 ───────────────────
async function captureAndShow() {
  const video  = document.getElementById('cam-video');
  const char   = state.currentChar;
  const canvas = document.getElementById('result-canvas');

  const W = video.videoWidth  || 1280;
  const H = video.videoHeight || 720;
  canvas.width  = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  // 1. 영상 프레임
  ctx.drawImage(video, 0, 0, W, H);

  // 2. 캐릭터 합성
  if (char) {
    const charX = state.charX / 100 * W;
    const charY = (1 - state.charY / 100) * H;
    const size  = Math.min(W, H) * 0.28;
    await drawCharacter(ctx, char, charX, charY, size);
    drawNameplate(ctx, char, charX, charY, W);
    drawGradeBadge(ctx, char, W);
  }

  // 3. 워터마크
  const wSize = Math.max(12, W * 0.018);
  ctx.font         = `${wSize}px 'Noto Sans KR', sans-serif`;
  ctx.fillStyle    = 'rgba(255,255,255,0.5)';
  ctx.textAlign    = 'right';
  ctx.textBaseline = 'bottom';
  ctx.fillText('전도 AR 인증샷', W - 12, H - 10);

  // 4. 결과 화면 업데이트
  document.getElementById('result-char-name').textContent = char ? char.name : '';
  const tag = document.getElementById('result-grade-tag');
  tag.className   = 'result-grade-tag ' + (char ? char.grade : '');
  tag.textContent = char ? GRADE_LABELS[char.grade] : '';

  showScreen('result-screen');
}

// ── 캐릭터 이미지/이모지 그리기 ───────────────────────────
async function drawCharacter(ctx, char, x, y, size) {
  ctx.save();
  ctx.shadowColor = 'rgba(255,215,0,0.8)';
  ctx.shadowBlur  = 30;

  if (char.imgData) {
    const img = new Image();
    img.src = char.imgData;
    await new Promise(r => { img.onload = r; img.onerror = r; });
    ctx.drawImage(img, x - size / 2, y - size, size, size);
  } else {
    ctx.font         = (size * 0.85) + 'px serif';
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText(char.emoji || '✨', x, y);
  }

  ctx.restore();
}

// ── 이름 플레이트 그리기 ──────────────────────────────────
function drawNameplate(ctx, char, x, y, W) {
  const nameY    = y + 14;
  const fontSize = Math.max(16, W * 0.022);
  const pad      = 14;

  ctx.font         = `bold ${fontSize}px 'Noto Sans KR', sans-serif`;
  ctx.textAlign    = 'center';
  ctx.textBaseline = 'middle';

  const nameW = ctx.measureText(char.name).width + pad * 2;
  const boxY  = nameY - fontSize * 0.8;
  const boxH  = fontSize * 1.6;

  ctx.fillStyle = 'rgba(0,0,0,0.65)';
  roundRect(ctx, x - nameW / 2, boxY, nameW, boxH, fontSize * 0.8);
  ctx.fill();

  ctx.strokeStyle = 'rgba(255,215,0,0.5)';
  ctx.lineWidth   = 1.5;
  roundRect(ctx, x - nameW / 2, boxY, nameW, boxH, fontSize * 0.8);
  ctx.stroke();

  ctx.fillStyle = '#FFD700';
  ctx.fillText(char.name, x, nameY);
}

// ── 등급 뱃지 그리기 ──────────────────────────────────────
function drawGradeBadge(ctx, char, W) {
  const gradeColors = { common:'#88aacc', rare:'#aa88ff', epic:'#ff9900', legend:'#FFD700' };
  const text        = GRADE_LABELS[char.grade] || '';
  const fontSize    = Math.max(12, W * 0.016);

  ctx.font = `bold ${fontSize}px sans-serif`;
  const bW = ctx.measureText(text).width + 20;
  const bX = W - bW - 16;
  const bY = 16;

  ctx.fillStyle = 'rgba(0,0,0,0.55)';
  roundRect(ctx, bX, bY, bW, fontSize * 1.8, fontSize * 0.9);
  ctx.fill();

  ctx.strokeStyle = gradeColors[char.grade] || '#FFD700';
  ctx.lineWidth   = 1.5;
  roundRect(ctx, bX, bY, bW, fontSize * 1.8, fontSize * 0.9);
  ctx.stroke();

  ctx.fillStyle    = gradeColors[char.grade] || '#FFD700';
  ctx.textAlign    = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, bX + bW / 2, bY + fontSize * 0.9);
}

// ── 둥근 사각형 경로 ──────────────────────────────────────
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

// ── 저장 / 다시찍기 / 홈 ──────────────────────────────────
function savePhoto() {
  const canvas = document.getElementById('result-canvas');
  const link   = document.createElement('a');
  link.download = '전도인증샷_' + Date.now() + '.png';
  link.href     = canvas.toDataURL('image/png');
  link.click();
  showToast('📸 사진이 저장되었습니다!');
}

function retakePhoto() {
  showScreen('ar-screen');
  if (!state.stream) startCamera().then(() => { renderARChar(); setupDrag(); });
}

function goHome() {
  stopStream();
  showScreen('home');
  updateHomeUI();
}
