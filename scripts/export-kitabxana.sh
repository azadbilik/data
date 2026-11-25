#!/usr/bin/env bash
# Exports kitabxana.az's catalogue (what readers can see: published works of published authors)
# into kitabxana/*.csv, then places.csv from the literary map's Wikidata build.
#
#   DATABASE_URL=postgresql://…/irs_az scripts/export-kitabxana.sh [path/to/xerite]
set -euo pipefail
cd "$(dirname "$0")/.."
DB="${DATABASE_URL:-postgresql://localhost:5432/irs_az}"
DB="${DB%%\?*}"
XERITE="${1:-../xerite}"
out=kitabxana

copy() { psql "$DB" -v ON_ERROR_STOP=1 -q -c "\\copy ($2) to '$out/$1.csv' with (format csv, header, encoding 'UTF8')"; }

VISIBLE="w.status = 'PUBLISHED' and a.status = 'PUBLISHED'"

copy authors "
select a.slug, a.\"nameAz\" as name_az, a.\"nameRu\" as name_ru, a.\"nameEn\" as name_en, a.\"nameFa\" as name_fa,
  a.\"bornYear\" as born, a.\"bornYearApprox\"::text as born_approx, a.\"diedYear\" as died, a.\"diedYearApprox\"::text as died_approx,
  lower(a.type::text) as type, a.period,
  array_to_string(array(select lower(unnest(a.\"writingLangs\")::text)), ';') as writing_langs,
  a.\"wikidataId\" as wikidata,
  (select count(*) from \"Work\" w where w.\"authorId\" = a.id and w.status = 'PUBLISHED') as works,
  (select string_agg(t.slug, ';' order by t.slug) from \"AuthorTag\" x join \"Tag\" t on t.id = x.\"tagId\" where x.\"authorId\" = a.id) as tags,
  'https://kitabxana.az/authors/' || a.slug as url
from \"Author\" a where a.status = 'PUBLISHED' order by a.slug"

copy collections "
select c.slug, a.slug as author, c.\"titleAz\" as title_az, c.\"titleRu\" as title_ru, c.\"titleEn\" as title_en, c.\"titleFa\" as title_fa,
  c.year, c.\"yearApprox\"::text as year_approx, lower(c.\"originalLang\"::text) as original_lang, lower(c.genre::text) as genre,
  count(w.id) as works,
  'https://kitabxana.az/collections/' || c.slug as url
from \"Collection\" c join \"Author\" a on a.id = c.\"authorId\" join \"Work\" w on w.\"collectionId\" = c.id
where c.status = 'PUBLISHED' and $VISIBLE
group by c.id, a.slug order by a.slug, c.\"order\" nulls last, c.slug"

copy works "
select w.slug, a.slug as author, c.slug as collection, w.\"order\",
  w.\"titleAz\" as title_az, w.\"titleRu\" as title_ru, w.\"titleEn\" as title_en, w.\"titleFa\" as title_fa,
  lower(w.\"originalLang\"::text) as original_lang, (w.body <> '')::text as original_present,
  lower(w.genre::text) as genre, lower(w.form::text) as form,
  w.year, w.\"yearApprox\"::text as year_approx, w.\"wordCount\" as word_count,
  (select string_agg(distinct lower(t.language::text), ';') from \"Translation\" t where t.\"workId\" = w.id and t.status = 'PUBLISHED') as translations,
  (select string_agg(g.slug, ';' order by g.slug) from \"WorkTag\" x join \"Tag\" g on g.id = x.\"tagId\" where x.\"workId\" = w.id and x.source <> 'REJECTED') as tags,
  w.\"sourceId\" as source_id,
  'https://kitabxana.az/works/' || w.slug as url
from \"Work\" w join \"Author\" a on a.id = w.\"authorId\" left join \"Collection\" c on c.id = w.\"collectionId\" and c.status = 'PUBLISHED'
where $VISIBLE order by a.slug, c.slug nulls last, w.\"order\" nulls last, w.slug"

copy translations "
select w.slug as work, lower(t.language::text) as language, lower(t.type::text) as type,
  t.translator, t.year, t.\"isDefault\"::text as is_default
from \"Translation\" t join \"Work\" w on w.id = t.\"workId\" join \"Author\" a on a.id = w.\"authorId\"
where t.status = 'PUBLISHED' and $VISIBLE order by w.slug, t.language, t.\"isDefault\" desc, t.translator"

copy tags "
select slug, lower(kind::text) as kind, \"nameAz\" as name_az, \"nameRu\" as name_ru, \"nameEn\" as name_en
from \"Tag\" order by kind, \"order\", slug"

node -e '
const a = require(process.argv[1]);
const q = (v) => v == null ? "" : /[",\n]/.test(v) ? `"${String(v).replace(/"/g, "\"\"")}"` : String(v);
const rows = [["author","event","place_wikidata","place_az","place_en","place_ru","lat","lng","basis"].join(",")];
for (const x of a) for (const ev of ["birth","death"]) { const p = x[ev]; if (p) rows.push([x.slug, p.from ? "origin" : ev, p.id, p.az, p.en, p.ru, p.lat, p.lng, p.from ?? "wikidata"].map(q).join(",")); }
require("fs").writeFileSync(process.argv[2], rows.join("\n") + "\n");
' "$(cd "$XERITE" && pwd)/data/authors.json" "$out/places.csv"

wc -l $out/*.csv
