import { CSS } from './css.js';

export const HTML = `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>전도 AR 인증샷</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="https://cdn.jsdelivr.net">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Noto+Sans+KR:wght@400;700&display=swap">
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js"></script>
<style>${CSS}</style>
</head>
<body>

<!-- TEAM SETUP -->
<div id="team-screen" class="screen active">
  <div class="stars-bg"></div>
  <div class="home-icon">👥</div>
  <h1 class="home-title">전도짝<br>입력</h1>
  <p class="home-sub">함께 전도할 팀원을 입력하세요</p>
  <div class="member-box">
    <h3>👤 전도짝 이름 (최대 3명)</h3>
    <div class="char-form-row" style="margin-bottom:10px;">
      <input type="text" id="partner-1" placeholder="팀원 1 이름">
    </div>
    <div class="char-form-row" style="margin-bottom:10px;">
      <input type="text" id="partner-2" placeholder="팀원 2 이름 (선택)">
    </div>
    <div class="char-form-row" style="margin-bottom:0;">
      <input type="text" id="partner-3" placeholder="팀원 3 이름 (선택)">
    </div>
  </div>
  <button class="btn-ar" onclick="confirmTeam()" style="margin-top:8px;">✅ 시작하기</button>
</div>

<!-- HOME -->
<div id="home" class="screen">
  <div class="stars-bg"></div>
  <div class="home-icon">✨</div>
  <h1 class="home-title">전도 AR<br>인증샷</h1>
  <p class="home-sub">전도 목표 달성 → 가챠 캐릭터 등장!</p>
  <div class="member-box">
    <h3>👥 팀원 <span id="team-names" style="color:var(--gold);font-size:13px;"></span></h3>
    <div class="member-goal">목표: <span id="goal-display">-</span>명 전도</div>
  </div>
  <div class="prog-wrap">
    <div class="prog-top"><span>전도 현황</span><span id="prog-label-pct">0%</span></div>
    <div class="prog-bg"><div class="prog-fill" id="prog-fill" style="width:0%"></div></div>
    <div class="prog-nums">
      <span class="cur" id="prog-cur">0</span>
      <span class="sep">/</span>
      <span class="tot" id="prog-tot">-</span>
    </div>
  </div>
  <div class="count-row">
    <button class="count-btn" onclick="addCount(-1)">－</button>
    <button class="count-btn" onclick="addCount(1)">＋ 전도</button>
    <button class="count-btn" onclick="addCount(1)">＋</button>
  </div>
  <button class="btn-ar" id="ar-btn" disabled onclick="startGacha()">🔒 목표 달성 후 인증샷</button>
  <button class="manage-btn" onclick="showScreen('char-screen')">⚙ 캐릭터 관리</button>
</div>

<!-- GACHA -->
<div id="gacha-screen" class="screen">
  <div class="gacha-bg"></div>
  <div class="gacha-rays"></div>
  <div class="particles" id="particles"></div>
  <div class="gacha-card" id="gacha-card">
    <span class="gacha-grade-badge" id="gacha-badge">COMMON</span>
    <div id="gacha-char-display"></div>
    <div class="gacha-char-name" id="gacha-char-name">???</div>
    <div class="gacha-char-desc" id="gacha-char-desc"></div>
  </div>
  <div class="gacha-btns">
    <button class="btn-goto-cam" onclick="openCamera()">📸 인증샷 찍기</button>
    <button class="btn-skip" onclick="openCamera()">바로 찍기</button>
  </div>
</div>

<!-- AR CAMERA -->
<div id="ar-screen" class="screen">
  <video id="cam-video" autoplay playsinline muted></video>
  <div class="ar-hud-top">
    <div class="hud-grade" id="hud-grade">COMMON</div>
    <button class="hud-close" onclick="closeCamera()">✕</button>
  </div>
  <div class="ar-char-overlay draggable" id="ar-char-overlay">
    <div style="position:relative;">
      <div class="ar-grade-ring" id="ar-grade-ring"></div>
      <div id="ar-char-display"></div>
    </div>
    <div class="ar-char-nameplate" id="ar-char-nameplate">캐릭터</div>
  </div>
  <div class="ar-bottom">
    <button class="shutter" onclick="takePhoto()"><div class="shutter-inner"></div></button>
    <button class="ar-reroll" onclick="flipCamera()">🔄<br>카메라<br>전환</button>
  </div>
  <div class="flash" id="flash"></div>
</div>

<!-- RESULT -->
<div id="result-screen" class="screen">
  <div class="result-photo-wrap"><canvas id="result-canvas"></canvas></div>
  <div class="result-info">
    <div class="result-char-name" id="result-char-name"></div>
    <div class="result-grade-tag" id="result-grade-tag"></div>
  </div>
  <div class="result-btns">
    <button class="btn-save" onclick="savePhoto()">💾 사진 저장</button>
    <button class="btn-retake" onclick="retakePhoto()">다시 찍기</button>
  </div>
  <button class="btn-home" onclick="goHome()">🏠 홈으로</button>
</div>

<!-- CHARACTER MANAGER -->
<div id="char-screen" class="screen">
  <div class="char-screen-header">
    <h2>⚙ 캐릭터 관리</h2>
    <button class="btn-back" onclick="showScreen('home')">← 뒤로</button>
  </div>
  <div class="char-add-box">
    <h3>+ 새 캐릭터 추가</h3>
    <div class="char-form-row"><input type="text" id="char-name-input" placeholder="캐릭터 이름"></div>
    <div class="char-form-row">
      <select id="char-grade-select">
        <option value="common">⭐ COMMON (60%)</option>
        <option value="rare">⭐⭐ RARE (25%)</option>
        <option value="epic">⭐⭐⭐ EPIC (10%)</option>
        <option value="legend">🌟 LEGEND (5%)</option>
      </select>
    </div>
    <div class="char-img-row">
      <div class="img-upload-btn" onclick="document.getElementById('char-file-input').click()">📷 이미지 업로드 (선택)</div>
      <input type="file" id="char-file-input" accept="image/*" onchange="previewImg(this)" style="display:none">
      <img id="img-preview-el" class="img-preview" style="display:none">
    </div>
    <div style="margin-top:8px;">
      <input type="text" id="char-emoji-input" placeholder="또는 이모지 입력 (예: 👼)"
        style="background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.15);border-radius:10px;padding:10px 12px;color:white;font-size:14px;outline:none;width:100%;">
    </div>
    <div style="margin-top:10px;">
      <button class="char-add-btn" onclick="addCharacter()" style="width:100%">추가하기</button>
    </div>
  </div>
  <div class="char-list" id="char-list"></div>
</div>

<!-- MODAL -->
<div class="modal-overlay" id="modal">
  <div class="modal-box">
    <h3 id="modal-title">알림</h3>
    <p id="modal-msg"></p>
    <div class="modal-btns">
      <button class="modal-ok" id="modal-ok">확인</button>
      <button class="modal-cancel" id="modal-cancel" style="display:none">취소</button>
    </div>
  </div>
</div>

<script>__APP_JS__</script>
</body>
</html>`;
