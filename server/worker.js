import { handleAPI } from './catalog.js';
import assets from './assets.generated.js';
export default {
 async fetch(request,env){
  const url=new URL(request.url);
  if(url.pathname.startsWith('/api/'))return handleAPI(request,env);
  if(!['GET','HEAD'].includes(request.method))return new Response('Method not allowed',{status:405});
  const path=url.pathname==='/'?'/index.html':url.pathname;
  const asset=assets[path];if(!asset)return new Response('Not found',{status:404});
  const bytes=asset.binary?Uint8Array.from(atob(asset.body),c=>c.charCodeAt(0)):asset.body;
  return new Response(request.method==='HEAD'?null:bytes,{headers:{'Content-Type':asset.type,'Cache-Control':path==='/index.html'?'no-cache':'public, max-age=3600','X-Content-Type-Options':'nosniff','Referrer-Policy':'strict-origin-when-cross-origin',...(path.startsWith('/downloads/')?{'Content-Disposition':'attachment; filename="'+path.split('/').pop()+'"'}:{})}});
 }
};
