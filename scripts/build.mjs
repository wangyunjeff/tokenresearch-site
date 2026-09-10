import { readFile,writeFile,mkdir,rm,readdir,cp } from 'node:fs/promises';
import { resolve, extname } from 'node:path';
import { build as bundleWorker } from 'esbuild';
import { build as buildClient } from 'vite';

const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.jpg':'image/jpeg','.jpeg':'image/jpeg','.json':'application/json','.md':'text/markdown; charset=utf-8','.csv':'text/csv; charset=utf-8','.toml':'text/plain; charset=utf-8','.zip':'application/zip','.woff':'font/woff','.woff2':'font/woff2','.ico':'image/x-icon'};
const binaryTypes=new Set(['.png','.webp','.jpg','.jpeg','.zip','.woff','.woff2','.ico']);
const assets={};
async function collect(dir,prefix=''){
  for(const entry of await readdir(dir,{withFileTypes:true})){
    if(entry.name.startsWith('.'))continue;
    const path=dir+'/'+entry.name,key=prefix+'/'+entry.name;
    if(entry.isDirectory())await collect(path,key);
    else{const extension=extname(entry.name),binary=binaryTypes.has(extension);assets[key]={type:types[extension]||'application/octet-stream',binary,body:(await readFile(path)).toString(binary?'base64':'utf8')};}
  }
}
await rm('dist',{recursive:true,force:true});
await buildClient({build:{outDir:resolve('dist/client'),emptyOutDir:false}});
await collect('dist/client');
await mkdir('dist/server',{recursive:true});
await mkdir('dist/.openai',{recursive:true});
await writeFile('server/assets.generated.js','export default '+JSON.stringify(assets));
try{await bundleWorker({entryPoints:['server/worker.js'],bundle:true,format:'esm',platform:'browser',target:'es2022',outfile:'dist/server/index.js',minify:true});}
finally{await rm('server/assets.generated.js',{force:true});}
await cp('.openai/hosting.json','dist/.openai/hosting.json');
await cp('drizzle','dist/.openai/drizzle',{recursive:true});
console.log(`Built React client and Worker with ${Object.keys(assets).length} assets and D1 migrations.`);
