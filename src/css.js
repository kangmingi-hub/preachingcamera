export const CSS = `
:root{--gold:#FFD700;--gold2:#FFA500;--common-c:#88aacc;--rare-c:#aa88ff;--epic-c:#ff9900;--legend-c:#FFD700}
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
.member-box{background:rgba(255,255,255,.06);border:1px solid rgba(255,215,0,.25);border-radius:20px;padding:14px 18px;width:min(320px,88vw);z-index:1;margin-bottom:10px}.member-box h3{font-size:12px;color:var(--gold);letter-spacing:.5px;margin-bottom:12px}
.member-btns{display:flex;gap:8px;justify-content:center}
.mbtn{flex:1;padding:10px 0;border-radius:12px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.15);color:rgba(255,255,255,.7);font-size:14px;cursor:pointer;transition:all .2s;font-family:'Noto Sans KR',sans-serif}
.mbtn.selected{background:rgba(255,215,0,.15);border-color:var(--gold);color:var(--gold);font-weight:700}
.member-goal{text-align:center;font-size:12px;color:rgba(255,255,255,.45);margin-top:10px}
.member-goal span{color:var(--gold);font-weight:700;font-size:15px}
.prog-wrap{background:rgba(255,255,255,.06);border:1px solid rgba(255,215,0,.2);border-radius:20px;padding:14px 18px;width:min(320px,88vw);z-index:1;margin-bottom:12px}.prog-top{display:flex;justify-content:space-between;font-size:12px;color:var(--gold);margin-bottom:8px}
.prog-bg{background:rgba(255,255,255,.1);border-radius:99px;height:12px;overflow:hidden}
.prog-fill{height:100%;border-radius:99px;background:linear-gradient(90deg,var(--gold2),var(--gold));box-shadow:0 0 10px rgba(255,215,0,.5);transition:width .7s cubic-bezier(.34,1.56,.64,1);position:relative;overflow:hidden}
.prog-fill::after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.3),transparent);animation:shimmer 2s infinite}
@keyframes shimmer{0%{transform:translateX(-100%)}100%{transform:translateX(200%)}}
.prog-nums{display:flex;align-items:baseline;gap:4px;margin-top:8px}
.prog-nums .cur{font-size:28px;font-family:'Black Han Sans',sans-serif;color:var(--gold)}
.prog-nums .sep{color:rgba(255,255,255,.3)}
.prog-nums .tot{font-size:16px;color:rgba(255,255,255,.5)}
.count-row{display:flex;gap:12px;z-index:1;margin-bottom:12px}.count-btn{width:52px;height:52px;border-radius:50%;font-size:22px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.2);color:white;cursor:pointer;transition:all .15s}
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
.gacha-char-img{width:88%;aspect-ratio:1;object-fit:contain;filter:drop-shadow(0 0 20px rgba(255,255,255,.4));animation:pulse-glow 2s ease-in-out infinite;display:block;margin:0 auto;}@keyframes pulse-glow{0%,100%{filter:drop-shadow(0 0 10px rgba(255,215,0,.4))}50%{filter:drop-shadow(0 0 30px rgba(255,215,0,.8))}}
.gacha-char-name{font-family:'Black Han Sans',sans-serif;font-size:18px;color:white;margin-top:10px;text-align:center;padding:0 16px}
.gacha-char-desc{font-size:11px;color:rgba(255,255,255,.55);margin-top:4px;text-align:center;padding:0 14px;line-height:1.5}
.particles{position:absolute;inset:0;pointer-events:none;overflow:hidden;z-index:1}
.particle{position:absolute;width:6px;height:6px;border-radius:50%;animation:particle-fly 1.2s ease-out forwards}
@keyframes particle-fly{from{transform:translate(0,0) scale(1);opacity:1}to{transform:translate(var(--tx),var(--ty)) scale(0);opacity:0}}
.gacha-btns{display:flex;gap:12px;margin-top:22px;z-index:2}
.btn-goto-cam{background:linear-gradient(135deg,var(--gold2),var(--gold));color:#1a0800;font-family:'Black Han Sans',sans-serif;font-size:16px;border:none;border-radius:99px;padding:12px 28px;cursor:pointer;box-shadow:0 4px 20px rgba(255,165,0,.4)}
.btn-skip{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.2);color:rgba(255,255,255,.6);font-size:14px;border-radius:99px;padding:12px 20px;cursor:pointer}
#ar-screen{background:#000}
#cam-video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transform:scaleX(-1);}
.ar-char-overlay{position:absolute;bottom:28%;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;pointer-events:all;z-index:10;animation:ar-float 2.5s ease-in-out infinite;transition:all .3s}@keyframes ar-float{0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(-14px)}}
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
@media (orientation:landscape){.ar-bottom{top:0;bottom:0;left:auto;right:0;width:100px;flex-direction:column;justify-content:center;padding:20px 16px;background:linear-gradient(to left,rgba(0,0,0,.75),transparent);}}.ar-tip{font-size:11px;color:rgba(255,255,255,.6);max-width:100px;line-height:1.5}
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
`;
