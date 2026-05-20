export const LOGIN_HTML = `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>전도 AR 인증샷 - 로그인</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Noto+Sans+KR:wght@300;400;600;700&display=swap');
:root{--gold:#FFD700;--gold2:#FFA500}
*{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent}
html,body{width:100%;height:100%;overflow:hidden;background:#000;font-family:Noto Sans KR,sans-serif;display:flex;align-items:center;justify-content:center}
.bg{position:fixed;inset:0;background:radial-gradient(ellipse at 50% 20%,#1e2a6e 0%,#0a0a2e 65%)}
.stars{position:fixed;inset:0;pointer-events:none;background:radial-gradient(1px 1px at 15% 20%,#fff,transparent),radial-gradient(1px 1px at 85% 8%,#fff,transparent),radial-gradient(1.5px 1.5px at 55% 55%,rgba(255,255,255,.9),transparent),radial-gradient(1px 1px at 8% 75%,#fff,transparent),radial-gradient(1px 1px at 72% 68%,rgba(255,255,255,.7),transparent),radial-gradient(1px 1px at 40% 12%,#fff,transparent),radial-gradient(1px 1px at 93% 45%,rgba(255,255,255,.6),transparent),radial-gradient(1px 1px at 28% 88%,rgba(255,255,255,.5),transparent),radial-gradient(1.5px 1.5px at 65% 30%,#fff,transparent);animation:twinkle 5s ease-in-out infinite alternate}
@keyframes twinkle{from{opacity:.5}to{opacity:1}}
.wrap{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;width:min(340px,92vw)}
.icon{font-size:72px;animation:float 3s ease-in-out infinite;filter:drop-shadow(0 0 24px rgba(255,215,0,.8));margin-bottom:10px}
@keyframes float{0%,100%{transform:translateY(0) rotate(-4deg)}50%{transform:translateY(-14px) rotate(4deg)}}
.title{font-family:'Black Han Sans',sans-serif;font-size:clamp(28px,9vw,42px);background:linear-gradient(135deg,#fff 0%,var(--gold) 50%,var(--gold2) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;text-align:center;filter:drop-shadow(0 2px 12px rgba(255,215,0,.4));line-height:1.2;margin-bottom:6px}
.sub{font-size:12px;color:rgba(255,255,255,.4);margin-bottom:28px;letter-spacing:.5px}
.card{width:100%;background:rgba(255,255,255,.06);border:1px solid rgba(255,215,0,.2);border-radius:24px;padding:28px 24px}
.card-title{font-family:'Black Han Sans',sans-serif;font-size:18px;color:var(--gold);text-align:center;margin-bottom:4px}
.card-sub{font-size:12px;color:rgba(255,255,255,.35);text-align:center;margin-bottom:22px}
.field{margin-bottom:14px}
.field label{display:block;font-size:11px;color:var(--gold);letter-spacing:.8px;margin-bottom:7px}
.field input{width:100%;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.15);border-radius:12px;padding:13px 16px;color:white;font-size:16px;outline:none;font-family:'Noto Sans KR',sans-serif;transition:border-color .2s}
.field input:focus{border-color:var(--gold)}
.field input::placeholder{color:rgba(255,255,255,.25)}
.btn-login{width:100%;margin-top:6px;background:linear-gradient(135deg,var(--gold2),var(--gold));color:#1a0800;font-family:'Black Han Sans',sans-serif;font-size:18px;border:none;border-radius:99px;padding:15px;cursor:pointer;box-shadow:0 4px 24px rgba(255,165,0,.45);transition:transform .15s,opacity .15s}
.btn-login:active{transform:scale(.97)}
.btn-login:disabled{background:rgba(255,255,255,.12);color:rgba(255,255,255,.3);box-shadow:none;cursor:not-allowed}
.err{min-height:20px;margin-top:12px;font-size:12px;color:#ff7070;text-align:center;line-height:1.5}
.spinner{display:inline-block;width:16px;height:16px;border:2px solid rgba(26,8,0,.3);border-top-color:#1a0800;border-radius:50%;animation:spin .6s linear infinite;vertical-align:middle;margin-right:6px}
@keyframes spin{to{transform:rotate(360deg)}}
</style>
</head>
<body>
<div class="bg"></div>
<div class="stars"></div>
<div class="wrap">
  <div class="icon">✨</div>
  <h1 class="title">전도 AR<br>인증샷</h1>
  <p class="sub">캐릭터를 모아보세요!</p>
  <div class="card">
    <div class="card-title">로그인</div>
    <div class="card-sub">관리자에게 받은 계정으로 입력하세요</div>
    <div class="field">
      <label>닉네임</label>
      <input type="text" id="inp-nickname" placeholder="닉네임 입력" autocomplete="username" inputmode="text"
        onkeydown="if(event.key==='Enter') document.getElementById('inp-pw').focus()">
    </div>
    <div class="field">
      <label>비밀번호</label>
      <input type="password" id="inp-pw" placeholder="비밀번호 입력" autocomplete="current-password"
        onkeydown="if(event.key==='Enter') doLogin()">
    </div>
    <button class="btn-login" id="btn-login" onclick="doLogin()">로그인</button>
    <div class="err" id="err-msg"></div>
  </div>
</div>
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js"></script>
<link rel="apple-touch-icon" href="https://raw.githubusercontent.com/kangmingi-hub/preachingcamera/main/icon-192.png">
<link rel="manifest" href="/manifest.json">
<meta name="theme-color" content="#0a0a2e">
<script>
const SUPA_URL='https://ouugfofqiefrbfshgeep.supabase.co';
const SUPA_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im91dWdmb2ZxaWVmcmJmc2hnZWVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxNzgyODUsImV4cCI6MjA5NDc1NDI4NX0.5wlvTtlLPPQ8C5JF8dwzB1Rgo2rGf1oniF9wasZLi6g';
const sb=supabase.createClient(SUPA_URL,SUPA_KEY);

// 이미 로그인된 경우 메인으로
try{const u=JSON.parse(localStorage.getItem('ar_user')||'null');if(u?.id&&u?.nickname)location.replace('/');}catch(e){}

async function doLogin(){
  const nickname=document.getElementById('inp-nickname').value.trim();
  const password=document.getElementById('inp-pw').value;
  const btn=document.getElementById('btn-login');
  const err=document.getElementById('err-msg');
  err.textContent='';
  if(!nickname){err.textContent='닉네임을 입력하세요.';return;}
  if(!password){err.textContent='비밀번호를 입력하세요.';return;}
  btn.disabled=true; btn.innerHTML='<span class="spinner"></span>로그인 중...';
  try{
    const{data,error}=await sb.from('users').select('id,nickname,password').eq('nickname',nickname).single();
    if(error||!data){err.textContent='존재하지 않는 닉네임입니다.';reset();return;}
    if(data.password!==password){err.textContent='비밀번호가 올바르지 않습니다.';reset();return;}
    localStorage.setItem('ar_user',JSON.stringify({id:data.id,nickname:data.nickname}));
    location.replace('/');
  }catch(e){err.textContent='서버 연결 오류. 잠시 후 다시 시도하세요.';reset();}
}
function reset(){const btn=document.getElementById('btn-login');btn.disabled=false;btn.innerHTML='로그인';}
</script>
</body>
</html>`;
