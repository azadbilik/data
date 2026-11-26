# Sovet rayonları · Soviet raions, 1926–1989

[azadbilik.org/atlas/rayonlar](https://azadbilik.org/atlas/rayonlar/): the raions and city councils of the Azerbaijan SSR at the 1939, 1979 and 1989 censuses, and its uezds at the 1926 census, by people, density, urban share and change. **Each Soviet unit is drawn as the whole district or districts of today that cover its land**; no Soviet raion boundaries are openly published, so none are traced.

| File | What |
|---|---|
| `data/raw/demoscope-1979-1989.json` | Demoskop Weekly's census tables for the Azerbaijan SSR ([1979](https://www.demoscope.ru/weekly/ssp/ussr79_reg1.php), [1989](https://www.demoscope.ru/weekly/ssp/sng89_reg1.php)): present population, total and urban, every row as printed; checked against the live pages on 2026-11-26, no differences |
| `data/raw/demoscope-1939.json` | The [1939 census](https://www.demoscope.ru/weekly/ssp/rus_pop_39_2.php) by raion and city for the Azerbaijan SSR (86 rows; total, urban and the centrally added «special contingent», which the total includes), read 2026-11-26 |
| `data/raw/census-1926.json` | The 1926 census by uezd (total population only), as [ethno-kavkaz.narod.ru](https://ethno-kavkaz.narod.ru/rnazerbaijan.html) tabulates it from the census volumes, every uezd agreeing with Russian Wikipedia's uezd articles (which cite Demoscope); Nagorno-Karabakh (125,159) from Demoscope's nationality table. Demoscope itself was unreachable when this was made |
| `data/raions-1926.json` | The 1926 table: 17 units (Baku and Ganja with their uezds) on 15 shapes |
| `data/raions-1939.json` | The same table for 1939, whose raions were different: 69 units on 61 shapes |
| `data/raions.json` | The table: each Soviet unit's names (az, ru, en), the census rows summed for it, the districts of today it is drawn with, whether that fit is close or approximate, and a note in three languages; `gaps` are districts of today left grey |
| `data/raions.csv` | One row per Soviet unit and census as counted (merged pairs apart), with the census rows summed and today's districts: the table in [azadbilik/data](https://github.com/azadbilik/data) |
| `data/raions.geojson`, `data/edges.geojson`, `data/raions-1939.geojson`, `data/edges-1939.geojson` | What the page reads (shapes, and their outlines less the seams between grouped districts), built by `node scripts/build.mjs` |

The build stops unless, for each census, every row is used once, every district of today is drawn or listed as a gap, and the units add up to the republic's total (2,314,430 in 1926, the sum of the uezds; the census total usually cited is 2,314,571; 3,205,150 in 1939; 6,028,253 in 1979; 7,037,867 in 1989), urban people too (1,156,798; 3,200,254; 3,789,985).

## How it is drawn

- Split since: Divichi = Shabran + Siazan (1992); Kazakh = Qazakh + Agstafa (1990); Shemakha = Shamakhi + Gobustan (1990); Apsheron = Absheron + Khizi (1990); Ilyichevsk = Sharur + Sadarak (1990); Khanlar = Goygol + Samukh (1992; approximate); Shusha raion = Shusha district + town.
- Merged since, so drawn as one shape with both raions' figures: Kasum-Ismailov + Shaumyan (Goranboy), Martuni + Hadrut (Khojavend), Mir-Bashir + Mardakert (Tartar; 23 of Mardakert's villages went to Kelbajar instead, so Kelbajar is approximate too).
- Grey: Hajigabul (1990, on the lands of the Kazi-Magomed raion abolished 1959; the Ali-Bayramli city council had no rural people, so those lands lay in other raions) and Kangarli (2004, from Babek and Sharur, both of which lost people 1999–2009).
- Julfa 1989 is the town council plus the rural raion; the rural row prints no urban columns, so it counts 0 urban. Ordubad 1989 likewise adds its town council.
- Stepanakert 1979 has no row of its own: it is the oblast's total less its raions.
- Present population (наличное), as the Soviet tables give it; the Republic's later counts on the population map are permanent population.

## 1939

The 1939 raions were smaller, and many were merged in 1959–1963 and re-formed around 1990, so 1939 has its own layer (`data/raions-1939.json`):

- Split since: Divichi = Shabran + Siazan (1940); Sabirabad = Sabirabad + Saatly (1943); Kurdamir = Kurdamir + Agsu (1943); Shemakha = Shamakhi + Gobustan (Maraza, 1943, with 2 village councils of Khizi); Norashen = Sharur + Sadarak; Lenkoran, Nukha, Yevlakh and Shusha with their towns; Yevlakh also with Mingachevir (founded 1945–48; which raion its land lay in is not checked).
- Merged since, drawn together: Julfa + Abrakunis (1949), Kuba + Konakhkend (1959), Salyany + Khilli (Salyan + Neftchala), Ali-Bayramli + Kazi-Magomed (Shirvan + Hajigabul), Kirovabad + Samukh (Ganja + Samukh: the city council had rural land, from which the Safaraliev raion, today's Samukh, was made in 1939; the old Samukh raion was mostly flooded by the Mingachevir reservoir), Kasum-Ismailov + Shaumyan (Goranboy, with Naftalan), Terter + Mardakert (Tartar), Martuni + Hadrut (Khojavend).
- The Baku city council's 17 districts (Sumgait, Mashtagi and Alyat among them) are drawn as Baku, Sumqayit and Absheron; Absheron's western part was then in the Khizi raion.
- Kangarli is grey, as for 1979–1989.

## 1926

In 1926 Azerbaijan was still divided into uezds (13, with the Nakhchivan SSR and the Nagorno-Karabakh AO), far larger than any raion, and their borders followed none of today's. So the 1926 layer is rough by design: each district of today goes to the uezd that held most of it, judged from the uezds' sections and dairas as Russian Wikipedia lists them. Every shape is marked approximate. Where a district of today was split between two uezds, it goes to one: Ismailli to Geokchay (its centre's section; Lahij and Basqal were Shemakha's), today's Tartar to Agdam (its Mardakert part was in Nagorno-Karabakh), Kalbajar to Kurdistan. Not checked: Yevlakh and Mingachevir with Ganja, Agdash with Geokchay, Beylagan with Agdam, Zangilan with Jebrail. There are no urban figures for 1926.

Licences: the census table and `data/raions.json` are CC0; the shapes derive from geoBoundaries (AZE ADM2, CC BY-SA 3.0) and are shared under the same terms.
