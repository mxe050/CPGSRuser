# Codex Work用：EBMからGRADEへの学習マップを別HTMLアプリへ移植する

## 依頼

対象の既存HTMLアプリへ、同梱の `ebm-grade-map.png` を中心とする学習構造を移植してください。

これは既存教材の短縮や置換ではありません。既存の本文、見出し、図、表、動画、計算機、演習、内部アンカー、外部リンク、旧URLを完全に保持したまま、次の5分類による入口を追加・再編する作業です。

1. START
2. EBM BASIC
3. EBM → GRADE MAIN MAP
4. TOPICS
5. RESOURCES

## 最初に行うこと

1. リポジトリルート、branch、HEAD、remote、未コミット変更を確認する。
2. GitHub側の最新版を読み取り専用で取得し、ローカルとの差を確認する。
3. 未コミット変更や未追跡ファイルを上書きしない。
4. 全HTML、CSS、JavaScript、JSON、画像、ルーティング、旧URLを監査する。
5. 変更前baselineを作る。
6. `03_CONTENT_MIGRATION_MATRIX.md` を移植先の実際のページIDへ書き換えた対応表を作る。

## 絶対条件

- 既存本文を削除・短縮・要約へ置換しない。
- 重複して見えることを理由に削除しない。
- 既存の図、表、動画、iframe、details、計算機、演習を削除しない。
- 既存リンク、内部アンカー、route、hash、query、filenameを削除しない。
- 既存ページを空の転送ページへ置き換えない。
- 新しい図だけを唯一のナビゲーションにしない。
- EBM BASICをGRADE工程へ無理に分散しない。
- 図に入りにくい内容をMAIN MAPへ無理に押し込まずTOPICSへ置く。
- GRADE Working Group、G3、GRADE Book、Core GRADE、個人講演を同一視しない。
- GuyattとSchünemannを対立する二つの流派として描かない。

## 移植するファイル

- `ebm-grade-map.png`
- `map-hotspots.json`
- `clickable-map-prototype.html`
- `04_CLICKABLE_MAP_SPEC.md`
- `05_PRESERVATION_QA_CHECKLIST.md`
- `06_CORE_GRADE_SOURCES.md`
- 必要に応じて `ebm-grade-map-hotspots-preview.png`

## 実装方針

### 1. 画像

画像をトップページのタイトルと短い説明の直後へ置き、最初の主要学習要素にします。画像比率は941×1672です。

### 2. クリック領域

古典的な `<map><area>` は使いません。画像を `position: relative` の要素で囲み、`map-hotspots.json` の百分率座標を使って通常のHTMLリンクを重ねます。

すべての領域に次を設定します。

- 実際の `href`
- 移植先の安定したページID
- `aria-label`
- keyboard focus
- hover / focus-visibleの枠とラベル

SPAの場合は、既存routerを使ってページを開きます。既存routerを捨てたり、旧URLを新URLへ強制置換したりしません。

### 3. テキストリンク

画像直下に14項目すべてのHTMLリンク一覧を置きます。スマホではこの一覧を主導線にします。

### 4. モバイル

- 主領域は画像上でクリック可能にする。
- 上段の小さな副領域は画像上から非表示でもよい。
- 14項目のテキストリンクはすべて残す。
- タップ領域は44px以上にする。
- 画像拡大モーダルを用意する。
- モーダルは読むために使い、複雑なクリック領域は再実装しない。

### 5. 新しいハブ

既存ページを分割せず、必要な場所に薄いハブを追加します。ハブには次だけを置きます。

1. この段階で答える問い
2. 60秒要約
3. 既存の詳しいページへのリンク
4. 図のどの場所か
5. 前後の段階
6. 関連TOPICS

既存ページが本文の正本、ハブが入口です。

## 移植先で作る対応表

実装前に次の表を作り、空欄が0になるまでコード変更を始めないでください。

| 新しい入口 | 移植先の既存ページIDまたはURL | 既存本文を維持 | 旧URLを維持 |
| --- | --- | --- | --- |
| EBM BASIC |  | Yes | Yes |
| MAP 1 PICO |  | Yes | Yes |
| MAP 2 重要アウトカム |  | Yes | Yes |
| BRIDGE SR・メタ分析 |  | Yes | Yes |
| MAP 3 確実性 |  | Yes | Yes |
| SoF |  | Yes | Yes |
| MAP 4 EtD |  | Yes | Yes |
| MAP 5 推奨 |  | Yes | Yes |
| MAP 6 Apply・Assess |  | Yes | Yes |
| T1〜T10 |  | Yes | Yes |
| RESOURCES |  | Yes | Yes |

## 検証

変更前と変更後を比較し、最低限次を自動検証してください。

- HTMLファイル数が減っていない。
- 既存IDと見出しがすべて残っている。
- 既存href、src、外部URL、内部アンカーがすべて残っている。
- figure、table、video、iframe、details、interactive elementが減っていない。
- 既存ページごとの本文量が大幅に減っていない。
- 14 hotspotのtargetがすべて存在する。
- 新分類から既存コンテンツすべてへ到達できる。
- orphan 0、unclassified 0、missing target 0。
- 旧URL、戻る・進む、ブラウザ履歴が動く。
- keyboard、focus-visible、skip link、alt、aria-labelが動く。
- 360px、390px、768px、1440pxで重なりとはみ出しがない。
- コンソールエラーがない。

## 作業順

1. 調査とbaseline
2. 新画像・JSON・CSS・JavaScript・ハブを追加
3. トップへ図を追加
4. 既存の旧図や説明を、削除せず適切なTOPICへ移動
5. 5分類のナビゲーションへ切り替え
6. 索引と現在地表示を更新
7. 保存検証
8. ブラウザQA
9. レビュー可能な単位でcommit
10. 指定された公開先へdeployし、公開URLを確認

一度に全HTMLを書き直さず、各段階で差分と保存検証を確認してください。

## 最終報告

- 新しい章立て
- 変更・追加ファイル
- 移動した内容
- baselineと変更後のHTML、ID、見出し、リンク、画像・媒体数
- hotspot 14件のtarget
- 旧URL検証件数
- PC・スマホQA結果
- 公開commitと公開URL
- 残課題
