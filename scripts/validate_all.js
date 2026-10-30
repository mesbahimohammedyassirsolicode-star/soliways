/**
 * Static SEO / AI-readability checks for the deployed `frontend/` directory.
 * Run with: node scripts/validate_all.js
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const frontend = path.join(root, 'frontend');
const errors = [];
const warnings = [];

const read = (file) => fs.readFileSync(path.join(frontend, file), 'utf8');
const check = (condition, message) => {
  if (!condition) errors.push(message);
};

// --- HTML pages -----------------------------------------------------------
const pages = [
  {
    file: 'index.html',
    lang: 'fr',
    canonical: 'https://soli-ways.online/',
    ogUrl: 'https://soli-ways.online/',
    breadcrumb: false
  },
  {
    file: 'en.html',
    lang: 'en',
    canonical: 'https://soli-ways.online/en',
    ogUrl: 'https://soli-ways.online/en',
    breadcrumb: true
  }
];

const linkTargets = new Set();

for (const page of pages) {
  const html = read(page.file);
  const label = page.file;

  check(new RegExp(`<html lang="${page.lang}"`).test(html), `${label}: html lang must be ${page.lang}`);

  const title = html.match(/<title>([^<]+)<\/title>/);
  check(title, `${label}: missing <title>`);
  if (title) {
    check(title[1].length >= 30 && title[1].length <= 65, `${label}: title length ${title[1].length} (expected 30-65)`);
  }

  const description = html.match(/<meta name="description" content="([^"]+)"/);
  check(description, `${label}: missing meta description`);
  if (description) {
    check(
      description[1].length >= 70 && description[1].length <= 165,
      `${label}: description length ${description[1].length} (expected 70-165)`
    );
  }

  check(html.includes(`<link rel="canonical" href="${page.canonical}">`), `${label}: canonical must be ${page.canonical}`);
  check(html.includes(`<meta property="og:url" content="${page.ogUrl}">`), `${label}: og:url must be ${page.ogUrl}`);
  check(html.includes('og:image" content="https://soli-ways.online/assets/img/og-soliways-2027.png"'), `${label}: OG image must be the PNG`);
  check(html.includes('name="twitter:card"'), `${label}: missing Twitter card`);
  check(html.includes('rel="manifest"'), `${label}: missing web manifest`);

  const h1s = html.match(/<h1\b/g) || [];
  check(h1s.length === 1, `${label}: expected exactly one h1, found ${h1s.length}`);

  const jsonLdBlocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  check(jsonLdBlocks.length === 1, `${label}: expected one JSON-LD block, found ${jsonLdBlocks.length}`);
  for (const block of jsonLdBlocks) {
    let data;
    try {
      data = JSON.parse(block[1]);
    } catch (error) {
      errors.push(`${label}: invalid JSON-LD (${error.message})`);
      continue;
    }
    const types = (data['@graph'] || [data]).map((node) => node['@type']);
    for (const required of ['Organization', 'WebSite', 'WebPage', 'Event', 'FAQPage']) {
      check(types.includes(required), `${label}: JSON-LD missing ${required}`);
    }
    if (page.breadcrumb) check(types.includes('BreadcrumbList'), `${label}: JSON-LD missing BreadcrumbList`);
    const event = (data['@graph'] || []).find((node) => node['@type'] === 'Event');
    check(event && event.startDate && event.endDate, `${label}: Event needs startDate and endDate`);
    check(event && event.location && event.location.address, `${label}: Event needs a location address`);
  }

  const images = [...html.matchAll(/<img\b[^>]*>/g)].map((match) => match[0]);
  for (const image of images) {
    check(/\balt="/.test(image), `${label}: image without alt: ${image.slice(0, 80)}`);
    check(/\bwidth="/.test(image) && /\bheight="/.test(image), `${label}: image without width/height: ${image.slice(0, 80)}`);
  }

  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const target = match[1];
    if (!target.startsWith('/') || target.startsWith('//')) continue;
    if (target.startsWith('/#')) continue;
    if (target.startsWith('/ui-kit')) continue;
    linkTargets.add(target.split('#')[0].split('?')[0] || '/');
  }
}

// Resolve clean URLs the same way Vercel does.
function resolveTarget(target) {
  const clean = decodeURIComponent(target.split('#')[0].split('?')[0]);
  if (clean === '/' || clean === '') return path.join(frontend, 'index.html');
  const file = path.join(frontend, clean);
  if (path.extname(clean)) return file;
  return `${file}.html`;
}

for (const target of linkTargets) {
  check(fs.existsSync(resolveTarget(target)), `broken internal target: ${target}`);
  if (target.endsWith('.html')) warnings.push(`internal link uses .html and will redirect: ${target}`);
}

// --- Canonical host consistency ------------------------------------------
for (const file of ['index.html', 'en.html', '404.html', 'robots.txt', 'sitemap.xml', 'llms.txt', 'llms-full.txt']) {
  const content = read(file);
  check(!content.includes('www.soli-ways.online'), `${file}: contains www host`);
}

// --- robots.txt -----------------------------------------------------------
const robots = read('robots.txt');
for (const bot of ['Googlebot', 'Bingbot', 'OAI-SearchBot', 'Claude-SearchBot', 'PerplexityBot', 'GPTBot', 'ClaudeBot']) {
  check(robots.includes(`User-agent: ${bot}`), `robots.txt: missing ${bot}`);
}
check(robots.includes('Sitemap: https://soli-ways.online/sitemap.xml'), 'robots.txt: sitemap must use the canonical host');

// --- sitemap.xml ----------------------------------------------------------
const sitemap = read('sitemap.xml');
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
check(locs.length === 2, `sitemap.xml: expected 2 URLs, found ${locs.length}`);
check(locs.includes('https://soli-ways.online/'), 'sitemap.xml: missing homepage');
check(locs.includes('https://soli-ways.online/en'), 'sitemap.xml: missing /en');
check(!sitemap.includes('/en.html'), 'sitemap.xml: must not contain /en.html');
check((sitemap.match(/hreflang="en"/g) || []).length === 2, 'sitemap.xml: expected hreflang alternates on both URLs');
const lastmods = [...sitemap.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((match) => match[1]);
const today = new Date().toISOString().slice(0, 10);
check(lastmods.length === 2 && lastmods.every((date) => date <= today), `sitemap.xml: lastmod must not be in the future (${lastmods.join(', ')})`);

// --- llms.txt -------------------------------------------------------------
const llms = read('llms.txt');
check(/^# SOLIWAYS 2027/m.test(llms), 'llms.txt: missing H1');
check(llms.includes('soli-ways@soli-ways.online'), 'llms.txt: missing contact email');
check(llms.includes('https://www.instagram.com/soli_ways/'), 'llms.txt: missing Instagram');
check(llms.includes('https://soli-ways.online/en'), 'llms.txt: missing English page');
check(!/^\s*MUST|TBD|TODO/im.test(llms), 'llms.txt: contains placeholder text');

// --- OG image -------------------------------------------------------------
const ogPath = path.join(frontend, 'assets', 'img', 'og-soliways-2027.png');
check(fs.existsSync(ogPath), 'missing OG PNG');
if (fs.existsSync(ogPath)) {
  const buffer = fs.readFileSync(ogPath);
  const isPng = buffer.slice(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
  check(isPng, 'OG image is not a PNG');
  if (isPng) {
    const width = buffer.readUInt32BE(16);
    const height = buffer.readUInt32BE(20);
    check(width === 1200 && height === 630, `OG image is ${width}x${height}, expected 1200x630`);
  }
}

// --- vercel.json ----------------------------------------------------------
let vercel;
try {
  vercel = JSON.parse(fs.readFileSync(path.join(root, 'vercel.json'), 'utf8'));
} catch (error) {
  errors.push(`vercel.json is invalid JSON (${error.message})`);
}
if (vercel) {
  check(vercel.outputDirectory === 'frontend', 'vercel.json: outputDirectory must be frontend');
  check(vercel.cleanUrls === true, 'vercel.json: cleanUrls must be true');
  check(Array.isArray(vercel.headers) && vercel.headers.length > 0, 'vercel.json: missing security/cache headers');
  check(
    vercel.routes && vercel.routes.some((route) => String(route.src).includes('ui-kit')),
    'vercel.json: missing /ui-kit block'
  );
  const redirects = JSON.stringify(vercel.redirects || []);
  check(!redirects.includes('soli-ways.online'), 'vercel.json: host redirects must be configured in the Vercel dashboard to avoid loops');
}

// --- Report ---------------------------------------------------------------
for (const warning of warnings) console.warn(`warn: ${warning}`);
if (errors.length) {
  for (const error of errors) console.error(`error: ${error}`);
  process.exit(1);
}
console.log(`ok: ${pages.length} pages, ${linkTargets.size} internal targets, sitemap ${locs.length} URLs`);
