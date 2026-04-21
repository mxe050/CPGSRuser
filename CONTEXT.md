# CPGSRuser プロジェクト・コンテキスト（Claude向け読み込み用）

`/clear`後に最初にこのファイルを読み込めば作業継続可能。

---

## プロジェクト概要

**何**: 診療ガイドライン／システマティックレビュー（CPG/SR）を**読む側**の医療者向け、GRADE準拠の独立解説アプリ（全24章）

**対象**: 医療者中心（医師・研修医・薬剤師・看護師・医学生）。やさしい日本語版は将来検討。

**位置付け**: 既存の作成者向け `core-grade-guide-1`（`F:/マイドライブ/2016年works/AI/作成アプリ/GRADEbook_CoreGRADE/grade-handbook-japanese-v2/`）とは**完全独立・自己完結**。相互リンクなし。

**公開URL**: https://mxe050.github.io/CPGSRuser/  
**GitHub**: https://github.com/mxe050/CPGSRuser（public、GitHub Pages有効、main/root）  
**作業ディレクトリ**: `F:/マイドライブ/2016年works/AI/作成アプリ/CPGSRuser/`

---

## 現在の状態

**v1.0 公開完了**（2026-04-21）。全24章、6つのインタラクティブ機能、30+参考文献を実装済み。GitHub Pages配信中。コミット2つ（初回公開 `0190503` + バインディング修正 `afe97d0`）。

---

## ファイル構成

```
CPGSRuser/
├── index.html                     # 93KB、全24章コンテンツ
├── style.css                      # 既存シェル流用（紺+オレンジテーマ、--primary:#1a5276 --accent:#e67e22）
├── style-cpgsr.css                # 追加スタイル（ref-cite, gloss-tip, mid-table, tw-*, am-*, lnk-*）
├── script.js                      # 既存シェル流用（showPage, switchTab, menuToggle）
├── coreGRADE_utils.js             # 既存（calculateRR計算機 — 未使用だが残置）
├── README.md                      # プロジェクト説明
├── CONTEXT.md                     # このファイル
├── .gitignore                     # _*.txt, .claude/, node_modules/ 等
├── data/
│   ├── references.json            # U1-U18/M1-M7/G1-G7/T1-T2/C1-C4/V1-V2/L1の書誌情報
│   ├── glossary.json              # 22用語
│   ├── mid-thresholds.json        # 10アウトカム×4閾値レベル
│   ├── linkedin-picks.json        # Guyatt LinkedIn投稿16件
│   └── chapters.json              # TOCメタ
├── js/
│   ├── glossary.js                # .glossツールチップ（二重バインド防止済み）
│   ├── references.js              # [U17]等のポップオーバー（wrappedフラグ防止）
│   ├── mid-explorer.js            # Ch7閾値早見表
│   ├── trustworthy-check.js       # Ch16 6質問チェックリスト（総合判定付）
│   ├── amstar2.js                 # Ch18 16項目チェッカー
│   └── linkedin-feed.js           # Ch23フィード（トピック別フィルタ）
└── docs/
    └── linkedin-update-guide.md   # LinkedIn更新手順書
```

---

## 章構成（全24章、Ch0=表紙+Ch1-24）

### Part I — EBM・GRADEの全体像
- **Ch1** EBMと診療ガイドライン・SRの読み方（Guyatt 2017内包）
- **Ch2** GRADEアプローチの概要

### Part II — 推奨の理解
- **Ch3** エビデンスの確実性4段階の意味
- **Ch4** 強い推奨 vs 条件付き推奨 + GPS + 推奨表現2022 + 単一推定値なし

### Part III — SoF・効果・閾値
- **Ch5** SoF表・Evidence Profileの読み方
- **Ch6** 相対効果と絶対効果
- **Ch7** ⭐ **閾値とMID**（インタラクティブ早見表）

### Part IV — 確実性が下がる5要因
- **Ch8** Risk of Bias（RCT+観察研究ROBINS-E）
- **Ch9** 不一致性
- **Ch10** 非直接性（+Guyatt 2023サロゲート議論+indirectness algorithm）
- **Ch11** 不確実性（Imprecision、Ch7 MIDと連動）
- **Ch12** Dissemination bias

### Part V — 多様な研究デザインのSR（新設）
- **Ch13** 非RCT・観察研究のSR（GRADE Guidance 44準拠）
- **Ch14** 定性的研究のSR — GRADE-CERQual
- **Ch15** 単一推定値なし・GPS・ネットベネフィット

### Part VI — CPG信頼性評価（本アプリの独自核）
- **Ch16** ⭐⭐ **信頼できるCPGの6つの質問**（Guyatt 2023準拠、インタラクティブチェックリスト）
- **Ch17** CPG品質の実例（NCCN批判／IOM 2011／日本のCPG問題）
- **Ch18** AMSTAR 2（16項目インタラクティブチェッカー）
- **Ch19** PRISMA 2020（27項目）

### Part VII — 診療現場で活かす
- **Ch20** 推奨を目の前の患者にどう適用するか（Applicability）
- **Ch21** 共同意思決定（SDM）と価値観・嗜好

### Part VIII — 付録
- **Ch22** 用語集 ＋ Q&A
- **Ch23** 最新情報 ＋ Guyatt LinkedInピックアップ
- **Ch24** 参考文献一覧

---

## 参考文献体系（30+、7カテゴリ）

すべて `data/references.json` に書誌情報収録済み。本文中の `[U17]` 等クリックでポップオーバー表示。

- **U1-U18**: Users' Guides to the Medical Literature シリーズ（Guyatt先生ら1995-2023）
  - 中核: U12 Murad 2014（SR読み方）／U16 Brignardello-Petersen 2021（CPG解釈）／U17 Lima-Mirza-Guyatt 2023（信頼できるCPG 6質問）
- **M1-M7**: 閾値・MID（M1 Jaeschke-Singer-Guyatt 1989 MCID原典／M2 GRADE Guidance 42／M7 BMJ 2025）
- **G1-G7**: GRADE方法論拡張（G1 Djulbegovic-Guyatt 2017 EBM／G2 Cuello-Garcia 2025 Guidance 44非RCT／G3 Lewin 2018 CERQual／G4 GPS／G5 Piggott 2022推奨表現／G6 Murad 2017単一推定値なし）
- **T1-T2**: T1 AMSTAR 2 (Shea 2017)／T2 PRISMA 2020 (Page 2021)
- **C1-C4**: C1=U17／C2 NCCN批判（`F:/マイドライブ/2016年works/GRADE/CPGの質/NCCN.txt`）／C3 IOM 2011／C4 日本のCPG問題
- **V1-V2**: 価値観と嗜好SR（抗血栓療法ACCP）
- **L1**: Guyatt LinkedIn（継続更新、認証必須で手動取得）

---

## インタラクティブ機能（6つ、すべて実装済）

1. **用語集ツールチップ**（`js/glossary.js` + `data/glossary.json`）— 全章、点線下線クリック
2. **参考文献ポップオーバー**（`js/references.js` + `data/references.json`）— 全章、`[U17]`等クリック
3. **MID閾値早見表**（Ch7、`js/mid-explorer.js` + `data/mid-thresholds.json`）
4. **信頼できるCPG 6質問チェックリスト**（Ch16、`js/trustworthy-check.js`、総合判定付）
5. **AMSTAR 2 16項目チェッカー**（Ch18、`js/amstar2.js`、重要項目[★]判定）
6. **LinkedInピックアップカード**（Ch23、`js/linkedin-feed.js` + `data/linkedin-picks.json`、トピック別フィルタ）

---

## ユーザー決定事項（確定）

| 項目 | 決定 |
|---|---|
| 対象 | 医療者中心 |
| パスワード | 撤廃、完全オープン |
| UIテーマ | 既存の紺＋オレンジ |
| 作成者アプリ相互リンク | なし（自己完結） |
| 新規章執筆 | Claudeが下書き→先生がチェック |
| 実装権限 | 最後まで許可済（v1.0公開完了） |

---

## 主要ソース資料の物理パス

すべて先生のローカル `F:/マイドライブ/2016年works/GRADE/` 配下：

- CPGの質/信頼できるCPG Guyatt 2023.pdf（U17原典、既読済）
- CPGの質/NCCN.txt（C2 NCCN批判）
- CPGの質/IOM.pdf（C3、18頁）
- CPGの質/日本のCPG問題.pdf（C4、183頁）
- 閾値・MID/MIDの決め方1989年G推奨.pdf（M1、スキャンPDFで直接抽出不可）
- 閾値・MID/GRADE Guidance 42.pdf（M2）
- 閾値・MID/2024閾値論文/（M4）
- 閾値・MID/絶対リスク差のための論文2023.pdf（M5）
- SRメタ方法論/SRをチェックして使えるかAMSTAR 2/AMSTAR 2.pdf（T1）
- SRメタ方法論/PRISMA_2020_checklist日本語.docx（T2）
- GRADE論文/Gyuatt先生/Gordon H Guyatt EBMについて2017.pdf（G1）
- 非RCT研究のメタ分析/GRADE guidance 44 非ランダム.pdf（G2）
- GRADE論文/GRADE-CERQual質的研究のレビュー信頼性.pdf（G3）
- GRADE論文/Good Practice Statement.pdf（G4）
- GRADE論文/GRADE推奨の表現方法2022.pdf（G5）
- GRADE論文/単一の推定値が存在しない場合e.pdf（G6）
- GRADE論文/ネットベネフィットの手順2019.pdf（G7）

**LinkedIn スナップショット**: `C:/Users/yuasa/Desktop/新規 テキスト ドキュメント (2).txt`（184投稿、5500行、初回データセット）

---

## 既存作成者向けアプリ（参照元）

- パス: `F:/マイドライブ/2016年works/AI/作成アプリ/GRADEbook_CoreGRADE/grade-handbook-japanese-v2/`
- HTML骨組み・CSS・JSを本アプリで流用済
- 章テキスト（`coreGRADE/text/*.txt`、23ファイル）はCh2, 3, 8-12の下敷きに使用可

---

## 起床後のレビュー推奨ポイント

1. 公開サイト動作確認：https://mxe050.github.io/CPGSRuser/
2. 内容チェック最優先：
   - **Ch7（MID）**：M1 Jaeschke 1989のMCID原典は画像PDFで抽出不可のため、二次資料ベースで執筆。MID定義は既知概念だが閾値早見表の具体数値は先生の検証が必要。
   - **Ch13（観察研究SR）**：GRADE Guidance 44（2025）準拠。4ステップ枠組みとROBINS-E/I記述の正確性。
   - **Ch14（CERQual）**：4要素（方法論的限界／整合性／データ十分性／関連性）の記述。
   - **Ch16（6質問）**：Guyatt 2023全文既読で準拠したが、各質問の良い例／問題例の日本語訳ニュアンス。
   - **Ch17（CPG実例）**：NCCN.txt、日本のCPG問題の内容を圧縮して記述したため、重要論点の漏れがないか。
3. インタラクティブ機能の動作：Ch7早見表／Ch16チェックリスト／Ch18チェッカー／Ch23フィルタ
4. 本文中の用語点線下線・引用ポップオーバー動作

---

## 今後の拡張候補（Part IX 発展章）

Users' Guidesシリーズで今回未実装の発展章（章追加候補）：
- NMA読み方（U9 Mills 2012）
- 非劣性試験（U10 Mulla 2012）
- スクリーニング推奨（U4 Barratt 1999）
- 質改善研究（U8 Fan 2010）
- 機械学習論文（U15 Liu 2019）
- 遺伝的関連研究（U7 Attia 2009）
- 希少疾患・単群試験CPG（MAGIC）

その他：章末クイズ機能、全文検索（lunr.js）、やさしい日本語対応切替、SoF表インタラクティブ例。

---

## 継続運用

### LinkedIn月次更新
`docs/linkedin-update-guide.md` 参照。手順：ログイン→ページテキスト保存→JSON更新→コミット→push。

### 新規資料追加時
1. `data/references.json` に書誌情報追加（U/M/G/T/C/V/Lカテゴリ選択）
2. 該当章の`.page` 本文に `[新ID]` 形式で引用
3. 必要なら新規章を`index.html`に追加、`data/chapters.json`に登録、サイドバーTOC更新

### デプロイ
```bash
cd "F:/マイドライブ/2016年works/AI/作成アプリ/CPGSRuser"
git add .
git commit -m "..."
git push
# GitHub Pagesが自動で1-2分後に反映
```

---

## 過去のプラン履歴

- `C:/Users/yuasa/.claude/plans/twinkling-crunching-glacier.md` にプランv3（最終版）が保存されている。

---

## Claude向けメモ

- 先生は診療ガイドライン方法論者のプロフェッショナル（歯科領域が多い）
- GitHub認証済（gh CLIで`mxe050`としてログイン済）
- 作業ディレクトリに長いパス（日本語含む）でBashコマンド時は必ず引用符付け
- PowerShellも使用可（`&&`なし、`; if ($?) { ... }`で連鎖）
- pdftotextは`/mingw64/bin/pdftotext`で利用可、pdftoppmは不可
- 画像PDF（スキャン）は抽出不可の場合あり
