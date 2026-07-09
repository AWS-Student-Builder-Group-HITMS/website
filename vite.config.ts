import { defineConfig, type Plugin, type ViteDevServer } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import type { IncomingMessage, ServerResponse } from "node:http";

interface ContactApiRequest {
  method: string;
  body: unknown;
  headers: Record<string, string | string[] | undefined> | undefined;
  query: Record<string, string>;
}

interface ContactApiResponse {
  statusCode: number;
  headers: Record<string, string>;
  body?: unknown;
  setHeader(name: string, value: string): void;
  status(code: number): ContactApiResponse;
  json(payload: unknown): ContactApiResponse;
  send(payload: unknown): ContactApiResponse;
  end(payload?: unknown): ContactApiResponse;
}

function contactApiPlugin(): Plugin {
  return {
    name: "contact-api",
    configureServer(server: ViteDevServer) {
      server.middlewares.use(
        async (req: IncomingMessage & { url?: string }, res: ServerResponse, next) => {
          const pathname = new URL(req.url || "/", "http://127.0.0.1").pathname;

          if (pathname !== "/api/contact") {
            return next();
          }

          if (req.method === "OPTIONS") {
            res.statusCode = 200;
            res.setHeader("Access-Control-Allow-Credentials", "true");
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
            res.setHeader(
              "Access-Control-Allow-Headers",
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
            );
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
              const handler = mod.default as (
                req: ContactApiRequest,
                res: ContactApiResponse,
              ) => Promise<void>;

              const request: ContactApiRequest = {
                method: String(req.method ?? ""),
                body: parsedBody,
                headers: req.headers,
                query: {},
              };

              const response: ContactApiResponse = {
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

              await handler(request, response);

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
              res.end(
                JSON.stringify({
                  error: "An unexpected error occurred while sending the message.",
                }),
              );
            }
          });
        },
      );
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
          vendor: ["react", "react-dom", "react-router-dom"],
          // Split UI components library
          ui: [
            "@radix-ui/react-accordion",
            "@radix-ui/react-alert-dialog",
            "@radix-ui/react-aspect-ratio",
            "@radix-ui/react-avatar",
            "@radix-ui/react-checkbox",
          ],
          // Split animation libraries
          animations: ["framer-motion"],
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
