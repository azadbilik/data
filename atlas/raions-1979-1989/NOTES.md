# Sovet rayonları · Soviet raions, 1979–1989

[azadbilik.org/atlas/rayonlar](https://azadbilik.org/atlas/rayonlar/): the raions and city councils of the Azerbaijan SSR at the 1979 and 1989 censuses, by people, density, urban share and change. **Each Soviet unit is drawn as the whole district or districts of today that cover its land**; no Soviet raion boundaries are openly published, so none are traced.

| File | What |
|---|---|
| `data/raw/demoscope-1979-1989.json` | Demoskop Weekly's census tables for the Azerbaijan SSR ([1979](https://www.demoscope.ru/weekly/ssp/ussr79_reg1.php), [1989](https://www.demoscope.ru/weekly/ssp/sng89_reg1.php)): present population, total and urban, every row as printed |
| `data/raions.json` | The table: each Soviet unit's names (az, ru, en), the census rows summed for it, the districts of today it is drawn with, whether that fit is close or approximate, and a note in three languages; `gaps` are districts of today left grey |
| `data/raions-1979-1989.csv` | One row per Soviet unit and census as counted (merged pairs apart), with the census rows summed and today's districts: the table in [azadbilik/data](https://github.com/azadbilik/data) |
| `data/raions.geojson`, `data/edges.geojson` | What the page reads (shapes, and their outlines less the seams between grouped districts), built by `node scripts/build.mjs` |

The build stops unless every census row is used once, every district of today is drawn or listed as a gap, and both years add up to the republic's total (6,028,253 in 1979; 7,037,867 in 1989), urban people too (3,200,254; 3,789,985).

## How it is drawn

- Split since: Divichi = Shabran + Siazan (1992); Kazakh = Qazakh + Agstafa (1990); Shemakha = Shamakhi + Gobustan (1990); Apsheron = Absheron + Khizi (1990); Ilyichevsk = Sharur + Sadarak (1990); Khanlar = Goygol + Samukh (1992; approximate); Shusha raion = Shusha district + town.
- Merged since, so drawn as one shape with both raions' figures: Kasum-Ismailov + Shaumyan (Goranboy), Martuni + Hadrut (Khojavend), Mir-Bashir + Mardakert (Tartar; 23 of Mardakert's villages went to Kelbajar instead, so Kelbajar is approximate too).
- Grey: Hajigabul (1990, on the lands of the Kazi-Magomed raion abolished 1959; the Ali-Bayramli city council had no rural people, so those lands lay in other raions) and Kangarli (2004, from Babek and Sharur, both of which lost people 1999–2009).
- Julfa 1989 is the town council plus the rural raion; the rural row prints no urban columns, so it counts 0 urban. Ordubad 1989 likewise adds its town council.
- Stepanakert 1979 has no row of its own: it is the oblast's total less its raions.
- Present population (наличное), as the Soviet tables give it; the Republic's later counts on the population map are permanent population.

Licences: the census table and `data/raions.json` are CC0; the shapes derive from geoBoundaries (AZE ADM2, CC BY-SA 3.0) and are shared under the same terms.
