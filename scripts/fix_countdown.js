const fs = require('fs');
const p = require('path').join(__dirname, '..', 'frontend', 'assets', 'js', 'app.js');
let s = fs.readFileSync(p, 'utf8');
s = s.replace(/target:\s*new Date\([^)]+\)\.getTime\(\)/, "target: Date.parse('2027-04-13T00:00:00+01:00')");
const oldTick = `    tick() {
      const now = new Date().getTime();
      const diff = Math.max(0, this.target - now);
      this.days = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0');
      this.hours = String(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
      this.minutes = String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
      this.seconds = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, '0');
    }`;
const newTick = `    tick() {
      const now = Date.now();
      if (isNaN(this.target)) {
        this.days = '00'; this.hours = '00'; this.minutes = '00'; this.seconds = '00';
        return;
      }
      const diff = this.target - now;
      if (diff <= 0) {
        this.days = '00'; this.hours = '00'; this.minutes = '00'; this.seconds = '00';
        return;
      }
      this.days = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0');
      this.hours = String(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
      this.minutes = String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
      this.seconds = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, '0');
    }`;
if (s.indexOf(oldTick) !== -1) {
  s = s.split(oldTick).join(newTick);
  console.log('tick-ok');
} else {
  console.log('tick-notfound');
}
fs.writeFileSync(p, s);
