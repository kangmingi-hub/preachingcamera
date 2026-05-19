// 배포 전 실행: node build.js
// app.js + html.js + css.js + login.js 를 worker.js 하나로 합침

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const src = (f) => join(__dirname, 'src', f);

const appJS   = readFileSync(src('app.js'),   'utf8');
const cssJS   = readFileSync(src('css.js'),   'utf8');
const loginJS = readFileSync(src('login.js'), 'utf8');

// CSS 추출
const cssMatch = cssJS.match(/export const CSS = `([\s\S]*?)`;/);
const css = cssMatch ? cssMatch[1] : '';

// login HTML 추출
const loginMatch = loginJS.match(/export const LOGIN_HTML = `([\s\S]*?)`;/);
const loginHtml = loginMatch ? loginMatch[1] : '';

// HTML 마크업 (app.js 인라인 주입)
const htmlTemplate = readFileSync(src('html.js'), 'utf8');
const htmlMatch = htmlTemplate.match(/export const HTML = `([\s\S]*?)`;/);
const htmlBody = htmlMatch ? htmlMatch[1] : '';
const html = htmlBody
  .replace('${CSS}', css)
  .replace('__APP_JS__', appJS);

// 최종 worker.js 생성
const output = `// ⚠️  이 파일은 자동 생성됩니다. 직접 수정하지 마세요. (node build.js 로 재생성)

const MAIN_HTML = ${JSON.stringify(html)};
const LOGIN_HTML = ${JSON.stringify(loginHtml)};

export default {
  async fetch(request) {
    const { pathname } = new URL(request.url);
    if (pathname === '/login' || pathname === '/login.html') {
      return new Response(LOGIN_HTML, {
        headers: { 'Content-Type': 'text/html;charset=UTF-8', 'Cache-Control': 'public, max-age=300' },
      });
    }
    return new Response(MAIN_HTML, {
      headers: { 'Content-Type': 'text/html;charset=UTF-8', 'Cache-Control': 'public, max-age=300' },
    });
  },
};
`;

writeFileSync(join(__dirname, 'worker.js'), output, 'utf8');
console.log('✅ worker.js 빌드 완료!');
