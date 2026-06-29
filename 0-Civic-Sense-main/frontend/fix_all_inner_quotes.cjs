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
  
  // This will match any string like 'linear-gradient(...)' 
  // We match everything inside the outermost single quotes, and then remove inner single quotes around var(...)
  content = content.replace(/'linear-gradient\((.*?)\)'/g, (match, inner) => {
      let newInner = inner.replace(/'(var\(--[a-zA-Z0-9-]+\))'/g, "$1");
      return `'linear-gradient(${newInner})'`;
  });
  
  // Do the same for rgba in case there are any
  content = content.replace(/'rgba\((.*?)\)'/g, (match, inner) => {
      let newInner = inner.replace(/'(var\(--[a-zA-Z0-9-]+\))'/g, "$1");
      return `'rgba(${newInner})'`;
  });

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Fixed inner quotes in ${file}`);
  }
});
