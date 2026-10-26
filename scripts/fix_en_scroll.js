const fs = require('fs');
const p = require('path').join(__dirname, '..', 'frontend', 'en.html');
let s = fs.readFileSync(p, 'utf8');
const old = '<button x-cloak x-show="visible" x-transition @click="scrollToTop()" class="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-primary text-white shadow-glow-primary hover:bg-primary-hover active:scale-95 transition" aria-label="Back to top">';
const neu = '<button x-cloak x-show="visible" x-transition @click="scrollToTop()" class="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-primary text-white shadow-glow-primary hover:bg-primary-hover active:scale-95 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70" aria-label="Back to top">';
if (s.includes(old)) { s = s.split(old).join(neu); fs.writeFileSync(p,s); console.log('ok'); } else console.log('skip');
