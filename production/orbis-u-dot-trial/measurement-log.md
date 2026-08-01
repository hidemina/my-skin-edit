# オルビスユー ドット追加ピン計測ログ

更新日: 2026-08-01
状態: 初動スナップショット記録済み（勝ち訴求未確定）

## 計測起点

- 6ピンの公開確認日: 2026-08-01
- 7日判定開始目安: 2026-08-08
- 14日判定開始目安: 2026-08-15
- 7日未満の数字で勝ち訴求を決めない。
- Pinterestの表示・保存・クリック、LP到達、GA4イベント、felmatクリックが揃うまで追加3ピンを公開しない。

## Pinterest対象

| ピン | 公開URL | utm_content | 表示 | 保存 | クリック | CTR |
|---|---|---|---:|---:|---:|---:|
| 04 | https://jp.pinterest.com/pin/893260907360824232/ | `pin04_40s_no_hesitation` | 4 | 0 | 0 | 0.0% |
| 05 | https://jp.pinterest.com/pin/893260907360824380/ | `pin05_complete_basics_980` | 2 | 0 | 0 | 0.0% |
| 06 | https://jp.pinterest.com/pin/893260907360824430/ | `pin06_decide_after_7days` | 5 | 0 | 0 | 0.0% |
| 07 | https://jp.pinterest.com/pin/893260907360824459/ | `pin07_simple_routine_order` | 5 | 0 | 0 | 0.0% |
| 08 | https://jp.pinterest.com/pin/893260907360824531/ | `pin08_full_sequence_trial` | 6 | 0 | 1 | 16.7% |
| 09 | https://jp.pinterest.com/pin/893260907360824607/ | `pin09_one_time_no_subscription` | 5 | 0 | 0 | 0.0% |

CTRは `クリック ÷ 表示`。Pinterest画面の同一期間・同一指標で比較する。

## 2026-08-01 初動スナップショット

- Pinterest分析画面: `analytics.pinterest.com/overview/`、アカウント `MY SKIN EDIT｜大人のコスメ比較`
- 期間: 過去7日間（2026/7/25〜2026/8/1）
- 対象: オーガニック、自分のピン、Pinterest表示のトップピン表
- ピン08（「化粧水だけじゃない｜洗顔から保湿まで7日間」）だけ外部クリック1件、表示6、CTR16.7%。
- ピン04〜07・09は外部クリック0件。保存は6枚すべて0件。
- ピン08は暫定候補に留める。表示6件のため、7〜14日データが揃うまで勝ち訴求とは確定しない。

## LP・GA4照合

- LP: `https://hidemina.github.io/my-skin-edit/lp/orbis-u-dot-trial/`
- GA4測定ID: `G-6E0471XS37`
- LPのCTAイベント: `affiliate_click`
- CTA属性: `affiliate_network=felmat`, `product_id=orbis-u-dot-trial`
- LP到達は、各URLの `utm_content` が保持されたページビューで確認する。
- CTA到達率は、各UTMのLP到達数に対する `affiliate_click` 数で算出する。
- GA4ホーム（過去7日間）: `affiliate_click` 17件。これはプロパティ全体の値であり、6ピン限定ではない。
- GA4イベント詳細（2026/7/4〜2026/7/31）: `product_id=orbis-u-trial` は3件・2ユーザー。新規6ピンだけに帰属させない。
- GA4で新規6ピンのUTM別LP到達数・CTA数を分離できるまで、勝ち判定には使わない。

## felmat照合

- 収益リンク: `https://t.felmat.net/fmcl?ak=J4981V.1.7111727B.D139341N`
- 計測ピクセル: `J4981V.7111727B.D139341N`
- felmat側のクリック数はPinterestのクリック、GA4のCTAイベントと同一期間で照合する。
- 数値が取得できない場合は推測で補完せず、「未取得」と記録する。
- felmatパートナー管理画面は未ログインのため、現時点のfelmat集計クリック数は未取得。

## 勝ち訴求の判定ルール

1. 7日以上の同一期間データをそろえる。
2. 表示が極端に少ないピンは、CTRだけで勝者にしない。
3. CTR、LP到達率、CTA到達率を合わせて比較する。
4. 勝ち訴求を1〜2個に絞り、根拠となる数値をこのログへ追記する。
5. 判定後、追加3ピンを1枚ずつ制作・原寸／300px幅検品・公開する。
