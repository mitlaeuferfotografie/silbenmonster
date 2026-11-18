# Silbenmonster

Ein Silben-Spielautomat für Klasse 1. Ein Hebel lässt zwei oder drei Silbenwalzen drehen, es entsteht ein Fantasie-Monstername wie „Lomufi“. Das Kind liest den Namen und deckt danach das passende Monster auf.

Fantasiewörter lassen sich nicht über ein Bild oder den Zusammenhang erraten. Das Kind muss die Silben wirklich erlesen und zusammenziehen.

Angeregt durch die „Monstermaschine“ von @frau_behrens_ (Instagram). Eigene Umsetzung: Name, Monster, Gestaltung und Silbenvorrat sind selbst erstellt.

**Live:** https://mitlaeuferfotografie.github.io/silbenmonster/

## Lehrplanbezug

- Lehrplan für die Primarstufe in NRW, Fach Deutsch (2021), Bereich **Lesen – mit Texten und Medien umgehen**, Schwerpunkt *Über Lesefähigkeiten verfügen*, Kompetenzerwartungen am Ende der Schuleingangsphase (S. 23). Die Schülerinnen und Schüler
  - „identifizieren häufig wiederkehrende Morpheme (u. a. ver-, vor-, nach- als Präfixe, bekannte Stamm-Morpheme) und Silben auf einen Blick“,
  - „erlesen Texte durch die Identifikation von Wörtern und Sätzen“.

  Das Silbenmonster übt vor allem das schnelle Erkennen wiederkehrender Silben und das Zusammenziehen zu einem (Fantasie-)Wort als Grundlage dafür.
- Medienkompetenzrahmen NRW: 1.2 Digitale Werkzeuge (eine Lern-App zielgerichtet bedienen).

## Einsatz

- **Digitale Tafel** mit der ganzen Klasse: Die Klasse liest im Chor oder ein Kind liest vor, danach wird aufgedeckt. Mit Tastatur: Leertaste drehen, Enter aufdecken, 1/2/3 Walze festhalten.
- **iPad**, allein oder zu zweit: erst lesen, dann das Monster aufdecken.
- **Arbeitsblätter** zum Ausdrucken.

Die App kann nicht prüfen, ob richtig gelesen wurde (keine Spracherkennung). Deshalb gibt es keine Sterne und keine Punkte, und alles ist frei.

## Bedienung

1. Play-Knopf antippen.
2. Auf den roten Hebel tippen: Die Walzen halten von links nach rechts an. Darunter steht der Name in Silbenfarben (erste Silbe blau, dann rot) mit Silbenbögen.
3. Den Namen lesen, dann auf das „?“ tippen: Das Monster erscheint.
4. **Walze festhalten:** Eine Walze antippen, sie bekommt ein Schloss und dreht nicht mit. So entstehen Reihen wie Lo-mu, Lo-ma, Lo-mi.
5. Unten sammeln sich die Monster dieses Durchgangs. Antippen zeigt sie noch einmal groß.

Derselbe Name ergibt immer dasselbe Monster. Die erste Silbe bestimmt Körper und Farbe, die zweite Augen und Mund, die dritte Extras und Muster. Alle Monster, die mit „Lo“ anfangen, haben denselben Körper.

## Stufen

| Stufe | Buchstaben | Silben |
|---|---|---|
| 1 | m l s n r f w h sch, a e i o u | nur offene Silben (ma, lo) |
| 2 | dazu d t b p g k z, ei, au | nur offene Silben |
| 3 | wie Stufe 2 | die letzte Silbe darf geschlossen sein (Ra-bot) |

Eine Sperrliste sortiert echte Wörter, Vornamen und unpassende Wörter aus, damit immer ein Fantasiename entsteht.

## Lehrer-Bereich (Zahnrad oben rechts, ohne Passwort)

Stufe, Silbenzahl (2, 3, gemischt), Buchstabenauswahl, Monster (nach Antippen, sofort, aus), Vorlesen nach dem Aufdecken, Ton, Animation, Schrift (Grundschrift oder Andika), Link mit QR-Code für die Klasse und Arbeitsblätter.

Einstellungen gelten bis zum Neuladen. Dauerhaft gelten sie über den Link:

| Parameter | Werte | Standard |
|---|---|---|
| `stufe` | 1, 2, 3 | 1 |
| `silben` | 2, 3, mix | 2 |
| `b` | freigegebene Buchstaben, mit Punkt getrennt (`m.a.l.o`) | alle der Stufe |
| `monster` | tippen, sofort, aus | tippen |
| `vorlesen` | 0, 1 | 0 |
| `ton` | 0, 1 | 1 |
| `anim` | 0, 1 | 1 |
| `schrift` | grund, andika | grund |

## Arbeitsblätter

Monster-Steckbrief (Name lesen, Monster malen, Namen in Lineatur abschreiben), Ausmal-Monster, Partnerkarten (vorne Name, hinten Monster) und Mini-Heft (Deckblatt mit Abhak-Liste und 5 Steckbrief-Seiten). A4 hoch, Druck über den Browser.

## Datenschutz

Kein Konto, keine Namen, keine Cookies, kein Speichern im Browser, keine Verbindungen zu Drittanbietern. Schriften werden mit der App ausgeliefert. Impressum und Datenschutz stehen in der App (Fußzeile).

## Technik

React 18 in einer Datei (`src/App.jsx`), Monster-Baukasten in `src/monster.js`, Silbenvorrat und Sperrliste in `src/silben.json`, Merkmal-Tabelle in `src/merkmale.json`. Gebaut mit esbuild und Tailwind CSS über `werkzeuge/lokal_bauen.sh`, veröffentlicht über GitHub Pages. Prüfwerkzeuge stehen in `werkzeuge/` (siehe `werkzeuge/README.md`).

## Lizenzen

Schriften „Andika“ (SIL International) und „Playwrite DE Grund“ (TypeTogether): SIL Open Font License 1.1 · Symbole: Lucide (ISC) · React, Tailwind CSS, qrcode-generator (MIT).
