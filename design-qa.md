# Design QA — トップページ案2

## Source visual truth

- 選定モック: `C:\Users\owner\.codex\generated_images\019f8796-06d9-7c62-9ea2-d502e4ca21f6\call_4vyg1Lgjr5TANJsBqZCFFSuM.png`
- 実装ページ: `public/index.html`
- ローカル確認URL: `http://127.0.0.1:4173/?v=editorial-2`
- 状態: 未操作・ライトテーマ

## Implementation evidence

- ファーストビュー: `qa/home-editorial-top.png`
- 商品テーマ導線: `qa/home-editorial-grid.png`
- viewport: 1265 × 768 CSS px
- 比較方法: 選定モックと実装スクリーンショットを同一の比較入力で目視確認

## Full-view comparison

- 選定モックの「左コピー／右3画像」「悩み別導線」「非対称の女性誌型グリッド」を実装した。
- 既存LPで使用中の人物写真を再利用し、ブランドのアイボリー、ネイビー、ローズを維持した。
- 旧トップの均一なカード一覧を廃止し、写真と記事カードの大小差で編集ページらしいリズムを作った。

## Required fidelity surfaces

- Fonts / typography: 明朝見出し、ゴシック本文、英字eyebrowを統一。見出しは意味のまとまりで改行。
- Spacing / layout: ヒーロー、悩み別導線、記事グリッドの間隔を段階化。デスクトップで横スクロールなし。
- Colors / tokens: `--ink`、`--paper`、`--rose`、`--sage`の既存トーンを維持。
- Image quality: 14/14画像が読込完了し、自然幅512px以上を確認。
- Copy / content: 10テーマすべてを維持し、各LPの比較軸が分かる説明へ整理。
- Interactions: 記事リンク10件、悩み別リンク4件を確認。主要カード全体をクリック可能にした。
- Browser errors: warning / error 0件。
- Responsive: 980px、700pxのブレークポイントを実装。1カラム化、画像比率、余白、文字サイズを調整。

## QA result

- P0: 0
- P1: 0
- P2: 0
- P3: 0

final result: passed
