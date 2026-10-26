CREATE TABLE `download_status` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`status` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `downloads` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer NOT NULL,
	`completed_at` integer,
	`status_id` integer NOT NULL,
	`progress` integer DEFAULT 0 NOT NULL,
	`youtube_url` text NOT NULL,
	`filepath` text,
	`error` text,
	FOREIGN KEY (`status_id`) REFERENCES `download_status`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `track_metadata` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`music_brainz_id` text,
	`MBID` text,
	`artist` text,
	`date` text,
	`title` text NOT NULL,
	`album` text
);
--> statement-breakpoint
CREATE TABLE `tracks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`download_id` integer,
	`metadata_id` integer,
	FOREIGN KEY (`download_id`) REFERENCES `downloads`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`metadata_id`) REFERENCES `track_metadata`(`id`) ON UPDATE no action ON DELETE no action
);
