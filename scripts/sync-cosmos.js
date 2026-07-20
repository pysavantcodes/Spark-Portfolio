#!/usr/bin/env node
/**
 * Rebuilds the cosmos-studios Next app as a static export and copies it into
 * public/cosmos-studios/, which Vite ships verbatim into dist/.
 *
 * Cosmos is a separate repo/app; it is mounted here (rather than ported into
 * this SPA) because it already builds with `output: "export"`. Its next.config
 * sets basePath=/cosmos-studios so every Link, /_next asset and public/ path is
 * emitted with the prefix already applied.
 *
 * Usage:  npm run sync-cosmos [-- --cosmos-dir=/path/to/cosmos-studios]
 *
 * The copied output is COMMITTED to this repo on purpose: the Vercel build for
 * this project only runs `vite build`, so it never builds cosmos itself.
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");

const argDir = process.argv.find((a) => a.startsWith("--cosmos-dir="));
const cosmosDir = path.resolve(
  argDir ? argDir.split("=")[1] : path.join(repoRoot, "..", "cosmos-studios")
);
const destDir = path.join(repoRoot, "public", "cosmos-studios");

if (!fs.existsSync(path.join(cosmosDir, "next.config.mjs"))) {
  console.error(`✗ No cosmos-studios app at ${cosmosDir}`);
  console.error(`  Pass one with: npm run sync-cosmos -- --cosmos-dir=/path/to/cosmos-studios`);
  process.exit(1);
}

console.log(`→ Building cosmos-studios (${cosmosDir})`);
execFileSync("npx", ["next", "build"], {
  cwd: cosmosDir,
  stdio: "inherit",
  // Explicit so a stray shell value can't silently strip the prefix.
  env: { ...process.env, NEXT_PUBLIC_BASE_PATH: "/cosmos-studios" },
});

const outDir = path.join(cosmosDir, "out");
if (!fs.existsSync(outDir)) {
  console.error(`✗ Build produced no out/ directory — is output:"export" still set?`);
  process.exit(1);
}

// Guard against shipping a build that lost its prefix, which would 404 every
// asset and let the SPA catch-all swallow the routes.
const indexHtml = fs.readFileSync(path.join(outDir, "index.html"), "utf8");
if (!indexHtml.includes("/cosmos-studios/_next/")) {
  console.error(`✗ Export is missing the /cosmos-studios basePath — refusing to copy.`);
  process.exit(1);
}

fs.rmSync(destDir, { recursive: true, force: true });
fs.cpSync(outDir, destDir, { recursive: true });

console.log(`✓ Synced cosmos-studios → public/cosmos-studios`);
console.log(`  Commit the result; the Vercel build here only runs vite.`);
