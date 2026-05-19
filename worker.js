// ⚠️ 이 파일은 build.js가 자동 생성합니다
// CI에서 build.js 실행 후 이 파일을 덮어씁니다

const MAIN_HTML = "PLACEHOLDER_MAIN";
const LOGIN_HTML = "PLACEHOLDER_LOGIN";
const COLLECTION_HTML = "PLACEHOLDER_COLLECTION";

export default {
  async fetch(request) {
    const { pathname } = new URL(request.url);
    if (pathname === '/login' || pathname === '/login.html') {
      return new Response(LOGIN_HTML, {
        headers: { 'Content-Type': 'text/html;charset=UTF-8', 'Cache-Control': 'public, max-age=300' },
      });
    }
    if (pathname === '/collection' || pathname === '/collection.html') {
      return new Response(COLLECTION_HTML, {
        headers: { 'Content-Type': 'text/html;charset=UTF-8', 'Cache-Control': 'no-cache' },
      });
    }
    return new Response(MAIN_HTML, {
      headers: { 'Content-Type': 'text/html;charset=UTF-8', 'Cache-Control': 'public, max-age=300' },
    });
  },
};
