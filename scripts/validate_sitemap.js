const fs = require('fs');
const s = fs.readFileSync('frontend/sitemap.xml','utf8');
if(!s.includes('<?xml')) console.log('no-xml');
if(s.match(/<loc>[^<]+<\/loc>/g).length) console.log('count:'+s.match(/<loc>[^<]+<\/loc>/g).length);
console.log(s.match(/404\.html/) ? 'has404' : 'no404');
console.log(s.match(/www\.soli-ways\.online/) ? 'www' : 'no-www');
