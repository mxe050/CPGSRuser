# Source verification log: statistics and GRADE reader upgrade

Last verified: **2026-08-22**. The canonical machine-readable record is `data/statistics-sources.json`. This log is a review-oriented index; each module in `advanced-statistics.html` repeats its applicable source URL, status, and verification date beside the claim.

## Status vocabulary

- **Final guidance / final addendum**: completed official guidance.
- **Draft guidance — not for implementation**: useful for learning the current discussion, not a final implementation rule.
- **Reporting guideline**: transparent reporting standard; it does not prove methodological quality or causal validity.
- **Appraisal tool**: tool for risk-of-bias/applicability assessment; not a reporting checklist.
- **Peer-reviewed methods / emerging**: a published methodological contribution whose limits must be read in context.

| ID | Primary or official URL | Status recorded | Claim family in this change |
|---|---|---|---|
| ICH-E9R1 | <https://database.ich.org/sites/default/files/E9-R1_Step4_Guideline_2019_1203.pdf> | Final ICH addendum | estimand, intercurrent events, sensitivity analysis |
| CORE-GRADE-1 | <https://www.bmj.com/content/389/bmj-2024-081903> | Peer-reviewed methods | target of certainty |
| CORE-GRADE-2 | <https://www.bmj.com/content/389/bmj-2024-081904> | Peer-reviewed methods | CI, threshold, imprecision |
| CORE-GRADE-3 | <https://www.bmj.com/content/389/bmj-2024-081905> | Peer-reviewed methods | inconsistency beyond I2 |
| CORE-GRADE-5 | <https://www.bmj.com/content/389/bmj-2024-083865> | Peer-reviewed methods | indirectness and transportability |
| CORE-GRADE-6 | <https://www.bmj.com/content/389/bmj-2024-083866> | Peer-reviewed methods | relative/absolute effects and SoF presentation |
| GRADE-GUIDANCE-44 | <https://pubmed.ncbi.nlm.nih.gov/41285282/> | Peer-reviewed methods | complementary use of RCT and NRSI |
| NPH-REVIEW | <https://pmc.ncbi.nlm.nih.gov/articles/PMC11162097/> | Peer-reviewed methods review | NPH, RMST, time-to-event summaries |
| FINE-GRAY | <https://doi.org/10.1080/01621459.1999.10474144> | Peer-reviewed methods | competing risks |
| TORRES-2025 | <https://pubmed.ncbi.nlm.nih.gov/40140629/> | Peer-reviewed methods | missing-data sensitivity analysis |
| CONSORT-2025 | <https://www.bmj.com/content/389/bmj-2024-081123> | Reporting guideline | multiplicity and reporting; not appraisal |
| ICH-E20-DRAFT | <https://www.fda.gov/regulatory-information/search-fda-guidance-documents/e20-adaptive-designs-clinical-trials> | Draft Level 1; not for implementation | adaptive design |
| FDA-BAYES-DRAFT | <https://www.fda.gov/regulatory-information/search-fda-guidance-documents/use-bayesian-methodology-clinical-trials-drug-and-biological-products> | Draft; not for implementation | Bayesian trials |
| ICH-M14 | <https://www.fda.gov/regulatory-information/search-fda-guidance-documents/m14-general-principles-planning-designing-analyzing-and-reporting-non-interventional-studies-utilize> | Final Level 1 guidance | non-interventional studies |
| TARGET-STATEMENT | <https://www.bmj.com/content/390/bmj-2025-087179> | Reporting guideline; not validity guarantee | target-trial emulation |
| TRIPOD-AI | <https://www.bmj.com/content/385/bmj-2023-078378> | Reporting guideline; not appraisal | AI prediction reporting |
| PROBAST-AI | <https://www.bmj.com/content/388/bmj-2024-082505> | Appraisal tool | AI prediction model RoB/applicability |
| COCHRANE-10 | <https://www.cochrane.org/authors/handbooks-and-manuals/handbook/current/chapter-10> | Current handbook | meta-analysis and heterogeneity |
| COCHRANE-24 | <https://www.cochrane.org/authors/handbooks-and-manuals/handbook/current/chapter-24> | Current handbook | NRSI in evidence synthesis |
| CRT-ESTIMANDS | <https://www.bmj.com/content/393/bmj-2025-089050> | Peer-reviewed consensus framework | cluster RCT estimands |
| TRANSPORT-2025 | <https://pubmed.ncbi.nlm.nih.gov/40266689/> | Peer-reviewed methods; emerging | transportability |
| SPIRIT-2025 | <https://www.bmj.com/content/389/bmj-2024-081477> | Reporting guideline | protocol transparency |
| PRISMA-2020 | <https://www.bmj.com/content/372/bmj.n71> | Reporting guideline | SR reporting transparency |

## Claim-level implementation rules

1. A status label appears adjacent to every module source block in the new independent page.
2. Draft documents visibly say **Not for implementation**; they are never presented as a final mandatory rule.
3. TRIPOD+AI, CONSORT, SPIRIT, and PRISMA are called reporting guidance, not quality appraisal.
4. TARGET is called a reporting guideline, not proof that an observational analysis is causally valid.
5. PROBAST+AI is called an appraisal tool and is not conflated with reporting completeness.
6. The reader-facing content avoids p-value-only, I2-only, or sample-size-only inferences.
## Deep-dive rearchitecture verification

The three linked learning pages were restructured on 2026-08-22 without removing their existing topics. Their roles are now separated as follows:

1. Statistics and causal-inference deep dive: estimand, effect measures, uncertainty, models, and evidence synthesis.
2. Non-RCT and observational studies: causal question, time zero, confounding, variable roles, adjustment diagnostics, and evidence use.
3. Oncology outcomes: endpoint definition, time and state, surrogate validity, PRO, harm, and outcome-specific certainty.

| ID | Primary or official URL | Status recorded | New or strengthened claim family |
|---|---|---|---|
| HERNAN-ROBINS-2016 | <https://pmc.ncbi.nlm.nih.gov/articles/PMC4832051/> | Peer-reviewed methods | target-trial emulation, aligned eligibility, treatment strategies, and time zero |
| VANDERWEELE-SHPITSER-2019 | <https://pmc.ncbi.nlm.nih.gov/articles/PMC6447501/> | Peer-reviewed methods | causal confounder selection; statistical significance alone cannot determine causal variable roles |
| BROOKHART-PS-2006 | <https://doi.org/10.1093/aje/kwj149> | Peer-reviewed methods | propensity-score variable selection; baseline prognostic variables and prediction-only selection are not interchangeable |

### Added reader-facing safeguards

1. A univariable p value, an observed Table 1 imbalance, a stepwise final model, or the phrase "adjusted analysis" is not treated as sufficient evidence of a causal effect.
2. For total-effect questions, treatment-post variables, mediators, colliders, and instruments must not be silently treated as ordinary adjustment variables.
3. Propensity-score balance is described as a diagnostic for measured covariates, not proof that unmeasured confounding disappeared.
4. A surrogate endpoint, response rate, PFS result, within-group PRO change, or a narrow CI is not automatically translated into patient-important benefit.
5. The target-trial methods paper is displayed separately from TARGET reporting guidance and ICH M14 final guidance, so their roles are not conflated.