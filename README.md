# CPGSR Reader

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-live-success)](https://mxe050.github.io/CPGSRuser/)
[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

診療ガイドラインとシステマティックレビューを、作る側ではなく読む側の臨床家のために学ぶ静的サイトです。GRADEを土台に、論文・SR・CPGを患者の意思決定へつなげるときの確認順序を示します。

公開URL: https://mxe050.github.io/CPGSRuser/

## この改訂の考え方

既存本文、図、表、動画、演習、外部リンク、旧ハッシュURLは保存します。改訂では、内容を短くする代わりに、安定したコンテンツID、索引、相互リンク、照合済み文献、詳細学習ページを追加します。

- 本編は、臨床家が最初に確認する入口です。
- 独立した詳細ページは、因果仮定、数理、設計、例外、原著・現行方法論へ進む場所です。
- 索引は、読む作業順とトピックの両方向から既存教材へ入るナビゲーション層です。
- data/content-registry.json がコンテンツの正本です。表示番号、旧data-idx、旧page-N、安定contentId、hrefを分けて保持します。

## 本編25章

### Part I - EBM・GRADEの全体像
- Ch1 EBMと診療ガイドライン・SRの読み方
- Ch2 GRADEアプローチの概要

### Part II - 推奨の理解
- Ch3 エビデンスの確実性4段階の意味
- Ch4 強い推奨と条件付き推奨、GPS、推奨表現

### Part III - SoF・効果・閾値
- Ch5 SoF表・Evidence Profileの読み方
- Ch6 相対効果と絶対効果
- Ch7 閾値とMID

### Part IV - 確実性が下がる5要因
- Ch8 Risk of Bias
- Ch9 不一致性
- Ch10 非直接性
- Ch11 不精確さ
- Ch12 Dissemination bias

### Part V - 多様な研究デザインのSR
- Ch13 非RCT・観察研究のSR
- Ch14 定性的研究のSRとGRADE-CERQual
- Ch15 単一推定値なし、GPS、ネットベネフィット

### Part VI - CPG信頼性評価
- Ch16 信頼できるCPGの6つの質問
- Ch17 CPG品質の実例
- Ch18 AMSTAR 2、PRISMA 2020、ROBIS

### Part VII - 診療現場で活かす
- Ch19 推奨を目の前の患者にどう適用するか
- Ch20 共同意思決定と価値観・選好

### Part VIII - JAMA Users Guidesの横断要約
- Ch21 SR／MAの方法を監査する：JAMA Users Guidesの質問
- Ch22 ネットワークメタアナリシス

### Part IX - 付録
- Ch23 用語集とQ&A
- Ch24 最新情報とGuyatt講演
- Ch25 参考文献一覧

## 索引と詳細学習

- learning-index.html: 12段階の読む作業順、17のトピック、検索・絞り込み。
- advanced-statistics.html: estimand、CI、因果推論、設計、統合、GRADEを読む。
- non-rct-observational-studies.html: 非RCTを因果効果として読めるかを確認する。
- oncology-outcomes.html: 生存、PRO、サロゲート、有害事象を患者重要性から読む。
- meta-analysis-methods.html: 19モジュールでメタ分析の数理・仮定・GRADEを読む。
- guyatt-methodology-atlas.html: Guyatt関連の原著と現行方法論を、読む問い別にたどる。
- japan-cpg-tohoho.html: 本邦CPGを読むための教育用事例集。

## 文献の扱い

data/references.json では、本文のクリック可能な正式引用を verificationStatus=verified に限定します。PRISMAは報告ガイドライン、AMSTAR 2は批判的吟味ツール、ROBISはSRのRisk of Bias評価と区別します。未照合の旧メモは保存しますが、正式文献として表示しません。

主な更新: GRADE Guidance 42の誌名・年・巻頁、DevjiらのMID論文、GPS論文、RoB 2、ROBINS-I、ROBINS-E、ROBIS、MacLeanらの患者価値観SR、2026年の価値に基づく閾値論文を照合しました。

## ファイル構成

- index.html: 本体の読み手向けアプリ
- script.js: 旧page-N互換を保つ安定IDルーティング
- data/content-registry.json: 検索・導線の正本
- data/chapters.json: 本編25章、特別ページ、詳細ページの同期台帳
- data/references.json: 照合状態を含む文献台帳
- learning-index.html: 二本立て索引
- meta-analysis-methods.html: メタ分析発展章
- guyatt-methodology-atlas.html: 方法論アトラス
- docs/: 基準時点台帳、ナビゲーション監査、出典照合、QA、内容保存報告

## 検証方針

検証では、重複ID、内部リンク、参照資産、旧ハッシュURL、コンテンツ台帳、引用キー、未照合文献の表示、見出し、アクセシビリティ、検索URL状態、本文保存を確認します。詳細は docs 配下の監査・QA文書を参照してください。

## ローカル検査

変更後は次を実行します。

    node tools/verify-content-preservation.mjs
    node tools/verify-cpgsr.mjs
    node --check learning-index.js
    node --check script.js
    node --check js/references.js

## 更新履歴

- 2026-08-22: 安定コンテンツ台帳、旧URL互換、学習索引、Guyatt方法論アトラス、メタ分析発展章、引用照合、本文保存検証を追加。
- 2026-08: 統計・非RCT・がんアウトカムの詳細ページを役割別に再編し、相互リンクを強化。
- 2026-04: 初回公開。

## ライセンス

本サイトの構造とテキストは Creative Commons BY-NC-SA 4.0 で提供します。参考文献の元論文は各出版社の著作権に従い、外部リンクで参照します。

## 謝辞

Gordon H. Guyatt先生らのEBM・GRADE方法論への貢献に感謝します。本サイトは、作成者向け姉妹サイト core-grade-guide-1 の読者版として、臨床現場でCPGとSRを読む医療者を支援します。
