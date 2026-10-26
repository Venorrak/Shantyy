import { serve } from "bun";
import index from "../frontend/index.html";
import { downloadRoutes } from "./api/download";

const server = serve({
  port: 3838,
  routes: {
    // Serve index.html for all unmatched routes.
    "/*": index,
    
    ...downloadRoutes,

    "/api/status": {
      async GET(req) {
        return Response.json({
          message: "Alive and well!",
          method: "GET",
        });
      },
    },
  },

  development: process.env.NODE_ENV !== "production" && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);
