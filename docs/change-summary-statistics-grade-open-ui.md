# Change summary: statistics / GRADE Open / UI unification

## Intent

Strengthen CPGSR Reader as a site for **reading** trials, systematic reviews, and guidelines. The change adds a self-contained advanced statistics and causal-inference learning page while preserving the existing non-RCT and oncology pages. It does not turn CPGSR Reader into an unreviewed mirror of GRADE Open.

## Added

- `advanced-statistics.html`, `advanced-statistics.css`, and `advanced-statistics.js`.
- Sixteen reader-focused modules: estimand; effect measures; p values, CIs, and thresholds; NPH/RMST; competing risks; missing data; multiplicity; adaptive designs; Bayesian trials; target trials/RWE; AI prediction; advanced meta-analysis; cluster RCTs; transportability; reporting; and GRADE connection.
- Per-module primary or official source URL, material status, and last-verification date.
- Search and topic/level filters for the new page.
- `site-shell.css` for a shared skip link, compact header, breadcrumb, right-side home brand, responsive behavior, and footer return link.
- `data/statistics-sources.json` and source/audit/integration documents under `docs/`.

## Enhanced without replacing existing work

- `non-rct-observational-studies.html`: common shell plus a direct route to estimand / target-trial / RWE learning.
- `oncology-outcomes.html`: common shell plus a direct route to HR / NPH / RMST learning.
- `japan-cpg-tohoho.html` and `y-sensei-ebm-practice-links.html`: common shell, metadata, and home route while keeping their existing content and specialized behavior.
- `index.html`: a separate advanced-learning entry in the study map, plus chapter-context links from Ch5, Ch6, Ch7, Ch9, Ch11, and Ch13.
- `README.md`: corrected to the current 25-chapter structure and documented the independent pages.

## Methodological safeguards

- Draft documents are visibly marked **Not for implementation**.
- Reporting guidance and appraisal tools are visually and textually separated.
- TARGET is not presented as proof of causal validity.
- TRIPOD+AI, CONSORT, SPIRIT, and PRISMA are not presented as appraisal tools.
- The learning content avoids p-value-only, I2-only, or sample-size-only conclusions.
- GRADE Open was audited as a related learning surface; no unverified slide text, figure, or route-specific material was copied.

## No intended breaking change

- The SPA hash/history behavior in `index.html` remains in place.
- Existing page content and existing special interactions remain intact.
- No deployment, dependency, or build configuration changed.

See `docs/qa-statistics-grade-open-ui.md` for completed and blocked validation steps.