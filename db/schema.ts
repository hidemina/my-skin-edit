import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const affiliateClicks = sqliteTable("affiliate_clicks", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  product: text("product").notNull(),
  offer: text("offer").notNull(),
  utmSource: text("utm_source").notNull().default(""),
  utmCampaign: text("utm_campaign").notNull().default(""),
  utmContent: text("utm_content").notNull().default(""),
  clickedAt: text("clicked_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
