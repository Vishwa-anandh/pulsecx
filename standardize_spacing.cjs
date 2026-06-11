const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.jsx')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('./src');
let changedCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const original = content;

  // Replace paddings that are 1rem to 3rem with the panel-padding variable
  content = content.replace(/padding:\s*['"]([1-3](\.[0-9]+)?)rem['"]/g, "padding: 'var(--panel-padding)'");
  
  // Replace gaps that are 1rem to 3rem with the panel-gap variable
  content = content.replace(/gap:\s*['"]([1-3](\.[0-9]+)?)rem['"]/g, "gap: 'var(--panel-gap)'");
  
  // Standardize overly large Tailwind gaps (gap-6 is 1.5rem, gap-8 is 2rem) down to gap-4 (1rem)
  content = content.replace(/\bgap-6\b/g, 'gap-4');
  content = content.replace(/\bgap-5\b/g, 'gap-4');
  content = content.replace(/\bgap-8\b/g, 'gap-4');

  if (content !== original) {
    fs.writeFileSync(file, content);
    changedCount++;
  }
});

console.log('Files standardized: ' + changedCount);
