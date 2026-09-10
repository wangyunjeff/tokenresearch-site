import { esc,icon } from './ui.js?v=3';
export const yuan=(usd,divisor,multiplier)=>usd===null||multiplier===null?null:usd/divisor*multiplier;
export const money=value=>value===null?'待设置':value===0?'¥0':value<.000001?'¥'+value.toExponential(2):'¥'+new Intl.NumberFormat('zh-CN',{maximumFractionDigits:6}).format(value);
export async function requestJSON(path,options={}){const res=await fetch(path,{cache:'no-store',...options});const value=await res.json();if(!res.ok)throw Object.assign(new Error(value.error||'操作暂时未完成，请重试。'),{status:res.status});return value;}
export function providerMark(provider){return `<span class="price-provider ${provider==='Anthropic'?'anthropic':provider==='Google'?'google':''}">${provider==='Anthropic'?'✳':provider==='Google'?'✦':provider==='OpenAI'?icon('spark'):esc(provider.slice(0,1))}</span>`;}
export function priceCard(m,g,divisor){
 const price=(key)=>money(yuan(m[key],divisor,g.multiplier));
 return `<article class="price-card"><div class="price-card-head">${providerMark(m.provider)}<div><span class="price-maker">${esc(m.provider)}</span><h3>${esc(m.name)}</h3></div><button class="copy-model" data-copy-global="${esc(m.code)}" aria-label="复制 ${esc(m.code)}">${icon('copy')}</button></div><code class="price-model-id">${esc(m.code)}</code><div class="price-values ${m.unit==='request'?'by-request':''}">${m.unit==='request'?`<div><span>单次请求</span><strong>${price('inputUsd')}</strong></div>`:`<div><span>输入</span><strong>${price('inputUsd')}</strong></div><div><span>输出</span><strong>${price('outputUsd')}</strong></div><div><span>缓存读取</span><strong>${price('cacheReadUsd')}</strong></div>`}</div>${m.cacheWriteUsd!==null&&m.unit==='tokens'?`<p class="cache-write">缓存写入 <b>${price('cacheWriteUsd')}</b> / 1M tokens</p>`:''}<p class="price-description">${esc(m.description)}</p><div class="price-card-foot"><span>${esc(g.name)}</span><span>${m.unit==='tokens'?'人民币 / 1M tokens':'人民币 / 次'}</span></div>${m.scope?`<p class="price-scope">${esc(m.scope)}</p>`:''}</article>`;
}
export function mountPricing(root){
 let alive=true,data,groupId='',provider='all',query='';
 root.innerHTML=`<div class="pricing-head"><div><p class="section-kicker">MODEL PRICING</p><h2>模型广场</h2><p>选择分组，查看每个模型的人民币价格。</p></div><a class="pricing-admin-link" href="#/admin">管理模型 ${icon('northeast')}</a></div><div class="catalog-loading" role="status">正在加载模型与分组…</div>`;
 async function load(){try{const value=await requestJSON('/api/catalog');if(!alive)return;data=value.data;groupId=data.groups[0]?.id||'';render();}catch(e){if(alive){root.querySelector('.catalog-loading').innerHTML=`<p>${esc(e.message)}</p><button class="button button-outline" id="retry-catalog">重新加载</button>`;root.querySelector('#retry-catalog').onclick=load;}}}
 function render(){
  root.innerHTML=`<div class="pricing-head"><div><p class="section-kicker">MODEL PRICING</p><h2>模型广场</h2><p>选择分组，查看每个模型的人民币价格。</p></div><a class="pricing-admin-link" href="#/admin">管理模型 ${icon('northeast')}</a></div><div class="pricing-layout"><aside class="pricing-sidebar"><div class="pricing-filter-heading"><h3>筛选</h3><button data-pricing-reset>重置</button></div><div class="pricing-filter-section"><h4>模型分组</h4><div class="pricing-groups">${data.groups.map(g=>`<button data-price-group="${esc(g.id)}" aria-pressed="${g.id===groupId}"><span>${esc(g.name)}<small>${g.modelIds.length} 个模型</small></span><b>${g.multiplier===null?'待设置':'×'+esc(g.multiplier)}</b></button>`).join('')||'<p class="muted">暂无公开分组</p>'}</div></div><div class="pricing-filter-section"><h4>模型厂商</h4><div class="pricing-providers">${['all',...new Set(data.models.map(m=>m.provider))].map(p=>`<button data-price-provider="${esc(p)}" aria-pressed="${provider===p}">${p==='all'?'全部厂商':esc(p)}</button>`).join('')}</div></div><div class="pricing-unit-note">${icon('layers')}<span>1M tokens = 100 万词元<br>所有展示价格均为人民币</span></div></aside><div class="pricing-results"><div class="pricing-toolbar"><div><strong id="selected-group"></strong><span id="price-count" role="status" aria-live="polite"></span></div><label class="model-search">${icon('search')}<input id="model-search" type="search" aria-label="搜索模型" placeholder="搜索模型名称或 ID" value="${esc(query)}"></label></div><div id="group-description" class="group-description"></div><div id="price-grid" class="price-grid"></div><p class="pricing-disclaimer">人民币 / 100 万词元；按次计费的模型单独标注。缓存读取与缓存写入分别计价。</p></div></div>`;
  root.querySelector('#model-search').oninput=e=>{query=e.target.value;update();};
  root.querySelectorAll('[data-price-group]').forEach(b=>b.onclick=()=>{groupId=b.dataset.priceGroup;update();});
  root.querySelectorAll('[data-price-provider]').forEach(b=>b.onclick=()=>{provider=b.dataset.priceProvider;update();});
  root.querySelector('[data-pricing-reset]').onclick=()=>{provider='all';query='';groupId=data.groups[0]?.id||'';root.querySelector('#model-search').value='';update();};update();
 }
 function update(){
  const g=data.groups.find(g=>g.id===groupId),q=query.trim().toLowerCase();
  const list=g?data.models.filter(m=>g.modelIds.includes(m.id)&&(provider==='all'||provider===m.provider)&&`${m.name} ${m.code} ${m.description} ${m.provider}`.toLowerCase().includes(q)):[];
  root.querySelectorAll('[data-price-group]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.priceGroup===groupId)));root.querySelectorAll('[data-price-provider]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.priceProvider===provider)));
  root.querySelector('#selected-group').textContent=g?.name||'暂无分组';root.querySelector('#price-count').textContent=`${list.length} 个模型`;
  root.querySelector('#group-description').textContent=g?`${g.description}${g.multiplier===null?' · 分组倍率待设置':''}`:'';
  root.querySelector('#price-grid').innerHTML=list.length?list.map(m=>priceCard(m,g,data.divisor)).join(''):`<div class="empty-state">${icon('search')}<h3>${g?'没有匹配的模型':'模型目录准备中'}</h3><p>${g?'试试其他分组、厂商或关键词。':'分组发布后会在这里展示。'}</p></div>`;
 }
 load();return()=>{alive=false;};
}
