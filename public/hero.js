// Local kinetic sculpture: reusable geometry, additive light and no GPU dependency.
export function mountHero(section) {
  const canvas = section.querySelector('.sculpture-canvas');
  const toggle = section.querySelector('#motion-toggle');
  const ctx = canvas.getContext('2d', {alpha:true});
  if (!ctx) { section.classList.add('art-fallback'); toggle.hidden=true; return ()=>{}; }
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const compact = matchMedia('(max-width:740px)').matches;
  const segments = compact ? 240 : 400, sides = compact ? 38 : 58;
  const geometry = new Float32Array((segments+1)*(sides+1)*10);
  const normalize = a => {const n=Math.hypot(...a)||1; return a.map(x=>x/n);};
  const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
  const curve=t=>{const r=1.05+.34*Math.cos(t*3);return [r*Math.cos(t*2),r*Math.sin(t*2),.51*Math.sin(t*3)];};
  let offset=0;
  for(let i=0;i<=segments;i++) {
    const t=i/segments*Math.PI*2,p=curve(t),a=curve(t-.0001),b=curve(t+.0001);
    const tangent=normalize(b.map((x,k)=>x-a[k])),normal=normalize(cross(tangent,[0,0,1])),binormal=cross(tangent,normal);
    for(let j=0;j<=sides;j++) {
      const angle=j/sides*Math.PI*2,cs=Math.cos(angle),sn=Math.sin(angle);
      for(let k=0;k<3;k++){const n=normal[k]*cs+binormal[k]*sn;geometry[offset+k]=p[k]+.247*n;geometry[offset+k+3]=n;}
      geometry[offset+6]=t;
      geometry[offset+7]=Math.sin(i*12.9898+j*4.1414)*1.3;
      geometry[offset+8]=Math.cos(i*5.719+j*17.157)*1.1;
      geometry[offset+9]=Math.sin(i*7.739+j*8.293)*.9;
      offset+=10;
    }
  }
  // Reuse colour strings; additive blending needs no per-frame depth sort.
  const palette=Array.from({length:96},(_,i)=>{
    const light=i/95;
    return `rgba(${Math.round(54+light*187)},${Math.round(116+light*132)},${Math.round(223+light*32)},${(.39+light*.55).toFixed(3)})`;
  });
  let width=1,height=1,frame=0,alive=true,inView=true,elapsed=preference.matches?7:0;
  let mx=0,my=0,px=0,py=0,lastPaint=0,paused=preference.matches;
  const rotate=(p,ax,ay,az)=>{const cx=Math.cos(ax),sx=Math.sin(ax),cy=Math.cos(ay),sy=Math.sin(ay),cz=Math.cos(az),sz=Math.sin(az);const yy=p[1]*cx-p[2]*sx,zz=p[1]*sx+p[2]*cx,xx=p[0]*cy+zz*sy,z=-p[0]*sy+zz*cy;return [xx*cz-yy*sz,xx*sz+yy*cz,z];};
  const project=p=>{const s=height*.84/(4.5-p[2]);return [width*.5+p[0]*s,height*.5-p[1]*s];};
  function orbit(t,front) {
    for(let ring=0;ring<2;ring++) {
      const ax=ring?1.05:.4,ay=ring?-.4:.65,az=(ring?.32:-.18)+t*(ring?.017:-.013);
      let active=false;ctx.beginPath();
      for(let i=0;i<=160;i++) {
        const a=i/160*Math.PI*2,p=rotate([Math.cos(a)*1.9,Math.sin(a)*1.9,0],ax,ay,az),q=project(p);
        if((p[2]>0)===front){if(active)ctx.lineTo(q[0],q[1]);else ctx.moveTo(q[0],q[1]);active=true;}else active=false;
      }
      ctx.strokeStyle=front?'rgba(91,139,204,.24)':'rgba(82,128,195,.13)';ctx.lineWidth=.65;ctx.stroke();
      const a=t*.25+ring*2.5,p=rotate([Math.cos(a)*1.9,Math.sin(a)*1.9,0],ax,ay,az);
      if((p[2]>0)===front){const q=project(p);ctx.beginPath();ctx.arc(q[0],q[1],1.8,0,Math.PI*2);ctx.fillStyle='#89c7ff';ctx.shadowColor='#4f9dff';ctx.shadowBlur=12;ctx.fill();ctx.shadowBlur=0;}
    }
  }
  function draw() {
    const t=elapsed,entry=1-Math.pow(1-Math.min(t/2.6,1),4),spread=(1-entry)*1.15;
    px+=(mx-px)*.075;py+=(my-py)*.075;
    const ax=-.43+py*.27,ay=.1+t*.085+px*.45+(1-entry)*.8,az=-.2+Math.sin(t*.2)*.09;
    const cx=Math.cos(ax),sx=Math.sin(ax),cy=Math.cos(ay),sy=Math.sin(ay),cz=Math.cos(az),sz=Math.sin(az);
    const pulseTime=t*.75;
    ctx.clearRect(0,0,width,height);orbit(t,false);ctx.globalCompositeOperation='lighter';
    for(let i=0;i<geometry.length;i+=10) {
      const x=geometry[i]+geometry[i+7]*spread,y=geometry[i+1]+geometry[i+8]*spread,z=geometry[i+2]+geometry[i+9]*spread;
      const y1=y*cx-z*sx,z1=y*sx+z*cx,x1=x*cy+z1*sy,z2=-x*sy+z1*cy;
      const xx=x1*cz-y1*sz,yy=x1*sz+y1*cz;
      const nx=geometry[i+3],ny=geometry[i+4],nz=geometry[i+5],ny1=ny*cx-nz*sx,nz1=ny*sx+nz*cx,nx1=nx*cy+nz1*sy;
      const nxx=nx1*cz-ny1*sz,nyy=nx1*sz+ny1*cz,nzz=-nx*sy+nz1*cy;
      const front=Math.max(0,nzz),gleam=Math.max(0,nxx*-.55+nyy*.64+nzz*.57),bright=gleam**5;
      const wave=Math.max(0,Math.cos(geometry[i+6]*2-pulseTime))**18;
      const light=Math.min(1,front*.29+bright*.58+wave*.13);
      ctx.fillStyle=palette[Math.min(95,Math.floor(light*95))];
      const scale=height*.84/(4.5-z2),depth=(z2+1.6)/3.2,size=(compact?1:1.15)+depth*.45+bright*.25;
      ctx.fillRect(width*.5+xx*scale,height*.5-yy*scale,size,size);
    }
    ctx.globalCompositeOperation='source-over';orbit(t,true);
  }
  function resize(){const r=canvas.getBoundingClientRect(),dpr=Math.min(devicePixelRatio||1,1.5);width=r.width;height=r.height;canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);draw();}
  function tick(now){frame=0;if(!alive||paused||!inView||document.hidden)return;if(!lastPaint||now-lastPaint>=(compact?40:32)){elapsed+=lastPaint?Math.min((now-lastPaint)/1000,.1):0;lastPaint=now;draw();}frame=requestAnimationFrame(tick);}
  function schedule(){cancelAnimationFrame(frame);frame=0;lastPaint=0;if(alive&&!paused&&inView&&!document.hidden)frame=requestAnimationFrame(tick);}
  function updateControl(){section.classList.toggle('motion-paused',paused);toggle.setAttribute('aria-pressed',String(paused));toggle.setAttribute('aria-label',paused?'播放首屏动效':'暂停首屏动效');toggle.querySelector('span').textContent=paused?'播放动效':'暂停动效';toggle.querySelector('path').setAttribute('d',paused?'M8 5v14l11-7Z':'M8 5v14M16 5v14');}
  function toggleMotion(){paused=!paused;updateControl();schedule();}
  function changePreference(){paused=preference.matches;if(paused&&elapsed<2.6)elapsed=7;updateControl();draw();schedule();}
  function move(e){const r=section.getBoundingClientRect();mx=(e.clientX-r.left)/r.width-.5;my=(e.clientY-r.top)/r.height-.5;}
  function leave(){mx=0;my=0;}
  const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(canvas);
  const observer=new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;schedule();},{threshold:.01});observer.observe(section);
  section.addEventListener('pointermove',move);section.addEventListener('pointerleave',leave);toggle.addEventListener('click',toggleMotion);preference.addEventListener('change',changePreference);document.addEventListener('visibilitychange',schedule);
  section.classList.add('sculpture-ready');updateControl();resize();schedule();
  return ()=>{alive=false;cancelAnimationFrame(frame);resizeObserver.disconnect();observer.disconnect();section.removeEventListener('pointermove',move);section.removeEventListener('pointerleave',leave);toggle.removeEventListener('click',toggleMotion);preference.removeEventListener('change',changePreference);document.removeEventListener('visibilitychange',schedule);};
}
