# GRADE Open integration inventory

Last verified: 2026-08-22

## Scope and provenance rule

This inventory is an audit trail, not permission to copy content. GRADE Open is treated as a related learning surface. CPGSR Reader is a reader-side guide: it tells users what to inspect in a trial, systematic review, or guideline and directs important claims to independently verified primary materials.

## Inspected surfaces

| Surface | Observation | Provenance confidence | Action in CPGSR Reader |
|---|---|---:|---|
| `https://core-grade-guide-1-mxe050s-projects.vercel.app/` | Public shell title: GRADE Open / GRADE learning material. | Confirmed public deployment; content-render audit blocked by local browser kernel. | No text or figure imported. |
| `https://github.com/mxe050/GRADEslide` | Candidate source repository. | Confirmed public repository. | Used only to inventory broad learning domains. |
| `web/public/data/slides.json` in candidate repository | 126 slide records; includes MAP0 (EBM to GRADE), N12 (SR/MA), N16 (CPG). | Candidate-source to deployment linkage unconfirmed. | Do not copy. Keep only conceptual cross-navigation. |

## Reader-side integration map

| Candidate domain | CPGSR Reader destination | Reader-side use | Evidence basis |
|---|---|---|---|
| EBM to GRADE map | `advanced-statistics.html#grade-connection` | Explain how statistical uncertainty relates to, but is not identical with, GRADE certainty. | Core GRADE 1-3; GRADE Guidance 44 |
| SR / meta-analysis | `advanced-statistics.html#meta-analysis`, Ch5/6/9 links | Ask readers to inspect points, CIs, thresholds, heterogeneity and prediction rather than an I2 value alone. | Cochrane Handbook Ch10/24; Core GRADE 3 |
| CPG / recommendation | Existing `index.html#page-16` and Ch5 / `#grade-connection` | Preserve the established CPGSR Reader workflow and connect statistics to SoF and EtD interpretation. | Users' Guides; Core GRADE |
| NRSI / RWE | `non-rct-observational-studies.html`, `advanced-statistics.html#target-trial` | Separate causal question, design, adjustment, and reporting from a claim of causal validity. | ICH M14; TARGET; GRADE Guidance 44 |
| Cancer endpoints | `oncology-outcomes.html`, `advanced-statistics.html#survival` | Interpret endpoint and time-to-event summaries before recommendation use. | Peer-reviewed NPH methods; FDA oncology guidance context |

## Explicit non-integrations

- No GRADE Open wording, slide sequence, figure, or image is copied into this branch.
- No candidate source is presented as an authoritative deployment source because the bundle-to-repository relation was not proven.
- No presentation or reporting checklist is represented as a quality-appraisal tool or a guarantee of causal validity.