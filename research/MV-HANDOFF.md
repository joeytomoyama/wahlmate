# Mecklenburg-Vorpommern preparation

Saved 13 September 2026. User requested research now, implementation together tomorrow; no automation requested. Live site not modified by this preparation.

## Data

`mv-data.json` contains 21 original German draft statements, balanced argument pairs, source URLs, and a seven-party position array. It is a research draft, not an approved questionnaire. English translations are explicitly pending. Null means unverified/unknown, never neutral. Six narrowly supported affirmative positions have evidence notes; remaining cells need research. Do not infer party positions from ideology, federal programmes or the Berlin matrix.

## Confirmed and pending

- Official election authority lists the election for 20 September 2026: https://www.laiv-mv.de/Wahlen/Landtagswahlen/2026/ . It provides admitted lists and sample ballots. Check each included party against the final admission PDF before release; do not claim all seven have been verified yet.
- Official programme entry points are in the JSON. SPD and Greens passages support the six populated cells. The final CDU programme must be retrieved; its adoption on 5 June is documented. The AfD May PDF is marked Entwurf; use the June final document after checking it. Die Linke programme site returned an opening error. FDP and BSW indexes provide full downloads not yet inspected.
- Draft topics prioritize rural services, health, housing, education, renewables, agriculture, tourism, migration and safety. Rebalance after examining real party differences. Avoid keeping universal-agreement questions merely to reach 21.
- Consider splitting the Ostsee statement if fishing methods and agricultural nutrient rules produce different party answers. Establish exact scope for hospital preservation and industrial aid. Check state authority and existing law when finalizing each statement.
- BSW adoption date confirmed on official page: 14 March 2026. Do not treat federal-policy campaign statements as policies the state can implement itself.

## Tomorrow's implementation

1. Finish primary programme review, fill evidence with page/section references, and resolve each question's scope. Unsupported positions remain null. Review all German pros/cons and translate into English.
2. Convert approved content into the app's bilingual data shape. Current live entry is `dist/app-fixed.js`, not `dist/app.js`. Existing legacy Berlin English strings and alignments have not been audited in this research.
3. Add MV to the custom edition picker, state switching, sources and edition-specific methodology. Existing methodology still contains national wording; do not copy that to MV.
4. Extend `dist/share-results.js` with a new immutable MV dataset/version. Preserve existing `*-v1.js` files so old Germany/Berlin result URLs stay reproducible. Unknown positions excluded from scoring; skip remains 0.
5. Verify full 21-answer flow, both languages, graph scores/hover/loading, edition switching and shared URL round trips. Use the existing site/project and preserve allowed viewers. Publish only the completed implementation.

## Additional primary-source leads

- CDU programme index: https://cdu-mv.de/programme/
- CDU adoption announcement: https://cdu-mv.de/2026/daniel-peters-wir-zeigen-mit-diesem-programm-mecklenburg-vorpommern-kann-mehr-besser-nur-mit-uns/
- AfD final PDF link was found on candidate page: https://petrafederau.com/landtagswahl-mv-2026
- Official ballot announcements: https://www.laiv-mv.de/Wahlen/Bekanntmachungen/

No programme text was copied into this file; arguments and questions are editorial drafts. Source links are retained for verification.
