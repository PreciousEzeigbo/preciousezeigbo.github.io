/**
 * Prerender script — Typewriter Tales portfolio
 *
 * Serves the built dist/ directory locally, launches a headless Chromium
 * browser, waits for React to fully render, then overwrites dist/index.html
 * with the fully-rendered HTML. The JS bundles are kept intact so the page
 * still hydrates and becomes interactive for real users.
 *
 * Run after `bun run build`:
 *   bun run scripts/prerender.ts
 */

import { chromium } from "@playwright/test";
import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

const PORT = 4173;
const DIST_DIR = resolve(import.meta.dir, "../dist");
const INDEX_PATH = resolve(DIST_DIR, "index.html");

// ─── 1. Serve dist/ with Bun's built-in static server ───────────────────────

const mimeTypes: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "application/javascript",
  ".mjs": "application/javascript",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".json": "application/json",
  ".txt": "text/plain",
  ".pdf": "application/pdf",
};

function getMime(path: string): string {
  const ext = path.slice(path.lastIndexOf(".")).toLowerCase();
  return mimeTypes[ext] ?? "application/octet-stream";
}

const server = Bun.serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url);
    let pathname = url.pathname;

    // Serve index.html for the root and any unknown paths (SPA fallback)
    if (pathname === "/" || !pathname.includes(".")) {
      pathname = "/index.html";
    }

    const filePath = resolve(DIST_DIR, "." + pathname);

    try {
      const file = Bun.file(filePath);
      const exists = await file.exists();
      if (!exists) {
        // SPA fallback — serve index.html
        const fallback = Bun.file(INDEX_PATH);
        return new Response(fallback, {
          headers: { "Content-Type": "text/html; charset=utf-8" },
        });
      }
      return new Response(file, {
        headers: { "Content-Type": getMime(filePath) },
      });
    } catch {
      return new Response("Not found", { status: 404 });
    }
  },
});

console.log(`✓ Static server started at http://localhost:${PORT}`);

// ─── 2. Launch headless Chromium, render the page ───────────────────────────

try {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Suppress console noise from the prerender page
  page.on("console", () => {});
  page.on("pageerror", (err) => {
    console.error("Page error:", err.message);
  });

  console.log("⏳ Navigating to page and waiting for React to render…");

  await page.goto(`http://localhost:${PORT}/`, {
    waitUntil: "networkidle",
    timeout: 30_000,
  });

  // Wait until #root has actual children (React has mounted)
  await page.waitForFunction(
    () => {
      const root = document.getElementById("root");
      return root !== null && root.children.length > 0;
    },
    { timeout: 15_000 }
  );

  // Extra small wait for any deferred renders / animations to settle
  await page.waitForTimeout(500);

  // ─── 3. Extract and clean up the rendered HTML ───────────────────────────────

  const renderedHTML = await page.content();

  // We want to preserve the original <head> (with its inline critical CSS and
  // theme-flash-prevention script) but replace <body> content with what React
  // actually rendered. The simplest safe approach: just use the full page HTML.
  // Playwright's page.content() returns the live serialised DOM which already
  // contains everything.

  writeFileSync(INDEX_PATH, renderedHTML, "utf-8");

  console.log(`✓ dist/index.html overwritten with prerendered content`);

  // Quick sanity check — confirm there's real content in the output
  const written = readFileSync(INDEX_PATH, "utf-8");
  const hasContent = written.includes("Precious") || written.includes("portfolio") || written.length > 5000;
  if (hasContent) {
    console.log("✓ Sanity check passed — prerendered HTML contains real content");
  } else {
    console.warn("⚠ Sanity check: prerendered HTML may be incomplete — check dist/index.html");
  }

  // ─── 4. Cleanup ─────────────────────────────────────────────────────────────

  await browser.close();
  server.stop();

  console.log("✅ Prerender complete");
} catch (error) {
  console.warn("⚠ Playwright prerender failed (e.g. browser not installed/network issue).");
  console.warn(error instanceof Error ? error.message : error);
  console.warn("Skipping prerender step and keeping standard client-side index.html.");
  server.stop();
  process.exit(0);
}
