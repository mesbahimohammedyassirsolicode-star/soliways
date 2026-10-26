const fs = require('fs');
const p = require('path').join(__dirname, '..', 'frontend', 'sitemap.xml');
let s = fs.readFileSync(p, 'utf8');
s = s.replace(/<script[\s\S]*?<\/script>/gi, '');
s = s.replace(/\\n/g, '\n');
s = s.replace(/\r\n/g, '\n');
s = s.replace(/\t/g, '  ');
fs.writeFileSync(p, s);
console.log('done');
