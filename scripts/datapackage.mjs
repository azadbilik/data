// Writes datapackage.json (Frictionless Data) describing every table, culture/ and atlas/, with row counts.
//   node scripts/datapackage.mjs
import { readFileSync, writeFileSync } from 'node:fs';

const s = (name, description) => ({ name, type: 'string', ...(description && { description }) });
const i = (name, description) => ({ name, type: 'integer', ...(description && { description }) });
const b = (name, description) => ({ name, type: 'boolean', ...(description && { description }) });
const list = (name, description) => s(name, `${description} Several values are separated by ";".`);
const LANG = 'az_latin, az_arabic, az_cyrillic, fa, ar, ru, en, tr or de.';

const tables = {
  authors: ['Every author on kitabxana.az.', [
    s('slug', 'Identifier, also the page address.'), s('name_az'), s('name_ru'), s('name_en'), s('name_fa'),
    i('born', 'Year of birth; negative is BCE.'), b('born_approx'), i('died'), b('died_approx'),
    s('type', 'poet, writer, philosopher, playwright, critic or folk.'),
    s('period', 'Centuries as written on the site, e.g. "XVI əsr".'),
    list('writing_langs', `Languages the author wrote in: ${LANG}`),
    s('wikidata', 'Wikidata item, e.g. Q312517.'), i('works', 'Published works.'),
    list('tags', 'Tag slugs, see tags.csv.'), s('url'),
  ], ['slug']],
  collections: ['Books, divans and cycles that group works.', [
    s('slug'), s('author', 'authors.slug'), s('title_az'), s('title_ru'), s('title_en'), s('title_fa'),
    i('year'), b('year_approx'), s('original_lang', LANG),
    s('genre', 'poem, prose, play, essay, philosophy, letter or memoir.'), i('works'), s('url'),
  ], ['slug']],
  works: ['Every published poem, story, play, chapter or letter. Texts are not included: see README.', [
    s('slug'), s('author', 'authors.slug'), s('collection', 'collections.slug, empty for a work outside one.'),
    i('order', 'Position within the collection.'),
    s('title_az'), s('title_ru'), s('title_en'), s('title_fa'),
    s('original_lang', `Language the work was written in: ${LANG}`),
    b('original_present', 'false when the library has only a translation of it.'),
    s('genre', 'poem, prose, play, essay, philosophy, letter or memoir.'),
    s('form', 'For poems: ghazal, masnavi, rubai, qasida, murabba, free_verse or other.'),
    i('year'), b('year_approx'), i('word_count', 'Words in the original text.'),
    list('translations', 'Languages it can be read in besides the original.'),
    list('tags', 'Tag slugs, see tags.csv.'),
    s('source_id', 'Where the text was imported from, e.g. ganjoor-116713.'), s('url'),
  ], ['slug']],
  translations: ['Translations and transliterations of works.', [
    s('work', 'works.slug'), s('language', LANG), s('type', 'translation or transliteration.'),
    s('translator'), i('year'), b('is_default', 'The version shown first for this language.'),
  ]],
  tags: ['Themes, moods, eras and audiences works and authors are tagged with.', [
    s('slug'), s('kind', 'theme, mood, era or audience.'), s('name_az'), s('name_ru'), s('name_en'),
  ], ['slug']],
  places: ['Where authors were born and died (the literary map, azadbilik.org/xerite).', [
    s('author', 'authors.slug'), s('event', 'birth, death, or origin: where a folk poet with no recorded birthplace came from.'), s('place_wikidata'),
    s('place_az'), s('place_en'), s('place_ru'), { name: 'lat', type: 'number' }, { name: 'lng', type: 'number' },
    s('basis', 'wikidata (the person\'s item), name (the place in their name, e.g. Şəkili) or mumtaz (Salman Mümtaz\'s note in «El şairləri»).'),
  ]],
  // The gallery (azadbilik.org/qalereya): miniatures and the scenes of the poems they illustrate
  scenes: ['The painted scenes of Nizami\'s Khamsa and Fuzuli\'s Leyli və Məcnun, in story order, each with the chapter(s) of the poem on kitabxana.az where it happens.', [
    s('poem', 'collections.slug'), s('scene', 'Scene id, unique within its poem.'), i('order', 'Position in the story.'),
    s('name_az'), s('name_en'), list('chapters', 'works.slug of the chapter(s) the scene happens in.'),
    s('evidence_az', 'A line of the chapter\'s Azerbaijani text that places the scene there.'), i('paintings', 'Pictures of it in pictures.csv.'),
  ], ['poem', 'scene'], 'culture/qalereya'],
  pictures: ['Miniatures, manuscript pages and textiles illustrating the poems: where each is kept, its licence, and the scene and chapter it shows. Images are the holders\', under the licence given; this index is CC0.', [
    s('id', 'Source and the holder\'s id, e.g. met-452734, walters-W609-49a, commons-122715070.'), s('title', 'As the holder catalogues it.'), s('date', 'As the holder gives it.'),
    i('year_start'), i('year_end'), s('manuscript', 'Shelfmark, when known.'), s('museum', 'Who serves the image.'),
    s('license', 'Of the image: CC0, Public domain, or CC BY 4.0 (credit the holder).'), s('poem', 'collections.slug'), s('scene', 'scenes.scene within the poem.'),
    s('scene_confidence', 'high, medium (placed by the folio\'s position in its manuscript) or low.'),
    s('chapter', 'works.slug of the passage it illustrates.'), s('source_url'), s('image_url'), s('kitabxana_url'),
  ], ['id'], 'culture/qalereya'],
  // The Atlas (azadbilik.org/atlas): census figures, each with its source; boundaries are geoBoundaries'
  'census-az': ['Republic of Azerbaijan: population of each district and city at each census, 1959–2019, on today\'s borders. A unit that did not exist or was redrawn is absent for that census, never estimated: see NOTES.md.', [
    s('shapeName', 'The district or city as geoBoundaries AZE ADM2 names it, e.g. "Barda District", "Baku City".'), i('year', 'Census year.'),
    i('population', '1959–1989: present population (Soviet censuses); 1999–2019: permanent population, rounded to 100.'), s('source_url'),
  ], ['shapeName', 'year'], 'atlas/population'],
  'census-ir': ['Iranian Azerbaijan: population of each county (shahrestan) of East and West Azerbaijan, Ardabil and Zanjan at each census, 1956–2016, on today\'s borders; older counties much larger than today\'s are absent: see NOTES.md.', [
    s('shapeName', 'The county as geoBoundaries IRN ADM2 names it, e.g. "Tabriz", "Urumia".'), s('province'), i('year', 'Census year.'), i('population'), s('source_url'),
  ], ['shapeName', 'year'], 'atlas/population'],
  'census-ir-provinces': ['Iranian Azerbaijan: population of each province at each census.', [
    s('province', 'East Azerbaijan, West Azerbaijan, Ardabil, Zanjan, or "East Azerbaijan (incl. Ardabil)" for a series continuous across the 1993 split.'), i('year'), i('population'), s('source_url'),
  ], null, 'atlas/population'],
  totals: ['Each side\'s official census total: the Republic of Azerbaijan (az) and the four provinces of Iranian Azerbaijan (ir).', [
    s('country', 'az or ir.'), i('year'), i('population'), s('source_url'),
  ], ['country', 'year'], 'atlas/population'],
};
const fk = (field, resource) => ({ fields: field, reference: { resource, fields: 'slug' } });
const foreign = {
  collections: [fk('author', 'authors')],
  works: [fk('author', 'authors'), fk('collection', 'collections')],
  translations: [fk('work', 'works')],
  places: [fk('author', 'authors')],
  scenes: [fk('poem', 'collections')],
  pictures: [fk('poem', 'collections'), fk('chapter', 'works'), { fields: ['poem', 'scene'], reference: { resource: 'scenes', fields: ['poem', 'scene'] } }],
};

const resources = Object.entries(tables).map(([name, [description, fields, pk, dir = 'culture/kitabxana']]) => {
  const path = `${dir}/${name}.csv`;
  // records, not lines: a quoted title may hold a line break
  let rows = -1, quoted = false;
  for (const ch of readFileSync(path, 'utf8')) if (ch === '"') quoted = !quoted; else if (ch === '\n' && !quoted) rows++;
  return {
    name, path, format: 'csv', mediatype: 'text/csv', encoding: 'utf-8',
    description: `${description} ${rows.toLocaleString('en')} rows.`,
    schema: { fields, ...(pk && { primaryKey: pk }), ...(foreign[name] && { foreignKeys: foreign[name] }),
      missingValues: [''] },
    dialect: { header: true, delimiter: ',' },
  };
});
for (const r of resources) for (const f of r.schema.fields) if (f.type === 'boolean') Object.assign(f, { trueValues: ['true'], falseValues: ['false'] });

writeFileSync('datapackage.json', JSON.stringify({
  name: 'azadbilik',
  title: 'Azad Bilik open data',
  description: 'Culture: the catalogue of the Kitabxana.az library of Azerbaijani literature (authors, books, works, translations, places) and the Azad Bilik gallery\'s index of miniatures by scene and chapter. Atlas: census populations of historical Azerbaijan by district and county.',
  homepage: 'https://github.com/azadbilik/data',
  version: new Date().toISOString().slice(0, 10),
  licenses: [{ name: 'CC0-1.0', path: 'https://creativecommons.org/publicdomain/zero/1.0/', title: 'CC0 1.0 Universal' }],
  sources: [{ title: 'Kitabxana.az', path: 'https://kitabxana.az' }, { title: 'Wikidata', path: 'https://www.wikidata.org' }, { title: 'State Statistical Committee of the Republic of Azerbaijan', path: 'https://www.stat.gov.az' }, { title: 'Demoscope Weekly (Soviet censuses)', path: 'https://www.demoscope.ru' }, { title: 'Statistical Centre of Iran, via the Iran Data Portal', path: 'https://irandataportal.syr.edu' }],
  resources,
}, null, 2) + '\n');
console.log(resources.map((r) => r.description.match(/[\d,]+ rows/)[0] + ' ' + r.name).join('\n'));
