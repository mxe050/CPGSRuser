# Codex Work 実装依頼：CPGSR Readerを「EBMからGRADEへ」の学習マップ中心に再構成する

## 役割

あなたは、既存の大規模な静的HTML教材を、本文・図・表・動画・リンク・旧URLを一切失わずに再構成する、上級フロントエンドエンジニア兼情報設計者です。

対象は以下です。

- Repository: `mxe050/CPGSRuser`
- Public site: `https://mxe050.github.io/CPGSRuser/`
- Main file: `index.html`
- Current routing: `script.js`
- Canonical content registry: `data/content-registry.json`
- Chapter registry: `data/chapters.json`
- Existing preservation tools:
  - `tools/generate-baseline.mjs`
  - `tools/verify-content-preservation.mjs`
  - `tools/verify-cpgsr.mjs`

この作業は「新しい短いサイトを作る」仕事ではありません。**現在ある教材を完全保存し、入口、章立て、分類、相互リンクを作り直す仕事**です。

---

# 1. 最重要目標

新しい画像 `ebm-grade-map.png` をサイトの最初の主要図にし、以下の学習思想をサイト全体の主軸にしてください。

> EBMの臨床疑問、批判的吟味、システマティックレビュー、意思決定という文脈の延長線上に、GRADEの確実性評価、SoF、EtD、推奨の方向と強さがある。

図に入らない方法論は、無理に図の工程へ押し込まず、**TOPICS**として独立させます。

EBMの基本は、GRADE工程の一部として埋没させず、**EBM BASIC**という別枠にします。

---

# 2. 絶対禁止事項

次は一つでも行ったら失敗です。

1. 既存本文を要約へ置き換える。
2. 重複して見えるという理由で段落を削る。
3. 既存の図、表、動画、iframe、details、計算機、演習を削る。
4. 外部リンクを減らす。
5. `contentId`を削る。
6. `page-N`の旧URL互換を壊す。
7. 旧`data-idx`互換を壊す。
8. standalone HTMLを削除する。
9. `data/content-registry.json`のitemを未分類のまま消す。
10. `images/core-grade-overview.png`を削除する。
11. 先にbaselineを再生成して、削除を見えなくする。
12. 大規模な`index.html`を一から書き直す。
13. 本文を別ファイルへ移した後、旧ページを空にする。
14. 「Core GRADE」と「GRADE Working Group」「GRADE Book」「Guyatt個人の講演」を同一視する。
15. GuyattとSchünemannを対立する流派として描く。

**削減ではなく再分類です。**

---

# 3. 作業開始前に読むファイル

コード変更前に、最低限次をすべて読んでください。

1. `README.md`
2. `CONTEXT.md`
3. `index.html`
4. `script.js`
5. `style.css`
6. `style-cpgsr.css`
7. `data/content-registry.json`
8. `data/chapters.json`
9. `learning-index.html`
10. `learning-index.js`
11. `advanced-statistics.html`
12. `non-rct-observational-studies.html`
13. `oncology-outcomes.html`
14. `meta-analysis-methods.html`
15. `guyatt-methodology-atlas.html`
16. `japan-cpg-tohoho.html`
17. `y-sensei-ebm-practice-links.html`
18. `tools/generate-baseline.mjs`
19. `tools/verify-content-preservation.mjs`
20. `tools/verify-cpgsr.mjs`

現在の`script.js`は、`contentId`、旧`page-N`、旧`data-idx`を解決し、`window.showContent(contentId)`を公開しています。この仕組みを捨てず、新しいナビゲーションと画像ホットスポットに使ってください。

---

# 4. 添付資料

この依頼と同じフォルダに以下があります。

- `ebm-grade-map.png`
- `core-grade-overview-source.png`
- `map-hotspots.json`
- `clickable-map-prototype.html`
- `ebm-grade-map-hotspots-preview.png`
- `02_NEW_INFORMATION_ARCHITECTURE.md`
- `03_CONTENT_MIGRATION_MATRIX.md`
- `04_CLICKABLE_MAP_SPEC.md`
- `05_PRESERVATION_QA_CHECKLIST.md`

これらを読んでから実装してください。

実リポジトリでは：

- `ebm-grade-map.png` → `images/ebm-grade-map.png` として追加
- 旧図は既存の `images/core-grade-overview.png` を再利用

とします。

---

# 5. 新しい最上位構造

サイドバーとホームの入口を、次の5分類へ変更してください。

## START

- EBMからGRADEへ：全体マップ
- 初学者向け徹底解説
- 学習索引

## EBM BASIC

- EBMとは
- 批判的吟味
- 原著・SR・CPGを読む3つの問い
- EBMの5ステップ
- 実践・復習

## EBM → GRADE MAIN MAP

- MAP 1 Clinical Question（PICO）
- MAP 2 重要アウトカム
- BRIDGE 批判的吟味からSR・メタ分析へ
- MAP 3 エビデンスの確実性
- SoF 効果の大きさと確実性をまとめる
- MAP 4 Evidence to Decision
- MAP 5 推奨の方向と強さ
- MAP 6 EBM 5A × Core GRADE / Apply・Assess

## TOPICS

- Core GRADEとは
- 非RCT・観察研究・因果推論
- 定性研究・CERQual
- メタ分析・NMA
- がんアウトカム・生存時間
- CPG・SRの信頼性
- 単一推定値なし・特殊な統合・net benefit
- Guyatt方法論
- 統計学・新しい方法
- 日本のCPG事例

## RESOURCES

- 学習索引
- 用語集・Q&A
- 参考文献
- Y先生のEBM実践リンク集
- GRADE 探検
- 既存CPGチェックGPT
- 動画・スライド
- 更新履歴

---

# 6. 最初のページを作り直す

現在の`home`ページを削除せず、内部構造を次の順へ変更してください。

1. 既存サイトタイトル
2. 1〜2文の短い説明
3. **EBMからGRADEへ図**
4. 図の操作説明
5. 図と同等のテキストリンク
6. 初学者向け入口
7. 既存の実践訓練ブロック
8. Y先生リンク集
9. 既存の「このサイトで学べること」
10. その他の既存案内

長いpitchより先に図を置いて構いません。少なくとも、図は「最初の主要な学習コンテンツ」でなければなりません。

現在のトップには次のブロックがあります。

- 「この図が理解できるようになるまで、繰り返し勉強しましょう。」
- `images/core-grade-overview.png`
- 拡大モーダル

このブロックはトップから外します。ただし、削除してはいけません。新しい`topic-core-grade`へ移動します。

トップの新しい図には次を表示します。

```html
<img
  src="images/ebm-grade-map.png"
  width="941"
  height="1672"
  alt="EBMからGRADEへ進む学習の全体像。批判的吟味、システマティックレビュー、PICO、重要アウトカム、確実性評価、SoF、EtD、推奨、EBMの5ステップとの対応を示す。下に同じ項目のリンク一覧があります。"
>
```

画像だけでナビゲーションを完結させず、必ず同じ内容のHTMLリンク一覧を直下に置いてください。

---

# 7. クリック可能マップ

実装してください。無理ではありません。

## 方式

`<map><area>`は使わず、画像の上に百分率座標のHTMLリンクを重ねてください。

正本は`map-hotspots.json`です。

ラッパー：

```css
.ebm-grade-map-shell {
  position: relative;
  width: min(100%, 941px);
  margin-inline: auto;
}
.ebm-grade-map-shell > img {
  display: block;
  width: 100%;
  height: auto;
}
.ebm-grade-hotspot {
  position: absolute;
  left: var(--left);
  top: var(--top);
  width: var(--width);
  height: var(--height);
}
```

## ルーティング

SPA内：

```js
window.showContent(targetContentId)
```

別HTML：

```html
<a href="meta-analysis-methods.html">
```

JSが動かない場合のために、各ホットスポットには実際の`href`も設定してください。

## 必須領域

`map-hotspots.json`の14領域を初期値として実装します。

主領域：

- PICO
- 重要アウトカム
- 確実性
- SoF
- EtD
- 推奨
- 4推奨パターン
- EBM 5A × Core GRADE

副領域：

- EBM以前
- 批判的吟味
- SR／MA
- EBM意思決定
- GRADE
- Core GRADE

## PC

hoverとfocusで：

- 枠
- 半透明背景
- ラベル
- 明瞭なfocus ring

を表示してください。

## スマホ

上段の小さい副領域は画像上から非表示でも構いません。主領域は残します。

ただし、画像直下のテキストリンク一覧には14項目をすべて残してください。

画像は拡大モーダルで読めるようにします。現在の`openCPGOverview()`相当の仕組みを一般化し、`openLearningMap()`として再利用して構いません。

モーダルは読むための拡大です。モーダル内に複雑なクリック領域を再実装しないでください。

---

# 8. 新規ハブ

既存本文を分割・要約しないため、薄いハブを追加します。

追加候補：

- `ebm-basics-hub`
- `ebm-critical-appraisal`
- `map-clinical-question`
- `map-important-outcomes`
- `map-evidence-synthesis`
- `map-certainty`
- `map-sof`
- `map-etd`
- `map-recommendation`
- `map-recommendation-patterns`
- `map-ebm-crosswalk`
- `map-apply-assess`
- `topics-index`
- `topic-core-grade`
- `resources-index`

各ハブは：

1. この段階で答える問い
2. 60秒要約
3. 既存の詳しいページへのカード
4. 図のどの場所か
5. 前後の段階
6. 関連TOPICS

だけを持ちます。

既存ページ本文をコピーして巨大な重複を作らないでください。既存ページが本体、ハブは入口です。

---

# 9. MAPごとの配置

## MAP 1 PICO

`map-clinical-question`

リンク先：

- `ebm-cpg-sr-basics`
- `grade-overview`
- `beginner-primer`
- `advanced-estimand`
- `nonrct-target-trial`

## MAP 2 重要アウトカム

`map-important-outcomes`

リンク先：

- `grade-overview`
- `summary-of-findings`
- `oncology-outcomes`
- `qualitative-cerqual`
- `values-shared-decision`

## BRIDGE

`map-evidence-synthesis`

リンク先：

- `jama-sr-ma`
- `sr-reporting-and-appraisal`
- `meta-analysis-methods`
- `jama-network-meta-analysis`
- `learning-index`

## MAP 3 確実性

`map-certainty`

子項目：

- `certainty-levels`
- `risk-of-bias`
- `inconsistency`
- `indirectness`
- `imprecision`
- `dissemination-bias`

関連：

- `nrsi-systematic-review`
- `nonrct-observational`
- `meta-analysis-methods`
- `thresholds-mid`

## SoF

`map-sof`

子項目：

- `effect-measures-absolute`
- `thresholds-mid`
- `summary-of-findings`

## MAP 4 EtD

`map-etd`

子項目：

- 利益と害
- certainty
- values/preferences
- resources
- feasibility
- acceptability
- equity

リンク先：

- `recommendation-strength`
- `values-shared-decision`
- `clinical-applicability`
- `qualitative-cerqual`
- `alternative-recommendations`

## MAP 5 推奨

`map-recommendation`

リンク先：

- `recommendation-strength`
- `alternative-recommendations#gps`
- `guyatt-methodology-atlas`

## MAP 6 EBM 5A × Core GRADE

`map-ebm-crosswalk`または`map-apply-assess`

リンク先：

- `clinical-applicability`
- `values-shared-decision`
- `trustworthy-cpg`
- `cpg-quality-examples`
- `ebm-cpg-sr-basics`

---

# 10. 「Core GRADEとは」トピック

新しい`topic-core-grade`を作成してください。

ここへ現在トップにある次を移動します。

- 「この図が理解できるようになるまで、繰り返し勉強しましょう。」
- `images/core-grade-overview.png`
- サムネイル
- 拡大モーダル
- hint
- alt
- 現在の関連説明

ただし、見出しは次のようにしてください。

> Core GRADEとは：GRADE Working Group、GRADE Book、Schünemann、Guyattの関係

## このトピックで必ず説明すること

### 1. GRADE Working Group

GRADEは個人所有の方法ではなく、2000年に始まった国際的なWorking Groupが共同で開発する方法体系です。

### 2. G3

GRADE Guidance GroupはWorking Groupの運営・方向・accountabilityを支えるgroupです。

### 3. GRADE Book

GRADE BookはGRADE Working Groupの公式publicationで、living resourceです。章は編集・レビュー・G3の承認過程を経て、既存guidanceの変更はWorking Group全体の承認を要する、という位置づけを説明してください。

### 4. Core GRADE

2025年のBMJ 7論文シリーズは、比較介入のエビデンス要約と個人患者の推奨作成に必要なGRADEの中核判断を簡潔に示すシリーズです。

### 5. Gordon Guyatt

- EBMの主要な先駆者
- GRADEの主要な方法論的貢献者
- Core GRADE 2025シリーズの中心著者
- 講演・論文は重要
- ただし、個人発言が自動的にWorking Groupの現行公式guidanceになるわけではない

### 6. Holger Schünemann

- GRADE方法論・運営・教育の主要な貢献者
- GRADE Book共同編集者
- G3の構成員として公式開発過程に関与
- GRADE Book、歴史、開発方法などの現行整理に深く関与

### 7. 関係

Guyatt対Schünemannという対立ではありません。

次のように図示してください。

```text
EBMの歴史・Users' Guides
        ↓
Guyattを含む多数の方法論家
        ↓
GRADE Working Group（共同開発・公式承認）
        ├─ GRADE Guidance Group（G3）
        ├─ GRADE Book（公式living resource）
        ├─ GRADE Guidelines / guidance papers
        └─ Core GRADE 2025（中核を簡潔に示すシリーズ）
```

## 資料状態ラベル

- CURRENT OFFICIAL GUIDANCE
- OFFICIAL LIVING RESOURCE
- PEER-REVIEWED METHODS
- HISTORICAL FOUNDATION
- EDUCATIONAL LECTURE
- SITE EDUCATIONAL FIGURE

を使い分けてください。

`core-grade-overview.png`は「サイト教育用整理図」と明示してください。公式GRADE Book掲載図であると確認できない限り、公式図とは表示しません。

## 公式・一次資料

ページに以下をリンクしてください。

- GRADE Working Group official site
- GRADE Book: About / How to use
- GRADE Book: The development methods of GRADE
- GRADE Book: The history and evolution of GRADE
- BMJ Core GRADE 1
- BMJ Core GRADE 7

リンクの表示には最終確認日を付けてください。

---

# 11. Ch15を無理に一章として扱わない

`alternative-recommendations`には異質な内容があります。

- 単一推定値がない場合
- Good Practice Statement
- net benefit

本文と旧URLは残します。

ページ内に最低3つの安定アンカーを付けてください。

例：

- `alternative-no-single-estimate`
- `alternative-gps`
- `alternative-net-benefit`

新ナビゲーションでは：

- GPS → MAP 5
- 単一推定値なし → T7
- net benefit → T7 / MAP 4

から開けるようにしてください。

旧`alternative-recommendations` routeは、全内容を持つ既存ページとして残します。

---

# 12. データ構造

`data/content-registry.json`を正本として使います。

各itemに次のフィールドを追加する案を採用してください。

```json
{
  "primaryPlacement": "main-map.certainty",
  "relatedPlacements": [
    "topics.meta-analysis"
  ],
  "mapStage": "certainty",
  "topicGroups": [
    "grade",
    "imprecision"
  ],
  "navLabel": "不精確さ",
  "legacyDisplayNumber": "11"
}
```

別ファイル`data/navigation-structure.json`を作っても構いませんが、同じ情報を二重管理しないでください。

推奨：

- `content-registry.json`：各コンテンツの属性
- `navigation-structure.json`：グループの表示順
- `map-hotspots.json`：画像座標とtarget

## 必須制約

- 全itemにprimary placement
- primaryは1つ
- relatedは複数可
- orphan 0
- missing target 0
- legacyTargets維持

サイドバーは可能ならJSONから生成してください。巨大なHTMLに分類を重複手書きしない方が安全です。

ただし、JS無効時の主要導線は`noscript`で残します。

---

# 13. 旧URL互換

現在の`script.js`の解決順を維持します。

- `contentId`
- legacy page id
- legacy index
- DOM index
- page内anchor

新しいコンテンツは`contentId`で開きます。

古い：

- `index.html#page-1`
- inline `showPage(1)`
- `data-idx`

は動き続けなければなりません。

旧routeを新routeへ強制置換してURLを失わないでください。

---

# 14. 保存検証

現在の保存検証だけでは、リンク削除や本文短縮を完全には検出できません。既存検証を残し、次を追加してください。

## `tools/verify-navigation-coverage.mjs`

検証：

- registry全itemにprimary placement
- primary重複なし
- nav target存在
- hotspot target存在
- relatedContentIds存在
- orphan 0
- unclassified 0

## `tools/verify-link-preservation.mjs`

変更前baselineに存在した以下の集合が、変更後にも存在すること：

- `href`
- `src`
- external URL
- internal anchor
- YouTube
- note
- DOI
- PubMed
- standalone HTML

追加・順番変更は許可、削除は失敗。

## `tools/verify-page-content.mjs`

- baseline ID維持
- baseline heading維持
- figure/table/video/details数以上
- interactive element ID維持
- 本文文字数が大幅減少していない
- 既存画像参照維持

baselineは変更前に生成し、変更後検証がPASSするまで更新しません。

---

# 15. 段階実装

## Phase A — 調査とbaseline

コード変更なし。

1. 全contentId一覧
2. 全page一覧
3. standalone HTML一覧
4. external links一覧
5. image/video/table/details数
6. current old route一覧
7. migration matrix

を作成してください。

## Phase B — 追加

- 新画像追加
- hotspots JSON追加
- 新ハブ追加
- Core GRADEトピック追加
- 新CSS追加
- 新JS追加

既存サイドバー・本文はまだ削らない。

## Phase C — トップ変更

- 新図をトップへ
- クリック領域
- 同等リンク一覧
- 旧Core GRADE図をT1へ移動

## Phase D — ナビゲーション切替

- 新5分類
- registry-driven
- accordion
- mobile対応
- current location

## Phase E — 細部整理

- Ch15アンカー
- 状態ラベル
- related cards
- index filter更新

## Phase F — 検証

- 既存検証
- 新検証
- browser確認
- old URL確認

一度に全面書換えしないでください。

---

# 16. UI要件

## サイドバー

最上位：

- START
- EBM BASIC
- MAIN MAP
- TOPICS
- RESOURCES

accordion可能。

MAIN MAPは図の順序を守ります。

MAP 3とTOPICSは深くなるため、2階層までを標準表示し、それより深い項目は章内目次へ送ります。

## 現在地

各ページ上部に：

- 所属
- MAP段階またはTOPIC
- 前へ
- 次へ
- 全体図へ戻る

を表示してください。

## 色

既存の紺・オレンジを維持します。

マップの意味に合わせて：

- EBM BASIC：青緑
- MAP 1〜3：青・緑
- SoF：水色
- EtD：紫
- Recommendation：赤・橙
- TOPICS：中立色

程度の区別は可。ただし色だけで分類しません。

## スマホ

- サイドバー開閉
- accordion開閉後、見出しが画面内に来る
- mapリンク一覧1列
- table横スクロール
- 44pxタップ領域
- 長いタイトル折返し
- fixed headerによるanchor隠れを防ぐ

---

# 17. 学習索引の更新

`learning-index.html`と`learning-index.js`は削除しません。

新しいフィルタを追加してください。

- Zone
  - EBM BASIC
  - MAIN MAP
  - TOPICS
  - RESOURCES
- Map stage
  - PICO
  - outcomes
  - synthesis
  - certainty
  - SoF
  - EtD
  - recommendation
  - apply/assess
- Topic group
  - T1〜T10

既存の文書種別、難易度、資料状態、Guyatt、読む作業のフィルタを維持してください。

---

# 18. 文言上の注意

- 「GRADE＝EBMと別物」にはしない。
- 「GRADEはEBMのすべて」にはしない。
- 「SRだけで推奨が決まる」と書かない。
- certaintyとrecommendation strengthを同一視しない。
- EtD criteriaを常に固定7項目と断定しない。Coreとoptionを区別する。
- Core GRADEはGRADE全体の「簡略版」だけと雑に書かない。中核判断に集中した実用的シリーズとして説明する。
- Core GRADEとGRADE Bookを同じ文書として扱わない。
- individual expert statementとofficial guidanceを分ける。
- `GRADEbook`、`GRADE Book`の表記を統一する。
- `Schünemann`、`Guyatt`の綴りを統一する。

---

# 19. 完了条件

以下がすべて満たされた時だけ完了です。

1. トップの最初の主要図が`ebm-grade-map.png`
2. 図の主領域をクリックできる
3. 画像直下に同等リンク一覧
4. EBM BASICが別枠
5. MAIN MAPが図に沿う
6. TOPICSが独立
7. Core GRADE旧図がT1へ移動
8. Core GRADEトピックがWorking Group、G3、GRADE Book、Schünemann、Guyattを区別
9. 現在の25章がすべて新構成から到達可能
10. 独立ページがすべて到達可能
11. 外部リンク削除0
12. 本文削除0
13. 画像削除0
14. 旧URL破損0
15. orphan contentId 0
16. 全検証PASS
17. PC・スマホ確認済み

---

# 20. 最終報告形式

最終回答では、次の順に報告してください。

## 実装概要

## 新しい章立て

## 変更ファイル

## 新規ファイル

## 移動した内容

## 削除していないことの証拠

- baseline page数
- current page数
- baseline link数
- current link数
- baseline image/media数
- current image/media数

## ホットスポット

- 実装数
- target一覧
- mobile fallback

## 旧URL

- 検証件数
- PASS / FAIL

## テスト

実行したコマンドと結果。

## 残課題

残課題を隠さず記載してください。

---

# 21. 参照する公式資料

方法論説明を新規作成する時は、少なくとも次を確認してください。

- GRADE Working Group official website
- GRADE Book: How to Use / About
- GRADE Book: The development methods of GRADE
- GRADE Book: The history and evolution of GRADE
- Core GRADE 1: overview of the Core GRADE approach, BMJ 2025
- Core GRADE 7: principles for moving from evidence to recommendations and decisions, BMJ 2025

既存の照合済み文献台帳`data/references.json`を優先し、新しい正式引用は検証後に追加してください。

---

以上を満たす形で、まず調査・baseline・移行計画を提示し、その後に段階的に実装してください。いきなり巨大な`index.html`を書き換えないでください。
