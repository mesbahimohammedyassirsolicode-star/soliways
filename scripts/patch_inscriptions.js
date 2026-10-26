const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '..', 'frontend', 'index.html');
let s = fs.readFileSync(file, 'utf8');

// Replace the notification card button with static div
const oldBtn = "            <button @click=\"$dispatch('open-notify-modal')\"\n                    class=\"w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-heading font-semibold text-white bg-primary hover:bg-primary-hover active:scale-[0.98] transition shadow-glow-primary\">\n              <span>Inscriptions bientôt disponibles</span>\n              <svg class=\"w-4 h-4\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9\"/></svg>\n            </button>";
const newBtn = "            <div class=\"inline-flex items-center gap-2 px-6 py-3 rounded-xl font-heading font-semibold text-sm text-slate-300 bg-dark border border-dark-border cursor-default\">\n              <span>Inscriptions bientôt disponibles</span>\n            </div>";
if (s.indexOf(oldBtn) !== -1) {
  s = s.split(oldBtn).join(newBtn);
  console.log('replaced-btn');
} else {
  console.log('btn-not-found');
}

// Also ensure FAQ text
const oldFaq = "Le lien de la billetterie et des inscriptions aux différentes sessions sera officiellement ouvert à l'approche de la date par l'équipe SOLIWAYS. Vous pouvez vous inscrire à l'alerte pour recevoir une notification prioritaire.";
const newFaq = "Le lien de la billetterie et des inscriptions aux différentes sessions sera disponible à l'approche de l'événement sur cette page.";
if (s.indexOf(oldFaq) !== -1) {
  s = s.split(oldFaq).join(newFaq);
  console.log('replaced-faq');
} else {
  console.log('faq-not-found');
}

fs.writeFileSync(file, s);
