const SUPA_URL = 'https://ouugfofqiefrbfshgeep.supabase.co';
const SUPA_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im91dWdmb2ZxaWVmcmJmc2hnZWVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxNzgyODUsImV4cCI6MjA5NDc1NDI4NX0.5wlvTtlLPPQ8C5JF8dwzB1Rgo2rGf1oniF9wasZLi6g';
const sb = supabase.createClient(SUPA_URL, SUPA_KEY);

// ── 로그인 유저 ───────────────────────────────────────────
let arUser = null;
try { arUser = JSON.parse(localStorage.getItem('ar_user') || 'null'); } catch (e) {}

// 로그인 안 됐으면 login 페이지로
if (!arUser?.id) location.replace('login.html');

// ── 로그아웃 ──────────────────────────────────────────────
function doLogout() {
  localStorage.removeItem('ar_user');
  location.replace('login.html');
}

// ── 도감 저장 ─────────────────────────────────────────────
async function saveToCollection(char) {
  try {
    const { data: existing } = await sb
      .from('collections')
      .select('id, count')
      .eq('user_id', arUser.id)
      .eq('character_id', char.id)
      .maybeSingle();

    if (existing) {
      await sb.from('collections').update({
        count: existing.count + 1,
        last_obtained_at: new Date().toISOString(),
      }).eq('id', existing.id);
      showToast(`📖 ${char.name} +1 (${existing.count + 1}번째 획득!)`);
    } else {
      await sb.from('collections').insert({
        user_id:           arUser.id,
        character_id:      char.id,
        character_name:    char.name,
        grade:             char.grade,
        emoji:             char.emoji || null,
        count:             1,
        first_obtained_at: new Date().toISOString(),
        last_obtained_at:  new Date().toISOString(),
      });
      showToast(`✨ 새 캐릭터 도감 등록! [${char.name}]`);
    }

    await sb.from('gacha_logs').insert({
      user_id:        arUser.id,
      character_id:   char.id,
      character_name: char.name,
      grade:          char.grade,
    });
  } catch (e) {
    console.error('도감 저장 실패', e);
  }
}
