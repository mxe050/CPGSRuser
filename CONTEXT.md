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
- v1.2 初学者向け Primer ページ導入（2026-04-22）

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
