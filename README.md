これは[Next.js](https://nextjs.org)のプロジェクトで[`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app)を使って作成されています。

## はじめに

まず、開発サーバーを起動します：

```bash
npm run dev
```

ブラウザで[http://localhost:3000](http://localhost:3000)を開くと、結果を確認できます。

`app/page.tsx`を編集することでページの内容を変更できます。ファイルを編集すると、自動的にページが更新されます。

このプロジェクトでは[`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)を使用して、[Geist](https://vercel.com/font)という新しいフォントファミリーを自動的に最適化・読み込みしています。

## 記事の追加方法

contentの中に新しくファイルを作成します。拡張子は.mdです。
ファイルの中身のテンプレは下記の通りです。
```bash
---
title: （タイトル）
date: "yyyy-mm-dd"
description: "見出し"
thumbnail: "/images/～.jpg"
---

## サブタイトル

本文
```

サムネイルの画像は publicのimagesに.jpgの形でアップロードをして、
上記のテンプレのthumbnailの部分にパスを入れてください。