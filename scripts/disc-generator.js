/* 
 * Disc page - copies pre-built React disc page to public/disc
 * Uses after_generate hook to copy raw files, overriding theme output
 */
const fs = require('fs');
const path = require('path');

hexo.extend.filter.register('after_generate', function() {
  const discSrc = path.join(hexo.base_dir, 'vipenonline-disc', 'dist');
  const discDest = path.join(hexo.base_dir, 'public', 'disc');
  
  if (!fs.existsSync(discSrc)) return;

  function copyRecursive(src, dest) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    const entries = fs.readdirSync(src, { withFileTypes: true });
    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);
      if (entry.isDirectory()) {
        copyRecursive(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }

  // Overwrite any theme-generated disc page with our React build
  copyRecursive(discSrc, discDest);
  
  // Fix asset paths in disc/index.html
  const indexPath = path.join(discDest, 'index.html');
  if (fs.existsSync(indexPath)) {
    let content = fs.readFileSync(indexPath, 'utf8');
    content = content.replace(/src="\/assets\//g, 'src="/disc/assets/');
    content = content.replace(/href="\/assets\//g, 'href="/disc/assets/');
    fs.writeFileSync(indexPath, content, 'utf8');
  }
});
