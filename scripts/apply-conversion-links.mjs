import fs from "node:fs";
import path from "node:path";

const lpRoot = path.resolve("public/lp");
const files = fs
  .readdirSync(lpRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => path.join(lpRoot, entry.name, "index.html"))
  .filter((file) => fs.existsSync(file));

const secondaryInfoLink =
  /<a\b(?![^>]*data-offer)[^>]*>(?:公式仕様を見る|公式情報を見る|公式情報を確認|公式情報|商品情報)<\/a>/g;

for (const file of files) {
  let html = fs.readFileSync(file, "utf8");

  html = html
    .replace(secondaryInfoLink, "")
    .replaceAll("2026年7月24日時点の", "")
    .replaceAll("2026年7月時点の", "")
    .replace(
      "価格は2026年7月26日時点のメーカー公式表示をもとにしています。",
      "価格はメーカー公式表示をもとにしています。",
    )
    .replace(
      "購入前に公式仕様を確認し、価格・在庫は販売ページの最新表示をご確認ください。",
      "価格・在庫は販売ページの最新表示をご確認ください。",
    );

  if (!html.includes("affiliate-card.css")) {
    html = html.replace(
      "</head>",
      '<link rel="stylesheet" href="../../assets/affiliate-card.css">\n</head>',
    );
  }
  if (!html.includes("affiliate-card.js")) {
    html = html.replace(
      "</body>",
      '<script defer src="../../assets/affiliate-card.js"></script>\n</body>',
    );
  }

  fs.writeFileSync(file, html, "utf8");
}

const uvFile = path.join(lpRoot, "daily-uv-5", "index.html");
let uvHtml = fs.readFileSync(uvFile, "utf8");
if (!uvHtml.includes("893260907360570484")) {
  uvHtml = uvHtml.replace(
    '<img src="../../pins/beauty-uv-daily-5-v1-01.png" alt="30代の朝に迷わない日焼け止め5選">',
    '<a href="https://jp.pinterest.com/pin/893260907360570484/" target="_blank" rel="noopener" aria-label="30代の朝に迷わない日焼け止め5選をPinterestで見る"><img src="../../pins/beauty-uv-daily-5-v1-01.png" alt="30代の朝に迷わない日焼け止め5選"></a>',
  );
}
if (!uvHtml.includes("893260907360570510")) {
  uvHtml = uvHtml.replace(
    '<img src="../../pins/beauty-uv-daily-5-v1-02.png" alt="毎日用とレジャー用の日焼け止めの選び方">',
    '<a href="https://jp.pinterest.com/pin/893260907360570510/" target="_blank" rel="noopener" aria-label="毎日用とレジャー用の日焼け止めの選び方をPinterestで見る"><img src="../../pins/beauty-uv-daily-5-v1-02.png" alt="毎日用とレジャー用の日焼け止めの選び方"></a>',
  );
}
if (!uvHtml.includes("893260907360570528")) {
  uvHtml = uvHtml.replace(
    '<img src="../../pins/beauty-uv-daily-5-v1-03.png" alt="石けん落ちと耐水性で比較する日焼け止め5選">',
    '<a href="https://jp.pinterest.com/pin/893260907360570528/" target="_blank" rel="noopener" aria-label="石けん落ちと耐水性で比較する日焼け止め5選をPinterestで見る"><img src="../../pins/beauty-uv-daily-5-v1-03.png" alt="石けん落ちと耐水性で比較する日焼け止め5選"></a>',
  );
}
fs.writeFileSync(uvFile, uvHtml, "utf8");

console.log(`Updated conversion links in ${files.length} LPs.`);
