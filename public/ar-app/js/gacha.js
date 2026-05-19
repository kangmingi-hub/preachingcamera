// ── 가챠 뽑기 ──────────────────────────────────────────────
function rollCharacter() {
  const pool = state.characters.length > 0 ? state.characters : DEFAULT_CHARS;

  // 등급 가중치 랜덤 추첨
  const r = Math.random() * 100;
  let cum = 0;
  let pickedGrade = 'common';
  for (const [grade, weight] of Object.entries(GRADE_WEIGHTS)) {
    cum += weight;
    if (r < cum) { pickedGrade = grade; break; }
  }

  // 해당 등급 캐릭터 중 랜덤
  const gradePool = pool.filter(c => c.grade === pickedGrade);
  const source    = gradePool.length > 0 ? gradePool : pool;
  return source[Math.floor(Math.random() * source.length)];
}

// ── 가챠 화면 시작 ─────────────────────────────────────────
function startGacha() {
  const char = rollCharacter();
  state.currentChar = char;
  state.charX = 50;
  state.charY = 28;

  // 카드 등급 스타일
  const card = document.getElementById('gacha-card');
  card.className = 'gacha-card ' + char.grade;
  document.getElementById('gacha-badge').textContent     = GRADE_LABELS[char.grade];
  document.getElementById('gacha-char-name').textContent = char.name;
  document.getElementById('gacha-char-desc').textContent = char.desc || '';

  // 캐릭터 이미지 or 이모지
  const disp = document.getElementById('gacha-char-display');
  disp.innerHTML = char.imgData
    ? `<img src="${char.imgData}" class="gacha-char-img" alt="${char.name}">`
    : `<div class="gacha-char-emoji">${char.emoji || '✨'}</div>`;

  // 등장 애니메이션 재시작
  card.style.animation = 'none';
  void card.offsetWidth;
  card.style.animation = '';

  spawnParticles(char.grade);
  showScreen('gacha-screen');
}

// ── 파티클 이펙트 ──────────────────────────────────────────
function spawnParticles(grade) {
  const colors = { common:'#88aacc', rare:'#aa88ff', epic:'#ff9900', legend:'#FFD700' };
  const color  = colors[grade] || '#FFD700';
  const container = document.getElementById('particles');
  container.innerHTML = '';

  for (let i = 0; i < 24; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.cssText = `
      background:${color};
      left:50%; top:50%;
      --tx:${(Math.random() - 0.5) * 300}px;
      --ty:${(Math.random() - 0.5) * 300}px;
      animation-delay:${Math.random() * 0.3}s;
      animation-duration:${0.8 + Math.random() * 0.6}s;
    `;
    container.appendChild(p);
    setTimeout(() => p.remove(), 2000);
  }
}
