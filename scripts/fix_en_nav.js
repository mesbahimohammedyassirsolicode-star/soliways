const fs = require('fs');
const p = require('path').join(__dirname, '..', 'frontend', 'en.html');
let s = fs.readFileSync(p, 'utf8');
s = s.replace('href="/en.html" class="hover:text-primary transition" aria-label="English">EN', 'href="/en.html" class="text-primary" aria-label="English">EN');
s = s.replace('href="/" class="text-primary" aria-label="Français">FR', 'href="/" class="hover:text-primary transition" aria-label="Français">FR');
fs.writeFileSync(p, s);
console.log('done');
