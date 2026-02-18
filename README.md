# ハダシル - Netlify デプロイ手順

## 🎯 これで実現すること

✅ APIキーをGitHubに載せない（完全に安全）
✅ パスワード「hadashiru2025」だけで審査員が使える
✅ コード内にAPIキーが一切書かれない

---

## 📁 必要なファイル

```
hadashiru/
├── index_full.html
├── app_full.js
├── database.js
├── onboarding.js
├── netlify.toml
├── netlify/
│   └── functions/
│       └── gemini-proxy.js
└── README.md（このファイル）
```

---

## 🚀 Netlifyデプロイ手順

### STEP 1　GitHubリポジトリにプッシュ

```bash
git add .
git commit -m "Netlify Functions対応"
git push
```

⚠️ **APIキーは絶対にコミットしない**（app_full.jsにも入っていません）

---

### STEP 2　Netlifyでサイト作成

1. [app.netlify.com](https://app.netlify.com) にアクセス
2. GitHubアカウントでログイン
3. 「Add new site」→「Import an existing project」
4. GitHub連携 → リポジトリ「hadashiru」を選択
5. Build settings:
   - Build command: (空欄)
   - Publish directory: `.`
   - Functions directory: `netlify/functions` (自動検出されます)
6. 「Deploy site」をクリック

---

### STEP 3　環境変数を設定

1. デプロイしたサイトの「Site configuration」→「Environment variables」
2. 「Add a variable」で以下2つを追加：

```
Key: GEMINI_API_KEY
Value: （あなたの実際のGemini APIキー）

Key: APP_PASSWORD
Value: hadashiru2025
```

3. 「Save」

---

### STEP 4　再デプロイ

1. 「Deploys」タブ
2. 「Trigger deploy」→「Deploy site」

---

## ✅ 完了

URLが発行されます（例：`https://hadashiru-demo.netlify.app`）

**審査員への共有内容：**
```
URL: https://あなたのサイト名.netlify.app
パスワード: hadashiru2025
```

---

## 🔐 セキュリティ

- GitHubにAPIキーなし
- Netlifyの環境変数は暗号化保存
- パスワードが合わないとAPI使えない
- ブラウザのDevToolsでもAPIキーは見えない

---

## 🖥️ ローカル開発（オプション）

Netlify CLI使用：

```bash
npm install -g netlify-cli
netlify dev
```

環境変数は `.env` ファイルに：

```
GEMINI_API_KEY=あなたのAPIキー
APP_PASSWORD=hadashiru2025
```

---

## ❓ トラブルシューティング

### エラー: 「パスワードが正しくありません」

→ Netlify環境変数の `APP_PASSWORD` を確認

### エラー: 「APIキーが設定されていません」

→ Netlify環境変数の `GEMINI_API_KEY` を確認し、再デプロイ

### 関数が動かない

→ `netlify.toml` と `netlify/functions/gemini-proxy.js` が正しく配置されているか確認
