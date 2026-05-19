import { state, saveState } from './state.js';
import { showToast } from './utils.js';

export function setMembers(n) {
  state.members = n; state.goal = n * 10;
  document.querySelectorAll('.mbtn').forEach((b, i) => b.classList.toggle('selected', i === n - 1));
  saveState(); updateHomeUI();
}

export function addCount(d) {
  if (!state.goal) { showToast('먼저 인원 수를 선택하세요!'); return; }
  state.count = Math.max(0, state.count + d); saveState(); updateHomeUI();
}

export function updateHomeUI() {
  const cur = state.count, tot = state.goal;
  const pct = tot > 0 ? Math.min(100, Math.round(cur / tot * 100)) : 0;
  const done = tot > 0 && cur >= tot;
  document.getElementById('prog-cur').textContent = cur;
  document.getElementById('prog-tot').textContent = tot || '-';
  document.getElementById('prog-fill').style.width = pct + '%';
  document.getElementById('prog-label-pct').textContent = pct + '%';
  document.getElementById('goal-display').textContent = tot || '-';
  const btn = document.getElementById('ar-btn');
  if (done) {
    btn.disabled = false; btn.classList.remove('locked'); btn.textContent = '📸 AR 인증샷 찍기!';
  } else {
    btn.disabled = !tot; btn.classList.add('locked');
    btn.textContent = tot ? `🔒 ${tot - cur}명 더 전도하면 해금!` : '🔒 인원 수를 먼저 선택';
  }
}

export function injectHomeUserBar(user) {
  const home = document.getElementById('home'); if (!home) return;
  const bar = document.createElement('div');
  bar.style.cssText = 'position:absolute;top:14px;left:0;right:0;z-index:2;display:flex;align-items:center;justify-content:space-between;padding:0 18px;';
  bar.innerHTML = `
    <div style="font-size:13px;color:rgba(255,255,255,.6);background:rgba(255,255,255,.08);border-radius:99px;padding:5px 13px;">
      👤 <span style="color:#FFD700;font-weight:700;">${user.nickname}</span>
    </div>
    <button onclick="doLogout()" style="font-size:11px;color:rgba(255,255,255,.35);background:transparent;border:1px solid rgba(255,255,255,.15);border-radius:99px;padding:5px 11px;cursor:pointer;">로그아웃</button>
  `;
  home.appendChild(bar);
  const colBtn = document.createElement('button');
  colBtn.textContent = '📖 내 도감';
  colBtn.onclick = () => location.href = 'collection.html';
  colBtn.style.cssText = 'position:absolute;bottom:56px;right:20px;z-index:1;background:rgba(255,215,0,.12);border:1px solid rgba(255,215,0,.3);color:#FFD700;font-size:12px;border-radius:99px;padding:7px 14px;cursor:pointer;';
  home.appendChild(colBtn);
}
