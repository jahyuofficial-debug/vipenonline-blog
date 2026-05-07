const fs = require('fs');
const path = require('path');

const discSrc = path.join(__dirname, '..', 'vipenonline-disc', 'dist');
const discDest = path.join(__dirname, '..', 'public', 'disc');

if (fs.existsSync(discSrc)) {
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

  copyRecursive(discSrc, discDest);

  // Fix asset paths
  const indexPath = path.join(discDest, 'index.html');
  if (fs.existsSync(indexPath)) {
    let content = fs.readFileSync(indexPath, 'utf8');
    content = content.replace(/src="\/assets\//g, 'src="/disc/assets/');
    content = content.replace(/href="\/assets\//g, 'href="/disc/assets/');
    fs.writeFileSync(indexPath, content, 'utf8');
  }

  console.log('Disc page copied successfully');
} else {
  console.log('Disc build not found, skipping');
}
