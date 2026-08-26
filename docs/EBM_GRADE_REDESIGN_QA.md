# EBM→GRADE学習マップ再設計 QA報告

- 実施日: 2026-08-26
- 対象branch: `codex/ebm-grade-map-redesign`
- QA対象commit: `862c39a`
- 基準commit: `7b4b9107eedc88b3ef18eb55ec362158c0c0009b`
- 基準台帳: `docs/BASELINE_CONTENT_MANIFEST.json`

## 保存検証

クリーンな一時worktreeで、開始前のGitHub版と変更後を比較した。

- 基準HTML: 9ファイル。削除0。
- 基準リンク・資産: 545件をすべて保持。
- 基準ID: 全件保持。
- 基準見出し: 全件保持。
- figure、table、video/iframe、details: 各ページで基準数以上。
- 本文量: `index.html` は100,734文字から108,909文字へ増加。他の8 HTMLは減少0。
- 旧ファイル名、`#page-N`、既存内部アンカーを保持。
- content registry: 55項目。未分類0、重複contentId 0、欠損関連先0。
- navigation: 5区分。
- map hotspot: 14件。重複0、欠損target 0、画像外座標0。

## 自動検証

すべて成功。

```text
node tools/verify-navigation-coverage.mjs
node tools/verify-link-preservation.mjs
node tools/verify-page-content.mjs
node tools/verify-content-preservation.mjs
node tools/verify-cpgsr.mjs
node --check script.js
node --check ebm-grade-map.js
node --check learning-index.js
node --check js/references.js
git diff --check
```

## Chromium表示・操作QA

ローカルのクリーンworktreeをHTTP配信し、Playwright Chromiumで検証した。アプリ内ブラウザ制御プロセスはWindowsの環境同期エラーで起動できなかったため、同じChromium系エンジンを直接使用した。

| 画面幅 | 図の表示サイズ | 図上の表示領域 | テキストリンク | 横はみ出し | コンソールエラー |
| --- | ---: | ---: | ---: | ---: | ---: |
| 1440×1000 | 939×1668 | 14 | 14 | 0 | 0 |
| 768×1024 | 648×1151 | 14 | 14 | 0 | 0 |
| 390×844 | 284×505 | 8主要領域 | 14 | 0 | 0 |
| 360×800 | 254×451 | 8主要領域 | 14 | 0 | 0 |

確認済み操作:

- 図のMAP 3をクリックすると `map-certainty` へ移動。
- ハブから既存Ch3へ進むと旧URL `#page-3` を維持。
- ブラウザ「戻る」でCh3 → MAP 3 → Homeと2段階で復帰。
- 5区分の現在地は `main-map` を表示。
- 拡大モーダルは開閉、Esc、背景スクロール抑制、起動ボタンへのフォーカス復帰が動作。
- 図上リンクはフォーカス可能で、EnterからMAP 1へ移動。
- 学習索引はZone、Map stage、Topic groupの3フィルターを表示。
- 360/390/768/1440pxで本文リンクの枠外はみ出し0。

## ローカル保護対象

元の作業フォルダには、今回の開始前から次の未コミット変更があった。

- `js/references.js`
- `non-rct-observational-studies.html`
- `oncology-outcomes.html`

この3ファイルは今回のコミットへ含めていない。クリーンworktreeの公開内容はGitHub基準版を保持する。
