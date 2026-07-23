CREATE TABLE `affiliate_clicks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`product` text NOT NULL,
	`offer` text NOT NULL,
	`utm_source` text DEFAULT '' NOT NULL,
	`utm_campaign` text DEFAULT '' NOT NULL,
	`utm_content` text DEFAULT '' NOT NULL,
	`clicked_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
