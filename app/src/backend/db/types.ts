import * as schema from "./schema";

export type DownloadStatus = typeof schema.downloadStatus.$inferSelect;
export type NewDownloadStatus = typeof schema.downloadStatus.$inferInsert;

export type Download = typeof schema.downloads.$inferSelect;
export type NewDownload = typeof schema.downloads.$inferInsert;

export type TrackMetadata = typeof schema.trackMetadata.$inferSelect;
export type NewTrackMetadata = typeof schema.trackMetadata.$inferInsert;

export type Track = typeof schema.tracks.$inferSelect;
export type NewTrack = typeof schema.tracks.$inferInsert;