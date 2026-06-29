const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    try {
      filelist = walkSync(dirFile, filelist);
    } catch (err) {
      if (err.code === 'ENOTDIR' || err.code === 'EBADF') {
        if (dirFile.endsWith('.jsx')) {
          filelist.push(dirFile);
        }
      }
    }
  });
  return filelist;
};

const files = walkSync(path.join(__dirname, 'src'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;
  
  // Fix nested quotes inside linear-gradient
  content = content.replace(/'linear-gradient\([^)]+\)'/g, (match) => {
    return match.replace(/'var\(--([a-zA-Z0-9-]+)\)'/g, "var(--$1)");
  });

  // Check for rgba nested quotes
  content = content.replace(/'rgba\([^)]+\)'/g, (match) => {
    return match.replace(/'var\(--([a-zA-Z0-9-]+)\)'/g, "var(--$1)");
  });

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Fixed nested quotes in ${file}`);
  }
});
