// Database status types - matches the download_status table
export type DbDownloadStatus = 
    | "pending" 
    | "fetching metadata" 
    | "downloading file" 
    | "completed" 
    | "failed";

// UI-friendly status types (simplified view)
export type DownloadStatus = "pending" | "processing" | "completed" | "failed";

// Database model - matches the downloads table schema
export interface DbDownload {
    id: number;
    artist: string;
    title: string;
    statusId: number;
    error: string | null;
    createdAt: number; // Unix timestamp
    completedAt: number | null; // Unix timestamp
}

// UI model - user-facing download job representation
export interface DownloadJob {
    id: string; // String for easier frontend handling
    artist: string;
    title: string;
    status: DownloadStatus;
    error?: string;
    createdAt: Date;
    completedAt?: Date;
}