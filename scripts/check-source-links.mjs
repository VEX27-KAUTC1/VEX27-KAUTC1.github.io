import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve('src/content/docs');
const pages=[];
const walk=(dir)=>{for(const e of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,e.name);e.isDirectory()?walk(p):pages.push(p);}};
walk(root);
const hasRoute=(segments)=> {
  const p=path.join(root,...segments);
  return ['.md','.mdx'].some(ext=>fs.existsSync(p+ext)||fs.existsSync(path.join(p,'index'+ext)));
};
const errors=[];
for(const file of pages){
  const route=path.relative(root,file).replace(/\\/g,'/').replace(/\.(md|mdx)$/,'').replace(/(^|\/)index$/,'');
  const content=fs.readFileSync(file,'utf8');
  const links=[...content.matchAll(/\]\(([^)]+)\)/g)].map(m=>m[1]);
  if(file.endsWith('.mdx')) links.push(...[...content.matchAll(/\bhref="([^"]+)"/g)].map(m=>m[1]));
  for(const link of links){
    if(/^(https?:|mailto:|#)/.test(link)) continue;
    const target=link.split(/[?#]/)[0];
    if(!target||!target.endsWith('/')) continue;
    const normalized=path.posix.normalize(path.posix.join('/',route,target));
    if(!hasRoute(normalized.split('/').filter(Boolean))) errors.push(`${path.relative(root,file)} → ${link}`);
  }
}
if(errors.length){console.error(errors.join('\n'));process.exit(1);}
console.log(`Source routes OK across ${pages.length} documents`);
