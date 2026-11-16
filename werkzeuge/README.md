# Werkzeuge (werden nicht ausgeliefert)

| Skript | Zweck | Aufruf |
|---|---|---|
| `silben_check.py` | Prüft `src/silben.json`: Grapheme, Silbengrenzen, alle Namen jeder Stufe gegen Regeln und Sperrliste, Stichprobe für die Lehrkraft. Schreibt `silben_bericht.md`. | `python werkzeuge/silben_check.py` (ca. 45 s), schnelle Gegenprobe: `--test` |
| `silben_testseite.html` | Testseite: Stufe, Silbenzahl und Buchstaben wählen, drehen, Namen prüfen. Liest `src/silben.json`. | im Repo-Ordner `python -m http.server 8124`, dann `http://localhost:8124/werkzeuge/silben_testseite.html` |
| `merkmale_erzeugen.py` | Ergänzt fehlende Silben in `src/merkmale.json` (nie ändern, nur anhängen). | `python werkzeuge/merkmale_erzeugen.py` |
| `bilder_erzeugen.mjs` | App-Symbol (`symbol`) und Baukasten-Bild (`baukasten <ziel.png>`) über das installierte Chrome. | `node werkzeuge/bilder_erzeugen.mjs symbol` |
| `monster_uebersicht.html` | Monster-Check: alle Teile in Farbe und Umriss, Reihen, Namen ausprobieren. | gleicher Server, `/werkzeuge/monster_uebersicht.html` |

Nur Python 3, keine weiteren Pakete.
