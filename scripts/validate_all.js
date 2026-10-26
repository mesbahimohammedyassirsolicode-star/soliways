const fs = require('fs');
const path = require('path');

// sitemap
try {
  const xml = fs.readFileSync('frontend/sitemap.xml','utf8');
  if(xml.match(/<loc>/g)) console.log('sitemap-locs:'+xml.match(/<loc>/g).length);
  if(xml.includes('404.html')) console.log('sitemap-has404'); else console.log('sitemap-no404');
} catch(e) { console.log('sitemap-err'); }

// jsonld
try {
  const html = fs.readFileSync('frontend/index.html','utf8');
  const m = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if(m){ JSON.parse(m[1]); console.log('jsonld-fr-ok'); }
} catch(e) { console.log('jsonld-fr-err'); }
try {
  const html = fs.readFileSync('frontend/en.html','utf8');
  const m = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if(m){ JSON.parse(m[1]); console.log('jsonld-en-ok'); }
} catch(e) { console.log('jsonld-en-err'); }

// vercel
try { JSON.parse(fs.readFileSync('vercel.json','utf8')); console.log('vercel-ok'); } catch(e){ console.log('vercel-err'); }
