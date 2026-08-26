# クリック可能なEBM→GRADE図の実装仕様

## 結論

実装可能です。古典的なHTML `<map><area>` は、レスポンシブ画像で座標補正が必要になり、アクセシビリティも弱いため採用しません。

**推奨方式は、画像を`position: relative`のラッパーに入れ、その上へ百分率座標のHTMLリンク／ボタンを重ねる方式です。**

`map-hotspots.json` に初期座標を記載しています。

---

# 1. 必須構造

```html
<section class="home-learning-map" aria-labelledby="ebm-grade-map-title">
  <h2 id="ebm-grade-map-title">EBMからGRADEへ：全体学習マップ</h2>
  <p>図の各領域を押すと、対応する章へ進みます。</p>

  <div class="ebm-grade-map-shell">
    <img
      src="images/ebm-grade-map.png"
      width="941"
      height="1672"
      alt="EBMからGRADEへ進む学習構造を示す図。下に同じ項目のテキストリンクがあります。"
    >

    <a class="ebm-grade-hotspot"
       href="#map-clinical-question"
       data-map-target="map-clinical-question"
       style="--left:0.850%;--top:29.964%;--width:30.074%;--height:16.089%;"
       aria-label="MAP 1 Clinical Question（PICO）を開く"></a>
  </div>

  <nav class="ebm-grade-map-links" aria-label="図と同じ学習項目">
    <!-- 全ホットスポットと同じリンクをテキストでも並べる -->
  </nav>
</section>
```

## JavaScript

現在の`script.js`は`window.showContent(contentId)`を公開しています。SPA内の章はこれを使います。

```js
document.querySelectorAll('[data-map-target]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = link.dataset.mapTarget;
    if (typeof window.showContent === 'function' && target) {
      event.preventDefault();
      window.showContent(target);
    }
  });
});
```

別HTMLページへ進むリンクは通常の`href`を使います。

---

# 2. クリック領域

初期領域は `map-hotspots.json` を正本にします。

## 主領域

- 07 MAP 1 PICO
- 08 MAP 2 重要アウトカム
- 09 MAP 3 確実性
- 10 SoF
- 11 MAP 4 EtD
- 12 MAP 5 推奨の方向と強さ
- 13 4つの推奨パターン
- 14 MAP 6 EBM 5A × Core GRADE

## 副領域

- 01 EBM以前／歴史
- 02 批判的吟味
- 03 SR／メタ分析
- 04 EBM意思決定
- 05 GRADE
- 06 Core GRADE

副領域は横幅が狭いため、スマホ画像上では非表示にしても構いません。ただし下のテキストリンク一覧には必ず残します。

---

# 3. 視覚仕様

通常時は透明に近くし、図を邪魔しません。

hover / focus時：

- 2〜3pxの枠
- 半透明背景
- 項目名ツールチップ
- 明瞭な`focus-visible`
- `z-index`上昇

クリック領域を常時派手に表示して図を読みにくくしないでください。

---

# 4. モバイル仕様

この画像は縦長です。スマホでは以下を守ります。

1. 画像幅は100%、高さauto。
2. 主領域は画像上でクリック可能。
3. 小さな副領域は画像上で無理に押させない。
4. 直下に同等の1列リンク一覧を置く。
5. 既存の拡大モーダルを流用して、画像全体を拡大閲覧できるようにする。
6. モーダル内でもリンクを押させる設計にしない。拡大は読むため、移動は本体またはリンク一覧から行う。
7. 44px相当のタップ領域を確保する。
8. `prefers-reduced-motion`に対応する。

---

# 5. アクセシビリティ

画像内文字だけを唯一の情報源にしてはいけません。

必須：

- 意味のある`alt`
- 同じ項目のHTMLリンク一覧
- キーボード操作
- `aria-label`
- `focus-visible`
- 色だけに依存しない
- `tab`順は図の学習順
- スクリーンリーダーで重複しすぎないよう、画像は概要alt、詳細はリンク一覧

---

# 6. ルーティング

## SPA内

```text
data-map-target -> contentId -> window.showContent(contentId)
```

## 別HTML

```text
href="meta-analysis-methods.html"
href="learning-index.html"
```

## 旧URL

`#page-N`、旧`data-idx`は維持します。

新ホットスポットは旧番号ではなく`contentId`を使ってください。

---

# 7. 座標調整手順

1. `clickable-map-prototype.html`を開く。
2. hover / focusで各領域を確認する。
3. `ebm-grade-map-hotspots-preview.png`の番号と照合する。
4. 画像の枠全体ではなく、意味のまとまりを覆うように調整する。
5. Chrome、Edge、Firefox、Safari相当で確認する。
6. 360px、768px、1440px幅で確認する。
7. 最終値を`map-hotspots.json`へ戻す。
8. HTMLへ直書きせず、可能ならJSONから生成する。

---

# 8. 失敗時の扱い

技術的に失敗した場合でも、画像を削除してはいけません。

フォールバック：

1. 画像を最初に表示
2. 直下に図と同じ章リンク
3. 画像クリック領域のみ一時停止

ただし、現在の構造では`showContent(contentId)`があるため、クリック実装を断念する合理的理由はほぼありません。
