ALTER TABLE `downloads` RENAME COLUMN "youtube_url" TO "youtube_id";--> statement-breakpoint
CREATE UNIQUE INDEX `downloads_filepath_unique` ON `downloads` (`filepath`);--> statement-breakpoint
CREATE UNIQUE INDEX `track_metadata_music_brainz_id_unique` ON `track_metadata` (`music_brainz_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `track_metadata_MBID_unique` ON `track_metadata` (`MBID`);--> statement-breakpoint
CREATE UNIQUE INDEX `tracks_download_id_unique` ON `tracks` (`download_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `tracks_metadata_id_unique` ON `tracks` (`metadata_id`);