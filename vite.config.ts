import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

function contactApiPlugin(): Plugin {
  return {
    name: "contact-api",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const pathname = new URL(req.url || "/", "http://127.0.0.1").pathname;

        if (pathname !== "/api/contact") {
          return next();
        }

        if (req.method === "OPTIONS") {
          res.statusCode = 200;
          res.setHeader("Access-Control-Allow-Credentials", "true");
          res.setHeader("Access-Control-Allow-Origin", "*");
          res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
          res.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version");
          res.end();
          return;
        }

        if (req.method !== "POST") {
          res.statusCode = 405;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "Method not allowed" }));
          return;
        }

        let body = "";
        req.setEncoding("utf8");
        req.on("data", (chunk) => {
          body += chunk;
        });

        req.on("end", async () => {
          try {
            const parsedBody = body ? JSON.parse(body) : {};
            const mod = await server.ssrLoadModule("/api/contact.ts");
            const handler = mod.default as (req: any, res: any) => Promise<void>;

            const request = {
              method: req.method,
              body: parsedBody,
              headers: req.headers,
              query: {},
            };

            const response = {
              statusCode: 200,
              headers: {} as Record<string, string>,
              body: undefined as unknown,
              setHeader(name: string, value: string) {
                this.headers[name] = value;
              },
              status(code: number) {
                this.statusCode = code;
                return this;
              },
              json(payload: unknown) {
                this.body = payload;
                this.setHeader("Content-Type", "application/json");
                return this;
              },
              send(payload: unknown) {
                this.body = payload;
                return this;
              },
              end(payload?: unknown) {
                if (payload !== undefined) {
                  this.body = payload;
                }
                return this;
              },
            };

            await handler(request as any, response as any);

            const payload =
              typeof response.body === "string"
                ? response.body
                : JSON.stringify(response.body ?? {});

            res.statusCode = response.statusCode;
            Object.entries(response.headers).forEach(([key, value]) => {
              res.setHeader(key, value);
            });
            res.setHeader("Content-Type", response.headers["Content-Type"] || "application/json");
            res.end(payload);
          } catch (error) {
            console.error("[contact-api]", error);
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "An unexpected error occurred while sending the message." }));
          }
        });
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), contactApiPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 8080,
    host: true,
  },
  build: {
    // Optimize code splitting for better CSR performance
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor libraries
          "vendor": ["react", "react-dom", "react-router-dom"],
          // Split UI components library
          "ui": ["@radix-ui/react-accordion", "@radix-ui/react-alert-dialog", "@radix-ui/react-aspect-ratio", "@radix-ui/react-avatar", "@radix-ui/react-checkbox"],
          // Split animation libraries
          "animations": ["framer-motion"],
          // Route chunks are automatically code-split by React lazy()
        },
      },
    },
    // Target modern browsers for smaller bundles
    target: "ES2020",
    // Minify with esbuild
    minify: "esbuild",
  },
});
