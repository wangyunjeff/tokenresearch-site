import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { handleAPI } from './server/catalog.js';
import { localD1 } from './scripts/local-d1.mjs';
// Development-only fixture. This module is never included in the hosted Worker.
function catalogPreview(){return {name:'catalog-preview',configureServer(server){
 const db=localD1('.local-data/catalog.sqlite');
 server.httpServer?.once('close',()=>db.close());
 server.middlewares.use(async(req,res,next)=>{
  if(!req.url?.startsWith('/api/'))return next();
  try{
   const chunks=[];for await(const chunk of req)chunks.push(chunk);
   const headers=new Headers();for(const [k,v] of Object.entries(req.headers))if(v&&!k.startsWith('oai-authenticated-user-'))headers.set(k,Array.isArray(v)?v.join(','):v);
   headers.set('oai-authenticated-user-id','preview-owner');headers.set('oai-authenticated-user-email','owner@example.com');
   const request=new Request('http://'+req.headers.host+req.url,{method:req.method,headers,body:['GET','HEAD'].includes(req.method)?undefined:Buffer.concat(chunks)});
   const response=await handleAPI(request,{DB:db,ADMIN_EMAIL:'owner@example.com'});
   res.statusCode=response.status;response.headers.forEach((v,k)=>res.setHeader(k,v));res.end(Buffer.from(await response.arrayBuffer()));
  }catch(error){res.statusCode=500;res.end(JSON.stringify({error:'Preview unavailable'}));console.error(error);}
 });
}};}
export default defineConfig({plugins:[react(),catalogPreview()],server:{host:'127.0.0.1',allowedHosts:['terminal.local']}});
