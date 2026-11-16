"""
silben_check.py – prüft Silbenvorrat, Regeln und Sperrliste der App (src/silben.json).

Aufruf (im Repo-Ordner):
    python werkzeuge/silben_check.py                 Prüfung + Bericht werkzeuge/silben_bericht.md
    python werkzeuge/silben_check.py --stichprobe 50 --seed 7
    python werkzeuge/silben_check.py --test          nur Gegenprobe der Regeln (schnell)

Abhängigkeiten: nur Python 3 (Standardbibliothek).

Was geprüft wird:
- Jede Silbe besteht nur aus freigegebenen Graphemen der Stufe (Konsonant + Vokal, Stufe 3 am Ende + Endlaut).
- Beim Zusammensetzen entstehen keine neuen Grapheme über die Silbengrenze (z. B. e + i = „ei“).
- Erzeugt ALLE möglichen Namen jeder Stufe (2 und 3 Silben) und zählt, was die Regeln und
  die Sperrliste aussortieren: keine gleiche Silbe direkt hintereinander, geschlossene Silbe nur am Ende,
  „unpassend“ irgendwo im Namen, ganze Namen aus echte_woerter/vornamen/lesestart/lehrkraft.
- Stichprobe: zieht Namen genau so, wie es die App tun soll (Walze für Walze, gesperrte Namen neu ziehen).
Die Regeln hier und in src/App.jsx müssen gleich bleiben (Funktion namenErlaubt).
Exit-Code 1, wenn ein Fehler gefunden wurde.
"""
import argparse
import json
import os
import random
import re
import sys
import time

HIER = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(HIER)
DATEN = os.path.join(REPO, 'src', 'silben.json')
LESESTART_APP = os.path.join(REPO, '..', '..', 'Lesestart App', 'lesestart', 'src', 'App.jsx')

MEHRZEICHEN = ['sch', 'ei', 'au']
VOKALE_ALLE = ['a', 'e', 'i', 'o', 'u', 'ei', 'au']


def tok(s):
    """Zerlegt in Grapheme (sch, ei, au zuerst) – wie tok() in Lesestart."""
    t, i = [], 0
    while i < len(s):
        g = next((x for x in MEHRZEICHEN if s.startswith(x, i)), s[i])
        t.append(g)
        i += len(g)
    return t


def flach(eintrag):
    return eintrag.replace('-', '').lower()


def gross(silben):
    """Anzeige wie in der App: erste Silbe groß, Rest klein."""
    s = [x for x in silben]
    s[0] = s[0][0].upper() + s[0][1:]
    return s


def lade():
    with open(DATEN, encoding='utf-8') as f:
        return json.load(f)


class Pruefer:
    def __init__(self, d):
        self.d = d
        self.regeln = d['regeln']
        sp = d['sperrliste']
        self.unpassend = [flach(x) for x in sp['unpassend']]
        self.unpassend_re = re.compile('|'.join(sorted(self.unpassend, key=len, reverse=True)))
        self.unpassende_silben = set(sp['unpassende_silben'])
        self.ganz = {}
        for liste in ['echte_woerter', 'vornamen', 'lesestart', 'lehrkraft']:
            for x in sp[liste]:
                self.ganz.setdefault(flach(x), liste)

    def silben(self, stufe, buchstaben=None):
        """Offene und geschlossene Silben einer Stufe, ggf. eingeschränkt auf freigegebene Buchstaben."""
        st = self.d['stufen'][str(stufe)]
        ok = (lambda g: True) if buchstaben is None else (lambda g: g in buchstaben)
        kons = [k for k in st['konsonanten'] if ok(k)]
        vok = [v for v in st['vokale'] if ok(v)]
        end = [e for e in st['endlaute'] if ok(e)]
        offen = [k + v for k in kons for v in vok]
        nicht_nach = st.get('endlaut_nicht_nach', {})
        zu = [k + v + e for k in kons for v in vok for e in end if v not in nicht_nach.get(e, [])]
        offen = [s for s in offen if s not in self.unpassende_silben]
        zu = [s for s in zu if s not in self.unpassende_silben]
        return offen, zu, kons, vok

    def grund(self, silben, offen_set):
        """None = erlaubt, sonst Grund der Sperre. Entspricht namenErlaubt() in der App."""
        r = self.regeln
        if r['keine_gleiche_silbe_direkt_hintereinander']:
            for a, b in zip(silben, silben[1:]):
                if a == b:
                    return 'gleiche Silbe hintereinander'
        if r['geschlossene_silbe_nur_am_ende']:
            for s in silben[:-1]:
                if s not in offen_set:
                    return 'geschlossene Silbe nicht am Ende'
        if r['e_nur_in_letzter_silbe']:
            for s in silben[:-1]:
                if tok(s)[-1] == 'e':
                    return 'e nicht in letzter Silbe'
        name = ''.join(silben)
        if self.unpassend_re.search(name):
            return 'unpassend'
        if name in self.ganz:
            return self.ganz[name]
        return None


def pruefe_daten(d, p, fehler, hinweise):
    st = d['stufen']
    # Grapheme der Stufen
    for n, s in st.items():
        for k in s['konsonanten']:
            if k in VOKALE_ALLE or len(tok(k)) != 1:
                fehler.append(f'Stufe {n}: „{k}“ ist kein einzelner Konsonant.')
        for v in s['vokale']:
            if v not in VOKALE_ALLE:
                fehler.append(f'Stufe {n}: „{v}“ ist kein freigegebener Vokal.')
    # Stufen bauen aufeinander auf
    for a, b in [('1', '2'), ('2', '3')]:
        for feld in ['konsonanten', 'vokale']:
            fehlt = set(st[a][feld]) - set(st[b][feld])
            if fehlt:
                fehler.append(f'Stufe {b} enthält nicht alle {feld} von Stufe {a}: {sorted(fehlt)}')
    # Sperrliste: doppelte Einträge
    sp = d['sperrliste']
    gesehen = {}
    for liste in ['unpassend', 'echte_woerter', 'vornamen', 'lehrkraft']:
        for x in sp[liste]:
            f = flach(x)
            if f in gesehen:
                hinweise.append(f'„{x}“ steht doppelt ({gesehen[f]} und {liste}).')
            gesehen[f] = liste
    # Lesestart-Liste aktuell?
    if os.path.exists(LESESTART_APP):
        s = open(LESESTART_APP, encoding='utf-8').read()
        a = s.find('const WORD_LIST')
        if a >= 0:
            b = s.index('];', a)
            akt = {flach(m) for m in re.findall(r"\['[a-z]+', '[^']+', '[^']*', '([^']+)'", s[a:b])}
            bei_uns = {flach(x) for x in sp['lesestart']}
            neu = akt - bei_uns
            if neu:
                hinweise.append(f'Lesestart-WORD_LIST hat neue Wörter, bitte in „lesestart“ nachtragen: {sorted(neu)}')
    else:
        hinweise.append('Lesestart-App nicht gefunden, Abgleich der WORD_LIST übersprungen.')


def pruefe_grenzen(p, stufe, fehler):
    """Keine neuen Grapheme über die Silbengrenze und nur Grapheme der Stufe."""
    offen, zu, kons, vok = p.silben(stufe)
    erlaubt = set(kons) | set(vok) | set(p.d['stufen'][str(stufe)]['endlaute'])
    for s in offen + zu:
        for g in tok(s):
            if g not in erlaubt:
                fehler.append(f'Stufe {stufe}: Silbe „{s}“ enthält „{g}“.')
    for a in offen:
        for b in offen + zu:
            if tok(a + b) != tok(a) + tok(b):
                fehler.append(f'Stufe {stufe}: {a}+{b} ergibt neue Grapheme ({tok(a + b)}).')


def zaehle(p, stufe):
    """Erzeugt alle Namen mit 2 und 3 Silben und zählt Sperrgründe."""
    offen, zu, _, _ = p.silben(stufe)
    offen_set = set(offen)
    letzte = offen + zu
    erg = {}
    treffer = {}  # erreichte Einträge der Ganz-Listen und unpassend
    for n in p.regeln['silbenzahl']:
        gruende, gesamt = {}, 0
        if n == 2:
            vorne = [(a,) for a in offen]
        else:
            vorne = [(a, b) for a in offen for b in offen]
        for v in vorne:
            for z in letzte:
                gesamt += 1
                silben = v + (z,)
                g = p.grund(silben, offen_set)
                if g:
                    gruende[g] = gruende.get(g, 0) + 1
                    if g != 'gleiche Silbe hintereinander' and g != 'e nicht in letzter Silbe':
                        name = ''.join(silben)
                        key = name if g != 'unpassend' else p.unpassend_re.search(name).group(0)
                        treffer.setdefault((g, key), 0)
                        treffer[(g, key)] += 1
        erg[n] = (gesamt, gruende)
    return offen, zu, erg, treffer


def ziehe(p, stufe, n, rng, buchstaben=None):
    """So soll die App ziehen: Walze für Walze, bei Sperre den ganzen Namen neu ziehen."""
    offen, zu, _, _ = p.silben(stufe, buchstaben)
    offen_set = set(offen)
    for _ in range(1000):
        silben = tuple(rng.choice(offen) for _ in range(n - 1)) + (rng.choice(offen + zu),)
        if p.grund(silben, offen_set) is None:
            return silben
    return None


def gegenprobe(p):
    fehler = []
    o1 = set(p.silben(1)[0])
    o3 = set(p.silben(3)[0])
    soll_gesperrt = [
        (('ka', 'ka'), o1), (('lo', 'na', 'zi'), set(p.silben(2)[0])), (('ro', 'se'), o1),
        (('ni', 'na'), o1), (('ma', 'ma'), o1), (('lo', 'mu', 'mu'), o1),
        (('lu', 'kas'), o3), (('fin', 'lo'), o3), (('sa', 'tan'), o3),
    ]
    soll_erlaubt = [(('lo', 'mu', 'fi'), o1), (('me', 'lo'), o1), (('ra', 'bot'), o3), (('lo', 'mu', 'fin'), o3)]
    for s, o in soll_gesperrt:
        if p.grund(s, o) is None:
            fehler.append(f'Gegenprobe: {"-".join(s)} müsste gesperrt sein.')
    for s, o in soll_erlaubt:
        g = p.grund(s, o)
        if g:
            fehler.append(f'Gegenprobe: {"-".join(s)} müsste erlaubt sein (gesperrt: {g}).')
    for s in ['feir', 'baur', 'schaur'] + list(p.unpassende_silben):
        if s in o3 or s in p.silben(3)[1]:
            fehler.append(f'Gegenprobe: Silbe {s} müsste fehlen.')
    return fehler


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--stichprobe', type=int, default=50)
    ap.add_argument('--seed', type=int, default=1)
    ap.add_argument('--bericht', default=os.path.join(HIER, 'silben_bericht.md'))
    ap.add_argument('--test', action='store_true')
    a = ap.parse_args()

    d = lade()
    p = Pruefer(d)
    fehler, hinweise = [], []
    fehler += gegenprobe(p)
    if a.test:
        print('\n'.join(fehler) or 'Gegenprobe in Ordnung.')
        sys.exit(1 if fehler else 0)

    pruefe_daten(d, p, fehler, hinweise)
    rng = random.Random(a.seed)
    out = [f'# Silben-Check – Stand der Daten {d.get("stand", "?")}', '',
           f'Erzeugt mit `python werkzeuge/silben_check.py --stichprobe {a.stichprobe} --seed {a.seed}`.', '']
    alle_treffer = {}
    for stufe in ['1', '2', '3']:
        t0 = time.time()
        pruefe_grenzen(p, stufe, fehler)
        offen, zu, erg, treffer = zaehle(p, stufe)
        for k, v in treffer.items():
            alle_treffer.setdefault(k, set()).add(stufe)
        out.append(f'## Stufe {stufe}')
        out.append(f'{len(offen)} offene Silben' + (f', {len(zu)} geschlossene Endsilben' if zu else '') + '.')
        out.append('')
        out.append('| Silben | alle Kombinationen | erlaubt | gesperrt davon: |')
        out.append('|---|---|---|---|')
        for n, (gesamt, gr) in erg.items():
            gesperrt = sum(gr.values())
            gtxt = ', '.join(f'{k} {v}' for k, v in sorted(gr.items(), key=lambda x: -x[1]))
            out.append(f'| {n} | {gesamt:,} | {gesamt - gesperrt:,} | {gtxt} |'.replace(',', '.'))
        out.append('')
        halb = a.stichprobe // 2
        probe = [ziehe(p, stufe, 2, rng) for _ in range(halb)] + [ziehe(p, stufe, 3, rng) for _ in range(a.stichprobe - halb)]
        out.append(f'**Stichprobe ({a.stichprobe} Namen, je zur Hälfte 2 und 3 Silben)** – so stehen sie auf den Walzen, dahinter der Name:')
        out.append('')
        zeilen = [f'{" | ".join(gross(s))} → {"".join(gross(s))}' for s in probe]
        for i in range(0, len(zeilen), 5):
            out.append(' · '.join(zeilen[i:i + 5]) + '  ')
        out.append('')
        print(f'Stufe {stufe}: fertig in {time.time() - t0:.1f} s')

    # Sperrliste mit Wirkung
    out.append('## Sperrliste')
    out.append('In Klammern: In welchen Stufen der Eintrag tatsächlich greift. „–“ heißt, der Name entsteht ohnehin nicht (z. B. Vokal am Anfang, Konsonantenhäufung, oder schon durch die Regel „gleiche Silbe“ gesperrt wie Ma-ma); der Eintrag schadet aber nicht.')
    out.append('')
    sp = d['sperrliste']
    titel = {'unpassend': 'Unpassend (sperrt auch als Teil eines Namens)', 'echte_woerter': 'Echte Wörter (ganzer Name)',
             'vornamen': 'Vornamen (ganzer Name)', 'lesestart': 'Lesestart-Wörter (ganzer Name)', 'lehrkraft': 'Nachträge der Lehrkraft (ganzer Name)'}
    for liste, t in titel.items():
        teile = []
        for x in sp[liste]:
            f = flach(x)
            stufen = sorted({s for (g, k), ss in alle_treffer.items() if k == f for s in ss})
            teile.append(f'{x} ({",".join(stufen) if stufen else "–"})')
        out.append(f'**{t}:** ' + (', '.join(teile) if teile else '(leer)'))
        out.append('')
    out.append('**Gesperrte Einzelsilben** (werden nie gezogen): ' + ', '.join(sp['unpassende_silben']))
    out.append('')
    if hinweise:
        out.append('## Hinweise')
        out += [f'- {h}' for h in hinweise]
        out.append('')
    out.append('## Ergebnis')
    out.append('Keine Fehler.' if not fehler else '\n'.join(f'- FEHLER: {f}' for f in fehler))
    with open(a.bericht, 'w', encoding='utf-8') as f:
        f.write('\n'.join(out) + '\n')
    print(f'Bericht: {a.bericht}')
    for h in hinweise:
        print('Hinweis:', h)
    for f in fehler:
        print('FEHLER:', f)
    sys.exit(1 if fehler else 0)


if __name__ == '__main__':
    main()
