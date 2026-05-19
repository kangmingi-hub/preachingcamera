// ⚠️ 이 파일은 build.js가 자동 생성합니다
// 하지만 Cloudflare CI에서 생성된 파일은 깃헙에 안 올라가므로
// build.js 없이 직접 src 파일들을 import 합니다

import { HTML } from './src/html.js';
import { LOGIN_HTML } from './src/login.js';
import { CSS } from './src/css.js';
import APP_JS from './src/app.js';

// collection.html을 직접 텍스트로 import
import COLLECTION_HTML from './src/collection.html';

const FINAL_HTML = HTML
  .replace('${CSS}', CSS)
  .replace('__APP_JS__', APP_JS);

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
    return new Response(FINAL_HTML, {
      headers: { 'Content-Type': 'text/html;charset=UTF-8', 'Cache-Control': 'public, max-age=300' },
    });
  },
};
