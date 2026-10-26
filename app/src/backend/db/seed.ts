import * as schema from "./schema";
import {drizzle} from 'drizzle-orm/bun-sqlite';
const db = drizzle("./src/backend/db/sqlite.db");

await db.insert(schema.downloadStatus).values([
    {
        status: "pending",
    },
    {
        status: "updating metadata",
    },
    {
        status: "downloading",
    },
    {
        status: "completed",
    },
    {
        status: "failed",
    },
]);