const fs = require('fs');
const path = require('path');
const p = path.join(__dirname, '..', 'frontend', 'sitemap.xml');
let s = fs.readFileSync(p, 'utf8');
s = s.replace(/https:\/\/www\.soli-ways\.online/g, 'https://soli-ways.online');
s = s.replace(/soli-ways\.online\/en\.html/g, 'soli-ways.online/en');
s = s.replace(/<lastmod>2027-01-01<\/lastmod>/g, '<lastmod>2026-10-30</lastmod>');
fs.writeFileSync(p, s);
console.log('done');
