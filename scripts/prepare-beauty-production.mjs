import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const mode = process.argv.includes("--write") ? "write" : "check";
const specArg = process.argv.find((arg) => arg.endsWith(".json"));

if (!specArg) {
  console.error(
    "使い方: npm run production:check -- data/production/案件.json\n" +
    "       npm run production:prepare -- data/production/案件.json",
  );
  process.exit(2);
}

const specPath = path.resolve(root, specArg);
if (!fs.existsSync(specPath)) {
  console.error(`案件データが見つかりません: ${specPath}`);
  process.exit(2);
}

const spec = JSON.parse(fs.readFileSync(specPath, "utf8"));
const errors = [];
const placeholders = [];

const requiredText = (value, label, max = 500) => {
  if (typeof value !== "string" || !value.trim()) errors.push(`${label} は必須です`);
  if (typeof value === "string" && value.length > max) errors.push(`${label} は${max}文字以内です`);
  if (typeof value === "string" && /replace-with|example\.com|商品名[1-5]|カテゴリ名/.test(value)) {
    placeholders.push(label);
  }
};

requiredText(spec.slug, "slug", 80);
if (spec.slug && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(spec.slug)) {
  errors.push("slug は半角英小文字・数字・ハイフンだけで指定してください");
}
requiredText(spec.category, "category", 60);
requiredText(spec.eyebrow, "eyebrow", 60);
if (!Array.isArray(spec.titleLines) || spec.titleLines.length !== 2) {
  errors.push("titleLines は意味のまとまりで分けた2行が必要です");
} else {
  spec.titleLines.forEach((line, index) => requiredText(line, `titleLines[${index}]`, 35));
}
requiredText(spec.lead, "lead", 120);
requiredText(spec.destinationUrl, "destinationUrl", 300);

for (const key of ["hero", "concern", "benefit"]) {
  const scene = spec.scenes?.[key];
  if (!scene) {
    errors.push(`scenes.${key} が必要です`);
    continue;
  }
  requiredText(scene.image, `scenes.${key}.image`, 200);
  requiredText(scene.alt, `scenes.${key}.alt`, 100);
  if (key !== "hero") {
    if (!Array.isArray(scene.titleLines) || scene.titleLines.length !== 2) {
      errors.push(`scenes.${key}.titleLines は2行が必要です`);
    }
    requiredText(scene.body, `scenes.${key}.body`, 180);
    requiredText(scene.accent, `scenes.${key}.accent`, 80);
  }
}

if (!Array.isArray(spec.selectionAxes) || spec.selectionAxes.length !== 3) {
  errors.push("selectionAxes は3件必要です");
}

if (!Array.isArray(spec.products) || spec.products.length !== 5) {
  errors.push("products は5商品ちょうど必要です");
} else {
  const ids = new Set();
  spec.products.forEach((product, index) => {
    const label = `products[${index}]`;
    requiredText(product.id, `${label}.id`, 80);
    requiredText(product.name, `${label}.name`, 100);
    requiredText(product.image, `${label}.image`, 200);
    requiredText(product.affiliateUrl, `${label}.affiliateUrl`, 1500);
    requiredText(product.merchant, `${label}.merchant`, 40);
    requiredText(product.recommendedFor, `${label}.recommendedFor`, 160);
    requiredText(product.sourceUrl, `${label}.sourceUrl`, 500);
    if (!Array.isArray(product.specs) || product.specs.length !== 3) {
      errors.push(`${label}.specs は3項目必要です`);
    }
    if (ids.has(product.id)) errors.push(`${label}.id が重複しています`);
    ids.add(product.id);
    for (const urlKey of ["affiliateUrl", "sourceUrl"]) {
      if (product[urlKey] && !/^https:\/\//.test(product[urlKey])) {
        errors.push(`${label}.${urlKey} は https URL が必要です`);
      }
    }
  });
}

if (!Array.isArray(spec.pins) || spec.pins.length !== 3) {
  errors.push("pins は悩み・選び方・ベネフィットの3案が必要です");
} else {
  spec.pins.forEach((pin, index) => {
    requiredText(pin.angle, `pins[${index}].angle`, 30);
    requiredText(pin.headline, `pins[${index}].headline`, 45);
    requiredText(pin.subheadline, `pins[${index}].subheadline`, 70);
  });
}

const assetPath = (webPath) => path.join(root, "public", String(webPath).replace(/^\/+/, ""));
if (mode === "write") {
  const requiredAssets = [
    spec.scenes?.hero?.image,
    spec.scenes?.concern?.image,
    spec.scenes?.benefit?.image,
    ...(spec.products ?? []).map((product) => product.image),
  ].filter(Boolean);
  for (const webPath of requiredAssets) {
    if (!fs.existsSync(assetPath(webPath))) errors.push(`画像がありません: ${webPath}`);
  }
}

if (placeholders.length) {
  errors.push(`未入力の仮データがあります: ${[...new Set(placeholders)].join(", ")}`);
}

if (errors.length) {
  console.error("案件データを生成できません:");
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`OK: ${spec.slug}（5商品・3シーン・3ピン）`);
if (mode === "check") process.exit(0);

const productionDir = path.join(root, "production", spec.slug);
const lpDir = path.join(root, "public", "lp", spec.slug);
if (fs.existsSync(productionDir) || fs.existsSync(lpDir)) {
  console.error("既存案件は上書きしません。別slugを指定するか、内容を手動確認してください。");
  process.exit(1);
}

fs.mkdirSync(path.join(productionDir, "pin-prompts"), { recursive: true });
fs.mkdirSync(lpDir, { recursive: true });

const esc = (value) => String(value).replace(/[&<>"']/g, (char) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
}[char]));

const productCards = spec.products.map((product, index) => `
  <a class="product" href="${esc(product.affiliateUrl)}" data-product="${esc(product.id)}" rel="sponsored nofollow noopener" target="_blank">
    <img src="../..${esc(product.image)}" alt="${esc(product.name)}" loading="lazy" decoding="async">
    <div class="product__copy">
      <span class="product__number">0${index + 1}</span>
      <h3>${esc(product.name)}</h3>
      <div class="specs">${product.specs.map((item) => `<span>${esc(item)}</span>`).join("")}</div>
      <p>${esc(product.recommendedFor)}</p>
      <strong>${esc(product.merchant)}で確認する →</strong>
    </div>
  </a>`).join("\n");

const comparisonRows = spec.products.map((product, index) => `
  <tr>
    <td>0${index + 1}</td><td>${esc(product.name)}</td>
    ${product.specs.map((item) => `<td>${esc(item)}</td>`).join("")}
    <td>${esc(product.recommendedFor)}</td>
  </tr>`).join("\n");

const axes = spec.selectionAxes.map((axis, index) => `
  <article><span>0${index + 1}</span><h3>${esc(axis.label)}</h3><p>${esc(axis.description)}</p></article>`).join("");

const html = `<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="description" content="${esc(spec.lead)}">
  <meta name="p:domain_verify" content="cf534d6b564051d72e59186b71d7b6d0">
  <title>${esc(spec.category)}｜MY SKIN EDIT</title>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-6E0471XS37"></script>
  <script defer src="../../analytics.js"></script>
  <style>
    :root{--ink:#202b42;--muted:#657087;--paper:#fffaf7;--accent:${esc(spec.theme.accent)};--pale:${esc(spec.theme.pale)};--line:#eadfda}
    *{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:var(--paper);color:var(--ink);font-family:"Noto Sans JP","Yu Gothic",sans-serif;line-height:1.8}a{color:inherit}.wrap{width:min(1120px,calc(100% - 36px));margin:auto}.ad{padding:9px 16px;background:var(--ink);color:#fff;text-align:center;font-size:11px}.header{display:flex;align-items:center;justify-content:space-between;padding:22px 0;border-bottom:1px solid var(--line)}.brand{font:600 18px Georgia,serif;letter-spacing:.12em;text-decoration:none}.hero{display:grid;grid-template-columns:1fr 1fr;min-height:690px;align-items:stretch}.hero__copy{display:flex;flex-direction:column;justify-content:center;padding:70px max(24px,5vw)}.eyebrow{color:var(--accent);font-size:11px;font-weight:900;letter-spacing:.18em}.hero h1,.story h2,.section-head h2{font-family:"Yu Mincho","Noto Serif JP",serif;font-weight:500;letter-spacing:-.04em}.hero h1{margin:14px 0 24px;font-size:clamp(42px,6vw,76px);line-height:1.22}.hero h1 span,.story h2 span{display:block}.hero__image img,.story figure img{width:100%;height:100%;object-fit:cover}.cta{display:inline-block;margin-top:24px;padding:15px 26px;background:var(--accent);color:#fff;text-decoration:none;font-weight:800;border-radius:4px}.story{padding:100px 0}.story__row{display:grid;grid-template-columns:1fr 1fr;align-items:center;gap:72px;margin-bottom:90px}.story__row--reverse figure{order:2}.story figure{margin:0;aspect-ratio:4/3;overflow:hidden;border-radius:24px}.story h2{font-size:clamp(34px,4.4vw,58px);line-height:1.35}.story__accent{display:block;margin-top:22px;color:var(--accent);font-family:"Yu Mincho",serif;font-size:20px}.axes,.products{display:grid;gap:20px}.axes{grid-template-columns:repeat(3,1fr);margin:42px 0 100px}.axes article{padding:28px;background:#fff;border:1px solid var(--line);border-radius:18px}.axes span,.product__number{color:var(--accent);font-weight:900}.section-head{margin-bottom:38px}.section-head h2{font-size:clamp(34px,5vw,58px);margin:8px 0}.comparison{padding:100px 0;background:var(--pale)}.table-wrap{overflow:auto}.table-wrap table{width:100%;min-width:900px;border-collapse:collapse;background:#fff}.table-wrap th,.table-wrap td{padding:16px;border:1px solid var(--line);vertical-align:top;text-align:left}.products-section{padding:100px 0}.products{grid-template-columns:1fr}.product{display:grid;grid-template-columns:210px 1fr;gap:32px;padding:24px;background:#fff;border:1px solid var(--line);border-radius:22px;text-decoration:none;transition:.2s}.product:hover{transform:translateY(-2px);box-shadow:0 18px 45px #6b394016}.product img{width:100%;aspect-ratio:1/1;object-fit:contain;border-radius:14px}.product h3{font:500 28px/1.45 "Yu Mincho",serif;margin:5px 0 12px}.specs{display:flex;flex-wrap:wrap;gap:8px}.specs span{padding:4px 10px;border:1px solid var(--line);border-radius:999px;font-size:12px}.product strong{color:var(--accent)}.disclosure{padding:70px 0;background:var(--ink);color:#fff}.disclosure a{color:#fff}
    @media(max-width:760px){.header span{display:none}.hero{grid-template-columns:1fr;min-height:auto}.hero__copy{padding:52px 24px}.hero h1{font-size:30px;letter-spacing:-.07em}.hero__image{height:440px}.story{padding:70px 0}.story__row,.story__row--reverse{grid-template-columns:1fr;gap:28px;margin-bottom:70px}.story__row--reverse figure{order:0}.story h2{font-size:26px;letter-spacing:-.07em}.axes{grid-template-columns:1fr;margin-bottom:70px}.comparison,.products-section{padding:70px 0}.section-head h2{font-size:30px;line-height:1.45;text-wrap:balance}.product{grid-template-columns:105px 1fr;gap:16px;padding:16px}.product h3{font-size:20px}.product p{font-size:13px}}
  </style>
</head>
<body>
  <div class="ad">本ページにはPR・アフィリエイトリンクが含まれます。</div>
  <header class="wrap header"><a class="brand" href="../../">MY SKIN EDIT</a><span>公式情報を基準に、大人のコスメ選びを整理する比較メディア</span></header>
  <main>
    <section class="hero">
      <div class="hero__copy"><p class="eyebrow">${esc(spec.eyebrow)}</p><h1>${spec.titleLines.map((line) => `<span>${esc(line)}</span>`).join("")}</h1><p>${esc(spec.lead)}</p><a class="cta" href="#compare">5商品を比較する →</a></div>
      <div class="hero__image"><img src="../..${esc(spec.scenes.hero.image)}" alt="${esc(spec.scenes.hero.alt)}"></div>
    </section>
    <section class="story"><div class="wrap">
      <div class="story__row"><figure><img src="../..${esc(spec.scenes.concern.image)}" alt="${esc(spec.scenes.concern.alt)}"></figure><div><p class="eyebrow">SKIN CONCERN</p><h2>${spec.scenes.concern.titleLines.map((line) => `<span>${esc(line)}</span>`).join("")}</h2><p>${esc(spec.scenes.concern.body)}</p><span class="story__accent">${esc(spec.scenes.concern.accent)}</span></div></div>
      <div class="story__row story__row--reverse"><figure><img src="../..${esc(spec.scenes.benefit.image)}" alt="${esc(spec.scenes.benefit.alt)}"></figure><div><p class="eyebrow">AFTER THE EDIT</p><h2>${spec.scenes.benefit.titleLines.map((line) => `<span>${esc(line)}</span>`).join("")}</h2><p>${esc(spec.scenes.benefit.body)}</p><span class="story__accent">${esc(spec.scenes.benefit.accent)}</span></div></div>
      <div class="axes">${axes}</div>
    </div></section>
    <section class="comparison" id="compare"><div class="wrap"><div class="section-head"><p class="eyebrow">COMPARE FIVE</p><h2>${esc(spec.category)}を比較</h2><p>価格や在庫は変動します。購入前に販売ページで最新情報をご確認ください。</p></div><div class="table-wrap"><table><thead><tr><th>No.</th><th>商品</th><th>仕様1</th><th>仕様2</th><th>仕様3</th><th>おすすめする人</th></tr></thead><tbody>${comparisonRows}</tbody></table></div></div></section>
    <section class="products-section"><div class="wrap"><div class="section-head"><p class="eyebrow">PRODUCT NOTES</p><h2>商品ごとの特徴と購入先</h2><p>カード全体から商品ページへ移動できます。</p></div><div class="products">${productCards}</div></div></section>
  </main>
  <footer class="disclosure"><div class="wrap"><strong>MY SKIN EDIT</strong><p>本ページは公式情報をもとに比較しています。使用感には個人差があります。価格・在庫・販売条件は購入先でご確認ください。</p><a href="../../privacy/">プライバシーポリシー</a>　<a href="../../advertising-policy/">広告掲載ポリシー</a></div></footer>
</body>
</html>`;

fs.writeFileSync(path.join(lpDir, "index.html"), html, "utf8");
fs.writeFileSync(path.join(productionDir, "source.json"), `${JSON.stringify(spec, null, 2)}\n`, "utf8");

const sharedPrompt = `MY SKIN EDITのPinterest用縦長ピン。1000×1500px、2:3。
日本の上質な女性美容誌の特集ページ風。35歳前後の架空の日本人女性。
清潔感、品、親しみやすさ、広告モデルとしての憧れを両立する。
肌の毛穴、キメ、産毛、自然な血色、わずかな色むらを残す。
文字・ロゴ・商品・透かしは生成しない。日本語文字と実物商品は後工程で合成する。
手指、目、歯、輪郭を破綻させない。陶器肌、過剰加工、20代前半、外国人風は禁止。
下部25%は実物商品5点の合成用に、平らで明るい無地スペースを残す。`;

spec.pins.forEach((pin, index) => {
  const prompt = `${sharedPrompt}

訴求角度: ${pin.angle}
表現する状況: ${pin.headline}
補足する印象: ${pin.subheadline}
人物を画面の大部分に配置し、悩み訴求では指定箇所だけに軽い変化を残す。
ベネフィット訴求では効果を保証せず、選べた安心感と穏やかな生活を表現する。

後工程で正確に組版する文字:
「${pin.headline}」
「${pin.subheadline}」
「${spec.category}」
「5商品を比較する →」
「PR」
`;
  fs.writeFileSync(
    path.join(productionDir, "pin-prompts", `${String(index + 1).padStart(2, "0")}-${pin.angle}.txt`),
    prompt,
    "utf8",
  );
});

const checklist = `# ${spec.category} 制作チェック

## 入稿前

- [ ] 5商品の公式情報と販売条件を再確認
- [ ] 5つの収益リンクを別タブで確認
- [ ] 実物商品画像5点のラベル・色・形が未改変
- [ ] hero / concern / benefit の3画像を原寸確認

## LP

- [ ] PCとスマートフォンで見出しが意味のまとまりで改行される
- [ ] 「あ、これ私のことだ」と感じる悩みの文章がある
- [ ] 効果を断定しない生活上のベネフィットがある
- [ ] 商品カード全体が収益リンクとして有効
- [ ] PR表記、広告掲載ポリシー、GA4がある

## Pinterest（必ず1枚ずつ）

- [ ] 1枚目の写真QA完了後に文字入れした
- [ ] 日本語が指定文と完全一致
- [ ] 実物商品5点に重複・欠品・改変がない
- [ ] PRが安全領域内
- [ ] 投稿用タイトル・説明・ボード・固有UTMを保存
- [ ] 投稿後に Pinterest → LP → 収益リンクを確認
`;
fs.writeFileSync(path.join(productionDir, "qa-checklist.md"), checklist, "utf8");

console.log(`生成完了: ${path.relative(root, lpDir)}`);
console.log(`制作パック: ${path.relative(root, productionDir)}`);
console.log("次はピン1枚目の完成プロンプトを確認し、承認後に1枚だけ生成してください。");
