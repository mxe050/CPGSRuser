# Content Preservation Report

- Baseline commit: bc7c3576941d0eb19b91d1e8eb01da21cfd05fa4
- Baseline inventory: docs/BASELINE_CONTENT_MANIFEST.json
- Verification date: 2026-08-22
- Scope: the six HTML files that existed at the recorded baseline.

## What Is Protected

The verification script checks that every baseline HTML file remains present, every baseline element ID remains addressable, every recorded local asset reference remains in the page, and baseline minima for figures, tables, embedded video or iframe material, and details blocks are not reduced.

The report distinguishes structural preservation from deliberately corrected wording. The latter is limited to corrections requested by the specification: fixed numerical rules were removed, incomplete citation placeholders were moved out of formal citations, and the reader-facing explanation of certainty, recommendation, MID, PRISMA, AMSTAR 2, ROBIS, IOM standards, and evidence synthesis was clarified.

## Baseline Pages

| Baseline page | Preservation check | Approved enrichment |
| --- | --- | --- |
| advanced-statistics.html | IDs, assets, and all recorded content structures retained | Cross-links to the learning index, non-RCT, oncology, meta-analysis, and Guyatt atlas |
| index.html | IDs, assets, figures, tables, details, and embedded media retained | Stable routing, learning-index entry point, corrected methodological wording and citation presentation |
| japan-cpg-tohoho.html | IDs, assets, and recorded structures retained | No scope expansion in this work package |
| non-rct-observational-studies.html | IDs, assets, and recorded structures retained | Causal-inference and meta-analysis connections strengthened |
| oncology-outcomes.html | IDs, assets, and recorded structures retained | Survival-analysis and meta-analysis connections strengthened |
| y-sensei-ebm-practice-links.html | IDs, assets, and recorded structures retained | No scope expansion in this work package |

## Deliberate Corrections

1. Absolute-effect interpretation now states the assumptions needed for a conversion; it does not offer a universal formula.
2. I2 and OIS are not treated as fixed decision thresholds.
3. MID, MCID, MIC, between-group differences, and within-person change are distinguished.
4. PRISMA 2020 is reporting guidance, AMSTAR 2 is critical appraisal, and ROBIS is a risk-of-bias tool for systematic reviews.
5. Certainty and recommendation are separated conceptually but linked through EtD.
6. Incomplete bibliographic placeholders are visibly kept outside the formal citation set.

## Reproducible Check

Run:

    node tools/verify-content-preservation.mjs

The script intentionally does not use a whole-page text hash as a pass criterion, because approved corrections and additive links legitimately change page text. It protects durable reading targets, assets, and media-bearing structures instead.
