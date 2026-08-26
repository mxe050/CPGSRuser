# CPGSR Reader 再構成パック

## 目的

`ebm-grade-map.png` を最初のページの主役にし、**EBMからGRADEへ進む流れ**を主軸として、CPGSR Reader の章立て・導線を再構成するための Codex Work 用資料です。

このパックは、現在の本文・図・表・動画・リンク・旧URLを削らず、**ナビゲーションと入口を作り直す**ことを最優先にしています。

## 同梱物

1. `01_CODEX_WORK_MASTER_PROMPT.md`  
   Codex Work にそのまま渡す実装指示書。

2. `02_NEW_INFORMATION_ARCHITECTURE.md`  
   新しい章立てと各枠の役割。

3. `03_CONTENT_MIGRATION_MATRIX.md`  
   現在の25章・独立ページ・外部導線を新構成へ移す対応表。

4. `04_CLICKABLE_MAP_SPEC.md`  
   クリック可能マップの設計、アクセシビリティ、モバイル仕様。

5. `05_PRESERVATION_QA_CHECKLIST.md`  
   「絶対に減らさない」ための移行工程と検証条件。

6. `map-hotspots.json`  
   `ebm-grade-map.png` 上のクリック領域を百分率で記載したデータ。

7. `clickable-map-prototype.html`  
   画像上の領域をクリックできるスタンドアロン試作。

8. `ebm-grade-map-hotspots-preview.png`  
   ホットスポット番号を重ねた確認用画像。

9. `ebm-grade-map.png`  
   新しい最初の図。

10. `core-grade-overview-source.png`  
    現在トップにある Core GRADE 全体像図の移動元資料。実リポジトリでは既存の `images/core-grade-overview.png` を削除せず、そのまま再利用してください。

## 使い方

1. ZIPを展開する。
2. Codex Work で対象リポジトリ `mxe050/CPGSRuser` を開く。
3. `01_CODEX_WORK_MASTER_PROMPT.md` を最初に渡す。
4. 同梱資料のパスを示し、段階実装を行わせる。
5. 変更後は既存検証に加え、新しいナビゲーション網羅性検証を必ず実行する。

## 最重要原則

- 本文を要約に置き換えない。
- 既存ページを消さない。
- 既存の `contentId`、`page-N`、内部アンカー、外部リンクを壊さない。
- 章の「移行」は、まず**分類・導線・表示順の変更**として行う。
- 既存内容を別ファイルへ物理移動するのは、保存検証が成立する場合だけに限定する。
- `Core GRADEアプローチ` の旧図はトップから外すが、画像と説明を削除せず、新トピック「Core GRADEとは」に移す。
