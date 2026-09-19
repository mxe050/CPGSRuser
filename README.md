# CPGSR Reader

診療ガイドライン（CPG）とシステマティックレビュー（SR）を読む医療者のための教材です。GRADEを軸に、効果・確実性・推奨を区別して読み、患者との意思決定につなげます。

[公開サイト](https://mxe050.github.io/CPGSRuser/) · [2026年9月19日の更新](https://mxe050.github.io/CPGSRuser/updates.html) · [学習索引](https://mxe050.github.io/CPGSRuser/learning-index.html)

## 2026年9月19日の改訂

- GPSの2026年ガイダンス、PRISMA-C 2026、ROBINS-I V2草案、PRISMA拡張の現状を一次資料・公式資料で確認し、公開日と確認日を分けて追加。
- 目的別の入口、検索、章内目次、文字サイズ、章単位の印刷、前回の続きへの導線を整備。
- 旧URLを保ち、独立ページへの前後移動、セクションリンク、戻る操作、スマートフォンとキーボード操作を修正。
- 未回答のAMSTAR 2を判定保留に変更。CPGの6質問の独自得点判定を廃止。MIDの数値は仮想例として再構成。
- 不要なCDN依存、未使用の計算・タブ処理、重複する画像モーダル処理を削除。

詳細は [改訂・検証記録](docs/refresh-2026-09-19.md) を参照してください。文献全体を網羅的に再検索した更新ではありません。既存資料の確認日を一律に更新していません。

## 読み始める場所

| 目的 | ページ |
| --- | --- |
| 全体を把握する | [学習マップ](index.html) |
| 用語やテーマを探す | [学習索引](learning-index.html) |
| 今回の情報更新を見る | [最新情報](updates.html) |
| 統計とGRADEを深める | [統計の詳細](advanced-statistics.html) |
| 非RCTの因果効果を読む | [観察研究](non-rct-observational-studies.html) |
| がん領域のアウトカムを読む | [アウトカム](oncology-outcomes.html) |
| メタ分析の仮定を確認する | [メタ分析](meta-analysis-methods.html) |
| 原著・方法論に進む | [方法論アトラス](guyatt-methodology-atlas.html) |

本編25章、入門・案内ハブ、独立した詳細ページを、5区分の目次と14領域の学習マップで結んでいます。コンテンツ台帳は56項目です。

## ローカルで開く

ビルド不要のHTML・CSS・JavaScriptサイトです。JSONの読み込みを使うため、HTMLの直接起動ではなくHTTPサーバーで開きます。実行時にnpmパッケージは不要です。検証ツールにはNode.js 20以降を使います。

```sh
node tools/serve.mjs
```

ブラウザーで http://127.0.0.1:4173 を開きます。サーバーはループバックだけで待ち受けます。別ポートを使う場合は環境変数PORTを設定します。

## 検証

```sh
node tools/verify-navigation-coverage.mjs
node tools/verify-link-preservation.mjs
node tools/verify-page-content.mjs
node tools/verify-content-preservation.mjs
node tools/verify-cpgsr.mjs
node tools/audit-links.mjs
```

外部HTTPの確認は `node tools/audit-links.mjs --online` です。403・999・タイムアウトはアクセス制限などを含むため、リンク切れとは判定しません。新規ページの公開URLは、公開前には404になります。

ブラウザー検証にはPlaywrightが必要です。インストール済みのモジュールを `PLAYWRIGHT_MODULE` に、Edge使用時は `CPGSR_BROWSER_CHANNEL=msedge` を指定して、サーバー起動中に `node tools/browser-qa.mjs` を実行します。未指定なら通常のplaywrightモジュールとChromiumを使用します。サーバーURLは `CPGSR_BASE_URL`、記録先は `CPGSR_QA_OUTPUT` で変更できます。

## 保守するファイル

| ファイル | 役割 |
| --- | --- |
| index.html | 本編・入門・学習ハブ |
| script.js | 旧page-N互換のルーティングと目次 |
| reader-ui.js / reader-refresh.css | 共通の読書操作・画像拡大・表示調整 |
| ebm-grade-map.js | 学習マップ・台帳を使う移動案内 |
| data/content-registry.json | 索引・案内のコンテンツ台帳 |
| data/navigation-structure.json / map-hotspots.json | 目次構造・マップ領域 |
| data/references.json | 文献書誌・確認状態・確認日 |
| js/ | 評価ツール・用語・引用・閾値の表示 |
| tools/ | 静的検証・リンク点検・ブラウザーQA |
| docs/ | 改訂記録・保存基準・出典照合・QA |

既存の章・図・旧URLは保ちます。誤りの訂正や不要な依存の削除は `docs/maintenance-changes-2026-09-19.json` に具体的な対象と理由を記録し、基準台帳自体は書き換えません。公開前には差分と検証結果を確認します。

文献ポップアップは `verificationStatus=verified` の項目だけを正式引用として扱います。PRISMAは報告ガイドライン、AMSTAR 2は批判的吟味、ROBISはSRのバイアスリスク評価として区別します。旧資料・教育上の事例は、その時点と位置づけを明示します。

## ライセンス

本サイトの構造とテキストは [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) で提供します。外部論文・図などの権利は各権利者に帰属します。
