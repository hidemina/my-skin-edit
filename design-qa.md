# Design QA — 10比較LPの全面画像改修

## Source visual truth

- ユーザー提供画像30枚（10カテゴリ×ヒーロー・悩み・ベネフィット）
- 保存先: `public/assets/lp-scenes/{LP名}/`
- 比較基準: `qa/eye-care-5/reference.png`
- 対象外: `public/lp/eye-care-5/`

## Implementation evidence

- 毛穴・キメ美容液 デスクトップ全体: `qa/lp-scenes/serum-pore-desktop.png`
- 毛穴・キメ美容液 悩み導線: `qa/lp-scenes/serum-pore-story-desktop.png`
- 敏感肌向け乳液・クリーム モバイルヒーロー: `qa/lp-scenes/sensitive-moisturizer-mobile-hero.png`
- 敏感肌向け乳液・クリーム モバイル悩み導線: `qa/lp-scenes/sensitive-moisturizer-mobile-story.png`
- デスクトップ viewport: 1280 × 720 CSS px
- モバイル viewport: 390 × 844 CSS px
- density normalization: ブラウザ表示密度1。画像はCSS `object-fit: cover` で表示枠へ適合
- state: 未操作・ライトテーマ

## Full-view comparison

- 30枚すべてを元画像としてそのまま使用し、AI生成容器・ピン画像・仮の商品画像への置換はしていない。
- 各LPのヒーローは、コピー領域と人物の視線が競合しない2カラム構成を維持した。
- ヒーローから選び方、悩み、選んだ後のベネフィット、比較表へ順に進む編集導線になっている。

## Focused region comparison

- 悩み画像は顔の局所的な乾燥・赤み・毛穴などが読めるクロップにした。
- ベネフィット画像は同一カテゴリ内の女性・光・背景の連続性を維持した。
- 画像上にHTMLテキストを重ねず、画像とコピーを独立させて可読性を確保した。

## Required fidelity surfaces

- Fonts / typography: 既存の明朝見出し、ゴシック本文、英字eyebrowを維持。見出しは30–52pxのレスポンシブ指定。
- Spacing / layout: デスクトップは画像・コピーの交互2カラム、モバイルは1カラム。10LPすべて横スクロールなし。
- Colors / tokens: MY SKIN EDITのワイン、インク、ローズ、アイボリーを共通CSSで維持。
- Image quality: 30/30画像が実寸で読み込まれ、自然幅・高さを取得。ヒーローは1122×1402、横画像は主に1536×1024。WebPへ最適化し、合計53.92MBから1.85MBへ軽量化。
- Copy / content: 各カテゴリ固有の悩み、選択軸、ベネフィットを記述。断定的な治療・改善保証は避けた。

## Interaction verification

- 10/10 LPでヒーロー、悩み、ベネフィットの3画像を確認。
- 10/10 LPで比較表アンカー `#compare` を確認。
- 10/10 LPで横方向のレイアウト崩れなし。
- 既存の購入カード・収益リンク・Pinterestリンクは変更していない。
- ブラウザコンソールエラー: 0
- `npm.cmd run build`: passed

## Comparison history

- P1: ヒーローがピン画像の流用で、LP本文との温度差が大きかった。30枚の専用人物画像へ全面置換。
- P1: 比較表へ急に遷移し、読者の悩みとベネフィットが不足していた。全10LPへ「SKIN CONCERN」「AFTER THE EDIT」を追加。
- P2: 画像の縦横比がカテゴリごとに異なり、表示枠が不安定だった。共通CSSでクロップ、角丸、影、モバイル比率を統一。
- Post-fix evidence: 上記デスクトップ・モバイルのブラウザキャプチャで再確認。

## Findings

- P0/P1/P2の未解決項目なし。
- P3: カテゴリごとに人物の顔立ちは異なる。各カテゴリ内の一貫性は維持されており、編集媒体として許容範囲。

final result: passed

## 2026-07-28 日本語改行QA

- 対象: アイケアLPを除く10LP
- 修正前の問題: 語句の途中、読点直後、末尾1文字だけで改行されていた
- 修正: ヒーロー見出しとストーリー見出しを、意味のまとまりごとの改行へ統一
- 本文: `line-break: strict` と `text-wrap: pretty` を適用
- 公開環境: 10/10 LPでストーリー見出しが各2行、横方向のはみ出し0px
- ビルド: `npm.cmd run build` passed
- 公開コミット: `5d99024`
- 確認URL: `https://hidemina.github.io/my-skin-edit/lp/dry-skin-toner-5/`

final result: passed
