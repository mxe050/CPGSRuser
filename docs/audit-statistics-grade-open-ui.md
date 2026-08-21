# Statistics / GRADE Open / UI audit

- Audit date: 2026-08-22
- Working branch: `codex/statistics-grade-open-ui-unification`
- Baseline `main` commit: `d93ba24657e42464a086c9264768e6369aed0363`
- Purpose: revise CPGSR Reader for readers of trials, systematic reviews, and clinical practice guidelines without turning it into a copy of GRADE Open.

## Materials reviewed before implementation

- `CONTEXT.md`, `README.md`
- Every root HTML file: `index.html`, `japan-cpg-tohoho.html`, `y-sensei-ebm-practice-links.html`, `non-rct-observational-studies.html`, `oncology-outcomes.html`
- Root CSS and JavaScript: `style.css`, `style-cpgsr.css`, `learning-paths.css`, `script.js`, `coreGRADE_utils.js`, and root page-specific code
- `data/references.json` and existing `data/*.json`, `js/*.js`

`CONTEXT.md` describes an earlier release line, so it is retained as project history rather than treated as the current source of page-by-page behavior. The current files and the verified remote `main` commit are the implementation baseline.

## Existing-site findings

| Surface | Finding before this change | Decision |
|---|---|---|
| `index.html` | Single-page reader with hash/history navigation and a sidebar; the chapter list is an entry point rather than all available material. | Preserve `showPage`, `pushState`, and the numbered chapters; add normal links to a separate advanced page. |
| `non-rct-observational-studies.html` | Existing substantial deep-dive with a unique learning path. | Retain content; add the common shell and a link to estimand/target-trial/RWE learning. |
| `oncology-outcomes.html` | Existing substantial deep-dive about endpoint interpretation. | Retain content; add the common shell and a link to survival/NPH/RMST learning. |
| `japan-cpg-tohoho.html` | Independent Ch16 companion page with its own footer return route. | Retain page content and lower return route; replace the old duplicate upper route with the common shell. |
| `y-sensei-ebm-practice-links.html` | Independent searchable link collection with an editable additional-links area. | Retain its data and interaction; add the common shell and home route. |

## Static baseline checks

At the start of the audit, duplicate HTML IDs were not found in root pages. `index.html` is intentionally a multiple-view single page and contains multiple page-level headings, while each independent page had one H1. The independent pages did not all use the same canonical metadata, skip route, or global header; that is addressed in this change.

## GRADE Open reconciliation

The public GRADE Open deployment was inspected at `https://core-grade-guide-1-mxe050s-projects.vercel.app/`. Its public shell identifies it as GRADE learning material. A candidate public source repository, `mxe050/GRADEslide`, exposes `web/public/data/slides.json` with 126 slide records, including general EBM-to-GRADE, SR/MA, and CPG routes. The deployed JavaScript bundle did not expose a reliable source-map-style proof that this exact file is the deployment source.

Therefore this change does **not** copy slide text, figures, or route-specific content from that candidate. It only uses the audit to identify concepts that deserve reader-side navigation, then bases the new explanations on independently verified official or peer-reviewed source material. The detailed inventory is in `docs/grade-open-integration-inventory.md` and `.json`.

## Browser limitation recorded for QA

The configured in-app browser kernel failed during sandbox setup before it could load a page. No alternative browser automation was used, so rendered-viewport, browser-history, and console checks remain explicitly marked as blocked in the QA record rather than reported as completed. Static HTML/JavaScript/link checks are performed separately.