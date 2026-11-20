import { defineConfig } from 'astro/config';

// User site (https://<user>.github.io):          leave SITE_BASE empty.
// Project site (https://<user>.github.io/<repo>): SITE_BASE=/<repo>
const base = (process.env.SITE_BASE ?? '').replace(/\/$/, '');

// Markdown notes use root-relative links like /knowledge/x and /images/y.png.
// This plugin prefixes them with the base path, so they also work on a project site.
function rehypePrefixBase() {
  const fix = (v) =>
    typeof v === 'string' && base && v.startsWith('/') && !v.startsWith('//') && !v.startsWith(base + '/') ? base + v : v;
  const walk = (node) => {
    if (node.type === 'element') {
      if (node.tagName === 'a' && node.properties?.href) node.properties.href = fix(node.properties.href);
      if (node.tagName === 'img' && node.properties?.src) node.properties.src = fix(node.properties.src);
    }
    node.children?.forEach(walk);
  };
  return (tree) => walk(tree);
}

export default defineConfig({
  site: process.env.SITE_URL ?? 'https://elipkm.github.io',
  base: base || '/',
  markdown: { rehypePlugins: [rehypePrefixBase] },
});
