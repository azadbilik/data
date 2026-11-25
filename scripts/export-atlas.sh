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
