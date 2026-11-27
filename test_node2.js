const fs = require('fs');
const content = fs.readFileSync('src/app/page.tsx', 'utf8');
const lines = content.split('\n');
lines.slice(0, 10).forEach((line, i) => {
  console.log(`${i+1}: ${JSON.stringify(line)}`);
});
