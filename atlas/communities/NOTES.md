# Georgia and Dagestan Census Data: Notes

Files: `communities-geo.csv`, `communities-dag.csv`, `communities-totals.csv`. Columns `azerbaijanis` and `total` are counts of people. A blank (missing row) means no data, never zero. A `0` means the source shows "-" (none). Shares are to be computed by the map code.

Path note: the brief gave `xeriteler/icmalar/data/`; the geojson files actually live in `atlas/icmalar/data/raw/`, so the CSVs are written to `atlas/icmalar/data/`.

## Sources actually used

The primary source (ethno-kavkaz.narod.ru) could not be read: its HTTPS certificate is `*.narod.ru` and does not match `www.ethno-kavkaz.narod.ru`, and plain HTTP redirects to HTTPS. I did not bypass the certificate check. demoscope.ru did not respond. The Wayback Machine and ruwiki mirror returned 429 / 401. ru.wikipedia.org returned 429 for a long stretch, then allowed a small number of pages.

What was used instead (all are re-publications of the official censuses; none is the original statistical volume):

- pop-stat.mashke.org (Tim Bespyatov's census archive). Georgia by raion 1970, 1979, 1989, 2002, 2014 (`georgia-ethnic<year>.htm`); all-USSR by district 1939 (`ussr-ethnic1939-districts.htm`); republic totals 1926-1989 (`ussr-ethnic<year>.htm`); Georgia and Dagestan 1926 (`ussr-ethnic1926-*.htm`); Dagestan 2002, 2010, 2021 by municipality (`russia-census-<year>-ethnic/dagestan.htm`).
- Geostat `17_Total-population-by-regions-and-ethnicity.xls` (https://geostat.ge/media/51740/17_Total-population-by-regions-and-ethnicity.xls) for the 2014 national and regional check: Georgia 233,024 of 3,713,804. It has regions only, no municipalities. The 2014 municipality figures come from mashke (same numbers citypopulation.de shows for Marneuli, 87,371 of 104,300).
- ru.wikipedia (tables that cite ethno-kavkaz) for Dagestan 1959-1989 in three units only: Derbent city, Dagestanskiye Ogni, Derbentsky District (1970-1989).

## Coverage

| Region | 1926 | 1939 | 1959 | 1970 | 1979 | 1989 | 2002 | 2010 | 2014 | 2021 |
|---|---|---|---|---|---|---|---|---|---|---|
| Georgia raions | Tbilisi only | 51 | none | 67 | 67 | 65 | 60 | - | 60 | - |
| Dagestan units | 4 cities | 37 | 2 | 3 | 3 | 3 | 51 | 51 | - | 51 |

Gaps that need another source (ethno-kavkaz or the printed volumes):

- Georgia 1959 by raion: not found anywhere reachable.
- Georgia 1926: the source is by community (temi) under uezds, not raions; only Tbilisi city is mapped.
- Dagestan 1959, 1970, 1979, 1989 by raion: only Derbent, Dagestanskiye Ogni and Derbentsky were found (via ruwiki). The source book is the Dagstat 1990 collection "Национальный состав населения ... Дагестанской АССР по данным ВПН 1970, 1979 и 1989".
- Dagestan 1926: raions were different units (okrug-level); only four city rows are used.

## Totals (`communities-totals.csv`)

- Taken from the republic rows of the mashke USSR pages. Georgia 1989 total of Azerbaijanis is 307,556 (matches the official figure); the Georgia raion page for 1989 sums to 307,512, so a raion-by-raion check differs by 44.
- Georgia 2002 and 2014 exclude Abkhazia and Tskhinvali region (not covered by Geostat). 1926-1989 include them.
- 1926 figure is "тюрки" (Turks), which the census used for Azerbaijanis, not an identical category. 1939 onward is "азербайджанцы". In Derbent and Derbentsky from 1959 the Tats were recorded as Azerbaijanis; the ruwiki page says terekeme and Tats are included in the Azerbaijani count.
- Dagestan 2002 / 2010 / 2021 in the mashke table (111,320 / 130,516 / 116,952) differ slightly from the Rosstat national figures (2002: 111,656; 2010: 130,919). The mashke tables are based on the Dagstat district volumes. Treat as Dagstat counts.

## Georgia mappings

- Shape names are matched to the renamed Soviet raions. Renames used:
  - Marneuli = Borchali (1939 "Борчалинский"), Marneulsky from 1947-49.
  - Bolnisi = Lüksemburg (1939 "Люксембургский").
  - Dmanisi = Bashkichet (1939 "Башкичетский").
  - Kharagauli = Ordzhonikidze raion; Ozurgeti = Makharadze; Baghdati = Mayakovsky (1939 "Багдадский"); Khoni = Tsulukidze; Senaki = Tskhakaya; Martvili = Gegechkori; Ninotsminda = Bogdanovka; Dedoplis Tskaro = Tsiteltskaro; Akhalgori = Leningori; Mestia = Zemo-Svaneti (1939); Lentekhi = Kvemo-Svaneti (1939); Tkibuli = Tkvibuli; Sagarejo = Sagaredjo.
- Cities under republic or council status were separate from their raion in 1970-1989 and are in the same shape today. Where this applies the script sums them: Gori (raion + city council, 1970, 1979, 1989), Zugdidi (raion + city council, 1970, 1979; raion + city 1989), Marneuli 1989 (city + raion; the sum 120,394 equals citypopulation.de's Marneuli 1989 total). Tskaltubo, Tkibuli and Chiatura use the city council (it includes the villages) in 1970 and 1979.
- 2014: the self-governing cities Telavi, Mtskheta, Ambrolauri, Zugdidi, Akhaltsikhe, Ozurgeti, Gori were added to their surrounding municipality (the shape covers both). This is arithmetic on two published rows, not an estimate.
- Tbilisi: city council row in 1970/1979; city in 1939 (519,220) and 1926 (Tiflis, 294,044); city in 1989/2002/2014 (all districts).
- Shapes with no rows in some years:
  - Sokhumi: never mapped. Cannot tell whether the shape is the city or the district.
  - Java, Akhalgori: South Ossetia. 1970 and 1979 only (Leningori/Java); no data in 1989, 2002, 2014 usable.
  - Gagra, Gudauta, Gulripshi, Ochamchire, Gali: Abkhazia. No 2002/2014 data (Geostat did not count it). Gulripshi has a tiny partial 2002 row that was dropped.
  - No 1939 row (raion did not exist, was inside a larger raion, or no safe match): Gulripshi, Tsqaltubo, Terjola, Sachkhere, Chiatura (1939 Chiatura raion included Sachkhere), Khelvachauri, Shuakhevi, Khashuri (1939 raion included Kareli), Kareli, Tetri Sqaro (probably the 1939 Agbulakh raion; not verified), Mtskheta, Akhmeta and Telavi (1939 Telavi raion covered Akhmeta), Gardabani (see below), Java, Akhalgori.
- Not in the shape set, so not mapped: Rustavi (1989: 11,576 Azerbaijanis; 2014: 4,661), Batumi, Kutaisi, Poti. Rustavi may be inside the Gardabani or Tbilisi polygon; I could not tell. Gardabani's 1970-1989 counts exclude Rustavi.
- Gardabani 1939 (Karayaz raion, 17,770) was dropped: the 1970 raion is 6.6 times larger, so the borders are not the same.
- 1939 raions with the largest border risk and kept anyway: Marneuli (48,970 vs 91,054 in 1970), Bolnisi, Dmanisi. Treat 1939 as approximate for all Georgia shapes.
- 2002 rows marked `(*)` in the source (Gori, Kareli, Oni) cover only the part controlled by Tbilisi; the figures are kept as published.
- Aspindza, Adigeni, Akhaltsikhe 1939: the 1939 Azerbaijani counts (21,612; 32,923; 28,428) are Meskhetian Turks, recorded as Azerbaijanis, deported in 1944. Same ethnonym, different community.
- Zero versus suppressed: Geostat 2014 prints "…" for values of 10 or fewer in its regional table. The mashke municipal table prints "-" which I recorded as 0; it may mean "under 10" in places.

## Dagestan mappings

- 2002, 2010, 2021: exact name match of municipal rayon or urban okrug. 2002 uses the first row of each city (the okrug), not the "г." sub-row.
- 2010: Derbentsky District shows 59,917 here, but ruwiki's table (citing the Dagstat volume) shows 57,476 for 2010. Unresolved; kept the mashke value. Another doubt: for 2010 mashke has two totals ("exact" and "distorted"); the exact one is used.
- 1939 (mashke district table):
  - Raion-center towns were separate okrugs in later years, so they are taken from the raion's sub-rows: Buynaksky = village rows only, Khasavyurtovsky = village rows only; Buynaksk, Khasavyurt, Izberbash, Derbent (city), Dagestanskiye Ogni are the matching city rows; Kayakentsky is the raion total minus Izberbash.
  - Derbentsky is the rural raion row ("Дербентский (рц в г. Дербенте)").
  - Makhachkala Urban Okrug uses the Makhachkala city council (114,474), which is smaller than the present okrug.
  - Tsumadinsky is "Цумандинский" in the 1939 source.
  - 1939 raions with no row or no safe match: Suleyman-Stalsky (probably the "Касумкентский" raion, 102 Azerbaijanis of 40,105; left empty because the match is a guess), Magaramkentsky (created after 1939), Kizlyarsky, Tarumovsky, Nogaysky, Kizilyurtovsky, Novolaksky (outside Dagestan in 1939), Shamilsky, Gergebilsky, Tsuntinsky (1939 raion much smaller; probably merged with Kakhib), Kizilyurt, Kizlyar, Kaspiysk, Yuzhno-Sukhokumsk.
- 1926: only the city rows of Derbent (7,831), Dagestanskiye Ogni (126), Khasavyurt (2) and Kizlyar (0). Buynaksk and Makhachkala show "…" (not published), so they are empty. The 1926 raion rows were not mapped (different okrug borders); ruwiki's 1926 Derbentsky figures (14,286 of 25,135) differ from mashke's 1926 "Дербентский" row (13,768 of 20,479).
- 1959-1989: Derbent city (labelled "горсовет" in the source; the 1939 value for city only is 34,052, so the later rows may include nearby settlements), Dagestanskiye Ogni, Derbentsky District. The ruwiki 1989 Derbentsky figure is 28,481 of 63,797.
- Makhachkala has historical figures on ruwiki, but with no total row; not used.
- 2021 Rosstat/Dagstat count Azerbaijanis as a separate group from Tats; in 2010 and earlier mashke notes that some Tats were merged. Derbentsky's 2021 drop (59,917 to 49,671) may partly be a definition change; not verified.

## Doubts to check first

1. Derbentsky 2010: 59,917 (mashke) vs 57,476 (ruwiki/Dagstat).
2. Georgia 1939 raion borders (all rows are approximate).
3. Whether the shapes Gori, Telavi, Zugdidi etc. include the city in the geometry (assumed yes) and whether Rustavi sits in the Gardabani polygon.
4. Dagestan 1959-1989: needs the ethno-kavkaz or Dagstat tables.


---

# Azerbaijanis in Armenian SSR by raion: notes

Source: https://ethno-kavkaz.narod.ru/rnarmenia.html (1926 uezd/volost pages linked from it; the page's own sources: RGAE f.1562 op.336; 1926 census vol. 14; "Narody Rossii" 1994). All numbers were parsed by script from the page. Figures were not cross-checked: demoscope.ru did not answer (connection closed / no HTTP reply), and I did not try other routes around it.

## Path
The brief named `xeriteler/icmalar/data/`; that folder no longer exists (the geojson now sits in `atlas/icmalar/data/raw/`). Files were written to `atlas/icmalar/data/`.

## What the source has
- 1939: Azerbaijanis and total for 38 raions plus Yerevan and Leninakan. This is the only census with raion-level data on the site.
- 1926: only uezd totals and volosts (Soviet raions did not exist yet). Not mapped to shapes; cells left empty. Uezd values (Azerbaijanis/total): Erivan excl. city 19,071/114,039; Daralagyaz 5,941/30,074; Dilijan 8,181/78,665; Zangezur 4,433/68,918; Leninakan 147/166,793; Meghri 1,201/8,139; Nor-Bayazet 14,065/101,570; Pambak-Lori 10,616/133,148; Echmiadzin 8,247/114,505; Yerevan city 5,216/67,121. Uezd sums are 77,118 / 882,972 against the republic row 76,870 / 878,929 (source inconsistency, 248 and 4,043 apart).
- 1959, 1970, 1979, 1989: republic totals only, plus Yerevan (1959, 1979) and Leninakan (1959). No raion figures anywhere I could reach. All raion cells for these years are empty; Yerevan has rows for 1926, 1939, 1959, 1979. No Yerevan figure for 1970 or 1989 on the site.
- 1926 "тюрки" is used as Azerbaijanis.
- 1939 raion rows (incl. Yerevan, Leninakan) sum to 130,676 / 1,280,009 vs the republic row 130,896 / 1,282,338; the source omits about 220 Azerbaijanis. Unexplained.

## Renames and mapping (1939 name -> shape)
Verified against the English Wikipedia table "Administrative divisions of the Armenian SSR" (https://en.wikipedia.org/wiki/Administrative_divisions_of_the_Armenian_Soviet_Socialist_Republic) and Russian Wikipedia pages on the districts:
- Basarkechar -> Vardenis, 1969 (also ru.wikipedia Варденисский район: renamed 1969).
- Vedi -> Ararat, 1968 (Russian Wikipedia: renamed 15 May 1968; the English table says Vedi 1930-1968; the raion was abolished 1962, restored 1964).
- Zangibasar -> Masis: the English table gives Zangibasar 1937-1953, abolished 1953, restored 1969 as Masis. The brief's "renamed 1969?" is only partly right: the raion was abolished and re-created.
- Akhta -> Hrazdan, 1959.
- Nor-Bayazet -> Kamo 1959 (shape Gavar; Kamo became Gavar later, not checked).
- Mikoyan -> Yeghegnadzor (Mikoyan 1935-1957).
- Alaverdi -> Tumanian, 1969. Kirovakan raion -> Gugark (Kirovakan 1935-1962).
- Kalinin -> Tashir. Agin -> Ani. Alagez -> Aragats. Duzkend -> Akhuryan (1945). Kamarlu -> Artashat (1945). Oktemberyan -> Armavir (Hoktemberyan). Azizbekov -> Vayk. Kafan -> Kapan. Vagharshapat -> Etchmiadzin 1945 (shape still named Vagharshapat).
- Amasia: existed as Aghbaba 1930; abolished 1951, restored 1956, abolished 1962, restored 1963.

Doubtful (filled, but check):
- Krasnoselsk -> Karmir: the shape Karmir (lon 45.03-45.51, lat 40.42-40.74) contains Chambarak (about 45.35 E, 40.59 N), so I mapped it. The Chambarak rename date is not verified against a source; the English table does not list it.
- Kotayk, Hrazdan, etc.: the shapes look like late-Soviet / 1990s raion outlines, while 1939 raions had other borders (for example the 1939 Kotayk raion, Mikoyan raion with Daralagyaz, Basarkechar with parts of today's Gavar/Sevan area). A cell is therefore the 1939 raion's value, not exactly the shape's territory. Treat every 1939 cell as approximate in extent.

Left empty (no safe match):
- Gukasyan (12 Azerbaijanis): shape Ashotck is probably its successor, but no source checked. Ashotck gets no row.
- Karabakhlar (7,489 of 12,832): abolished 1951, attached to Vedi/Ararat; no shape.
- Shamshadin (42): probably the Berd area, shape Tavush? Not verified. Tavush gets no row.
- Leninakan city (161): no shape (Shirak shapes absent; Gyumri is not a shape here).
- Nairi (created 1972), Baghramyan (1983): did not exist in 1939.
- Other shapes (Gavar and Sevan etc.) appear only for 1939.

## Doubts
- 1939 Azerbaijani counts were taken as printed. Percentages were not used.
- The 1926 Pambak-Lori row in the source has a corrupt Russians cell; irrelevant to these columns.
- The 1989 republic figure 84,860 matches the Armenian Goskomstat figure of about 84.9k reported in press (not independently verified against the census volume). Other sources note a separate figure of 7.9k for Azerbaijanis living in Armenia at census date, apparently in the context of expulsions; unclear and not used.
