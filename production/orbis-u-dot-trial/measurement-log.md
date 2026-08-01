# オルビスユー ドット追加ピン計測ログ

更新日: 2026-08-01
状態: 計測期間待ち（勝ち訴求未判定）

## 計測起点

- 6ピンの公開確認日: 2026-08-01
- 7日判定開始目安: 2026-08-08
- 14日判定開始目安: 2026-08-15
- 7日未満の数字で勝ち訴求を決めない。
- Pinterestの表示・保存・クリック、LP到達、GA4イベント、felmatクリックが揃うまで追加3ピンを公開しない。

## Pinterest対象

| ピン | 公開URL | utm_content | 表示 | 保存 | クリック | CTR |
|---|---|---|---:|---:|---:|---:|
| 04 | https://jp.pinterest.com/pin/893260907360824232/ | `pin04_40s_no_hesitation` | 未取得 | 未取得 | 未取得 | 未算出 |
| 05 | https://jp.pinterest.com/pin/893260907360824380/ | `pin05_complete_basics_980` | 未取得 | 未取得 | 未取得 | 未算出 |
| 06 | https://jp.pinterest.com/pin/893260907360824430/ | `pin06_decide_after_7days` | 未取得 | 未取得 | 未取得 | 未算出 |
| 07 | https://jp.pinterest.com/pin/893260907360824459/ | `pin07_simple_routine_order` | 未取得 | 未取得 | 未取得 | 未算出 |
| 08 | https://jp.pinterest.com/pin/893260907360824531/ | `pin08_full_sequence_trial` | 未取得 | 未取得 | 未取得 | 未算出 |
| 09 | https://jp.pinterest.com/pin/893260907360824607/ | `pin09_one_time_no_subscription` | 未取得 | 未取得 | 未取得 | 未算出 |

CTRは `クリック ÷ 表示`。Pinterest画面の同一期間・同一指標で比較する。

## LP・GA4照合

- LP: `https://hidemina.github.io/my-skin-edit/lp/orbis-u-dot-trial/`
- GA4測定ID: `G-6E0471XS37`
- LPのCTAイベント: `affiliate_click`
- CTA属性: `affiliate_network=felmat`, `product_id=orbis-u-dot-trial`
- LP到達は、各URLの `utm_content` が保持されたページビューで確認する。
- CTA到達率は、各UTMのLP到達数に対する `affiliate_click` 数で算出する。

## felmat照合

- 収益リンク: `https://t.felmat.net/fmcl?ak=J4981V.1.7111727B.D139341N`
- 計測ピクセル: `J4981V.7111727B.D139341N`
- felmat側のクリック数はPinterestのクリック、GA4のCTAイベントと同一期間で照合する。
- 数値が取得できない場合は推測で補完せず、「未取得」と記録する。

## 勝ち訴求の判定ルール

1. 7日以上の同一期間データをそろえる。
2. 表示が極端に少ないピンは、CTRだけで勝者にしない。
3. CTR、LP到達率、CTA到達率を合わせて比較する。
4. 勝ち訴求を1〜2個に絞り、根拠となる数値をこのログへ追記する。
5. 判定後、追加3ピンを1枚ずつ制作・原寸／300px幅検品・公開する。
