ALTER TABLE `conversations` ADD `title_source` text DEFAULT 'auto' NOT NULL;--> statement-breakpoint
ALTER TABLE `conversations` ADD `title_generate_attempts` integer DEFAULT 0 NOT NULL;