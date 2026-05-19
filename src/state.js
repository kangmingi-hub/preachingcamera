export const GRADE_WEIGHTS = { common:60, rare:25, epic:10, legend:5 };
export const GRADE_LABELS  = { common:'⭐ COMMON', rare:'⭐⭐ RARE', epic:'⭐⭐⭐ EPIC', legend:'🌟 LEGEND' };

export const DEFAULT_CHARS = [
  { id:'d1', name:'비둘기', grade:'common', emoji:'🕊️', desc:'평화의 비둘기' },
  { id:'d2', name:'천사',   grade:'rare',   emoji:'👼', desc:'하늘의 전령사' },
  { id:'d3', name:'대천사', grade:'epic',   emoji:'😇', desc:'빛의 수호자' },
  { id:'d4', name:'성령',   grade:'legend', emoji:'✨', desc:'전설의 성령 임재' },
];

export const state = {
  members: 0, goal: 0, count: 0,
  characters: [], currentChar: null,
  stream: null, charX: 50, charY: 28,
};

export function loadState() {
  try {
    const s = JSON.parse(localStorage.getItem('eva_state') || '{}');
    state.members    = s.members    || 0;
    state.goal       = s.goal       || 0;
    state.count      = s.count      || 0;
    state.characters = s.characters || [...DEFAULT_CHARS];
  } catch(e) { state.characters = [...DEFAULT_CHARS]; }
}

export function saveState() {
  localStorage.setItem('eva_state', JSON.stringify({
    members: state.members, goal: state.goal,
    count: state.count, characters: state.characters,
  }));
}
