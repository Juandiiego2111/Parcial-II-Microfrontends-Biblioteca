#!/usr/bin/env node
/**
 * Ensambla el sitio estático para GitHub Pages a partir de los builds de las 4 apps.
 *
 * @remarks
 * - El Host se publica en la raíz del sitio (`/`).
 * - Cada microfrontend se publica en `/remotes/<mf>/`.
 *
 * Uso: `node scripts/assemble-ghpages.mjs`
 */

import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = join(dirname(fileURLToPath(import.meta.url)), '..');
const siteDir = join(rootDir, 'site');

const HOST_DIST_DIR = join(rootDir, 'Client-Host-Angular', 'dist', 'Client-Host-Angular');

const MICROFRONTENDS_DIST = {
  books: join(rootDir, 'Microfrontend-Books-Angular', 'dist', 'Microfrontend-Books-Angular'),
  members: join(rootDir, 'Microfrontend-Members-Angular', 'dist', 'Microfrontend-Members-Angular'),
  loans: join(rootDir, 'Microfrontend-Loans-Angular', 'dist', 'Microfrontend-Loans-Angular'),
};

function removeDir(path) {
  rmSync(path, { recursive: true, force: true });
}

function ensureDir(path) {
  mkdirSync(path, { recursive: true });
}

function main() {
  removeDir(siteDir);
  ensureDir(siteDir);

  // 1. El host se publica en la raíz del sitio.
  cpSync(HOST_DIST_DIR, siteDir, { recursive: true });

  // 2. Cada microfrontend se publica bajo /remotes/<mf>/.
  for (const [name, distPath] of Object.entries(MICROFRONTENDS_DIST)) {
    const targetDir = join(siteDir, 'remotes', name);
    ensureDir(targetDir);
    cpSync(distPath, targetDir, { recursive: true });
  }

  // 3. Validaciones básicas del ensamblaje.
  const hostIndex = join(siteDir, 'index.html');
  if (!existsSync(hostIndex)) {
    throw new Error(`No se encontró el index del host en ${hostIndex}`);
  }

  const requiredRemotes = ['books', 'members', 'loans'];
  for (const name of requiredRemotes) {
    const remoteEntry = join(siteDir, 'remotes', name, 'remoteEntry.js');
    if (!existsSync(remoteEntry)) {
      throw new Error(`No se encontró el remoteEntry del microfrontend ${name} en ${remoteEntry}`);
    }
  }

  console.log('Sitio de GitHub Pages ensamblado en:');
  console.log(`  ${hostIndex}`);
  for (const name of requiredRemotes) {
    console.log(`  ${join(siteDir, 'remotes', name)}`);
  }
}

main();
