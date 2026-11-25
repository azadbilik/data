#!/usr/bin/env bash
# Copies the Atlas tables from a checkout of the Azad Bilik site (azadbilik/azadbilik.github.io),
# where the maps are built, into atlas/:
#   scripts/export-atlas.sh ../azadbilik.org
set -euo pipefail
cd "$(dirname "$0")/.."
site=${1:?path to the azadbilik.org checkout}
src="$site/atlas/ehali/data"
cp "$src/aze-census.csv" atlas/population/census-az.csv
cp "$src/irn-census.csv" atlas/population/census-ir.csv
cp "$src/irn-census-provinces.csv" atlas/population/census-ir-provinces.csv
cp "$src/totals.csv" atlas/population/totals.csv
cat "$src/aze-census-notes.md" > atlas/population/NOTES.md
printf '\n\n---\n\n' >> atlas/population/NOTES.md
cat "$src/irn-census-notes.md" >> atlas/population/NOTES.md
echo "atlas/population: $(($(wc -l < atlas/population/census-az.csv) - 1)) + $(($(wc -l < atlas/population/census-ir.csv) - 1)) census rows"

# Azerbaijani communities beyond the Republic (Georgia, Dagestan, Soviet Armenia)
src="$site/atlas/icmalar/data"
cp "$src/communities-geo.csv" atlas/communities/georgia.csv
cp "$src/communities-dag.csv" atlas/communities/dagestan.csv
cp "$src/communities-arm.csv" atlas/communities/armenia.csv
{ cat "$src/communities-totals.csv"; tail -n +2 "$src/communities-arm-totals.csv" | sed 's/^/Armenia,/'; } > atlas/communities/totals.csv
cat "$src/communities-geo-dag-notes.md" > atlas/communities/NOTES.md
printf '\n\n---\n\n' >> atlas/communities/NOTES.md
cat "$src/communities-arm-notes.md" >> atlas/communities/NOTES.md
# The peoples of Azerbaijan by district
src="$site/atlas/xalqlar/data"
cp "$src/peoples-az.csv" atlas/peoples/by-district.csv
cp "$src/peoples-az-totals.csv" atlas/peoples/totals.csv
cp "$src/peoples-az-notes.md" atlas/peoples/NOTES.md
echo "atlas/communities, atlas/peoples copied"
# Native languages in 1897 (azadbilik.org/atlas/1897)
src="$site/atlas/1897/data"
cp "$src/census-1897.csv" atlas/languages-1897/by-unit.csv
cp "$src/NOTES.md" atlas/languages-1897/NOTES.md
echo "atlas/languages-1897: $(($(wc -l < atlas/languages-1897/by-unit.csv) - 1)) rows"
# Soviet raions at the 1979 and 1989 censuses (azadbilik.org/atlas/rayonlar)
src="$site/atlas/rayonlar"
cp "$src/data/raions-1979-1989.csv" atlas/raions-1979-1989/by-raion.csv
cp "$src/README.md" atlas/raions-1979-1989/NOTES.md
echo "atlas/raions-1979-1989: $(($(wc -l < atlas/raions-1979-1989/by-raion.csv) - 1)) rows"
