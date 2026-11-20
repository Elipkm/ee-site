import { defineConfig } from 'astro/config';

// User-Site (https://<user>.github.io): SITE_BASE leer lassen.
// Projekt-Site (https://<user>.github.io/<repo>): SITE_BASE=/<repo>
export default defineConfig({
  site: process.env.SITE_URL ?? 'https://USERNAME.github.io',
  base: process.env.SITE_BASE ?? '/',
});
