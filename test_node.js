const fs = require('fs');
const content = fs.readFileSync('src/app/characters/page.tsx', 'utf8');
const lines = content.split('\n');
lines.slice(0, 35).forEach((line, i) => {
  console.log(`${i+1}: ${JSON.stringify(line)}`);
});
