# Native languages in 1897: notes

## Source

- **The census:** «Первая всеобщая перепись населения Российской империи 1897 г.», Table XIII «Распределение населения по родному языку» (губернские итоги), vols 51–89, St Petersburg 1903–1905.
- **As transcribed by** [Demoscope Weekly](https://www.demoscope.ru/weekly/ssp/emp_lan_97_uezd.php), one page per governorate, uezd and town; every row carries its page in `source_url`. Read 2026-11-25. Demoscope shows a language separately only where more than about 100 people of one sex spoke it in the governorate; the rest are its «Остальные» row.
- **Checked:** in every unit the languages add up to the unit's total, and each governorate's uezds add up to the governorate's total (Baku 826,716, Elisabethpol 878,415, Erivan 829,556, Dagestan 571,154, Kars 290,654).

## Coverage

The Baku, Elisabethpol and Erivan governorates, the Dagestan and Kars oblasts (all their uezds and okrugs), and from the Tiflis governorate the Borchali uezd and Zaqatala okrug: 36 uezds and okrugs and their 39 towns (a town is an uezd's seat, or a second town such as Ordubad, Petrovsk, Derbent). The rest of the Tiflis governorate and western Georgia are left out.

`kind` tells the three levels apart. A governorate's figures include its uezds', an uezd's its towns': add up one kind only. The Tiflis governorate has no row, since only two of its units are here.

## Languages

The census asked for native language, not nationality, and named languages as the time did: Azerbaijani is «татарский» (Tatar), Lezgian «кюринский», Lak with other Daghestanian languages «кази-кумукский и остал. лезгин. нар.». `language_ru` keeps the census's word; `language` is the group the map draws:

| `language` | Map label | Census names |
|---|---|---|
| `azerbaijani` | Azerbaijani (“Tatar”) | Татарский |
| `armenian` | Armenian | Армянский |
| `georgian` | Kartvelian (Georgian, Imeretian, Mingrelian, Svan) | Грузинский, Имеретинский, Мингрельский, Сванетский |
| `russian` | Russian, Ukrainian, Belarusian | Великорусский, Малорусский, Белорусский |
| `avar` | Avar and Andic | Аварско-Андийский |
| `dargin` | Dargin | Даргинский |
| `lezgian` | Lezgian (“Kürə”) | Кюринский |
| `lak` | Lak and other Daghestanian (“Kazikumukh”) | Кази-Кумукский и остал. лезгин. нар. |
| `lezgic-other` | Daghestanian, not broken down | Лезгинские без распределения |
| `udi` | Udi | Удинский |
| `talysh` | Talysh | Талышинский |
| `tat` | Tat | Татский |
| `persian` | Persian | Персидский, Таджикский |
| `kurdish` | Kurdish | Курдские |
| `jewish` | Jewish languages | Еврейский |
| `turkish` | Turkish | Турецкий |
| `karapapakh` | Karapapakh | Карапапахский |
| `kumyk` | Kumyk | Кумыкский |
| `nogai` | Nogai | Ногайский |
| `turkmen` | Turkmen | Туркменский |
| `turkic-other` | Other Turkic | Тюркские наречия без распределения, Киргиз-кайсацкий, Башкирский, Карачаевский, Чувашский |
| `greek` | Greek | Греческий |
| `assyrian` | Assyrian | Айсорский (Сиро-халдейский) |
| `ossetian` | Ossetian | Осетинские |
| `chechen` | Chechen, Kist, Ingush | Чеченский, Кистинский, Ингушский |
| `polish` | Polish | Польский |
| `german` | German | Немецкий |
| `other` | Other languages | every other language, and «Остальные» |

Russian on the map is «великорусский», «малорусский» (Ukrainian) and «белорусский» together; the census's own «Итого» row for the three is left out, so nothing is counted twice.

## Boundaries

The map draws the uezds from the Electronic Repository of Russian Historical Statistics: Kessler, Gijs and Andrei Markevich, *Electronic Repository of Russian Historical Statistics, 18th–21st centuries*, [ristat.org](https://ristat.org/), Version I (2020): Russian Empire Historical GIS Maps (1897), [doi:10.34894/NQOASN](https://doi.org/10.34894/NQOASN) (CC0; cite RISTAT). They are in the site's repository (`atlas/1897/data/raw/`), not here.
