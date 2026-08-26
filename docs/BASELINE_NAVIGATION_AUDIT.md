# Baseline navigation audit

- Baseline commit: `7b4b9107eedc88b3ef18eb55ec362158c0c0009b`
- Generated: 2026-08-26T13:19:46.738Z
- HTML files inventoried: 9

## Legacy page mapping

| DOM order | Page ID | Legacy hash | Direct numeric ID | Sidebar entries |
| --- | --- | --- | --- | --- |
| 0 | `page-0` | `#page-0` | 0 | 0 まずここからお読みください Start here |
| 1 | `page-1` | `#page-1` | 1 | 1 EBMとCPG・SRの読み方 EBM & Reading CPGs/SRs |
| 2 | `page-2` | `#page-2` | 2 | 2 GRADEアプローチの概要 Overview of GRADE |
| 3 | `page-3` | `#page-3` | 3 | 3 エビデンスの確実性4段階 Four Levels of Certainty |
| 4 | `page-4` | `#page-4` | 4 | 4 強い推奨 vs 条件付き推奨 + GPS Strong vs Conditional + GPS |
| 5 | `page-5` | `#page-5` | 5 | 5 SoF表・Evidence Profileの読み方 Reading SoF Tables |
| 6 | `page-6` | `#page-6` | 6 | 6 メタ分析・相対効果と絶対効果 Meta-analysis / Relative vs Absolute |
| 7 | `page-7` | `#page-7` | 7 | 7 閾値とMID Thresholds & MID |
| 8 | `page-8` | `#page-8` | 8 | 8 Risk of Bias(RCT+観察研究) Risk of Bias |
| 9 | `page-9` | `#page-9` | 9 | 9 不一致性 Inconsistency |
| 10 | `page-10` | `#page-10` | 10 | 10 非直接性 Indirectness |
| 11 | `page-11` | `#page-11` | 11 | 11 不精確さ Imprecision |
| 12 | `page-12` | `#page-12` | 12 | 12 Dissemination bias Dissemination bias |
| 13 | `page-13` | `#page-13` | 13 | 13 非RCT・観察研究のSR+詳細学習 詳細:観察研究・がんアウトカム NRSI / Oncology Deep Dive |
| 14 | `page-14` | `#page-14` | 14 | 14 定性的研究のSR — CERQual Qualitative SR |
| 15 | `page-15` | `#page-15` | 15 | 15 単一推定値なし/GPS/ネットベネフィット Alternative recommendations |
| 16 | `page-16` | `#page-16` | 16 | 16 ⭐ 信頼できるCPGの6つの質問 6 Questions for Trustworthy CPG |
| 17 | `page-17` | `#page-17` | 17 | 17 CPG品質の実例(NCCN/IOM/日本) CPG Quality Examples |
| 18 | `page-18` | `#page-18` | 18 | 18 AMSTAR 2(16項目)・PRISMA 2020(27項目) AMSTAR 2 / PRISMA 2020 |
| 19 | `page-20` | `#page-20` | 20 | 20 共同意思決定と価値観 SDM & Values |
| 20 | `page-21` | `#page-21` | 21 | 23 用語集+Q&A Glossary & Q&A |
| 21 | `page-22` | `#page-22` | 22 | 24 Guyatt先生講演 Guyatt Lectures |
| 22 | `page-23` | `#page-23` | 23 | 25 参考文献一覧 References |
| 23 | `page-24` | `#page-24` | 24 | 📚 EBM・SR・CPG 徹底解説 Beginner's Primer |
| 24 | `page-25` | `#page-25` | 25 | 21 SR/MAの方法を監査する:JAMA Users' Guidesの質問 既存Ch1・Ch6・Ch8-12を横断する要約 JAMA UG: SR/MA Questions |
| 25 | `page-26` | `#page-26` | 26 | 22 ネットワークメタアナリシス JAMA UG Ch24: NMA |
| 26 | `page-28` | `#page-28` | 28 | none |
| 27 | `page-29` | `#page-29` | 29 | none |

## Detected differences

- Chapter indexes without an exact `page-N` element: , , , , , , , , , , , , , , , , , , , , , , , , .
- `page-N` elements not represented in `data/chapters.json`: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 21, 22, 23, 24, 25, 26, 28, 29.
- Sidebar buttons: 27.
- Body citation keys missing from `data/references.json`: none.
- Reference keys not detected as bracket citations in HTML: C1, C2, C4, G7, L1, M1, M3, M4, M5, M6, M7, M8, T3, U10, U14, U15, U4, U7, U8, U9, V1.

## Routing risk recorded before changes

The existing script opens `.page` elements by NodeList position. The sidebar uses `data-idx`, while DOM order and page IDs contain special pages. A stable content registry and compatibility layer are required before new indexed content is introduced.

## Baseline files

The machine-readable inventory, including IDs, headings, links, asset references, section-level normalized text hashes, and media counts, is in `BASELINE_CONTENT_MANIFEST.json`.
