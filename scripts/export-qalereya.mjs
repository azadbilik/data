// Exports the Azad Bilik gallery's scene catalogues and picture index into culture/qalereya/*.csv:
// which painted scene of Nizami's and Fuzuli's poems each miniature shows, and the chapter of
// the poem on kitabxana.az it illustrates. Reads a checkout of azadbilik/qalereya (after its
// scripts/export.sh and node scripts/build.mjs).
//
//   node scripts/export-qalereya.mjs [../qalereya]
import { readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const src = path.resolve(process.argv[2] ?? '../qalereya', 'data');
const json = async (p) => JSON.parse(await readFile(path.join(src, p), 'utf8'));
const csv = (rows) => rows.map((r) => r.map((v) => {
  if (v == null) return '';
  const s = Array.isArray(v) ? v.join(';') : String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}).join(',')).join('\n') + '\n';

const gallery = await json('gallery.json');
const artworks = new Map((await json('artworks.json')).map((a) => [a.id, a]));
const poemOfKey = (key) => gallery.poems.find((p) => p.slug === key || p.slug === `nizami-${key}`)?.slug ?? key;

// Scenes, in story order within each poem
const scenes = [['poem', 'scene', 'order', 'name_az', 'name_en', 'chapters', 'evidence_az', 'paintings']];
const confidence = {};
for (const f of (await readdir(path.join(src, 'scenes'))).filter((f) => f.endsWith('.json')).sort()) {
  const key = f.replace(/\.json$/, '');
  const poem = poemOfKey(key);
  const list = await json(`scenes/${f}`);
  for (const [id, t] of Object.entries(await json(`tags/${f}`))) confidence[id] = t.confidence;
  list.forEach((s, i) => scenes.push([poem, s.id, i + 1, s.az, s.en, s.chapters, s.evidence,
    gallery.items.filter((x) => x.scene === s.id && x.poem === poem).length]));
}

const pictures = [['id', 'title', 'date', 'year_start', 'year_end', 'manuscript', 'museum', 'license', 'poem', 'scene', 'scene_confidence', 'chapter', 'source_url', 'image_url', 'kitabxana_url']];
for (const x of gallery.items) {
  const a = artworks.get(x.id) ?? {};
  pictures.push([x.id, x.title, x.date, a.yearStart, a.yearEnd, x.manuscript, x.museum, x.license, x.poem, x.scene,
    x.scene ? confidence[x.id] : null, x.chapter, x.source, x.image,
    x.chapter ? `https://kitabxana.az/works/${x.chapter}` : x.poem ? `https://kitabxana.az/collections/${x.poem}` : null]);
}

await writeFile('culture/qalereya/scenes.csv', csv(scenes));
await writeFile('culture/qalereya/pictures.csv', csv(pictures));
console.log(`${scenes.length - 1} scenes · ${pictures.length - 1} pictures (${gallery.items.filter((x) => x.scene).length} with a scene, ${gallery.items.filter((x) => x.chapter).length} with a chapter)`);
