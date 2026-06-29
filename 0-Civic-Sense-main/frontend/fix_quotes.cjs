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
  
  // Replace unquoted var(--...) with 'var(--...)'
  // We use negative lookbehind and negative lookahead to avoid already quoted ones
  content = content.replace(/(?<!['"`])(var\(--[a-zA-Z0-9-]+\))(?!['"`])/g, "'$1'");
  
  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Fixed more quotes in ${file}`);
  }
});
