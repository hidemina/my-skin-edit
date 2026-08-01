# オルビスユー ドット案件 Luna引継ぎ（2026-08-01）

## 最初に読むもの

次の順で全文を確認すること。

1. このファイル
2. リポジトリ直下の `AGENTS.md`（存在する場合）
3. `PINTEREST_ONE_BY_ONE_QUALITY_RULE.md`
4. `PINTEREST_TYPOGRAPHY_DESIGN_RULE.md`
5. `production/orbis-u-dot-trial/qa-checklist.md`

画像制作・Pinterest投稿・LP修正では、ユーザーが過去に出したNGを最優先する。画像を再生成する前に、既存の完成画像とQA記録を確認する。

## Lunaの作業前提

- ユーザー画面ではモデルが `5.6 Luna`、推論強度が `非常に高い` になっている。
- ただしモデル名だけを根拠に合格扱いにせず、必ず実ファイル・実ページ・実URLで検品する。
- 画像生成結果は同一品質を保証できないため、既存の決定論的な文字組みと原寸QAを省略しない。

## 現在のGOALと状態

オルビスユー ドットLPへの入口を増やすため、検索意図と生活ベネフィットが異なる追加Pinterestピン6枚を制作し、過去NGを原寸検品し、1枚ずつ公開して導線と計測を確認するGOALは完了済み。

- 追加ピン: 04〜09の6枚
- Pinterestボード: `大人のスキンケア選び`
- 6枚すべて1000×1500px、原寸・300px幅で検品済み
- 公開ピン → 固有UTM付きLP → felmat → オルビス公式ページを6枚すべて確認済み
- felmat計測ピクセル: `J4981V.7111727B.D139341N (1×1)`
- 既存の画像は完成・検品済み。再生成不要。

## 公開ピンURLとUTM

- ピン04: https://jp.pinterest.com/pin/893260907360824232/ — `pin04_40s_no_hesitation`
- ピン05: https://jp.pinterest.com/pin/893260907360824380/ — `pin05_complete_basics_980`
- ピン06: https://jp.pinterest.com/pin/893260907360824430/ — `pin06_decide_after_7days`
- ピン07: https://jp.pinterest.com/pin/893260907360824459/ — `pin07_simple_routine_order`
- ピン08: https://jp.pinterest.com/pin/893260907360824531/ — `pin08_full_sequence_trial`
- ピン09: https://jp.pinterest.com/pin/893260907360824607/ — `pin09_one_time_no_subscription`

各投稿のタイトル・説明・代替テキスト・リンクは、次の投稿シートを正本として扱う。

- `production/orbis-u-dot-trial/pin-04.txt`〜`pin-09.txt`
- 個別QA: `production/orbis-u-dot-trial/pin-04-qa.md`〜`pin-09-qa.md`

## LP・収益リンク

- 公開LP: https://hidemina.github.io/my-skin-edit/lp/orbis-u-dot-trial/
- felmat収益リンク: https://t.felmat.net/fmcl?ak=J4981V.1.7111727B.D139341N
- felmat計測ピクセル: https://t.felmat.net/fmimp/J4981V.7111727B.D139341N
- 公式遷移先（felmat転送）: `https://www.orbis.co.jp/p/40000127/330940/` 配下
- 公式ページ: https://pr.orbis.co.jp/cosmetics/udot/100/
- LPタイトル: `オルビスユー ドット7日間体験セット｜MY SKIN EDIT`
- LP内CTA: felmatリンク3件

## 直近のLP修正

ユーザー指摘のスマホ表示だけを修正した。

- 「試したかったアイテムも。」が「ムも。」だけ残る途中改行を解消
- 「『買う前に試す』を選ぶ。」が「ぶ。」だけ残る途中改行を解消
- `white-space: nowrap` と `wbr` で意味単位の改行を指定
- `980` は価格訴求として大きく表示する意図があり、変更していない
- 375px幅のローカル実ファイルと公開LPで、各語句が1行単位になることを確認済み
- 変更ファイル: `public/lp/orbis-u-dot-trial/index.html` のみ
- コミット: `941dd44 Fix mobile headline wrapping`
- `origin/main` へpush済み、公開反映確認済み

## 画像・文字の絶対NG

- 人物の顔・髪・首・手・腕・服へ、文字背景ぼかし、白い霧、半透明パネル、フェザー、グラデーション、露出ベールを1pxも重ねない。
- 人物・商品・重要部分へ文字やCTAを重ねない。
- 商品の容器、外箱、ラベル、価格、注記、セット内容を上下左右で見切れさせない。
- `PR`、注記、安全余白、商品下部を切らない。
- 指定サイズ1000×1500pxを厳守する。
- ブラウザ縮小表示だけで合格にせず、保存した最終PNGを原寸で開く。
- 数字だけを別基準線・別サイズ・別書体にして、日本語より上下にずらさない。
- 同一見出し内の上端・下端・中心・字間・行間・左右の基準線を揃える。
- 助詞だけ、数字だけ、商品名の一部だけを不自然に孤立させない。
- 画面の25%を超える意味のない空白、人物を端へ追いやる構図、コピー・人物・商品の大きな死に余白を作らない。
- AI人物は架空の成人日本人女性。過剰な美肌、巨大な目、極端な小顔、陶器肌、効果保証のビフォーアフターは禁止。
- 実物商品画像はAIで描き直さず、公式画像を元ファイルのまま合成する。
- 指定日本語・価格・PR表記を一字一句変えない。

## 画像作業の必須手順

1. 依頼内容を整理する。
2. 完成プロンプトを提示し、ユーザー承認を待つ（承認済みの既存案件はその記録を確認）。
3. 画像は1枚ずつ制作する。写真段階と文字入れ後を分ける。
4. 原寸で四辺、顔、髪、手指、商品、価格、注記、PR、安全余白を確認する。
5. 300px幅で顔・主見出し・主要商品が同時に認識できるか確認する。
6. 日本語と数字の改行、基準線、文字化け、見切れを確認する。
7. QA記録を更新してから公開へ進む。

## Git・作業ツリー

- リポジトリ: `C:\Users\owner\Documents\ピンタレストアフィ\sites\my-skin-edit`
- ブランチ: `main`
- 最新コミット: `941dd44`
- `production/orbis-u-dot-trial/qa-checklist.md` はユーザー作業由来の未コミット変更。勝手に戻さない。
- 次の未追跡一時ファイルは触らない・削除しない・コミットしない。
  - `.preview-err.log`, `.preview-out.log`
  - `my-skin-edit-v2.tar`〜`my-skin-edit-v6.tar`
  - `production/orbis-u-dot-trial/pin-01-base-v2.png`
  - `production/orbis-u-dot-trial/pin-02-base-v2.png`
  - 追加ピンの既存base/preview/QA/txt、`rotation-state.json`
  - `public/pins/orbis-u-dot-trial-v4-04.png`〜`v4-09.png`
  - `scripts/render_orbis_udot_pin4_v1.py`〜`render_orbis_udot_pin9_v1.py`
- 変更対象を限定する場合は、必ず明示ファイルだけをstageする。`git add -A`は禁止。

## 次に何か修正する場合

- ユーザーが「ここだけ」と指定したら、指定箇所以外の構図・文言・画像・リンクを変更しない。
- LPならローカル実ファイルを修正後、375px幅と通常幅を確認し、GitHub Pages反映後に公開URLでも再確認する。
- Pinterestなら1枚ずつ操作し、公開URLを記録してから次へ進む。
- 完了報告では、変更箇所、実検品結果、公開URLまたはコミットを簡潔に記載する。
