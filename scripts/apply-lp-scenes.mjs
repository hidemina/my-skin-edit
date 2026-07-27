import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const pages = {
  "pore-cleansing-5": {
    title: "毛穴クレンジング",
    concernTitle: "落としたはずなのに、毛穴が気になる。",
    concern:
      "鏡に近づくと見える鼻まわりや頬のざらつき。洗浄力だけを上げるのではなく、メイクの濃さと肌状態に合う落とし方を選ぶことが大切です。",
    benefitTitle: "落とす時間を、肌をいたわる習慣へ。",
    benefit:
      "摩擦を抑えながら、その日のメイクをきちんとオフ。洗い上がりの心地よさまで比較して、毎日続けやすい1本を選びます。",
    accent: "落としすぎない。それでも、すっきり。",
  },
  "dry-skin-toner-5": {
    title: "乾燥肌向け化粧水",
    concernTitle: "化粧水を重ねても、頬がつっぱる。",
    concern:
      "季節や空調で揺らぎやすい30代の肌。しっとり感だけでなく、刺激になりにくい表示や、その後に重ねる乳液・クリームまで考えます。",
    benefitTitle: "うるおいを重ねて、やわらかな印象へ。",
    benefit:
      "朝晩の使いやすさ、容量、医薬部外品や無添加表示を整理。今の肌と生活に無理なくなじむ化粧水を選びます。",
    accent: "触れたくなるような、しなやかな肌へ。",
  },
  "brightening-serum-5": {
    title: "シミ・くすみ対策美容液",
    concernTitle: "顔色が冴えない。点も影も気になる。",
    concern:
      "シミ予防と乾燥によるくすみは、選ぶ成分も目的も異なります。気になる部分を正しく分けて、必要なケアを見極めます。",
    benefitTitle: "明るい印象は、目的に合う1本から。",
    benefit:
      "薬用美白と保湿美容液を混同せず、公式表示をもとに比較。毎日のケアに取り入れやすい選択肢を整理しました。",
    accent: "鏡を見るたび、前向きになれる肌印象へ。",
  },
  "pore-face-wash-5": {
    title: "毛穴ケア洗顔",
    concernTitle: "洗うほど、毛穴が気になってしまう。",
    concern:
      "ざらつきや皮脂が気になる一方で、洗いすぎによる乾燥も避けたいもの。酵素・泥・ジェルなど、特徴の違いを整理します。",
    benefitTitle: "朝の素肌を、軽やかな気分で始める。",
    benefit:
      "毎日使えるもの、週数回取り入れるもの。肌状態に合わせて無理なく続けられる洗顔料を選びます。",
    accent: "すっきり感と、やさしい洗い上がりを両立。",
  },
  "korean-serum-5": {
    title: "韓国コスメ美容液",
    concernTitle: "話題の商品が多すぎて、選べない。",
    concern:
      "高配合や人気だけで決めると、今の肌悩みとずれることも。毛穴、乾燥、くすみ印象など、目的から候補を絞ります。",
    benefitTitle: "流行ではなく、なりたい肌印象で選ぶ。",
    benefit:
      "成分濃度、使う順番、続けやすさを公式情報で比較。毎日のケアに心地よく取り入れられる1本へ。",
    accent: "今の肌に合う韓国美容液を、迷わず選ぶ。",
  },
  "daily-uv-5": {
    title: "日焼け止め",
    concernTitle: "毎日使うから、妥協したくない。",
    concern:
      "乾燥、きしみ、白浮き、落としにくさ。紫外線防御力だけでなく、生活の中で続けやすい使用感も大切な比較軸です。",
    benefitTitle: "日差しの中でも、自分らしく軽やかに。",
    benefit:
      "通勤、買い物、レジャーまで、使う場面に合う1本を。耐水性や落とし方も確認して選びます。",
    accent: "守るケアを、毎日の心地よい習慣に。",
  },
  "sensitive-moisturizer-5": {
    title: "敏感肌向け乳液・クリーム",
    concernTitle: "乾燥するのに、重さや刺激も気になる。",
    concern:
      "頬や口元は乾くけれど、べたつくケアは続けにくい。乳液とクリームの違いを知り、肌状態に合う守り方を選びます。",
    benefitTitle: "夜の保湿を、ほっとできる時間へ。",
    benefit:
      "軽い乳液からコクのあるクリームまで、容量・レフィル・公式表示を比較。肌を包むようなケアを続けます。",
    accent: "うるおいを守って、穏やかな肌印象へ。",
  },
  "sensitive-lotion-5": {
    title: "敏感肌向け化粧水",
    concernTitle: "赤みや乾燥で、いつもの化粧水が不安。",
    concern:
      "肌が揺らぐときは、心地よく使えることが第一。医薬部外品、アルコール無添加表示、しっとり感を確認します。",
    benefitTitle: "毎日迷わず手に取れる、安心感を。",
    benefit:
      "刺激の感じ方には個人差があります。公式の使用方法を守り、少しずつ肌になじませられる候補を選びます。",
    accent: "シンプルな保湿で、健やかな肌を支える。",
  },
  "cleansing-5": {
    title: "メイクに合わせるクレンジング",
    concernTitle: "きれいに落としたい。でも乾燥は避けたい。",
    concern:
      "しっかりメイクの日と軽いメイクの日では、必要なクレンジングが違います。タイプごとの落とし方と使いやすさを比較します。",
    benefitTitle: "一日の終わりを、心地よくリセット。",
    benefit:
      "オイル、バーム、ミルク、ジェルから、その日のメイクに合う1本を。無理なく落として、次の保湿へつなげます。",
    accent: "落とすケアから、明日の肌を整える。",
  },
  "serum-pore-5": {
    title: "毛穴・キメ美容液",
    concernTitle: "毛穴、キメ、乾燥。悩みが一つではない。",
    concern:
      "毛穴が気になる背景は、皮脂だけとは限りません。乾燥やキメの乱れも含めて、今優先したいケアを見つけます。",
    benefitTitle: "悩みを整理すると、選ぶ1本が見えてくる。",
    benefit:
      "成分濃度だけで比べず、使う順番や続けやすさまで確認。毎日のケアに取り入れやすい美容液を比較します。",
    accent: "近くで見ても、自信を持てる肌印象へ。",
  },
};

for (const [slug, copy] of Object.entries(pages)) {
  const file = join("public", "lp", slug, "index.html");
  let html = await readFile(file, "utf8");
  html = html.replaceAll(
    `../../assets/lp-scenes/${slug}/concern.png`,
    `../../assets/lp-scenes/${slug}/concern.webp`,
  );
  html = html.replaceAll(
    `../../assets/lp-scenes/${slug}/benefit.png`,
    `../../assets/lp-scenes/${slug}/benefit.webp`,
  );

  html = html.replace(
    /<figure class="editorial-visual"><img[^>]*><\/figure>/,
    `<figure class="editorial-visual"><img src="../../assets/lp-scenes/${slug}/hero.webp" alt="${copy.title}を選ぶ30代女性" width="1122" height="1402"></figure>`,
  );

  if (!html.includes('class="editorial-story"')) {
    const story = `
    <section class="editorial-story" aria-label="${copy.title}の悩みと選んだ先のイメージ">
      <div class="wrap editorial-story__grid">
        <figure class="editorial-story__image editorial-story__image--problem"><img src="../../assets/lp-scenes/${slug}/concern.webp" alt="${copy.title}選びに迷い、肌状態を確かめる30代女性" loading="lazy"></figure>
        <div class="editorial-story__copy"><p class="eyebrow">SKIN CONCERN</p><h2>${copy.concernTitle}</h2><p>${copy.concern}</p><span class="editorial-story__accent">今の肌を知ることが、選び方の第一歩です。</span></div>
      </div>
      <div class="wrap editorial-story__grid editorial-story__grid--reverse">
        <figure class="editorial-story__image editorial-story__image--benefit"><img src="../../assets/lp-scenes/${slug}/benefit.webp" alt="${copy.title}を見直し、明るい表情を見せる30代女性" loading="lazy"></figure>
        <div class="editorial-story__copy"><p class="eyebrow">AFTER THE EDIT</p><h2>${copy.benefitTitle}</h2><p>${copy.benefit}</p><span class="editorial-story__accent">${copy.accent}</span></div>
      </div>
    </section>
`;
    const compareStart =
      html.indexOf('<section class="wrap" id="compare">') >= 0
        ? '<section class="wrap" id="compare">'
        : '<section class="comparison" id="compare">';
    if (!html.includes(compareStart)) {
      throw new Error(`Comparison section not found: ${slug}`);
    }
    html = html.replace(compareStart, `${story}${compareStart}`);
  }

  await writeFile(file, html, "utf8");
}

console.log(`Applied LP scene assets to ${Object.keys(pages).length} pages.`);
