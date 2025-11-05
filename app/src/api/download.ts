import { downloadQueue } from "@/services/download.service";
import type { BunRequest } from "bun";


export const downloadRoutes = {
    "/api/download/track": {
        async POST(req: BunRequest<"/api/download/track">) {
            // Handle track download request
            const requestData = await req.json();
            const { artist, title } = requestData;

            const jobId = downloadQueue.addJob({ artist, title });

            return Response.json({
                message: "Download queued",
                jobId,
            }, { status: 202 });
        }
    },
}