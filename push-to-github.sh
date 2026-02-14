#!/bin/bash
# GitHubにプッシュするためのスクリプト
# 使い方: GitHubのユーザー名を設定してから実行してください

# ここにGitHubのユーザー名を入力
GITHUB_USERNAME="YOUR_USERNAME"

# 現在のディレクトリ
cd "/Users/hirotyan/Desktop/順番通知アプリ/WebApp"

# リモートリポジトリを追加
git remote add origin "https://github.com/${GITHUB_USERNAME}/math-complement-10.git"

# mainブランチにプッシュ
git branch -M main
git push -u origin main

echo "✅ 完了しました！"
echo "以下のURLでアクセスできます："
echo "https://${GITHUB_USERNAME}.github.io/math-complement-10/"
