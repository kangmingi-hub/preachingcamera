export function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  if (id === 'char-screen') renderCharList();
}

export function showToast(msg) {
  const old = document.querySelector('.toast'); if (old) old.remove();
  const el = document.createElement('div'); el.className = 'toast'; el.textContent = msg;
  document.body.appendChild(el); setTimeout(() => el.remove(), 2600);
}

export function showModal(title, msg, showCancel = false, onOk = null) {
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-msg').textContent = msg;
  const cb = document.getElementById('modal-cancel');
  cb.style.display = showCancel ? '' : 'none';
  document.getElementById('modal').classList.add('open');
  document.getElementById('modal-ok').onclick = () => {
    document.getElementById('modal').classList.remove('open');
    if (onOk) onOk();
  };
  cb.onclick = () => document.getElementById('modal').classList.remove('open');
}
