# Azerbaijan census populations: notes

Companion to `aze-census.csv` (shapeName, year, population, source_url). 469 rows, 8 census years. 1926 not included (see Gaps).

## Sources actually used

- 1939: Demoskop Weekly, [«Численность наличного населения СССР по районам и городам»](https://www.demoscope.ru/weekly/ssp/rus_pop_39_2.php), Azerbaijan SSR block, present population (final results, including the centrally added «special contingent»), read 2026-11-26. Only the 42 raions that match one district of today are used (a raion with its town counts as the district, as below); the matching is `../rayonlar/data/raions-1939.json`, where every 1939 unit is drawn, merged and split ones included. Left empty for 1939: Baku, Ganja, Sumqayit, Shirvan, Mingachevir, Yevlakh, Goranboy, Naftalan, Samukh, Hajigabul, Quba, Kurdamir, Agsu, Sabirabad, Saatly, Salyan, Neftchala, Tartar, Kalbajar, Khizi, Absheron, Shamakhi, Gobustan, Shabran, Siazan, Julfa, Babek, Kangarli, Sharur, Sadarak, Khojaly, Khojavend.
- 1959, 1970, 1979, 1989: Demoskop Weekly, all-Union census tables, "Азербайджанская ССР", by raion and city. Figures are the **present population (наличное население)**. Pages: `ussr59_reg1`/`ussr59_reg2`, `ussr70_reg1`/`ussr70_reg2`, `ussr79_reg1`/`ussr79_reg2`, `sng89_reg1`/`sng89_reg2` under `https://www.demoscope.ru/weekly/ssp/`. `_reg1` has raions and city councils, `_reg2` has the urban tables with city proper.
- 1999, 2009, 2019: azstat table "Permanent population by economic regions and administrative units" (`https://www.stat.gov.az/source/demoqraphy/az/001_17.xls`; Baku from `.../ap/az/2_4.xls`). These are the **permanent population (daimi əhali)**, **rounded to 100** (published in thousands with one decimal). I could not open stat.gov.az or the xls from here. The numbers were read from Wikidata statements (P1082, point in time = census date) that cite those azstat files. Spot checks against Russian Wikipedia: Agdash 1999 89,214 and 2009 98,599, Balakan 83,732 and 89,827, all agree with the rounded values.
- Access caveat: demoscope.ru could not be reached directly (connection reset). The pages were fetched through a third-party text proxy (r.jina.ai) that returned the page text unchanged. A further probe through that proxy was blocked by the permission system, so I stopped using it.
- The "2019" column of the English Wikipedia article "Administrative divisions of Azerbaijan" was **not used**. It sums to 10.46 M, above the census total, and Baku 2,616,948 is not the census figure (2,293,100). Treat it as a later estimate.

Present (1959–1989) and permanent (1999–2019) populations differ by a few percent; they are not strictly one series.

## Mapping rules

- Shapes are current borders. A Soviet value is used only where the raion matches the current unit; ones I found to be split, merged or redrawn are left empty (list below).
- "X District" = the raion **including its centre city**, as azstat counts it today (checked: azstat 2019 Lankaran 223,700 / Yevlakh 125,600 / Shaki 180,500 only fit the 1989 figures if the city is inside the district). Where a census listed the city separately, district = city (or city council) + raion, summed by script. That applies to:
  - Shaki 1970, 1979, 1989
  - Yevlakh 1970, 1979, 1989
  - Lankaran 1979, 1989
  - Julfa and Ordubad 1989 (city council + rural raion)
- "X City" = the city alone (the town row, "г.", not the whole city council with its settlements), except Baku and Sumqayit, which are the full city council (Бакинский / Сумгаитский горсовет). azstat's Sumqayit matches the council total, not the city proper.
- Baku City: council total incl. settlements (993,300; 1,265,515; 1,549,830; 1,759,307). City proper ("г. Баку") would be 642,507; 851,547; 1,021,969; 1,150,055. Script check for 1959: the four city districts sum to 642,507 = г. Баку; with the six settlement councils the sum is 971,304 against the council's 993,300 (the remaining 21,996 sits in settlements not shown separately). I used the council total because the 2009 and 2019 values cover the whole municipality.

### Renames used

| Soviet name | Shape |
|---|---|
| Kirovabad (city) | Ganja City |
| Ali-Bayramli (city) | Shirvan City |
| Stepanakert (city) | Khankendi City |
| Nukha (Shaki after 1968) | Shaki City / District |
| Akhsu | Agsu |
| Astrakhan-Bazar (Dzhalilabad from 1967) | Jalilabad |
| Vartashen | Oghuz |
| Kutkashen | Qabala |
| Kuba | Quba |
| Kakh | Qakh |
| Geokchay | Goychay |
| Kedabek | Gadabay |
| Tauz | Tovuz |
| Shamkhor | Shamkir |
| Zhdanov | Beylagan |
| Pushkin | Bilasuvar |
| Ilyich, and Norashen before 1964 (same raion, renamed) | Sharur |
| Mir-Bashir | Tartar |
| Kubatly | Qubadli |
| Belokany | Balakan |
| Kusar | Qusar |
| Khachmas | Khachmaz |
| Shemakha | Shamakhi |
| Kasum-Ismailov + Shaumyan (merged 7 Feb 1991) | Goranboy |
| Martuni + Hadrut (merged by the 1991 law) | Khojavend |

- Goranboy and Khojavend are **sums of two whole raions** (script), per the ru.wikipedia history sections. Drop them if you prefer strict one-to-one mappings. Goranboy 1959 includes the Naftalan settlement (1,255).
- Shusha: the Shusha raion contains Shusha city. Shusha District = raion total, Shusha City = city only, so the two shapes overlap in meaning. If the Shusha City shape lies inside the District shape, show only one.

## Left empty on purpose (split, merged or redrawn)

Soviet years (1959–1989) dropped after the boundary check:
- **Goygol (Khanlar)**: azstat's recast 1979 value is 41,200 against Khanlar's 76,370, and Khanlar 1959 is 32,592 against 71,991 in 1970. Territory moved (Samukh carved out, other changes). I kept 1999–2019 only.
- **Shamakhi**: Soviet raion was 1.5x azstat's recast figure (Gobustan/Maraza carved out).
- **Tartar**: Soviet Mir-Bashir 47,513 against azstat recast 70,300 for 1979. Mardakert part is not mapped.
- **Absheron**: Soviet Apsheron raion (from 1963) does not match the current unit. azstat's own series jumps (81,800 in 1999, 189,800 in 2009, 428,000 in 2019) as the territory grew. Treat 2009 and 2019 as non-comparable to 1999.
- **Sabirabad** and **Salyan**: Soviet figures 10 to 17 percent above azstat's recast ones (Neftchala and Hajigabul/Shirvan area changes). Salyan 1959 and 1970 also include the Neftchala area (the Neftchala raion was abolished in 1956 and recreated later).
- **Qazakh**: Soviet Kazakh raion included Agstafa (split off 24 Apr 1990). Both left empty before 1999.
- Never existed as a unit in the censuses: **Agstafa, Babek (see below), Gobustan, Hajigabul** (Kazi-Magomed area, raion formed 1990), **Kangarli** (2004), **Khizi, Shabran, Siazan** (all inside Divichi raion, so "Shabran = Davachi" left empty), **Samukh** (recreated 1992), **Sadarak**, **Khojaly** (from Askeran, partial), **Neftchala 1959 and 1970** (no raion then).
- **Babek**: the Nakhchivan raion (rural) 1959/1970 and Babek 1979/1989 are possibly one unit, but I left it empty as instructed. Values: Nakhchivan raion 23,245 (1959) and 38,285 (1970), Babek 46,340 (1979) and 54,527 (1989).
- **NKAO**: Askeran (1979 19,775; 1989 20,954), Mardakert (1959 37,734; 1970 44,004; 1979 44,075; 1989 47,047) and Stepanakert raion (rural; 1959 20,064; 1970 19,570) are not mapped (partial overlaps with Khojaly, Tartar, Kalbajar, Khankendi). Shaumyan is summed into Goranboy, not Kalbajar.
- **Naftalan City** is included from 1970, when it became a city council. Before that it was a settlement in Kasum-Ismailov raion. Say so if you want it left empty as in your brief.
- Soviet 1959 raions predate the 1963 consolidation, and I could only cross-check 1979 and 1989 against azstat. Saatly 1959 to 1970 grows 1.76x and Dashkasan was abolished 1963 and re-formed 1965. Use 1959 values with that in mind.

## Doubts

- **Occupied territories** (1999–2019): azstat values for Agdam, Fuzuli, Tartar, Khojavend (2019 only, 43,871, from a zip file reference), Jabrayil and others were not enumerated by a census on the ground. They are estimates. Kalbajar, Lachin, Qubadli, Zangilan, Jabrayil, Khankendi, Shusha and Khojaly have no 1999–2019 rows (no azstat figure found). Agdam 2019 (174,800) is a pre-occupation estimate, not a count.
- **Cities within azstat**: Lankaran City, Yevlakh City, Shaki City and Shusha City have no 1999–2019 rows because azstat reports them inside the district.
- **Baku 1999** and **Aghjabadi 1999** are missing in the Wikidata copy of the azstat table. Aghjabadi 2009 (121,707) and 2019 (135,500) are cited to Wikidata, not azstat.
- Rounding: 1999–2019 values end in 00 (except those noted). Do not treat them as exact counts.
- Ganja City 1959 (city proper 116,122) is not comparable with 1970 and later (city 189,512), which absorbed adjacent land. Shirvan City 1959 (13,427) likewise grows sharply to 1970 (33,828). Ali-Bayramli became a city council in the 1960s.

## Duplicate "Lankaran District" shape

The geojson has two features named "Lankaran District", and both are Lankaran. One is a normal polygon (lon 48.54 to 48.88, lat 38.60 to 38.94) west and south of Lankaran city, the main district. The other is a MultiPolygon (97 points, lon 48.82 to 49.21, lat 38.85 to 39.30), a thin coastal strip on the Caspian between Masally and Neftchala. It is the Caspian shore and waters of the same district, not another district. All other 77 names are unique and every real raion and city is present, so nothing is mislabelled. The CSV carries a single set of rows under "Lankaran District"; apply it to both features (or colour only the large one).

## Gaps

- 1926: Demoscope has it by uezd only (13 uezds, Nakhchivan, Nagorno-Karabakh), much larger than today's districts; not included.
- Khojaly District: no rows at all.
- Pre-1999 values for the new units (Gobustan, Hajigabul, Kangarli, Khizi, Shabran, Siazan, Samukh, Sadarak, Agstafa, Babek) are empty, as above.

## Totals (data/totals.csv)

The Republic's totals are the census counts from the census table of Wikipedia's "Demographics of Azerbaijan" (its source: the State Statistical Committee). For 2019 the same page's other table gives 9,981,457; the census table's 9,951,409 is used here. The map's district figures do not add up to these totals: districts are missing in some censuses (Baku 1999, the occupied districts from 1999), and towns counted inside their district are shown separately.


---

# Iranian Azerbaijan census populations: notes

Files: `irn-census.csv` (55 counties), `irn-census-provinces.csv`. Sums and cross-checks were done by script. No guessed or interpolated values.

## Sources actually used

| Year | Source | Reliability |
|---|---|---|
| 2016 | Statistical Centre of Iran (SCI) "Population and Households" xlsx, hosted by Iran Data Portal (IDP) | Official. County sums equal province totals. |
| 2011 | SCI settlement-level files hosted by IDP (`East-Azerbaijan.xls`, `West-Azerbaijan.xls`, `Ardabil.xls`, `Zanjan.xls`), county rows | Official. Equal to the English Wikipedia 2011 column and to citypopulation.de. |
| 2006 | English Wikipedia province pages (county table citing SCI 2006) | See caveat below. |
| 1996 | statoids.com/yir.html, list "counties at the time of the 1996 census" culled from SCI | Not on the preferred list. County sums equal the province totals on citypopulation.de exactly, and the national sum is 60,055,488, the official total. |
| 1976 | IDP `1976-census.pdf` (scan), tables 6, 7 and 21 | Official, read by eye from the scan. Every figure was checked as male + female and against the province total. |
| 1956 | IDP `1956-census-.pdf` (scan), tables 1 and 5 | Official, but table 5 is an estimate (see below). |
| 1966, 1986 | IDP scans | No county data in them (see below). |

- amar.org.ir could not be reached from this environment (connection fails), so SCI data came through IDP and the Wikipedia citations.
- IDP's 2006 province PDFs (`azerbaijan-sharghi.pdf` etc.) render blank, so they are unusable.
- IDP's 2011 and 2016 pages carry no county tables for 1996 or 1986.

## Corrections to the boundary file

- Miandoab is in West Azerbaijan, not East Azerbaijan (the centroid grouping was wrong). Everything else is in the right province.
- The boundary file's spelling maps to SCI names as follows: Ashnavieh = Oshnavieh, Naghadeh = Naqadeh, Urumia = Urmia, Shahindezh = Shahin Dezh, Showt = Shout, Khoramdareh = Khorramdarreh, Soltanieh = Soltaniyeh, Garmi = Germi, Kahlkhal = Khalkhal, Kosar = Kowsar, Ardebil = Ardabil county, `Chaldoran County` = Chaldoran, Nir = Nayer.
- The file's 55 counties are the 2016 counties (before the post-2016 splits Hurand, Leylan, Torkamanchay, Baruq, Chaharborj, Mirabad, Aslan Duz and Ungut). The 2016 figures match this area. Those eight later counties are not in the file and not in the CSV.

## Rule used for splits

- A county cell is empty when the county did not exist at that census.
- It is also empty when a later child county took 10% or more of the pre-split area's population, so the figure is not "roughly today's area".
- A parent whose child took less than 10% is kept. Example: Ardabil county 2006 includes Sareyn (18,231, 3.4%).
- Pre-split combined figures are listed below. They are not split.

### Counties formed after the first censuses

| County | Formed | Years left empty | Notes |
|---|---|---|---|
| Khoda Afarin (from Kaleybar) | 2010 | 2006 and earlier | Kaleybar 2006 = 87,259 includes it. 2011: Kaleybar 48,837 plus Khoda Afarin 34,977 = 83,814. Kaleybar is empty for 2006 and 1996. |
| Chaypareh (from Khoy) | 2007 | 2006 and earlier | Khoy 2006 = 365,573 includes it (child 11.8%). Khoy is empty for 2006 and 1996 (323,194 includes it). |
| Poldasht, Showt (from Maku) | 2007 | 2006 and earlier | Maku 2006 = 174,578 includes both (2011 values sum to 183,453). Maku is empty for 2006 and 1996 (202,939 also includes Chaldoran). |
| Sareyn (from Ardabil county) | 2009 | 2006 and earlier | Ardabil 2006 = 542,930 includes it and is kept (3.4%). |
| Soltaniyeh (from Abhar) | 2013 | 2011 and earlier | The 2016 figures are post-split. Abhar 2011 = 169,176 includes Soltaniyeh. 2016: Abhar 151,528 plus Soltaniyeh 29,480 = 181,008. Soltaniyeh is 16% of that, so Abhar is empty for 2006 and 2011. |
| Ajabshir, Azarshahr, Charuymaq, Osku, Varzaqan, Kowsar, Namin, Nir, Chaldoran, Oshnavieh, Ijrud, Khorramdarreh, Mahneshan, Tarom | 1996-2002 (per SCI via statoids; no exact dates found) | 1996 and earlier | Parents not documented in the sources; see the 1996 section. |
| Jolfa (from Marand), Malekan (from Bonab) | before 1996 | before 1996 | Only 1996 and later exist. |

## 1996

- Included (20): Bilehsavar, Bostanabad, Bukan, Heris, Jolfa, Khodabandeh, Mahabad, Malekan, Marand, Meshkinshahr, Miandoab, Mianeh, Parsabad, Piranshahr, Salmas, Sarab, Sardasht, Shabestar, Takab, Urumia.
- Test used: no documented post-1996 split from that county, and growth to 2006 consistent with its province. Takab (1.04 against about 0.87 expected) and Bilehsavar are the loosest passes.
- The parents of Azarshahr, Osku, Kowsar, Namin, Nir, Oshnavieh, Ijrud, Khorramdarreh, Mahneshan, Tarom are not stated in any source I could reach. I inferred them from the 1996 against 2006 totals. A few included counties (Shabestar, Sarab, Mianeh, Bostanabad, Heris) may have given up small areas.
- Left empty because they are parents of later splits. Raw 1996 figures:

| County | 1996 figure | Reason |
|---|---|---|
| Ahar | 198,028 | Includes Varzaqan. 2006 Ahar 147,781 + Varzaqan 46,833 = 194,614. |
| Tabriz | 1,486,509 | Rural part clearly larger than later (probably Osku and Azarshahr). |
| Maragheh | 277,216 | Ajabshir. |
| Bonab | 112,985 | Ajabshir (you named it). Growth is normal, so the loss may be small. |
| Hashtrud | 120,406 | Charuymaq. |
| Kaleybar | 92,260 | Khoda Afarin. |
| Ardebil | 563,477 | Namin, Nir, Sareyn. |
| Germi | 104,064 | Kowsar. |
| Khalkhal | 137,992 | Kowsar. |
| Maku | 202,939 | Chaldoran, Poldasht, Showt. |
| Khoy | 323,194 | Chaypareh. |
| Naqadeh | 162,228 | Oshnavieh. |
| Zanjan | 537,517 | Ijrud, Mahneshan, Tarom, Khorramdarreh. |
| Abhar | 200,305 | Khorramdarreh, Soltaniyeh. |
| Shahindezh | 104,598 | Falls to 89,356 in 2006 while West Azerbaijan grew 15%, so there was an unexplained boundary loss. Left empty. |

- Takestan (135,983) was part of Zanjan province at the 1996 census and left for Qazvin province on 1996-12-31. It is not a county of the map.

## Gaps

- **1986:** no county or province figures found. The IDP 1986 file is "Selected Tables", national totals and percentages only, with no ostan population counts. The cell is empty for all units.
- **1966:** the IDP file has only ostan, farmandari-kol and city tables, no shahrestans. The three province-level totals are in the province CSV.
- **1976 (4 county cells):** Urumia (Rezaiyeh) 369,435, Salmas (Shahpur) 87,912, Sardasht 54,315, Piranshahr (Khaneh) 59,696.
  - These are provisional. Area continuity is inferred from growth consistent with 1996 and 2006, not documented.
  - 1976 shahrestans were mostly much larger than today's counties.
  - Left empty (raw 1976 figure, reason):
    - Tabriz 1,074,173, includes Shabestar, Osku, Azarshahr, etc.
    - Ardabil 369,010.
    - Ahar 296,984.
    - Maragheh 309,729.
    - Marand 189,903, includes Jolfa.
    - Mianeh 199,232.
    - Hashtrud 174,876.
    - Moghan 174,053 (Parsabad, Bilehsavar).
    - Khalkhal 156,456.
    - Meshkinshahr 128,022.
    - Sarab 122,105.
    - Mahabad 196,812, includes Bukan.
    - Miandoab 231,153, includes Takab and Shahin Dezh.
    - Khoy 188,274.
    - Maku 124,916.
    - Naqadeh 92,362.
    - Zanjan 339,011.
    - Khodabandeh 122,917.
    - Abhar 117,072.
  - Mianeh was read as 199,232 (male 102,290 + female 96,942), which makes the East Azerbaijan total 3,194,543 check.
- **1956 (2 county cells):** Urumia (Rezaiyeh) 202,205 and Salmas (Shahpur) 47,163.
  - These are SCI "estimated 1956 population of shahrestans as reconstituted in 1959" (table 5), the census redistributed to 1959 boundaries, not a raw count.
  - The same table gives Khoy 113,448, Mahabad 162,511, Maku 85,129, Miandoab 49,682 and Naqadeh 58,885, all left out as non-comparable.
  - The 1956 East Azerbaijan shahrestans (Tabriz 627,110, Ardabil 231,491, etc.) are far larger than today's counties, so they are left out.
  - Zanjan shahrestan (386,201) was inside Gilan census province and is not a province total.
- **Zanjan province:** no 1966 or 1956 total. It was part of Gilan.

## 2006 caveat

- The Wikipedia county values sum to less than the official provincial totals:

| Province | Wikipedia county sum | Official total | Gap |
|---|---|---|---|
| East Azerbaijan | 3,527,267 | 3,603,456 | -2.1% |
| West Azerbaijan | 2,831,779 | 2,873,459 | -1.5% |
| Ardabil | 1,209,968 | 1,228,155 | -1.5% |
| Zanjan | 942,818 | 964,601 | -2.3% |

- Most likely the Wikipedia figures are household population, which excludes institutions. This is unconfirmed, because the SCI 2006 tables could not be fetched. Treat the 2006 county values as about 2% low.
- The 2011 and 2016 county sums equal the province totals exactly.
- The province CSV uses the official 2006 totals from citypopulation.de.

## Other doubts

- Osku jumps from 98,988 (2011) to 158,270 (2016). Cause not found; it is not a documented boundary change.
- Abhar 2016 drops (169,176 to 151,528) only because of the 2013 Soltaniyeh split.
- Kaleybar 2011 is post-split and 2016 is consistent.

## Province totals

- **Boundaries:** 1996, 2006, 2011 and 2016 totals are in the borders of the day, with Ardabil province (created 1993) separate. For 1996 and 2006 the citypopulation.de figures are SCI recomputed to present borders. Zanjan 1996 = 900,890 excludes Takestan. As enumerated in 1996, with Takestan, it was 1,036,873.
- **Pre-1993 East Azerbaijan:** it included Ardabil. The rows `East Azerbaijan (incl. Ardabil)` give a continuous series for 1956-2016. Values for 1996 and later are computed by script as East Azerbaijan plus Ardabil.
- **Zanjan 1976:** 579,000 is the Zanjan ostan of three shahrestans (Zanjan, Khodabandeh, Abhar). Takestan was not in it, so it is comparable with the present province but not exact.
- **West Azerbaijan 1956:** 721,136 is the census province total; the 1959-reconstituted shahrestans sum to 719,023.
- **1986:** no data.
