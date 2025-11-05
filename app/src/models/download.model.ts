export type DownloadStatus = "pending" | "processing" | "completed" | "failed";

export interface DownloadJob {
    id: string;
    artist: string;
    title: string;
    status: DownloadStatus;
    error?: string;
    createdAt: Date;
    completedAt?: Date;
}