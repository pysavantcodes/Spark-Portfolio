/**
 * Script to download all images from src/utils/data.js
 * Run with: node scripts/download-images.js
 *
 * Handles unstable IPFS with retries, timeout, and delay between requests.
 */

import { data } from "../src/utils/data.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.join(__dirname, "..", "downloaded-images");

// IPFS gateways can be slow/unstable – increase timeout and retry
const FETCH_TIMEOUT_MS = 90_000; // 90 seconds per attempt
const MAX_RETRIES = 4;
const RETRY_DELAY_MS = 3000; // 3s between retries (exponential: 3s, 6s, 12s)
const DELAY_BETWEEN_IMAGES_MS = 800; // avoid hammering the gateway

function sanitizeName(str) {
  return str
    .replace(/[<>:"/\\|?*]/g, "-")
    .replace(/\s+/g, "_")
    .replace(/-+/g, "-")
    .replace(/_+/g, "_")
    .slice(0, 80);
}

function getExtensionFromUrl(url) {
  try {
    const pathname = new URL(url).pathname;
    const ext = path.extname(pathname).toLowerCase();
    if ([".jpg", ".jpeg", ".png", ".gif", ".webp"].includes(ext)) return ext;
  } catch (_) {}
  return ".jpg";
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithTimeout(url, options = {}, timeoutMs = FETCH_TIMEOUT_MS) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; ImageDownloader/1.0)",
        ...options.headers,
      },
      redirect: "follow",
    });
    clearTimeout(id);
    return res;
  } catch (err) {
    clearTimeout(id);
    if (err.name === "AbortError") throw new Error("Timeout");
    throw err;
  }
}

async function downloadImage(url, filepath) {
  const res = await fetchWithTimeout(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  fs.mkdirSync(path.dirname(filepath), { recursive: true });
  fs.writeFileSync(filepath, buffer);
}

async function main() {
  console.log("Downloading images from data.js...\n");

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  let total = 0;
  let ok = 0;
  let failed = 0;

  for (const item of data) {
    const folderName = sanitizeName(item.title);
    const projectDir = path.join(OUTPUT_DIR, folderName);
    const images = item.images || [];

    if (images.length === 0) {
      console.log(`[SKIP] "${item.title}" - no images`);
      continue;
    }

    console.log(`\n[${item.title}] ${images.length} image(s)`);

    for (let i = 0; i < images.length; i++) {
      const url = images[i];
      total++;
      const ext = getExtensionFromUrl(url);
      const filename = `img_${String(i + 1).padStart(2, "0")}${ext}`;
      const filepath = path.join(projectDir, filename);

      if (fs.existsSync(filepath)) {
        ok++;
        console.log(`  ✓ ${filename} (already exists, skip)`);
        await sleep(DELAY_BETWEEN_IMAGES_MS);
        continue;
      }

      let lastErr = null;
      for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
          await downloadImage(url, filepath);
          ok++;
          console.log(`  ✓ ${filename}`);
          lastErr = null;
          break;
        } catch (err) {
          lastErr = err;
          if (attempt < MAX_RETRIES) {
            const delay = RETRY_DELAY_MS * Math.pow(2, attempt - 1);
            console.log(`  ⏳ ${filename} attempt ${attempt}/${MAX_RETRIES} failed (${err.message}), retry in ${delay / 1000}s...`);
            await sleep(delay);
          }
        }
      }
      if (lastErr) {
        failed++;
        console.log(`  ✗ ${filename} - ${lastErr.message} (after ${MAX_RETRIES} attempts)`);
      }

      await sleep(DELAY_BETWEEN_IMAGES_MS);
    }
  }

  console.log("\n--- Done ---");
  console.log(`Total: ${total} | OK: ${ok} | Failed: ${failed}`);
  console.log(`Saved to: ${OUTPUT_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
