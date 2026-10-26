import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const downloadStatus = sqliteTable("download_status", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    status: text("status").notNull(), // "pending", "fetching metadata", "downloading file", "completed", "failed"});
});

export const downloads = sqliteTable("downloads", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    createdAt: integer("created_at").notNull(),
    completedAt: integer("completed_at"),
    statusId: integer("status_id")
        .notNull()
        .references(() => downloadStatus.id),
    progress: integer("progress").notNull().default(0), // percentage 0-100
    youtubeId: text("youtube_id").notNull(),
    filepath: text("filepath").unique(),
    error: text("error"),
});

export const trackMetadata = sqliteTable("track_metadata", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    musicBrainzId: text("music_brainz_id").unique(),
    MBID: text("MBID").unique(),
    artist: text("artist"),
    date: text("date"),
    title: text("title").notNull(),
    album: text("album"),
});

export const tracks = sqliteTable("tracks", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    downloadId: integer("download_id").references(() => downloads.id).unique(),
    metadataId: integer("metadata_id").references(() => trackMetadata.id).unique(),
});