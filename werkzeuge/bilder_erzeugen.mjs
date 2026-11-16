// bilder_erzeugen.mjs – erzeugt Bilder mit dem installierten Google Chrome (ohne Zusatzpakete, über das DevTools-Protokoll).
//
// Aufruf im Repo-Ordner:
//   node werkzeuge/bilder_erzeugen.mjs symbol                 → public/apple-touch-icon.png (180 × 180, Monster „Lomufi“)
//   node werkzeuge/bilder_erzeugen.mjs baukasten <ziel.png>   → Spielbereich der Live-Seite, Tablet quer 1180 × 820,
//                                                                Walzen gedreht, Monster NICHT aufgedeckt (Baukasten typ-21)
// Abhängigkeiten: Node 22+ (eingebautes WebSocket), Google Chrome unter dem Standardpfad (oder Umgebungsvariable CHROME).
import { spawn } from 'node:child_process';
import { mkdtempSync, writeFileSync, copyFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const REPO = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const CHROME = process.env.CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const LIVE = 'https://mitlaeuferfotografie.github.io/silbenmonster/';
const warte = ms => new Promise(r => setTimeout(r, ms));

async function chromeStarten() {
  const profil = mkdtempSync(join(tmpdir(), 'sm-chrome-'));
  const port = 9300 + Math.floor(Math.random() * 500);
  const p = spawn(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', `--remote-debugging-port=${port}`, `--user-data-dir=${profil}`, 'about:blank'], { stdio: 'ignore' });
  let ziel;
  for (let i = 0; i < 50 && !ziel; i++) {
    await warte(200);
    try { ziel = (await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()).find(t => t.type === 'page'); } catch { /* startet noch */ }
  }
  if (!ziel) throw new Error('Chrome startet nicht');
  const ws = new WebSocket(ziel.webSocketDebuggerUrl);
  await new Promise(r => ws.addEventListener('open', r, { once: true }));
  let id = 0; const offen = new Map();
  ws.addEventListener('message', e => { const m = JSON.parse(e.data); if (m.id && offen.has(m.id)) { offen.get(m.id)(m); offen.delete(m.id); } });
  const cdp = (method, params = {}) => new Promise((res, rej) => { const i = ++id; offen.set(i, m => m.error ? rej(new Error(m.error.message)) : res(m.result)); ws.send(JSON.stringify({ id: i, method, params })); });
  const js = async ausdruck => (await cdp('Runtime.evaluate', { expression: ausdruck, awaitPromise: true, returnByValue: true })).result.value;
  const ende = () => { ws.close(); p.kill(); setTimeout(() => { try { rmSync(profil, { recursive: true, force: true }); } catch { /* egal */ } }, 500); };
  return { cdp, js, ende };
}

async function symbol() {
  const { monsterSvg, merkmaleFuerName } = await import(pathToFileURL(join(REPO, 'werkzeuge', '_monster.mjs')).href);
  const T = JSON.parse((await import('node:fs')).readFileSync(join(REPO, 'src', 'merkmale.json'), 'utf8'));
  const svg = monsterSvg(merkmaleFuerName(['lo', 'mu', 'fi'], T));
  const html = `<!DOCTYPE html><html><body style="margin:0;width:180px;height:180px;background:#FEF3C7;display:flex;align-items:center;justify-content:center">
    <div style="width:136px;height:143px;margin-top:6px">${svg.replace("<svg ", "<svg width=\"136\" height=\"143\" ")}</div></body></html>`;
  const { cdp, ende } = await chromeStarten();
  await cdp('Emulation.setDeviceMetricsOverride', { width: 180, height: 180, deviceScaleFactor: 1, mobile: false });
  await cdp('Page.navigate', { url: 'data:text/html;base64,' + Buffer.from(html).toString('base64') });
  await warte(600);
  const { data } = await cdp('Page.captureScreenshot', { format: 'png', clip: { x: 0, y: 0, width: 180, height: 180, scale: 1 } });
  writeFileSync(join(REPO, 'public', 'apple-touch-icon.png'), Buffer.from(data, 'base64'));
  ende();
  console.log('public/apple-touch-icon.png geschrieben');
}

async function baukasten(ziel) {
  const { cdp, js, ende } = await chromeStarten();
  await cdp('Emulation.setDeviceMetricsOverride', { width: 1180, height: 820, deviceScaleFactor: 1, mobile: false });
  await cdp('Page.enable');
  await cdp('Page.navigate', { url: LIVE + '?stufe=2&silben=3' });
  await warte(2500);
  await js(`(async () => {
    const w = ms => new Promise(r => setTimeout(r, ms));
    document.querySelector('button[aria-label^="Los"]').click(); await w(400);
    const dreh = () => document.querySelector('button[aria-label="Drehen"]').click();
    // zwei Monster für die Reihe aufdecken, dann ein drittes Mal drehen und NICHT aufdecken
    for (let i = 0; i < 2; i++) { dreh(); await w(1800); document.querySelector('button[aria-label="Monster aufdecken"]').click(); await w(1500); }
    dreh(); await w(1800);
    document.querySelector('button[aria-label="Walze 1 festhalten"]').click(); await w(300);
  })()`);
  const r = await js(`(() => { const b = document.querySelector('.spielflaeche').getBoundingClientRect(); return { x: b.x, y: b.y + 70, width: b.width, height: b.height - 100 }; })()`);
  const { data } = await cdp('Page.captureScreenshot', { format: 'png', clip: { ...r, scale: 1 } });
  writeFileSync(ziel, Buffer.from(data, 'base64'));
  ende();
  console.log(ziel + ' geschrieben');
}

const [, , was, ziel] = process.argv;
// monster.js ist ein ES-Modul ohne "type": "module" → für Node als .mjs kopieren
copyFileSync(join(REPO, 'src', 'monster.js'), join(REPO, 'werkzeuge', '_monster.mjs'));
try {
  if (was === 'symbol') await symbol();
  else if (was === 'baukasten' && ziel) await baukasten(resolve(ziel));
  else console.log('Aufruf: node werkzeuge/bilder_erzeugen.mjs symbol | baukasten <ziel.png>');
} finally { rmSync(join(REPO, 'werkzeuge', '_monster.mjs'), { force: true }); }
