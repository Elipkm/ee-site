// Copies only notes with `publish: true` aus dem Obsidian-Vault into src/content/.
// Usage: npm run sync   (vault = folder above site/)
import { readdir, readFile, writeFile, mkdir, rm, copyFile, stat } from 'node:fs/promises';
import { join, dirname, basename, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const vault = join(root, '..', '..');
const out = join(root, '..', 'src', 'content');
const map = { 'Knowledge': 'knowledge', 'Talks': 'talks', 'Recommendations': 'recommendations', 'Projects': 'projects' };

const slug = (s) => s.toLowerCase().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
  .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// Dates: `created:` / `updated:` in the frontmatter win; otherwise the file's timestamps are used.
const day = (d) => d.toLocaleDateString('sv-SE', { timeZone: 'Europe/Vienna' }); // YYYY-MM-DD
const fmDate = (fm, ...keys) => {
  for (const k of keys) {
    const m = fm.match(new RegExp(`^${k}:\\s*['\"]?(\\d{4}-\\d{2}-\\d{2})`, 'm'));
    if (m) return m[1];
  }
  return null;
};

async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* walk(p); else if (extname(e.name) === '.md') yield p;
  }
}

// Index of image files anywhere in the vault (by file name), for ![[image.png]] embeds.
const skipDirs = new Set(['site', '_to_delete', '.obsidian', '.git', 'node_modules']);
const imageExt = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg']);
const images = new Map();
async function indexImages(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    if (e.isDirectory()) { if (!skipDirs.has(e.name)) await indexImages(join(dir, e.name)); }
    else if (imageExt.has(extname(e.name).toLowerCase())) images.set(e.name.toLowerCase(), join(dir, e.name));
  }
}
await indexImages(vault);
const publicImages = join(root, '..', 'public', 'images');
await rm(publicImages, { recursive: true, force: true }).catch(() => {});

const published = [];
for (const [folder, collection] of Object.entries(map)) {
  try {
    for await (const file of walk(join(vault, folder))) {
      const raw = await readFile(file, 'utf8');
      const fm = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
      if (!fm || !/^publish:\s*true\s*$/m.test(fm[1])) continue;
      const name = basename(file, '.md');
      const st = await stat(file);
      const modified = day(st.mtime);
      const born = st.birthtimeMs > 0 && st.birthtime <= st.mtime ? day(st.birthtime) : modified;
      const created = fmDate(fm[1], 'created', 'created_at') ?? born;
      const updated = fmDate(fm[1], 'updated', 'updated_at') ?? modified;
      const withDates = raw
        .replace(/^publish:.*\r?\n/m, '')
        .replace(/^(?:created|created_at|updated|updated_at):.*\r?\n/gm, '')
        .replace(/^---\r?\n/, `---\ncreated: ${created}\nupdated: ${updated < created ? created : updated}\n`);
      published.push({ collection, name, slug: slug(name), raw: withDates });
    }
  } catch { /* folder does not exist */ }
}

const index = new Map(published.map((p) => [p.name.toLowerCase(), p]));
const link = (target, label) => {
  const hit = index.get(target.split('#')[0].trim().toLowerCase());
  return hit && hit.collection === 'knowledge' ? `[${label}](/knowledge/${hit.slug})` : label;
};

for (const c of Object.values(map)) {
  await rm(join(out, c), { recursive: true, force: true }).catch(() => {});
  await mkdir(join(out, c), { recursive: true });
}
for (const p of published) {
  const embeds = [];
  let body = p.raw.replace(/!\[\[([^\]|]+)(?:\|[^\]]*)?\]\]/g, (_, target) => {
    const file = images.get(target.trim().toLowerCase());
    if (!file) { console.warn(`Image not found in vault: ${target} (in ${p.name})`); return ''; }
    const ext = extname(file).toLowerCase();
    const name = `${slug(basename(file, extname(file))) || 'image'}${ext}`;
    embeds.push({ file, name });
    return `![${basename(file, extname(file))}](/images/${p.collection}/${p.slug}/${name})`;
  });
  for (const e of embeds) {
    const dir = join(publicImages, p.collection, p.slug);
    await mkdir(dir, { recursive: true });
    await copyFile(e.file, join(dir, e.name));
  }
  body = body
    .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, (_, t, l) => link(t, l))
    .replace(/\[\[([^\]]+)\]\]/g, (_, t) => link(t, t));
  await writeFile(join(out, p.collection, `${p.slug}.md`), body);
}
console.log(`${published.length} note(s) published.`);
