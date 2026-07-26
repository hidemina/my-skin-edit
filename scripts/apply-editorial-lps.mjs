import fs from "node:fs";
import path from "node:path";

const root = path.resolve("public/lp");

const pages = {
  "brightening-serum-5": {
    image: "brightening-serum.png",
    alt: "30代女性と美容液を配したシミ・くすみ対策美容液5選のビジュアル",
    intro: "シミ・くすみ対策は、目的を分けると選びやすくなります。",
    cards: [
      ["01", "薬用美白から選ぶ", "承認された効能と有効成分を公式情報で確認します。"],
      ["02", "乾燥ぐすみから選ぶ", "うるおい不足による暗い印象には、保湿設計を重視します。"],
      ["03", "続けやすさで選ぶ", "朝晩の使い方、容量、価格まで見て無理なく続く1本へ。"],
    ],
  },
  "dry-skin-toner-5": {
    image: "dry-skin-toner.png",
    alt: "乾燥が気になる30代女性のための化粧水5選ビジュアル",
    intro: "乾燥肌の化粧水は、しっとり感だけで決めず、その後の保湿まで考えます。",
    cards: [
      ["01", "使用感から選ぶ", "朝は軽さ、夜はしっとり感など、生活に合わせて選びます。"],
      ["02", "表示から選ぶ", "医薬部外品、無添加表示、レフィルの有無を比較します。"],
      ["03", "重ねるケアで選ぶ", "乳液やクリームと組み合わせ、うるおいを保つ設計へ。"],
    ],
  },
  "korean-serum-5": {
    image: "korean-serum.png",
    alt: "30代女性と実際の韓国コスメ美容液5商品を配した比較ビジュアル",
    intro: "話題性ではなく、今いちばん気になる肌悩みから美容液を選びます。",
    cards: [
      ["01", "毛穴目立ち印象", "皮脂や乾燥など、毛穴が気になる背景から候補を絞ります。"],
      ["02", "乾燥・くすみ印象", "保湿成分や整肌成分を見て、毎日のケアに合う1本へ。"],
      ["03", "濃度と使いやすさ", "高配合だけで決めず、刺激感や併用を考えて少量から。"],
    ],
  },
  "pore-cleansing-5": {
    image: "pore-cleansing.png",
    alt: "30代女性の毛穴クレンジング5選を紹介するビジュアル",
    intro: "落とす強さだけでなく、メイクの濃さと洗い上がりから選びます。",
    cards: [
      ["01", "メイクに合わせる", "しっかりメイクか軽いメイクかで、必要な洗浄設計を分けます。"],
      ["02", "洗い上がりで選ぶ", "つっぱり感が気になるなら、摩擦を避けた使い方も確認します。"],
      ["03", "続けやすさで選ぶ", "W洗顔、濡れた手、まつエク対応など日常の条件を比較します。"],
    ],
  },
  "pore-face-wash-5": {
    image: "pore-face-wash.png",
    alt: "毛穴ケア洗顔5選を紹介する30代女性向けビジュアル",
    intro: "毛穴ケアは、毎日落としすぎないことまで含めて選びます。",
    cards: [
      ["01", "酵素で選ぶ", "角栓やざらつきが気になる日に使うパウダーを比較します。"],
      ["02", "泥・ジェルで選ぶ", "皮脂吸着や泡立て不要など、使用感の違いを整理します。"],
      ["03", "頻度から選ぶ", "乾燥や刺激を感じたら、毎日ではなく頻度を調整します。"],
    ],
  },
};

const richPages = {
  "cleansing-5": ["cleansing.png", "メイクに合わせて選ぶクレンジング5選のビジュアル"],
  "daily-uv-5": ["daily-uv.png", "30代女性の日焼け止め5商品比較ビジュアル"],
  "sensitive-lotion-5": ["sensitive-lotion.png", "敏感肌向け化粧水5商品の比較ビジュアル"],
  "sensitive-moisturizer-5": ["sensitive-moisturizer.png", "敏感肌向け乳液・クリーム5選のビジュアル"],
  "serum-pore-5": ["serum-pore.png", "30代の毛穴とキメに使う美容液5選のビジュアル"],
};

function visual(image, alt) {
  return `<figure class="editorial-visual"><img src="../../assets/editorial/${image}" alt="${alt}"></figure>`;
}

function guide(page) {
  const cards = page.cards
    .map(([no, title, body]) => `<article class="editorial-guide__card"><span>POINT ${no}</span><h3>${title}</h3><p>${body}</p></article>`)
    .join("");
  return `<section class="editorial-guide"><div class="wrap editorial-guide__panel"><div class="editorial-guide__intro"><p class="eyebrow">HOW TO CHOOSE</p><h2>悩みから、今の肌に合う1本を。</h2><p>${page.intro}</p></div><div class="editorial-guide__grid">${cards}</div><div class="editorial-guide__cta"><a href="#compare">5商品を比較する →</a></div></div></section>`;
}

for (const [slug, page] of Object.entries(pages)) {
  const file = path.join(root, slug, "index.html");
  let html = fs.readFileSync(file, "utf8");
  if (!html.includes("lp-editorial.css")) {
    html = html.replace("</head>", '<link rel="stylesheet" href="../../assets/lp-editorial.css">\n</head>');
  }
  html = html.replace(
    /(<section class="wrap hero"><div>[\s\S]*?<\/div>)<div class="visual"><b>M·S·E<\/b><\/div><\/section>/,
    `$1${visual(page.image, page.alt)}</section>${guide(page)}`,
  );
  fs.writeFileSync(file, html, "utf8");
}

const artPatterns = {
  "cleansing-5": /<div class="hero-art" aria-hidden="true"><div class="bottle">OIL<\/div><div class="bottle">BALM<\/div><div class="bottle">MILK<\/div><div class="bottle">GEL<\/div><\/div>/,
  "daily-uv-5": /<div class="hero-image">\s*<img[\s\S]*?<div class="hero-card">[\s\S]*?<\/div>\s*<\/div>/,
  "sensitive-lotion-5": /<div class="shelf"[\s\S]*?<div class="bottle">Arouge<\/div>\s*<\/div>/,
  "sensitive-moisturizer-5": /<div class="visual" aria-hidden="true"><div class="jar">CREAM<\/div><div class="pump">EMULSION<\/div><div class="jar">BALM<\/div><\/div>/,
  "serum-pore-5": /<div class="hero-art" aria-hidden="true"><div class="vial">VITAMIN C<\/div><div class="vial">SERUM<\/div><div class="vial">NIACINAMIDE<\/div><\/div>/,
};

for (const [slug, [image, alt]] of Object.entries(richPages)) {
  const file = path.join(root, slug, "index.html");
  let html = fs.readFileSync(file, "utf8");
  if (!html.includes("lp-editorial.css")) {
    html = html.replace("</head>", '<link rel="stylesheet" href="../../assets/lp-editorial.css">\n</head>');
  }
  html = html.replace(artPatterns[slug], visual(image, alt));
  fs.writeFileSync(file, html, "utf8");
}

console.log(`Updated ${Object.keys(pages).length + Object.keys(richPages).length} LPs.`);
