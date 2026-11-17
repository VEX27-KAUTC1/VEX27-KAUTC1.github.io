import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve('dist');
if (!fs.existsSync(path.join(root,'index.html'))) throw new Error('Build first: dist/index.html missing');
const files = [];
const walk = (dir) => { for (const entry of fs.readdirSync(dir,{withFileTypes:true})) { const p=path.join(dir,entry.name); entry.isDirectory()?walk(p):files.push(p); } };
walk(root);
const pages = files.filter(p=>p.endsWith('.html'));
const broken=[];
const base = process.env.GITHUB_REPOSITORY && !process.env.GITHUB_REPOSITORY.toLowerCase().endsWith(`/${process.env.GITHUB_REPOSITORY.split('/')[0].toLowerCase()}.github.io`) ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}` : '';
for (const file of pages) {
  const html=fs.readFileSync(file,'utf8');
  for (const [,raw] of html.matchAll(/\bhref="([^"]+)"/g)) {
    if (/^(https?:|mailto:|#|data:|javascript:)/.test(raw)) continue;
    const noHash=raw.split(/[?#]/)[0];
    if (!noHash) continue;
    let target;
    if (noHash.startsWith('/')) target=path.join(root,noHash.replace(new RegExp(`^${base}/?`),'').replace(/^\//,''));
    else target=path.resolve(path.dirname(file),decodeURIComponent(noHash));
    if (!fs.existsSync(target) && !fs.existsSync(path.join(target,'index.html')) && !fs.existsSync(`${target}.html`)) broken.push(`${path.relative(root,file)} → ${raw}`);
  }
}
if (broken.length) { console.error(broken.join('\n')); process.exit(1); }
console.log(`Links OK across ${pages.length} generated HTML pages`);
