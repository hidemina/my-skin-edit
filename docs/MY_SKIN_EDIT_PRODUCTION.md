# MY SKIN EDIT 量産フロー

品質を落とさず、1カテゴリを次の4段階で作ります。

## 1. 案件データを1ファイルへ入力

`data/production/beauty-category.template.json` を複製し、以下だけを入力します。

- カテゴリ名と見出し
- 悩み・ベネフィット文章
- 5商品の公式情報、商品画像、収益リンク
- ピン3枚の訴求角度

## 2. 不足を自動確認

```powershell
npm run production:check -- data/production/案件名.json
```

5商品、3シーン、3ピン、HTTPSリンク、重複ID、仮データを検査します。

## 3. LPと制作パックを生成

商品画像とシーン画像を指定場所へ保存してから実行します。

```powershell
npm run production:prepare -- data/production/案件名.json
```

生成物：

- `public/lp/{slug}/index.html`
- `production/{slug}/source.json`
- `production/{slug}/pin-prompts/` の承認用プロンプト3件
- `production/{slug}/qa-checklist.md`

既存LPは上書きしません。

## 4. ピンは1枚ずつ完成させる

ピン画像だけは一括生成しません。

1. 1枚目のプロンプトを提示
2. 承認後に写真を1枚生成
3. 顔・手・肌・余白を原寸検品
4. 実物商品と日本語を後工程で合成
5. 投稿情報と固有UTMを保存
6. 投稿とリンク確認を完了してから次の1枚へ進む

## 1カテゴリの完了条件

- LPのPC・スマートフォン表示確認
- 商品カード5件の収益リンク確認
- ピン3枚の原寸QA
- Pinterest投稿
- Pinterest → LP → ASP／楽天公式ページの動作確認
- GA4クリック計測確認
