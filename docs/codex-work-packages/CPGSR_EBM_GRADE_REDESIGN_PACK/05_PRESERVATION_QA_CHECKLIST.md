# 保存・移行QAチェックリスト

## 0. 絶対条件

- [ ] 既存本文を短縮・要約・削除していない
- [ ] 既存の図、表、動画、iframe、details、計算機を削除していない
- [ ] 既存外部リンクを削除していない
- [ ] 旧`contentId`を削除していない
- [ ] 旧`page-N` URLを壊していない
- [ ] 旧`data-idx`を壊していない
- [ ] 既存の内部アンカーを削除していない
- [ ] 新しい章立てから全コンテンツへ到達できる
- [ ] `core-grade-overview.png`はトップから移動しただけで、削除していない
- [ ] `ebm-grade-map.png`が最初の主要学習図になっている

---

# 1. 作業前

- [ ] `main`の最新commitを確認
- [ ] 変更用branchを作成
- [ ] `README.md`を読む
- [ ] `CONTEXT.md`を読む
- [ ] `data/content-registry.json`を読む
- [ ] `data/chapters.json`を読む
- [ ] `script.js`の`showContent`と旧route互換を確認
- [ ] `tools/generate-baseline.mjs`を実行
- [ ] `tools/verify-content-preservation.mjs`を実行
- [ ] `tools/verify-cpgsr.mjs`を実行
- [ ] 実行結果を保存

---

# 2. 移行の順番

## Phase 1 — 追加のみ

- [ ] `images/ebm-grade-map.png`を追加
- [ ] 新ハブの`contentId`を追加
- [ ] `topic-core-grade`を追加
- [ ] `map-hotspots.json`を追加
- [ ] トップへ新マップを追加
- [ ] 既存サイドバーはまだ削除しない
- [ ] 既存本文は触らない

## Phase 2 — 新ナビゲーション

- [ ] `primaryPlacement`を全itemへ付与
- [ ] 新サイドバーを生成
- [ ] START / EBM BASIC / MAIN MAP / TOPICS / RESOURCESを表示
- [ ] 旧番号は互換メタデータとして保持
- [ ] すべてのitemが新ナビに現れることを確認

## Phase 3 — 画像移動

- [ ] トップの`core-grade-overview`表示ブロックを`topic-core-grade`へ移動
- [ ] 同じ`src`を維持
- [ ] 拡大モーダルを維持
- [ ] 現在の説明・alt・hintを維持
- [ ] トップからは旧図だけが外れ、新図が残る

## Phase 4 — 不整合の整理

- [ ] Ch15に3つの内部アンカーを追加
- [ ] Guyatt講演に`lecture`表示
- [ ] 公式、査読済み、歴史的、講演、教育用の状態ラベルを維持
- [ ] `Core GRADEとは`で個人見解と公式guidanceを区別

## Phase 5 — 旧ナビゲーション整理

- [ ] 新構成が機能した後でのみ旧サイドバー表示を置換
- [ ] 旧DOMページは削除しない
- [ ] 旧routeは検証する
- [ ] 旧番号を必要に応じて「旧Ch」表示にとどめる

---

# 3. 自動検証の追加

## verify-navigation-coverage.mjs

次を検証する新スクリプトを追加してください。

- [ ] registryの全itemに`primaryPlacement`がある
- [ ] `primaryPlacement`は1つだけ
- [ ] `relatedPlacements`のIDが存在
- [ ] 全ホットスポットtargetが存在
- [ ] 全サイドバーitemのtargetが存在
- [ ] 未分類itemが0
- [ ] orphan pageが0
- [ ] duplicate primary placementが0

## verify-link-preservation.mjs

作業前baselineのリンク集合が、作業後集合の部分集合であることを検証します。

- [ ] 外部`href`
- [ ] 内部`href`
- [ ] `src`
- [ ] YouTube
- [ ] note
- [ ] DOI/PubMed
- [ ] 姉妹サイト
- [ ] standalone HTML

順番変更や追加は許可しますが、削除は失敗にします。

## verify-page-content.mjs

ページ単位で最低限を検証します。

- [ ] baselineのIDがすべて存在
- [ ] baselineの見出し文字列がすべて存在
- [ ] baselineの図・表・動画・details数以上
- [ ] baselineの本文文字数を大幅に下回らない
- [ ] 既存interactive elementのIDが存在

本文文字数だけで完全保存は保証できないため、見出し・リンク・資産・IDを併用します。

---

# 4. クリックマップQA

- [ ] 941×1672の画像比率を維持
- [ ] 14領域が設定済み
- [ ] targetContentIdが存在
- [ ] desktopでhover表示
- [ ] keyboard focusで表示
- [ ] Enterで遷移
- [ ] 360pxで主領域が押せる
- [ ] 小領域はモバイルのリンク一覧で代替
- [ ] 画像直下に同等リンク一覧
- [ ] JS無効時も通常hrefで遷移
- [ ] 拡大モーダルが動作
- [ ] `prefers-reduced-motion`対応

---

# 5. Core GRADEトピックQA

- [ ] `core-grade-overview.png`が表示
- [ ] 「教育用整理図」等の位置づけを表示
- [ ] GRADE Working Groupを母体として説明
- [ ] G3の役割を説明
- [ ] GRADE Bookの公式性とliving更新を説明
- [ ] Core GRADE 2025シリーズを説明
- [ ] Guyattの役割を説明
- [ ] Schünemannの役割を説明
- [ ] 両者を対立流派として描いていない
- [ ] 個人講演と公式guidanceを区別
- [ ] 最終確認日を表示
- [ ] 公式一次資料リンクを付与

---

# 6. 画面確認

## PC

- [ ] 1440px
- [ ] 1280px
- [ ] サイドバー開閉
- [ ] map hover/focus
- [ ] 長いページの現在地表示

## タブレット

- [ ] 768px
- [ ] mapの主要領域
- [ ] accordion
- [ ] table overflow

## スマホ

- [ ] 360px
- [ ] 390px
- [ ] 画像が横にはみ出さない
- [ ] 小さな副hotspotを無理に表示しない
- [ ] リンク一覧が1列
- [ ] 44pxタップ領域
- [ ] モーダルのpan/zoom
- [ ] 開いた章の先頭へ正しく移動

---

# 7. 最終コマンド

```bash
node tools/generate-baseline.mjs
node tools/verify-content-preservation.mjs
node tools/verify-cpgsr.mjs
node tools/verify-navigation-coverage.mjs
node tools/verify-link-preservation.mjs
node --check script.js
node --check learning-index.js
node --check js/references.js
```

baseline再生成は、保存検証に合格した後にだけ行ってください。変更前baselineを先に上書きしてはいけません。

---

# 8. Codexの最終報告

最終回答に必ず含めます。

- 変更ファイル一覧
- 新しい章立て
- 旧ページ数と新ナビゲーション網羅数
- 削除した本文・リンク・画像が0であること
- 移動した画像
- 追加したホットスポット数
- 旧URL検証件数
- 実行した検証コマンド
- PASS / FAIL
- 残課題
