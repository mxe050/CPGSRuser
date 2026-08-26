# コンテンツ移行対応表

この表は「削除表」ではありません。現在の各ページを、新しい情報設計のどこから開けるようにするかを定めます。

## A. 本編25章

| 現在 | contentId | 新しい主配置 | 関連表示 | 取扱い |
|---|---|---|---|---|
| Ch1 EBMとCPG・SRの読み方 | `ebm-cpg-sr-basics` | EBM BASIC E1 | START、MAP 1、E2 | 本文維持。PICO専用ハブからもリンク |
| Ch2 GRADE概要 | `grade-overview` | MAIN MAP 全体像 | MAP 1、2、3、T1 | 既存本文維持。新マップの基礎説明に接続 |
| Ch3 確実性4段階 | `certainty-levels` | MAP 3-0 | SoF、用語集 | 本文維持 |
| Ch4 推奨の強さ＋GPS | `recommendation-strength` | MAP 5 | MAP 4、T7 | EtD部分と推奨部分へ内部アンカー追加 |
| Ch5 SoF・Evidence Profile | `summary-of-findings` | SoF S3 | MAP 2、3、4 | 本文維持 |
| Ch6 相対・絶対効果 | `effect-measures-absolute` | SoF S1 | MAP 4、6、T4 | 本文維持 |
| Ch7 閾値とMID | `thresholds-mid` | SoF S2 | MAP 3-4、MAP 4 | 本文維持 |
| Ch8 Risk of Bias | `risk-of-bias` | MAP 3-1 | T2、T6 | 本文維持 |
| Ch9 不一致性 | `inconsistency` | MAP 3-2 | T4 | 本文維持 |
| Ch10 非直接性 | `indirectness` | MAP 3-3 | T5、MAP 6 | 本文維持 |
| Ch11 不精確さ | `imprecision` | MAP 3-4 | SoF S2、T9 | 本文維持 |
| Ch12 Dissemination bias | `dissemination-bias` | MAP 3-5 | T6 | 本文維持。missing evidenceへの表現を明確化 |
| Ch13 非RCT・観察研究のSR | `nrsi-systematic-review` | T2 | MAP 3-1、BRIDGE | 本文維持 |
| Ch14 定性研究・CERQual | `qualitative-cerqual` | T3 | MAP 2、MAP 4 | 本文維持 |
| Ch15 単一推定値なし／GPS／net benefit | `alternative-recommendations` | T7 | MAP 5、MAP 4 | ページを削除せず、3つの内部アンカーと入口に分解 |
| Ch16 信頼できるCPG | `trustworthy-cpg` | T6 | MAP 6 Assess | 本文維持 |
| Ch17 CPG品質の実例 | `cpg-quality-examples` | T10 | T6、MAP 6 | 本文維持 |
| Ch18 AMSTAR 2／PRISMA／ROBIS | `sr-reporting-and-appraisal` | T6 | BRIDGE | 本文維持 |
| Ch19 患者への適用 | `clinical-applicability` | MAP 6 Apply | MAP 4、T5 | 本文維持 |
| Ch20 共同意思決定と価値観 | `values-shared-decision` | MAP 6 SDM | MAP 2、MAP 4 | 本文維持 |
| Ch21 JAMA SR／MA | `jama-sr-ma` | EBM BASIC E2 | BRIDGE、T6 | 横断要約であることを明示 |
| Ch22 NMA | `jama-network-meta-analysis` | T4 | BRIDGE、MAP 3 | 本文維持 |
| Ch23 用語集＋Q&A | `glossary-qa` | RESOURCES | 全章 | 常設ボタン化 |
| Ch24 Guyatt先生講演 | `guyatt-lectures` | T8 | T1、E1 | `lecture`表示を維持 |
| Ch25 参考文献 | `references` | RESOURCES | 全章 | 常設ボタン化 |

## B. 入口・独立ページ

| 現在 | contentId / path | 新しい主配置 | 取扱い |
|---|---|---|---|
| 最初のページ | `home` | START 0 | `ebm-grade-map.png`を最初の主要図として追加 |
| 初学者向け徹底解説 | `beginner-primer` | START / EBM BASIC | 全文維持 |
| 学習索引 | `learning-index` | RESOURCES / 常設検索 | 現行機能維持。新分類に合わせてフィルタ追加 |
| 統計学・因果推論 | `advanced-statistics` | T9 | 全文維持 |
| 非RCT・観察研究 | `nonrct-observational` | T2 | 全文維持 |
| がんアウトカム | `oncology-outcomes` | T5 | 全文維持 |
| メタ分析の数理 | `meta-analysis-methods` | T4 | 全文維持 |
| Guyatt方法論アトラス | `guyatt-methodology-atlas` | T8 | 全文維持 |
| 本邦CPGトホホ集 | `japanese-cpg-pitfalls` | T10 / T6 | 全文維持 |
| 旧SPA版 | `legacy-japanese-cpg-pitfalls` | 旧URL互換 | 新ページへ案内しつつ旧routeを維持 |
| Y先生リンク集 | `y-sensei-ebm-practice-links.html` | RESOURCES | リンクを維持 |
| GRADE 探検 | 外部URL | EBM BASIC E4 | 削除禁止 |
| 既存CPGチェックGPT | 外部URL | EBM BASIC E4 | 削除禁止 |

## C. 登録済みサブコンテンツ

以下は親ページの新配置を継承します。ただし、`data/content-registry.json` に個別itemがある場合、ナビゲーション検索から消してはいけません。

| contentId例 | 新配置 |
|---|---|
| `advanced-estimand` | MAP 1 / T9 |
| `advanced-survival` | T5 / T9 |
| `advanced-causal-variables` | T2 / T9 |
| `nonrct-target-trial` | T2 / MAP 1 |
| `nonrct-propensity-score` | T2 |
| その他の`advanced-*` | T9を主配置、該当MAP段階を関連表示 |
| その他の`nonrct-*` | T2 |
| その他の`oncology-*` | T5 |
| その他の`meta-*` | T4 |
| その他の`guyatt-*` | T8 |

## D. 新規ハブ／トピック

| 新contentId | 役割 |
|---|---|
| `ebm-basics-hub` | EBM BASICの入口 |
| `ebm-critical-appraisal` | 批判的吟味の入口 |
| `map-clinical-question` | MAP 1 |
| `map-important-outcomes` | MAP 2 |
| `map-evidence-synthesis` | 上段の批判的吟味→SR/MA |
| `map-certainty` | MAP 3の親ハブ |
| `map-sof` | SoFの親ハブ |
| `map-etd` | MAP 4 |
| `map-recommendation` | MAP 5 |
| `map-recommendation-patterns` | 4推奨パターン |
| `map-ebm-crosswalk` | MAP 6、EBM 5A対応 |
| `map-apply-assess` | Apply / Assessの入口 |
| `topics-index` | T1〜T10の入口 |
| `topic-core-grade` | Core GRADEとは |
| `resources-index` | 索引・用語集・文献・演習 |

新規ハブは既存本文を置き換える章ではありません。短い説明と既存コンテンツへのカードを持つ「入口」です。

## E. 完全網羅ルール

Codexは `data/content-registry.json` の全itemを走査し、次を満たす必要があります。

1. 全`contentId`に`primaryPlacement`が1つある。
2. 必要に応じて`relatedPlacements`がある。
3. 新しいナビゲーションから到達不能なitemが0件。
4. `legacyTargets`を削除しない。
5. `relatedContentIds`の参照切れが0件。
6. 新規ホットスポットのtargetがすべて存在する。
7. 未分類itemがあれば自動で「TOPICS > 未分類」に隠すのではなく、検証を失敗させる。
