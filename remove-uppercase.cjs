const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.jsx') || file.endsWith('.css')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('d:/pulseCX/src');
let updatedCount = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    
    // Replace React inline styles
    content = content.replace(/textTransform:\s*['"]uppercase['"]/g, "");
    content = content.replace(/,\s*fontVariantCaps:\s*['"]small-caps['"]/g, "");
    content = content.replace(/fontVariantCaps:\s*['"]small-caps['"]/g, "");
    
    // Replace CSS
    content = content.replace(/text-transform:\s*uppercase;?/g, "");
    
    // Clean up possible trailing commas left by regex in style objects
    // Example: { ..., textTransform: 'uppercase', color: 'red' }
    // We just replaced it with "", so it might be { ..., , color: 'red' }
    // A safer regex for inline style removal would be replacing ", textTransform: 'uppercase'"
    // Let's just fix double commas if they happen:
    content = content.replace(/,\s*,/g, ",");
    content = content.replace(/{,\s*/g, "{");
    content = content.replace(/,\s*}/g, "}");

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated ${file}`);
        updatedCount++;
    }
});

console.log(`Finished. Updated ${updatedCount} files.`);
