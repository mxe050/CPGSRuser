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

## 現在の状態 — v1.1（2026-04-22）

ナビゲーション学習システム導入版。コミット `97c9879` でpush済、GitHub Pages配信中。

### v1.1の追加内容
1. 表紙文言：「すべての医療関係者のための」に変更
2. **Ch1末尾に文書構造マップ新設** — CPG 9ステップ／SR 13ステップのタブ切替、各セクションに学習章リンク
3. **Ch2 全面リストラ** — GRADEを最初に学ぶ動機・G/R/A/D/E分解・以前 vs 以後の対比・学習ロードマップを追加
4. **Ch3-Ch21 全19章に「📍あなたが今学んでいる場所」ナビ** — CPG/SRのどのセクションを読むための知識かを章冒頭に明示

### 追加CSSクラス（`style-cpgsr.css`）
`.doc-map-wrap` `.doc-map-tab` `.doc-map-panel` `.doc-section` `.you-are-here` `.yah-*` `.term-decode` `.why-first` `.roadmap`

### 追加JS
文書構造マップのタブ切替は `index.html` 末尾の inline script に実装済。

---

## ファイル構成

```
CPGSRuser/
├── index.html                     # 全24章＋文書構造マップ＋ナビ
├── style.css                      # 既存テーマ（紺+オレンジ）
├── style-cpgsr.css                # 追加スタイル（v1.1でナビ系追加）
├── script.js                      # showPage, switchTab, menuToggle
├── data/
│   ├── references.json            # U/M/G/T/C/V/L 書誌
│   ├── glossary.json              # 22用語
│   ├── mid-thresholds.json        # MID閾値
│   ├── linkedin-picks.json        # Guyatt LinkedIn
│   └── chapters.json              # TOC
└── js/
    ├── glossary.js                # ツールチップ
    ├── references.js              # 参考文献ポップオーバー
    ├── mid-explorer.js            # Ch7早見表
    ├── trustworthy-check.js       # Ch16 6質問
    ├── amstar2.js                 # Ch18 16項目
    └── linkedin-feed.js           # Ch23
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
