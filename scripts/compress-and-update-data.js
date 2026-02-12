/**
 * Compress downloaded images (max 1200x1200, JPEG 0.8) and update data.js
 * to use local paths under public/portfolio/.
 *
 * Run: node scripts/compress-and-update-data.js
 * Requires: npm install sharp (devDependency)
 */

import { data } from "../src/utils/data.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DOWNLOADED_DIR = path.join(__dirname, "..", "downloaded-images");
const OUTPUT_DIR = path.join(__dirname, "..", "public", "portfolio");
const MAX_WIDTH = 1200;
const MAX_HEIGHT = 1200;
const JPEG_QUALITY = 0.8;

function sanitizeName(str) {
  return str
    .replace(/[<>:"/\\|?*]/g, "-")
    .replace(/\s+/g, "_")
    .replace(/-+/g, "-")
    .replace(/_+/g, "_")
    .slice(0, 80);
}

/** Natural sort so img_1, img_2, img_10 order */
function sortImageFiles(files) {
  return files.sort((a, b) => {
    const numA = parseInt(a.match(/\d+/)?.[0] ?? "0", 10);
    const numB = parseInt(b.match(/\d+/)?.[0] ?? "0", 10);
    if (numA !== numB) return numA - numB;
    return a.localeCompare(b);
  });
}

async function compressImage(inputPath, outputPath) {
  let pipeline = sharp(inputPath);

  const meta = await pipeline.metadata();
  let width = meta.width ?? 0;
  let height = meta.height ?? 0;

  if (width > MAX_WIDTH || height > MAX_HEIGHT) {
    if (width > height) {
      if (width > MAX_WIDTH) {
        height = Math.round((height * MAX_WIDTH) / width);
        width = MAX_WIDTH;
      }
    } else {
      if (height > MAX_HEIGHT) {
        width = Math.round((width * MAX_HEIGHT) / height);
        height = MAX_HEIGHT;
      }
    }
    pipeline = pipeline.resize(width, height);
  }

  await pipeline
    .flatten({ background: { r: 255, g: 255, b: 255 } })
    .jpeg({ quality: Math.round(JPEG_QUALITY * 100), mozjpeg: true })
    .toFile(outputPath);
}

async function main() {
  console.log("Compressing images and updating data.js...\n");

  if (!fs.existsSync(DOWNLOADED_DIR)) {
    console.error("Missing downloaded-images/ – run download-images.js first.");
    process.exit(1);
  }

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
  const newData = [];

  for (const item of data) {
    const folderName = sanitizeName(item.title);
    const projectSrcDir = path.join(DOWNLOADED_DIR, folderName);
    const projectOutDir = path.join(OUTPUT_DIR, folderName);

    if (!fs.existsSync(projectSrcDir) || !fs.statSync(projectSrcDir).isDirectory()) {
      console.log(`[SKIP] "${item.title}" – no folder in downloaded-images`);
      newData.push(item);
      continue;
    }

    const allFiles = fs.readdirSync(projectSrcDir);
    const imageFiles = allFiles.filter((f) =>
      imageExtensions.includes(path.extname(f).toLowerCase())
    );
    const sorted = sortImageFiles([...imageFiles]);

    if (sorted.length === 0) {
      console.log(`[SKIP] "${item.title}" – no images in folder`);
      newData.push(item);
      continue;
    }

    fs.mkdirSync(projectOutDir, { recursive: true });
    const localPaths = [];

    for (let i = 0; i < sorted.length; i++) {
      const srcFile = sorted[i];
      const srcPath = path.join(projectSrcDir, srcFile);
      const outFilename = `img_${String(i + 1).padStart(2, "0")}.jpg`;
      const outPath = path.join(projectOutDir, outFilename);

      try {
        await compressImage(srcPath, outPath);
        localPaths.push(`/portfolio/${folderName}/${outFilename}`);
        console.log(`  ✓ ${folderName}/${outFilename}`);
      } catch (err) {
        console.warn(`  ✗ ${srcFile}: ${err.message}`);
      }
    }

    if (localPaths.length > 0) {
      newData.push({ ...item, images: localPaths });
      console.log(`[OK] "${item.title}" – ${localPaths.length} image(s)\n`);
    } else {
      newData.push(item);
      console.log(`[KEEP] "${item.title}" – using original URLs\n`);
    }
  }

  const dataPath = path.join(__dirname, "..", "src", "utils", "data.js");
  const content = fs.readFileSync(dataPath, "utf8");

  const dataStart = content.indexOf("export const data = ");
  const bracketStart = content.indexOf("[", dataStart);
  if (dataStart === -1 || bracketStart === -1) {
    console.error("Could not find 'export const data = [...]' in data.js");
    process.exit(1);
  }

  const before = content.slice(0, bracketStart);
  const afterIndex = content.indexOf("];", bracketStart);
  const after = ";" + content.slice(afterIndex + 2);

  const formatted = JSON.stringify(newData, null, 2);
  const newContent = before + formatted + after;
  fs.writeFileSync(dataPath, newContent, "utf8");

  console.log("--- Done ---");
  console.log(`Compressed images in: ${OUTPUT_DIR}`);
  console.log("Updated: src/utils/data.js");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
