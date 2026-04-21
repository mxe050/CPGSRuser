# LinkedIn ピックアップ更新手順

Ch23 の「Guyatt先生 LinkedIn ピックアップ」を最新状態に保つための手順書。

## 更新頻度

月次（毎月第1週など）に実施を推奨。

## 手順

### 1. LinkedInからテキストを取得

1. ブラウザでLinkedInにログイン
2. 次のURLを開く：<https://www.linkedin.com/in/guyattgh/recent-activity/all/>
3. スクロールで必要な期間分の投稿を表示させる
4. ページ全体を選択（Ctrl+A）→ テキストとしてコピー（Ctrl+C）
5. テキストファイルとして保存（例：`linkedin-snapshot-YYYY-MM.txt`）

### 2. パース＆厳選

取得したテキストは「フィード投稿番号 N」で区切られた形式になっています。各投稿から以下を抽出：

- 投稿ID（内容から適切な英小文字ID）
- 投稿日（「1日前」「1週間前」等）
- トピック（NMA / MID / 観察研究 / SDM / 方法論 等）
- コメント本文（Guyatt先生の短評）
- 外部リンクURLとタイトル
- 関連章（本アプリのどの章に関連するか）

**厳選基準**：
- CPG/SR読み手に直接関連するもの（GRADE、MID、RoB、SoF、SDM、信頼性、方法論）を優先
- 日常臭の強い投稿（旅行、家族、学生の感想）は限定的に採用
- リンク切れがある投稿は除外

### 3. JSON更新

`data/linkedin-picks.json` を編集：

```json
{
  "version": "1.x",
  "sourceUrl": "https://www.linkedin.com/in/guyattgh/recent-activity/all/",
  "snapshotDate": "2026-MM",
  "description": "...",
  "picks": [
    {
      "id": "unique-id",
      "daysAgo": 7,
      "topic": "NMA解釈",
      "comment": "（Guyatt先生の短評を日本語に訳すか英文のまま）",
      "externalTitle": "（リンク先タイトル）",
      "externalUrl": "https://lnkd.in/...",
      "relatedChapter": "Ch10"
    },
    ...
  ]
}
```

### 4. 動作確認

1. `index.html` をローカルブラウザで開く
2. Ch23 に移動
3. 新規投稿が表示されるか、フィルタボタンが正しく動作するか確認

### 5. コミット＆プッシュ

```bash
cd CPGSRuser
git add data/linkedin-picks.json
git commit -m "chore(linkedin): update snapshot YYYY-MM"
git push origin main
```

GitHub Pagesが自動更新される（通常1-2分以内）。

---

## 将来の自動化

認証が必要なためClaude/APIからの自動取得は困難。可能な自動化案：
- LinkedIn公式API（ただしアカウント認証・利用制限あり）
- RSSビューア経由（対応していれば）
- Playwright / Puppeteer でのログイン済みブラウザ駆動（個人環境向け）

現時点では手動更新が現実的。
