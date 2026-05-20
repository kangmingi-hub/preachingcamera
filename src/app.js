// ── 상수 ──
const GRADE_WEIGHTS = { common:60, rare:25, epic:10, legend:5 };
const GRADE_LABELS  = { common:'⭐ COMMON', rare:'⭐⭐ RARE', epic:'⭐⭐⭐ EPIC', legend:'🌟 LEGEND' };
const GITHUB_IMG = 'https://raw.githubusercontent.com/kangmingi-hub/preachingcamera/main/images/';

const DEFAULT_CHARS = [
  { id:'c001', name:'가룟 유다',     grade:'common' },
  { id:'c002', name:'가이사',        grade:'common' },
  { id:'c003', name:'가인',          grade:'common' },
  { id:'c004', name:'아벨',          grade:'common' },
  { id:'c005', name:'갈렙',          grade:'common' },
  { id:'c006', name:'고넬료',        grade:'rare'   },
  { id:'c007', name:'고레스',        grade:'rare'   },
  { id:'c008', name:'기드온',        grade:'rare'   },
  { id:'c009', name:'노아',          grade:'epic'   },
  { id:'c010', name:'누가',          grade:'rare'   },
  { id:'c011', name:'느부갓네살',    grade:'rare'   },
  { id:'c012', name:'다니엘',        grade:'epic'   },
  { id:'c013', name:'다윗',          grade:'legend' },
  { id:'c014', name:'도마',          grade:'common' },
  { id:'c015', name:'드보라',        grade:'epic'   },
  { id:'c016', name:'라합',          grade:'rare'   },
  { id:'c017', name:'르호보암',      grade:'common' },
  { id:'c018', name:'마리아',        grade:'epic'   },
  { id:'c019', name:'마르다',        grade:'common' },
  { id:'c020', name:'마태',          grade:'rare'   },
  { id:'c021', name:'멜기세덱',      grade:'legend' },
  { id:'c022', name:'모세',          grade:'legend' },
  { id:'c023', name:'예수',          grade:'legend' },
  { id:'c024', name:'바나바',        grade:'rare'   },
  { id:'c025', name:'바로',          grade:'common' },
  { id:'c026', name:'바울',          grade:'legend' },
  { id:'c027', name:'벨사살',        grade:'common' },
  { id:'c028', name:'비느하스',      grade:'rare'   },
  { id:'c029', name:'사라',          grade:'epic'   },
  { id:'c030', name:'사울',          grade:'common' },
  { id:'c031', name:'솔로몬',        grade:'epic'   },
  { id:'c032', name:'스데반',        grade:'epic'   },
  { id:'c033', name:'아담',          grade:'epic'   },
  { id:'c034', name:'아론',          grade:'rare'   },
  { id:'c035', name:'아브라함',      grade:'legend' },
  { id:'c036', name:'아합',          grade:'common' },
  { id:'c037', name:'이세벨',        grade:'common' },
  { id:'c038', name:'야고보',        grade:'rare'   },
  { id:'c039', name:'야곱',          grade:'epic'   },
  { id:'c040', name:'에녹',          grade:'legend' },
  { id:'c041', name:'에스더',        grade:'epic'   },
  { id:'c042', name:'엘리사',        grade:'epic'   },
  { id:'c043', name:'엘리야',        grade:'legend' },
  { id:'c044', name:'여호사밧',      grade:'rare'   },
  { id:'c045', name:'여호수아',      grade:'epic'   },
  { id:'c046', name:'예레미야',      grade:'epic'   },
  { id:'c047', name:'요나',          grade:'rare'   },
  { id:'c048', name:'요셉',          grade:'epic'   },
  { id:'c049', name:'요시야',        grade:'rare'   },
  { id:'c050', name:'요한',          grade:'epic'   },
  { id:'c051', name:'유다',          grade:'rare'   },
  { id:'c052', name:'이삭',          grade:'epic'   },
  { id:'c053', name:'세례 요한',     grade:'epic'   },
  { id:'c054', name:'하갈',          grade:'common' },
  { id:'c055', name:'하와',          grade:'epic'   },
  { id:'c056', name:'헤롯',          grade:'common' },
  { id:'c057', name:'히스기야',      grade:'epic'   },
  { id:'c058', name:'니고데모',      grade:'rare'   },
  { id:'c059', name:'디도',          grade:'rare'   },
  { id:'c060', name:'디모데',        grade:'rare'   },
  { id:'c061', name:'마가',          grade:'rare'   },
  { id:'c062', name:'베드로',        grade:'legend' },
  { id:'c063', name:'뵈뵈',          grade:'rare'   },
  { id:'c064', name:'빌레몬',        grade:'common' },
  { id:'c065', name:'사가랴',        grade:'rare'   },
  { id:'c066', name:'사마리아 여인', grade:'rare'   },
  { id:'c067', name:'삭개오',        grade:'rare'   },
  { id:'c068', name:'안나',          grade:'rare'   },
  { id:'c069', name:'아볼로',        grade:'rare'   },
  { id:'c070', name:'안드레',        grade:'rare'   },
  { id:'c071', name:'엘리사벳',      grade:'rare'   },
  { id:'c072', name:'나사로',        grade:'epic'   },
  { id:'c073', name:'느헤미야',      grade:'epic'   },
  { id:'c074', name:'룻',            grade:'epic'   },
  { id:'c075', name:'사무엘',        grade:'epic'   },
  { id:'c076', name:'삼손',          grade:'epic'   },
  { id:'c077', name:'욥',            grade:'epic'   },
  { id:'c078', name:'가브리엘',      grade:'legend' },
  { id:'c079', name:'한나',          grade:'epic'   },
  { id:'c080', name:'롯',            grade:'common' },
  { id:'c081', name:'리브가',        grade:'rare'   },
  { id:'c082', name:'레아',          grade:'common' },
  { id:'c083', name:'라헬',          grade:'rare'   },
  { id:'c084', name:'에서',          grade:'common' },
  { id:'c085', name:'미리암',        grade:'rare'   },
  { id:'c086', name:'입다',          grade:'common' },
  { id:'c087', name:'나단',          grade:'rare'   },
  { id:'c088', name:'엘가나',        grade:'common' },
  { id:'c089', name:'이사야',        grade:'legend' },
  { id:'c090', name:'호세아',        grade:'epic'   },
  { id:'c091', name:'모르드개',      grade:'epic'   },
  { id:'c092', name:'에스라',        grade:'epic'   },
  { id:'c093', name:'빌라도',        grade:'common' },
  { id:'c094', name:'실라',          grade:'rare'   },
  { id:'c095', name:'루디아',        grade:'rare'   },
  { id:'c096', name:'브리스길라',    grade:'rare'   },
  { id:'c097', name:'아굴라',        grade:'rare'   },
  { id:'c098', name:'빌립',          grade:'rare'   },
  { id:'c099', name:'막달라 마리아', grade:'epic'   },
  { id:'c100', name:'요셉',          grade:'epic'   },
];

// ── 상태 ──
const state = {
  members:0, goal:0, count:0, characters:[],
  currentChar:null, stream:null, charX:50, charY:28,
  partners:[], facingMode:'user',
};

// ── 저장/불러오기 ──
function loadState() {
  try {
    const s = JSON.parse(localStorage.getItem('eva_state') || '{}');
    state.members = s.members||0; state.goal = s.goal||0;
    state.count = s.count||0; state.characters = s.characters||[...DEFAULT_CHARS];
    state.partners = s.partners||[];
  } catch(e) { state.characters = [...DEFAULT_CHARS]; }
}
function saveState() {
  localStorage.setItem('eva_state', JSON.stringify({
    members:state.members, goal:state.goal, count:state.count,
    characters:state.characters, partners:state.partners,
  }));
}

// ── 유틸 ──
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  if (id === 'char-screen') renderCharList();
}
function showToast(msg) {
  const old = document.querySelector('.toast'); if (old) old.remove();
  const el = document.createElement('div'); el.className='toast'; el.textContent=msg;
  document.body.appendChild(el); setTimeout(()=>el.remove(), 2600);
}
function showModal(title, msg, showCancel=false, onOk=null) {
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-msg').textContent = msg;
  const cb = document.getElementById('modal-cancel'); cb.style.display = showCancel?'':'none';
  document.getElementById('modal').classList.add('open');
  document.getElementById('modal-ok').onclick = () => { document.getElementById('modal').classList.remove('open'); if(onOk) onOk(); };
  cb.onclick = () => document.getElementById('modal').classList.remove('open');
}

// ── 전도짝 ──
function confirmTeam() {
  const p1 = document.getElementById('partner-1').value.trim();
  const p2 = document.getElementById('partner-2').value.trim();
  const p3 = document.getElementById('partner-3').value.trim();
  if (!p1) { showToast('팀원 1 이름을 입력하세요'); return; }
  state.partners = [p1, p2, p3].filter(Boolean);
  state.members = state.partners.length + 1;
  state.goal = state.members * 10;
  saveState();
  showScreen('home');
  updateHomeUI();
}

// ── 홈 ──
function addCount(d) {
  if (!state.goal) { showToast('전도짝을 먼저 입력하세요!'); return; }
  state.count = Math.max(0, state.count + d); saveState(); updateHomeUI();
}
function updateHomeUI() {
  const cur=state.count, tot=state.goal;
  const pct=tot>0?Math.min(100,Math.round(cur/tot*100)):0;
  const done=tot>0&&cur>=tot;
  document.getElementById('prog-cur').textContent=cur;
  document.getElementById('prog-tot').textContent=tot||'-';
  document.getElementById('prog-fill').style.width=pct+'%';
  document.getElementById('prog-label-pct').textContent=pct+'%';
  document.getElementById('goal-display').textContent=tot||'-';
  const names = document.getElementById('team-names');
  if (names && arUser) {
    const all = [arUser.nickname, ...state.partners];
    names.textContent = all.join(', ');
  }
  const btn=document.getElementById('ar-btn');
  if(done){btn.disabled=false;btn.classList.remove('locked');btn.textContent='📸 AR 인증샷 찍기!';
    } else{
       btn.disabled=true;
       btn.classList.add('locked');
       btn.textContent=tot?`🔒 ${tot-cur}명 더 전도하면 해금!`:'🔒 전도짝을 먼저 입력하세요';
  }
}
function injectHomeUserBar(user) {
  const home=document.getElementById('home'); if(!home) return;
  const bar=document.createElement('div');
  bar.style.cssText='position:absolute;top:14px;left:0;right:0;z-index:2;display:flex;align-items:center;justify-content:space-between;padding:0 18px;';
  bar.innerHTML=`<div style="font-size:13px;color:rgba(255,255,255,.6);background:rgba(255,255,255,.08);border-radius:99px;padding:5px 13px;">👤 <span style="color:#FFD700;font-weight:700;">${user.nickname}</span></div>
  <button onclick="showChangePw()" style="font-size:11px;color:rgba(255,255,255,.35);background:transparent;border:1px solid rgba(255,255,255,.15);border-radius:99px;padding:5px 11px;cursor:pointer;">🔑 비밀번호변경</button>
  <button onclick="doLogout()" style="font-size:11px;color:rgba(255,255,255,.35);background:transparent;border:1px solid rgba(255,255,255,.15);border-radius:99px;padding:5px 11px;cursor:pointer;">로그아웃</button>`;
  home.appendChild(bar);
  const colBtn=document.createElement('button');
  colBtn.textContent='📖 내 도감'; colBtn.onclick=()=>location.href='/collection';
colBtn.style.cssText='position:absolute;bottom:90px;right:20px;z-index:1;background:rgba(255,215,0,.12);border:1px solid rgba(255,215,0,.3);color:#FFD700;font-size:12px;border-radius:99px;padding:7px 14px;cursor:pointer;';  home.appendChild(colBtn);
}

function showChangePw(){
  const newPw=prompt('새 비밀번호 입력 (4자 이상)');
  if(!newPw||newPw.length<4){showToast('4자 이상 입력하세요');return;}
  sb.from('users').update({password:newPw}).eq('id',arUser.id)
    .then(({error})=>{
      if(error){showToast('❌ 변경 실패');return;}
      showToast('✅ 비밀번호 변경됐어요!');
    });
}

// ── 가챠 ──
function rollCharacter() {
  const pool=DEFAULT_CHARS;
  // 목표 초과 인원 10명당 epic+1%, legend+0.5%
  const extra=Math.max(0, state.count - state.goal);
  const bonusSteps=Math.floor(extra/10);
  const epicBonus=bonusSteps*1;
  const legendBonus=bonusSteps*0.5;
  const weights={
    common: Math.max(0, GRADE_WEIGHTS.common - epicBonus - legendBonus),
    rare:   GRADE_WEIGHTS.rare,
    epic:   GRADE_WEIGHTS.epic + epicBonus,
    legend: GRADE_WEIGHTS.legend + legendBonus,
  };
  const total=Object.values(weights).reduce((a,b)=>a+b,0);
  const r=Math.random()*total; let cum=0; let grade='common';
  for(const [g,w] of Object.entries(weights)){cum+=w;if(r<cum){grade=g;break;}}
  const gp=pool.filter(c=>c.grade===grade); const src=gp.length>0?gp:pool;
  return src[Math.floor(Math.random()*src.length)];
}
function startGacha() {
  const char=rollCharacter(); state.currentChar=char; state.charX=50; state.charY=28;
  const card=document.getElementById('gacha-card'); card.className='gacha-card '+char.grade;
  document.getElementById('gacha-badge').textContent=GRADE_LABELS[char.grade];
  document.getElementById('gacha-char-name').textContent=char.name;
  document.getElementById('gacha-char-desc').textContent=char.desc||'';
  const disp=document.getElementById('gacha-char-display');
disp.innerHTML=`<img src="${GITHUB_IMG+char.id+'.png'}" class="gacha-char-img" onerror="this.style.display='none'">`;  card.style.animation='none'; void card.offsetWidth; card.style.animation='';
  spawnParticles(char.grade); showScreen('gacha-screen');
}
function spawnParticles(grade) {
  const colors={common:'#88aacc',rare:'#aa88ff',epic:'#ff9900',legend:'#FFD700'};
  const c=colors[grade]||'#FFD700'; const ct=document.getElementById('particles'); ct.innerHTML='';
  for(let i=0;i<24;i++){
    const p=document.createElement('div'); p.className='particle';
    p.style.cssText=`background:${c};left:50%;top:50%;--tx:${(Math.random()-.5)*300}px;--ty:${(Math.random()-.5)*300}px;animation-delay:${Math.random()*.3}s;animation-duration:${.8+Math.random()*.6}s;`;
    ct.appendChild(p); setTimeout(()=>p.remove(),2000);
  }
}

// ── 카메라 ──
async function openCamera() { showScreen('ar-screen'); await startCamera(); renderARChar(); setupDrag(); }
async function startCamera() {
  try {
    if(state.stream) stopStream();
    const stream=await navigator.mediaDevices.getUserMedia({
      video:{ facingMode:state.facingMode, width:{ideal:1920}, height:{ideal:1080} }
    });
    state.stream=stream; const v=document.getElementById('cam-video'); v.srcObject=stream; await v.play();
  } catch(e) { showModal('카메라 오류','카메라 접근 권한을 허용해주세요.'); showScreen('home'); }
}
function flipCamera() {
  state.facingMode = state.facingMode==='user' ? 'environment' : 'user';
  startCamera();
}
function closeCamera() { stopStream(); showScreen('home'); }
function stopStream() { if(state.stream){state.stream.getTracks().forEach(t=>t.stop());state.stream=null;} }
function renderARChar() {
  const char=state.currentChar; if(!char) return;
  const hud=document.getElementById('hud-grade'); hud.className='hud-grade '+char.grade; hud.textContent=GRADE_LABELS[char.grade];
  document.getElementById('ar-grade-ring').className='ar-grade-ring '+char.grade;
  const disp=document.getElementById('ar-char-display');
disp.innerHTML=`<img src="${GITHUB_IMG+char.id+'.png'}" class="ar-char-img" onerror="this.style.display='none'">`;  document.getElementById('ar-char-nameplate').textContent=char.name;
  const ov=document.getElementById('ar-char-overlay'); ov.style.bottom=state.charY+'%'; ov.style.left=state.charX+'%';
}
function setupDrag() {
  const el=document.getElementById('ar-char-overlay'); let dragging=false,sx,sy,ol,ob;
  const gp=e=>e.touches?{x:e.touches[0].clientX,y:e.touches[0].clientY}:{x:e.clientX,y:e.clientY};
  function onStart(e){dragging=true;el.classList.add('dragging');const p=gp(e);sx=p.x;sy=p.y;const r=el.getBoundingClientRect();ol=r.left+r.width/2;ob=window.innerHeight-r.bottom+r.height/2;}
  function onMove(e){if(!dragging)return;if(e.cancelable)e.preventDefault();const p=gp(e);state.charX=Math.max(10,Math.min(90,(ol+(p.x-sx))/window.innerWidth*100));state.charY=Math.max(5,Math.min(80,(ob-(p.y-sy))/window.innerHeight*100));el.style.left=state.charX+'%';el.style.bottom=state.charY+'%';}
  function onEnd(){dragging=false;el.classList.remove('dragging');}
  el.addEventListener('mousedown',onStart); el.addEventListener('touchstart',onStart,{passive:true});
  window.addEventListener('mousemove',onMove); window.addEventListener('touchmove',onMove,{passive:false});
  window.addEventListener('mouseup',onEnd); window.addEventListener('touchend',onEnd);
}
function rerollCharacter() { state.currentChar=rollCharacter(); renderARChar(); spawnParticles(state.currentChar.grade); showToast('🎲 '+state.currentChar.name+' 등장!'); }

// ── 사진 ──
async function takePhoto() {
  const flash=document.getElementById('flash'); flash.classList.remove('bang'); void flash.offsetWidth; flash.classList.add('bang');
  setTimeout(async()=>{ 
    await captureAndShow(); 
    if(state.currentChar&&arUser?.id) saveToCollection(state.currentChar);
    // 인증샷 찍으면 카운트 초기화
    state.count=0;
    saveState();
  },80);
}

async function captureAndShow() {
  try {  // ← 추가
    const video=document.getElementById('cam-video'),char=state.currentChar,canvas=document.getElementById('result-canvas');
    const W=video.videoWidth||1280,H=video.videoHeight||720;
    canvas.width=W; canvas.height=H; const ctx=canvas.getContext('2d');
   ctx.save();
    ctx.translate(W, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, W, H);
    ctx.restore();
if(char){
  const cx=state.charX/100*W,cy=(1-state.charY/100)*H;
  const sz=Math.min(W,H)*.28;
  await drawChar(ctx,char,cx,cy,sz);
  drawNameplate(ctx,char,cx,cy,W);
  drawBadge(ctx,char,W);
}    const wSz=Math.max(12,W*.018); ctx.font=wSz+'px sans-serif'; ctx.fillStyle='rgba(255,255,255,.5)'; ctx.textAlign='right'; ctx.textBaseline='bottom'; ctx.fillText('전도 AR 인증샷',W-12,H-10);
    document.getElementById('result-char-name').textContent=char?char.name:'';
    const tag=document.getElementById('result-grade-tag'); tag.className='result-grade-tag '+(char?char.grade:''); tag.textContent=char?GRADE_LABELS[char.grade]:'';
    showScreen('result-screen');
  } catch(e) {  // ← 추가
    showToast('오류 발생: '+e); // 어떤 오류인지 토스트로 보여줌
  }
}

// ✅ 수정된 drawChar 전체

async function drawChar(ctx,char,x,y,sz){
  ctx.save(); ctx.shadowColor='rgba(255,215,0,.8)'; ctx.shadowBlur=30;
  const imgUrl = GITHUB_IMG + char.id + '.png';
  try{
    const img=new Image(); img.crossOrigin='anonymous'; img.src=imgUrl;
    // 타임아웃 3초 추가
    await Promise.race([
      new Promise((r,j)=>{ img.onload=r; img.onerror=j; }),
      new Promise((_,j)=>setTimeout(()=>j('timeout'),3000))
    ]);
const ratio=img.naturalWidth/img.naturalHeight||1;
const dw=sz,dh=sz/ratio;
ctx.drawImage(img,x-dw/2,y-dh,dw,dh);  }catch(e){
    // 실패하면 텍스트로 대체
    ctx.font=(sz*.5)+'px sans-serif'; ctx.textAlign='center'; ctx.textBaseline='middle';
    ctx.fillStyle='rgba(255,255,255,.3)'; ctx.fillText('👤',x,y-sz/2);
  }
  ctx.restore();
}

function drawNameplate(ctx,char,x,y,W){
  const ny=y+14,fs=Math.max(16,W*.022),pad=14;
  ctx.font='bold '+fs+'px sans-serif'; ctx.textAlign='center'; ctx.textBaseline='middle';
  const nw=ctx.measureText(char.name).width+pad*2,by=ny-fs*.8,bh=fs*1.6;
  ctx.fillStyle='rgba(0,0,0,.65)'; rr(ctx,x-nw/2,by,nw,bh,fs*.8); ctx.fill();
  ctx.strokeStyle='rgba(255,215,0,.5)'; ctx.lineWidth=1.5; rr(ctx,x-nw/2,by,nw,bh,fs*.8); ctx.stroke();
  ctx.fillStyle='#FFD700'; ctx.fillText(char.name,x,ny);
}
function drawBadge(ctx,char,W){
  const gc={common:'#88aacc',rare:'#aa88ff',epic:'#ff9900',legend:'#FFD700'};
  const txt=GRADE_LABELS[char.grade]||'',fs=Math.max(12,W*.016);
  ctx.font='bold '+fs+'px sans-serif'; const bw=ctx.measureText(txt).width+20,bx=W-bw-16,by=16;
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
async function addCharacter(){
  const name=document.getElementById('char-name-input').value.trim();
  const grade=document.getElementById('char-grade-select').value;
  const emoji=document.getElementById('char-emoji-input').value.trim();
  if(!name){showToast('캐릭터 이름을 입력하세요');return;}
  if(!pendingImgData&&!emoji){showToast('이미지 또는 이모지를 입력하세요');return;}
  const dm={legend:'전설의 캐릭터',epic:'강력한 캐릭터',rare:'희귀 캐릭터',common:'일반 캐릭터'};
  const newChar={id:'c'+Date.now(),name,grade,imgData:pendingImgData||null,emoji:emoji||null,desc:dm[grade]};

  // Supabase에 저장
  const{error}=await sb.from('characters').insert({
    id:newChar.id, name:newChar.name, grade:newChar.grade,
    emoji:newChar.emoji||null, img_data:newChar.imgData||null, description:newChar.desc
  });
  if(error){showToast('❌ 저장 실패: '+error.message);return;}

  // 로컬 상태에도 반영
  state.characters.push(newChar);
  saveState(); resetCharForm(); renderCharList(); showToast('✅ '+name+' 추가됨!');
}
function resetCharForm(){document.getElementById('char-name-input').value='';document.getElementById('char-emoji-input').value='';document.getElementById('img-preview-el').style.display='none';document.getElementById('char-file-input').value='';pendingImgData=null;}
async function deleteCharacter(id){
  await sb.from('characters').delete().eq('id',id);
  state.characters=state.characters.filter(c=>c.id!==id);
  saveState(); renderCharList();
}
function renderCharList(){
  const list=document.getElementById('char-list'),chars=state.characters;
  if(!chars.length){list.innerHTML='<div class="no-chars">등록된 캐릭터가 없습니다.<br>기본 캐릭터(이모지)가 사용됩니다.</div>';return;}
  list.innerHTML=chars.map(c=>`<div class="char-item">${c.imgData?`<img src="${c.imgData}" class="char-item-img">`:`<div class="char-item-emoji">${c.emoji||'✨'}</div>`}<div class="char-item-info"><div class="char-item-name">${c.name}</div><div class="char-item-grade ${c.grade}">${GRADE_LABELS[c.grade]}</div></div><div class="char-item-prob">${GRADE_WEIGHTS[c.grade]}%</div><button class="char-item-del" onclick="deleteCharacter('${c.id}')">삭제</button></div>`).join('');
}

// ── Supabase / 인증 ──
const SUPA_URL='https://ouugfofqiefrbfshgeep.supabase.co';
const SUPA_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im91dWdmb2ZxaWVmcmJmc2hnZWVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxNzgyODUsImV4cCI6MjA5NDc1NDI4NX0.5wlvTtlLPPQ8C5JF8dwzB1Rgo2rGf1oniF9wasZLi6g';
const sb=supabase.createClient(SUPA_URL,SUPA_KEY);
let arUser=null;
try{arUser=JSON.parse(localStorage.getItem('ar_user')||'null');}catch(e){}
if(!arUser?.id) location.replace('/login');

function doLogout(){localStorage.removeItem('ar_user');localStorage.removeItem('eva_state');location.replace('/login');}

async function saveToCollection(char){
  try{
    // 팀원 닉네임으로 user_id 조회
    const partnerNames = state.partners;
    let partnerIds = [];
    if(partnerNames.length > 0){
      const{data:users}=await sb.from('users').select('id,nickname').in('nickname',partnerNames);
      if(users) partnerIds = users.map(u=>({id:u.id,nickname:u.nickname}));
    }
    // 본인 + 팀원 전체 대상
    const targets=[{id:arUser.id,nickname:arUser.nickname},...partnerIds];

    for(const user of targets){
      const{data:ex}=await sb.from('collections').select('id,count').eq('user_id',user.id).eq('character_id',char.id).maybeSingle();
      if(ex){
        await sb.from('collections').update({count:ex.count+1,last_obtained_at:new Date().toISOString()}).eq('id',ex.id);
      } else {
      await sb.from('collections').insert({
  user_id:user.id, nickname:user.nickname,
  character_id:char.id, character_name:char.name,
  grade:char.grade, emoji:char.emoji||null, count:1,
  first_obtained_at:new Date().toISOString(),
  last_obtained_at:new Date().toISOString()
});
      }
      await sb.from('gacha_logs').insert({user_id:user.id,character_id:char.id,character_name:char.name,grade:char.grade});
    }
    showToast(`✨ ${targets.length}명 도감 저장! [${char.name}]`);
  }catch(e){console.error('도감 저장 실패',e);}
}

// ── 초기화 ──
async function initApp(){
  loadState();
  state.count=0;
  saveState();
  
  // Supabase에서 최신 캐릭터 목록 불러오기
  const{data:chars}=await sb.from('characters').select('*').order('created_at');
  if(chars&&chars.length>0){
    state.characters=chars.map(c=>({
      id:c.id, name:c.name, grade:c.grade,
      emoji:c.emoji||null, imgData:c.img_data||null, desc:c.description||''
    }));
    saveState();
  }

 showScreen('team-screen');
 if(arUser){
  const{data:me}=await sb.from('users').select('role').eq('id',arUser.id).single();
  if(me) { arUser.role=me.role; localStorage.setItem('ar_user',JSON.stringify(arUser)); }
  injectHomeUserBar(arUser);
  if(arUser.role==='admin'){
    const btn=document.createElement('button');
    btn.textContent='⚙️ 관리자'; btn.onclick=()=>location.href='/admin';
btn.style.cssText='position:absolute;bottom:130px;right:20px;z-index:1;background:rgba(255,100,100,.12);border:1px solid rgba(255,100,100,.3);color:#ff8888;font-size:12px;border-radius:99px;padding:7px 14px;cursor:pointer;';    document.getElementById('home').appendChild(btn);
  }
 }
}  

window.addEventListener('DOMContentLoaded', initApp);
