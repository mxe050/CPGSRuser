# CPGSR Reader — 診療ガイドライン／システマティックレビューの読み方

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-live-success)](https://mxe050.github.io/CPGSRuser/)
[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

**臨床医・研修医・薬剤師・看護師・医学生のための、GRADE準拠の「診療ガイドライン／システマティックレビューの読み方」解説サイト**

📖 **公開URL**: https://mxe050.github.io/CPGSRuser/

---

## 対象と目的

本サイトは、診療ガイドライン（CPG）とシステマティックレビュー（SR）を**読んで診療に活かす側**の医療者を対象に、GRADEアプローチを土台とした「読み方・解釈・適用」を包括的に解説します。

GRADEの「**作り手向け**」解説は、同じ作者の別アプリ [core-grade-guide-1](https://github.com/mxe050/core-grade-guide-1) にあります（本サイトはそれと独立・自己完結）。

---

## 全24章の構成

### Part I — EBM・GRADEの全体像
- Ch1: EBMと診療ガイドライン・SRの読み方
- Ch2: GRADEアプローチの概要

### Part II — 推奨の理解
- Ch3: エビデンスの確実性4段階の意味
- Ch4: 強い推奨 vs 条件付き推奨 ＋ GPS・推奨表現

### Part III — SoF・効果・閾値
- Ch5: SoF表・Evidence Profileの読み方
- Ch6: 相対効果と絶対効果
- Ch7: **閾値とMID** — インタラクティブ早見表

### Part IV — 確実性が下がる5要因
- Ch8: Risk of Bias（RCT＋観察研究ROBINS-E）
- Ch9: 不一致性
- Ch10: 非直接性
- Ch11: 不確実性
- Ch12: Dissemination bias

### Part V — 多様な研究デザインのSR
- Ch13: 非RCT・観察研究のSR（GRADE Guidance 44）
- Ch14: 定性的研究のSR — GRADE-CERQual
- Ch15: 単一推定値なし／GPS／ネットベネフィット

### Part VI — CPG信頼性評価
- Ch16: **⭐ 信頼できるCPGの6つの質問**（Guyatt 2023）— インタラクティブチェックリスト
- Ch17: CPG品質の実例 — NCCN／IOM／日本のCPG問題
- Ch18: **AMSTAR 2（16項目）** — インタラクティブチェッカー
- Ch19: PRISMA 2020（27項目）

### Part VII — 診療現場で活かす
- Ch20: 推奨を目の前の患者にどう適用するか
- Ch21: 共同意思決定（SDM）と価値観・嗜好

### Part VIII — 付録
- Ch22: 用語集 ＋ Q&A
- Ch23: 最新情報 ＋ Guyatt先生 LinkedIn ピックアップ
- Ch24: 参考文献一覧

---

## インタラクティブ機能

| 機能 | 章 | 説明 |
|---|---|---|
| 用語集ツールチップ | 全章 | 本文中の点線下線をクリックで用語解説 |
| 引用ポップオーバー | 全章 | `[U17]` 等をクリックで論文詳細 |
| MID閾値早見表 | Ch7 | アウトカム別の些細・中・大閾値 |
| 信頼できるCPG 6質問チェックリスト | Ch16 | 目の前のCPGを評価 |
| AMSTAR 2 16項目チェッカー | Ch18 | SRの方法論的質を評価 |
| LinkedInピックアップ | Ch23 | Guyatt先生の最新投稿 |

---

## 参考文献体系

本サイトは以下の分類で30以上の参考文献を正式参照しています：

- **U1-U18**: Users' Guides to the Medical Literature シリーズ（Guyatt先生らによる"読み方"の体系）
- **M1-M7**: 閾値・MID関連（Jaeschke-Singer-Guyatt 1989のMCID原典を含む）
- **G1-G7**: GRADE方法論拡張（Guyatt 2017 EBM、GRADE Guidance 44（非RCT）、CERQual、GPS、推奨表現2022）
- **T1-T2**: SR品質ツール（AMSTAR 2、PRISMA 2020）
- **C1-C4**: CPG品質の実例（Guyatt 2023、NCCN、IOM 2011、日本のCPG問題）
- **V1-V2**: 価値観・共同意思決定
- **L1**: Guyatt先生 LinkedIn（継続更新）

詳細は Ch24（参考文献一覧）を参照。

---

## 主要参考文献（最重要3本）

1. **Lima JP, Mirza RD, Guyatt GH. How to recognize a trustworthy clinical practice guideline.** J Anesth Analg Crit Care 2023;3:9.
2. **Brignardello-Petersen R, Carrasco-Labra A, Guyatt GH. How to Interpret and Use a Clinical Practice Guideline or Recommendation.** JAMA 2021;326(15):1516-1523.
3. **Murad MH, Montori VM, Ioannidis JPA, et al. (incl. Guyatt). How to read a systematic review and meta-analysis.** JAMA 2014;312(2):171-179.

---

## 技術構成

- 静的HTML/CSS/JavaScript（単一ページアプリケーション）
- Tailwind CSS（CDN）、Lucide icons（CDN）
- 純粋なvanilla JavaScript（フレームワーク非使用）
- GitHub Pages公開

## ファイル構成

```
CPGSRuser/
├── index.html              # 本体
├── style.css               # 既存シェル流用＋テーマ
├── style-cpgsr.css         # 追加スタイル
├── script.js               # 既存シェル流用
├── coreGRADE_utils.js      # 補助ユーティリティ
├── data/
│   ├── references.json     # 参考文献データ（U/M/G/T/C/V/L）
│   ├── glossary.json       # 用語集
│   ├── mid-thresholds.json # MID閾値例
│   ├── linkedin-picks.json # LinkedInピックアップ
│   └── chapters.json       # TOCメタ
├── js/
│   ├── glossary.js
│   ├── references.js
│   ├── mid-explorer.js
│   ├── trustworthy-check.js
│   ├── amstar2.js
│   └── linkedin-feed.js
└── docs/
    └── linkedin-update-guide.md
```

---

## 更新履歴

- **v1.0.0 (2026-04)**: 初回公開。全24章、6つのインタラクティブ機能、30以上の参考文献を搭載。

---

## ライセンス

本サイトの構造とテキストは Creative Commons BY-NC-SA 4.0 で提供します。
参考文献の元論文は各出版社の著作権に従います。外部リンクでのみ参照し、本文を複製していません。

## 謝辞

Gordon H. Guyatt先生（McMaster大学）の長年にわたるEBM・GRADE方法論への貢献と、LinkedInでの継続的な論文キュレーションに深く感謝します。

本サイトは、診療ガイドライン作成者向けの姉妹サイト（core-grade-guide-1）の読者版として、臨床現場でCPG/SRを読む医療者の支援を目的に作成されました。
