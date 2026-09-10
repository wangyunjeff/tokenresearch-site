import { DOCS } from './models.js?v=4';
import {homeContent,renderSkills,renderGallery,renderWorkflow,renderPerspective,renderTeams,mountResearchMotion} from './research.js?v=2';
import { mountPricing } from './pricing.js?v=3';
import { mountAdmin } from './admin.js?v=3';
import { mountHero } from './hero.js?v=5';
import { mountTutorial } from './tutorial.js?v=3';
import { docBody, toc } from './docs.js?v=7';
import { icon, esc } from './ui.js?v=3';

const main = document.querySelector('#main-content');
const dialog = document.querySelector('#model-dialog');

let cleanupTutorial, cleanupHero, cleanupPricing, cleanupAdmin, toastTimer, entranceObserver, heroNavObserver, cleanupResearch;

function renderHome() {
  main.innerHTML = `<div class="plaza-page page-enter">
    <section class="brand-hero" aria-labelledby="models-title">
      <div class="hero-atmosphere" aria-hidden="true"></div>
      <div class="brand-hero-inner">
        <div class="brand-hero-copy">
          <p class="brand-eyebrow"><span></span> TOKEN RESEARCH <i>/</i> 词元智研</p>
          <h1 id="models-title"><span class="title-line"><span>把时间，</span></span><span class="title-line"><span class="silver-text">留给好问题。</span></span></h1>
          <p class="brand-hero-description">连接模型、Skill 与你的研究工具。<br>减少来回整理，让思考连续发生。</p>
          <div class="brand-hero-actions"><a class="button hero-primary" href="#/workflow">探索科研工作流 ${icon('arrow')}</a><a class="hero-doc-link" href="#/docs">阅读文档 ${icon('northeast')}</a></div>
          <span class="hero-manifesto">RESEARCH, WITH INTENTION.</span>
        </div>
        <div class="sculpture-stage" aria-hidden="true"><div class="sculpture-aura"></div><canvas class="sculpture-canvas"></canvas><div class="sculpture-fallback"><img src="assets/intelligence-loop.png" alt="" width="1536" height="1024" loading="lazy" decoding="async"></div><span class="sculpture-note"><i></i> SPACE FOR A BETTER QUESTION</span><span class="sculpture-coordinate">TR — 001<br>∞ DIMENSIONS</span></div>
        <div class="hero-bottom"><button class="scroll-cue" data-scroll="research-intro"><span class="scroll-line"></span> 向下探索 <small>SCROLL TO DISCOVER</small></button><div class="hero-bottom-actions"><button type="button" id="motion-toggle" class="motion-toggle" aria-pressed="false"><svg class="ui-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14M16 5v14"/></svg><span>暂停动效</span></button><div class="hero-disciplines"><span>01 <b>好奇</b></span><span>02 <b>判断</b></span><span>03 <b>品味</b></span></div></div></div>
      </div>
    </section>
    ${homeContent()}</div>`;
  cleanupHero=mountHero(document.querySelector('.brand-hero'));

}

const docHref=id=>id==='overview'?'#/docs':`#/docs/${id}`;
function renderDocs(id) {
  const current=DOCS.find(d=>d.id===id)||DOCS[0];id=current.id;
  main.innerHTML=`<div class="docs-shell ${id==='codex'?'wide-article':''} page-enter"><aside class="docs-sidebar"><div class="docs-sidebar-head"><a href="#/docs">${icon('book')}文档中心<span>DOCS</span></a><button id="docs-toggle" aria-expanded="false" aria-controls="doc-nav-wrap" aria-label="展开文档目录">${icon('menu')}</button></div><div id="doc-nav-wrap"><label class="doc-search">${icon('search')}<input id="doc-search" type="search" placeholder="查找文档" aria-label="查找文档"></label><nav aria-label="文档目录">${[...new Set(DOCS.map(d=>d.group))].map(g=>`<div class="doc-nav-group"><p>${g}</p>${DOCS.filter(d=>d.group===g).map(d=>`<a href="${docHref(d.id)}" data-doc-nav="${d.id}" ${d.id===id?'aria-current="page"':''}>${icon(d.icon)}<span>${d.title}</span>${icon('chevron')}</a>`).join('')}</div>`).join('')}</nav><p id="doc-search-empty" hidden>没有找到相关文档</p><a class="sidebar-resource" href="downloads/codex-config.zip" download><span>${icon('download')}配置文件包</span><small>config.toml + auth.json ${icon('northeast')}</small></a><a class="sidebar-model-link" href="#/models">${icon('grid')}去模型广场看看 ${icon('arrow')}</a></div></aside><div class="doc-main"><div class="doc-breadcrumb"><a href="#/docs">文档</a>${icon('chevron')}<span>${current.title}</span><span class="doc-edition">TOKEN RESEARCH / GUIDE</span></div><article class="doc-article ${id==='overview'?'doc-overview':''}">${docBody(id)}</article>${id!=='overview'?renderDocPagination(id):''}</div>${id!=='codex'?`<aside class="doc-toc"><p>本页目录</p>${(toc[id]||[]).map(([anchor,title])=>`<button data-scroll="${anchor}">${title}</button>`).join('')}<div class="toc-help">${icon('help')}<span>需要一点帮助？</span><a href="#/docs/troubleshooting">查看常见问题 ${icon('arrow')}</a></div></aside>`:''}</div>`;
  document.querySelector('#docs-toggle').addEventListener('click',e=>{const b=e.currentTarget;const open=b.getAttribute('aria-expanded')!=='true';b.setAttribute('aria-expanded',String(open));b.setAttribute('aria-label',open?'收起文档目录':'展开文档目录');document.querySelector('.docs-sidebar').classList.toggle('is-open',open);});
  document.querySelector('#doc-search').addEventListener('input',e=>{const q=e.target.value.trim().toLowerCase();let found=0;document.querySelectorAll('[data-doc-nav]').forEach(a=>{const d=DOCS.find(d=>d.id===a.dataset.docNav);a.hidden=!`${d.title} ${d.summary}`.toLowerCase().includes(q);if(!a.hidden)found++;});document.querySelectorAll('.doc-nav-group').forEach(g=>g.hidden=!g.querySelector('a:not([hidden])'));document.querySelector('#doc-search-empty').hidden=found>0;});
  if(id==='codex'){const root=document.querySelector('#tutorial-mount');root.append(document.querySelector('#tutorial-template').content.cloneNode(true));cleanupTutorial=mountTutorial(root.querySelector('.tutorial-widget'));}
}
function renderDocPagination(id){const index=DOCS.findIndex(d=>d.id===id);return `<nav class="doc-pagination" aria-label="相邻文章">${[DOCS[index-1],DOCS[index+1]].map((d,i)=>d?`<a href="${docHref(d.id)}"><span>${i===0?'上一篇':'下一篇'}</span><strong>${i===0?'← ':''}${d.title}${i===1?' →':''}</strong></a>`:'<span></span>').join('')}</nav>`;}

function animatePage() {
  entranceObserver?.disconnect();
  entranceObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in-view');entranceObserver.unobserve(e.target);}}),{threshold:.08});
  document.querySelectorAll('.reveal').forEach(el=>entranceObserver.observe(el));
}
function setActiveNav(section){
  document.querySelectorAll('[data-main-nav]').forEach(a=>{if(a.dataset.mainNav===section)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
}
let currentRoute='';
function route(){
  const [section,doc]=location.hash.replace(/^#\/?/,'').split('/');
  const key=section+(doc?'/'+doc:'');
  document.querySelector('.site-header').classList.remove('menu-open');document.querySelector('#site-menu-toggle').setAttribute('aria-expanded','false');
  if(key===currentRoute&&main.children.length){window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});return;}
  currentRoute=key;
  if(dialog.open)dialog.close();
  cleanupResearch?.();cleanupResearch=undefined;cleanupPricing?.();cleanupPricing=undefined;cleanupAdmin?.();cleanupAdmin=undefined;cleanupTutorial?.();cleanupTutorial=undefined;cleanupHero?.();cleanupHero=undefined;heroNavObserver?.disconnect();
  document.body.classList.toggle('docs-mode',section==='docs');
  document.body.classList.toggle('admin-mode',section==='admin');
  document.body.classList.toggle('models-mode',section==='models');
  document.body.classList.toggle('home-mode',!section);
  document.body.dataset.section=section||'home';
  document.querySelector('.site-header').classList.remove('menu-open');document.querySelector('#site-menu-toggle').setAttribute('aria-expanded','false');
  if(section==='admin')cleanupAdmin=mountAdmin(main);
  else if(section==='docs')renderDocs(doc||'overview');
  else if(section==='models'){main.innerHTML='<div class="r-container model-route"><section id="model-explorer" class="pricing-explorer" aria-label="模型广场"></section></div>';cleanupPricing=mountPricing(document.querySelector('#model-explorer'));}
  else if(section==='skills')renderSkills(main,doc);
  else if(section==='gallery'){location.replace('/#/gallery'+(doc?'/'+encodeURIComponent(doc):''));return;}
  else if(section==='workflow')renderWorkflow(main);
  else if(section==='perspective')renderPerspective(main);
  else if(section==='teams')renderTeams(main);
  else {location.replace('/');return;}
  const title={skills:'科研 Skills',gallery:'Gallery · 科研实践',workflow:'科研工作流',perspective:'把时间留给好问题',teams:'团队接入',models:'模型广场',admin:'模型管理'}[section];
  document.title=section==='docs'?`${DOCS.find(d=>d.id===(doc||'overview'))?.title||'文档'} · 词元智研`:title?title+' · 词元智研':'词元智研 · 把时间留给好问题';
  setActiveNav(section);window.scrollTo({top:0,behavior:'instant'});animatePage();cleanupResearch=mountResearchMotion(main);
}

function toast(message){const el=document.querySelector('#global-toast');el.textContent=message;el.classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('visible'),2300);}
async function copy(value){try{if(window.isSecureContext&&navigator.clipboard?.writeText)await navigator.clipboard.writeText(value);else{const field=document.createElement('textarea');field.value=value;field.style.cssText='position:fixed;opacity:0;top:0;left:0';(dialog.open?dialog:document.body).append(field);field.select();const success=document.execCommand('copy');field.remove();if(!success)throw new Error('copy');}toast('已复制');}catch{toast('暂时无法自动复制，请选中文字手动复制。');}}
document.addEventListener('click',e=>{
 const sameNav=e.target.closest('.site-brand,[data-main-nav]');if(sameNav&&sameNav.getAttribute('href')===location.hash){e.preventDefault();route();return;}
 if(e.target.closest('.skip-link')){e.preventDefault();main.focus();main.scrollIntoView({behavior:'instant'});return;}
 if(e.target.closest('[data-close-dialog]'))dialog.close();
 const cp=e.target.closest('[data-copy-global]');if(cp)copy(cp.dataset.copyGlobal);
 const scroll=e.target.closest('[data-scroll]');if(scroll)document.getElementById(scroll.dataset.scroll)?.scrollIntoView({behavior:(window.innerWidth<741||matchMedia('(prefers-reduced-motion: reduce)').matches)?'instant':'smooth',block:'start'});
});
dialog.addEventListener('click',e=>{if(e.target===dialog){const b=dialog.getBoundingClientRect();if(e.clientX<b.left||e.clientX>b.right||e.clientY<b.top||e.clientY>b.bottom)dialog.close();}});
dialog.addEventListener('close',()=>document.body.classList.remove('dialog-open'));
document.addEventListener('keydown',e=>{if(e.key==='/'&&!dialog.open&&!['INPUT','TEXTAREA','SELECT'].includes(e.target.tagName)&&!e.target.isContentEditable){const search=document.querySelector('#model-search')||document.querySelector('#doc-search');if(search&&search.getClientRects().length){e.preventDefault();search.focus();}}});
document.querySelector('#site-menu-toggle').addEventListener('click',e=>{const b=e.currentTarget,open=b.getAttribute('aria-expanded')!=='true';b.setAttribute('aria-expanded',String(open));document.querySelector('.site-header').classList.toggle('menu-open',open);});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){document.querySelector('.site-header').classList.remove('menu-open');document.querySelector('#site-menu-toggle').setAttribute('aria-expanded','false');}});
window.addEventListener('hashchange',route);
route();
