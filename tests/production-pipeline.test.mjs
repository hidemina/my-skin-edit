import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";

const root = path.resolve(import.meta.dirname, "..");
const script = path.join(root, "scripts", "prepare-beauty-production.mjs");
const template = JSON.parse(
  await readFile(path.join(root, "data", "production", "beauty-category.template.json"), "utf8"),
);

const makeValidSpec = () => {
  const spec = structuredClone(template);
  spec.slug = "test-beauty-5";
  spec.category = "テスト美容5選";
  spec.destinationUrl = "https://hidemina.github.io/my-skin-edit/lp/test-beauty-5/";
  for (const [key, scene] of Object.entries(spec.scenes)) {
    scene.image = `/assets/lp-scenes/test-beauty-5/${key}.webp`;
  }
  spec.products.forEach((product, index) => {
    const number = String(index + 1).padStart(2, "0");
    product.name = `テスト美容商品${number}`;
    product.image = `/assets/products/test-beauty-5/${number}.jpg`;
    product.affiliateUrl = `https://affiliate.invalid/product-${number}`;
    product.sourceUrl = `https://official.invalid/product-${number}`;
  });
  return spec;
};

async function runCheck(spec) {
  const directory = await mkdtemp(path.join(tmpdir(), "mse-production-"));
  const specPath = path.join(directory, "spec.json");
  await writeFile(specPath, `${JSON.stringify(spec, null, 2)}\n`, "utf8");
  const result = spawnSync(process.execPath, [script, "--check", specPath], {
    cwd: root,
    encoding: "utf8",
  });
  await rm(directory, { recursive: true, force: true });
  return result;
}

test("accepts a complete five-product production spec", async () => {
  const result = await runCheck(makeValidSpec());
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /5商品・3シーン・3ピン/);
});

test("rejects a spec with fewer than five products", async () => {
  const spec = makeValidSpec();
  spec.products.pop();
  const result = await runCheck(spec);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /products は5商品ちょうど必要です/);
});

test("rejects an insecure affiliate URL", async () => {
  const spec = makeValidSpec();
  spec.products[0].affiliateUrl = "http://affiliate.invalid/product-01";
  const result = await runCheck(spec);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /affiliateUrl は https URL が必要です/);
});
