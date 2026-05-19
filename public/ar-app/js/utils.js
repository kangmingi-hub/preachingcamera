// ── 화면 전환 ──────────────────────────────────────────────
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  if (id === 'char-screen') renderCharList();
}

// ── 토스트 알림 ────────────────────────────────────────────
function showToast(msg) {
  const old = document.querySelector('.toast');
  if (old) old.remove();
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 2600);
}

// ── 모달 ──────────────────────────────────────────────────
function showModal(title, msg, showCancel = false, onOk = null) {
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-msg').textContent   = msg;
  const cancelBtn = document.getElementById('modal-cancel');
  cancelBtn.style.display = showCancel ? '' : 'none';
  document.getElementById('modal').classList.add('open');

  document.getElementById('modal-ok').onclick = () => {
    document.getElementById('modal').classList.remove('open');
    if (onOk) onOk();
  };
  cancelBtn.onclick = () => document.getElementById('modal').classList.remove('open');
}
