// ── 카메라 열기 ────────────────────────────────────────────
async function openCamera() {
  showScreen('ar-screen');
  await startCamera();
  renderARChar();
  setupDrag();
}

// ── 카메라 스트림 시작 ─────────────────────────────────────
async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: { ideal: 'environment' }, width: { ideal: 1920 }, height: { ideal: 1080 } }
    });
    state.stream = stream;
    const video = document.getElementById('cam-video');
    video.srcObject = stream;
    await video.play();
  } catch (err) {
    showModal('카메라 오류', '카메라 접근 권한을 허용해주세요.\n\n브라우저 설정 > 카메라 권한 허용');
    showScreen('home');
  }
}

// ── 카메라 닫기 ────────────────────────────────────────────
function closeCamera() {
  stopStream();
  showScreen('home');
}

function stopStream() {
  if (state.stream) {
    state.stream.getTracks().forEach(t => t.stop());
    state.stream = null;
  }
}

// ── AR 캐릭터 오버레이 렌더 ───────────────────────────────
function renderARChar() {
  const char = state.currentChar;
  if (!char) return;

  // HUD 등급 표시
  const hud = document.getElementById('hud-grade');
  hud.className   = 'hud-grade ' + char.grade;
  hud.textContent = GRADE_LABELS[char.grade];

  // 등급 링
  document.getElementById('ar-grade-ring').className = 'ar-grade-ring ' + char.grade;

  // 캐릭터 이미지 or 이모지
  const disp = document.getElementById('ar-char-display');
  disp.innerHTML = char.imgData
    ? `<img src="${char.imgData}" class="ar-char-img" alt="${char.name}">`
    : `<div class="ar-char-emoji">${char.emoji || '✨'}</div>`;

  // 이름 플레이트
  document.getElementById('ar-char-nameplate').textContent = char.name;

  // 위치 설정
  const overlay = document.getElementById('ar-char-overlay');
  overlay.style.bottom = state.charY + '%';
  overlay.style.left   = state.charX + '%';
}

// ── 캐릭터 드래그 이동 ─────────────────────────────────────
function setupDrag() {
  const el = document.getElementById('ar-char-overlay');
  let dragging = false, startX, startY, origLeft, origBottom;

  const getPos = (e) => e.touches
    ? { x: e.touches[0].clientX, y: e.touches[0].clientY }
    : { x: e.clientX, y: e.clientY };

  function onStart(e) {
    dragging = true;
    el.classList.add('dragging');
    const pos  = getPos(e);
    startX     = pos.x;
    startY     = pos.y;
    const rect = el.getBoundingClientRect();
    origLeft   = rect.left + rect.width  / 2;
    origBottom = window.innerHeight - rect.bottom + rect.height / 2;
  }

  function onMove(e) {
    if (!dragging) return;
    if (e.cancelable) e.preventDefault();
    const pos = getPos(e);
    const newLeft   = origLeft   + (pos.x - startX);
    const newBottom = origBottom - (pos.y - startY);
    state.charX = Math.max(10, Math.min(90, newLeft   / window.innerWidth  * 100));
    state.charY = Math.max(5,  Math.min(80, newBottom / window.innerHeight * 100));
    el.style.left   = state.charX + '%';
    el.style.bottom = state.charY + '%';
  }

  function onEnd() {
    dragging = false;
    el.classList.remove('dragging');
  }

  el.addEventListener('mousedown', onStart);
  el.addEventListener('touchstart', onStart, { passive: true });
  window.addEventListener('mousemove', onMove);
  window.addEventListener('touchmove', onMove, { passive: false });
  window.addEventListener('mouseup',  onEnd);
  window.addEventListener('touchend', onEnd);
}

// ── 캐릭터 다시 뽑기 ──────────────────────────────────────
function rerollCharacter() {
  state.currentChar = rollCharacter();
  renderARChar();
  spawnParticles(state.currentChar.grade);
  showToast('🎲 ' + state.currentChar.name + ' 등장!');
}
