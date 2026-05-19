import { state, loadState } from './js/state.js';
import { showScreen } from './js/utils.js';
import { setMembers, addCount, updateHomeUI, injectHomeUserBar } from './js/home.js';
import { startGacha } from './js/gacha.js';
import { openCamera, closeCamera, rerollCharacter } from './js/camera.js';
import { takePhoto, savePhoto, retakePhoto, goHome } from './js/photo.js';
import { previewImg, addCharacter, deleteCharacter, renderCharList } from './js/characters.js';
import { arUser, doLogout } from './js/supabase.js';

// HTML의 onclick에서 호출하려면 전역으로 노출해야 함
window.showScreen      = showScreen;
window.setMembers      = setMembers;
window.addCount        = addCount;
window.startGacha      = startGacha;
window.openCamera      = openCamera;
window.closeCamera     = closeCamera;
window.rerollCharacter = rerollCharacter;
window.takePhoto       = takePhoto;
window.savePhoto       = savePhoto;
window.retakePhoto     = retakePhoto;
window.goHome          = goHome;
window.previewImg      = previewImg;
window.addCharacter    = addCharacter;
window.deleteCharacter = deleteCharacter;
window.doLogout        = doLogout;

// 초기화
loadState();
updateHomeUI();
if (state.members > 0) {
  document.querySelectorAll('.mbtn').forEach((b, i) => b.classList.toggle('selected', i === state.members - 1));
}
window.addEventListener('DOMContentLoaded', () => {
  if (arUser) injectHomeUserBar(arUser);
});
