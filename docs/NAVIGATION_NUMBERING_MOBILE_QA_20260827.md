# ナビゲーション・番号・モバイル再監査

- 実施日: 2026-08-27
- 対象: CPGSR Readerの全登録コンテンツ、ルートHTML、サイドメニュー
- 目的: ページ漏れの再確認、旧番号表示の廃止、スマートフォンでの可読性確認

## ページ網羅性

- content registry: 56項目
- navigation structure: 56項目
- index sidebar: 56ユニーク項目
- ルートHTML: 9ファイル、未登録0、登録先ファイル欠損0
- 図上hotspot: 14件、欠損target 0
- これまでHTMLとリンクだけ存在していた `y-sensei-ebm-practice-links.html` を正式な登録項目 `R4` として追加

`tools/verify-navigation-coverage.mjs` は今後、登録漏れ、メニュー漏れ、未登録HTML、欠損HTML、番号重複、旧番号表示をエラーとして検出する。

## 新しい学習番号

- `ST`: 最初に読む入口
- `E`: EBMの基本
- `M`: EBMからGRADEへの主要な流れ
- `S`: SoF、効果の大きさ、閾値
- `T`: 詳細トピックス
- `R`: 索引、用語集、文献、演習資料

枝項目は `M3a`、`T2b`、`T10a` のように親項目との関係が分かる番号とした。旧版の表示番号とURL互換情報は内部データに残すが、学習メニューには表示しない。

## モバイル確認項目

- 360、390、768、1440pxで横方向のはみ出しがないこと
- サイドバーが画面幅を超えないこと
- 長い番号が番号枠内に収まること
- メニュー項目の高さが44px以上であること
- 長い日本語・英語ラベルが欠けずに折り返すこと
- メニューから本編、独立HTML、アンカー付き詳細項目へ移動できること
- ブラウザ履歴、図のリンク、コンソールに回帰がないこと

## 再実行

```powershell
node tools/verify-navigation-coverage.mjs
node tools/verify-link-preservation.mjs
node tools/verify-page-content.mjs
node tools/verify-content-preservation.mjs
node tools/verify-cpgsr.mjs
```

## 実ブラウザ結果

- 9ページを360px・390pxで確認し、全18表示で横方向のはみ出し0、コンソールエラー0。
- `index.html` は768px・1440pxでも横方向のはみ出し0、コンソールエラー0。
- 360/390/768/1440pxで、番号切れ0、44px未満のメニュー項目0、ラベル切れ0。
- サイドメニューの56登録項目を全幅で確認。`M3d`、`T10a`の遷移とブラウザ履歴の復帰を確認。
- 360pxの本体表示をスクリーンショットとして取得。
