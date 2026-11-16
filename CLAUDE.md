# Projekt: „Silbenmonster“ – Silben-Spielautomat für Klasse 1
Stand: 16.11.2026 (Entscheidungen geklärt, Etappe 1 „Silbenvorrat“ in Arbeit) – Gemeinsame Regeln aller Apps: `..\..\Anweisung_Cowork_Lern-Apps_Allgemein.md`
Diese Datei ist der maßgebliche Stand. Sie stammt aus `..\Anweisung_Cowork_Silbenmonster.md` und wird hier nachgeführt.
Repo: https://github.com/mitlaeuferfotografie/silbenmonster (angelegt und erster Push am 16.11.2026). Live: https://mitlaeuferfotografie.github.io/silbenmonster/

## Deine Rolle
Du unterstützt eine Grundschullehrkraft (NRW) beim Bau dieser Lern-App. Antworte auf Deutsch, sprich die Lehrkraft mit **Du** an und hinterfrage Ideen kritisch. Zielgruppe sind Erstklässler, die **gerade lesen lernen**. Die App muss ohne das Lesen von Anweisungen bedienbar sein (Symbole, Ton, Vormachen).

## Idee
Ein Spielautomat mit 2 oder 3 Silbenwalzen. Ein Hebel (oder Knopf) lässt die Walzen drehen, sie halten nacheinander an. Es entsteht ein **Fantasie-Monstername** (z. B. Lo-mu-fi), den das Kind liest. Danach erscheint das passende Monster.

- Angeregt durch die „Monstermaschine“ von @frau_behrens_ (Instagram, 3.11.2026). Es ist eine **eigene Umsetzung**: eigener Name, eigene Monster, eigene Gestaltung. Von dort werden weder Grafiken noch Texte, Namen oder Material übernommen.
- Didaktischer Kern: Fantasiewörter lassen sich nicht über das Bild oder den Zusammenhang erraten. Das Kind muss die Silben wirklich erlesen und zusammenziehen (Synthese).

## Lehrplanbezug
Lehrplan NRW Grundschule Deutsch, Bereich **Lesen – mit Texten und Medien umgehen**, Schwerpunkt *über Lesefähigkeiten verfügen*, Kompetenzerwartung bis Ende der Schuleingangsphase: Die Schülerinnen und Schüler **„nutzen Lesestrategien zum Erlesen von Wörtern (u. a. Silben)“**. Vor dem Eintrag ins README den genauen Wortlaut im aktuellen Lehrplan prüfen.
Medienkompetenzrahmen NRW: 1.2 Digitale Werkzeuge (eine Lern-App zielgerichtet bedienen).

## Einordnung
- **Eigene kleine App**, nicht Teil von Lesestart, aber mit dem **gleichen fachlichen Rahmen** wie Lesestart (Graphem-Bestand, Silbenfarben, Schrift, Buchstabenauswahl per Link, Silben-Tondateien). Siehe `..\Lesestart App\Anweisung_Cowork_Lesestart.md`.
- Art der App: **Werkzeug bzw. tägliches Training, kein Lernpfad.** Es gibt keine Sterne, keinen Code, keine Abzeichen und kein „Das kann ich schon“, und alles ist frei. Begründung: Die App kann nicht prüfen, ob richtig gelesen wurde (siehe „Kontrolle“).
- **Einsatz:** (1) digitale Tafel mit der ganzen Klasse, (2) Partnerarbeit am iPad, (3) Einzelarbeit am iPad, (4) Arbeitsblätter zum Ausdrucken.
- **Basis-Version: keine.** Lesen ist hier selbst das Lernziel und darf nicht durch Vorlesen ersetzt werden. Entlastet wird über die Einstellungen (2 Silben, Stufe 1, wenige Buchstaben). Eine zweite Fassung brächte nichts zusätzlich.

## Kontrolle (wichtig)
Die App weiß nicht, ob ein Kind richtig gelesen hat. Es gibt **keine Spracherkennung**, weil Vosk bei Fantasiewörtern und Kinderstimmen zu unzuverlässig ist.
Die Kontrolle läuft deshalb so:
- **Digitale Tafel:** Die Klasse liest im Chor oder ein Kind liest vor, die Lehrkraft löst auf.
- **Partner:** Ein Kind liest, das andere hört zu, danach wird das Monster aufgedeckt.
- **Einzelarbeit:** Erst lesen, dann das Monster aufdecken. Danach (und erst danach) kann das Kind auf den Lautsprecher am Namen tippen und hören, wie der Name klingt (Selbstkontrolle).
- **Vorlesen ist standardmäßig aus** (Entscheidung 16.11.2026). Die Lehrkraft schaltet es im Lehrer-Bereich oder mit `?vorlesen=1` frei. Auch dann wird nur nach dem Aufdecken vorgelesen.
- Vor dem Aufdecken wird der Name **nie** vorgelesen, und die Walzen sprechen beim Anhalten nichts.

## Ablauf eines Durchgangs
1. Startbildschirm mit großem Play-Knopf (entsperrt den Ton auf dem iPad).
2. Automat mit 2 oder 3 Walzen und großem Hebel bzw. Knopf rechts (mindestens 72 × 72 px). Die Leertaste dreht ebenfalls (für die digitale Tafel mit Tastatur).
3. Drehen: Die Walzen laufen ca. 1–1,5 s und halten **von links nach rechts nacheinander** an, dazu ein kurzes Klick-Geräusch, das per Web Audio erzeugt wird (keine Datei). Bei „Bewegung reduzieren“ (Systemeinstellung) oder `?anim=0` erscheinen die Silben ohne Drehen.
4. Ergebnis: Unter den Walzen steht der ganze Name groß, **Silben abwechselnd blau und rot, erste Silbe blau, mit Silbenbögen** (wie Lesestart).
5. Das Monster ist durch eine Klappe oder einen Vorhang verdeckt. Je nach Einstellung erscheint es **sofort**, **nach Antippen** (Standard) oder **gar nicht**.
6. Nach dem Aufdecken erscheinen der Knopf „Neu drehen“ und, wenn Vorlesen freigeschaltet ist, der Lautsprecher-Knopf am Namen („So klingt es“).
7. **Walze festhalten:** Tippt man eine Walze an, bekommt sie ein Schloss und dreht beim nächsten Mal nicht mit. Damit lassen sich gezielt Reihen bilden (Lo-mu → Lo-ma → Lo-mi), um Lesen mit kleinen Unterschieden zu üben.
8. **Monster-Reihe:** Die Monster dieses Durchgangs werden unten als kleine Leiste gesammelt (nur im Arbeitsspeicher, beim Neuladen leer). Antippen zeigt Monster und Namen erneut. Für die digitale Tafel gut geeignet: „Welches Monster hieß Fi-sa?“

Kein Zeitdruck, keine Punkte, keine Dauer-Animationen. Das Monster „freut sich“ beim Aufdecken höchstens 1–2 s.

## Silben
- Grundform: **offene Silben, Konsonant + Vokal** (MA, LO, SCHU, REI, BAU). Kein Vokal am Silbenanfang, so entstehen keine Vokalfolgen über die Silbengrenze (z. B. i + e = „ie“).
- Graphem-Bestand wie Lesestart: Vokale a e i o u, dazu ei und au; Konsonanten m l s n r f w h d t b p g k z, sch. Alles andere ist ausgeschlossen (siehe Lesestart).
- **Stufen** (Lehrer-Bereich und Link `?stufe=`):

| Stufe | Konsonanten | Vokale | Besonderes |
|---|---|---|---|
| 1 | Dehnlaute m l s n r f w h, sch | a e i o u | nur offene Silben |
| 2 | + d t b p g k z | + ei, au | |
| 3 | wie 2 | wie 2 | **letzte Silbe darf geschlossen sein** (Lo-mu-fin, Ra-bot), nur mit m n l r s t als Endlaut |

- **Buchstabenauswahl** wie Lesestart über `?b=m.a.l…`: Es werden nur Silben aus freigegebenen Buchstaben gebildet. Sind weniger als 2 Vokale oder weniger als 3 Konsonanten frei, zeigt die App einen Hinweis im Lehrer-Bereich statt endlos dieselben Silben.
- Ein **e** ist in jeder Silbe erlaubt (Entscheidung 16.11.2026, Me-lo ist also möglich).
- Dieselbe Silbe darf nicht direkt zweimal hintereinander kommen (kein Ma-ma).
- **Sperrliste `SPERRLISTE`:** Namen, die echte oder unpassende Wörter ergeben, werden neu gezogen. Dazu gehören Fäkal- und Schimpfwörter (z. B. Ka-ka, Pi-pi, Po-po, Pu-pu, Do-of), Wörter mit politischem oder belastendem Bezug (z. B. Na-zi), Wörter aus der Lesestart-`WORD_LIST` (damit immer ein Fantasiewort entsteht) und weitere, die die Lehrkraft nachträgt. Die Sperrliste vor dem ersten Push der Lehrkraft vorlegen.
- **Schreibweise (entschieden):** Die erste Walze beginnt groß, die anderen sind klein: „Lo | mu | fi“, bei sch „Scha“. Der zusammengesetzte Name lautet entsprechend „Lomufi“.
- **Daten:** Silbenvorrat, Regeln und Sperrliste stehen in `src/silben.json`. Die App liest die Datei (esbuild bindet JSON ein), und `werkzeuge/silben_check.py` prüft sie. Die Regeln im Code der App und in `silben_check.py` müssen gleich bleiben.
- **Sperrliste, Aufbau:** `unpassend` sperrt, sobald die Buchstabenfolge irgendwo im Namen vorkommt (Lonazimu). `unpassende_silben` sind Einzelsilben, die nie gezogen werden. `echte_woerter`, `vornamen` und `lesestart` sperren nur den ganzen Namen. Grund für die Vornamen: Ein Monster soll nicht so heißen wie ein Kind der Klasse.

## Monster
- Ein **SVG-Baukasten**, selbst gezeichnet und flächig-freundlich, nicht gruselig. Keine Emoji, keine fremden Grafiken.
- **Jede Silbe bestimmt einen Teil des Monsters**, fest und ohne Zufall:
  - 1. Silbe → Körperform und Grundfarbe
  - 2. Silbe → Augen (Anzahl 1–3, Form) und Mund
  - 3. Silbe (falls vorhanden) → Extras: Hörner, Ohren, Fühler, Flügel, Muster (Punkte, Streifen)
  - Bei 2 Silben werden die Extras aus der 2. Silbe abgeleitet, damit auch 2-silbige Monster vollständig sind.
- Dadurch hat **derselbe Name immer dasselbe Monster** (auf allen Geräten), und alle Monster, die mit „Lo“ anfangen, haben denselben Körper. Kinder können so Silben als Einheit wiedererkennen und vergleichen.
- Umsetzung: Für jede Silbe ein fester Index aus einer **Tabelle** `SILBEN_MERKMALE` (nicht aus einem Hash, damit sich nichts verschiebt, wenn Silben hinzukommen). Neue Silben bekommen neue Einträge, bestehende nie ändern.
- Jedes Monster muss auch **als Umriss in Schwarz-Weiß** funktionieren (dunkle Konturen, Flächen nur als Füllung). Das wird für die Ausmal-Arbeitsblätter gebraucht.
- Mindestens 8 Körper, 8 Farben, 8 Augen-/Mund-Kombinationen und 8 Extras, damit es genug Abwechslung gibt.

## Ton
- Alle Ansagen als **vorab erzeugte Thorsten-MP3s** aus Bausteinen (`P('schlüssel')`), keine frei formulierten Sätze. Vorbild: Fritz (`tools/make_audio.py`).
- **Name vorlesen (nur freigeschaltet und nur nach dem Aufdecken):** Die Silbendateien `public/silben/<silbe>.mp3` werden mit einer kurzen Pause (ca. 0,15 s) hintereinander abgespielt. Es sind **dieselben Dateien wie in Lesestart**: alle 112 offenen Silben, erzeugt mit Piper (Thorsten) direkt aus der Lautschrift mit langem Vokal (`Lesestart App\lesestart\tools\make_audio.py`). Sie werden übernommen, die fehlenden geschlossenen Endsilben werden auf dieselbe Art erzeugt. Ganze Fantasienamen werden nicht als Text an Piper oder die Gerätestimme gegeben, weil sie unberechenbar betont bzw. buchstabiert werden.
- Für geschlossene Endsilben (Stufe 3) fehlen in Lesestart Dateien (z. B. `fin`, `bot`). Die Liste der benötigten Silben erzeugt `werkzeuge/silben_liste.py` aus dem Silbenvorrat, fehlende Dateien werden markiert. Fehlt eine Datei, bleibt der Lautsprecher-Knopf ausgegraut (keine Gerätestimme).
- Kurze Ansagen, z. B. „Dreh am Hebel!“, „Lies den Namen. Dann schau, wer es ist!“. Wiederholen über den Lautsprecher-Knopf oben links.
- Ton ganz aus per `?ton=0` (an der digitalen Tafel, wenn die Lehrkraft selbst spricht).

## Bedienung und Darstellung
- Schrift: **vorrangig die Grundschrift** (Grundschulverband), wenn ihre Lizenz das Mitliefern in der App erlaubt. **Andika** (lokal, SIL OFL) ist umschaltbar (`?schrift=andika`). Erlaubt die Lizenz das Mitliefern nicht, gibt es nur Andika. Die Lizenz wird vor Etappe 3 geprüft und der Lehrkraft vorgelegt.
- **Keine eigene Beamer-Ansicht** (Entscheidung 16.11.2026): Eingesetzt wird die App nur auf digitalen Tafeln und iPads. Walzen, Name und Monster wachsen mit der Fenstergröße (bis 1920 × 1080 geprüft). Steuerung auch über die Tastatur: Leertaste drehen, Enter aufdecken, 1/2/3 Walze festhalten.
- **iPad:** quer und hochkant; quer stehen Automat und Monster nebeneinander, hochkant untereinander. Tippflächen mindestens 72 × 72 px, nur Antippen, kein Ziehen, `touch-action: manipulation`, kein Hover.
- **Vormachen:** Beim ersten Start einmal kurz vormachen (animierter Finger zieht den Hebel, dann tippt er auf die Klappe). Danach überspringbar.
- Handy quer: Hinweis „Bitte drehen“. Handybreite 390 px ohne waagerechtes Scrollen.

## Lehrer-Bereich (Zahnrad, **ohne Passwort**, Entscheidung 16.11.2026)
- Stufe 1/2/3
- Silbenzahl: 2, 3 oder gemischt
- Buchstabenauswahl (wie Lesestart, Raster zum Antippen)
- Monster: sofort / nach Antippen / aus
- Ton an/aus, Vorlesen nach dem Aufdecken an/aus (Standard aus), Animation an/aus, Schrift (Grundschrift/Andika)
- Link-Erzeuger mit Kopieren und QR-Code (nur Abweichungen vom Standard)
- Arbeitsblatt-Generator
- Hinweis zum „Geführten Zugriff“ auf dem iPad

## Link-Parameter (`readUrlSettings`)
| Parameter | Werte | Standard |
|---|---|---|
| `b` | freigegebene Buchstaben, Punkt-getrennt (`m.a.l.o`) | alle der Stufe |
| `stufe` | 1, 2, 3 | 1 |
| `silben` | 2, 3, mix | 2 |
| `monster` | sofort, tippen, aus | tippen |
| `ton` | 0, 1 | 1 |
| `vorlesen` | 0, 1 | 0 |
| `schrift` | grund, andika | grund (wenn lizenzrechtlich möglich) |
| `anim` | 0, 1 | 1 |

## Arbeitsblatt-Generator
Gestaltung nach den allgemeinen Regeln: A4 hoch, Name/Datum, großes Symbol, großer Titel, kleiner Aufgabentext für die Lehrkraft, erstes Beispiel gelöst (gestrichelter Rahmen, Stern), Lösungsblatt in Violett, wo sinnvoll, Schwarz-Weiß-tauglich. Erzeugt mit **denselben Silben, derselben Sperrliste und demselben Monster-Baukasten** wie die App. Die Einstellungen (Stufe, Buchstaben, Silbenzahl) werden übernommen.

| Blatt | Inhalt | Lösung |
|---|---|---|
| **Monster-Steckbrief** | Name in Silbenfarben, leerer Rahmen: „Male das Monster“, darunter den Namen in **Lineatur Klasse 1 mit Häuschen** abschreiben | nein |
| **Ausmal-Monster** | Monster als Umriss mit Namen, zum Ausmalen | nein |
| **Partnerkarten** | Karten zum Ausschneiden und Knicken: vorne der Name, hinten das Monster (Kontrolle beim Partnerlesen) | nein |
| **Mini-Heft** | Deckblatt (Monster zum Ausmalen, Abhak-Liste mit den 5 Namen) und 5 Steckbrief-Seiten mit je einem Namen | nein |

**Entscheidung 16.11.2026:** „Lies und verbinde“ entfällt. Das Kind kann aus dem Namen nicht ableiten, welches Monster dazugehört, und die Lehrkraft sieht keinen Mehrwert in einem Silben-Schlüssel. Damit hat kein Blatt ein Lösungsblatt. Ein gelöstes Beispiel gibt es nicht, weil Steckbrief, Ausmalen und Karten keine eindeutige Lösung haben. Umsetzung im Abschnitt ARBEITSBLAETTER von `App.jsx` (`namenListe`, `Lineatur`, `BlattKopf`, `Blatt…`, `ArbeitsblattGenerator`). Je Blatt verschiedene Namen und verschiedene Monster. Steckbrief und Ausmal-Monster haben je 2 Namen pro Seite, die Partnerkarten 8 Karten (90 × 58 mm, vorne Name, hinten Monster, Knicklinie gestrichelt).

Bedienung: Blatttypen oben, darunter die Einstellungen, Knopf „Neue Aufgaben“, Vorschau auf Bildschirmbreite skaliert, großer Drucken-Knopf oben rechts. Die Silbenfarben brauchen im Schwarz-Weiß-Druck die Silbenbögen als zweites Merkmal.

## Aufgabentyp für den Baukasten
Neuer Typ **„Silben-Spielautomat“** (nächste freie Nummer in `Baukasten_Aufgabentypen.md`; die Nummern 18–20 sind für Lesestart vorgesehen). Nach der Veröffentlichung Steckbrief, Screenshot und Karte ergänzen.

## Technik-Vorlage (vollständig übernommen, Stand 04.11.2026)

### Regeln
- Vor jeder Änderung eine Sicherung von src/App.jsx im Ordner der App unter Dokumente\ClaudeArbeitsordner\Deutschunterricht\Silbenmonster App anlegen, Namensschema „Silbenmonster TT_MM_JJ.txt“. Bei mehreren Sicherungen am selben Tag „… V2.txt“ usw.
- In Etappen arbeiten, nach jeder Etappe lokal bauen und prüfen.
- Bei Unklarheiten fragen statt raten.
- Kein push auf main ohne meine Freigabe – jeder push geht sofort live. Vor der Freigabe lokal bauen und mir zeigen, damit ich teste. Nach dem push ist die Seite nach ca. 2 Minuten live.
- Neue Apps oder Namensänderungen auf der Übersichtsseite mitlaeuferfotografie.github.io eintragen.
- Impressum/Datenschutz nur nach meiner ausdrücklichen Freigabe ändern.
- Kein Speicher- oder Punktesystem einbauen oder ändern, ohne mich zu fragen.
- Bei grundlegenden Änderungen die CLAUDE.md im Repository und die `Anweisung_Cowork_Silbenmonster.md` im Arbeitsordner nachführen.
- Die CLAUDE.md enthält: Rolle, feste Regeln, Technik, Aufbau von App.jsx mit Suchbegriffen, Link-Parameter, offene Punkte, Prüfliste.

### Technik
- React 18, eine Datei `src/App.jsx`. Feste Versionen: react@18.1.0, react-dom@18.1.0, lucide-react@^0.577.0, tailwindcss@3. Weitere Bibliotheken nur, wenn nötig, und dann fest versioniert.
- Tailwind-Klassen immer vollständig ausschreiben (nie `bg-${farbe}-500`), sonst fehlen sie im Build.
- Bau und Veröffentlichung über `.github/workflows/pages.yml` (esbuild + Tailwind CLI). Die Datei hängt `?v=<Commit>` an bundle.js und tailwind.css, damit die iPads nach einem Update nicht die alte Fassung zeigen. Sie kopiert, falls vorhanden, public/fonts, audio, bilder, modelle und vosk mit. `werkzeuge/lokal_bauen.sh` baut lokal mit denselben Schritten (danach z. B. `npx serve _site`).
- Beim Laden und Spielen dürfen nur Dateien von mitlaeuferfotografie.github.io abgerufen werden. Kein localStorage, keine Cookies.
- Einstellungen per URL-Parameter, gelesen in einer Funktion `readUrlSettings`. Der Lehrer-Bereich erzeugt den Link (nur Abweichungen vom Standard).
- Der Lehrer-Bereich hat **kein Passwort** (Entscheidung der Lehrkraft 16.11.2026). Er öffnet sich über das Zahnrad.
- Ton über Web Audio. Das Tonsystem wird beim ersten Antippen „aufgeweckt“ und bleibt wach, sonst schneidet das iPad Wortanfänge ab.
- Impressum und Datenschutz: Komponente `ImpressumModal`, gleicher Text in allen Apps (Name, Dienstanschrift und Dienstmail der Lehrkraft), erreichbar ohne Passwort über die Fußzeile „Impressum · Datenschutz“ und über den Link im Lehrer-Bereich. Die Komponente aus einer bestehenden App übernehmen und nur den Namen der App anpassen. Lizenzen nennen: Andika (OFL), Stimme Thorsten (Piper).

### Neue App anlegen
- Neues Repo `silbenmonster` (Name nach Entscheidung der Lehrkraft) unter `mitlaeuferfotografie` anlegen, Struktur und `pages.yml` aus einer Schwester-App übernehmen, unter *Settings → Pages* „GitHub Actions“ als Quelle wählen.
- Grundgerüst: Start mit Ton-Entsperrung, Automat, Lehrer-Bereich, Arbeitsblatt-Generator, `ImpressumModal` mit Fußzeile. **Keine** Sterne, kein Code, kein Freischalten (Werkzeug-App, siehe oben).

### Spielstand-Code
Entfällt (keine Lernpfad-App).

### Vorlesen (Technik)
- Erzeugt mit Piper (Modell de_DE-thorsten-high, liegt im Arbeitsordner unter `Matheunterricht\modelle\`, nicht im Repository). MP3 mono, 0,35 s Stille vorne (bei Silbendateien für das Zusammensetzen kürzen, ca. 0,05 s), Lautstärke angeglichen, etwas langsamer gesprochen (Filter `AF` in den Skripten).
- Weiches S: Thorsten spricht jedes S am Wortanfang scharf. Nachbearbeitung mit der freigegebenen Fassung „Z4“ (Summen 0.55, Zischen 0.25): `werkzeuge/s_stimmhaft.py`. Gilt auch für Silben mit s (sa, so, …).
- Alle Ansagen stehen in **einer Liste** `src/saetze.js`, aus der App und Ton-Erzeugung lesen. Silben kommen aus `public/silben/` (gemeinsam mit Lesestart).
- Prüfen: Anhör-Seite `werkzeuge/anhoerseite.py` für die Lehrkraft.
- Nach neu erzeugten Tondateien die Konstante `TON_STAND` hochzählen.

### Spracherkennung
Entfällt (siehe „Kontrolle“).

### Arbeitsblätter (Technik)
- A4 hoch, Druck über `window.print()`. Druck-CSS: `@page { size: A4 portrait; margin: 0 }`, jede `.sheet-page` 210 × 297 mm mit Seitenumbruch danach, `print-color-adjust: exact`, Bedienleiste mit `.no-print` ausgeblendet.

### Ordnerstruktur im Repository
```
package.json
src/App.jsx              die ganze App
src/index.js, src/style.css, src/tailwind-input.css
src/saetze.js            alle Ansagen (App + Ton-Erzeugung)
public/index.html
public/fonts/            Andika + Lizenzdatei (OFL)
public/audio/thorsten/   Ansagen als MP3, LIESMICH.txt
public/silben/           Silben-MP3s (gemeinsam mit Lesestart), LIESMICH.txt
werkzeuge/               Skripte (nicht ausgeliefert), README.md
.github/workflows/pages.yml
CLAUDE.md, README.md
```
- Skripte in `werkzeuge/` bekommen einen Kopfkommentar zu Aufruf und Abhängigkeiten. Große Modelle kommen nicht ins Repository.
- LIESMICH-Dateien in `public/audio` und `public/silben` nennen Herkunft, Lizenz und Einstellungen.

### Prüfliste nach jeder Änderung
- Fachlich und sprachlich prüfen (Rechtschreibung, Zeichensetzung, deutsche Anführungszeichen).
- **Silben-Check:** `werkzeuge/silben_check.py` erzeugt alle möglichen Namen jeder Stufe und prüft sie gegen die Sperrliste und die Regeln (nur freigegebene Grapheme, kein e vorne/mitten, keine doppelte Silbe). Stichprobe von 50 Namen pro Stufe der Lehrkraft zeigen.
- Monster-Check: Übersichtsseite mit allen Körpern, Augen und Extras in Farbe und als Umriss.
- Automat in allen Einstellungen durchspielen, ohne Fehler in der Browser-Konsole.
- Digitale Tafel (1920 × 1080) mit Tastatur prüfen.
- Handybreite 390 px ohne waagerechtes Scrollen; iPad quer und hochkant.
- Arbeitsblätter in der Druckvorschau A4 prüfen, jedes Blatt mit Lösung, auch in Schwarz-Weiß.
- Im Netzwerk-Tab: nur eigene Dateien.
- Nach dem freigegebenen push prüfen, ob der Actions-Lauf grün ist.
- `Baukasten_Aufgabentypen.md` ergänzen und die App in die Tabelle „Die Apps“ der allgemeinen Anweisung eintragen.

## Reihenfolge der Umsetzung
1. **Silbenvorrat, Regeln und Sperrliste** als Daten anlegen und mit `silben_check.py` prüfen. Ergebnis der Lehrkraft zeigen, **bevor** die Oberfläche gebaut wird.
2. **Monster-Baukasten** mit Übersichtsseite (alle Teile, Farbe und Umriss). Lehrkraft gibt die Gestaltung frei.
3. Automat mit Drehen, Festhalten, Aufdecken, Monster-Reihe; Lehrer-Bereich und Link-Erzeuger. Zunächst ohne Ton.
4. ~~Beamer-Ansicht~~ entfällt (16.11.2026). Stattdessen wächst die Darstellung mit der Fenstergröße für digitale Tafeln (erledigt in Etappe 3).
5. Arbeitsblatt-Generator (gebaut 16.11.2026, wartet auf Test der Lehrkraft im Druck).
6. README, Impressum, Eintrag auf der Übersichtsseite (nach Freigabe).
7. Ton (auf Wunsch der Lehrkraft nach hinten geschoben, 16.11.2026): Ansagen, Vormachen mit Finger, Lautsprecher oben links, Silben aus Lesestart, fehlende Endsilben ergänzen. Bis dahin gibt es nur den Klick der Walzen, und der Vorlese-Knopf (`?vorlesen=1`) bleibt ausgegraut.

## Entscheidungen (16.11.2026)
- **Name:** „Silbenmonster“, Repo `silbenmonster`.
- **Schrift:** Grundschrift vorrangig, wenn die Lizenz das Mitliefern erlaubt, sonst nur Andika. Andika ist bei Bedarf umschaltbar.
- **Schreibweise:** Erste Silbe groß, die übrigen klein („Lo | mu | fi“ → „Lomufi“).
- **e** in jeder Silbe erlaubt.
- **Vorlesen** nur nach Freischaltung durch die Lehrkraft (`?vorlesen=1`, Standard aus) und nur nach dem Aufdecken.
- **Silbendateien:** Die 112 offenen Silben (Piper) kommen aus Lesestart, fehlende Endsilben werden genauso erzeugt.
- **Quellenhinweis** auf @frau_behrens_ im README: ja, kurz („Angeregt durch die Monstermaschine von @frau_behrens_ (Instagram). Eigene Umsetzung.“).

- **Sperrliste (zweite Runde):** Die 75 gängigen Vornamen bleiben gesperrt, die Klasse wird nicht eigens eingetragen. Endsilben mit r nach ei/au (-eir, -aur) sind gestrichen (`endlaut_nicht_nach` in Stufe 3). Sole, Lohe, Rumor, Sauser, Nude und File sind als echte Wörter nachgetragen; weitere Funde trägt Claude auf Zuruf nach. Teilwörter sperren weiterhin auch innerhalb eines Namens (lieber zu viel aussortieren). Vulgär- und Schimpfwörter werden in der Lautform eingetragen, wie ein Kind sie aus offenen Silben liest (Pimmel → pi-mel, Fotze → fo-ze, Nutte → nu-te). Wörter mit Konsonantenhäufung (Arsch, Wichser, Schlampe) können gar nicht entstehen.

- **Schrift (Lizenz geprüft):** Die Grundschrift des Grundschulverbands ist nur „zu nicht kommerziellen Zwecken“ frei, zur Weitergabe mit einer Web-App sagt die Lizenz nichts. Deshalb wird **Playwrite DE Grund** (TypeTogether, SIL OFL 1.1, freie Nachbildung der Grundschrift, Paket `@fontsource/playwrite-de-grund` 5.3.0, nur Stärke 400) als „Grundschrift“ verwendet. Andika ist per `?schrift=andika` umschaltbar.
- **QR-Code** mit `qrcode-generator@1.4.4` (MIT), wird auf dem Gerät erzeugt.

## Monster-Baukasten (Etappe 2, freigegeben 16.11.2026)
- Code: `src/monster.js` (`monsterSvg(merkmale, { umriss })`, `merkmaleFuerName(silben, tabelle)`), genutzt von App und Arbeitsblättern.
- Tabelle `SILBEN_MERKMALE` = `src/merkmale.json`, erzeugt und **nur ergänzt** von `werkzeuge/merkmale_erzeugen.py`. Je offene Silbe `[körper, farbe, augen, mund, extra, muster]`, dazu `endlaute` → Zubehör.
- Systematik der Tabelle: **Konsonant → Form, Vokal → Variante.** 1. Silbe: Konsonant → Körper (16), Vokal → Farbe (10, je Körper 7 verschiedene). 2. Silbe: Konsonant → Augen (8), Vokal → Mund (7). 3. Silbe (bei 2 Silben die 2.): Konsonant → Extra (8), Vokal → Muster (7). Endlaut der letzten Silbe (Stufe 3) → Zubehör: m Schwanz, n Winkearme, l Schleife, r Schal, s Bäckchen, t Turnschuhe.
- Die Listen `KOERPER`, `FARBEN`, `AUGEN`, `MUENDER`, `EXTRAS`, `MUSTER`, `ZUBEHOER` in `monster.js` nie umsortieren, nur anhängen.
- Gestaltung: dunkle Kontur (4 px) in Farbe und Umriss gleich, Extras hinter dem Körper, Muster nur auf dem Körper und nicht im Gesicht.

## Automat (Etappe 3, Stand 16.11.2026, wartet auf Test der Lehrkraft)
- `src/App.jsx`, Abschnitte über Suchbegriffe im Kopfkommentar: KONSTANTEN, SILBEN (`silbenVorrat`, `namenGrund`, `zieheName`), EINSTELLUNGEN (`readUrlSettings`, `settingsLink`), TON (`tonWecken`, `klick`), ANZEIGE (`SilbenName`, `MonsterBild`), START, AUTOMAT, LEHRER, IMPRESSUM, APP.
- Drehen: Die Walzen halten von links nach rechts an (ab 0,65 s, je 0,3 s), mit Klick per Web Audio. Festgehaltene Walzen (Antippen, Schloss) drehen nicht mit. Bei „gemischt“ bleibt die Silbenzahl gleich, solange eine Walze festgehalten ist. Ergibt eine Festhalte-Kombination keinen erlaubten Namen, werden alle Schlösser gelöst.
- Zu wenige freigegebene Buchstaben: Der Automat nimmt alle Buchstaben der Stufe, der Lehrer-Bereich zeigt den Hinweis.
- Monster-Reihe: die letzten 10 Monster (nur im Arbeitsspeicher). Bei `monster=aus` stehen dort nur die Namen.
- Tastatur: Leertaste, Enter, 1/2/3. Größen werden aus der Fenstergröße berechnet (`fenster`, `walzeB`, `monsterB`, `nameGr` im Automaten): Quer stehen Automat und Monster nebeneinander, hochkant untereinander.
- Noch offen: Vormachen beim ersten Start (animierter Finger) und Lautsprecher oben links, beides zusammen mit dem Ton in Etappe 5. Der Vorlesen-Knopf ist bei `?vorlesen=1` sichtbar, aber ausgegraut, bis die Silbendateien da sind.
- `ImpressumModal` aus den Redezeichen-Helden übernommen. Angepasst sind App-Name, Lizenzen (Andika, Playwrite DE Grund, Thorsten, Lucide, React, Tailwind, qrcode-generator) und ein Satz in „Das Wichtigste in Kürze“ (kein Code, kein Mikrofon, QR-Code auf dem Gerät). **Von der Lehrkraft freigegeben am 16.11.2026.** Weitere Änderungen nur nach neuer Freigabe.
- Kein Lehrer-Passwort mehr (16.11.2026). Das Zahnrad ist klein und grau, damit Kinder es nicht zufällig antippen.
- Bauen: `bash werkzeuge/lokal_bauen.sh` → `_site/` (dasselbe Skript nutzt `pages.yml`). Lokal ansehen: Server „silbenmonster“ (Port 8124), dann `/_site/`.

## Werkzeuge zum Prüfen
- `python werkzeuge/silben_check.py`: vollständiger Check mit Bericht `werkzeuge/silben_bericht.md`.
- `werkzeuge/silben_testseite.html`: Testseite zum Drehen und Prüfen einzelner Namen. Start über den Eintrag „silbenmonster“ in `Deutschunterricht\.claude\launch.json` (Port 8124), dann `/werkzeuge/silben_testseite.html` öffnen.
- `werkzeuge/monster_uebersicht.html`: Monster-Check, alle Teile in Farbe und Umriss, Reihen, Namen ausprobieren (gleicher Server, `/werkzeuge/monster_uebersicht.html`).

## Offene Punkte
- Silbenvorrat, Sperrliste und Monster-Baukasten sind freigegeben (16.11.2026).
- Etappe 3 getestet, Impressum freigegeben (16.11.2026). Als Nächstes: GitHub-Repo anlegen und pushen (nur nach ausdrücklicher Freigabe), dann Eintrag auf der Übersichtsseite.
- Erster Commit und Push am 16.11.2026. Der Bau ist grün. Das Veröffentlichen klappt erst, wenn unter *Settings → Pages* „GitHub Actions“ als Quelle gewählt ist, danach den Lauf neu starten. Ein `apple-touch-icon.png` fehlt noch.
- Nach dem Live-Gang: Übersichtsseite mitlaeuferfotografie.github.io und Tabelle „Die Apps“ in der allgemeinen Anweisung ergänzen, `Baukasten_Aufgabentypen.md` ergänzen (neuer Typ „Silben-Spielautomat“).
- README geschrieben (16.11.2026). Den Lehrplan-Wortlaut konnte Claude nicht prüfen (das PDF auf lehrplannavigator.nrw.de ließ sich nicht als Text lesen), im README ist er als „vor der Veröffentlichung prüfen“ markiert.
- Arbeitsblätter im Druck von der Lehrkraft geprüft und für gut befunden (16.11.2026).
