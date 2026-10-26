import type { BunRequest } from "bun";
import { youtubeApiService } from "../services/youtubeApi.service";
import type { Download, NewDownload, NewTrackMetadata, TrackMetadata } from "../db/types";
import {drizzle} from 'drizzle-orm/bun-sqlite';
const db = drizzle("./src/backend/db/sqlite.db");
import * as schema from "../db/schema";


export const downloadRoutes = {
    "/api/download/track": {
        async POST(req: BunRequest<"/api/download/track">) {
            // Handle track download request
            const requestData = await req.json();
            const { metadata } : { metadata: NewTrackMetadata } = requestData;
            
            let results = await youtubeApiService.getVideoList(`${metadata.artist} - ${metadata.title}`)
            console.log(results);
            let result = results.filter(result => result.type === "SONG")[0] || results.filter(result => result.type === "VIDEO")[0];
            if (!result){
                return Response.json({
                    message: "No music found on youtube",
                }, { status: 404 });
            }

            const newDownload : NewDownload = {
                createdAt: Date.now(),
                statusId: 1, // pending
                youtubeId: result.videoId,
            }

            let newDownloadId: number | undefined;
            let newMetadataId: number | undefined;

            db.insert(schema.downloads).values(newDownload).returning().then((download: Download[]) => {
                console.log("Inserted download:", download);
                newDownloadId = download[0]?.id;
            }).catch((error) => {
                console.error("Error inserting download:", error);
            });

            db.insert(schema.trackMetadata).values(metadata).returning().then((trackMeta: TrackMetadata[]) => {
                console.log("Inserted track metadata:", trackMeta);
                newMetadataId = trackMeta[0]?.id;
            }).catch((error) => {
                console.error("Error inserting track metadata:", error);
            });

            let newTrack = {
                downloadId: newDownloadId!,
                metadataId: newMetadataId!,
            }

            db.insert(schema.tracks).values(newTrack).then(() => {
                console.log("Inserted track:", newTrack);
            }).catch((error) => {
                console.error("Error inserting track:", error);
            });

            // find first music
            // create a download entry in the database
            // queue the download task
            return Response.json({
                    message: "Download queued"
            }, { status: 202 });
        }
    }
}