/* ---------------------------------------------------------------------
   Monster-Baukasten (SVG) – genutzt von App, Arbeitsblättern und werkzeuge/monster_uebersicht.html
   Selbst gezeichnet, flächig, freundlich. Jedes Monster funktioniert auch als Umriss (umriss: true).
   Merkmale kommen aus src/merkmale.json (SILBEN_MERKMALE), nie aus Zufall oder Hash.
   Reihenfolge der Listen KOERPER, FARBEN, AUGEN, MUENDER, EXTRAS, MUSTER, ZUBEHOER ist Teil
   der Tabelle: nie umsortieren, nur hinten anhängen.
   --------------------------------------------------------------------- */

const LINIE = '#2b2b2b';
const SW = 4; // Strichstärke

export const FARBEN = [
  ['Grün', '#7BC67E'], ['Türkis', '#4FC1C0'], ['Blau', '#6FA8E8'], ['Lila', '#A88BE0'], ['Rosa', '#F28DB8'],
  ['Orange', '#F6A55A'], ['Gelb', '#F4D35E'], ['Koralle', '#F07E6E'], ['Mint', '#A8E0B8'], ['Sand', '#D9B38C'],
];

// Körper: d = Umriss, top = oberster Punkt, kh = halbe Kopfbreite (für Extras), ey/my = Höhe Augen/Mund,
// hw = halbe Breite auf Augenhöhe, ah = halbe Breite auf Armhöhe (y ≈ 140)
export const KOERPER = [
  { n: 'Kugel', d: 'M100 50 C138 50 168 80 168 118 C168 156 138 186 100 186 C62 186 32 156 32 118 C32 80 62 50 100 50 Z', top: 50, kh: 48, ey: 105, my: 145, hw: 64, ah: 64 },
  { n: 'Ei', d: 'M100 46 C140 46 158 100 158 130 C158 165 133 188 100 188 C67 188 42 165 42 130 C42 100 60 46 100 46 Z', top: 46, kh: 34, ey: 102, my: 142, hw: 52, ah: 58 },
  { n: 'Birne', d: 'M100 50 C126 50 136 80 140 100 C165 120 165 186 100 186 C35 186 35 120 60 100 C64 80 74 50 100 50 Z', top: 50, kh: 26, ey: 98, my: 145, hw: 40, ah: 60 },
  { n: 'Würfel', d: 'M66 56 H134 Q160 56 160 82 V158 Q160 184 134 184 H66 Q40 184 40 158 V82 Q40 56 66 56 Z', top: 56, kh: 50, ey: 104, my: 146, hw: 60, ah: 60 },
  { n: 'Gespenst', d: 'M40 184 V110 C40 72 68 50 100 50 C132 50 160 72 160 110 V184 Q150 172 140 184 Q130 172 120 184 Q110 172 100 184 Q90 172 80 184 Q70 172 60 184 Q50 172 40 184 Z', top: 50, kh: 44, ey: 102, my: 140, hw: 58, ah: 60 },
  { n: 'Wolke', d: 'M70 64 C78 44 122 44 130 64 C152 60 166 82 156 100 C172 116 166 150 148 156 C150 180 122 190 100 182 C78 190 50 180 52 156 C34 150 28 116 44 100 C34 82 48 60 70 64 Z', top: 50, kh: 34, ey: 104, my: 142, hw: 56, ah: 60 },
  { n: 'Tropfen', d: 'M100 44 C122 80 160 108 160 140 C160 172 133 188 100 188 C67 188 40 172 40 140 C40 108 78 80 100 44 Z', top: 44, kh: 12, ey: 116, my: 152, hw: 48, ah: 60 },
  { n: 'Kartoffel', d: 'M62 60 C90 42 150 50 158 100 C166 150 150 188 100 186 C55 184 34 160 40 120 C44 90 42 72 62 60 Z', top: 50, kh: 34, ey: 102, my: 144, hw: 54, ah: 60 },
  { n: 'Berg', d: 'M100 48 C114 48 168 158 164 174 C160 188 40 188 36 174 C32 158 86 48 100 48 Z', top: 48, kh: 10, ey: 122, my: 158, hw: 36, ah: 52 },
  { n: 'Glocke', d: 'M100 50 C135 50 142 90 145 130 C148 165 165 174 165 186 H35 C35 174 52 165 55 130 C58 90 65 50 100 50 Z', top: 50, kh: 30, ey: 100, my: 140, hw: 44, ah: 46 },
  { n: 'Pilz', d: 'M30 104 C30 60 70 46 100 46 C130 46 170 60 170 104 C170 118 152 120 140 120 V174 C140 186 130 188 100 188 C70 188 60 186 60 174 V120 C48 120 30 118 30 104 Z', top: 46, kh: 52, ey: 82, my: 106, hw: 62, ah: 40 },
  { n: 'Säule', d: 'M100 44 C125 44 145 64 145 89 V160 Q145 186 119 186 H81 Q55 186 55 160 V89 C55 64 75 44 100 44 Z', top: 44, kh: 34, ey: 96, my: 138, hw: 44, ah: 45 },
  { n: 'Krone', d: 'M40 184 V86 L58 60 L78 80 L100 52 L122 80 L142 60 L160 86 V184 Z', top: 54, kh: 40, ey: 110, my: 150, hw: 58, ah: 60 },
  { n: 'Breit', d: 'M100 76 C150 76 172 104 172 132 C172 164 142 186 100 186 C58 186 28 164 28 132 C28 104 50 76 100 76 Z', top: 76, kh: 44, ey: 114, my: 152, hw: 66, ah: 70 },
  { n: 'Achteck', d: 'M70 52 H130 L162 84 V154 L130 186 H70 L38 154 V84 Z', top: 52, kh: 46, ey: 102, my: 146, hw: 62, ah: 62 },
  { n: 'Sack', d: 'M70 52 C80 44 120 44 130 52 C160 80 168 150 155 176 C148 190 52 190 45 176 C32 150 40 80 70 52 Z', top: 46, kh: 30, ey: 100, my: 145, hw: 50, ah: 58 },
];

export const AUGEN = ['zwei runde', 'ein großes', 'drei', 'groß und klein', 'müde', 'mit Wimpern', 'fröhlich zu', 'Kulleraugen'];
export const MUENDER = ['Lächeln', 'Lachen', 'Zunge', 'O-Mund', 'ein Zahn', 'Grinsen', 'Wellenmund'];
export const EXTRAS = ['Hörner', 'Bärenohren', 'Fühler', 'Flügel', 'Haarbüschel', 'Hasenohren', 'Zacken', 'ein Horn'];
export const MUSTER = ['ohne Muster', 'Punkte', 'Streifen', 'Bauchfleck', 'Flecken', 'Zickzack', 'Herzchen'];
export const ZUBEHOER = ['nichts', 'Schwanz', 'Winkearme', 'Schleife', 'Schal', 'Bäckchen', 'Turnschuhe'];

const f2 = x => Math.round(x * 10) / 10;

function dunkler(hex, f = 0.78) {
  const n = parseInt(hex.slice(1), 16);
  const c = [n >> 16, (n >> 8) & 255, n & 255].map(x => Math.round(x * f));
  return '#' + c.map(x => x.toString(16).padStart(2, '0')).join('');
}

/* ---------- Merkmale aus dem Namen ---------- */
function zerlege(silbe, T) {
  if (T.silben[silbe]) return { basis: silbe, end: null };
  const e = silbe.slice(-1);
  if (T.endlaute[e] && T.silben[silbe.slice(0, -1)]) return { basis: silbe.slice(0, -1), end: e };
  return null;
}

// silben: ['lo','mu','fi'] (klein), T: Inhalt von merkmale.json → Merkmale oder null
export function merkmaleFuerName(silben, T) {
  const s = silben.map(x => x.toLowerCase());
  const a = zerlege(s[0], T), b = zerlege(s[1], T), c = s[2] ? zerlege(s[2], T) : b;
  if (!a || !b || !c || a.end) return null;
  const A = T.silben[a.basis], B = T.silben[b.basis], C = T.silben[c.basis];
  const letzte = s.length === 2 ? b : c;
  return {
    koerper: A[0], farbe: A[1], augen: B[2], mund: B[3], extra: C[4], muster: C[5],
    zubehoer: letzte.end ? T.endlaute[letzte.end] : 0,
  };
}

/* ---------- Zeichnen ---------- */
// Röhre mit Kontur (Arme, Schwanz): erst dicke dunkle, dann dünnere farbige Linie
const roehre = (d, farbe, dicke = 12) =>
  `<path d="${d}" fill="none" stroke="${LINIE}" stroke-width="${dicke + SW * 2}" stroke-linecap="round" stroke-linejoin="round"/>` +
  `<path d="${d}" fill="none" stroke="${farbe}" stroke-width="${dicke}" stroke-linecap="round" stroke-linejoin="round"/>`;

const kreis = (x, y, r, fill, extra = '') => `<circle cx="${f2(x)}" cy="${f2(y)}" r="${f2(r)}" fill="${fill}" stroke="${LINIE}" stroke-width="${SW}"${extra}/>`;

function auge(x, y, r, U, blick = [0.12, 0.1]) {
  return kreis(x, y, r, '#fff') +
    `<circle cx="${f2(x + r * blick[0])}" cy="${f2(y + r * blick[1])}" r="${f2(r * 0.48)}" fill="${LINIE}"/>` +
    `<circle cx="${f2(x + r * blick[0] + r * 0.16)}" cy="${f2(y + r * blick[1] - r * 0.2)}" r="${f2(r * 0.15)}" fill="#fff"/>`;
}

function augen(i, K, U, koerperFill) {
  const s = Math.min(1, K.hw / 46), y = K.ey, x = 100;
  switch (i) {
    case 0: return auge(x - 22 * s, y, 13 * s, U) + auge(x + 22 * s, y, 13 * s, U);
    case 1: return auge(x, y, 22 * s, U);
    case 2: return auge(x - 30 * s, y + 4, 10 * s, U) + auge(x, y - 6, 11 * s, U) + auge(x + 30 * s, y + 4, 10 * s, U);
    case 3: return auge(x - 20 * s, y, 16 * s, U) + auge(x + 25 * s, y + 3, 10 * s, U);
    case 4: {
      const r = 13 * s, lid = cx => `<path d="M${f2(cx - r - 1)} ${y} A${f2(r + 1)} ${f2(r + 1)} 0 0 1 ${f2(cx + r + 1)} ${y} Z" fill="${koerperFill}" stroke="${LINIE}" stroke-width="${SW}" stroke-linejoin="round"/>`;
      return auge(x - 22 * s, y, r, U, [0, 0.3]) + lid(x - 22 * s) + auge(x + 22 * s, y, r, U, [0, 0.3]) + lid(x + 22 * s);
    }
    case 5: {
      const e = cx => `<ellipse cx="${f2(cx)}" cy="${y}" rx="${f2(9 * s)}" ry="${f2(13 * s)}" fill="#fff" stroke="${LINIE}" stroke-width="${SW}"/>` +
        `<ellipse cx="${f2(cx + 1)}" cy="${f2(y + 3 * s)}" rx="${f2(4.5 * s)}" ry="${f2(6.5 * s)}" fill="${LINIE}"/>` +
        `<circle cx="${f2(cx + 3 * s)}" cy="${f2(y)}" r="${f2(1.8 * s)}" fill="#fff"/>` +
        [-8, 0, 8].map(dx => `<line x1="${f2(cx + dx * s * 0.7)}" y1="${f2(y - 12 * s)}" x2="${f2(cx + dx * s * 1.1)}" y2="${f2(y - 19 * s)}" stroke="${LINIE}" stroke-width="3" stroke-linecap="round"/>`).join('');
      return e(x - 20 * s) + e(x + 20 * s);
    }
    case 6: {
      const b = cx => `<path d="M${f2(cx - 11 * s)} ${f2(y + 4)} Q${f2(cx)} ${f2(y - 10)} ${f2(cx + 11 * s)} ${f2(y + 4)}" fill="none" stroke="${LINIE}" stroke-width="${SW + 0.5}" stroke-linecap="round"/>`;
      return b(x - 22 * s) + b(x + 22 * s);
    }
    case 7: return auge(x - 15 * s, y, 15 * s, U, [0.05, -0.3]) + auge(x + 15 * s, y, 15 * s, U, [0.05, -0.3]);
  }
  return '';
}

function mund(i, K, U) {
  const s = Math.min(1, K.hw / 46), x = 100, y = K.my;
  const innen = U ? '#fff' : '#7a2638', zunge = U ? '#fff' : '#F28DB8';
  const P = (d, fill = 'none', w = SW) => `<path d="${d}" fill="${fill}" stroke="${LINIE}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
  const X = v => f2(x + v * s), Y = v => f2(y + v * s);
  switch (i) {
    case 0: return P(`M${X(-18)} ${Y(0)} Q${X(0)} ${Y(16)} ${X(18)} ${Y(0)}`);
    case 1: return P(`M${X(-20)} ${Y(-2)} Q${X(0)} ${Y(26)} ${X(20)} ${Y(-2)} Z`, innen) +
      `<ellipse cx="${X(0)}" cy="${Y(7)}" rx="${f2(7 * s)}" ry="${f2(3.5 * s)}" fill="${zunge}" stroke="${LINIE}" stroke-width="2"/>`;
    case 2: return P(`M${X(-7)} ${Y(5)} V${Y(13)} A${f2(7 * s)} ${f2(7 * s)} 0 0 0 ${X(7)} ${Y(13)} V${Y(5)}`, zunge) +
      P(`M${X(-18)} ${Y(0)} Q${X(0)} ${Y(14)} ${X(18)} ${Y(0)}`);
    case 3: return `<ellipse cx="${X(0)}" cy="${Y(4)}" rx="${f2(8 * s)}" ry="${f2(10 * s)}" fill="${innen}" stroke="${LINIE}" stroke-width="${SW}"/>`;
    case 4: return P(`M${X(-5)} ${Y(6.5)} V${Y(15)} H${X(5)} V${Y(6.5)}`, '#fff', 2.5) + P(`M${X(-20)} ${Y(0)} Q${X(0)} ${Y(16)} ${X(20)} ${Y(0)}`);
    case 5: return P(`M${X(-24)} ${Y(-2)} Q${X(0)} ${Y(24)} ${X(24)} ${Y(-2)} Z`, innen) +
      P(`M${X(-13)} ${Y(1)} V${Y(7)} H${X(-4)} V${Y(1.6)}`, '#fff', 2.5) + P(`M${X(4)} ${Y(1.6)} V${Y(7)} H${X(13)} V${Y(1)}`, '#fff', 2.5);
    case 6: return P(`M${X(-18)} ${Y(3)} q${f2(6 * s)} ${f2(-8 * s)} ${f2(12 * s)} 0 t${f2(12 * s)} 0 t${f2(12 * s)} 0`);
  }
  return '';
}

// Extras sitzen HINTER dem Körper (der Körper verdeckt den Ansatz)
function extra(i, K, U, fill) {
  const T = K.top, kh = K.kh, hell = U ? '#fff' : '#FFF1D0', innen = U ? '#fff' : '#F7B7C8';
  const P = (d, f) => `<path d="${d}" fill="${f}" stroke="${LINIE}" stroke-width="${SW}" stroke-linejoin="round" stroke-linecap="round"/>`;
  switch (i) {
    case 0: return [-1, 1].map(r => {
      const bx = 100 + r * Math.max(kh * 0.6, 14);
      // rechtes Horn, links genau gespiegelt (alle x-Abstände mal r)
      return P(`M${f2(bx - 10 * r)} ${T + 22} Q${f2(bx - 11 * r)} ${T - 6} ${f2(bx + 8 * r)} ${T - 24} Q${f2(bx + 9 * r)} ${T - 2} ${f2(bx + 10 * r)} ${T + 22} Z`, hell);
    }).join('');
    case 1: return [-1, 1].map(r => {
      const bx = 100 + r * (kh * 0.75 + 8);
      return kreis(bx, T + 8, 17, fill) + kreis(bx, T + 8, 8, innen, ' stroke-width="2.5"');
    }).join('');
    case 2: return [-1, 1].map(r =>
      `<path d="M${100 + r * 8} ${T + 14} Q${100 + r * 14} ${T - 12} ${100 + r * 28} ${T - 26}" fill="none" stroke="${LINIE}" stroke-width="${SW}" stroke-linecap="round"/>` +
      kreis(100 + r * 28, T - 26, 8, fill)).join('');
    case 3: return [-1, 1].map(r => {
      const wx = 100 + r * (K.hw - 8), y = K.ey + 4, aus = r * Math.min(48, 100 - 8 - (K.hw - 8));
      return P(`M${wx} ${y} C${f2(wx + aus * 0.6)} ${y - 46} ${f2(wx + aus)} ${y - 30} ${f2(wx + aus)} ${y - 10} C${f2(wx + aus * 0.8)} ${y + 2} ${f2(wx + aus * 0.5)} ${y + 18} ${wx} ${y + 30} Z`, U ? '#fff' : '#E4F1FF');
    }).join('');
    case 4: return [-16, 0, 16].map((dx, j) =>
      P(`M${100 + dx - 8} ${T + 16} C${100 + dx - 12} ${T - 6} ${100 + dx + 4} ${T - 18 - (j === 1 ? 6 : 0)} ${100 + dx + 10} ${T - 12 - (j === 1 ? 6 : 0)} C${100 + dx + 2} ${T - 6} ${100 + dx + 6} ${T + 4} ${100 + dx + 8} ${T + 16} Z`, U ? '#fff' : dunkler(fill, 0.8))).join('');
    case 5: return [-1, 1].map(r => {
      const bx = 100 + r * (Math.min(kh, 30) * 0.5 + 8);
      return `<g transform="rotate(${r * 14} ${bx} ${T + 10})"><ellipse cx="${bx}" cy="${T - 18}" rx="11" ry="30" fill="${fill}" stroke="${LINIE}" stroke-width="${SW}"/>` +
        `<ellipse cx="${bx}" cy="${T - 18}" rx="5" ry="20" fill="${innen}"/></g>`;
    }).join('');
    case 6: return [-22, 0, 22].map(dx => {
      const h = dx === 0 ? 26 : 18;
      return P(`M${100 + dx - 11} ${T + 18} Q${100 + dx - 4} ${T - h + 6} ${100 + dx} ${T - h} Q${100 + dx + 4} ${T - h + 6} ${100 + dx + 11} ${T + 18} Z`, hell);
    }).join('');
    case 7: return P(`M88 ${T + 20} Q92 ${T - 10} 100 ${T - 36} Q108 ${T - 10} 112 ${T + 20} Z`, hell) +
      `<path d="M92 ${T + 2} L106 ${T - 6} M95 ${T - 12} L104 ${T - 18}" stroke="${LINIE}" stroke-width="2.5" stroke-linecap="round"/>`;
  }
  return '';
}

function muster(i, K, U, fill) {
  const f = U ? 'none' : dunkler(fill, 0.86), st = U ? ` stroke="${LINIE}" stroke-width="2.5"` : '';
  switch (i) {
    case 1: {
      let o = '';
      for (let y = 58; y < 190; y += 26) for (let x = 40 + ((y / 26) % 2) * 13; x < 170; x += 26) o += `<circle cx="${x}" cy="${y}" r="6"${st} fill="${f}"/>`;
      return o;
    }
    case 2: {
      let o = '';
      for (let y = 62; y < 190; y += 28) o += U ? `<line x1="20" y1="${y}" x2="180" y2="${y}"${st}/><line x1="20" y1="${y + 12}" x2="180" y2="${y + 12}"${st}/>` : `<rect x="20" y="${y}" width="160" height="12" fill="${f}"/>`;
      return o;
    }
    case 3: return `<ellipse cx="100" cy="${K.my + 34}" rx="${f2(K.ah * 0.62)}" ry="30" fill="${U ? 'none' : '#ffffff'}" fill-opacity="0.5"${U ? st : ''}/>`;
    case 4: return [[52, 80, 14], [146, 104, 12], [60, 160, 16], [138, 170, 11], [100, 62, 9]].map(([x, y, r]) =>
      `<path d="M${x - r} ${y} C${x - r} ${y - r * 1.2} ${x + r * 0.6} ${y - r * 1.1} ${x + r} ${y - r * 0.2} C${x + r * 1.3} ${y + r * 0.8} ${x - r * 0.2} ${y + r * 1.3} ${x - r} ${y} Z" fill="${f}"${st}/>`).join('');
    case 5: {
      let o = '';
      for (let y = 70; y < 190; y += 34) {
        let d = `M20 ${y}`;
        for (let x = 20; x < 180; x += 16) d += ` L${x + 8} ${y - 8} L${x + 16} ${y}`;
        o += `<path d="${d}" fill="none" stroke="${U ? LINIE : f}" stroke-width="${U ? 2.5 : 7}" stroke-linejoin="round"/>`;
      }
      return o;
    }
    case 6: return [[50, 74], [148, 88], [56, 150], [144, 156], [100, 176], [70, 112], [132, 128]].map(([x, y]) =>
      `<path d="M${x} ${y + 6} C${x - 10} ${y - 2} ${x - 6} ${y - 10} ${x} ${y - 5} C${x + 6} ${y - 10} ${x + 10} ${y - 2} ${x} ${y + 6} Z" fill="${f}"${st}/>`).join('');
  }
  return '';
}

// Zubehör hinten (vor dem Körper zeichnen) und vorne (danach)
function zubehoerHinten(i, K, U, fill) {
  if (i === 1) return roehre(`M${f2(100 + K.ah * 0.6)} 170 C190 180 196 140 176 124`, U ? '#fff' : fill) + kreis(176, 124, 8, U ? '#fff' : dunkler(fill, 0.85));
  if (i === 2) {
    const l = 100 - K.ah + 8, r = 100 + K.ah - 8;
    return roehre(`M${l} 142 Q${l - 18} 152 ${l - 22} 170`, U ? '#fff' : fill, 11) + kreis(l - 22, 172, 8, U ? '#fff' : fill) +
      roehre(`M${r} 136 Q${r + 20} 128 ${r + 22} 104`, U ? '#fff' : fill, 11) + kreis(r + 22, 100, 8, U ? '#fff' : fill);
  }
  return '';
}

function zubehoerVorne(i, K, U, fill, clipId) {
  if (i === 3) {
    const x = 100 + Math.max(K.kh * 0.7, 18), y = K.top + 14, c = U ? '#fff' : '#E84D8A';
    return `<path d="M${x} ${y} L${x - 16} ${y - 10} L${x - 16} ${y + 10} Z M${x} ${y} L${x + 16} ${y - 10} L${x + 16} ${y + 10} Z" fill="${c}" stroke="${LINIE}" stroke-width="3" stroke-linejoin="round"/>` + kreis(x, y, 5, c, ' stroke-width="3"');
  }
  if (i === 4) {
    const y = K.my + 22, c = U ? '#fff' : '#E9573F', x = 100 + K.ah * 0.35;
    return `<g clip-path="url(#${clipId})"><rect x="10" y="${y}" width="180" height="15" fill="${c}" stroke="${LINIE}" stroke-width="${SW}"/></g>` +
      `<path d="M${f2(x - 8)} ${y + 8} L${f2(x + 8)} ${y + 8} L${f2(x + 12)} ${y + 40} L${f2(x - 4)} ${y + 40} Z" fill="${c}" stroke="${LINIE}" stroke-width="3" stroke-linejoin="round"/>` +
      `<path d="M${f2(x - 2)} ${y + 40} v6 M${f2(x + 4)} ${y + 40} v6 M${f2(x + 10)} ${y + 40} v6" stroke="${LINIE}" stroke-width="2.5" stroke-linecap="round"/>`;
  }
  if (i === 5) {
    const dx = Math.min(K.hw * 0.68, 40), y = K.my - 8;
    return [-1, 1].map(r => `<circle cx="${f2(100 + r * dx)}" cy="${y}" r="9" fill="${U ? 'none' : '#F58BA0'}" fill-opacity="0.65"${U ? ` stroke="${LINIE}" stroke-width="2" stroke-dasharray="3 3"` : ''}/>` +
      [[-4, -2], [3, -3], [0, 3]].map(([a, b]) => `<circle cx="${f2(100 + r * dx + a)}" cy="${y + b}" r="1.6" fill="${LINIE}"/>`).join('')).join('');
  }
  if (i === 6) {
    const c = U ? '#fff' : '#3D6FD1';
    return [78, 122].map(x => `<path d="M${x - 20} 198 C${x - 20} 186 ${x - 12} 182 ${x - 2} 184 C${x + 10} 186 ${x + 20} 190 ${x + 20} 198 Z" fill="${c}" stroke="${LINIE}" stroke-width="${SW}" stroke-linejoin="round"/>` +
      `<line x1="${x - 18}" y1="198" x2="${x + 18}" y2="198" stroke="${LINIE}" stroke-width="${SW}" stroke-linecap="round"/>` +
      `<path d="M${x - 6} 187 l4 4 M${x} 186 l4 4" stroke="${U ? LINIE : '#fff'}" stroke-width="2" stroke-linecap="round"/>`).join('');
  }
  return '';
}

let zaehler = 0;
// m: Merkmale (merkmaleFuerName oder von Hand), opt: { umriss, groesse, titel }
export function monsterSvg(m, opt = {}) {
  const U = !!opt.umriss, K = KOERPER[m.koerper], fill = U ? '#fff' : FARBEN[m.farbe][1];
  const id = 'mk' + (++zaehler);
  const fuesse = m.zubehoer === 6 ? '' : [80, 120].map(x => `<ellipse cx="${x}" cy="${f2(Math.min(K.top + 146, 192))}" rx="15" ry="9" fill="${U ? '#fff' : dunkler(fill, 0.85)}" stroke="${LINIE}" stroke-width="${SW}"/>`).join('');
  const g = opt.groesse ? ` width="${opt.groesse}" height="${f2(opt.groesse * 1.05)}"` : '';
  return `<svg viewBox="0 0 200 210" xmlns="http://www.w3.org/2000/svg"${g} role="img"${opt.titel ? ` aria-label="${opt.titel}"` : ''}>` +
    // Muster nur auf dem Körper (clipPath) und nicht im Gesicht (mask), damit Augen und Mund frei bleiben
    `<defs><clipPath id="${id}"><path d="${K.d}"/></clipPath><mask id="${id}g"><rect x="0" y="0" width="200" height="210" fill="#fff"/>` +
    `<ellipse cx="100" cy="${f2((K.ey + K.my) / 2)}" rx="${f2(Math.min(K.hw, 46) + 6)}" ry="${f2((K.my - K.ey) / 2 + 24)}" fill="#000"/></mask></defs>` +
    extra(m.extra, K, U, fill) + zubehoerHinten(m.zubehoer, K, U, fill) + fuesse +
    `<path d="${K.d}" fill="${fill}"/>` +
    `<g clip-path="url(#${id})"><g mask="url(#${id}g)">${muster(m.muster, K, U, fill)}</g></g>` +
    `<path d="${K.d}" fill="none" stroke="${LINIE}" stroke-width="${SW}" stroke-linejoin="round"/>` +
    zubehoerVorne(m.zubehoer, K, U, fill, id) +
    augen(m.augen, K, U, fill) + mund(m.mund, K, U) +
    `</svg>`;
}
