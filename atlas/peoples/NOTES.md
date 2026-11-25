# Peoples of Azerbaijan by district: notes

Companion to `peoples-az.csv` (shapeName, year, people, count, total, source_url) and `peoples-az-totals.csv` (year, people, count, source_url). Shapes are the 78 features of `atlas/ehali/data/raw/aze-adm2.geojson`. Mapping rules follow `atlas/ehali/data/aze-census-notes.md`.

## Coverage

| Census | By district | Shapes | Rows | Notes |
|---|---|---|---|---|
| 2019 | yes | 66 | 1,386 | Nakhchivan has no district split in the source |
| 2009 | yes | 74 | 1,332 | |
| 1999 | yes | 76 | 1,216 | |
| 1989 | **no** | 0 | 0 | Only republic and Baku/Nakhchivan aggregates were found (totals file) |
| 1979 | yes | 56 | 728 | Only 13 peoples tabulated; no Talysh, Kurds, Turks, Kryz etc. |
| 1970, 1959 | not done | 0 | 0 | The same ethno-kavkaz page has them by raion; not requested, republic totals only |

Totals file: 1959, 1970, 1979, 1989 (whole Azerbaijan SSR including Nagorno-Karabakh AO), 1999, 2009, 2019. The three modern years carry only the groups in their tables (17, 19 and 22 rows); Soviet years carry the 18 peoples plus a few Dagestani, Iranian and other minorities (Lak, Dargins, Agul, Tabasarans, Kumyks, Chechens, Ossetians, Georgian Jews, Assyrians, Greeks, Germans, Poles, Persians, Arabs, Bulgarians, Belarusians), where the source lists them.

## Sources

- **1999, 2009, 2019 by district**: Tim Bespyatov's "Population statistics of Eastern Europe & former USSR" (pop-stat.mashke.org), pages `azerbaijan-ethnic1999.htm`, `-2009.htm`, `-2019.htm`. These reproduce the State Statistical Committee of Azerbaijan census volumes ("Ethnic composition of the population by economic regions and administrative territorial units"; the 1999 page cites the 2000 Baku volume). stat.gov.az / azstat.gov.az did not resolve from here (DNS failure), so the originals were not checked. The 2019 page has the economic-region grouping rows; those were skipped.
- **1979 by raion**: ethno-kavkaz.narod.ru. Main table `rnazerbaijan.html` (1979 table, USSR census, without Nagorno-Karabakh AO), plus `azrusukr79.html` (Russians and Ukrainians split) and `azjew79.html` (Jews and Mountain Jews split). The bare host works; the www host has the certificate problem.
- **Totals 1959-1989**: pop-stat.mashke.org `ussr-ethnic1959/1970/1979/1989.htm`, row "Азербайджанская ССР". 1989 names there use Latin look-alike letters in Cyrillic words; normalised by script.
- **1989 by raion**: not on ethno-kavkaz (404 for `*89.html`) or on pop-stat (no Azerbaijan page for 1989). Not obtained.
- Checks run by script: for 1999-2019 each row's people sum (including "Other") equals the stated total; for 1979 Russians + Ukrainians equals the combined column, Jews + Mountain Jews equals the Jews column, and all raion totals sum to the republic total (5,864,334).

## Dash and blanks

A dash in the sources means "none" and is recorded as 0. A blank would mean "not given"; no blank counts remain in the output. Peoples that a census did not tabulate separately have no row at all for that year (not a zero).

## Mapping

Same renames as the population notes (Kuba = Quba, Zhdanov = Beylagan, Pushkin = Bilasuvar, Ilyich = Sharur, Kutkashen = Qabala, Vartashen = Oghuz, Akhsu = Agsu, Belokany = Balakan, Kedabek = Gadabay, Tauz = Tovuz, Shamkhor = Shamkir and so on).

- **Lankaran District (duplicate shape)**: one set of rows, apply to both features.
- **District = raion including its centre city** (as azstat). For 1979 the city and the raion are separate rows in the source and were summed by script: Lankaran, Shaki, Yevlakh. Their city shapes (Lankaran City, Shaki City, Yevlakh City) carry the city row alone in 1979 and in 1999 (azstat sub-rows); 2009 and 2019 have no city figure.
- **Goranboy 1979** = Kasum-Ismailov + Shaumyan raions (sum by script), as in the population notes.
- **Baku City**: 1999-2019 the whole city incl. settlements (as azstat). 1979 = "г. Баку" + "Бакинский горсовет" (the part outside the city proper), 1,533,235. The population file has 1,549,830 for the same year (different source).
- **Ganja City, Shirvan City, Sumqayit City 1979** = the whole city council (Кировабадский, Али-Байрамлинский, Сумгаитский горсовет). The population file uses the city proper for Shirvan (41,583), so totals differ.
- **Nakhchivan City 1979** = Нахичеванский горсовет. **Sharur 1979** = Ilyichevsky raion.
- **Goygol**: 1999 "Xanlar", 2009 and 2019 "Göygöl" (renamed). **Shabran**: 1999 "Dəvəçi" (Davachi, renamed Shabran). **Shirvan City**: 1999 "Əli Bayramlı".
- **Shusha City** has no rows: the source's "Şuşa" row is mapped to Shusha District only (city and district would double count).
- **Left empty before 1999** as in the population notes: Absheron, Agstafa, Babek, Gobustan, Goygol, Hajigabul, Kangarli, Khankendi, Khizi, Khojaly, Khojavend, Qazakh (included Agstafa in 1979), Sabirabad, Sadarak, Salyan, Samukh, Shabran, Shamakhi, Shusha, Siazan, Tartar (Mir-Bashir).
- 1979 district totals differ from `aze-census.csv` by up to about 6 percent in places (Quba, Lachin, Qabala, Aghjabadi). Ethno-kavkaz and Demoscope publish different counts; the ethnic columns here are internally consistent with ethno-kavkaz totals. Use `total` in this file when computing shares.

## Category changes

- **Talysh**: not tabulated in the 1979 census table or the 1970 republic row (absent in the totals file), only 85 in 1959 (republic), 21,169 in 1989, 76,841 in 1999, 111,996 in 2009, 87,578 in 2019. Before 1989 nearly all Talysh were recorded as Azerbaijanis, so the 1979 district rows say nothing about Talysh areas (Lankaran, Astara, Masally, Lerik): the Azerbaijani column contains them. The fall from 2009 to 2019 may reflect how people self-identified rather than demography; the sources do not say.
- **Tats and Mountain Jews**: Mountain Jews were counted separately from Tats in 1959-1989 (republic: 10,324; 11,653; 2,123; 5,484) with large swings between censuses, which suggests categories were applied differently from one census to the next. In 1999, 2009 and 2019 there is no separate Mountain Jew line: they are inside "Jews", and the Jews column of the table is the only place to look. Rows named **"Jews (incl. Mountain Jews)"** are those. In 1979 district rows, **"Jews"** excludes Mountain Jews, and **"Mountain Jews"** is separate; in the totals file 1959-1989 "Jews" also excludes them. Do not add "Jews" and "Jews (incl. Mountain Jews)" across years.
- **Turks**: the census word is "Turks" (Türklər, турки). Mostly Meskhetian Turks, plus a few Turkish citizens and Turks from elsewhere. Recorded as "Turks (Meskhetian)" to match the project list. Not tabulated in the 1979 district table (the republic total is 7,926).
- **Georgians and Ingiloys**: 1979-2009 carry only "Georgians", which includes Ingiloys (Georgian-speaking Muslims of Qakh, Zaqatala, Balakan). The 2019 table separates **Georgians (8,442)** and **Ingiloys (1,817)**; the project label "Georgians (Ingiloys)" is the sum, but the two rows are kept separate.
- **Kryz, Budukh, Khinalug**: no separate line in the 1979 or 1989 tables; where they were counted is not stated. 1999 has none of the three. 2009 has Kryz and Khinalug but not Budukh. 2019 has Kryz, Khinalug, Budukh and also **Khaput** (a Khinalug-related group in Ismailli, 2,462). Khaput is the table's own name and is kept as its own people. Budukh appears only in 2019 (1,044).
- **Rutuls**: no separate line in any district table (republic: 53 in 1979, 336 in 1989). No rows. Not listed in the 1999, 2009 or 2019 tables.
- **Russians and Ukrainians**: separate in 1979 (azrusukr79 page), 1999, 2009, 2019. The 1979 main table combines them; the combined column is not in the CSV.
- **Tatars**: listed as "Tatars" (татары) in every table used; recorded under that name. Earlier Russian-Empire sources used "Tatars" for Azerbaijanis, but not these censuses.
- **Armenians**: 1979 excludes Nagorno-Karabakh AO. 1999 and 2009 Armenian counts in Khankendi, Khojaly, Khojavend, Kalbajar, Shusha, Tartar and Aghdam are not Azerbaijani enumerations (see Gaps).
- Nakhchivan: the 2019 table has the autonomous republic as one row (457,619 Azerbaijanis of 458,910, 1,150 Kurds); no rows for its districts.

## Gaps and cautions

- **1989 by raion is missing.** Available whole-republic and for Baku/Nakhchivan only in the source, so no rows.
- **Armenian-held territories 1999 and 2009** (Khankendi, Khojaly, Khojavend, Shusha, Kalbajar, Lachin, Tartar, Agdam, Fuzuli, Jabrayil, Zangilan, Qubadli, parts of Aghjabadi): figures are not from an Azerbaijani census on the ground. The Armenian counts in Khankendi (43,579 in 1999 and 43,589 in 2009) and Khojavend (29,593 / 29,583) look like Karabakh Armenian figures (about the order of the 1989 census). Treat as estimates and say so on the map. For 2019 the same districts show very small figures (Khankendi 4,281, Khojavend 9,229, Shusha 21,855, Kalbajar 71,039): these are administrative/IDP figures, not a count of resident populations, and are not comparable with 1999 and 2009.
- **Absheron** 1999 (81,798) vs 2009 (189,794) vs 2019 (428,034): territory grew; not comparable. Same for Shabran, Khizi, Siazan, Gobustan, Hajigabul, Kangarli after their re-creation.
- **Baku 2019** total here is 2,330,425; the population file has 2,293,100. The source's ethnic table and the demographic table differ.
- **Aghjabadi 2019** total here is 132,241 (population file 135,500) and **Khojavend 2019** 9,229 (population file 43,871). The ethnic table is the source of these rows.
- Population bases differ (Soviet tables vs the permanent-population tables of azstat); the sources here do not state the base for each. Prefer `total` in this file for shares and do not mix with the population file.
- Percentages in the 1979 source cap small counts at "(0,1%)"; counts are taken from the numbers, never from the percentages.
- 1999-2019 "Other" is kept as its own people row and includes unlisted groups (Lak, Dargins, Greeks, Assyrians and others). 1979 has no "Other" row because the source has no such column; the 1979 total is larger than the sum of the 13 peoples.
- 1926 and 1939 (district level pages exist on ethno-kavkaz, uezd level for 1926) were not collected.
