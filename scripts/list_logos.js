const fs = require('fs');
const files = fs.readdirSync('frontend/assets/img');
for(const f of files){
  if(f.toLowerCase().match(/logo|solicod|solicode|brand/)){
    console.log(f);
  }
}
console.log('---');
console.log(files.join('\n'));
