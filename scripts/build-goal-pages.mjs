import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourcePath = path.resolve(root, "..", "..", "docs", "MY_SKIN_EDIT_GOAL_PRODUCTS_2026-07-24.json");
const source = JSON.parse(fs.readFileSync(sourcePath, "utf8"));
const productById = Object.fromEntries(source.products.map((product) => [product.id, product]));

const categories = [
  {
    key: "pore-cleansing",
    slug: "pore-cleansing-5",
    eyebrow: "PORE CLEANSING EDIT",
    title: "30代の毛穴クレンジング5選",
    lead: "メイクの濃さ、洗い上がり、W洗顔の要否から選びやすく整理。毛穴汚れを落とす目的でも、こすりすぎない使い方を優先します。",
    theme: "#5f4b45",
    pale: "#f1e7e1",
    products: [
      { id: "attenir-black", size: "175mL", price: "2,200円", type: "オイル", fit: "W洗顔不要で時短したい", note: "数量限定品。微細クレイを配合した黒いクレンジングオイル。香りや在庫は購入画面で確認してください。" },
      { id: "fancl-black", size: "120mL", price: "2,090円〜", type: "オイル", fit: "濡れた手でも使いたい", note: "ブラック＆スムースタイプ。角栓・皮脂汚れを落としたい人向けの設計です。" },
      { id: "duo-black", size: "90g", price: "販売ページで確認", type: "バーム", fit: "バームの厚みでなじませたい", note: "炭・クレイを配合したバームタイプ。付属スパチュラで乾いた手に取り、やさしくなじませます。" },
      { id: "orbis-cleansing", size: "120mL", price: "1,980円〜", type: "オイル", fit: "無香料で選びたい", note: "濡れた手でも使用可能。使用後は洗顔料を使う案内です。" },
      { id: "banila-pore", size: "125mL", price: "販売ページで確認", type: "バーム", fit: "韓国コスメのバームを試したい", note: "クラリファイングを含む4タイプから選択できる販売ページ。選択内容を確認して購入してください。" }
    ]
  },
  {
    key: "dry-toner",
    slug: "dry-skin-toner-5",
    eyebrow: "DRY SKIN TONER EDIT",
    title: "乾燥肌向け化粧水5選",
    lead: "医薬部外品、しっとり感、容量、アルコール無添加表示を比較。化粧水だけで完結させず、乳液やクリームまで含めて保湿します。",
    theme: "#52685d",
    pale: "#e8f0eb",
    products: [
      { id: "dprogram-moist", size: "125mL", price: "販売ページで確認", type: "医薬部外品", fit: "乾燥と肌荒れを防ぎたい", note: "しっとりした使用感の敏感肌向け薬用化粧水。2プッシュを手でなじませる案内です。" },
      { id: "curel-iii", size: "150mL", price: "販売ページで確認", type: "医薬部外品", fit: "とてもしっとりを選びたい", note: "消炎有効成分アラントイン配合。弱酸性、無香料、無着色、アルコールフリー表示です。" },
      { id: "ihada-rich", size: "180mL", price: "販売ページで確認", type: "医薬部外品", fit: "ワセリン配合で選びたい", note: "高精製ワセリンと2つの肌荒れ防止有効成分を配合した、とてもしっとりタイプです。" },
      { id: "minon-ii", size: "150mL", price: "販売ページで確認", type: "化粧品", fit: "とろみのある化粧水が好き", note: "もっとしっとりタイプ。無香料・無着色・弱酸性・アルコール無添加表示です。" },
      { id: "matsuyama-rich", size: "150mL", price: "販売ページで確認", type: "化粧品", fit: "30代の乾燥ケアで選びたい", note: "角層をうるおいで満たし、なめらかに整える保湿化粧水。アルコールフリー表示です。" }
    ]
  },
  {
    key: "bright-serum",
    slug: "brightening-serum-5",
    eyebrow: "BRIGHTENING SERUM EDIT",
    title: "シミ・くすみ対策美容液5選",
    lead: "薬用美白美容液と、乾燥によるくすみに使う化粧品を分けて比較。美白は「メラニンの生成を抑え、シミ・そばかすを防ぐ」効能です。",
    theme: "#7a5c69",
    pale: "#f2e7ec",
    products: [
      { id: "haku-iv", size: "45g", price: "販売ページで確認", type: "医薬部外品", fit: "薬用美白を本格的に続けたい", note: "2種の美白有効成分を配合。朝晩、化粧水の後に使う美容液です。" },
      { id: "transino-signal", size: "30g", price: "販売ページで確認", type: "医薬部外品", fit: "トラネキサム酸で選びたい", note: "美白・肌荒れ防止有効成分トラネキサム酸と、グリチルリチン酸2Kを配合しています。" },
      { id: "melanocc-premium", size: "20mL", price: "販売ページで確認", type: "医薬部外品", fit: "滴下式の薬用美容液がいい", note: "美白有効成分の活性型ビタミンCを配合。顔全体または気になる部分になじませます。" },
      { id: "kiso-vcrs", size: "20mL", price: "販売ページで確認", type: "化粧品", fit: "乾燥くすみを成分で選びたい", note: "水溶性フラーレン、α-アルブチン、ビタミンC誘導体を配合。薬用美白美容液ではありません。" },
      { id: "orbis-bright", size: "36mL", price: "販売ページで確認", type: "医薬部外品", fit: "無香料・弱酸性で選びたい", note: "美白有効成分デクスパンテノールWを配合。化粧水の後、保湿液の前に使います。" }
    ]
  },
  {
    key: "pore-wash",
    slug: "pore-face-wash-5",
    eyebrow: "PORE WASH EDIT",
    title: "毛穴ケア洗顔5選",
    lead: "酵素パウダー、泥スクラブ、泡立てないジェルを比較。毎日使える表示でも、乾燥や刺激を感じたら使用頻度を調整します。",
    theme: "#4f6268",
    pale: "#e7eff1",
    products: [
      { id: "fancl-deep", size: "30個", price: "1,980円〜", type: "酵素パウダー", fit: "個包装で使いたい", note: "酵素・炭・クレイを配合した1回使い切りタイプ。十分に泡立てて使います。" },
      { id: "suisai-n", size: "0.4g×32個", price: "販売ページで確認", type: "酵素パウダー", fit: "2つの酵素で選びたい", note: "プロテアーゼとリパーゼ、アミノ酸系洗浄成分を配合。1カプセルを泡立てます。" },
      { id: "obagi-dp", size: "0.4g×30個", price: "販売ページで確認", type: "酵素パウダー", fit: "ビタミンC配合で選びたい", note: "ビタミンCと2種類の酵素を配合したパウダー洗顔。1回1カプセルが目安です。" },
      { id: "kanebo-mud", size: "130g", price: "販売ページで確認", type: "泥スクラブ", fit: "ペーストの吸着感が欲しい", note: "泥とスクラブを配合。通常洗顔と、週1回程度の部分マスク洗顔の2通りで使えます。" },
      { id: "lunasol-polish", size: "150g", price: "3,850円〜", type: "ジェル", fit: "泡立てず朝も使いたい", note: "2026年3月発売の泡立てないジェル洗顔。濡らした顔になじませて洗い流します。" }
    ]
  },
  {
    key: "korean-serum",
    slug: "korean-serum-5",
    eyebrow: "K-BEAUTY SERUM EDIT",
    title: "韓国コスメ美容液5選",
    lead: "高配合ナイアシンアミド、グルタチオン配合、プロポリス、導入美容液を目的別に比較。高濃度成分は少量から試します。",
    theme: "#625677",
    pale: "#ece8f3",
    products: [
      { id: "cosrx-niacin", size: "20mL", price: "2,108円", type: "ナイアシンアミド15％", fit: "皮脂・キメを成分で選びたい", note: "ナイアシンアミド15％配合。高配合のため、肌の様子を見ながら少量から使います。" },
      { id: "anua-darkspot", size: "30mL", price: "販売ページで確認", type: "ナイアシンアミド＋TXA", fit: "複数成分の組み合わせで選びたい", note: "ナイアシンアミド、トラネキサム酸、アルブチンを配合した韓国化粧品です。" },
      { id: "numbuzin-5", size: "30mL", price: "2,618円", type: "グルタチオンC", fit: "乾燥くすみとツヤを意識したい", note: "ナイアシンアミド、パンテノール、トラネキサム酸、グルタチオンなどを配合しています。" },
      { id: "boj-glow", size: "30mL", price: "販売ページで確認", type: "プロポリス＋ナイアシンアミド", fit: "保湿感とツヤを重視したい", note: "プロポリスエキスとナイアシンアミドを配合したグロウセラム。公式情報では毛穴印象と肌を整える目的です。" },
      { id: "vt-reedle", size: "50mL", price: "3,520円", type: "導入美容液", fit: "洗顔後の導入ケアを試したい", note: "洗顔後、最初に使う導入美容液。特有の刺激感があるため、注意表示と使用頻度を確認します。" }
    ]
  }
];

const esc = (value) => String(value).replace(/[&<>"']/g, (char) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
}[char]));

const commonHead = (title, description) => `
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="description" content="${esc(description)}">
  <meta name="p:domain_verify" content="cf534d6b564051d72e59186b71d7b6d0">
  <title>${esc(title)}｜MY SKIN EDIT</title>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-6E0471XS37"></script>
  <script defer src="../../analytics.js"></script>`;

const pageCss = `
  :root{--ink:#253048;--muted:#687085;--paper:#fffaf7;--theme:THEME;--pale:PALE;--line:#e8ded9}
  *{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;color:var(--ink);background:var(--paper);font-family:"Noto Sans JP","Yu Gothic",sans-serif}a{color:inherit}.ad{padding:9px 16px;background:var(--ink);color:#fff;text-align:center;font-size:11px}.wrap{width:min(1100px,calc(100% - 36px));margin:auto}.header{display:flex;justify-content:space-between;align-items:center;padding:24px 0;border-bottom:1px solid var(--line)}.brand{display:flex;align-items:center;gap:10px;text-decoration:none}.brand img{width:42px;height:42px;border-radius:50%}.brand strong{font:600 16px Georgia,serif;letter-spacing:.08em}.header>a:last-child{font-size:13px}.hero{padding:82px 0 66px;display:grid;grid-template-columns:1.35fr .65fr;gap:44px;align-items:center}.eyebrow{margin:0 0 13px;color:var(--theme);font-size:11px;font-weight:900;letter-spacing:.16em}.hero h1{margin:0;font:500 clamp(38px,6vw,70px)/1.25 "Yu Mincho","Noto Serif JP",serif;letter-spacing:-.04em}.lead{margin:24px 0 0;color:var(--muted);line-height:2}.visual{min-height:320px;border-radius:999px 999px 24px 24px;background:radial-gradient(circle at 50% 35%,#fff 0 18%,transparent 19%),linear-gradient(145deg,var(--pale),#fff);border:1px solid var(--line);display:grid;place-items:center}.visual b{font:500 56px Georgia,serif;color:var(--theme)}section{padding:62px 0}.section-title{margin:0 0 28px;font:500 clamp(29px,4vw,45px)/1.4 "Yu Mincho",serif}.table-wrap{overflow:auto;border:1px solid var(--line);border-radius:20px;background:#fff}table{width:100%;min-width:800px;border-collapse:collapse}th,td{padding:18px 16px;text-align:left;border-bottom:1px solid var(--line);vertical-align:top;font-size:13px;line-height:1.7}th{background:var(--pale);font-size:11px}tr:last-child td{border-bottom:0}.products{display:grid;gap:18px}.product{display:grid;grid-template-columns:180px 1fr auto;gap:28px;align-items:center;padding:28px;border:1px solid var(--line);border-radius:20px;background:#fff}.product-no{height:150px;border-radius:18px;background:linear-gradient(145deg,var(--pale),#fff);display:grid;place-items:center;text-align:center;color:var(--theme)}.product-no span{display:block;font:500 42px Georgia,serif}.product h3{margin:0 0 8px;font:500 24px "Yu Mincho",serif}.meta{color:var(--theme);font-size:12px;font-weight:800}.product p{margin:12px 0 0;color:var(--muted);line-height:1.8;font-size:14px}.button{display:inline-block;padding:15px 20px;border-radius:999px;background:var(--theme);color:#fff;text-decoration:none;white-space:nowrap;font-size:13px;font-weight:800}.note{padding:24px;border-radius:18px;background:var(--pale);color:var(--muted);line-height:1.9;font-size:13px}.note strong{color:var(--ink)}footer{margin-top:60px;padding:42px 18px;background:var(--ink);color:#fff;text-align:center;font-size:12px}footer a{margin:0 8px}
  @media(max-width:760px){.hero{grid-template-columns:1fr;padding:56px 0 42px}.visual{min-height:220px}.product{grid-template-columns:1fr}.product-no{height:110px}.button{text-align:center}.header>a:last-child{display:none}}`;

function renderCategory(category) {
  const products = category.products.map((entry) => ({ ...productById[entry.id], ...entry }));
  const comparisonRows = products.map((product) => `
      <tr><td><strong>${esc(product.name)}</strong></td><td>${esc(product.size)}</td><td>${esc(product.price)}</td><td>${esc(product.type)}</td><td>${esc(product.fit)}</td></tr>`).join("");
  const cards = products.map((product, index) => `
      <article class="product">
        <div class="product-no"><div><small>EDIT ${String(index + 1).padStart(2, "0")}</small><span>${index + 1}</span></div></div>
        <div><p class="meta">${esc(product.type)}・${esc(product.size)}</p><h3>${esc(product.name)}</h3><p>${esc(product.note)}</p></div>
        <a class="button" data-offer="rakuten" data-product="${esc(product.id)}" href="${esc(product.affiliate)}" rel="nofollow sponsored noopener">楽天で確認する</a>
      </article>`).join("");
  const html = `<!doctype html>
<html lang="ja"><head>${commonHead(category.title, category.lead)}
<style>${pageCss.replaceAll("THEME", category.theme).replaceAll("PALE", category.pale)}</style></head>
<body><div class="ad">PR・広告を含みます。価格・在庫・特典はリンク先でご確認ください。</div>
<header class="wrap header"><a class="brand" href="../../"><img src="../../assets/mse-avatar.png" alt=""><strong>MY SKIN EDIT</strong></a><a href="#compare">5商品を比較</a></header>
<main>
  <section class="wrap hero"><div><p class="eyebrow">${esc(category.eyebrow)}</p><h1>${esc(category.title)}</h1><p class="lead">${esc(category.lead)}</p></div><div class="visual"><b>M·S·E</b></div></section>
  <section class="wrap" id="compare"><p class="eyebrow">QUICK COMPARISON</p><h2 class="section-title">先に、違いを一覧で確認</h2><div class="table-wrap"><table><thead><tr><th>商品</th><th>容量</th><th>参考価格</th><th>タイプ</th><th>選び方</th></tr></thead><tbody>${comparisonRows}</tbody></table></div></section>
  <section class="wrap"><p class="eyebrow">PRODUCT NOTES</p><h2 class="section-title">5商品の特徴と購入先</h2><div class="products">${cards}</div></section>
  <section class="wrap"><div class="note"><strong>選ぶ前に</strong><br>価格・在庫・処方・パッケージは変更されることがあります。肌に異常があるときは使用を中止し、必要に応じて皮膚科医へ相談してください。化粧品の感じ方には個人差があります。</div></section>
</main>
<footer><strong>MY SKIN EDIT</strong><br><br><a href="../../about/">運営者情報</a><a href="../../privacy/">プライバシー</a><a href="../../advertising-policy/">広告ポリシー</a><p>© 2026 MY SKIN EDIT</p></footer>
</body></html>`;
  const outDir = path.join(root, "public", "lp", category.slug);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "index.html"), html, "utf8");
}

for (const category of categories) renderCategory(category);

const existing = [
  { href: "lp/daily-uv-5/", tag: "UV CARE", title: "30代の日焼け止め5選", text: "毎日用とレジャー用を、容量・落とし方・耐水性で比較。", cls: "rose" },
  { href: "lp/sensitive-moisturizer-5/", tag: "MOISTURIZER", title: "敏感肌向け乳液・クリーム5選", text: "化粧水の後の保湿を、容量・処方表示・使用感で比較。", cls: "beige" },
  { href: "lp/sensitive-lotion-5/", tag: "TONER", title: "敏感肌向け化粧水5選", text: "しっとり感、医薬部外品、無添加表示、レフィルを比較。", cls: "sage" },
  { href: "lp/cleansing-5/", tag: "CLEANSING", title: "クレンジング5選", text: "オイル・バーム・ミルク・ジェルを容量と使い方で比較。", cls: "stone" },
  { href: "lp/serum-pore-5/", tag: "SERUM", title: "30代の毛穴・キメ美容液5選", text: "皮脂、乾燥によるくすみ、キメの乱れを目的別に比較。", cls: "sage" }
];
const newCards = categories.map((category) => ({
  href: `lp/${category.slug}/`,
  tag: "NEW",
  title: category.title,
  text: category.lead,
  cls: category.key === "dry-toner" ? "sage" : category.key === "bright-serum" ? "rose" : category.key === "korean-serum" ? "lavender" : category.key === "pore-wash" ? "blue" : "stone"
}));
const cards = [...newCards, ...existing].map((card) => `
      <a class="card ${card.cls}" href="${card.href}"><span>${esc(card.tag)}</span><h2>${esc(card.title)}</h2><p>${esc(card.text)}</p><strong>比較を見る →</strong></a>`).join("");
const home = `<!doctype html><html lang="ja"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="description" content="公式情報を基準に、大人のコスメ選びを比較するMY SKIN EDIT。">
<meta name="p:domain_verify" content="cf534d6b564051d72e59186b71d7b6d0">
<meta property="og:title" content="MY SKIN EDIT｜大人のコスメ比較"><meta property="og:url" content="https://hidemina.github.io/my-skin-edit/">
<title>MY SKIN EDIT｜大人のコスメ比較</title><script async src="https://www.googletagmanager.com/gtag/js?id=G-6E0471XS37"></script><script defer src="analytics.js"></script>
<style>:root{--ink:#253048;--muted:#6a7080;--paper:#fffaf7;--line:#e9dfda;--rose:#c97878}*{box-sizing:border-box}body{margin:0;color:var(--ink);background:var(--paper);font-family:"Noto Sans JP","Yu Gothic",sans-serif}.wrap{width:min(1120px,calc(100% - 38px));margin:auto}.header{display:flex;align-items:center;justify-content:space-between;padding:26px 0;border-bottom:1px solid var(--line)}.brand{display:flex;align-items:center;gap:11px}.brand img{width:46px;height:46px;border-radius:50%}.brand strong{font:600 17px Georgia,serif;letter-spacing:.08em}.header p{margin:0;color:var(--muted);font-size:12px}.hero{padding:92px 0 70px}.eyebrow{color:var(--rose);font-size:11px;font-weight:900;letter-spacing:.16em}.hero h1{margin:12px 0 20px;font:500 clamp(44px,7vw,82px)/1.22 "Yu Mincho","Noto Serif JP",serif;letter-spacing:-.04em}.hero p:last-child{color:var(--muted);line-height:1.9}.guides{padding:30px 0 100px}.guides>h2{font:500 40px "Yu Mincho",serif}.grid{display:grid;grid-template-columns:repeat(2,1fr);gap:20px}.card{min-height:330px;padding:34px;border:1px solid var(--line);border-radius:22px;text-decoration:none;color:inherit;display:flex;flex-direction:column;box-shadow:0 16px 50px rgba(37,48,72,.06);transition:.2s}.card:hover{transform:translateY(-4px)}.card span{align-self:flex-start;padding:6px 10px;background:var(--ink);color:#fff;border-radius:999px;font-size:10px;letter-spacing:.12em}.card h2{margin:46px 0 14px;font:500 31px/1.42 "Yu Mincho",serif}.card p{margin:0;color:var(--muted);line-height:1.85;font-size:14px}.card strong{margin-top:auto;padding-top:24px;color:var(--rose);font-size:13px}.rose{background:linear-gradient(145deg,#f6e7e6,#fff)}.sage{background:linear-gradient(145deg,#e8f0eb,#fff)}.stone{background:linear-gradient(145deg,#eee7e3,#fff)}.beige{background:linear-gradient(145deg,#f4ecdf,#fff)}.lavender{background:linear-gradient(145deg,#eee9f5,#fff)}.blue{background:linear-gradient(145deg,#e6eff2,#fff)}footer{padding:42px 18px;background:var(--ink);color:#fff;text-align:center;font-size:12px}footer a{color:#fff;margin:0 8px}@media(max-width:720px){.header p{display:none}.hero{padding:64px 0 50px}.grid{grid-template-columns:1fr}.card{min-height:300px;padding:28px}}</style></head>
<body><header class="wrap header"><div class="brand"><img src="assets/mse-avatar.png" alt=""><strong>MY SKIN EDIT</strong></div><p>公式情報を基準に、大人のコスメ選びを整理する比較メディア</p></header>
<main><section class="wrap hero"><p class="eyebrow">BEAUTY SHOPPING NOTES</p><h1>肌に、いいほう。</h1><p>悩み・使い方・容量・処方表示を見比べて、自分に合う候補を絞ります。</p></section>
<section class="wrap guides"><p class="eyebrow">COMPARISON GUIDES</p><h2>商品テーマから選ぶ</h2><div class="grid">${cards}</div></section></main>
<footer><strong>MY SKIN EDIT</strong><br><br><a href="about/">運営者情報</a><a href="privacy/">プライバシー</a><a href="advertising-policy/">広告ポリシー</a><p>© 2026 MY SKIN EDIT</p></footer></body></html>`;
fs.writeFileSync(path.join(root, "public", "index.html"), home, "utf8");
console.log(`Built ${categories.length} goal pages and the home page.`);
