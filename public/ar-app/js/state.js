// ── 공유 상수 ──────────────────────────────────────────────
const GRADE_WEIGHTS = { common:60, rare:25, epic:10, legend:5 };
const GRADE_LABELS  = { common:'⭐ COMMON', rare:'⭐⭐ RARE', epic:'⭐⭐⭐ EPIC', legend:'🌟 LEGEND' };

const DEFAULT_CHARS = [
  { id:'d1', name:'비둘기', grade:'common', emoji:'🕊️', desc:'평화의 비둘기' },
  { id:'d2', name:'천사',   grade:'rare',   emoji:'👼', desc:'하늘의 전령사' },
  { id:'d3', name:'대천사', grade:'epic',   emoji:'😇', desc:'빛의 수호자' },
  { id:'d4', name:'성령',   grade:'legend', emoji:'✨', desc:'전설의 성령 임재' },
];

// ── 앱 상태 ────────────────────────────────────────────────
const state = {
  members:     0,
  goal:        0,
  count:       0,
  characters:  [],
  currentChar: null,
  stream:      null,
  charX:       50,   // 화면 좌우 % (center)
  charY:       28,   // 화면 아래 %
};

// ── 저장 / 불러오기 ────────────────────────────────────────
function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem('eva_state') || '{}');
    state.members    = saved.members    || 0;
    state.goal       = saved.goal       || 0;
    state.count      = saved.count      || 0;
    state.characters = saved.characters || [...DEFAULT_CHARS];
  } catch (e) {
    state.characters = [...DEFAULT_CHARS];
  }
}

function saveState() {
  localStorage.setItem('eva_state', JSON.stringify({
    members:    state.members,
    goal:       state.goal,
    count:      state.count,
    characters: state.characters,
  }));
}
