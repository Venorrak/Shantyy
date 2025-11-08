import { spawn } from "child_process";
import type { DownloadStatus, DownloadJob } from "@/models/download.model";

class DownloadQueue {
    private queue: DownloadJob[] = [];
    private processing = new Map<string, DownloadJob>();
    private maxConcurrentDownloads = 3;

    addJob(job: Omit<DownloadJob, "id" | "status" | "createdAt">) {
        const id = crypto.randomUUID();
        const newJob: DownloadJob = {
            ...job,
            id,
            status: "pending",
            createdAt: new Date(),
        };
        this.queue.push(newJob);
        this.processNext();
        return id;
    }

    private async processNext() {
        if (this.processing.size >= this.maxConcurrentDownloads) return;

        const job = this.queue.find(j => j.status === "pending");
        if (!job) return;

        job.status = "processing";
        this.processing.set(job.id, job);

        try {
            await this.downloadTrack(job);
            job.status = "completed";
            job.completedAt = new Date();
        } catch (error) {
            job.status = "failed";
            job.error = error instanceof Error ? error.message : String(error);
        } finally {
            this.processing.delete(job.id);
            this.processNext();
        }
    }

    private downloadTrack(job: DownloadJob): Promise<void> {
        return new Promise((resolve, reject) => {
            const args = this.buildSpotdlArgs(job);
            const spotdl = spawn("spotdl", args);

            spotdl.stdout.on("data", (data) => {
                const output = data.toString();
                console.log(`[${job.id}] ${output}`);
            });

            spotdl.stderr.on("data", (data) => {
                console.error(`[${job.id}] ERROR: ${data.toString()}`);
            });

            spotdl.on("close", (code) => {
                if (code === 0) {
                    resolve();
                } else {
                    reject(new Error(`spotdl exited with code ${code}`));
                }
            });
        });
    }

    private buildSpotdlArgs(job: DownloadJob): string[] {
        const args = ["download"];

        // Add the search query (artist - title)
        args.push(`${job.artist} - ${job.title}`);
        
        // Add more arguments based on configuration as needed
        // e.g., output format, download location, etc.
        args.push("--config");
        
        return args;
    }

    getJob(id: string): DownloadJob | undefined {
        return this.queue.find(job => job.id === id) || this.processing.get(id);
    }

    getAllJobs(): DownloadJob[] {
        return [...this.queue, ...Array.from(this.processing.values())];
    }

    setMaxConcurrentDownloads(count: number) {
        this.maxConcurrentDownloads = count;
        this.processNext();
    }

}

export const downloadQueue = new DownloadQueue();