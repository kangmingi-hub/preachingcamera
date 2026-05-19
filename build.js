// 배포 전 실행: node build.js
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const src = (f) => join(__dirname, 'src', f);

const appJS        = readFileSync(src('app.js'),        'utf8');
const cssJS        = readFileSync(src('css.js'),        'utf8');
const loginJS      = readFileSync(src('login.js'),      'utf8');
const collectionJS = readFileSync(src('collection.js'), 'utf8');
const htmlTemplate = readFileSync(src('html.js'),       'utf8');

// 각 내용 추출
const css          = cssJS.match(/export const CSS = `([\s\S]*?)`;/)?.[1] || '';
const loginHtml    = loginJS.match(/export const LOGIN_HTML = `([\s\S]*?)`;/)?.[1] || '';
const collectionHtml = collectionJS.match(/export const COLLECTION_HTML = `([\s\S]*?)`;/)?.[1] || '';
const htmlBody     = htmlTemplate.match(/export const HTML = `([\s\S]*?)`;/)?.[1] || '';

const mainHtml = htmlBody
  .replace('${CSS}', css)
  .replace('__APP_JS__', appJS);

const output = `// ⚠️ 자동 생성 파일 - 직접 수정하지 마세요 (node build.js 로 재생성)
const MAIN_HTML       = ${JSON.stringify(mainHtml)};
const LOGIN_HTML      = ${JSON.stringify(loginHtml)};
const COLLECTION_HTML = ${JSON.stringify(collectionHtml)};

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
`;

writeFileSync(join(__dirname, 'worker.js'), output, 'utf8');
console.log('✅ worker.js 빌드 완료!');
