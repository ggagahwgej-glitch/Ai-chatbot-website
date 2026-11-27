const fs = require('fs');
const content = fs.readFileSync('src/app/characters/page.tsx', 'utf8');
const lines = content.split('\n');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('</h1>')) {
    console.log(`Line ${i+1}: ${JSON.stringify(lines[i])}`);
  }
}
