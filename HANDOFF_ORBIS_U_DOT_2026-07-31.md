# オルビスユー ドット案件 引継ぎ

## 継続するGOAL

オルビスユー ドット7日間体験セットについて、専用LPをGitHub Pagesへ公開し、felmat収益リンクの遷移と計測を確認する。ピン3枚をPinterestへ投稿し、公開ピン → LP → ASP公式ページまでの導線確認を完了する。

## 現在地

- 広告レギュレーションと公式情報：確認済み
- 実物商品画像：公式素材を取得・LPとピンへ配置済み
- LP用AIモデル画像3点：生成・配置済み
- 専用LP：制作・ローカル検品・スマホ幅検品済み
- ピン3枚：制作・1000×1500px・目視検品済み
- Git：`638f77e Add Orbis U Dot trial campaign` を `origin/main` へpush済み
- GitHub Pages：デプロイ開始済み。公開反映の最終確認は未完了
- Pinterest投稿：未実施
- 最終導線確認：未実施

## 作業場所

- リポジトリ：`C:\Users\owner\Documents\ピンタレストアフィ\sites\my-skin-edit`
- LP：`public/lp/orbis-u-dot-trial/index.html`
- 制作資料：`production/orbis-u-dot-trial/`
- 商品画像：`public/assets/products/orbis-u-dot-trial/`
- LP人物画像：`public/assets/lp-scenes/orbis-u-dot-trial/`
- 投稿画像：
  - `public/pins/orbis-u-dot-trial-v1-01.png`
  - `public/pins/orbis-u-dot-trial-v1-02.png`
  - `public/pins/orbis-u-dot-trial-v1-03.png`
- 投稿文・タイトル・リンク：
  - `production/orbis-u-dot-trial/pin-01.txt`
  - `production/orbis-u-dot-trial/pin-02.txt`
  - `production/orbis-u-dot-trial/pin-03.txt`
- QA：`production/orbis-u-dot-trial/qa-checklist.md`

## 公開URLと収益リンク

- 公開LP：`https://hidemina.github.io/my-skin-edit/lp/orbis-u-dot-trial/`
- felmat夏用収益リンク：`https://t.felmat.net/fmcl?ak=J4981V.1.7111727B.D139341N`
- felmat計測ピクセル：`https://t.felmat.net/fmimp/J4981V.7111727B.D139341N`
- 現在の公式遷移先：`https://www.orbis.co.jp/p/40000127/330940/`
- 公式ページ：`https://pr.orbis.co.jp/cosmetics/udot/100/`

## 確認済みオファー

- オルビスユー ドット 豪華7日間トライアルキット
- 初回限定 980円（税込）
- 送料無料
- 定期購入ではない
- 洗顔料14g、化粧水20mL、保湿液9g、リンクルブライトセラム7g、オフクリーム1包、吸水アームバンド
- 年齢に応じたお手入れ等の注記をLPへ掲載済み
- 「たるみ」「若返り」「根本改善」「肌再生」などの禁止・危険表現は不使用
- PR表記、AIモデル表記、アフィリエイト表記を掲載済み

## 次に実行する順番

1. 公開LPがHTTP 200で、最新タイトルと画像が配信されていることを確認する。
2. スマホ幅で横スクロール・文字切れ・画像切れがないことを確認する。
3. LP内の3つのCTAがfelmat夏用収益リンクへ遷移することを確認する。
4. 計測ピクセルがHTMLに1件あり、リクエストされることを確認する。
5. Pinterestへ3枚を順番に投稿する。タイトル・説明・リンク・ボードは各`pin-0X.txt`をそのまま使用する。
6. 各投稿後に公開ピンURLを記録する。
7. 各公開ピンからUTM付きLPへ遷移することを確認する。
8. LP CTAからfelmat経由でオルビス公式ページへ遷移することを確認する。
9. `qa-checklist.md`を完了へ更新し、必要なら追加コミット・pushする。
10. 全条件を証拠付きで確認した後だけGOALをcompleteにする。

## 投稿先

- Pinterestアカウント：MY SKIN EDIT（ログイン状態はブラウザに保持されている想定）
- ボード：`大人のスキンケア選び`
- 投稿は一枚ずつ実行し、公開URL取得後に次へ進む。

## 注意

- `.preview-err.log`、`.preview-out.log`、`my-skin-edit-v2.tar`〜`v6.tar`は既存の未追跡ファイル。追加・削除・コミットしない。
- 画像3枚は検品済みなので再生成不要。
- ユーザーは画像承認を省略して最後まで進めることを明示済み。
- 現タスクでは公開確認用の外部通信承認が中断されたため、新タスクではブラウザ操作を優先する。
