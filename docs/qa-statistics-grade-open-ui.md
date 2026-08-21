# QA: statistics, GRADE Open audit, and standalone UI unification

Checked on: 2026-08-22
Branch: `codex/statistics-grade-open-ui-unification`

## Static checks completed

| Check | Result | Notes |
|---|---|---|
| Root HTML duplicate IDs | Pass | `index.html`, five existing standalone pages, and `advanced-statistics.html`: no duplicate static IDs. |
| H1 on standalone pages | Pass | Exactly one H1 on `advanced-statistics.html`, `non-rct-observational-studies.html`, `oncology-outcomes.html`, `japan-cpg-tohoho.html`, and `y-sensei-ebm-practice-links.html`. |
| Metadata and common shell | Pass | Each standalone page has viewport, description, canonical URL, skip route, global header, `CPGSR Reader` home brand, breadcrumb, and `main-content` target. |
| New advanced learning modules | Pass | 17 modules (Modules 0–15 plus Module 9A); every module has source URL, status label, and last-verified date. |
| Status differentiation | Pass | Final, draft, reporting guideline, appraisal tool, peer-reviewed methods, and emerging method states have distinct classes and colors. |
| Internal links and anchors | Pass | Static scan of all root HTML links found no missing local file or anchor target. |
| JSON | Pass | `data/references.json`, `data/statistics-sources.json`, and `docs/grade-open-integration-inventory.json` parse successfully. |
| JavaScript syntax | Pass | `script.js`, `coreGRADE_utils.js`, all `js/*.js`, and `advanced-statistics.js` pass syntax checks. Inline executable scripts also compile without syntax error. |
| ARIA references | Pass | All static `aria-labelledby` references resolve to a local ID. |
| Keyboard-oriented static checks | Pass | Skip links, visible focus styles, select `change` handlers, search input, and Escape-to-clear search are present. |
| Browser-history static checks | Pass | Existing SPA retains `history.pushState` and `popstate`; independent-page links use normal anchors. |
| Diff whitespace check | Pass | `git diff --check` reports no whitespace or conflict-marker error. |

## Responsive review: static evidence

- `site-shell.css` has a mobile shell at `max-width: 640px`, covering 360px and 390px layouts.
- `advanced-statistics.css` changes the content/TOC layout at `max-width: 900px` and reduces to one-column controls/cards at `max-width: 640px`, covering 768px and 1440px layout modes by design.
- Buttons and links added by this change have at least 44px minimum height where they are interactive.

## Browser-render checks not completed

The configured in-app browser kernel exited during sandbox setup before navigation. It was retried and did not provide a usable browser session. Therefore the following are **blocked, not passed**:

- Screenshot inspection at 360 / 390 / 768 / 1440px.
- Actual keyboard tab sequence in a rendered page.
- Back/forward behavior in a real browser session.
- Browser console-error observation.

No fallback browser automation was substituted. These checks should be run in a functioning browser session before a release that requires visual acceptance.

## Manual acceptance path when a browser is available

1. Open `index.html#page-5`, `#page-6`, `#page-7`, `#page-9`, `#page-11`, and `#page-13`; activate each new statistics link and verify its target heading.
2. From each independent page, activate the upper-right `CPGSR Reader` brand, the breadcrumb return route, and the footer home route.
3. On `advanced-statistics.html`, test text search, level/topic selects, Escape while the search field contains text, a module anchor, and browser Back.
4. Inspect no-overlap behavior at 360, 390, 768, and 1440px and review the console.
## Deep-dive rearchitecture checks

| Check | Result | Notes |
|---|---|---|
| Three-page information architecture | Pass | Statistics is organized as estimation and uncertainty; non-RCT as causal design and adjustment; oncology as patient-important outcome interpretation. Each page begins with a three-page route map and grouped navigation. |
| Causal variable-selection content | Pass | Module 9A and NRSI section 13B explicitly distinguish causal variable roles from univariable p-value screening, Table 1 screening, stepwise selection, and uncritical all-variable adjustment. |
| Cross-page routes | Pass | Static local-file and anchor scan passes for the updated index, statistics, non-RCT, and oncology pages. |
| HTML structure | Pass | Static tag-nesting check passes for the three restructured learning pages. |
| Updated data registry | Pass | statistics-sources.json parses successfully and records the new methods sources, status, URL, verification date, claim family, and page locations. |
| Updated filter behavior | Pass | advanced-statistics.js syntax passes; its filter now hides a chapter band when none of its modules match. |