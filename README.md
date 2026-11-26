# Azad Bilik · Məlumatlar

[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.24543369.svg)](https://doi.org/10.5281/zenodo.24543369)

Açıq məlumat dəstləri, sərbəst istifadə üçün (CC0): **mədəniyyət** (ədəbiyyat, sənət) və **atlas** (əhali, coğrafiya).

Open datasets, free to use for anything (CC0), in two parts, as on [azadbilik.org](https://azadbilik.org):

| Part | What | Unit | Updated |
|---|---|---|---|
| [`culture/`](culture/) | The catalogue of kitabxana.az, and the gallery's index of miniatures by scene and chapter | a work, an author, a picture | piece by piece |
| [`atlas/`](atlas/) | Census populations of historical Azerbaijan by district and county; native languages in 1897; Soviet raions 1939–1989 | a district, a census | release by release (a new census, new boundaries) |

All tables are described in one [`datapackage.json`](datapackage.json); places and people carry Wikidata ids where known, so the two parts join on them.

# Culture

## Kitabxana.az catalogue

The catalogue of [kitabxana.az](https://kitabxana.az), an online library of Azerbaijani literature: every author, book and work a reader can see there, with their translations and the places the authors were born and died.

| File | Rows | What |
|---|---:|---|
| [`culture/kitabxana/authors.csv`](culture/kitabxana/authors.csv) | 472 | Names in az, ru, en, fa; years; type; period; languages written in; Wikidata id |
| [`culture/kitabxana/collections.csv`](culture/kitabxana/collections.csv) | 1,552 | Books, divans and cycles |
| [`culture/kitabxana/works.csv`](culture/kitabxana/works.csv) | 48,838 | Titles, original language, genre, poetic form, year, word count, translations available, tags |
| [`culture/kitabxana/translations.csv`](culture/kitabxana/translations.csv) | 3,574 | Language, translator, year |
| [`culture/kitabxana/tags.csv`](culture/kitabxana/tags.csv) | 25 | Themes, moods, eras, audiences |
| [`culture/kitabxana/places.csv`](culture/kitabxana/places.csv) | 532 | Birth and death places with coordinates, from Wikidata, and for some folk poets where they came from ([the literary map](https://azadbilik.org/xerite/)) |

Rows link up by `slug`: `works.author` → `authors.slug`, `works.collection` → `collections.slug`, `translations.work` → `works.slug`. Every author, collection and work has a `url` on kitabxana.az. Columns are described in [`datapackage.json`](datapackage.json) ([Frictionless Data](https://frictionlessdata.io)), so most tools load the set with its types:

```python
import pandas as pd
works = pd.read_csv('https://raw.githubusercontent.com/azadbilik/data/main/culture/kitabxana/works.csv')
works.groupby('original_lang').size()   # az_latin 31,398 · fa 17,268 · …
```

```r
library(frictionless)
pkg <- read_package("https://raw.githubusercontent.com/azadbilik/data/main/datapackage.json")
authors <- read_resource(pkg, "authors")
```

### What is not here

- **The texts.** Many are still under copyright or come from sources with their own terms; read them on kitabxana.az. [What may be reused](https://github.com/azadbilik/kitabxana/blob/main/CONTENT.md).
- **Biographies.** They are from Wikipedia (CC BY-SA), so they can't be CC0.
- 158 authors have no place yet, mostly folk poets known by a single name. An `origin` row is where a poet came from by their name or Salman Mümtaz's note (`basis`), not a recorded birthplace. Corrections are welcome as issues, or straight on Wikidata.

### Conventions

- UTF-8, comma-separated, a header row. Empty means unknown.
- Lists inside a cell are separated by `;` (`writing_langs`, `translations`, `tags`).
- Languages: `az_latin`, `az_arabic` (Azerbaijani in the Arabic script), `az_cyrillic`, `fa`, `ar`, `ru`, `en`, `tr`, `de`.
- Years are as the site gives them; negative is BCE. `*_approx` marks an approximate one.

### Updating

The files are exported from kitabxana's database, so only its maintainers can refresh them:

```bash
DATABASE_URL=postgresql://…/irs_az scripts/export-kitabxana.sh ../xerite   # CSVs; places from the map's build
node scripts/datapackage.mjs                                              # row counts and version date
```

## Miniatures by scene

The index behind [the gallery](https://azadbilik.org/qalereya/): which scene of Nizami's *Khamsa* or Fuzuli's *Leyli və Məcnun* each miniature shows, and the chapter of the poem on kitabxana.az where that scene happens. Five centuries of manuscripts (Baghdad 1386 to a Tehran lithograph of 1883) line up against the text.

| File | Rows | What |
|---|---:|---|
| [`culture/qalereya/scenes.csv`](culture/qalereya/scenes.csv) | 187 | The painted scenes of seven poems in story order, each with its chapter(s) and a line of the Azerbaijani text that places it there |
| [`culture/qalereya/pictures.csv`](culture/qalereya/pictures.csv) | 780 | Miniatures, manuscript pages and textiles: date, manuscript, holder, licence, scene, chapter, and links to the image, its source and the passage |

`pictures.chapter` → `culture/kitabxana/works.csv`; `(pictures.poem, pictures.scene)` → `scenes.csv`. A scene was placed from the holder's title; `scene_confidence` is *medium* where the folio's position in its manuscript decided it. The images belong to their holders (the Met, the Walters, the Cleveland Museum of Art, the Rijksmuseum, the Chester Beatty Library, Wikimedia Commons) under the licence given: CC0 or public domain, except two Chester Beatty pages under CC BY 4.0, to be credited «© The Trustees of the Chester Beatty Library, Dublin». The index itself is CC0.

Updating: in a checkout of [azadbilik/qalereya](https://github.com/azadbilik/qalereya), `scripts/export.sh` and `node scripts/build.mjs`; then here `node scripts/export-qalereya.mjs ../qalereya` and `node scripts/datapackage.mjs`.

# Atlas

## Population of historical Azerbaijan

The figures behind [the population map](https://azadbilik.org/atlas/ehali/): every district and city of the Republic of Azerbaijan at the censuses of 1939–2019, and every county of Iran's four Azerbaijani provinces (East and West Azerbaijan, Ardabil, Zanjan) at the censuses of 1956–2016, on today's borders. Each figure has its source.

| File | Rows | What |
|---|---:|---|
| [`atlas/population/census-az.csv`](atlas/population/census-az.csv) | 469 | District and city populations, 1939–2019 (1939 only where a raion matches one district of today) |
| [`atlas/population/census-ir.csv`](atlas/population/census-ir.csv) | 179 | County populations, 1956–2016 |
| [`atlas/population/census-ir-provinces.csv`](atlas/population/census-ir-provinces.csv) | 27 | Province populations |
| [`atlas/population/totals.csv`](atlas/population/totals.csv) | 12 | Each side's official census total |
| [`atlas/population/NOTES.md`](atlas/population/NOTES.md) | | How Soviet raions and old Iranian counties map to today's units, and every gap |

A unit that did not exist yet, or whose older unit was much larger, is absent for that census rather than estimated, so the units don't always add up to the totals. Units are named as in [geoBoundaries](https://www.geoboundaries.org) (AZE ADM2, IRN ADM2), whose boundaries the map draws; they are not copied here.

Updating: in a checkout of the site, `node atlas/ehali/scripts/build.mjs`; then here `scripts/export-atlas.sh ../azadbilik.org` and `node scripts/datapackage.mjs`.

## Azerbaijani communities beyond the Republic

The figures behind [the communities map](https://azadbilik.org/atlas/icmalar/): Azerbaijanis counted in each district of Georgia, Dagestan and Soviet Armenia, 1926–2021.

| File | Rows | What |
|---|---:|---|
| [`atlas/communities/georgia.csv`](atlas/communities/georgia.csv) | 371 | Georgia by district, 1926–2014 |
| [`atlas/communities/dagestan.csv`](atlas/communities/dagestan.csv) | 205 | Dagestan by district, 1926–2021 |
| [`atlas/communities/armenia.csv`](atlas/communities/armenia.csv) | 38 | Soviet Armenia by district (1939; Yerevan for other years) |
| [`atlas/communities/totals.csv`](atlas/communities/totals.csv) | 23 | Each country's total per census |
| [`atlas/communities/NOTES.md`](atlas/communities/NOTES.md) | | Mappings and gaps |

## The peoples of Azerbaijan

The figures behind [the peoples and languages map](https://azadbilik.org/atlas/xalqlar/): every people counted in each district of the Republic of Azerbaijan (1979, 1999, 2009, 2019) and in the Republic (1959–2019).

| File | Rows | What |
|---|---:|---|
| [`atlas/peoples/by-district.csv`](atlas/peoples/by-district.csv) | 4,662 | Each people by district and census, with the district's total |
| [`atlas/peoples/totals.csv`](atlas/peoples/totals.csv) | 193 | Each people in the Republic per census |
| [`atlas/peoples/NOTES.md`](atlas/peoples/NOTES.md) | | Census category changes (Talysh, Kryz, Budukh, Khinalug, Ingiloys) and gaps |

## Native languages in 1897

The figures behind [the 1897 map](https://azadbilik.org/atlas/1897/): the first census of the Russian Empire, native language by governorate, uezd and town, for the Baku, Elisabethpol and Erivan governorates, the Dagestan and Kars oblasts, Borchali and Zaqatala. Every language the census names, by sex, from Table XIII as Demoscope Weekly transcribes it.

| File | Rows | What |
|---|---:|---|
| [`atlas/languages-1897/by-unit.csv`](atlas/languages-1897/by-unit.csv) | 1,277 | Each language in each of 5 governorates, 36 uezds and 39 towns, men and women |
| [`atlas/languages-1897/NOTES.md`](atlas/languages-1897/NOTES.md) | | The census's language names («татарский» is Azerbaijani) and how the map groups them; coverage; checks |

`kind` is governorate, uyezd or town, and each level includes the one below: add up one kind only.

Updating: in a checkout of the site, `node atlas/1897/scripts/build.mjs`; then here `scripts/export-atlas.sh ../azadbilik.org` and `node scripts/datapackage.mjs`.

## Soviet raions, 1939, 1979 and 1989

The figures behind [the Soviet raions map](https://azadbilik.org/atlas/rayonlar/): every raion and city council of the Azerbaijan SSR at the 1939, 1979 and 1989 censuses, as each census drew them (Divichi, Kazakh, Khanlar, Ilyichevsk, Mardakert, Martuni; in 1939 also Konakhkend, Khilli, Kazi-Magomed, Abrakunis, Norashen…), with the districts of today that cover each one's land. Unlike `census-az.csv`, which keeps only Soviet units that match a district of today, this table has them all.

| File | Rows | What |
|---|---:|---|
| [`atlas/soviet-raions/by-raion.csv`](atlas/soviet-raions/by-raion.csv) | 213 | 69 units in 1939 and 72 in 1979 and 1989: present population, urban population, the census rows summed, today's districts |
| [`atlas/soviet-raions/NOTES.md`](atlas/soviet-raions/NOTES.md) | | How each Soviet unit matches today's districts, which are approximate, which raions merged since are drawn together, and the districts of today whose land can't be assigned |

Each year adds up to the republic's total (3,205,150 in 1939; 6,028,253 in 1979; 7,037,867 in 1989), urban people too. A `soviet_unit` id names a unit within its census: the 1939 and 1979 Kuba, say, are not the same land. Until v1.2 this table was `atlas/raions-1979-1989/` without 1939.

Updating: in a checkout of the site, `node atlas/rayonlar/scripts/build.mjs`; then here `scripts/export-atlas.sh ../azadbilik.org` and `node scripts/datapackage.mjs`.

## Citing

Cite as: *Azad Bilik contributors. Azad Bilik open data.* Zenodo. [doi:10.5281/zenodo.24543369](https://doi.org/10.5281/zenodo.24543369) (the concept DOI, always the latest release; v1.5 is [10.5281/zenodo.24545763](https://doi.org/10.5281/zenodo.24545763), v1.4 [10.5281/zenodo.24545262](https://doi.org/10.5281/zenodo.24545262), v1.3 [10.5281/zenodo.24545194](https://doi.org/10.5281/zenodo.24545194), v1.2 [10.5281/zenodo.24544950](https://doi.org/10.5281/zenodo.24544950), v1.1 [10.5281/zenodo.24544125](https://doi.org/10.5281/zenodo.24544125), v1.0 [10.5281/zenodo.24543370](https://doi.org/10.5281/zenodo.24543370)). [`CITATION.cff`](CITATION.cff) has the same.

## Licence

The data is [CC0 1.0](LICENSE): no rights reserved, no attribution required. A link back to kitabxana.az is appreciated.

Questions: [hello@azadbilik.org](mailto:hello@azadbilik.org) or an [issue](https://github.com/azadbilik/data/issues).
