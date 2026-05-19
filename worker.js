import { HTML } from './src/html.js';
import { LOGIN_HTML } from './src/login.js';
import { CSS } from './src/css.js';

const FINAL_HTML = HTML.replace('${CSS}', CSS).replace('__APP_JS__', '');

export default {
  async fetch(request) {
    const { pathname } = new URL(request.url);
    if (pathname === '/login' || pathname === '/login.html') {
      return new Response(LOGIN_HTML, {
        headers: { 'Content-Type': 'text/html;charset=UTF-8' },
      });
    }
    return new Response(FINAL_HTML, {
      headers: { 'Content-Type': 'text/html;charset=UTF-8', 'Cache-Control': 'public, max-age=300' },
    });
  },
};
