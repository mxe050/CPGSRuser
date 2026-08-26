# 新しい情報設計：EBMからGRADEへを主軸にする

## 1. 基本方針

現在の25章を別の25章へ単純に並べ替えるだけでは不十分です。現状は、学習順、研究デザイン別の深掘り、評価ツール、Guyatt関連資料、付録が同じ階層に混在しています。

新構成では、入口を次の4層に分けます。

1. **START**：最初に全体図を見る
2. **EBM BASIC**：GRADE以前を含むEBMの基本を学ぶ
3. **EBM → GRADE MAIN MAP**：`ebm-grade-map.png` に沿って進む
4. **TOPICS / RESOURCES**：図に無理に入らない内容を独立して探す

「図に入らないから削る」「図に合わせるため意味の違う内容を一章にまとめる」は禁止します。

---

# 2. 最初のページ

## START 0 — EBMからGRADEへ：全体マップ

最初のページでは、タイトルと短い説明の直後に `ebm-grade-map.png` を置きます。これはページの最初の主要学習要素です。

表示順は次のとおりです。

1. サイト名
2. 1〜2文の短い説明
3. **EBMからGRADEへ図**
4. 「図の項目を押すと該当章へ進みます」
5. 画像と同等のテキストリンク一覧
6. 初学者向け入口
7. 実践訓練・姉妹サイト
8. その他の既存案内

現在トップにある `images/core-grade-overview.png` はここから外します。ただし削除せず、新トピック **T1 Core GRADEとは** に移します。

---

# 3. EBM BASIC（別枠）

EBMの基本は、Core GRADEの各工程へ無理に分散させません。

## E1 — EBMとは何か

- 最良の研究エビデンス
- 臨床専門性
- 患者の価値観・選好
- 臨床状況・文脈
- EBMの歴史と誤解
- 原著、SR、CPGの役割の違い

主な移行元：

- `ebm-cpg-sr-basics`
- `beginner-primer`
- `guyatt-methodology-atlas#ebm-foundations`

## E2 — 批判的吟味

- 妥当性
- 結果
- 適用可能性
- JAMA Users' Guides
- 研究方法と結果を分けて読む

主な移行元：

- `jama-sr-ma`
- Ch1の「読み手としての3つの問い」
- `advanced-statistics` の研究解釈関連

## E3 — EBMの5ステップ

- Ask
- Acquire
- Appraise
- Apply
- Assess

`ebm-grade-map.png` 下段の「EBMの5ステップ × Core GRADE 1 Overview」に対応します。

## E4 — 実践・復習

- GRADE 探検
- 既存CPGチェックGPT
- Y先生のEBM実践リンク集
- 動画・スライド・演習

---

# 4. EBM → GRADE MAIN MAP

表示上は旧Chapter番号を主役にせず、図に対応するラベルを使います。

## MAP 1 — Clinical Question（PICO）

新しい薄いハブ `map-clinical-question` を作ります。

内容：

- PICO
- clinical questionとbackground question
- 対象集団、介入、比較、アウトカム
- 時間軸、設定、subgroup、estimandへの接続
- どの研究デザイン・文書種別が答えるか

既存内容への導線：

- `ebm-cpg-sr-basics`
- `grade-overview`
- `beginner-primer`
- `advanced-estimand`
- `nonrct-target-trial`

## MAP 2 — 重要アウトカム

新しい薄いハブ `map-important-outcomes` を作ります。

内容：

- critical / importantの選定
- 患者に重要なアウトカム
- surrogateとの区別
- harms、PRO、QOL
- 測定可能性と実現可能性
- アウトカム選定とEtDの関係

既存内容への導線：

- `grade-overview`
- `summary-of-findings`
- `oncology-outcomes`
- `qualitative-cerqual`
- `values-shared-decision`

## BRIDGE — 批判的吟味からSR・メタ分析へ

図の上段「批判的吟味 → システマティックレビュー／メタアナリシス」に対応する横断ハブ `map-evidence-synthesis` を作ります。

ここは独立したGRADE工程番号にはしません。

内容：

- 検索、選択、プロトコル
- 個別研究の批判的吟味
- SRとメタ分析
- 統合してよい問いか
- NMAなど発展的方法への分岐

既存内容への導線：

- `jama-sr-ma`
- `sr-reporting-and-appraisal`
- `meta-analysis-methods`
- `jama-network-meta-analysis`
- `learning-index`

## MAP 3 — エビデンスの確実性評価

ハブ `map-certainty` を作り、既存章を階層化します。

### 3-0 開始点と4段階

- `certainty-levels`
- `grade-overview`

### 3-1 Risk of Bias

- `risk-of-bias`
- `nrsi-systematic-review`
- `nonrct-observational`

### 3-2 Inconsistency

- `inconsistency`
- `meta-analysis-methods`

### 3-3 Indirectness

- `indirectness`
- `oncology-outcomes`
- applicabilityとの区別

### 3-4 Imprecision

- `imprecision`
- `thresholds-mid`
- `advanced-statistics`

### 3-5 Missing evidence / Dissemination bias

- `dissemination-bias`
- reporting bias、publication bias、ROB-MEへの導線

### 3-6 Rating up

- large effect
- dose-response
- 現行Core GRADEと旧基準の区別

## SoF — 効果の大きさと確実性をまとめる

図で番号が付いていないため、無理に「MAP 4」にしません。独立した橋渡しセクション `map-sof` とします。

### S1 相対効果・絶対効果

- `effect-measures-absolute`

### S2 MID・意思決定閾値・CI

- `thresholds-mid`
- `imprecision`

### S3 SoF・Evidence Profile

- `summary-of-findings`
- Core GRADE 6
- ベースラインリスク、絶対効果、certainty、脚注

## MAP 4 — Evidence to Decision（EtD）

新しいハブ `map-etd` を作ります。

Coreとして必ず扱うもの：

- 利益と害のバランス
- エビデンスの確実性
- 患者の価値観・選好
- 資源利用・費用対効果

状況に応じて扱うもの：

- 実行可能性
- 受容性
- 公平性

既存内容への導線：

- `recommendation-strength`
- `values-shared-decision`
- `clinical-applicability`
- `qualitative-cerqual`
- `alternative-recommendations` のnet benefit部分

## MAP 5 — 推奨の方向と強さ

ハブ `map-recommendation` を作ります。

### 5-1 推奨の方向

- する
- しない

### 5-2 推奨の強さ

- strong
- conditional / weak

### 5-3 4つの推奨パターン

- 強く推奨する
- 条件付きで推奨する
- 条件付きで推奨しない
- 強く推奨しない

### 5-4 Good Practice Statement

`alternative-recommendations` 内のGPS部分をここから開けるようにします。元ページは削除しません。

主な移行元：

- `recommendation-strength`
- `alternative-recommendations#gps`
- `guyatt-methodology-atlas` の推奨関連

## MAP 6 — EBM 5A × Core GRADE：Apply / Assess

ハブ `map-ebm-crosswalk` または `map-apply-assess` を作ります。

内容：

- Apply：患者に適用する
- shared decision making
- baseline risk
- values/preferences
- feasibility/burden
- Assess：実装後の評価、更新、監査
- 推奨と患者個別判断を混同しない

主な移行元：

- `clinical-applicability`
- `values-shared-decision`
- `trustworthy-cpg`
- `cpg-quality-examples`

---

# 5. TOPICS（図に無理に入れない）

## T1 — Core GRADEとは

新規 `topic-core-grade`。

現在トップにある `images/core-grade-overview.png` と、その拡大表示機能をここへ移します。

中心テーマ：

1. GRADE Working Groupとは
2. GRADE Guidance Group（G3）の役割
3. GRADE Bookとは
4. Core GRADE 2025シリーズとは
5. Holger Schünemannの位置づけ
6. Gordon Guyattの位置づけ
7. 個人の講演・論文と公式GRADE guidanceの違い
8. 歴史的資料、現行公式資料、教育解説を区別する

誤った対立構図を作らないでください。GuyattとSchünemannを「別のGRADE流派」として描くのは不正確です。

推奨する整理：

- **Guyatt**：EBMの主要な先駆者、GRADEの主要な方法論的貢献者、Core GRADEシリーズの中心著者
- **Schünemann**：GRADEの方法論・運営・教育の主要な貢献者、GRADE Bookの共同編集者、G3メンバー
- **GRADE Working Group**：公式GRADE guidanceを共同で開発・承認する母体
- **GRADE Book**：Working Groupの公式かつlivingな統合資料
- **個人講演**：有用だが、それだけで現行公式guidanceとは限らない

`core-grade-overview.png` には「教育用整理図」「サイト独自の要約図」等のラベルを付け、公式図であるかのように誤認させないでください。

## T2 — 非RCT・観察研究・因果推論

- `nrsi-systematic-review`
- `nonrct-observational`
- `advanced-estimand`
- `advanced-causal-variables`
- `nonrct-target-trial`
- `nonrct-propensity-score`

## T3 — 定性研究・CERQual

- `qualitative-cerqual`
- values、acceptability、feasibilityとの接続

## T4 — メタ分析・NMA

- `meta-analysis-methods`
- `jama-network-meta-analysis`
- 稀なイベント、依存効果量、IPD、成分NMA、living evidence

## T5 — がんアウトカム・生存時間

- `oncology-outcomes`
- `advanced-survival`
- OS、PFS、RMST、競合リスク、PRO、surrogate、害

## T6 — CPG・SRの信頼性

- `trustworthy-cpg`
- `cpg-quality-examples`
- `sr-reporting-and-appraisal`
- `japanese-cpg-pitfalls`
- AMSTAR 2、PRISMA 2020、ROBIS
- 報告、方法論的質、Risk of Biasを区別

## T7 — 単一推定値がない場合・特殊な統合・意思決定

現在の `alternative-recommendations` は一つの概念ではありません。削らず、ナビゲーション上は分解します。

- 単一推定値なし／SWiM
- Good Practice Statement → MAP 5へも表示
- net benefit／decision analysis
- narrative synthesis

既存ページの全文と旧URLは維持し、内部アンカーを追加して3入口から開きます。

## T8 — Guyatt方法論

- `guyatt-methodology-atlas`
- `guyatt-lectures`
- 歴史的基盤、査読済み方法論、現行公式guidance、講演を区別

## T9 — 統計学・新しい方法

- `advanced-statistics`
- estimand、欠測、サブグループ、Bayesian、prediction、AI、transportability

## T10 — 日本のCPG事例

- `japanese-cpg-pitfalls`
- `legacy-japanese-cpg-pitfalls`
- `cpg-quality-examples`

---

# 6. RESOURCES

章とは別の常設ユーティリティにします。

- `learning-index`
- `glossary-qa`
- `references`
- `y-sensei-ebm-practice-links.html`
- GRADE 探検
- 既存CPGチェックGPT
- 動画・スライド
- 更新履歴

---

# 7. ナビゲーションの原則

## 主配置は1つ、関連表示は複数可

同じページをサイドバーの複数箇所に無制限に重複表示すると、現在地が分からなくなります。

各コンテンツは：

- `primaryPlacement`：1つ
- `relatedPlacements`：複数可
- `mapStage`：該当時のみ
- `topicGroups`：複数可

を持たせます。

## 旧番号は互換情報に下げる

旧Chapter番号、旧`data-idx`、旧`page-N`は削除しません。ただし、新サイドバーでは主役にしません。

## 章を物理的に移し過ぎない

最初の改訂は「内容を別ファイルへ移すこと」ではなく、

- 新しい分類
- ハブ追加
- サイドバー再生成
- 相互リンク
- 画像の配置変更

を中心にします。これが最も安全です。
