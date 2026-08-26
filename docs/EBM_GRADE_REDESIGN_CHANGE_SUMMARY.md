# EBM→GRADE学習マップ再設計 変更要約

## 新しい章立て

既存25章と独立HTMLを本文の正本として残し、その上に5つの入口を追加した。

1. START: 最初に全体像を見る。
2. EBM BASIC: EBM、批判的吟味、SRをGRADEの前提として学ぶ。
3. EBM → GRADE MAIN MAP: PICO、重要アウトカム、SR、確実性、SoF、EtD、推奨、Apply/Assessを図の順に学ぶ。
4. TOPICS: 非RCT、定性研究、メタ分析、がんアウトカム、CPG信頼性、Guyatt方法論、統計、日本のCPG事例を別枠で扱う。
5. RESOURCES: 索引、用語集、参考文献、演習、リンク集。

## 実装

- `images/ebm-grade-map.png` をHomeのタイトル直後に配置。
- 百分率座標による14個のHTMLリンクを画像上へ重ねた。
- 同じ14項目のテキストリンクを画像直下に設置。
- 360/390pxでは小さい上段6領域を隠し、主要8領域と全テキストリンクを維持。
- 読むための拡大モーダルを追加。
- 15個の案内ハブを追加。既存本文は分割・削除していない。
- サイドバーを5区分へ再編し、画面上の番号を `ST`、`E`、`M`、`S`、`T`、`R` の学習体系へ統一。
- 各ページへ現在地、前へ、全体図へ、次への案内を追加。
- 学習索引へZone、Map stage、Topic groupを追加。
- `data/content-registry.json` を56項目へ拡張し、全項目へ主配置・関連配置・段階・トピック群・学習番号を設定。
- Core GRADEの既存説明をT1ハブへ移動し、GRADE Working Group、G3、GRADE Book、Core GRADE、個人講演の関係を整理。
- Ch15へGPS、単一推定値なし、net benefitの安定アンカーを追加。

## 旧導線の保存

- 旧 `#page-N` と `data-idx` は維持。
- 新しい既存章リンクの実URLは旧 `#page-N` を使い、JavaScript無効時も従来URLへ到達できる。
- 既存ページ名、外部URL、内部アンカー、図表、動画、演習は削除していない。

## 移植用パッケージ

`docs/codex-work-packages/CPGSR_EBM_GRADE_REDESIGN_PACK/` に次を収録した。

- 汎用Codex Workプロンプト
- 新情報設計
- 移行対応表
- クリック領域仕様とJSON
- 内容保存QAチェックリスト
- Core GRADE一次資料メモ
- クリック試作HTML
- 元画像と領域プレビュー
- 別HTMLアプリ向けファイル一覧
