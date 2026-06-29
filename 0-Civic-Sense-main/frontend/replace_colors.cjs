const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    try {
      filelist = walkSync(dirFile, filelist);
    } catch (err) {
      if (err.code === 'ENOTDIR' || err.code === 'EBADF') {
        if (dirFile.endsWith('.jsx') || dirFile.endsWith('.css') || dirFile.endsWith('.js')) {
          filelist.push(dirFile);
        }
      }
    }
  });
  return filelist;
};

const files = walkSync(path.join(__dirname, 'src'));

const replacements = [
  // Dark greens / blacks to light theme variables
  { regex: /'#05150C'/g, replace: 'var(--bg-main)' },
  { regex: /#05150C/g, replace: 'var(--bg-main)' },
  { regex: /'#1a1a24'/g, replace: 'var(--bg-main)' },
  { regex: /#1a1a24/g, replace: 'var(--bg-main)' },
  { regex: /'#0a0a1a'/g, replace: 'var(--bg-main)' },

  // Text colors
  { regex: /'#F4FBF7'/g, replace: 'var(--text-main)' },
  { regex: /#F4FBF7/g, replace: 'var(--text-main)' },
  { regex: /'#A8D5BA'/g, replace: 'var(--text-muted)' },
  { regex: /#A8D5BA/g, replace: 'var(--text-muted)' },
  
  // Primary greens to Blue
  { regex: /'#2B7A5F'/g, replace: 'var(--primary)' },
  { regex: /#2B7A5F/g, replace: 'var(--primary)' },
  { regex: /'#4A9C7C'/g, replace: 'var(--primary-hover)' },
  { regex: /#4A9C7C/g, replace: 'var(--primary-hover)' },
  { regex: /'rgba\(43,122,95/g, replace: "'rgba(37,99,235" },
  { regex: /rgba\(43, 122, 95/g, replace: "rgba(37, 99, 235" },
  { regex: /'rgba\(116, 180, 155/g, replace: "'rgba(147,197,253" },
  { regex: /rgba\(116, 180, 155/g, replace: "rgba(147, 197, 253" },
  
  // Hardcoded white text to variables where appropriate
  { regex: /color:\s*'white'/g, replace: "color: 'var(--text-main)'" },
  { regex: /color:\s*'#ffffff'/g, replace: "color: 'var(--text-main)'" },
  
  // Backgrounds with white transparency (needs to be darker in light mode)
  // Instead of white transparency, we can use a light gray or slate transparency
  { regex: /'rgba\(255,\s*255,\s*255,\s*0\.05\)'/g, replace: 'var(--panel-bg)' },
  { regex: /'rgba\(255,255,255,0\.03\)'/g, replace: 'var(--panel-bg)' },
  { regex: /'rgba\(255,\s*255,\s*255,\s*0\.1\)'/g, replace: 'var(--panel-border)' },
  
  // Landing page background image gradient adjustments
  { regex: /linear-gradient\(rgba\(5, 21, 12, 0\.8\), rgba\(5, 21, 12, 0\.9\)\)/g, replace: "linear-gradient(rgba(248, 250, 252, 0.8), rgba(248, 250, 252, 0.95))" },
  
  // General text shadow
  { regex: /textShadow:\s*'0 2px 4px rgba\(0,0,0,0\.5\)'/g, replace: "textShadow: '0 2px 4px rgba(0,0,0,0.05)'" },
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;
  
  replacements.forEach(r => {
    content = content.replace(r.regex, r.replace);
  });
  
  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
