# CPGSRuser 保守コンテキスト

最終整理：2026-09-19。現在の使い方と検証手順はREADME.md、今回の根拠と結果はdocs/refresh-2026-09-19.mdを参照してください。

## サイト

- 医療者がCPG・SRを読むためのGRADE教材。本編25章、学習ハブ、独立ページ。
- 公開URL：https://mxe050.github.io/CPGSRuser/
- リポジトリ：https://github.com/mxe050/CPGSRuser
- ビルド不要。JSONをfetchするためローカルでもHTTP経由で開く。
- 10個のHTML、43個の本文画面、57項目のコンテンツ台帳。

## 実装

- index.htmlが本編。script.jsは安定contentIdと旧page-N・旧data-idxを対応付ける。番号に欠番があるため、DOM順や表示章番号で置き換えない。
- reader-ui.jsが文字サイズ・印刷・共有・章内目次・画像モーダルを担当。reader-refresh.cssは既存の図表レイアウトを保つ共通調整。
- ebm-grade-map.jsは5区分の目次・14領域の画像マップ・前後リンクを生成。独立HTMLへのリンクは通常のa要素。
- data/content-registry.jsonとnavigation-structure.jsonがナビゲーションの正本。新規教材はhrefだけでなく既存のworkflowStages・topicsに適切に登録する。
- AMSTAR 2と6質問は学習補助。独自の総合得点で信頼性を認定しない。MID表の数値は仮想例。
- 文献確認日は個別の確認範囲に対応させる。草案、抄録のみの確認、歴史的事例を区別する。

公開済みの2026-08-27の学習番号（ST・E・M・S・T・R）、Y先生リンク集のR4登録、navigation-mobile.cssによる可変幅の番号枠とスマートフォン調整を継承しています。新しい更新ページはR6です。

## 保存と検証

基準コミットは7b4b9107eedc88b3ef18eb55ec362158c0c0009b。docs/BASELINE_CONTENT_MANIFEST.jsonなどの保存台帳を単に作り直して検証を通さない。誤った見出し・リンクの訂正や未使用資産の削除はdocs/maintenance-changes-2026-09-19.jsonに個別記録する。

README記載の5種の静的検証、リンク監査、必要なブラウザーQAを実施する。403やLinkedInの999をリンク切れと断定しない。公開前の新規URLの404は公開後に確認する。

過去の調査・移植資料はdocs配下に履歴として残してある。古いQA記録は当時のファイル構成を指す。現在はcoreGRADE_utils.js、Tailwind CDN、Lucide CDNを使わない。
