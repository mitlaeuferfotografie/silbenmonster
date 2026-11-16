/* =====================================================================
   Silbenmonster – Silben-Spielautomat für Klasse 1
   Aufbau (Suchbegriffe):
     KONSTANTEN      Standard-Einstellungen
     SILBEN          Silbenvorrat, Regeln, Sperrliste (aus silben.json), zieheName, namenGrund
     EINSTELLUNGEN   readUrlSettings, settingsLink
     TON             Web Audio: aufwecken, Klick beim Anhalten der Walzen
     ANZEIGE         SilbenName (Silbenfarben + Bögen), MonsterBild
     START           Startbildschirm mit Play-Knopf
     AUTOMAT         Walzen, Hebel, Drehen, Festhalten, Aufdecken, Monster-Reihe, Tastatur
     LEHRER          Lehrer-Bereich (ohne Passwort, Zahnrad), Link-Erzeuger, QR-Code
     ARBEITSBLAETTER Generator: Steckbrief, Ausmal-Monster, Partnerkarten, Mini-Heft (A4, Druck)
     IMPRESSUM       ImpressumModal (gleicher Text wie in allen Apps)
     APP             Hauptkomponente
   Keine Sterne, kein Code, kein Speichern (Werkzeug-App). Kein localStorage, keine Cookies.
   ===================================================================== */
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Settings, Lock, LockOpen, Volume2, RotateCcw, Copy, Check, X, Play, Printer, Smartphone, Pencil, Palette, Scissors, BookOpen, Shuffle } from 'lucide-react';
import qrcode from 'qrcode-generator';
import SILBEN_DATEN from './silben.json';
import SILBEN_MERKMALE from './merkmale.json';
import { monsterSvg, merkmaleFuerName } from './monster.js';

/* ============================== KONSTANTEN ============================== */
const APP_NAME = 'Silbenmonster';
const STANDARD = { stufe: '1', silben: '2', b: null, monster: 'tippen', ton: true, anim: true, vorlesen: false, schrift: 'grund' };
const REIHE_MAX = 10; // so viele Monster zeigt die Leiste unten

/* ================================ SILBEN ================================ */
// Regeln wie werkzeuge/silben_check.py – bei Änderungen beide anpassen!
const MEHRZEICHEN = ['sch', 'ei', 'au'];
const tok = s => { const t = []; for (let i = 0; i < s.length;) { const g = MEHRZEICHEN.find(x => s.startsWith(x, i)) || s[i]; t.push(g); i += g.length; } return t; };
const flach = x => x.replace(/-/g, '').toLowerCase();
const gross = s => s.charAt(0).toUpperCase() + s.slice(1);
const SP = SILBEN_DATEN.sperrliste;
const UNPASSEND = new RegExp(SP.unpassend.map(flach).sort((a, b) => b.length - a.length).join('|'));
const GESPERRTE_SILBEN = new Set(SP.unpassende_silben);
const GANZ_GESPERRT = new Set(['echte_woerter', 'vornamen', 'lesestart', 'lehrkraft'].flatMap(l => SP[l].map(flach)));
const REGELN = SILBEN_DATEN.regeln;

// Grapheme einer Stufe (für die Buchstabenauswahl): Vokale, dann Konsonanten
const graphemeDerStufe = stufe => { const st = SILBEN_DATEN.stufen[stufe]; return { vok: st.vokale, kons: st.konsonanten }; };

// Silbenvorrat einer Stufe; frei = Set der freigegebenen Buchstaben oder null (alle)
function silbenVorrat(stufe, frei) {
  const st = SILBEN_DATEN.stufen[stufe], ok = g => !frei || frei.has(g);
  const kons = st.konsonanten.filter(ok), vok = st.vokale.filter(ok), end = st.endlaute.filter(ok);
  const nichtNach = st.endlaut_nicht_nach || {};
  const offen = kons.flatMap(k => vok.map(v => k + v)).filter(s => !GESPERRTE_SILBEN.has(s));
  const zu = kons.flatMap(k => vok.flatMap(v => end.filter(e => !(nichtNach[e] || []).includes(v)).map(e => k + v + e))).filter(s => !GESPERRTE_SILBEN.has(s));
  return { offen, zu, kons, vok, zuWenig: vok.length < REGELN.mindestens_vokale || kons.length < REGELN.mindestens_konsonanten };
}

// null = Name erlaubt, sonst der Grund der Sperre (wie silben_check.py)
function namenGrund(sil, offenSet) {
  if (REGELN.keine_gleiche_silbe_direkt_hintereinander) for (let i = 1; i < sil.length; i++) if (sil[i] === sil[i - 1]) return 'gleich';
  if (REGELN.geschlossene_silbe_nur_am_ende) for (const s of sil.slice(0, -1)) if (!offenSet.has(s)) return 'geschlossen';
  if (REGELN.e_nur_in_letzter_silbe) for (const s of sil.slice(0, -1)) if (tok(s).at(-1) === 'e') return 'e';
  const name = sil.join('');
  if (UNPASSEND.test(name)) return 'unpassend';
  if (GANZ_GESPERRT.has(name)) return 'ganz';
  return null;
}

// Zieht einen erlaubten Namen mit n Silben; fest[i] = festgehaltene Silbe oder null
function zieheName(vorrat, n, fest = []) {
  const { offen, zu } = vorrat, offenSet = new Set(offen), letzte = offen.concat(zu);
  const r = a => a[Math.floor(Math.random() * a.length)];
  for (let v = 0; v < 3000; v++) {
    const sil = Array.from({ length: n }, (_, i) => fest[i] || r(i === n - 1 ? letzte : offen));
    if (!namenGrund(sil, offenSet)) return sil;
  }
  return null;
}

/* ============================ EINSTELLUNGEN ============================ */
function readUrlSettings() {
  const p = new URLSearchParams(window.location.search), s = { ...STANDARD };
  if (['1', '2', '3'].includes(p.get('stufe'))) s.stufe = p.get('stufe');
  if (['2', '3', 'mix'].includes(p.get('silben'))) s.silben = p.get('silben');
  if (['sofort', 'tippen', 'aus'].includes(p.get('monster'))) s.monster = p.get('monster');
  if (p.get('ton') === '0') s.ton = false;
  if (p.get('anim') === '0') s.anim = false;
  if (p.get('vorlesen') === '1') s.vorlesen = true;
  if (p.get('schrift') === 'andika') s.schrift = 'andika';
  if (p.get('b')) {
    const alle = new Set([...SILBEN_DATEN.stufen['3'].konsonanten, ...SILBEN_DATEN.stufen['3'].vokale]);
    const b = p.get('b').toLowerCase().split('.').filter(g => alle.has(g));
    if (b.length) s.b = b;
  }
  // Systemeinstellung „Bewegung reduzieren“
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) s.anim = false;
  return s;
}

// Link mit allen Abweichungen vom Standard
function settingsLink(s) {
  const p = [];
  if (s.stufe !== STANDARD.stufe) p.push('stufe=' + s.stufe);
  if (s.silben !== STANDARD.silben) p.push('silben=' + s.silben);
  if (s.b) {
    const { vok, kons } = graphemeDerStufe(s.stufe), alle = [...vok, ...kons];
    const b = alle.filter(g => s.b.includes(g));
    if (b.length < alle.length) p.push('b=' + b.join('.'));
  }
  if (s.monster !== STANDARD.monster) p.push('monster=' + s.monster);
  if (!s.ton) p.push('ton=0');
  if (!s.anim) p.push('anim=0');
  if (s.vorlesen) p.push('vorlesen=1');
  if (s.schrift !== STANDARD.schrift) p.push('schrift=' + s.schrift);
  return window.location.origin + window.location.pathname + (p.length ? '?' + p.join('&') : '');
}

/* ================================= TON ================================= */
// Wird beim ersten Antippen geweckt und bleibt wach (leiser Dauerton mit Lautstärke 0), sonst schneidet das iPad Anfänge ab.
let audioCtx = null;
function tonWecken() {
  try {
    if (!audioCtx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      audioCtx = new AC();
      const o = audioCtx.createOscillator(), g = audioCtx.createGain();
      g.gain.value = 0; o.connect(g).connect(audioCtx.destination); o.start();
    }
    if (audioCtx.state === 'suspended') audioCtx.resume();
  } catch (e) { /* ohne Ton weiter */ }
}
function klick(an) {
  if (!an || !audioCtx) return;
  const t = audioCtx.currentTime, o = audioCtx.createOscillator(), g = audioCtx.createGain();
  o.type = 'triangle'; o.frequency.setValueAtTime(1300, t); o.frequency.exponentialRampToValueAtTime(500, t + 0.05);
  g.gain.setValueAtTime(0.25, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.07);
  o.connect(g).connect(audioCtx.destination); o.start(t); o.stop(t + 0.08);
}

/* =============================== ANZEIGE =============================== */
// Name in Silbenfarben (erste Silbe blau, dann rot), mit Silbenbögen; erste Silbe groß
function SilbenName({ sil, groesse, klasse = '' }) {
  return (
    <span className={`inline-flex items-end whitespace-nowrap ${klasse}`} style={{ fontSize: groesse }} aria-label={gross(sil.join(''))}>
      {sil.map((s, i) => (
        <span key={i} className={`inline-flex flex-col items-center ${i % 2 ? 'text-red-600' : 'text-blue-700'}`}>
          <span className="leading-tight px-[0.03em]">{i === 0 ? gross(s) : s}</span>
          <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="w-[90%] -mt-[0.05em]" style={{ height: '0.2em' }} aria-hidden="true">
            <path d="M3 3 Q50 24 97 3" fill="none" stroke="currentColor" strokeWidth="4" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
          </svg>
        </span>
      ))}
    </span>
  );
}

function MonsterBild({ sil, umriss = false, klasse = '', stil }) {
  const m = merkmaleFuerName(sil, SILBEN_MERKMALE);
  if (!m) return null;
  return <div className={klasse} style={stil} dangerouslySetInnerHTML={{ __html: monsterSvg(m, { umriss, titel: 'Monster ' + gross(sil.join('')) }) }} />;
}

function Fusszeile({ onImpressum, klasse = '' }) {
  return (
    <div className={`text-center text-xs text-slate-500 py-1 ${klasse}`}>
      <button onClick={onImpressum} className="underline underline-offset-2 hover:text-slate-700">Impressum · Datenschutz</button>
    </div>
  );
}

// Handy quer: Hinweis „Bitte drehen“
function BitteDrehen() {
  return (
    <div className="fixed inset-0 z-[300] bg-amber-50 hidden [@media(orientation:landscape)_and_(max-height:500px)]:flex flex-col items-center justify-center gap-3 text-slate-700">
      <Smartphone className="w-16 h-16 rotate-90" />
      <p className="text-2xl font-bold">Bitte drehen</p>
    </div>
  );
}

/* ================================ START ================================ */
function StartBildschirm({ onStart, onImpressum, schriftKlasse }) {
  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center gap-6 p-6 spielflaeche">
      <h1 className={`text-5xl md:text-7xl text-violet-800 ${schriftKlasse}`}>Silbenmonster</h1>
      <MonsterBild sil={['lo', 'mu', 'fi']} klasse="w-48 md:w-64" />
      <button onClick={onStart} aria-label="Los geht's" className="w-32 h-32 rounded-full bg-orange-500 hover:bg-orange-400 border-8 border-orange-700 shadow-xl flex items-center justify-center active:scale-95 transition-transform">
        <Play className="w-16 h-16 text-white fill-white ml-2" />
      </button>
      <Fusszeile onImpressum={onImpressum} klasse="mt-4" />
    </div>
  );
}

/* =============================== AUTOMAT =============================== */
function Automat({ einst, onAdmin, onImpressum, schriftKlasse }) {
  const frei = einst.b ? new Set(einst.b) : null;
  let vorrat = silbenVorrat(einst.stufe, frei);
  if (vorrat.zuWenig) vorrat = silbenVorrat(einst.stufe, null); // zu wenige Buchstaben: alle der Stufe (Hinweis im Lehrer-Bereich)

  const startN = einst.silben === '3' ? 3 : 2;
  const [n, setN] = useState(startN);
  const [sil, setSil] = useState(null);            // fertiger Name
  const [anzeige, setAnzeige] = useState(Array(startN).fill('')); // was auf den Walzen steht
  const [dreht, setDreht] = useState(false);
  const [fest, setFest] = useState(Array(3).fill(false));
  const [offen, setOffen] = useState(false);       // Monster aufgedeckt
  const [reihe, setReihe] = useState([]);          // Monster dieses Durchgangs (nur im Arbeitsspeicher)
  const [detail, setDetail] = useState(null);
  const [hebelAnim, setHebelAnim] = useState(0);
  const [freuAnim, setFreuAnim] = useState(0);
  const timer = useRef([]);
  // Fenstergröße: Alles wächst mit, damit es auch auf der digitalen Tafel (z. B. 1920 × 1080) groß genug ist
  const [fenster, setFenster] = useState({ b: window.innerWidth, h: window.innerHeight });
  useEffect(() => { const f = () => setFenster({ b: window.innerWidth, h: window.innerHeight }); window.addEventListener('resize', f); return () => window.removeEventListener('resize', f); }, []);

  // Einstellungen geändert → neu anfangen (Reihe bleibt)
  useEffect(() => {
    timer.current.forEach(clearTimeout); timer.current = [];
    const nn = einst.silben === '3' ? 3 : 2;
    setN(nn); setSil(null); setAnzeige(Array(nn).fill('')); setFest(Array(3).fill(false)); setOffen(false); setDreht(false);
  }, [einst.stufe, einst.silben, (einst.b || []).join('.')]);
  useEffect(() => () => timer.current.forEach(clearTimeout), []);

  const zurReihe = s => setReihe(r => [...r, { sil: s, id: Date.now() + Math.random() }].slice(-REIHE_MAX));

  const fertig = useCallback(ergebnis => {
    setSil(ergebnis); setDreht(false);
    if (einst.monster === 'sofort') { setOffen(true); setFreuAnim(a => a + 1); zurReihe(ergebnis); }
    else if (einst.monster === 'aus') zurReihe(ergebnis);
  }, [einst.monster]);

  const drehen = useCallback(() => {
    if (dreht) return;
    tonWecken();
    const festJetzt = sil ? fest.slice(0, sil.length) : [];
    if (festJetzt.length && festJetzt.every(Boolean)) return; // alles festgehalten: nichts zu drehen
    // Silbenzahl: bei „gemischt“ jedes Mal neu, außer eine Walze ist festgehalten
    let nn = einst.silben === 'mix' ? (festJetzt.some(Boolean) ? sil.length : (Math.random() < 0.5 ? 2 : 3)) : (einst.silben === '3' ? 3 : 2);
    const vorgabe = Array.from({ length: nn }, (_, i) => (sil && fest[i] && sil[i]) || null);
    let ergebnis = zieheName(vorrat, nn, vorgabe);
    if (!ergebnis) { setFest(Array(3).fill(false)); ergebnis = zieheName(vorrat, nn); }
    if (!ergebnis) return;
    setN(nn); setOffen(false); setSil(null); setHebelAnim(a => a + 1);
    const stehtFest = i => !!vorgabe[i];
    if (!einst.anim) { setAnzeige(ergebnis); klick(einst.ton); fertig(ergebnis); return; }
    setDreht(true);
    const laufend = Array.from({ length: nn }, (_, i) => !stehtFest(i));
    const r = a => a[Math.floor(Math.random() * a.length)];
    const alle = vorrat.offen.concat(vorrat.zu);
    const wirbel = setInterval(() => setAnzeige(Array.from({ length: nn }, (_, i) => laufend[i] ? r(i === nn - 1 ? alle : vorrat.offen) : ergebnis[i])), 75);
    timer.current.push(wirbel);
    // Walzen halten von links nach rechts nacheinander an
    let t = 650;
    const reihenfolge = [...Array(nn).keys()].filter(i => laufend[i]);
    reihenfolge.forEach((i, k) => {
      timer.current.push(setTimeout(() => {
        laufend[i] = false; klick(einst.ton);
        setAnzeige(a => a.map((x, j) => j === i ? ergebnis[i] : x));
        if (k === reihenfolge.length - 1) { clearInterval(wirbel); setAnzeige(ergebnis); fertig(ergebnis); }
      }, t));
      t += 300;
    });
  }, [dreht, sil, fest, einst, vorrat, fertig]);

  const aufdecken = useCallback(() => {
    if (!sil || offen || dreht || einst.monster === 'aus') return;
    tonWecken(); setOffen(true); setFreuAnim(a => a + 1); zurReihe(sil);
  }, [sil, offen, dreht, einst.monster]);

  const festhalten = useCallback(i => {
    if (!sil || dreht || i >= sil.length) return;
    setFest(f => f.map((x, j) => j === i ? !x : x));
  }, [sil, dreht]);

  // Tastatur (Beamer): Leertaste drehen, Enter aufdecken, 1/2/3 Walze festhalten
  useEffect(() => {
    const k = e => {
      if (e.target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;
      if (document.querySelector('[data-modal]')) return;
      if (e.code === 'Space') { e.preventDefault(); drehen(); }
      else if (e.key === 'Enter') { e.preventDefault(); aufdecken(); }
      else if (['1', '2', '3'].includes(e.key)) festhalten(+e.key - 1);
    };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [drehen, aufdecken, festhalten]);

  const allesFest = sil && fest.slice(0, sil.length).every(Boolean);
  const mitMonster = einst.monster !== 'aus';
  const quer = fenster.b > fenster.h && mitMonster;
  // Platz für den Automaten: quer etwa die halbe Breite (Monster daneben), hochkant fast die ganze Breite
  const platz = (quer ? fenster.b * 0.55 : fenster.b * 0.94) - 84 - 24 - 12 * n;
  const walzeB = Math.round(Math.max(56, Math.min(platz / n, fenster.h * (quer ? 0.3 : 0.16), 280)));
  const textGr = s => Math.round(walzeB * [0.5, 0.5, 0.42, 0.33, 0.28, 0.24][Math.min(s.length, 5)]);
  const monsterB = Math.round(quer ? Math.min(fenster.b * 0.38, fenster.h * 0.58, 640) : Math.min(fenster.b * 0.7, fenster.h * 0.3, 520));
  const nameLaenge = sil ? sil.join('').length : 6;
  const nameGr = Math.round(Math.min((n * walzeB + 84) * 1.6 / Math.max(nameLaenge, 4), walzeB * 0.75));

  return (
    <div className={`min-h-[100dvh] flex flex-col spielflaeche`}>
      {/* Kopfzeile: links Platz für den Lautsprecher (Ansage, Etappe 5), rechts Zahnrad */}
      <div className="flex justify-between items-center p-3">
        <div className="w-14 h-14" />
        <button onClick={onAdmin} aria-label="Lehrer-Bereich" className="w-12 h-12 rounded-full bg-white/70 text-slate-400 hover:text-slate-600 flex items-center justify-center"><Settings className="w-7 h-7" /></button>
      </div>

      <div className={`flex-1 flex ${quer ? 'flex-row' : 'flex-col'} items-center justify-center gap-6 px-3 pb-2`}>
        {/* Automat mit Walzen und Hebel */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-violet-700 border-8 border-violet-900 rounded-[2rem] p-3 flex gap-2 shadow-xl">
              {Array.from({ length: n }, (_, i) => {
                const txt = anzeige[i] || '';
                const istFest = sil && fest[i];
                return (
                  <button key={i} onClick={() => festhalten(i)} disabled={!sil || dreht} aria-label={`Walze ${i + 1} ${istFest ? 'loslassen' : 'festhalten'}`}
                    className={`relative bg-white rounded-2xl border-4 ${istFest ? 'border-amber-400 bg-amber-50' : 'border-violet-950'} flex items-center justify-center overflow-hidden`}
                    style={{ width: walzeB, height: Math.round(walzeB * 1.15) }}>
                    <span className={`${schriftKlasse} text-slate-800 leading-none ${dreht && txt !== (sil || [])[i] ? 'opacity-80' : ''}`} style={{ fontSize: textGr(txt || 'a') }}>{txt ? (i === 0 ? gross(txt) : txt) : ''}</span>
                    {sil && !dreht && (istFest
                      ? <Lock className="absolute top-1.5 right-1.5 w-7 h-7 text-amber-500" strokeWidth={2.5} />
                      : <LockOpen className="absolute top-1.5 right-1.5 w-6 h-6 text-slate-300" />)}
                  </button>
                );
              })}
            </div>
            {/* Hebel (Tippen genügt, kein Ziehen) */}
            <button onClick={drehen} disabled={dreht || allesFest} aria-label="Drehen" className="flex flex-col items-center disabled:opacity-50" style={{ width: 84 }}>
              <div key={hebelAnim} className={`flex flex-col items-center ${einst.anim && hebelAnim ? 'anim-hebel' : ''}`}>
                <div className="w-20 h-20 rounded-full bg-red-500 border-[6px] border-red-800 shadow-lg" />
                <div className="w-3 h-16 bg-slate-500" />
              </div>
              <div className="w-16 h-7 bg-violet-900 rounded-lg -mt-1" />
            </button>
          </div>
          {/* fertiger Name in Silbenfarben */}
          <div className="min-h-[1.6em] flex items-center justify-center" style={{ fontSize: nameGr }}>
            {sil && !dreht && <SilbenName sil={sil} klasse={`${schriftKlasse} anim-ein`} />}
          </div>
        </div>

        {/* Monster hinter dem Vorhang */}
        {mitMonster && (
          <div className="flex flex-col items-center gap-3">
            <div className="relative rounded-3xl overflow-hidden" style={{ width: monsterB, aspectRatio: '1 / 1.05' }}>
              {sil && offen
                ? <div key={freuAnim} className={einst.anim ? 'anim-freuen' : ''}><MonsterBild sil={sil} /></div>
                : <button onClick={aufdecken} disabled={!sil || dreht} aria-label="Monster aufdecken"
                    className="absolute inset-0 bg-gradient-to-b from-fuchsia-500 to-fuchsia-700 border-8 border-fuchsia-900 rounded-3xl flex items-center justify-center disabled:from-slate-300 disabled:to-slate-400 disabled:border-slate-400">
                    <span className="text-white font-bold drop-shadow" style={{ fontSize: Math.round(monsterB * 0.5) }}>?</span>
                    <span className="absolute inset-x-0 top-0 h-6 bg-fuchsia-900/40" />
                  </button>}
            </div>
            {sil && offen && (
              <div className="flex gap-4 anim-ein">
                {einst.vorlesen && (
                  <button disabled aria-label="So klingt es (Ton folgt)" title="Ton folgt in Etappe 5" className="w-[72px] h-[72px] rounded-2xl bg-white border-4 border-slate-300 text-slate-300 flex items-center justify-center"><Volume2 className="w-10 h-10" /></button>
                )}
                <button onClick={drehen} aria-label="Neu drehen" className="w-[72px] h-[72px] rounded-2xl bg-orange-500 border-4 border-orange-700 text-white flex items-center justify-center active:scale-95"><RotateCcw className="w-10 h-10" /></button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Monster-Reihe dieses Durchgangs */}
      {reihe.length > 0 && (
        <div className="flex justify-center gap-2 px-3 py-2 overflow-hidden">
          {reihe.map(e => (
            <button key={e.id} onClick={() => setDetail(e.sil)} aria-label={gross(e.sil.join(''))}
              className="bg-white rounded-xl border-2 border-slate-200 p-1 flex flex-col items-center justify-center" style={{ width: 'min(9vw, 9vh, 120px)', minWidth: 48 }}>
              {mitMonster ? <MonsterBild sil={e.sil} klasse="w-full" /> : <span className={`${schriftKlasse} text-sm`}>{gross(e.sil.join(''))}</span>}
            </button>
          ))}
        </div>
      )}
      <Fusszeile onImpressum={onImpressum} />

      {detail && (
        <div data-modal className="fixed inset-0 bg-slate-900/70 z-[150] flex items-center justify-center p-4" onClick={() => setDetail(null)}>
          <div className="bg-white rounded-3xl p-6 flex flex-col items-center gap-2 anim-ein relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setDetail(null)} aria-label="Schließen" className="absolute top-2 right-2 w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center"><X className="w-7 h-7" /></button>
            <SilbenName sil={detail} groesse="min(12vw, 72px)" klasse={schriftKlasse} />
            {mitMonster && <MonsterBild sil={detail} stil={{ width: 'min(70vw, 50vh, 320px)' }} />}
          </div>
        </div>
      )}
    </div>
  );
}

/* ================================ LEHRER ================================ */
function Modal({ children, onClose, breit = false }) {
  return (
    <div data-modal className="fixed inset-0 bg-slate-900/70 z-[200] flex items-center justify-center p-3">
      <div className={`bg-white rounded-3xl w-full ${breit ? 'max-w-3xl' : 'max-w-sm'} max-h-[92dvh] overflow-y-auto relative p-5 md:p-6 anim-ein`}>
        <button onClick={onClose} aria-label="Schließen" className="absolute top-3 right-3 w-11 h-11 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center"><X className="w-6 h-6" /></button>
        {children}
      </div>
    </div>
  );
}

function Wahl({ titel, werte, wert, setze, hinweis }) {
  return (
    <div>
      <div className="font-bold text-slate-700 mb-1">{titel}</div>
      <div className="flex flex-wrap gap-2">
        {werte.map(([w, l]) => (
          <button key={w} onClick={() => setze(w)} className={`px-4 py-2 rounded-xl border-2 font-bold ${wert === w ? 'bg-violet-600 border-violet-600 text-white' : 'bg-white border-slate-300 text-slate-700 hover:border-violet-400'}`}>{l}</button>
        ))}
      </div>
      {hinweis && <div className="text-xs text-slate-500 mt-1">{hinweis}</div>}
    </div>
  );
}

function LehrerBereich({ einst, setEinst, onClose, onImpressum, onBlaetter }) {
  const [kopiert, setKopiert] = useState(false);
  const { vok, kons } = graphemeDerStufe(einst.stufe);
  const alle = [...vok, ...kons];
  const frei = einst.b ? new Set(einst.b) : new Set(alle);
  const vorrat = silbenVorrat(einst.stufe, einst.b ? new Set(einst.b) : null);
  const link = settingsLink(einst);
  const qr = (() => { try { const q = qrcode(0, 'M'); q.addData(link); q.make(); return q.createSvgTag({ cellSize: 4, margin: 2, scalable: true }); } catch (e) { return ''; } })();
  const setze = (k, v) => setEinst(s => ({ ...s, [k]: v }));
  const umschalten = g => {
    // Ausgangspunkt: bisherige Auswahl oder alle Buchstaben (auch die höherer Stufen bleiben so erhalten)
    const ganz = [...SILBEN_DATEN.stufen['3'].vokale, ...SILBEN_DATEN.stufen['3'].konsonanten];
    const neu = new Set(einst.b || ganz); neu.has(g) ? neu.delete(g) : neu.add(g);
    setEinst(s => ({ ...s, b: ganz.every(x => neu.has(x)) ? null : ganz.filter(x => neu.has(x)) }));
  };
  const Schalter = ({ k, titel, hinweis }) => (
    <label className="flex items-start gap-2 cursor-pointer"><input type="checkbox" className="mt-1 w-5 h-5" checked={einst[k]} onChange={e => setze(k, e.target.checked)} /><span><span className="font-bold text-slate-700">{titel}</span>{hinweis && <span className="block text-xs text-slate-500">{hinweis}</span>}</span></label>
  );

  return (
    <Modal onClose={onClose} breit>
      <h3 className="text-2xl font-bold mb-4">Lehrer-Bereich</h3>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-4">
          <Wahl titel="Stufe" wert={einst.stufe} setze={v => setEinst(s => ({ ...s, stufe: v }))}
            werte={[['1', '1'], ['2', '2'], ['3', '3']]} hinweis={{ 1: 'm l s n r f w h sch + a e i o u, nur offene Silben', 2: '+ d t b p g k z, ei, au', 3: 'wie 2, letzte Silbe darf geschlossen sein (Ra-bot)' }[einst.stufe]} />
          <Wahl titel="Silben" wert={einst.silben} setze={v => setze('silben', v)} werte={[['2', '2'], ['3', '3'], ['mix', 'gemischt']]} />
          <div>
            <div className="font-bold text-slate-700 mb-1">Buchstaben <span className="font-normal text-xs text-slate-500">(antippen = an/aus)</span></div>
            <div className="flex flex-wrap gap-1.5">
              {alle.map(g => (
                <button key={g} onClick={() => umschalten(g)} className={`min-w-[44px] h-11 px-2 rounded-lg border-2 text-lg font-bold ${frei.has(g) ? (vok.includes(g) ? 'bg-amber-100 border-amber-400' : 'bg-sky-100 border-sky-400') : 'bg-slate-50 border-dashed border-slate-300 text-slate-300'}`}>{g}</button>
              ))}
              <button onClick={() => setze('b', null)} className="h-11 px-3 rounded-lg border-2 border-slate-300 text-sm font-bold">alle</button>
            </div>
            <div className="text-xs text-slate-500 mt-1">{vorrat.offen.length} offene Silben{vorrat.zu.length ? `, ${vorrat.zu.length} Endsilben` : ''}</div>
            {vorrat.zuWenig && <div className="mt-2 text-sm bg-amber-100 border border-amber-300 rounded-lg p-2">Zu wenige Buchstaben frei: Es braucht mindestens {REGELN.mindestens_vokale} Vokale und {REGELN.mindestens_konsonanten} Konsonanten. Bis dahin verwendet der Automat alle Buchstaben der Stufe.</div>}
          </div>
          <Wahl titel="Monster zeigen" wert={einst.monster} setze={v => setze('monster', v)} werte={[['tippen', 'nach Antippen'], ['sofort', 'sofort'], ['aus', 'aus']]} />
        </div>
        <div className="flex flex-col gap-3">
          <Schalter k="vorlesen" titel="Vorlesen nach dem Aufdecken" hinweis="Standard aus. Der Name wird erst nach dem Aufdecken vorgelesen. (Ton folgt in Etappe 5.)" />
          <Schalter k="ton" titel="Ton" hinweis="Klick der Walzen und Ansagen. Aus, wenn du selbst sprichst." />
          <Schalter k="anim" titel="Animation" hinweis="Aus: Die Silben erscheinen ohne Drehen." />
          <p className="text-xs text-slate-500">Mit Tastatur (z. B. an der digitalen Tafel): Leertaste drehen, Enter aufdecken, 1/2/3 Walze festhalten.</p>
          <Wahl titel="Schrift" wert={einst.schrift} setze={v => setze('schrift', v)} werte={[['grund', 'Grundschrift'], ['andika', 'Andika']]} />
          <div>
            <div className="font-bold text-slate-700 mb-1">Link für die Klasse</div>
            <div className="text-xs text-slate-500 mb-1">Einstellungen gelten bis zum Neuladen. Dauerhaft: diesen Link oder den QR-Code verwenden.</div>
            <div className="flex gap-2 items-center">
              <code className="flex-1 text-xs bg-slate-100 p-2 rounded-lg break-all">{link}</code>
              <button onClick={() => { navigator.clipboard && navigator.clipboard.writeText(link).catch(() => {}); setKopiert(true); setTimeout(() => setKopiert(false), 1500); }} aria-label="Link kopieren" className="w-11 h-11 rounded-lg bg-slate-100 flex items-center justify-center">{kopiert ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5" />}</button>
            </div>
            {qr && <div className="w-40 h-40 mt-2" dangerouslySetInnerHTML={{ __html: qr }} />}
          </div>
          <button onClick={onBlaetter} className="bg-violet-600 hover:bg-violet-500 text-white p-3 rounded-xl font-bold inline-flex items-center justify-center gap-2"><Printer className="w-5 h-5" /> Arbeitsblätter</button>
          <p className="text-xs text-slate-500">Tipp für das iPad: Mit dem „Geführten Zugriff“ (Einstellungen → Bedienungshilfen) bleiben die Kinder in der App.</p>
          <button onClick={onImpressum} className="text-xs text-slate-500 underline underline-offset-2 self-start">Impressum &amp; Datenschutz</button>
        </div>
      </div>
    </Modal>
  );
}

/* ============================ ARBEITSBLAETTER ============================ */
// A4 hoch, Druck über window.print(). Gleiche Silben, Sperrliste und Monster wie die App.
// Blätter: Steckbrief (2 Namen), Ausmal-Monster (2), Partnerkarten (8 Karten), Mini-Heft (Deckblatt + 5 Steckbrief-Seiten).
// Keins der Blätter hat ein Lösungsblatt (es gibt nichts eindeutig zu lösen). „Lies und verbinde“ entfällt (16.11.2026).
const BLATT_TYPEN = [
  { id: 'steckbrief', titel: 'Monster-Steckbrief', Icon: Pencil },
  { id: 'ausmalen', titel: 'Ausmal-Monster', Icon: Palette },
  { id: 'karten', titel: 'Partnerkarten', Icon: Scissors },
  { id: 'heft', titel: 'Mini-Heft', Icon: BookOpen },
];

// n verschiedene erlaubte Namen mit verschiedenen Monstern
function namenListe(einst, anzahl) {
  const frei = einst.b ? new Set(einst.b) : null;
  let vorrat = silbenVorrat(einst.stufe, frei);
  if (vorrat.zuWenig) vorrat = silbenVorrat(einst.stufe, null);
  const liste = [], namen = new Set(), monster = new Set();
  for (let v = 0; v < 500 && liste.length < anzahl; v++) {
    const n = einst.silben === 'mix' ? (Math.random() < 0.5 ? 2 : 3) : (einst.silben === '3' ? 3 : 2);
    const sil = zieheName(vorrat, n);
    if (!sil) break;
    const m = JSON.stringify(merkmaleFuerName(sil, SILBEN_MERKMALE));
    if (namen.has(sil.join('')) || monster.has(m)) continue;
    namen.add(sil.join('')); monster.add(m); liste.push(sil);
  }
  return liste;
}

// Lineatur Klasse 1 mit Häuschen (Dach = Oberlänge, Haus = Mittelband, Keller = Unterlänge), Maße in mm
function Lineatur({ breite = 170, band = 9 }) {
  const h = band * 3, x0 = 14;
  return (
    <svg viewBox={`0 0 ${breite} ${h + 2}`} style={{ width: `${breite}mm`, height: `${h + 2}mm` }} aria-hidden="true">
      <rect x={x0} y={1 + band} width={breite - x0} height={band} fill="#FFF3C4" />
      {[0, 1, 2, 3].map(i => <line key={i} x1={x0} x2={breite} y1={1 + i * band} y2={1 + i * band} stroke="#555" strokeWidth={i === 2 ? 0.6 : 0.3} />)}
      <path d={`M2 ${1 + band} L6.5 ${2.5} L11 ${1 + band} Z`} fill="#BFDBFE" stroke="#333" strokeWidth="0.4" strokeLinejoin="round" />
      <rect x="2.8" y={1 + band} width="7.4" height={band} fill="#FDE68A" stroke="#333" strokeWidth="0.4" />
      <rect x="2.8" y={1 + 2 * band} width="7.4" height={band - 1.5} fill="#D6B48A" stroke="#333" strokeWidth="0.4" />
      <rect x="5.4" y={1 + band + band * 0.45} width="2.2" height={band * 0.55} fill="#fff" stroke="#333" strokeWidth="0.3" />
    </svg>
  );
}

function BlattKopf({ Icon, titel, text, mitName = true }) {
  return (
    <div className="flex items-center gap-4 mb-[6mm]">
      <div className="flex-shrink-0 w-[22mm] h-[22mm] rounded-full border-[0.8mm] border-slate-800 flex items-center justify-center"><Icon style={{ width: '13mm', height: '13mm' }} strokeWidth={1.8} /></div>
      <div className="flex-1">
        <div className="font-bold leading-tight whitespace-nowrap" style={{ fontSize: '9mm' }}>{titel}</div>
        <div className="text-slate-600" style={{ fontSize: '3.4mm' }}>{text}</div>
      </div>
      {mitName && <div className="flex-shrink-0 flex flex-col gap-[4mm]" style={{ fontSize: '3.8mm', width: '58mm' }}>
        <div className="flex items-end gap-1">Name:<span className="flex-1 border-b border-slate-800" /></div>
        <div className="flex items-end gap-1">Datum:<span className="flex-1 border-b border-slate-800" /></div>
      </div>}
    </div>
  );
}

const Seite = ({ children }) => <div className="sheet-page bg-white text-slate-900 shadow-lg mx-auto" style={{ padding: '12mm 14mm' }}>{children}</div>;

function SteckbriefBlock({ sil, schriftKlasse, rahmenH = 56 }) {
  return (
    <div className="flex flex-col items-center gap-[3mm]">
      <SilbenName sil={sil} groesse="13mm" klasse={schriftKlasse} />
      <div className="relative border-[0.6mm] border-slate-700 rounded-[4mm]" style={{ width: '170mm', height: `${rahmenH}mm` }}>
        <Pencil className="absolute top-[2mm] left-[2mm] text-slate-400" style={{ width: '6mm', height: '6mm' }} />
      </div>
      <Lineatur />
    </div>
  );
}

function BlattSteckbrief({ namen, schriftKlasse }) {
  return (
    <Seite>
      <BlattKopf Icon={Pencil} titel="Monster-Steckbrief" text="Lies den Namen. Male das Monster, wie du es dir vorstellst. Schreibe den Namen ab." />
      <div className="flex flex-col gap-[6mm]">{namen.slice(0, 2).map((s, i) => <SteckbriefBlock key={i} sil={s} schriftKlasse={schriftKlasse} />)}</div>
    </Seite>
  );
}

function BlattAusmalen({ namen, schriftKlasse }) {
  return (
    <Seite>
      <BlattKopf Icon={Palette} titel="Ausmal-Monster" text="Lies den Namen. Male das Monster an." />
      <div className="flex flex-col items-center gap-[4mm]">
        {namen.slice(0, 2).map((s, i) => (
          <div key={i} className="flex flex-col items-center">
            <SilbenName sil={s} groesse="13mm" klasse={schriftKlasse} />
            <MonsterBild sil={s} umriss stil={{ width: '92mm' }} />
          </div>
        ))}
      </div>
    </Seite>
  );
}

function BlattKarten({ namen, schriftKlasse }) {
  return (
    <Seite>
      <BlattKopf Icon={Scissors} titel="Partnerkarten" mitName={false} text="Karten ausschneiden und in der Mitte knicken: vorne der Name, hinten das Monster. Ein Kind liest, das andere dreht die Karte um." />
      <div className="grid grid-cols-2" style={{ width: '182mm' }}>
        {namen.slice(0, 8).map((s, i) => (
          <div key={i} className="flex border-[0.4mm] border-slate-700" style={{ height: '58mm', margin: '-0.2mm 0 0 -0.2mm' }}>
            <div className="flex-1 flex items-center justify-center"><SilbenName sil={s} groesse={s.join('').length > 6 ? '8mm' : '10mm'} klasse={schriftKlasse} /></div>
            <div className="border-l-[0.4mm] border-dashed border-slate-500" />
            <div className="flex-1 flex items-center justify-center"><MonsterBild sil={s} stil={{ width: '40mm' }} /></div>
          </div>
        ))}
      </div>
      <div className="mt-[3mm] flex items-center gap-2 text-slate-500" style={{ fontSize: '3.2mm' }}><Scissors style={{ width: '4mm', height: '4mm' }} /> durchgezogene Linie: schneiden · gestrichelte Linie: knicken</div>
    </Seite>
  );
}

function BlattHeft({ namen, schriftKlasse }) {
  const seiten = namen.slice(1, 6);
  return (
    <>
      <Seite>
        <div className="flex flex-col items-center gap-[6mm] pt-[6mm]">
          <div className={`text-violet-800 ${schriftKlasse}`} style={{ fontSize: '17mm' }}>Mein Monster-Heft</div>
          <div className="flex items-end gap-2" style={{ fontSize: '6mm', width: '120mm' }}>Name:<span className="flex-1 border-b-[0.5mm] border-slate-800" /></div>
          <MonsterBild sil={namen[0]} umriss stil={{ width: '95mm' }} />
          <div className="text-slate-600 text-center" style={{ fontSize: '3.4mm' }}>Für die Lehrkraft: Auf jeder Seite einen Namen lesen, das Monster malen und den Namen abschreiben. Fertige Seiten abhaken.</div>
          <div className="flex flex-col gap-[3mm]">
            {seiten.map((s, i) => (
              <div key={i} className="flex items-center gap-[5mm]">
                <span className="font-bold" style={{ fontSize: '7mm', width: '10mm' }}>{i + 1}</span>
                <span style={{ width: '70mm' }}><SilbenName sil={s} groesse="9mm" klasse={schriftKlasse} /></span>
                <span className="border-[0.6mm] border-slate-800 rounded-[1mm]" style={{ width: '10mm', height: '10mm' }} />
              </div>
            ))}
          </div>
        </div>
      </Seite>
      {seiten.map((s, i) => (
        <Seite key={i}>
          <div className="flex justify-between items-center mb-[6mm]">
            <div className="w-[16mm] h-[16mm] rounded-full border-[0.8mm] border-slate-800 flex items-center justify-center font-bold" style={{ fontSize: '9mm' }}>{i + 1}</div>
            <div className="flex items-center gap-2 text-slate-600" style={{ fontSize: '3.4mm' }}><Pencil style={{ width: '5mm', height: '5mm' }} /> Lies den Namen. Male das Monster. Schreibe den Namen ab.</div>
          </div>
          <SteckbriefBlock sil={s} schriftKlasse={schriftKlasse} rahmenH={150} />
          <div className="flex justify-center mt-[4mm]"><Lineatur /></div>
        </Seite>
      ))}
    </>
  );
}

function ArbeitsblattGenerator({ einst, onClose, schriftKlasse }) {
  const [typ, setTyp] = useState('steckbrief');
  const [ein, setEin] = useState({ stufe: einst.stufe, silben: einst.silben, b: einst.b });
  const [runde, setRunde] = useState(0);
  const [breite, setBreite] = useState(window.innerWidth);
  useEffect(() => { const f = () => setBreite(window.innerWidth); window.addEventListener('resize', f); return () => window.removeEventListener('resize', f); }, []);
  const anzahl = { steckbrief: 2, ausmalen: 2, karten: 8, heft: 6 }[typ];
  const namen = useMemo(() => namenListe(ein, anzahl), [ein, anzahl, runde]);
  const skala = Math.min(1, (breite - 24) / 794);
  const seiten = typ === 'heft' ? 6 : 1;
  const Blatt = { steckbrief: BlattSteckbrief, ausmalen: BlattAusmalen, karten: BlattKarten, heft: BlattHeft }[typ];

  return (
    <div data-modal className="fixed inset-0 z-[260] bg-slate-200 overflow-auto print:static print:overflow-visible print:bg-white">
      <div className="no-print sticky top-0 z-10 bg-white shadow p-3 flex flex-col gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="text-xl font-bold mr-2">Arbeitsblätter</h3>
          {BLATT_TYPEN.map(({ id, titel, Icon }) => (
            <button key={id} onClick={() => setTyp(id)} className={`px-3 py-2 rounded-xl border-2 font-bold inline-flex items-center gap-2 ${typ === id ? 'bg-violet-600 border-violet-600 text-white' : 'bg-white border-slate-300 hover:border-violet-400'}`}><Icon className="w-5 h-5" />{titel}</button>
          ))}
          <div className="flex-1" />
          <button onClick={() => window.print()} className="px-5 py-3 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-bold text-lg inline-flex items-center gap-2"><Printer className="w-6 h-6" /> Drucken</button>
          <button onClick={onClose} aria-label="Schließen" className="w-11 h-11 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center"><X className="w-6 h-6" /></button>
        </div>
        <div className="flex items-center gap-4 flex-wrap text-sm">
          <Wahl titel="Stufe" wert={ein.stufe} setze={v => setEin(e => ({ ...e, stufe: v }))} werte={[['1', '1'], ['2', '2'], ['3', '3']]} />
          <Wahl titel="Silben" wert={ein.silben} setze={v => setEin(e => ({ ...e, silben: v }))} werte={[['2', '2'], ['3', '3'], ['mix', 'gemischt']]} />
          <div className="text-slate-500 max-w-xs">Buchstaben: {ein.b ? ein.b.join(' ') : 'alle der Stufe'} (wie im Lehrer-Bereich)</div>
          <button onClick={() => setRunde(r => r + 1)} className="px-4 py-2 rounded-xl border-2 border-slate-300 font-bold inline-flex items-center gap-2 hover:border-violet-400"><Shuffle className="w-5 h-5" /> Neue Aufgaben</button>
        </div>
      </div>
      <div className="py-4 print:p-0 flex justify-center">
        <div className="druck-huelle" style={{ width: 794 * skala, height: (1123 * seiten + 16 * (seiten - 1)) * skala }}>
          <div className="druck-skala flex flex-col gap-4 print:gap-0" style={{ width: 794, transform: `scale(${skala})`, transformOrigin: 'top left' }}>
            {namen.length < anzahl
              ? <Seite><p className="text-xl">Mit diesen Einstellungen gibt es nicht genug verschiedene Namen.</p></Seite>
              : <Blatt namen={namen} schriftKlasse={schriftKlasse} />}
          </div>
        </div>
      </div>
    </div>
  );
}

/* =============================== IMPRESSUM =============================== */
// Gleicher Rechtstext wie in allen Apps (übernommen aus „Die Redezeichen-Helden“), nur Name und Lizenzen angepasst.
// Änderungen nur nach Freigabe der Lehrkraft.
const IMPRESSUM_EMAIL = 'p.brandsch@ggs-roesrath.de';
const GITHUB_PRIVACY_URL = 'https://docs.github.com/de/site-policy/privacy-policies/github-general-privacy-statement';

function ImpressumModal({ onClose, section }) {
  const datenschutzRef = useRef(null);
  useEffect(() => { if (section === 'datenschutz' && datenschutzRef.current) datenschutzRef.current.scrollIntoView({ block: 'start' }); }, [section]);
  const Mail = () => <a href={`mailto:${IMPRESSUM_EMAIL}`} className="text-violet-700 underline underline-offset-2 break-all">{IMPRESSUM_EMAIL}</a>;
  const H2 = ({ children, innerRef }) => <h4 ref={innerRef} className="text-xl font-bold text-violet-800 mt-6 mb-2 scroll-mt-2">{children}</h4>;
  const H3 = ({ children }) => <h5 className="font-bold text-slate-800 mt-4 mb-1">{children}</h5>;
  return (
    <Modal onClose={onClose} breit>
      <div className="text-left text-slate-700 leading-relaxed">
        <h3 className="text-2xl md:text-3xl font-bold text-slate-900">Impressum &amp; Datenschutz</h3>
        <p className="text-slate-500 italic">Infos für Erwachsene</p>
        <H2>Impressum</H2>
        <p>Angaben gemäß § 18 Abs. 1 Medienstaatsvertrag (MStV)</p>
        <p className="mt-3">Peter Brandsch<br />Sandweg 13<br />51503 Rösrath</p>
        <p className="mt-3">E-Mail: <Mail /></p>
        <p className="mt-3">Das Silbenmonster ist ein kostenloses Lernangebot ohne Werbung.</p>
        <H3>Haftung für Inhalte</H3>
        <p>Die Inhalte dieser App wurden mit großer Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte kann ich jedoch keine Gewähr übernehmen. Hinweise auf Fehler nehme ich gern per E-Mail entgegen.</p>
        <H3>Urheberrecht und Lizenzen</H3>
        <p>
          Texte, Silben, Monster und Gestaltung der App: © 2026 Peter Brandsch.<br />
          Verwendete Bausteine anderer Urheber:<br />
          – Schriftarten „Andika“ (SIL International) und „Playwrite DE Grund“ (TypeTogether): SIL Open Font License 1.1<br />
          – Stimme „Thorsten“ (Piper, Datensatz CC0) für die Ansagen<br />
          – Symbole: Lucide (ISC-Lizenz)<br />
          – React (MIT-Lizenz), Tailwind CSS (MIT-Lizenz), qrcode-generator (MIT-Lizenz)
        </p>
        <H2 innerRef={datenschutzRef}>Datenschutz</H2>
        <H3>1. Verantwortlich</H3>
        <p>Peter Brandsch, Sandweg 13, 51503 Rösrath, E-Mail: <Mail /></p>
        <H3>2. Das Wichtigste in Kürze</H3>
        <p>Die App funktioniert ohne Anmeldung und ohne Namen. Sie setzt keine Cookies, speichert nichts im Browser und verwendet keine Analyse-, Werbe- oder Trackingdienste. Die gezogenen Monster bleiben nur, solange die Seite geöffnet ist. Es gibt kein Mikrofon und keine Spracherkennung. Schriften, Töne und Gestaltungsdateien werden direkt mit der App ausgeliefert, es werden keine Verbindungen zu Google oder anderen Drittanbietern aufgebaut. Der QR-Code im Lehrer-Bereich wird auf dem Gerät erzeugt.</p>
        <H3>3. Bereitstellung über GitHub Pages</H3>
        <p>Die App wird über GitHub Pages bereitgestellt, einen Dienst der GitHub Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA. Beim Aufruf der App verarbeitet GitHub technisch notwendige Daten, insbesondere die IP-Adresse, Datum und Uhrzeit des Abrufs sowie Angaben zum verwendeten Browser. Dies ist erforderlich, um die Seite auszuliefern und ihre Sicherheit zu gewährleisten. Dabei können Daten in die USA übermittelt werden. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Mein berechtigtes Interesse liegt in einer sicheren und zuverlässigen Bereitstellung der App. Ich selbst erhalte keine Zugriffsdaten und werte keine aus. Weitere Informationen: Datenschutzerklärung von GitHub (<a href={GITHUB_PRIVACY_URL} target="_blank" rel="noopener noreferrer" className="text-violet-700 underline underline-offset-2 break-all">{GITHUB_PRIVACY_URL}</a>).</p>
        <H3>4. Deine Rechte</H3>
        <p>Du hast das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18) und Widerspruch (Art. 21). Wende dich dazu an die oben genannte E-Mail-Adresse. Außerdem kannst du dich bei einer Datenschutz-Aufsichtsbehörde beschweren, in Nordrhein-Westfalen bei der Landesbeauftragten für Datenschutz und Informationsfreiheit NRW (LDI NRW).</p>
        <p className="mt-6 text-slate-500">Stand: November 2026</p>
      </div>
    </Modal>
  );
}

/* ================================== APP ================================== */
export default function App() {
  const [einst, setEinst] = useState(readUrlSettings);
  const [gestartet, setGestartet] = useState(false);
  const [admin, setAdmin] = useState(false); // Lehrer-Bereich offen (ohne Passwort, Entscheidung 16.11.2026)
  const [impressum, setImpressum] = useState(null);
  const [blaetter, setBlaetter] = useState(false);
  const schriftKlasse = einst.schrift === 'andika' ? 'schrift-andika' : 'schrift-grund';

  return (
    <div className={`min-h-[100dvh] bg-amber-50 text-slate-900 print:bg-white`}>
      <div className={blaetter ? 'no-print' : ''}>
      {!gestartet
        ? <StartBildschirm onStart={() => { tonWecken(); setGestartet(true); }} onImpressum={() => setImpressum('impressum')} schriftKlasse={schriftKlasse} />
        : <Automat einst={einst} onAdmin={() => setAdmin(true)} onImpressum={() => setImpressum('impressum')} schriftKlasse={schriftKlasse} />}
      </div>
      {admin && <LehrerBereich einst={einst} setEinst={setEinst} onClose={() => setAdmin(false)} onImpressum={() => { setAdmin(false); setImpressum('impressum'); }} onBlaetter={() => { setAdmin(false); setBlaetter(true); }} />}
      {blaetter && <ArbeitsblattGenerator einst={einst} onClose={() => setBlaetter(false)} schriftKlasse={schriftKlasse} />}
      {impressum && <ImpressumModal section={impressum} onClose={() => setImpressum(null)} />}
      {!blaetter && <BitteDrehen />}
    </div>
  );
}
