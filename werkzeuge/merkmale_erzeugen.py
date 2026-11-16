"""
merkmale_erzeugen.py – legt fehlende Einträge der Merkmal-Tabelle src/merkmale.json an (SILBEN_MERKMALE).

Aufruf (im Repo-Ordner):  python werkzeuge/merkmale_erzeugen.py
Abhängigkeiten: nur Python 3 (Standardbibliothek).

Grundsatz: Die Tabelle wird NUR ERGÄNZT. Bestehende Einträge werden nie geändert, damit derselbe
Name auf allen Geräten und nach jedem Update dasselbe Monster ergibt.

Jede offene Silbe (Konsonant + Vokal) bekommt [körper, farbe, augen, mund, extra, muster].
Regel für neue Einträge (Konsonant k = Index in KONS, Vokal v = Index in VOK):
  körper = k (16 Körper)          farbe  = (3·v + k) mod 10 (10 Farben, je Körper 7 verschiedene)
  augen  = k mod 8 (8 Augen)      mund   = v (7 Münder)
  extra  = 3·k mod 8 (8 Extras)   muster = v (7 Muster, 0 = keins)
Geschlossene Endsilben (Stufe 3) nutzen den Eintrag ihrer offenen Silbe (fin → fi) und bekommen
zusätzlich ein Zubehör über den Endlaut (Tabelle „endlaute“).
Kommt später ein neuer Konsonant oder Vokal hinzu, wird er hinten an KONS bzw. VOK angehängt.
"""
import json
import os

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SILBEN = os.path.join(REPO, 'src', 'silben.json')
ZIEL = os.path.join(REPO, 'src', 'merkmale.json')

KONS = ['m', 'l', 's', 'n', 'r', 'f', 'w', 'h', 'sch', 'd', 't', 'b', 'p', 'g', 'k', 'z']
VOK = ['a', 'e', 'i', 'o', 'u', 'ei', 'au']
ANZAHL = {'koerper': 16, 'farbe': 10, 'augen': 8, 'mund': 7, 'extra': 8, 'muster': 7, 'zubehoer': 7}
ENDLAUTE = {'m': 1, 'n': 2, 'l': 3, 'r': 4, 's': 5, 't': 6}


def eintrag(k, v):
    return [k, (3 * v + k) % 10, k % 8, v, (3 * k) % 8, v]


def main():
    d = json.load(open(SILBEN, encoding='utf-8'))
    if os.path.exists(ZIEL):
        t = json.load(open(ZIEL, encoding='utf-8'))
    else:
        t = {'_hinweis': 'Merkmal-Tabelle SILBEN_MERKMALE. Nur ergänzen, nie ändern! Erzeugt mit werkzeuge/merkmale_erzeugen.py. '
                         'Silbe: [körper, farbe, augen, mund, extra, muster]. endlaute: Zubehör-Nummer (0 = keins).',
             'anzahl': ANZAHL, 'endlaute': {}, 'silben': {}}
    neu = 0
    for st in d['stufen'].values():
        for k in st['konsonanten']:
            for v in st['vokale']:
                s = k + v
                if s not in t['silben']:
                    t['silben'][s] = eintrag(KONS.index(k), VOK.index(v))
                    neu += 1
        for e in st['endlaute']:
            if e not in t['endlaute']:
                t['endlaute'][e] = ENDLAUTE[e]
                neu += 1
    # Prüfen: alle Werte im erlaubten Bereich
    felder = ['koerper', 'farbe', 'augen', 'mund', 'extra', 'muster']
    for s, w in t['silben'].items():
        for f, x in zip(felder, w):
            assert 0 <= x < t['anzahl'][f], f'{s}: {f}={x} außerhalb'
    # kompakt schreiben: eine Silbe pro Zeile
    zeilen = ['{', f'  "_hinweis": {json.dumps(t["_hinweis"], ensure_ascii=False)},',
              f'  "anzahl": {json.dumps(t["anzahl"])},', f'  "endlaute": {json.dumps(t["endlaute"])},', '  "silben": {']
    items = list(t['silben'].items())
    for i, (s, w) in enumerate(items):
        zeilen.append(f'    "{s}": {json.dumps(w)}' + (',' if i < len(items) - 1 else ''))
    zeilen += ['  }', '}']
    open(ZIEL, 'w', encoding='utf-8').write('\n'.join(zeilen) + '\n')
    print(f'{len(t["silben"])} Silben in der Tabelle, {neu} neu angelegt.')


if __name__ == '__main__':
    main()
