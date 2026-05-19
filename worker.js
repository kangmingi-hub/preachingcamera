const HTML = `<!DOCTYPE html>
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
<style>
:root{--gold:#FFD700;--gold2:#FFA500;--deep:#0a0a2e;--navy:#0d1b3e;--white:#ffffff;--r:#ff4444;--common-c:#88aacc;--rare-c:#aa88ff;--epic-c:#ff9900;--legend-c:#FFD700}
*{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent}
html,body{width:100%;height:100%;overflow:hidden;background:#000;font-family:'Noto Sans KR',sans-serif}
.screen{display:none;position:absolute;inset:0;flex-direction:column;align-items:center;justify-content:center}
.screen.active{display:flex}
#home{background:radial-gradient(ellipse at 50% 20%,#1e2a6e 0%,#0a0a2e 65%);overflow:hidden}
.stars-bg{position:absolute;inset:0;pointer-events:none;background:radial-gradient(1px 1px at 15% 20%,#fff,transparent),radial-gradient(1px 1px at 85% 8%,#fff,transparent),radial-gradient(1.5px 1.5px at 55% 55%,rgba(255,255,255,.9),transparent),radial-gradient(1px 1px at 8% 75%,#fff,transparent),radial-gradient(1px 1px at 72% 68%,rgba(255,255,255,.7),transparent),radial-gradient(1px 1px at 40% 12%,#fff,transparent),radial-gradient(1px 1px at 93% 45%,rgba(255,255,255,.6),transparent),radial-gradient(1px 1px at 28% 88%,rgba(255,255,255,.5),transparent),radial-gradient(1.5px 1.5px at 65% 30%,#fff,transparent);animation:twinkle 5s ease-in-out infinite alternate}
@keyframes twinkle{from{opacity:.5}to{opacity:1}}
.home-icon{font-size:80px;animation:float 3s ease-in-out infinite;z-index:1;margin-bottom:8px;filter:drop-shadow(0 0 24px rgba(255,215,0,.8))}
@keyframes float{0%,100%{transform:translateY(0) rotate(-4deg)}50%{transform:translateY(-16px) rotate(4deg)}}
.home-title{font-family:'Black Han Sans',sans-serif;font-size:clamp(24px,8vw,40px);background:linear-gradient(135deg,#fff 0%,var(--gold) 50%,var(--gold2) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;text-align:center;z-index:1;filter:drop-shadow(0 2px 12px rgba(255,215,0,.5));line-height:1.3;padding:0 20px}
.home-sub{font-size:13px;color:rgba(255,255,255,.5);margin:6px 0 22px;z-index:1;letter-spacing:.5px}
.member-box{background:rgba(255,255,255,.06);border:1px solid rgba(255,215,0,.25);border-radius:20px;padding:18px 22px;width:min(320px,88vw);z-index:1;margin-bottom:18px}
.member-box h3{font-size:12px;color:var(--gold);letter-spacing:.5px;margin-bottom:12px}
.member-btns{display:flex;gap:8px;justify-content:center}
.mbtn{flex:1;padding:10px 0;border-radius:12px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.15);color:rgba(255,255,255,.7);font-size:14px;cursor:pointer;transition:all .2s;font-family:'Noto Sans KR',sans-serif}
.mbtn.selected{background:rgba(255,215,0,.15);border-color:var(--gold);color:var(--gold);font-weight:700}
.member-goal{text-align:center;font-size:12px;color:rgba(255,255,255,.45);margin-top:10px}
.member-goal span{color:var(--gold);font-weight:700;font-size:15px}
.prog-wrap{background:rgba(255,255,255,.06);border:1px solid rgba(255,215,0,.2);border-radius:20px;padding:16px 22px;width:min(320px,88vw);z-index:1;margin-bottom:22px}
.prog-top{display:flex;justify-content:space-between;font-size:12px;color:var(--gold);margin-bottom:8px}
.prog-bg{background:rgba(255,255,255,.1);border-radius:99px;height:12px;overflow:hidden}
.prog-fill{height:100%;border-radius:99px;background:linear-gradient(90deg,var(--gold2),var(--gold));box-shadow:0 0 10px rgba(255,215,0,.5);transition:width .7s cubic-bezier(.34,1.56,.64,1);position:relative;overflow:hidden}
.prog-fill::after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.3),transparent);animation:shimmer 2s infinite}
@keyframes shimmer{0%{transform:translateX(-100%)}100%{transform:translateX(200%)}}
.prog-nums{display:flex;align-items:baseline;gap:4px;margin-top:8px}
.prog-nums .cur{font-size:28px;font-family:'Black Han Sans',sans-serif;color:var(--gold)}
.prog-nums .sep{color:rgba(255,255,255,.3)}
.prog-nums .tot{font-size:16px;color:rgba(255,255,255,.5)}
.count-row{display:flex;gap:12px;z-index:1;margin-bottom:18px}
.count-btn{width:52px;height:52px;border-radius:50%;font-size:22px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.2);color:white;cursor:pointer;transition:all .15s}
.count-btn:active{transform:scale(.9);background:rgba(255,255,255,.18)}
.btn-ar{background:linear-gradient(135deg,var(--gold2),var(--gold));color:#1a0800;font-family:'Black Han Sans',sans-serif;font-size:18px;border:none;border-radius:99px;padding:14px 40px;cursor:pointer;z-index:1;box-shadow:0 4px 24px rgba(255,165,0,.5);transition:transform .15s,box-shadow .15s;letter-spacing:.5px}
.btn-ar:active{transform:scale(.96)}
.btn-ar:disabled{background:rgba(255,255,255,.12);color:rgba(255,255,255,.3);box-shadow:none;cursor:not-allowed}
.btn-ar.locked::before{content:'🔒 '}
.manage-btn{position:absolute;bottom:20px;right:20px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15);color:rgba(255,255,255,.5);font-size:12px;border-radius:99px;padding:7px 14px;cursor:pointer;z-index:1}
#gacha-screen{background:#000;z-index:50}
.gacha-bg{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 50%,#1a0050 0%,#000 70%)}
.gacha-rays{position:absolute;inset:0;background:conic-gradient(from 0deg at 50% 50%,transparent 0deg,rgba(255,215,0,.04) 10deg,transparent 20deg,transparent 30deg,rgba(255,215,0,.04) 40deg,transparent 50deg,transparent 60deg,rgba(255,215,0,.04) 70deg,transparent 80deg,transparent 90deg,rgba(255,215,0,.04) 100deg,transparent 110deg,transparent 120deg,rgba(255,215,0,.04) 130deg,transparent 140deg,transparent 150deg,rgba(255,215,0,.04) 160deg,transparent 170deg,transparent 180deg,rgba(255,215,0,.04) 190deg,transparent 200deg,transparent 210deg,rgba(255,215,0,.04) 220deg,transparent 230deg,transparent 240deg,rgba(255,215,0,.04) 250deg,transparent 260deg,transparent 270deg,rgba(255,215,0,.04) 280deg,transparent 290deg,transparent 300deg,rgba(255,215,0,.04) 310deg,transparent 320deg,transparent 330deg,rgba(255,215,0,.04) 340deg,transparent 350deg);animation:spin-rays 8s linear infinite}
@keyframes spin-rays{from{transform:rotate(0)}to{transform:rotate(360deg)}}
.gacha-card{position:relative;z-index:2;width:min(260px,75vw);aspect-ratio:2/3;border-radius:24px;overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;box-shadow:0 0 60px rgba(255,215,0,.5),0 0 120px rgba(255,215,0,.2);animation:card-in .5s cubic-bezier(.34,1.56,.64,1) both}
@keyframes card-in{from{transform:scale(0) rotateY(180deg);opacity:0}to{transform:scale(1) rotateY(0);opacity:1}}
.gacha-card.common{background:linear-gradient(160deg,#1a2a3e,#2a3a5e);border:2px solid var(--common-c)}
.gacha-card.rare{background:linear-gradient(160deg,#1a0e3e,#2e1a6e);border:2px solid var(--rare-c);box-shadow:0 0 60px rgba(170,136,255,.5)}
.gacha-card.epic{background:linear-gradient(160deg,#2e1a00,#5e3a00);border:2px solid var(--epic-c);box-shadow:0 0 60px rgba(255,153,0,.5)}
.gacha-card.legend{background:linear-gradient(160deg,#2e2000,#5e4400);border:2px solid var(--legend-c);box-shadow:0 0 80px rgba(255,215,0,.8),0 0 160px rgba(255,215,0,.3)}
.gacha-grade-badge{position:absolute;top:14px;right:14px;font-family:'Black Han Sans',sans-serif;font-size:11px;padding:3px 10px;border-radius:99px}
.common .gacha-grade-badge{background:rgba(136,170,204,.2);color:var(--common-c);border:1px solid var(--common-c)}
.rare .gacha-grade-badge{background:rgba(170,136,255,.2);color:var(--rare-c);border:1px solid var(--rare-c)}
.epic .gacha-grade-badge{background:rgba(255,153,0,.2);color:var(--epic-c);border:1px solid var(--epic-c)}
.legend .gacha-grade-badge{background:rgba(255,215,0,.2);color:var(--legend-c);border:1px solid var(--legend-c)}
.gacha-char-img{width:70%;aspect-ratio:1;object-fit:contain;filter:drop-shadow(0 0 20px rgba(255,255,255,.4));animation:pulse-glow 2s ease-in-out infinite}
.gacha-char-emoji{font-size:90px;animation:pulse-glow 2s ease-in-out infinite}
@keyframes pulse-glow{0%,100%{filter:drop-shadow(0 0 10px rgba(255,215,0,.4))}50%{filter:drop-shadow(0 0 30px rgba(255,215,0,.8))}}
.gacha-char-name{font-family:'Black Han Sans',sans-serif;font-size:18px;color:white;margin-top:10px;text-align:center;padding:0 16px}
.gacha-char-desc{font-size:11px;color:rgba(255,255,255,.55);margin-top:4px;text-align:center;padding:0 14px;line-height:1.5}
.particles{position:absolute;inset:0;pointer-events:none;overflow:hidden;z-index:1}
.particle{position:absolute;width:6px;height:6px;border-radius:50%;animation:particle-fly 1.2s ease-out forwards}
@keyframes particle-fly{from{transform:translate(0,0) scale(1);opacity:1}to{transform:translate(var(--tx),var(--ty)) scale(0);opacity:0}}
.gacha-btns{display:flex;gap:12px;margin-top:22px;z-index:2}
.btn-goto-cam{background:linear-gradient(135deg,var(--gold2),var(--gold));color:#1a0800;font-family:'Black Han Sans',sans-serif;font-size:16px;border:none;border-radius:99px;padding:12px 28px;cursor:pointer;box-shadow:0 4px 20px rgba(255,165,0,.4)}
.btn-skip{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.2);color:rgba(255,255,255,.6);font-size:14px;border-radius:99px;padding:12px 20px;cursor:pointer}
#ar-screen{background:#000}
#cam-video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.ar-char-overlay{position:absolute;bottom:28%;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;pointer-events:none;z-index:10;animation:ar-float 2.5s ease-in-out infinite;transition:all .3s}
@keyframes ar-float{0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(-14px)}}
.ar-char-img{width:min(140px,35vw);aspect-ratio:1;object-fit:contain;filter:drop-shadow(0 0 16px rgba(255,215,0,.8)) drop-shadow(0 4px 8px rgba(0,0,0,.6))}
.ar-char-emoji{font-size:clamp(72px,20vw,110px);filter:drop-shadow(0 0 16px rgba(255,215,0,.8))}
.ar-char-nameplate{font-family:'Black Han Sans',sans-serif;font-size:13px;background:rgba(0,0,0,.65);border:1px solid rgba(255,215,0,.5);color:var(--gold);border-radius:99px;padding:3px 14px;margin-top:6px;backdrop-filter:blur(4px)}
.ar-grade-ring{position:absolute;inset:-8px;border-radius:50%;border:3px solid transparent;animation:ring-spin 3s linear infinite}
.ar-grade-ring.common{border-color:rgba(136,170,204,.4)}
.ar-grade-ring.rare{border-color:rgba(170,136,255,.6)}
.ar-grade-ring.epic{border-color:rgba(255,153,0,.6)}
.ar-grade-ring.legend{border-color:var(--gold);box-shadow:0 0 20px rgba(255,215,0,.5)}
@keyframes ring-spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
.ar-hud-top{position:absolute;top:0;left:0;right:0;z-index:20;padding:14px 18px;background:linear-gradient(to bottom,rgba(0,0,0,.65),transparent);display:flex;align-items:center;justify-content:space-between}
.hud-grade{font-family:'Black Han Sans',sans-serif;font-size:13px;padding:5px 14px;border-radius:99px;border:1px solid}
.hud-grade.common{background:rgba(136,170,204,.15);color:var(--common-c);border-color:var(--common-c)}
.hud-grade.rare{background:rgba(170,136,255,.15);color:var(--rare-c);border-color:var(--rare-c)}
.hud-grade.epic{background:rgba(255,153,0,.15);color:var(--epic-c);border-color:var(--epic-c)}
.hud-grade.legend{background:rgba(255,215,0,.15);color:var(--gold);border-color:var(--gold)}
.hud-close{background:rgba(255,255,255,.15);border:none;color:white;width:36px;height:36px;border-radius:50%;font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center}
.ar-char-overlay.draggable{cursor:grab;pointer-events:all}
.ar-char-overlay.dragging{cursor:grabbing;animation:none}
.ar-bottom{position:absolute;bottom:0;left:0;right:0;z-index:20;padding:16px 28px 38px;background:linear-gradient(to top,rgba(0,0,0,.75),transparent);display:flex;align-items:center;justify-content:space-between}
.ar-tip{font-size:11px;color:rgba(255,255,255,.6);max-width:100px;line-height:1.5}
.shutter{width:70px;height:70px;border-radius:50%;background:white;border:4px solid rgba(255,255,255,.35);box-shadow:0 0 0 6px rgba(255,255,255,.12);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:transform .1s}
.shutter:active{transform:scale(.88)}
.shutter-inner{width:58px;height:58px;border-radius:50%;background:#f0f0f0}
.ar-reroll{background:rgba(255,215,0,.15);border:1px solid rgba(255,215,0,.4);color:var(--gold);font-size:12px;border-radius:12px;padding:8px 10px;cursor:pointer;text-align:center;line-height:1.4;max-width:68px}
.flash{position:absolute;inset:0;background:white;opacity:0;pointer-events:none;z-index:100}
.flash.bang{animation:flash-anim .35s forwards}
@keyframes flash-anim{0%{opacity:1}100%{opacity:0}}
#result-screen{background:#000;overflow-y:auto}
.result-photo-wrap{position:relative;width:min(340px,92vw);border-radius:20px;overflow:hidden;box-shadow:0 8px 40px rgba(0,0,0,.8);flex-shrink:0}
#result-canvas{width:100%;display:block;border-radius:20px}
.result-info{display:flex;flex-direction:column;align-items:center;gap:6px;margin:14px 0 6px;width:min(340px,92vw)}
.result-char-name{font-family:'Black Han Sans',sans-serif;font-size:20px;color:var(--gold)}
.result-grade-tag{font-size:12px;border-radius:99px;padding:3px 14px;border:1px solid}
.result-grade-tag.common{color:var(--common-c);border-color:var(--common-c);background:rgba(136,170,204,.1)}
.result-grade-tag.rare{color:var(--rare-c);border-color:var(--rare-c);background:rgba(170,136,255,.1)}
.result-grade-tag.epic{color:var(--epic-c);border-color:var(--epic-c);background:rgba(255,153,0,.1)}
.result-grade-tag.legend{color:var(--gold);border-color:var(--gold);background:rgba(255,215,0,.1)}
.result-btns{display:flex;gap:10px;margin-top:10px;margin-bottom:24px}
.btn-save{background:linear-gradient(135deg,var(--gold2),var(--gold));color:#1a0800;font-family:'Black Han Sans',sans-serif;font-size:16px;border:none;border-radius:99px;padding:13px 28px;cursor:pointer;box-shadow:0 4px 20px rgba(255,165,0,.4)}
.btn-retake{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.2);color:rgba(255,255,255,.7);font-size:14px;border-radius:99px;padding:13px 22px;cursor:pointer}
.btn-home{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.15);color:rgba(255,255,255,.5);font-size:13px;border-radius:99px;padding:10px 20px;cursor:pointer;margin-bottom:16px}
#char-screen{background:linear-gradient(160deg,#0d1b3e,#0a0a2e);overflow-y:auto;padding:20px;gap:14px;align-items:stretch}
.char-screen-header{display:flex;align-items:center;justify-content:space-between;flex-shrink:0}
.char-screen-header h2{font-family:'Black Han Sans',sans-serif;font-size:20px;color:var(--gold)}
.btn-back{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15);color:white;border-radius:99px;padding:7px 16px;font-size:13px;cursor:pointer}
.char-add-box{background:rgba(255,255,255,.04);border:1px solid rgba(255,215,0,.2);border-radius:16px;padding:16px;flex-shrink:0}
.char-add-box h3{font-size:13px;color:var(--gold);margin-bottom:12px}
.char-form-row{display:flex;gap:8px;margin-bottom:8px}
.char-form-row input,.char-form-row select{flex:1;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.15);border-radius:10px;padding:10px 12px;color:white;font-size:14px;outline:none;font-family:'Noto Sans KR',sans-serif}
.char-form-row input:focus,.char-form-row select:focus{border-color:var(--gold)}
.char-form-row select option{background:#1a1a3e}
.char-img-row{display:flex;gap:8px;align-items:center}
.img-upload-btn{flex:1;background:rgba(255,255,255,.06);border:1px dashed rgba(255,215,0,.4);border-radius:10px;padding:10px;color:rgba(255,215,0,.7);font-size:13px;cursor:pointer;text-align:center}
.char-add-btn{background:linear-gradient(135deg,var(--gold2),var(--gold));color:#1a0800;font-family:'Black Han Sans',sans-serif;font-size:14px;border:none;border-radius:10px;padding:10px 18px;cursor:pointer}
.img-preview{width:44px;height:44px;border-radius:8px;object-fit:contain;border:1px solid rgba(255,215,0,.3)}
.char-list{display:flex;flex-direction:column;gap:8px}
.char-item{background:rgba(255,255,255,.04);border-radius:12px;padding:12px 14px;display:flex;align-items:center;gap:12px;border:1px solid rgba(255,255,255,.08)}
.char-item-img{width:44px;height:44px;object-fit:contain;border-radius:8px}
.char-item-emoji{font-size:36px;width:44px;text-align:center}
.char-item-info{flex:1}
.char-item-name{font-weight:700;font-size:14px}
.char-item-grade{font-size:11px;margin-top:2px}
.char-item-grade.common{color:var(--common-c)}
.char-item-grade.rare{color:var(--rare-c)}
.char-item-grade.epic{color:var(--epic-c)}
.char-item-grade.legend{color:var(--gold)}
.char-item-del{background:rgba(255,68,68,.1);border:1px solid rgba(255,68,68,.3);color:#ff8888;border-radius:8px;padding:5px 10px;font-size:12px;cursor:pointer}
.char-item-prob{font-size:11px;color:rgba(255,255,255,.4)}
.no-chars{text-align:center;color:rgba(255,255,255,.3);font-size:14px;padding:30px 0}
.toast{position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:rgba(30,30,60,.95);border:1px solid rgba(255,215,0,.3);color:white;font-size:13px;border-radius:99px;padding:10px 22px;z-index:999;white-space:nowrap;pointer-events:none;animation:toast-in .3s ease,toast-out .3s ease 2.2s forwards}
@keyframes toast-in{from{opacity:0;transform:translateX(-50%) translateY(10px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}
@keyframes toast-out{from{opacity:1}to{opacity:0}}
.modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.7);align-items:center;justify-content:center;z-index:200;display:none}
.modal-overlay.open{display:flex}
.modal-box{background:linear-gradient(160deg,#1a1a4e,#0d1b3e);border:1px solid rgba(255,215,0,.25);border-radius:20px;padding:28px 24px;width:min(300px,85vw);text-align:center}
.modal-box h3{font-family:'Black Han Sans',sans-serif;font-size:20px;color:var(--gold);margin-bottom:8px}
.modal-box p{font-size:13px;color:rgba(255,255,255,.6);margin-bottom:20px;line-height:1.6}
.modal-btns{display:flex;gap:10px}
.modal-ok{flex:1;background:linear-gradient(135deg,var(--gold2),var(--gold));color:#1a0800;font-family:'Black Han Sans',sans-serif;font-size:16px;border:none;border-radius:99px;padding:12px;cursor:pointer}
.modal-cancel{flex:1;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.2);color:white;border-radius:99px;padding:12px;font-size:14px;cursor:pointer}
</style>
</head>
<body>

<!-- HOME -->
<div id="home" class="screen active">
  <div class="stars-bg"></div>
  <div class="home-icon">✨</div>
  <h1 class="home-title">전도 AR<br>인증샷</h1>
  <p class="home-sub">전도 목표 달성 → 가챠 캐릭터 등장!</p>
  <div class="member-box">
    <h3>👥 전도 나간 인원 수</h3>
    <div class="member-btns">
      <button class="mbtn" onclick="setMembers(1)">1명</button>
      <button class="mbtn" onclick="setMembers(2)">2명</button>
      <button class="mbtn" onclick="setMembers(3)">3명</button>
      <button class="mbtn" onclick="setMembers(4)">4명</button>
      <button class="mbtn" onclick="setMembers(5)">5명</button>
    </div>
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
    <button class="ar-reroll" onclick="rerollCharacter()">🎲<br>다시<br>뽑기</button>
    <button class="shutter" onclick="takePhoto()"><div class="shutter-inner"></div></button>
    <div class="ar-tip">캐릭터를<br>드래그해서<br>위치 조정</div>
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
      <input type="text" id="char-emoji-input" placeholder="또는 이모지 입력 (예: 👼)" style="background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.15);border-radius:10px;padding:10px 12px;color:white;font-size:14px;outline:none;width:100%;">
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

<script>
// ── 상수 ──
const GRADE_WEIGHTS = { common:60, rare:25, epic:10, legend:5 };
const GRADE_LABELS  = { common:'⭐ COMMON', rare:'⭐⭐ RARE', epic:'⭐⭐⭐ EPIC', legend:'🌟 LEGEND' };
const DEFAULT_CHARS = [
  { id:'d1', name:'비둘기', grade:'common', emoji:'🕊️', desc:'평화의 비둘기' },
  { id:'d2', name:'천사',   grade:'rare',   emoji:'👼', desc:'하늘의 전령사' },
  { id:'d3', name:'대천사', grade:'epic',   emoji:'😇', desc:'빛의 수호자' },
  { id:'d4', name:'성령',   grade:'legend', emoji:'✨', desc:'전설의 성령 임재' },
];

// ── 상태 ──
const state = { members:0, goal:0, count:0, characters:[], currentChar:null, stream:null, charX:50, charY:28 };

function loadState() {
  try {
    const s = JSON.parse(localStorage.getItem('eva_state') || '{}');
    state.members = s.members || 0; state.goal = s.goal || 0;
    state.count = s.count || 0; state.characters = s.characters || [...DEFAULT_CHARS];
  } catch(e) { state.characters = [...DEFAULT_CHARS]; }
}
function saveState() {
  localStorage.setItem('eva_state', JSON.stringify({ members:state.members, goal:state.goal, count:state.count, characters:state.characters }));
}

// ── 유틸 ──
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  if (id === 'char-screen') renderCharList();
}
function showToast(msg) {
  const old = document.querySelector('.toast'); if (old) old.remove();
  const el = document.createElement('div'); el.className = 'toast'; el.textContent = msg;
  document.body.appendChild(el); setTimeout(() => el.remove(), 2600);
}
function showModal(title, msg, showCancel=false, onOk=null) {
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-msg').textContent = msg;
  const cb = document.getElementById('modal-cancel'); cb.style.display = showCancel ? '' : 'none';
  document.getElementById('modal').classList.add('open');
  document.getElementById('modal-ok').onclick = () => { document.getElementById('modal').classList.remove('open'); if(onOk) onOk(); };
  cb.onclick = () => document.getElementById('modal').classList.remove('open');
}

// ── 홈 ──
function setMembers(n) {
  state.members = n; state.goal = n * 10;
  document.querySelectorAll('.mbtn').forEach((b,i) => b.classList.toggle('selected', i === n-1));
  saveState(); updateHomeUI();
}
function addCount(d) {
  if (!state.goal) { showToast('먼저 인원 수를 선택하세요!'); return; }
  state.count = Math.max(0, state.count + d); saveState(); updateHomeUI();
}
function updateHomeUI() {
  const cur = state.count, tot = state.goal;
  const pct = tot > 0 ? Math.min(100, Math.round(cur/tot*100)) : 0;
  const done = tot > 0 && cur >= tot;
  document.getElementById('prog-cur').textContent = cur;
  document.getElementById('prog-tot').textContent = tot || '-';
  document.getElementById('prog-fill').style.width = pct + '%';
  document.getElementById('prog-label-pct').textContent = pct + '%';
  document.getElementById('goal-display').textContent = tot || '-';
  const btn = document.getElementById('ar-btn');
  if (done) { btn.disabled=false; btn.classList.remove('locked'); btn.textContent='📸 AR 인증샷 찍기!'; }
  else { btn.disabled=!tot; btn.classList.add('locked'); btn.textContent=tot ? \`🔒 \${tot-cur}명 더 전도하면 해금!\` : '🔒 인원 수를 먼저 선택'; }
}
function injectHomeUserBar(user) {
  const home = document.getElementById('home'); if (!home) return;
  const bar = document.createElement('div');
  bar.style.cssText = 'position:absolute;top:14px;left:0;right:0;z-index:2;display:flex;align-items:center;justify-content:space-between;padding:0 18px;';
  bar.innerHTML = \`<div style="font-size:13px;color:rgba(255,255,255,.6);background:rgba(255,255,255,.08);border-radius:99px;padding:5px 13px;">👤 <span style="color:#FFD700;font-weight:700;">\${user.nickname}</span></div><button onclick="doLogout()" style="font-size:11px;color:rgba(255,255,255,.35);background:transparent;border:1px solid rgba(255,255,255,.15);border-radius:99px;padding:5px 11px;cursor:pointer;">로그아웃</button>\`;
  home.appendChild(bar);
  const colBtn = document.createElement('button');
  colBtn.textContent = '📖 내 도감'; colBtn.onclick = () => location.href = 'collection.html';
  colBtn.style.cssText = 'position:absolute;bottom:56px;right:20px;z-index:1;background:rgba(255,215,0,.12);border:1px solid rgba(255,215,0,.3);color:#FFD700;font-size:12px;border-radius:99px;padding:7px 14px;cursor:pointer;';
  home.appendChild(colBtn);
}

// ── 가챠 ──
function rollCharacter() {
  const pool = state.characters.length > 0 ? state.characters : DEFAULT_CHARS;
  const r = Math.random() * 100; let cum = 0; let grade = 'common';
  for (const [g, w] of Object.entries(GRADE_WEIGHTS)) { cum += w; if (r < cum) { grade = g; break; } }
  const gp = pool.filter(c => c.grade === grade);
  const src = gp.length > 0 ? gp : pool;
  return src[Math.floor(Math.random() * src.length)];
}
function startGacha() {
  const char = rollCharacter(); state.currentChar = char; state.charX = 50; state.charY = 28;
  const card = document.getElementById('gacha-card'); card.className = 'gacha-card ' + char.grade;
  document.getElementById('gacha-badge').textContent = GRADE_LABELS[char.grade];
  document.getElementById('gacha-char-name').textContent = char.name;
  document.getElementById('gacha-char-desc').textContent = char.desc || '';
  const disp = document.getElementById('gacha-char-display');
  disp.innerHTML = char.imgData ? \`<img src="\${char.imgData}" class="gacha-char-img">\` : \`<div class="gacha-char-emoji">\${char.emoji||'✨'}</div>\`;
  card.style.animation='none'; void card.offsetWidth; card.style.animation='';
  spawnParticles(char.grade); showScreen('gacha-screen');
}
function spawnParticles(grade) {
  const colors={common:'#88aacc',rare:'#aa88ff',epic:'#ff9900',legend:'#FFD700'};
  const c=colors[grade]||'#FFD700'; const ct=document.getElementById('particles'); ct.innerHTML='';
  for(let i=0;i<24;i++){const p=document.createElement('div');p.className='particle';p.style.cssText=\`background:\${c};left:50%;top:50%;--tx:\${(Math.random()-.5)*300}px;--ty:\${(Math.random()-.5)*300}px;animation-delay:\${Math.random()*.3}s;animation-duration:\${.8+Math.random()*.6}s;\`;ct.appendChild(p);setTimeout(()=>p.remove(),2000);}
}

// ── 카메라 ──
async function openCamera() { showScreen('ar-screen'); await startCamera(); renderARChar(); setupDrag(); }
async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:'environment'},width:{ideal:1920},height:{ideal:1080}}});
    state.stream=stream; const v=document.getElementById('cam-video'); v.srcObject=stream; await v.play();
  } catch(e) { showModal('카메라 오류','카메라 접근 권한을 허용해주세요.'); showScreen('home'); }
}
function closeCamera() { stopStream(); showScreen('home'); }
function stopStream() { if(state.stream){state.stream.getTracks().forEach(t=>t.stop());state.stream=null;} }
function renderARChar() {
  const char=state.currentChar; if(!char) return;
  const hud=document.getElementById('hud-grade'); hud.className='hud-grade '+char.grade; hud.textContent=GRADE_LABELS[char.grade];
  document.getElementById('ar-grade-ring').className='ar-grade-ring '+char.grade;
  const disp=document.getElementById('ar-char-display');
  disp.innerHTML=char.imgData?\`<img src="\${char.imgData}" class="ar-char-img">\`:\`<div class="ar-char-emoji">\${char.emoji||'✨'}</div>\`;
  document.getElementById('ar-char-nameplate').textContent=char.name;
  const ov=document.getElementById('ar-char-overlay'); ov.style.bottom=state.charY+'%'; ov.style.left=state.charX+'%';
}
function setupDrag() {
  const el=document.getElementById('ar-char-overlay'); let dragging=false,sx,sy,ol,ob;
  const gp=e=>e.touches?{x:e.touches[0].clientX,y:e.touches[0].clientY}:{x:e.clientX,y:e.clientY};
  function onStart(e){dragging=true;el.classList.add('dragging');const p=gp(e);sx=p.x;sy=p.y;const r=el.getBoundingClientRect();ol=r.left+r.width/2;ob=window.innerHeight-r.bottom+r.height/2;}
  function onMove(e){if(!dragging)return;if(e.cancelable)e.preventDefault();const p=gp(e);const nl=ol+(p.x-sx);const nb=ob-(p.y-sy);state.charX=Math.max(10,Math.min(90,nl/window.innerWidth*100));state.charY=Math.max(5,Math.min(80,nb/window.innerHeight*100));el.style.left=state.charX+'%';el.style.bottom=state.charY+'%';}
  function onEnd(){dragging=false;el.classList.remove('dragging');}
  el.addEventListener('mousedown',onStart); el.addEventListener('touchstart',onStart,{passive:true});
  window.addEventListener('mousemove',onMove); window.addEventListener('touchmove',onMove,{passive:false});
  window.addEventListener('mouseup',onEnd); window.addEventListener('touchend',onEnd);
}
function rerollCharacter() { state.currentChar=rollCharacter(); renderARChar(); spawnParticles(state.currentChar.grade); showToast('🎲 '+state.currentChar.name+' 등장!'); }

// ── 사진 ──
async function takePhoto() {
  const flash=document.getElementById('flash'); flash.classList.remove('bang'); void flash.offsetWidth; flash.classList.add('bang');
  setTimeout(async()=>{ await captureAndShow(); if(state.currentChar&&arUser?.id) saveToCollection(state.currentChar); },80);
}
async function captureAndShow() {
  const video=document.getElementById('cam-video'); const char=state.currentChar; const canvas=document.getElementById('result-canvas');
  const W=video.videoWidth||1280; const H=video.videoHeight||720;
  canvas.width=W; canvas.height=H; const ctx=canvas.getContext('2d');
  ctx.drawImage(video,0,0,W,H);
  if(char){
    const cx=state.charX/100*W; const cy=(1-state.charY/100)*H; const sz=Math.min(W,H)*.28;
    await drawChar(ctx,char,cx,cy,sz); drawNameplate(ctx,char,cx,cy,W); drawBadge(ctx,char,W);
  }
  const wSz=Math.max(12,W*.018); ctx.font=wSz+"px sans-serif"; ctx.fillStyle='rgba(255,255,255,.5)'; ctx.textAlign='right'; ctx.textBaseline='bottom'; ctx.fillText('전도 AR 인증샷',W-12,H-10);
  document.getElementById('result-char-name').textContent=char?char.name:'';
  const tag=document.getElementById('result-grade-tag'); tag.className='result-grade-tag '+(char?char.grade:''); tag.textContent=char?GRADE_LABELS[char.grade]:'';
  showScreen('result-screen');
}
async function drawChar(ctx,char,x,y,sz){
  ctx.save(); ctx.shadowColor='rgba(255,215,0,.8)'; ctx.shadowBlur=30;
  if(char.imgData){const img=new Image();img.src=char.imgData;await new Promise(r=>{img.onload=r;img.onerror=r;});ctx.drawImage(img,x-sz/2,y-sz,sz,sz);}
  else{ctx.font=(sz*.85)+'px serif';ctx.textAlign='center';ctx.textBaseline='bottom';ctx.fillText(char.emoji||'✨',x,y);}
  ctx.restore();
}
function drawNameplate(ctx,char,x,y,W){
  const ny=y+14; const fs=Math.max(16,W*.022); const pad=14;
  ctx.font='bold '+fs+"px sans-serif"; ctx.textAlign='center'; ctx.textBaseline='middle';
  const nw=ctx.measureText(char.name).width+pad*2; const by=ny-fs*.8; const bh=fs*1.6;
  ctx.fillStyle='rgba(0,0,0,.65)'; rr(ctx,x-nw/2,by,nw,bh,fs*.8); ctx.fill();
  ctx.strokeStyle='rgba(255,215,0,.5)'; ctx.lineWidth=1.5; rr(ctx,x-nw/2,by,nw,bh,fs*.8); ctx.stroke();
  ctx.fillStyle='#FFD700'; ctx.fillText(char.name,x,ny);
}
function drawBadge(ctx,char,W){
  const gc={common:'#88aacc',rare:'#aa88ff',epic:'#ff9900',legend:'#FFD700'};
  const txt=GRADE_LABELS[char.grade]||''; const fs=Math.max(12,W*.016);
  ctx.font='bold '+fs+'px sans-serif'; const bw=ctx.measureText(txt).width+20; const bx=W-bw-16; const by=16;
  ctx.fillStyle='rgba(0,0,0,.55)'; rr(ctx,bx,by,bw,fs*1.8,fs*.9); ctx.fill();
  ctx.strokeStyle=gc[char.grade]||'#FFD700'; ctx.lineWidth=1.5; rr(ctx,bx,by,bw,fs*1.8,fs*.9); ctx.stroke();
  ctx.fillStyle=gc[char.grade]||'#FFD700'; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText(txt,bx+bw/2,by+fs*.9);
}
function rr(ctx,x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.lineTo(x+w-r,y);ctx.quadraticCurveTo(x+w,y,x+w,y+r);ctx.lineTo(x+w,y+h-r);ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h);ctx.lineTo(x+r,y+h);ctx.quadraticCurveTo(x,y+h,x,y+h-r);ctx.lineTo(x,y+r);ctx.quadraticCurveTo(x,y,x+r,y);ctx.closePath();}
function savePhoto(){const c=document.getElementById('result-canvas');const l=document.createElement('a');l.download='전도인증샷_'+Date.now()+'.png';l.href=c.toDataURL('image/png');l.click();showToast('📸 사진이 저장되었습니다!');}
function retakePhoto(){showScreen('ar-screen');if(!state.stream)startCamera().then(()=>{renderARChar();setupDrag();});}
function goHome(){stopStream();showScreen('home');updateHomeUI();}

// ── 캐릭터 관리 ──
let pendingImgData=null;
function previewImg(input){const file=input.files[0];if(!file)return;const r=new FileReader();r.onload=e=>{pendingImgData=e.target.result;const p=document.getElementById('img-preview-el');p.src=pendingImgData;p.style.display='block';};r.readAsDataURL(file);}
function addCharacter(){
  const name=document.getElementById('char-name-input').value.trim();
  const grade=document.getElementById('char-grade-select').value;
  const emoji=document.getElementById('char-emoji-input').value.trim();
  if(!name){showToast('캐릭터 이름을 입력하세요');return;}
  if(!pendingImgData&&!emoji){showToast('이미지 또는 이모지를 입력하세요');return;}
  const dm={legend:'전설의 캐릭터',epic:'강력한 캐릭터',rare:'희귀 캐릭터',common:'일반 캐릭터'};
  state.characters.push({id:'c'+Date.now(),name,grade,imgData:pendingImgData||null,emoji:emoji||null,desc:dm[grade]});
  saveState(); resetCharForm(); renderCharList(); showToast('✅ '+name+' 추가됨!');
}
function resetCharForm(){document.getElementById('char-name-input').value='';document.getElementById('char-emoji-input').value='';document.getElementById('img-preview-el').style.display='none';document.getElementById('char-file-input').value='';pendingImgData=null;}
function deleteCharacter(id){state.characters=state.characters.filter(c=>c.id!==id);saveState();renderCharList();}
function renderCharList(){
  const list=document.getElementById('char-list'); const chars=state.characters;
  if(!chars.length){list.innerHTML='<div class="no-chars">등록된 캐릭터가 없습니다.<br>기본 캐릭터(이모지)가 사용됩니다.</div>';return;}
  list.innerHTML=chars.map(c=>\`<div class="char-item">\${c.imgData?\`<img src="\${c.imgData}" class="char-item-img">\`:\`<div class="char-item-emoji">\${c.emoji||'✨'}</div>\`}<div class="char-item-info"><div class="char-item-name">\${c.name}</div><div class="char-item-grade \${c.grade}">\${GRADE_LABELS[c.grade]}</div></div><div class="char-item-prob">\${GRADE_WEIGHTS[c.grade]}%</div><button class="char-item-del" onclick="deleteCharacter('\${c.id}')">삭제</button></div>\`).join('');
}

// ── Supabase / 인증 ──
const SUPA_URL='https://ouugfofqiefrbfshgeep.supabase.co';
const SUPA_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im91dWdmb2ZxaWVmcmJmc2hnZWVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxNzgyODUsImV4cCI6MjA5NDc1NDI4NX0.5wlvTtlLPPQ8C5JF8dwzB1Rgo2rGf1oniF9wasZLi6g';
const sb=supabase.createClient(SUPA_URL,SUPA_KEY);
let arUser=null;
try{arUser=JSON.parse(localStorage.getItem('ar_user')||'null');}catch(e){}
if(!arUser?.id) location.replace('login.html');
function doLogout(){localStorage.removeItem('ar_user');location.replace('login.html');}
async function saveToCollection(char){
  try{
    const{data:ex}=await sb.from('collections').select('id,count').eq('user_id',arUser.id).eq('character_id',char.id).maybeSingle();
    if(ex){await sb.from('collections').update({count:ex.count+1,last_obtained_at:new Date().toISOString()}).eq('id',ex.id);showToast('📖 '+char.name+' +1 ('+(ex.count+1)+'번째 획득!)');}
    else{await sb.from('collections').insert({user_id:arUser.id,character_id:char.id,character_name:char.name,grade:char.grade,emoji:char.emoji||null,count:1,first_obtained_at:new Date().toISOString(),last_obtained_at:new Date().toISOString()});showToast('✨ 새 캐릭터 도감 등록! ['+char.name+']');}
    await sb.from('gacha_logs').insert({user_id:arUser.id,character_id:char.id,character_name:char.name,grade:char.grade});
  }catch(e){console.error('도감 저장 실패',e);}
}

// ── 초기화 ──
loadState(); updateHomeUI();
if(state.members>0) document.querySelectorAll('.mbtn').forEach((b,i)=>b.classList.toggle('selected',i===state.members-1));
window.addEventListener('DOMContentLoaded',()=>{ if(arUser) injectHomeUserBar(arUser); });
</script>
</body>
</html>`;

export default {
  async fetch(request) {
    const url = new URL(request.url);

    // 모든 경로에서 index.html 반환 (SPA 방식)
    return new Response(HTML, {
      headers: {
        'Content-Type': 'text/html;charset=UTF-8',
        'Cache-Control': 'no-cache',
      },
    });
  },
};
