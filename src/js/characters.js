import { state, saveState, GRADE_WEIGHTS, GRADE_LABELS } from './state.js';
import { showToast } from './utils.js';

let pendingImgData = null;

export function previewImg(input) {
  const file = input.files[0]; if (!file) return;
  const r = new FileReader();
  r.onload = e => {
    pendingImgData = e.target.result;
    const p = document.getElementById('img-preview-el'); p.src = pendingImgData; p.style.display = 'block';
  };
  r.readAsDataURL(file);
}

export function addCharacter() {
  const name  = document.getElementById('char-name-input').value.trim();
  const grade = document.getElementById('char-grade-select').value;
  const emoji = document.getElementById('char-emoji-input').value.trim();
  if (!name)                     { showToast('캐릭터 이름을 입력하세요');      return; }
  if (!pendingImgData && !emoji) { showToast('이미지 또는 이모지를 입력하세요'); return; }
  const dm = { legend:'전설의 캐릭터', epic:'강력한 캐릭터', rare:'희귀 캐릭터', common:'일반 캐릭터' };
  state.characters.push({ id:'c'+Date.now(), name, grade, imgData:pendingImgData||null, emoji:emoji||null, desc:dm[grade] });
  saveState(); resetCharForm(); renderCharList(); showToast('✅ ' + name + ' 추가됨!');
}

function resetCharForm() {
  document.getElementById('char-name-input').value = '';
  document.getElementById('char-emoji-input').value = '';
  document.getElementById('img-preview-el').style.display = 'none';
  document.getElementById('char-file-input').value = '';
  pendingImgData = null;
}

export function deleteCharacter(id) {
  state.characters = state.characters.filter(c => c.id !== id);
  saveState(); renderCharList();
}

export function renderCharList() {
  const list = document.getElementById('char-list'), chars = state.characters;
  if (!chars.length) { list.innerHTML = '<div class="no-chars">등록된 캐릭터가 없습니다.<br>기본 캐릭터(이모지)가 사용됩니다.</div>'; return; }
  list.innerHTML = chars.map(c => `
    <div class="char-item">
      ${c.imgData ? `<img src="${c.imgData}" class="char-item-img">` : `<div class="char-item-emoji">${c.emoji||'✨'}</div>`}
      <div class="char-item-info">
        <div class="char-item-name">${c.name}</div>
        <div class="char-item-grade ${c.grade}">${GRADE_LABELS[c.grade]}</div>
      </div>
      <div class="char-item-prob">${GRADE_WEIGHTS[c.grade]}%</div>
      <button class="char-item-del" onclick="deleteCharacter('${c.id}')">삭제</button>
    </div>
  `).join('');
}
