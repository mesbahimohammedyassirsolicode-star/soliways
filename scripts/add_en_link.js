const fs = require('fs');
const p = require('path').join(__dirname, '..', 'frontend', 'index.html');
let s = fs.readFileSync(p, 'utf8');
const old = '            <li><a href="#pratique" class="hover:text-primary transition">Informations pratiques & FAQ</a></li>';
const neu = old + '\n            <li><a href="/en" class="hover:text-primary transition">English version</a></li>';
if (s.indexOf(neu) === -1 && s.indexOf(old) !== -1) {
  s = s.split(old).join(neu);
  fs.writeFileSync(p, s);
  console.log('ok');
} else {
  console.log('skip');
}
