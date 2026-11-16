# Silben-Check – Stand der Daten 16.11.2026

Erzeugt mit `python werkzeuge/silben_check.py --stichprobe 50 --seed 1`.

## Stufe 1
45 offene Silben.

| Silben | alle Kombinationen | erlaubt | gesperrt davon: |
|---|---|---|---|
| 2 | 2.025 | 1.904 | gleiche Silbe hintereinander 45. vornamen 34. echte_woerter 32. unpassend 10 |
| 3 | 91.125 | 86.198 | gleiche Silbe hintereinander 4005. unpassend 910. vornamen 7. echte_woerter 4. lesestart 1 |

**Stichprobe (50 Namen, je zur Hälfte 2 und 3 Silben)** – so stehen sie auf den Walzen, dahinter der Name:

Mu | ne → Mune · Li | we → Liwe · Fo | wa → Fowa · Sche | ru → Scheru · We | me → Weme  
Ru | fi → Rufi · Ho | ma → Homa · Schu | fo → Schufo · Ni | su → Nisu · Hi | le → Hile  
Ra | me → Rame · Sche | wu → Schewu · Ma | ru → Maru · Scho | so → Schoso · Fi | me → Fime  
Wo | su → Wosu · Fo | we → Fowe · Ha | su → Hasu · Ri | su → Risu · Scho | su → Schosu  
Fu | no → Funo · Me | fe → Mefe · Ha | sche → Hasche · Le | se → Lese · Scha | no → Schano  
Li | re | wi → Lirewi · Fi | wi | schi → Fiwischi · Si | nu | no → Sinuno · Hi | we | wi → Hiwewi · Fa | hi | mi → Fahimi  
Wa | na | fa → Wanafa · Fe | schi | se → Feschise · Ro | ha | schu → Rohaschu · Scho | ro | la → Schorola · Fo | schi | wi → Foschiwi  
Le | sa | wo → Lesawo · Fa | ro | we → Farowe · Me | wa | mi → Mewami · Nu | hu | hi → Nuhuhi · Hi | fa | sche → Hifasche  
Su | ma | si → Sumasi · Wu | ha | su → Wuhasu · Fa | wi | ri → Fawiri · He | ri | fu → Herifu · Ni | schi | ha → Nischiha  
Ho | ma | ru → Homaru · Wi | lo | wo → Wilowo · Ha | so | fi → Hasofi · Mo | wa | ro → Mowaro · He | ha | si → Hehasi  

## Stufe 2
112 offene Silben.

| Silben | alle Kombinationen | erlaubt | gesperrt davon: |
|---|---|---|---|
| 2 | 12.544 | 12.208 | echte_woerter 122. gleiche Silbe hintereinander 112. vornamen 53. unpassend 45. lesestart 4 |
| 3 | 1.404.928 | 1.369.796 | gleiche Silbe hintereinander 24976. unpassend 10135. vornamen 10. echte_woerter 7. lesestart 4 |

**Stichprobe (50 Namen, je zur Hälfte 2 und 3 Silben)** – so stehen sie auf den Walzen, dahinter der Name:

De | ho → Deho · Schau | kau → Schaukau · Wo | hu → Wohu · Wi | ma → Wima · Dei | dau → Deidau  
Bi | ki → Biki · Be | wa → Bewa · Schi | tau → Schitau · Mo | ku → Moku · Re | bu → Rebu  
Ne | ta → Neta · Tu | ni → Tuni · Zei | lu → Zeilu · Ku | ta → Kuta · Ku | zo → Kuzo  
Kau | ru → Kauru · Mu | zi → Muzi · Pi | li → Pili · Lo | zau → Lozau · Mi | sche → Mische  
Me | gei → Megei · Gei | fa → Geifa · Ro | rau → Rorau · Sa | ku → Saku · Bi | ni → Bini  
Wi | fi | le → Wifile · Na | sau | ru → Nasauru · Du | na | pa → Dunapa · Rau | bei | ga → Raubeiga · Fi | schi | pei → Fischipei  
Fau | da | schu → Faudaschu · Sa | mo | fu → Samofu · Ha | we | hu → Hawehu · Ko | no | rei → Konorei · Lau | ru | gi → Laurugi  
Di | nei | ba → Dineiba · Hau | kau | mi → Haukaumi · Ra | mi | he → Ramihe · Su | mu | ge → Sumuge · Sau | sche | pau → Sauschepau  
De | pi | hei → Depihei · Dau | ze | ra → Dauzera · Bo | ku | pu → Bokupu · Do | sche | ra → Doschera · Du | bau | mo → Dubaumo  
He | pi | to → Hepito · Ku | fau | pa → Kufaupa · Bo | hei | la → Boheila · Go | fo | si → Gofosi · Nau | mau | fu → Naumaufu  

## Stufe 3
112 offene Silben, 636 geschlossene Endsilben.

| Silben | alle Kombinationen | erlaubt | gesperrt davon: |
|---|---|---|---|
| 2 | 83.776 | 83.009 | unpassend 339. echte_woerter 247. gleiche Silbe hintereinander 112. vornamen 63. lesestart 6 |
| 3 | 9.382.912 | 9.214.466 | gleiche Silbe hintereinander 96208. unpassend 72216. vornamen 10. echte_woerter 8. lesestart 4 |

**Stichprobe (50 Namen, je zur Hälfte 2 und 3 Silben)** – so stehen sie auf den Walzen, dahinter der Name:

Li | be → Libe · Fu | reis → Fureis · Gu | les → Gules · Hu | bus → Hubus · Me | bum → Mebum  
Zo | fo → Zofo · Tei | seim → Teiseim · Ti | dam → Tidam · Bi | tes → Bites · Mu | waum → Muwaum  
Nu | war → Nuwar · Lei | som → Leisom · To | kor → Tokor · Hau | pir → Haupir · No | deis → Nodeis  
Lau | kim → Laukim · Ha | rein → Harein · De | tam → Detam · Mi | for → Mifor · Be | hon → Behon  
Fe | su → Fesu · Sau | sin → Sausin · Zu | fot → Zufot · Kei | bul → Keibul · Ki | mul → Kimul  
We | hei | sul → Weheisul · Rau | pi | ka → Raupika · Zi | wau | bes → Ziwaubes · Wi | zi | kaum → Wizikaum · Dei | schau | taum → Deischautaum  
Ri | le | zeit → Rilezeit · Mei | lo | mum → Meilomum · Nau | rau | fus → Nauraufus · Tau | de | nut → Taudenut · Wei | we | faun → Weiwefaun  
Sa | fi | nel → Safinel · Zau | ba | zum → Zaubazum · Schau | so | par → Schausopar · Ta | ka | ze → Takaze · Fau | mei | hum → Faumeihum  
Li | wau | maus → Liwaumaus · Ze | si | faul → Zesifaul · Sa | be | pet → Sabepet · Ki | wau | be → Kiwaube · To | ta | saul → Totasaul  
Ti | lo | ran → Tiloran · Wu | fi | bur → Wufibur · Dei | sa | schaul → Deisaschaul · Fa | lau | wu → Falauwu · Za | fi | lei → Zafilei  

## Sperrliste
In Klammern: In welchen Stufen der Eintrag tatsächlich greift. „–“ heißt, der Name entsteht ohnehin nicht (z. B. Vokal am Anfang, Konsonantenhäufung, oder schon durch die Regel „gleiche Silbe“ gesperrt wie Ma-ma); der Eintrag schadet aber nicht.

**Unpassend (sperrt auch als Teil eines Namens):** ka-ka (2,3), ka-ke (2,3), pi-pi (3), po-po (3), pu-pu (3), schei-se (2,3), pi-mel (2,3), pe-nis (2,3), mu-schi (1,2,3), ti-ten (2,3), bu-sen (2,3), fi-ke (2,3), fi-ken (2,3), hu-re (1,2,3), lu-der (2,3), lu-sche (1,2,3), lo-ser (1,2,3), ho-mo (1,2,3), pe-do (2,3), na-zi (2,3), ne-ger (2,3), ka-na-ke (2,3), po-la-ke (2,3), mu-sel (1,2,3), sa-tan (2,3), ta-li-ban (3), ha-mas (1,2,3), pu-tin (2,3), bi-den (2,3), fo-ze (2,3), ti-te (2,3), po-pen (2,3), ho-de (2,3), ni-pel (2,3), nu-te (2,3), pu-si (2,3), hu-so (1,2,3), pi-se (2,3), ko-ze (2,3), po-pel (2,3), de-pe (2,3), do-fi (2,3), du-mi (2,3), pe-ner (2,3), zi-ke (2,3), ni-ga (2,3), ni-ger (2,3), te-ror (2,3), ha-schi (1,2,3), ki-fen (2,3)

**Echte Wörter (ganzer Name):** ma-ma (–), pa-pa (–), so-fa (1,2,3), li-mo (1,2,3), ki-no (2,3), ki-lo (2,3), to-fu (2,3), tu-ba (2,3), ku-li (2,3), mo-fa (1,2,3), fo-to (2,3), le-go (2,3), ta-bu (2,3), do-mi-no (2,3), ka-ra-te (2,3), sa-la-mi (1,2,3), ro-si-ne (1,2,3), si-re-ne (1,2,3), mi-nu-te (–), po-li-zei (2,3), ro-bo-ter (3), sa-ha-ra (1,2,3), la-ma (1,2,3), pu-ma (2,3), ze-bu (2,3), ka-ki (2,3), pi-ta (2,3), sa-go (2,3), so-da (2,3), si-lo (1,2,3), su-mo (1,2,3), ku-ba (2,3), pe-ru (2,3), to-go (2,3), ma-li (1,2,3), ba-li (2,3), ne-pal (3), ti-bet (3), pa-ris (3), le-nin (3), da-me (2,3), na-me (1,2,3), sa-me (1,2,3), ra-be (2,3), wa-be (2,3), ro-be (2,3), ga-be (2,3), ha-se (1,2,3), na-se (1,2,3), ro-se (1,2,3), do-se (2,3), ho-se (1,2,3), lo-se (1,2,3), po-se (2,3), mo-de (2,3), re-de (2,3), wa-de (2,3), ru-te (2,3), gu-te (2,3), no-te (2,3), bo-te (2,3), ro-te (2,3), to-te (2,3), pu-te (2,3), bu-de (2,3), lu-pe (2,3), hu-pe (2,3), tu-be (2,3), hu-fe (1,2,3), he-fe (1,2,3), zo-ne (2,3), ze-he (2,3), wa-re (1,2,3), we-ge (2,3), ta-ge (2,3), sa-ge (2,3), la-ge (2,3), wa-ge (2,3), mi-ne (1,2,3), mi-me (1,2,3), schu-le (1,2,3), scha-le (1,2,3), scho-te (2,3), scha-fe (1,2,3), schu-he (1,2,3), sche-re (1,2,3), rei-se (2,3), mei-se (2,3), lei-se (2,3), wei-se (2,3), sei-fe (2,3), sei-te (2,3), wei-te (2,3), rei-fe (2,3), lei-ne (2,3), bei-ne (2,3), schei-ne (2,3), wei-ne (2,3), rei-me (2,3), kei-me (2,3), hei-me (2,3), gei-ge (2,3), fei-ge (2,3), nei-ge (2,3), bei-de (2,3), hei-de (2,3), wei-de (2,3), sei-de (2,3), schei-de (2,3), tei-le (2,3), wei-le (2,3), sei-le (2,3), kei-le (2,3), mei-le (2,3), pau-se (2,3), sau-se (2,3), lau-ge (2,3), rau-pe (2,3), tau-be (2,3), hau-be (2,3), lau-be (2,3), lau-ne (2,3), dau-ne (2,3), lau-te (2,3), sau-na (2,3), fau-na (2,3), ta-fel (3), ga-bel (3), na-del (3), nu-del (3), pu-del (3), ku-gel (3), ha-gel (3), ne-bel (3), se-gel (3), he-bel (3), ka-bel (3), fa-bel (3), bi-bel (3), ta-ler (3), ma-ler (3), ti-ger (3), le-der (3), fe-der (3), ka-ter (3), pa-ter (3), le-ber (3), bi-ber (3), pu-der (3), ru-der (3), me-ter (3), li-ter (3), ha-fer (3), ke-fir (3), mau-er (–), bau-er (–), be-sen (3), ra-sen (3), ho-sen (3), na-sen (3), do-sen (3), ro-sen (3), ha-sen (3), lo-sen (3), po-sen (3), wa-gen (3), ma-gen (3), re-gen (3), de-gen (3), se-gen (3), bo-gen (3), la-den (3), fa-den (3), bo-den (3), ha-fen (3), ha-ken (3), la-ken (3), wa-ben (3), wa-ren (3), we-sen (3), ru-fen (3), ra-ten (3), ba-den (3), to-ben (3), lo-ben (3), ho-len (3), re-den (3), le-ben (3), le-gen (3), sa-gen (3), na-gen (3), ta-gen (3), le-sen (3), ma-len (3), be-ten (3), ha-ben (3), ge-ben (3), he-ben (3), we-ben (3), be-ben (3), ge-hen (3), se-hen (3), we-hen (3), ru-hen (3), bo-ten (3), no-ten (3), lau-fen (3), kau-fen (3), tau-fen (3), sau-fen (3), rau-fen (3), rau-ben (3), tau-ben (3), rau-pen (3), pau-sen (3), sau-sen (3), dau-men (3), rei-ten (3), lei-ten (3), hei-zen (3), rei-zen (3), wei-nen (3), mei-nen (3), tei-len (3), hei-len (3), fei-len (3), zei-gen (3), nei-gen (3), gei-gen (3), rei-sen (3), wei-sen (3), rei-fen (3), sei-ten (3), sa-lat (3), pi-rat (3), ka-mel (3), ka-nal (3), ho-tel (3), mo-tor (3), ro-tor (3), ko-met (3), na-tur (3), fi-gur (3), da-tum (3), tu-mor (3), le-mur (3), pa-ket (3), ma-te (2,3), so-le (1,2,3), lo-he (1,2,3), ru-mor (3), sau-ser (3), nu-de (2,3), fi-le (1,2,3), no-ne (1,2,3), ni-ne (1,2,3), fi-ne (1,2,3), li-ne (1,2,3), ti-me (2,3), ho-me (1,2,3)

**Vornamen (ganzer Name):** li-na (1,2,3), mi-la (1,2,3), le-na (1,2,3), ni-na (1,2,3), ti-na (2,3), la-ra (1,2,3), sa-ra (1,2,3), ma-ra (1,2,3), ki-ra (2,3), mi-ra (1,2,3), ne-le (1,2,3), lu-na (1,2,3), ha-na (1,2,3), le-ni (1,2,3), pau-la (2,3), do-ra (2,3), no-ra (1,2,3), mo-na (1,2,3), lo-la (1,2,3), li-lo (1,2,3), mi-na (1,2,3), ta-ra (2,3), pi-na (2,3), fi-na (1,2,3), ri-na (1,2,3), si-na (1,2,3), ro-sa (1,2,3), ro-si (1,2,3), su-si (1,2,3), su-se (1,2,3), li-sa (1,2,3), li-li (–), ga-bi (2,3), da-na (2,3), di-na (2,3), na-la (1,2,3), ma-ri (1,2,3), ra-mo-na (1,2,3), si-mo-ne (1,2,3), sa-bi-ne (2,3), me-li-na (1,2,3), ma-li-na (1,2,3), sa-lo-me (1,2,3), ha-li-ma (1,2,3), ta-ma-ra (2,3), sa-mi-ra (1,2,3), fa-ti-ma (2,3), so-fi (1,2,3), be-la (2,3), mi-ka (2,3), ti-mo (2,3), ni-ko (2,3), to-bi (2,3), to-ni (2,3), lu-ka (2,3), lu-kas (3), mi-lan (3), si-mon (3), ti-mon (3), bo-ris (3), do-ris (3), ka-rin (3), bo-do (2,3), hu-go (2,3), ke-rem (3), ke-mal (3), mu-sa (1,2,3), sa-mi (1,2,3), ra-mi (1,2,3), ki-mi (2,3), nu-ri (1,2,3), re-mo (1,2,3), re-ne (1,2,3), pe-ter (3)

**Lesestart-Wörter (ganzer Name):** u-fo (–), na-se (1,2,3), ha-se (1,2,3), ho-se (1,2,3), ro-se (1,2,3), sche-re (1,2,3), hut (–), wal (–), bus (–), eis (–), ei (–), baum (–), haus (–), maus (–), zelt (–), nest (–), pilz (–), wolf (–), fisch (–), schaf (–), schal (–), bein (–), keks (–), gans (–), helm (–), au-to (–), au-ge (–), di-no (2,3), do-se (2,3), du-sche (2,3), ki-wi (2,3), ka-nu (2,3), ti-ger (3), e-sel (–), i-gel (–), en-te (–), in-sel (–), lu-pe (2,3), lei-ter (3), sei-fe (2,3), ei-mer (–), fe-der (3), na-del (3), nu-del (3), be-sen (3), bi-ber (3), pu-del (3), tul-pe (–), pal-me (–), pin-sel (–), wol-ke (–), mu-schel (3), rau-pe (2,3), tau-be (2,3), dau-men (3), ka-mel (3), sa-lat (3), pa-ket (3), man-tel (–), kak-tus (–), del-fin (–), lam-pe (–), ap-fel (–), a-mei-se (–), a-na-nas (–), ba-na-ne (2,3), me-lo-ne (1,2,3), ra-ke-te (2,3), to-ma-te (2,3), pa-pa-gei (–), ro-bo-ter (3), li-ne-al (–), ka-len-der (–), gur-ke (–), bir-ne (–), kro-ne (–), bre-zel (–), brot (–), frosch (–), blu-me (–), schwein (–), schwan (–), prinz (–), pfau (–), trau-be (–), pla-net (–), zi-tro-ne (–), trom-pe-te (–), kro-ko-dil (–), scho-ko-la-de (–)

**Nachträge der Lehrkraft (ganzer Name):** (leer)

**Gesperrte Einzelsilben** (werden nie gezogen): kot, pis, scheis, tot

## Ergebnis
Keine Fehler.
