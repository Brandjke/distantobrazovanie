/**
 * Snapshot the running preview into a static folder for GitHub Pages.
 *
 * 1. pnpm build
 * 2. pnpm start   (or keep the already running preview)
 * 3. node scripts/export-static.mjs
 *
 * BASE_PATH=/distantobrazovanie  — GitHub project site
 * BASE_PATH=                     — custom domain / user site at the root
 */
import { cpSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const origin = process.env.PREVIEW_URL || 'http://127.0.0.1:8787';
const outDir = join(root, process.env.STATIC_OUT || 'docs');
const basePath = normalizeBase(process.env.BASE_PATH ?? '/distantobrazovanie');

function normalizeBase(value) {
  if (!value || value === '/') return '';
  return value.endsWith('/') ? value.slice(0, -1) : value;
}

function rewrite(html) {
  let next = html;
  if (basePath) {
    next = next.replaceAll('/_next/', `${basePath}/_next/`);
    next = next.replaceAll('/images/', `${basePath}/images/`);
    next = next.replaceAll('href="/favicon', `href="${basePath}/favicon`);
    next = next.replaceAll('src="/favicon', `src="${basePath}/favicon`);
  }
  return next;
}

async function fetchHome() {
  const response = await fetch(origin, { redirect: 'follow' });
  if (!response.ok) {
    throw new Error(`Preview ${origin} returned ${response.status}`);
  }
  return response.text();
}

function copyAssets() {
  const clientDir = join(root, 'dist', 'client');
  mkdirSync(outDir, { recursive: true });
  for (const name of readdirSync(clientDir)) {
    if (name === '.vite' || name === '.assetsignore' || name === '_headers') continue;
    cpSync(join(clientDir, name), join(outDir, name), { recursive: true });
  }
}

try {
  const html = rewrite(await fetchHome());
  rmSync(outDir, { recursive: true, force: true });
  copyAssets();
  writeFileSync(join(outDir, 'index.html'), html);
  writeFileSync(join(outDir, '404.html'), html);
  writeFileSync(join(outDir, '.nojekyll'), '');
  console.log(`Static export: ${outDir}`);
  console.log(`GitHub Pages URL: https://brandjke.github.io/distantobrazovanie/`);
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  console.error('Start the preview first: pnpm build && pnpm start');
  process.exit(1);
}
