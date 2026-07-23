import { desc, sql } from "drizzle-orm";
import { getDb } from "../../../db";
import { affiliateClicks } from "../../../db/schema";

const PRODUCTS = new Set([
  "biore",
  "skin-aqua",
  "anessa",
  "allie",
  "minon",
  "curel-lotion",
  "minon-lotion",
  "dprogram-lotion",
  "ihada-lotion",
  "arouge-lotion",
]);
const MAX_FIELD_LENGTH = 100;

function clean(value: unknown) {
  return typeof value === "string"
    ? value.trim().slice(0, MAX_FIELD_LENGTH)
    : "";
}

export async function POST(request: Request) {
  try {
    const origin = request.headers.get("origin");
    if (origin && origin !== new URL(request.url).origin) {
      return Response.json({ error: "origin not allowed" }, { status: 403 });
    }

    const payload = (await request.json()) as Record<string, unknown>;
    const product = clean(payload.product);
    const offer = clean(payload.offer);

    if (!PRODUCTS.has(product) || offer !== "rakuten") {
      return Response.json({ error: "invalid click data" }, { status: 400 });
    }

    await getDb().insert(affiliateClicks).values({
      product,
      offer,
      utmSource: clean(payload.utm_source),
      utmCampaign: clean(payload.utm_campaign),
      utmContent: clean(payload.utm_content),
    });

    return Response.json({ recorded: true }, { status: 201 });
  } catch {
    return Response.json({ error: "click could not be recorded" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const totals = await getDb()
      .select({
        product: affiliateClicks.product,
        utmContent: affiliateClicks.utmContent,
        clicks: sql<number>`count(*)`,
      })
      .from(affiliateClicks)
      .groupBy(affiliateClicks.product, affiliateClicks.utmContent)
      .orderBy(desc(sql<number>`count(*)`));

    return Response.json(
      { totals },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch {
    return Response.json({ error: "stats are unavailable" }, { status: 500 });
  }
}
