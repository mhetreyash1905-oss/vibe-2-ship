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
  
  // The text literally looks like: 'linear-gradient(135deg, var(--primary), 'var(--primary-hover)')'
  // Let's just find exactly this pattern and fix it.
  content = content.replace(/'linear-gradient\([^'\n]+'var\(--[a-zA-Z0-9-]+\)'[^'\n]*\)'/g, match => {
      return match.replace(/'var\(--([a-zA-Z0-9-]+)\)'/g, "var(--$1)");
  });
  
  // also handle cases where the first one is quoted: 'linear-gradient(135deg, 'var(--primary)', ...)'
  content = content.replace(/'linear-gradient\((?:[^'\n]*?)'var\(--[a-zA-Z0-9-]+\)'(?:[^'\n]*?)\)'/g, match => {
      return match.replace(/'var\(--([a-zA-Z0-9-]+)\)'/g, "var(--$1)");
  });

  // A more brute-force approach: just match any line containing linear-gradient or rgba, and remove all inner quotes around var(...)
  let lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes('linear-gradient') || lines[i].includes('rgba')) {
          // If the line has 'linear-gradient(...)' we want to strip out ' from 'var(...)'
          // Just replace `'var(` with `var(` and `)'` with `)` where they exist inside the linear-gradient string
          
          // Actually, we can just replace all `'var(--` with `var(--` and `)'` with `)` ON THIS LINE,
          // EXCEPT if it is the ONLY thing in the string (like `backgroundColor: 'var(--bg-main)'`).
          
          // Let's just replace all instances of ` 'var(--` (note the space or comma)
          lines[i] = lines[i].replace(/, 'var\(--/g, ", var(--");
          lines[i] = lines[i].replace(/, 'rgba/g, ", rgba");
          lines[i] = lines[i].replace(/\( 'var\(--/g, "( var(--");
          lines[i] = lines[i].replace(/\('var\(--/g, "(var(--");
          lines[i] = lines[i].replace(/ \)'/g, " )");
          lines[i] = lines[i].replace(/\)'/g, ")");
          
          // Wait, replace `)'` with `)` is too broad. It will break `color: 'var(--text-main)'` which ends with `)'`.
          // Ah, if we do `color: 'var(--text-main)'` and we replace `)'` with `)` it becomes `color: 'var(--text-main)`! That's bad.
          
      }
  }
  
  // Let's use a smarter regex on the whole file.
  // Match `linear-gradient(...)` where the parenthesis is matched properly. Since JS doesn't have recursive regex,
  // we can just match `linear-gradient` followed by anything up to the last `)` on the same line.
  lines = originalContent.split('\n');
  for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes("linear-gradient")) {
          // find 'linear-gradient(.*?)' and remove 'var(...)' quotes inside the .*?
          lines[i] = lines[i].replace(/'linear-gradient\((.*?)\)'/g, (match, p1) => {
              let newInner = p1.replace(/'var\(--([a-zA-Z0-9-]+)\)'/g, "var(--$1)");
              return `'linear-gradient(${newInner})'`;
          });
      }
  }
  content = lines.join('\n');

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Fixed nested quotes accurately in ${file}`);
  }
});
