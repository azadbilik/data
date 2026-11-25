# Azad Bilik · Məlumatlar

Açıq məlumat dəstləri: Azərbaycan ədəbiyyatı və mədəniyyəti haqqında, sərbəst istifadə üçün (CC0).

Open datasets about Azerbaijani literature and culture, free to use for anything (CC0): the catalogue of kitabxana.az, and an index of the miniatures painted for Nizami's and Fuzuli's poems, by scene and chapter. Part of [Azad Bilik](https://azadbilik.org).

## Kitabxana.az catalogue

The catalogue of [kitabxana.az](https://kitabxana.az), an online library of Azerbaijani literature: every author, book and work a reader can see there, with their translations and the places the authors were born and died.

| File | Rows | What |
|---|---:|---|
| [`kitabxana/authors.csv`](kitabxana/authors.csv) | 472 | Names in az, ru, en, fa; years; type; period; languages written in; Wikidata id |
| [`kitabxana/collections.csv`](kitabxana/collections.csv) | 1,552 | Books, divans and cycles |
| [`kitabxana/works.csv`](kitabxana/works.csv) | 48,838 | Titles, original language, genre, poetic form, year, word count, translations available, tags |
| [`kitabxana/translations.csv`](kitabxana/translations.csv) | 3,574 | Language, translator, year |
| [`kitabxana/tags.csv`](kitabxana/tags.csv) | 25 | Themes, moods, eras, audiences |
| [`kitabxana/places.csv`](kitabxana/places.csv) | 532 | Birth and death places with coordinates, from Wikidata, and for some folk poets where they came from ([the literary map](https://azadbilik.org/xerite/)) |

Rows link up by `slug`: `works.author` → `authors.slug`, `works.collection` → `collections.slug`, `translations.work` → `works.slug`. Every author, collection and work has a `url` on kitabxana.az. Columns are described in [`datapackage.json`](datapackage.json) ([Frictionless Data](https://frictionlessdata.io)), so most tools load the set with its types:

```python
import pandas as pd
works = pd.read_csv('https://raw.githubusercontent.com/azadbilik/data/main/kitabxana/works.csv')
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
| [`qalereya/scenes.csv`](qalereya/scenes.csv) | 187 | The painted scenes of seven poems in story order, each with its chapter(s) and a line of the Azerbaijani text that places it there |
| [`qalereya/pictures.csv`](qalereya/pictures.csv) | 782 | Miniatures, manuscript pages and textiles: date, manuscript, holder, licence, scene, chapter, and links to the image, its source and the passage |

`pictures.chapter` → `kitabxana/works.csv`; `(pictures.poem, pictures.scene)` → `scenes.csv`. A scene was placed from the holder's title; `scene_confidence` is *medium* where the folio's position in its manuscript decided it. The images belong to their holders (the Met, the Walters, the Cleveland Museum of Art, the Rijksmuseum, the Chester Beatty Library, Wikimedia Commons) under the licence given: CC0 or public domain, except two Chester Beatty pages under CC BY 4.0, to be credited «© The Trustees of the Chester Beatty Library, Dublin». The index itself is CC0.

Updating: in a checkout of [azadbilik/qalereya](https://github.com/azadbilik/qalereya), `scripts/export.sh` and `node scripts/build.mjs`; then here `node scripts/export-qalereya.mjs ../qalereya` and `node scripts/datapackage.mjs`.

## Licence

The data is [CC0 1.0](LICENSE): no rights reserved, no attribution required. A link back to kitabxana.az is appreciated.

Questions: [hello@azadbilik.org](mailto:hello@azadbilik.org) or an [issue](https://github.com/azadbilik/data/issues).
