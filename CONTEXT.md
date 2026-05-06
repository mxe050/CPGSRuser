# CPGSRuser プロジェクト・コンテキスト

`/clear`後または他PCで続ける際は、このファイルを最初に読み込む。

---

## プロジェクト概要

- **何**: 診療ガイドライン／SR（CPG/SR）を**読む側**の医療者向け、GRADE準拠の独立解説アプリ（全24章）
- **対象**: すべての医療関係者
- **公開URL**: https://mxe050.github.io/CPGSRuser/
- **GitHub**: https://github.com/mxe050/CPGSRuser
- **作業ディレクトリ**: `CPGSRuser/`（PCにより `C:/Users/Hidemichi/Google ドライブ/...` または `F:/マイドライブ/...` の配下）

---

## 現在の状態 — v1.15（2026-05-06）

**JAMA UG Ch23 に森林図解説図を挿入**。
- Chapter 23 / 27（page-27 JAMA UG Ch23）の §1「効果の大きさ — どう表現されるか」直下、アウトカム指標表の上に、`images/forest.png` を `<figure>` として挿入
- ①〜⑪ の要素説明付きの森林図解説図
- タップで原寸表示（新タブ）— モバイルではブラウザ側のピンチで拡大可
- 再利用可能な `.jama-fig` `.jama-fig-link` `.jama-fig-img` `.jama-fig-hint` `figcaption` クラスとして実装（他の JAMA 章にも同パターンで挿入可能）
- キャッシュバスター `?v=7.0` → `?v=7.1`（全12箇所）

### v1.15の追加 CSS クラス
`.jama-fig` `.jama-fig-link` `.jama-fig-img` `.jama-fig-hint` `.jama-fig figcaption`

---

## 旧版履歴 — v1.14（2026-05-06）

**Primer ページの動画/スライドボタン群リニューアル**。
- Primer ページ（page-25）の冒頭にあった `.primer-video-hint`（解説編・会話編へのインラインリンク）を、視認性の高い 2 行ボタン群に置き換え
- 1行目：「📺 まず動画で学習してから以下を復習するとよいでしょう」＋ 赤▶「動画」ボタン → https://www.youtube.com/watch?v=7UJZLG49ba8&t=1s
- 2行目（点線下）：「📚 もう少し詳しい全体像を、まず勉強したい方へ →」＋
  - 赤▶「動画編」 → https://www.youtube.com/watch?v=pAr7upG01YA
  - ティール📱「スマホで読もう編」 → https://grad-eslide.vercel.app/slide/N3
- ボタンは min-height 44px でモバイルタップ対応、ホバー浮き上がり効果
- スマホ用メディアクエリ（〜600px）でテキスト幅100%・ボタン段組み
- キャッシュバスター `?v=6.9` → `?v=7.0`（全12箇所）

### v1.14の追加 CSS クラス
`.primer-vstudy-block` `.primer-vstudy-row` `.primer-vstudy-row-sub` `.primer-vstudy-text` `.primer-vstudy-btns` `.primer-vbtn` `.primer-vbtn-mark` `.primer-vbtn-yt` `.primer-vbtn-slide`

---

## 旧版履歴 — v1.13（2026-05-06）

**JAMA UG セクション再配置＋章番号27章化＋LinkedIn ページ更新**。

### v1.13の変更内容
1. **JAMA UG セクションを Part VIII に昇格**
   - TOC上で Primer 直下にあった `📘 JAMA ユーザーズガイド（要約）` を、Part VII の直後（付録の前）へ移動
   - 新セクション名：`Part VIII — 📘 JAMA ユーザーズガイド（要約）`
   - JAMA 各章の TOC 番号を `📘` から `㉒ ㉓ ㉔` に変更
   - JAMA ページ（page-26/27/28）の `.jph-badge` を `📘 JAMA UG` → `📘 Chapter 22 / 27 ｜ JAMA UG`（同 23/27, 24/27）に更新
2. **付録を Part IX に降格＋番号繰り下げ**
   - `Part VIII — 付録` → `Part IX — 付録`
   - 用語集（page-22）`22 → 25`
   - LinkedIn（page-23）`23 → 26`
   - 参考文献（page-24）`24 → 27`
3. **章バッジ「Chapter X / 24」→「Chapter X / 27」を全章一括更新**
4. **章ナビゲーションボタン論理順を新順序に追従**
   - Ch21 next → Ch22 JAMA UG SR/MA（page-26）
   - JAMA Ch22 prev → Ch21（旧：Primer）
   - JAMA Ch24 next → Ch25 用語集（page-22）（追加）
   - 付録3章のラベルを Ch25/26/27 に修正
5. **LinkedIn ページ（Ch26）改善**
   - `linkedin-feed.js`：「X日前」と「関連：ChY」表示を廃止 → トピックタグのみ
   - `linkedin-picks.json`：snapshotDate を 2026-05 に更新
   - **新規 7 件追加（最新順、配列の先頭に挿入）**
     - PFS の HRQL サロゲートとしての低い妥当性
     - LLM 臨床推論の限界（鑑別診断エラー率 80%）
     - GRADE 利用の落とし穴（I²／OIS／確実性連続体）
     - JAMA Users' Guides XVII：スクリーニング推奨
     - 出版バイアス：臨床医向け簡潔ガイド
     - シンガポール EBM ワークショップ19回目（個人投稿）
     - 経腟分娩 vs 帝王切開と尿失禁（Kari Tikkinen ほか）
   - 計 23 件
6. **キャッシュバスター** `?v=6.8` → `?v=6.9`（全12箇所）

---

## 旧版履歴 — v1.12（2026-05-06）

**Primer引用ボックス縦書き化バグ修正**。
- `.guyatt-quote` (Primer ページ§13・§16ほか) の `.gq-src`（出典行）が `width: 100%` を持つせいで flex 行内で本文 `.gq-body` を限界まで圧迫し、日本語が1文字ずつ縦に折り返されていた現象を修正
- 修正：`.guyatt-quote` に `flex-wrap: wrap` を追加、`.gq-src` を `flex-basis: 100%` で必ず次行へ送る、`.gq-body` に `min-width: 0` を追加（flex item の min-width: auto 既定値による縮小不能を解除）
- キャッシュバスター `?v=6.7` → `?v=6.8`（全12箇所）

---

## 旧版履歴 — v1.11（2026-05-03）

**Ch7に学習動画プレリュードボタン追加**。
- Chapter 7（閾値とMID）の page-body 最上部（you-are-here の上）に、YouTube動画「閾値・信頼区間とMIDで考える考え方の基本」へのリンクボタンを追加
- URL: https://www.youtube.com/watch?v=4nd4uTrDAKM
- 赤枠＋▶ アイコンで「動画リンク」を視覚的に示唆、新タブで開く
- 再利用可能な `.ch-prelude-video` クラスとして実装（他章にも同パターンで追加しやすい）
- キャッシュバスター `?v=6.6` → `?v=6.7`（全12箇所）

### v1.11の追加 CSS クラス
`.ch-prelude-video` `.cpv-mark` `.cpv-body` `.cpv-tag` `.cpv-title` `.cpv-dsc` `.cpv-arrow`

---

## 旧版履歴 — v1.10（2026-05-03）

**Ch17にあら探しシリーズ・リンク集追加**。
- Chapter 17（CPG品質の実例）の「要点：」box の上に、`<details>` ベースのアコーディオン「素晴らしい診療ガイドラインあら探しシリーズ」を追加
- 18件のリンク：特別編・論文（J Clin Epidemiol 2025）・No.1〜No.16
- ソース別アイコン色分け：YouTube ▶ 赤 ／ note 📝 ティール ／ 論文 📄 青 ／ docswell 📊 黄 ／ X 𝕏 黒
- タップで折りたたみ／展開、各カードは新タブで開く（`target="_blank" rel="noopener"`）
- スマホ専用フォント縮小メディアクエリ（〜480px）
- キャッシュバスター `?v=6.5` → `?v=6.6`（全12箇所）

### v1.10の追加 CSS クラス
`.aratan-block` `.aratan-summary` `.aratan-icon` `.aratan-summary-body` `.aratan-summary-title` `.aratan-summary-sub` `.aratan-summary-toggle` `.aratan-list` `.aratan-item` `.aratan-mark` `.aratan-yt` `.aratan-note` `.aratan-paper` `.aratan-docswell` `.aratan-x` `.aratan-item-body` `.aratan-tag` `.aratan-tag-special` `.aratan-tag-paper` `.aratan-name` `.aratan-dsc`

---

## 旧版履歴 — v1.9（2026-05-03）

**モーダル内パンバグ修正**。`touch-action: pinch-zoom` を `manipulation` に変更し、1本指スワイプ（パン操作）を有効化。`overscroll-behavior: contain` も追加。`?v=6.4` → `?v=6.5`

## 旧版履歴 — v1.8（2026-05-03）

**全体像サムネイル小型化＋スライド学習版ボタン追加**。
- v1.5で追加したCore GRADE全体像サムネイルを小型化（max-width 260px）
- モーダル拡大時、モバイルでは画像が画面より大きく開きスワイプで全体閲覧可能（safe center, `width: max(100%, 900px)`）
- 動画②の下に「スマホ学習版（スライド）」ボタンを追加 → https://grad-eslide.vercel.app/slide/N3
- キャッシュバスター `?v=6.3` → `?v=6.4`（全12箇所）

### v1.8の追加 CSS クラス
`.slide-btn` `.slide-mark` `.cpg-overview-modal-hint`（およびモーダル/サムネ既存クラスの調整）

---

## 旧版履歴 — v1.7（2026-05-03）

**姉妹サイト導線追加**。JAMA UG ブロックの上にGRADE-tanken（実践訓練用）への導線ブロック追加（オレンジ系 #d4941e、青系JAMA UGと差別化）。`?v=6.2` → `?v=6.3`

## 旧版履歴 — v1.6（2026-05-03）

**ナビゲーション修正**。
- ブラウザ戻るボタンで前ページへ戻れるよう履歴管理（`history.pushState` / `popstate`）追加、`#page-N` ハッシュ対応
- 全29ページに「☰ 目次を開く」ボタンをJSで動的挿入（先頭＋章末の chapter-nav 左右ボタン間）
- `openSidebar()` / `closeSidebar()` をグローバル化
- Primer（page-25）のスマホフォント拡大（1rem ／ line-height 1.8 以上）
- `?v=6.1` → `?v=6.2`

---

## 旧版履歴 — v1.5（2026-04-23）

**Core GRADE全体像サムネイル追加版**。Ch0表紙の初学者向け導入ブロック内（動画①の直上）に、Core GRADEアプローチ全体像（1枚絵）のサムネイル＋全画面ライトボックスを追加。

### v1.5の追加内容（v1.4からの差分）
1. **新規画像**：`images/core-grade-overview.png`（Core GRADEアプローチ — 6ステップ＋4推奨パターン＋全体俯瞰の1枚絵）
   - 元ファイル `ChatGPT Image 2026年4月23日 21_35_16.png` をクリーンASCII名でコピー（GitHub Pages URL の安定性のため）
2. **Ch0表紙に「📊 診療ガイドライン（システマティックレビューに基づく）全体像」ブロック追加**
   - 配置：「🎓 初学者の方は…」サブテキスト直下、動画①ボタンの直上
   - サムネイル：オレンジ縁ブロック内に等幅表示
3. **全画面モーダル（ライトボックス）実装**
   - タップ → ダーク背景の全画面オーバーレイ表示
   - 上部バー：タイトル＋「🔍 拡大／縮小」「✕」ボタン
   - 「拡大」モバイル220% ／タブレット150% ／PC110%（メディアクエリ）
   - 画像本体タップでも拡大トグル、背景タップ／ESC／✕ で閉じる
   - `touch-action: pinch-zoom` でネイティブ2本指ピンチも有効
4. **キャッシュバスター**：`?v=6.0` → `?v=6.1`（全12箇所）

### v1.5の追加 CSS クラス
`.cpg-overview-block` `.cpg-overview-title` `.cpg-overview-thumb-btn` `.cpg-overview-thumb-img` `.cpg-overview-thumb-hint` `.cpg-overview-modal` `.cpg-overview-modal-bar` `.cpg-overview-modal-title` `.cpg-overview-modal-actions` `.cpg-overview-modal-btn` `.cpg-overview-modal-body` `.cpg-overview-modal-img` `.cpg-overview-modal-img.zoomed` `body.cpg-overview-open`

### v1.5の追加 JS 関数
`openCPGOverview()` `closeCPGOverview()` `toggleCPGOverviewZoom()` ＋ ESC キーリスナー

---

## 旧版履歴 — v1.4（2026-04-23）

**JAMA ユーザーズガイド中心版**。Gordon Guyatt 先生らの *Users' Guides to the Medical Literature*（第3版）Ch22・Ch23・Ch24 を独立 3 章として新規追加し、既存章に横断的なコールアウトを挿入。

### v1.4の追加内容（v1.3からの差分）
1. **新規ページ 3 章**：
   - `page-26` 📘 JAMA UG Ch22 — SR／MA プロセスの信頼性（8 質問チェックリスト／フォレストプロット模式図／β 遮断薬シナリオ）
   - `page-27` 📘 JAMA UG Ch23 — 結果の理解と適用（効果指標比較表／異質性 3 ステップ／サブグループ 5 基準／SoF 表／POISE 計算例）
   - `page-28` 📘 JAMA UG Ch24 — ネットワークメタアナリシス（4 つのネットワーク形状／8 項目 NMA チェックリスト／片頭痛トリプタン NMA）
2. **TOC 新セクション**「📘 JAMA ユーザーズガイド（要約）」を Primer セクションの直後に追加
3. **表紙（Ch0）** に JAMA UG 誘導ブロックを追加（青系グラデーション、3 章への直接リンク）
4. **Primer（page-25）** ロードマップに JAMA UG 3 章カードを追加
5. **既存 7 章に「📘 JAMA UG」コールアウト**を挿入：
   - Ch1（本章と JAMA UG の関係）
   - Ch8（RoB はアウトカムごとに判定）
   - Ch9（異質性評価の 3 ステップ）
   - Ch10（非直接性の 4 側面）
   - Ch11（CI 両端の臨床判断と OIS）
   - Ch18（AMSTAR 2／PRISMA／JAMA UG の使い分け）
   - Ch20（相対→絶対→NNT の翻訳）
   - Ch21（推奨の 4 パターンと SDM）
6. **著作権配慮**：逐語引用せず、章構成・質問フレームを参照して独自に再構成・解説。各 JAMA 章末に出典明記。
7. **script.js**：プログレスバー計算を全 28 ページ対応に更新（Primer=25, JAMA=26-28）
8. **キャッシュバスター**：`?v=5.0` → `?v=6.0`

### v1.4の追加 CSS クラス
`.jama-page-head` `.jph-*` `.jama-note` `.jn-*` `.jama-scenario` `.js-*` `.jama-resolution` `.jr-*` `.jama-checklist` `.jc-*` `.jama-apply` `.ja-*` `.jama-term` `.jt-en` `.jama-forest` `.jf-*` `.jama-rec-grid` `.jama-rec-card` `.jrc-*` `.jama-map` `.jama-network` `.jn-node*` `.jama-next` `.jama-h2` `.jama-h3` `.jama-source` `.toc-btn.jama-toc` `.jama-compare` `.jcmp-*` `.jterm` `.jterm-en` `.jama-badge-inline`

---

## 旧版履歴 — v1.3（2026-04-22）

**Guyatt先生のCore GRADE統合＋スマホファーストUX版**。Primer ページ（page-25）を大幅拡充。

### v1.3の追加内容（v1.2からの差分）
1. **新セクション7本を追加**（既存12セクションの後・まとめの前）：
   - 13. Core GRADE — Guyatt 2025「GRADE が複雑になりすぎた」という反省
   - 14. 確実性評価のターゲット選択（Null vs MID 閾値）
   - 15. 最適情報サイズ（OIS）— 少数症例で大きな効果への警戒
   - 16. 「Risk of Bias」は「Bias」ではない — 教育的ゲシュタルトの原則
   - 17. サブグループと背景リスク — 「誰に推奨するか」の科学
   - 18. エビデンスから推奨へ — 4つの推奨タイプと「強さ」の決定
   - 19. Guyatt先生Q&A — 実践現場の難問と回答（7問アコーディオン）
2. **ソース**：Guyatt Q&A（Clarity Research FAQ）／ Guyatt 講演 2025-12 ／ Core GRADE 0-7（BMJ 2025）／ null 近傍時の扱い（Zeng et al. BMJEBM 2025）
3. **スマホファーストUX改修**：
   - スティッキーセクションチップナビ（横スクロール・21チップ）で任意セクションにジャンプ
   - 各セクション末尾に「次 → n. ◯◯」ラウンドボタン（最低高48px）
   - 右下フローティングFAB（目次へ戻る📍／トップへ戻る↑）Primer active 時のみ表示
   - Q&A はアコーディオン形式（`<details>`ベース、タップで展開）
   - タップターゲットは全て最低44×44px 確保
   - 余白を詰め、フォントは大きく、表・グリッドは1列に折返し
4. **キャッシュバスター**：`?v=4.0` → `?v=5.0`

### v1.3の追加CSSクラス
`.primer-sticky-nav` `.primer-nav-chips` `.pn-chip` `.pn-new` `.sec-nav-foot` `.sec-next` `.sec-next-new` `.primer-h2-new` `.guyatt-quote` `.gq-*` `.cg-papers` `.cg-paper` `.target-box` `.target-null` `.target-mid` `.ti-*` `.target-steps` `.ois-calc` `.ois-judgment` `.oj-*` `.rob-example` `.re-*` `.rob-2step` `.r2-*` `.rob-flow` `.rf-step` `.subgroup-box` `.sb-*` `.rec-grid` `.rg-*` `.rec-factors` `.rf-card` `.qa-list` `.qa-item` `.qa-q` `.qa-a` `.qa-icon` `.qa-title` `.primer-fab-wrap` `.primer-fab`

---

## 現在の状態 — v1.2（2026-04-22）

**初学者向け徹底解説ページ導入版**。本体 Ch1–Ch24 の前段として、EBM・SR・CPG の「なぜ学ぶか」を解説する Primer ページを追加。

### v1.2の追加内容（v1.1からの差分）
1. **Ch0表紙**に初学者向け導入ブロック追加：
   - YouTube動画ボタン①（解説編）: https://www.youtube.com/watch?v=7UJZLG49ba8&t=1s
   - YouTube動画ボタン②（会話編54分）: https://www.youtube.com/watch?v=pAr7upG01YA
   - 「初学者向け徹底解説」ボタン → `page-25` へ遷移
2. **新ページ `page-25` — 初学者向け徹底解説（Primer）**：
   - 先生作成の **キースライド16枚**（`images/beginner-01.jpg` 〜 `beginner-16.jpg`）を埋め込み
   - 12セクション構成：医学情報の信頼性 / EBMの定義・5ステップ・3原則 / CPGの定義 / SRの定義 / エビデンスの確実性 / GRADE 5要因 / SRの質 vs 確実性 / 解説文の批判的吟味 / まとめ / ロードマップ
   - TOC に「📚 初学者向け（Primer）」セクション新設
3. **script.js 修正**：TOC 照合を `data-idx` ベースに変更（配列順非依存）
4. **キャッシュバスター**：`?v=3.0` → `?v=4.0`

### v1.1の内容（継続）
- 文書構造マップ（Ch1）／Ch2 リストラ／Ch3-21「📍あなたが今学んでいる場所」ナビ

### 画像の扱い
- `images/` 直下に元スライド（`aスライド*.JPG` `スライド*.JPG`）と、本サイト用にリネームした `beginner-01.jpg` 〜 `beginner-16.jpg` が共存
- `images/.gitignore` で元 JPG を除外、`beginner-*.jpg`（16枚）のみ git 追跡対象
- 他スライド（106枚）は将来の別用途のためローカル保管

### 追加CSSクラス（v1.2）
`.beginner-intro-block` `.beginner-btn` `.yt-btn` `.primer-btn` `.primer-header` `.primer-badge` `.primer-why` `.misunderstand-list` `.primer-h2` `.primer-fig` `.primer-5a` `.a-step` `.principle-list` `.principle` `.sr-steps` `.compare-box` `.low-tag` `.high-tag` `.grade-5factors` `.g5-item` `.four-pattern` `.fp-*` `.primer-final` `.primer-punchline` `.primer-footer-note` `.toc-btn.primer-toc`

---

## ファイル構成

```
CPGSRuser/
├── index.html                     # 全24章＋Primer（page-25）＋ナビ
├── style.css                      # 既存テーマ（紺+オレンジ）
├── style-cpgsr.css                # 追加スタイル（v1.1ナビ系＋v1.2 Primer系）
├── script.js                      # showPage（data-idx照合に修正）
├── images/
│   ├── .gitignore                 # 元スライドJPGを除外
│   └── beginner-01〜16.jpg        # Primerページ用キースライド（git追跡）
├── data/ ...（v1.1と同じ）
└── js/ ...（v1.1と同じ）
```

---

## 章構成（全24章）

- **Ch0** 表紙 / **Ch1** EBMとCPG/SR読み方＋**文書構造マップ**
- **Ch2** GRADE概要（v1.1で大幅リストラ）
- **Ch3-4** 確実性4段階／推奨の強さ
- **Ch5-7** SoF表／相対vs絶対／**Ch7⭐ MID閾値**
- **Ch8-12** 確実性を下げる5要因（RoB／不一致性／非直接性／不確実性／Dissemination bias）
- **Ch13-15** 非RCT・観察研究SR／CERQual／GPS
- **Ch16⭐⭐** 信頼できるCPG 6質問 / **Ch17** CPG実例 / **Ch18** AMSTAR 2 / **Ch19** PRISMA 2020
- **Ch20-21** 適用／SDM・価値観
- **Ch22** 用語集＋Q&A / **Ch23** LinkedIn / **Ch24** 参考文献

---

## コミット履歴

- `0190503` v1.0 初回公開（2026-04-21）
- `afe97d0` fix: glossary/reference 二重バインド防止
- `f6eb86c` docs: CONTEXT.md 追加
- `97c9879` v1.1 ナビゲーション学習システム導入（2026-04-22）
- `4d3050f` docs: CONTEXT.md v1.1 簡潔化（2026-04-22）
- `cb55f72` v1.2 初学者向け Primer ページ導入（2026-04-22）
- `f37809d` v1.3 Guyatt Core GRADE統合＋スマホファーストUX（2026-04-22）
- `2e0c5d1` v1.4 JAMA ユーザーズガイド中心版（Ch22-24を独立3章として追加）（2026-04-23）
- `8352b64` v1.5 Core GRADE全体像サムネイル＋全画面ライトボックス追加（2026-04-23）
- `6df7f4c` v1.6 戻るボタン修正・各ページに目次ボタン・Primerスマホフォント拡大（2026-05-03）
- `4e2829b` v1.7 姉妹サイト「GRADE 探検」への導線ボタン追加（2026-05-03）
- `b93f881` v1.8 全体像サムネ小型化＋モバイル拡大パン対応＋スライド学習版ボタン追加（2026-05-03）
- `98ef333` v1.9 モーダル内スワイプ移動バグ修正（touch-action: manipulation）（2026-05-03）
- `068fe1f` v1.10 Ch17にあら探しシリーズ・リンク集（特別編＋論文＋No.1〜16）追加（2026-05-03）
- `b7e4420` v1.11 Ch7に学習動画プレリュードボタン追加（YouTube：閾値・信頼区間とMIDの基本）（2026-05-03）
- `f83499d` v1.12 Primer引用ボックス縦書き化バグ修正（flex-wrap で gq-src を次行送り）（2026-05-06）
- `3b7a473` v1.13 JAMA UG を Part VIII に昇格＋付録 Part IX 番号繰り下げ＋LinkedIn 7件追加・日付/関連章表示廃止（2026-05-06）
- `d42b7c2` v1.14 Primer ページ冒頭の動画/スライドボタン群リニューアル（動画／動画編／スマホで読もう編）（2026-05-06）
- v1.15 JAMA UG Ch23 §1 に森林図解説図（forest.png）を挿入（2026-05-06）

---

## 参考文献体系（`data/references.json`）

U1-U18（Users' Guides）／M1-M7（MID・閾値）／G1-G7（GRADE拡張）／T1-T2（AMSTAR 2, PRISMA）／C1-C4（CPG実例）／V1-V2（価値観）／L1（Guyatt LinkedIn）

中核文献: U12（Murad 2014 SR読み方）／U16（Brignardello-Petersen 2021）／**U17（Lima-Mirza-Guyatt 2023 信頼できるCPG 6質問）**／G1（Djulbegovic-Guyatt 2017 EBM総括）

---

## 主要ソース資料

`GRADE/` 配下（先生ローカルのみ）:
- CPGの質/信頼できるCPG Guyatt 2023.pdf（U17）
- CPGの質/NCCN.txt、IOM.pdf、日本のCPG問題.pdf
- 閾値・MID/ （M1-M7関連）
- GRADE論文/ （G1-G7関連）
- 非RCT研究のメタ分析/GRADE guidance 44.pdf（G2）

LinkedInスナップショット: `C:/Users/yuasa/Desktop/新規 テキスト ドキュメント (2).txt`（184投稿）

既存作成者向けアプリ: `GRADEbook_CoreGRADE/grade-handbook-japanese-v2/`（本アプリのHTML/CSS/JS流用元、独立運用）

---

## 今後の候補

- v1.1のレビュー・内容検証
- Part IX 発展章（NMA、非劣性、スクリーニング、質改善、機械学習、遺伝的関連、希少疾患）
- 章末クイズ／全文検索／やさしい日本語版

---

## 運用メモ

- 先生は診療ガイドライン方法論者（歯科領域中心）
- GitHub: gh CLIで `mxe050` ログイン済
- デプロイ: `git add . && git commit && git push`（GitHub Pagesが1-2分で反映）
- 日本語パス含むためBash引用符必須、pdftotextは利用可、画像PDFは抽出不可
- 実装権限: 最後まで許可済
