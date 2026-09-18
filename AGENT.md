# WahlMate agent guide

Read this file and `DECISIONS.md` before changing the project. The repository is public: never add credentials, access tokens, private email allowlists, deployment archives, or machine-specific temporary paths.

## Project

WahlMate is a bilingual, static political compatibility questionnaire for Germany, Berlin, and Mecklenburg-Vorpommern. Each edition has 21 questions and compares answers with seven parties: CDU/CSU or CDU, SPD, Bündnis 90 / Die Grünen, FDP, AfD, Die Linke, and BSW.

- Production: https://wahlmate.de/
- Repository: https://github.com/joeytomoyama/wahlmate
- Secondary legacy deployment: https://common-ground-eighteen.joelsanchezhoffmanng.chatgpt.site/
- No database, accounts, analytics, tracking, or server logic.
- German is the default language. English must work throughout every edition.
- Answers and shared results remain entirely in the browser.

## Structure

`dist/` is both the authored static application and the GitHub Pages deployment artifact. There is no compilation step.

- `dist/index.html`: document entry point; loads `app-fixed.js` and graph enhancements.
- `dist/app-fixed.js`: active application shell, rendering, edition/language switching, quiz, results, and footer. `dist/app.js` is legacy and is not loaded.
- `dist/share-results.js`: edition/version registry and compact URL encoding/decoding.
- `dist/arguments.js`: current bilingual pro/con explanations. It only overrides current matching statements so historical shared links retain their original explanations.
- `dist/data-v1.js`, `dist/data-v2.js`: national snapshots and current national replacements.
- `dist/berlin-data-v1.js`: Berlin questions, English localizations, positions, and sources.
- `dist/mv-data-v1.js`, `dist/mv-data-v2.js`: immutable MV preview and current sourced snapshot.
- `dist/graph-enhancements.js`: sorting, inline percentages, bidirectional hover/focus highlighting, responsive graph layout, and larger hit areas.
- `dist/header-controls.js`, `dist/header-controls.css`: edition menu, theme control, responsive header/footer, and related overrides.
- `research/`: source notes and evidence, especially for MV.
- `argument-review.md`: editorial principles and the most recent argument review.
- `tests/editions.mjs`: bilingual flows, edition/version sharing, scoring, and data checks.
- `tests/graph.mjs`: graph sorting, labels, hover targets, and keyboard behavior.

## Working rules

1. Preserve old shared URLs. Treat every published versioned dataset as immutable. If question meaning, ordering, or party positions change, add a new version in `share-results.js`; do not rewrite an old snapshot.
2. A translation correction that does not alter scoring may be applied to the current localization, but verify old result links still decode and render.
3. Do not infer party positions from ideology. Use party programmes, official party answers, or other primary evidence. Leave genuinely unclear positions as `null`.
4. Keep party names in German in both languages.
5. Every current question needs a clear, concrete, balanced pro and con in German and English. The arguments should explain the actual tradeoff, not repeat the same consequence from opposite directions.
6. Do not expose technical implementation details inside the voter-facing experience unless they help users interpret results.
7. Preserve accessibility: keyboard interactions, visible focus, descriptive labels, adequate hit areas, and reduced-motion behavior.
8. Preserve mobile behavior: no page-level horizontal scrolling, readable topic labels, a usable minimum graph width, fixed vertical graph scaling, and stable footer alignment.
9. Keep the site static and dependency-light. Do not add a backend for sharing; results are encoded in the URL fragment.

## Verification

Run these after relevant changes:

```powershell
node --check dist/app-fixed.js
node tests/editions.mjs
node tests/graph.mjs
git diff --check
```

For content changes, manually inspect at least one question and one result link in both languages for every affected edition.

## Deployment

GitHub Pages is the primary host. `.github/workflows/pages.yml` publishes only `dist/` whenever `main` is pushed. The custom domain is `wahlmate.de` and HTTPS is managed by GitHub Pages.

Normal release flow:

```powershell
git add <changed-files>
git commit -m "Describe the change"
git push github main
```

Confirm the `Deploy WahlMate to GitHub Pages` action succeeds and its deployment URL is `https://wahlmate.de/`.

The repository also retains `.openai/hosting.json` for the secondary Sites deployment. Update that deployment only when explicitly maintaining the legacy copy; preserve its current audience and never commit its temporary credentials.

