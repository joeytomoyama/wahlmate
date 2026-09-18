# WahlMate decisions

Last consolidated: 19 September 2026.

## Product identity

- Name: **WahlMate**. It intentionally echoes Wahl-O-Mat while presenting the product as a friendly matching companion.
- The public domain and primary deployment are **wahlmate.de** on GitHub Pages.
- “Find your political soulmate” / “Finde deinen politischen Soulmate” is a candidate slogan discussed in the project, but it is not currently displayed in the interface.
- The project is independent and is not affiliated with Wahl-O-Mat or any political party.

## Scope

- Current editions: Germany (2025 federal-programme basis), Berlin, and Mecklenburg-Vorpommern.
- Each edition contains exactly 21 questions. This is considered short enough to finish while broad enough to cover major differences.
- Seven parties are compared: CDU/CSU or CDU, SPD, Bündnis 90 / Die Grünen, FDP, AfD, Die Linke, and BSW.
- Small parties without a realistic chance of relevance were intentionally left out.
- Party labels are always their German names, even in the English interface.

## Answers and scoring

- User choices are agree (`1`), disagree (`-1`), or do not care (`0`). Agree and disagree advance immediately to the next question.
- “Do not care” excludes that question from the user’s score. It is not treated as a neutral political answer.
- A party position of `null` means unknown or insufficiently evidenced and is excluded from that party’s denominator. It does not imply disagreement.
- Full agreement earns 1 point, the opposite position earns 0, and a neutral/mixed party position earns 0.5. Qualified positions such as `0.5` can produce intermediate scores.
- Percentages are rounded. Parties are ordered from highest to lowest compatibility, with stable party order breaking ties.
- Different MV coverage denominators are shown and explained because only 125 of 147 party-position cells are sourced.
- The graph only draws links where the user’s answer and party position lean in the same direction. Dashed links represent partial alignment.

## Questions and arguments

- Questions should test one policy choice at a time and remain within the authority of the relevant government level.
- Pro and con text is editorial, concise, and written in plain language. Each side should present its strongest understandable reason and expose the real tradeoff.
- Avoid argument pairs where both sides merely say inaction will cost money later. Germany question 2 now contrasts borrowing to repair infrastructure sooner and spread costs across users with using existing budgets to avoid future interest commitments.
- The September 2026 review rewrote all 252 current explanations: 63 questions × two sides × two languages.
- Party alignments and editorial arguments are distinct. Updating an explanation must not silently change a party score.

## Data provenance and versioning

- National positions are based mainly on 2025 federal election programmes, with explicit qualifications documented in the methodology.
- Berlin positions are editorial readings of Berlin party programmes. English questions are stored in `berlin-data-v1.js`; this fixed a previous bug where the interface displayed German statements after switching to English.
- MV’s current snapshot contains 21 bilingual statements and 125 sourced positions. It uses party programmes and official Wahl-O-Mat MV 2026 responses/explanations where applicable.
- Missing evidence stays `null`; it is never filled from general ideology or a federal position.
- Shared URLs include a version, edition, compact answer payload, and language. URL fragments keep sharing completely static and prevent answer data from being sent to the server in normal requests.
- Versions 1, 2, and 3 remain decodable. Published snapshots must remain available so old links continue to mean what they meant when created.

## Interface

- Visual direction: modern, minimal, calm, and readable, with light and dark themes.
- German is the default; the language switch must update the entire experience.
- The edition chooser is a custom styled menu rather than a native-looking select.
- The title links back to the questionnaire from the results page.
- Results use a three-part graph: topics, the connection field, and parties. Extra horizontal space expands the connection field while maintaining balanced gaps.
- The graph must never create page-level horizontal scrolling. It keeps a readable central width on narrow screens and does not grow vertically when the viewport becomes wider.
- Topic labels should use available space, avoid unnecessary ellipses, and have a maximum font size.
- Hovering or focusing a topic highlights aligned parties. Hovering or focusing a party highlights the user answers that align with it. Party hover targets use larger invisible parent hit areas.
- Compatibility percentages appear inline next to party names, larger and in each party’s color.
- Party cards/rankings were removed; the graph itself carries the ranking and percentages.
- The results transition includes loading feedback while the graph module is prepared.
- The footer places the local privacy statement on the left and a GitHub-linked “Joey Prüssing” credit with the GitHub icon on the right; it stacks cleanly on small screens.

## Privacy and sharing

- No answers are saved remotely. There is no account, database, analytics, or tracking.
- A share button copies a compact, opaque-looking URL fragment that contains the edition, answers, dataset version, and language.
- Opening a shared URL goes directly to the result view reconstructed in the browser.
- Old verbose and older-version links continue to decode.

## Hosting and repository

- The entire project is public at https://github.com/joeytomoyama/wahlmate.
- GitHub Pages deploys only `dist/` through `.github/workflows/pages.yml`.
- The rest of the repository contains tests, research, and decision records for maintainability.
- The former ChatGPT Sites deployment remains as a secondary legacy copy. GitHub Pages is the source of the public `wahlmate.de` release.
- The project’s Git history exposes the configured commit-author name and email; this was reviewed and explicitly accepted.
