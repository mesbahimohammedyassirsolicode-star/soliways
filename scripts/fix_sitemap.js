const fs = require('fs');
const p = require('path').join(__dirname, '..', 'frontend', 'sitemap.xml');
let s = fs.readFileSync(p, 'utf8');
s = s.replace(/<url>\s*<loc>[^<]+404\.html<\/loc>[\s\S]*?<\/url>\s*/g, '');
s = s.replace(/<lastmod>2027-01-01<\/lastmod>/g, '<lastmod>2026-10-26</lastmod>');
if (!s.includes('/en.html')) {
  s = s.replace('</urlset>', '  <url>\n    <loc>https://www.soli-ways.online/en.html</loc>\n    <lastmod>2026-10-26</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.9</priority>\n  </url>\n</urlset>');
}
fs.writeFileSync(p, s);
console.log('done');
