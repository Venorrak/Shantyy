import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "sqlite",
  schema: "./src/backend/db/schema.ts",
  out: "./src/backend/db/drizzle",
  dbCredentials: {
    url: "sqlite:./src/backend/db/sqlite.db",
  },
});