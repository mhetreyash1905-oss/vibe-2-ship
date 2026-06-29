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
  
  // Replace specifically the broken linear-gradient syntax caused by the previous replacements
  content = content.replace(/'linear-gradient\(135deg, var\(--primary\), 'var\(--primary-hover\)'\)'/g, "'linear-gradient(135deg, var(--primary), var(--primary-hover))'");

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Fixed gradient nested quotes in ${file}`);
  }
});
