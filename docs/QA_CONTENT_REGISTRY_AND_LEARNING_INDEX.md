# QA: Content Registry, Learning Index, and Methodology Pages

- QA date: 2026-08-22
- Scope: content registry, legacy routing, learning index, source status display, citation interaction, and the new Guyatt and meta-analysis pages.

## Automated Static Checks

Run:

    node tools/verify-content-preservation.mjs
    node tools/verify-cpgsr.mjs
    node --check learning-index.js
    node --check script.js
    node --check js/references.js
    git diff --check

The checks cover:

1. baseline files, IDs, asset references, and media-bearing structures;
2. duplicate IDs and local HTML links or anchors;
3. all independent pages having one H1, metadata, skip link, breadcrumb, and CPGSR Reader brand;
4. all source strips in the two new methodology pages carrying a visual source status and verification date;
5. all 19 meta-analysis modules and all seven Core GRADE direct links;
6. registry targets, related-content IDs, and reference IDs;
7. verified-only interactive citation keys;
8. 12 workflow stages, 17 topic groups, search synonyms, URL query state, back or forward handling, and legacy routing support;
9. responsive CSS rules and the absence of viewport-scaled clamp typography in the new page styles.

## Browser QA Matrix

A final browser pass is required on 360, 390, 768, and 1440 px widths. At each width, verify that no text overlaps, focus is visible, the skip link reaches main content, page headings remain readable, the mobile menu works, and the right-side or top navigation remains available.

For the learning index, also verify the following:

1. a query such as MID, CI, PS, RMST, NMA, PRISMA, AMSTAR, Guyatt, SR, or CPG finds the intended group;
2. filters update the URL query without a full reload;
3. browser back and forward restore the displayed filters and selected view;
4. the workflow and topic tabs are keyboard reachable and have correct selected state;
5. a citation whose record is marked incomplete remains ordinary text rather than an interactive popover.

## Manual Content Review

Reader-facing text is checked against the source-status labels: final or official guidance, peer-reviewed methods, reporting guidance, appraisal tool, draft, and emerging method are visually distinct. The pages repeatedly separate a reporting checklist from appraisal of methods, and a statistical signal from a clinical or causal conclusion.
