import fs from 'fs';
import path from 'path';
const p = path.join(process.cwd(), 'frontend', 'index.html');
let s = fs.readFileSync(p, 'utf8');
if (s.includes('hreflang')) { console.log('has'); process.exit(0); }
const marker = '  <!-- Open Graph / Facebook -->';
const rep = `  <!-- Hreflang -->\n  <link rel="alternate" hreflang="fr" href="https://soli-ways.online/">\n  <link rel="alternate" hreflang="en" href="https://soli-ways.online/en">\n  <link rel="alternate" hreflang="x-default" href="https://soli-ways.online/">\n\n  <!-- Open Graph / Facebook -->`;
s = s.replace(marker, rep);
fs.writeFileSync(p, s);
console.log('ok');
