
/* ═══════════ GALERÍA ═══════════ */
const grid = $('#grid');
grid.innerHTML = PROJECTS.map((p,i)=>`
 <figure class="card glass rv" data-id="${p.id}" data-cat="${p.cat}" style="transition-delay:${(i%6)*60}ms" tabindex="0" role="button" aria-label="Ver ${p.t}">
   <div class="ph" style="aspect-ratio:${p.ar}">
     <img src="https://picsum.photos/seed/${p.seed}/${p.w}/${p.h}" alt="${p.t} — ${CATS[p.cat]}" loading="lazy">
   </div>
   <span class="idx">${String(i+1).padStart(2,'0')}</span>
   <span class="hover-hint glass"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6M21 3l-9 9"/></svg></span>
   <figcaption><div class="cap-row"><h3>${p.t}</h3><span class="chip">${CATS[p.cat]}</span></div></figcaption>
 </figure>`).join('');

function updateCount(){
  const vis = $$('#grid .card').filter(c=>c.style.display!=='none').length;
  $('#gcount').textContent = `${String(vis).padStart(2,'0')} / ${String(PROJECTS.length).padStart(2,'0')} piezas`;
}
function setFilter(f){
  $$('.fbtn').forEach(b=>{ b.classList.toggle('on', b.dataset.f===f); b.setAttribute('aria-pressed', b.dataset.f===f); });
  $$('#grid .card').forEach(c=>{
    const show = f==='todo' || c.dataset.cat===f;
    if(show){ c.style.display=''; requestAnimationFrame(()=>requestAnimationFrame(()=>c.classList.remove('hide'))); }
    else { c.classList.add('hide'); setTimeout(()=>{ if(c.classList.contains('hide')) c.style.display='none'; updateCount(); },280); }
  });
  updateCount();
}
$('#filters').addEventListener('click',e=>{ const b=e.target.closest('.fbtn'); if(b) setFilter(b.dataset.f); });
updateCount();

/* ═══════════ LIGHTBOX ═══════════ */
let lbIdx = 0;
const lb = $('#lb');
function openLB(id){
  lbIdx = PROJECTS.findIndex(p=>p.id===id);
  paintLB();
  lb.classList.add('open'); document.body.style.overflow='hidden';
  $('.lb-x').focus();
}
function paintLB(){
  const p = PROJECTS[lbIdx];
  $('#lbImg').src = `https://picsum.photos/seed/${p.seed}/${Math.round(p.w*1.6)}/${Math.round(p.h*1.6)}`;
  $('#lbImg').alt = `${p.t} — ${CATS[p.cat]}`;
  $('#lbIdx').textContent = `${String(lbIdx+1).padStart(2,'0')} / ${PROJECTS.length}`;
  $('#lbTitle').textContent = p.t;
  $('#lbCat').textContent = CATS[p.cat];
  $('#lbYear').textContent = p.year + (p.client?` · ${p.client}`:'');
  $('#lbDesc').textContent = p.desc;
  const wa = $('#lbWa');
  wa.href = waLink(`Hola LÚMINA ✦ Me interesa la pieza "${p.t}" (${CATS[p.cat]}, ${p.year}). ¿Me cuentan más?`);
  wa.target='_blank'; wa.rel='noopener';
}
function closeLB(){ lb.classList.remove('open'); document.body.style.overflow=''; }
grid.addEventListener('click',e=>{ const c=e.target.closest('.card'); if(c) openLB(c.dataset.id); });
grid.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){ const c=e.target.closest('.card'); if(c){ e.preventDefault(); openLB(c.dataset.id);} } });
lb.addEventListener('click',e=>{ if(e.target.closest('[data-close]')) closeLB(); });
$('#lbPrev').onclick=()=>{ lbIdx=(lbIdx-1+PROJECTS.length)%PROJECTS.length; paintLB(); };
$('#lbNext').onclick=()=>{ lbIdx=(lbIdx+1)%PROJECTS.length; paintLB(); };
document.addEventListener('keydown',e=>{
  if(!lb.classList.contains('open')) return;
  if(e.key==='Escape') closeLB();
  if(e.key==='ArrowLeft') $('#lbPrev').click();
  if(e.key==='ArrowRight') $('#lbNext').click();
});

/* ═══════════ HERO DESTACADO ═══════════ */
let feat = 0, heroTimer = null;
const thumbs = $('#thumbs');
thumbs.innerHTML = FEATURED.map((id,i)=>{
  const p=byId(id);
  return `<button class="thumb glass" role="tab" data-i="${i}" aria-label="${p.t}"><img src="https://picsum.photos/seed/${p.seed}/160/110" alt=""><span class="bar"></span></button>`;
}).join('');

function setFeatured(i,manual){
  feat = i % FEATURED.length;
  const p = byId(FEATURED[feat]);
  const img = $('#heroImg');
  img.classList.add('fading');
  const nx = new Image();
  nx.onload = ()=>{ img.src=nx.src; img.alt=`${p.t} — ${CATS[p.cat]}`; img.classList.remove('fading'); };
  nx.src = `https://picsum.photos/seed/${p.seed}/1400/1050`;
  scramble($('#heroTitle'), p.t.toUpperCase());
  $('#heroKick').textContent = `Pieza ${String(feat+1).padStart(2,'0')} — ${CATS[p.cat]}`;
  $('#heroTag').textContent = `Pieza ${String(feat+1).padStart(2,'0')} / 0${FEATURED.length}`;
  $('#mCliente').textContent = p.client; $('#mYear').textContent = p.year; $('#mRol').textContent = p.role;
  $('#heroWa').dataset.msg = `Hola, me interesa la pieza "${p.t}" de su portafolio. ¿Platicamos?`;
  $('#heroWa').href = waLink($('#heroWa').dataset.msg);
  $$('.thumb').forEach((t,k)=>{ t.classList.remove('on'); void t.offsetWidth; if(k===feat) t.classList.add('on'); });
  if(manual) restartHero();
}
function restartHero(){ clearInterval(heroTimer); if(!RM) heroTimer=setInterval(()=>setFeatured(feat+1),6000); }
thumbs.addEventListener('click',e=>{ const t=e.target.closest('.thumb'); if(t) setFeatured(+t.dataset.i,true); });
$('#heroExpand').onclick = ()=>openLB(FEATURED[feat]);
const heroStage=$('.hero-stage');
heroStage.addEventListener('mouseenter',()=>clearInterval(heroTimer));
heroStage.addEventListener('mouseleave',restartHero);
document.addEventListener('visibilitychange',()=>{ document.hidden?clearInterval(heroTimer):restartHero(); });
setFeatured(0); restartHero();

/* ═══════════ COLECCIONES (RAIL) ═══════════ */
const COLS=[
 {t:'Identidades', f:'identidad', seed:'collection-branding-moodboard', n:'03 piezas'},
 {t:'Web & Producto', f:'web', seed:'collection-web-ui-screens', n:'03 piezas'},
 {t:'Fotografía', f:'foto', seed:'collection-photography-prints', n:'03 piezas'},
 {t:'3D & Render', f:'3d', seed:'collection-3d-shapes-gallery', n:'03 piezas'}
];
$('#rail').innerHTML = COLS.map(c=>`
 <article class="rcard glass" data-f="${c.f}" data-t="${c.t}" tabindex="0" role="button" aria-label="Abrir colección ${c.t}">
   <img src="https://picsum.photos/seed/${c.seed}/640/700" alt="Colección ${c.t}" draggable="false">
   <div class="rc"><span class="chip">${c.n}</span><h3>${c.t}</h3>
   <span class="go">Explorar sala <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M8 7h9v9"/></svg></span></div>
 </article>`).join('');
$('#rail').addEventListener('click',e=>{
  const c=e.target.closest('.rcard'); if(!c) return;
  setFilter(c.dataset.f);
  document.getElementById('obra').scrollIntoView({behavior:RM?'auto':'smooth'});
  toast(`Colección “${c.dataset.t}” ✦`);
});
/* arrastrar */
const rail=$('#rail'); let down=false,sx=0,sl=0;
rail.addEventListener('pointerdown',e=>{ down=true; sx=e.clientX; sl=rail.scrollLeft; rail.classList.add('dragging'); });
window.addEventListener('pointermove',e=>{ if(down) rail.scrollLeft = sl-(e.clientX-sx); });
window.addEventListener('pointerup',()=>{ down=false; rail.classList.remove('dragging'); });
$('#railPrev').onclick=()=>rail.scrollBy({left:-420,behavior:RM?'auto':'smooth'});
$('#railNext').onclick=()=>rail.scrollBy({left:420,behavior:RM?'auto':'smooth'});

/* ═══════════ REVEALS + CONTADORES ═══════════ */
const io = new IntersectionObserver(es=>es.forEach(en=>{
  if(!en.isIntersecting) return;
  en.target.classList.add('in');
  en.target.querySelectorAll?.('.num[data-n]').forEach(animNum);
  if(en.target.matches('.num[data-n]')) animNum(en.target);
  io.unobserve(en.target);
}),{threshold:.15});
function observe(){ $$('.rv,.lm').forEach(el=>io.observe(el)); $$('.num[data-n]').forEach(el=>io.observe(el)); }
observe();
function animNum(el){
  if(el._done) return; el._done=true;
  const n=+el.dataset.n, s=el.dataset.s||'';
  if(RM){ el.textContent=n+s; return; }
  const t0=performance.now(), D=1400;
  (function tick(t){ const k=Math.min(1,(t-t0)/D), e=1-Math.pow(1-k,3);
    el.textContent=Math.round(n*e)+s; if(k<1) requestAnimationFrame(tick); })(t0);
}

/* ═══════════ SCROLL: nav, progreso, parallax, top ═══════════ */
const nav=$('#nav'), ghost=$('#ghost'), toTop=$('#toTop');
let ticking=false;
window.addEventListener('scroll',()=>{ if(!ticking){ requestAnimationFrame(paint); ticking=true; } },{passive:true});
function paint(){
  const y=window.scrollY, h=document.documentElement.scrollHeight-innerHeight;
  nav.classList.toggle('scrolled',y>30);
  $('#progress').style.width=(h>0? y/h*100:0)+'%';
  toTop.classList.toggle('show',y>700);
  if(!RM && ghost) ghost.style.transform=`translateY(${y*.14}px)`;
  ticking=false;
}
paint();
toTop.onclick=()=>window.scrollTo({top:0,behavior:RM?'auto':'smooth'});

/* ═══════════ MENÚ MÓVIL ═══════════ */
const burger=$('#burger');
burger.onclick=()=>{ const o=document.body.classList.toggle('menu-open'); burger.setAttribute('aria-expanded',o); };
$$('#mnav a.big').forEach(a=>a.addEventListener('click',()=>document.body.classList.remove('menu-open')));

/* ═══════════ ISLAND (estilo Dynamic Island) ═══════════ */
setTimeout(()=>$('#island').classList.add('show'),1100);
setTimeout(()=>$('#island').classList.remove('show'),6500);
$('#island').addEventListener('click',()=>{ window.open(waLink('Hola LÚMINA 👋 Vi el aviso de disponibilidad y quiero un proyecto.'),'_blank'); });

/* ═══════════ COPIAR CORREO ═══════════ */
$('#copyMail').onclick=async()=>{
  try{ await navigator.clipboard.writeText('hola@lumina.studio'); toast('Correo copiado ✓'); }
  catch{ toast('hola@lumina.studio'); }
};

/* ═══════════ TILT ═══════════ */
if(FINE && !RM){
  $$('[data-tilt]').forEach(el=>{
    el.addEventListener('mousemove',e=>{
      const r=el.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
      el.style.transform=`perspective(900px) rotateY(${x*5}deg) rotateX(${-y*5}deg)`;
    });
    el.addEventListener('mouseleave',()=>el.style.transform='');
  });
}

/* ═══════════ CURSOR ═══════════ */
if(FINE && !RM){
  const ring=$('#ring'); let mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my;
  addEventListener('mousemove',e=>{ mx=e.clientX; my=e.clientY; });
  (function loop(){ rx+=(mx-rx)*.16; ry+=(my-ry)*.16;
    ring.style.left=rx+'px'; ring.style.top=ry+'px'; requestAnimationFrame(loop); })();
  document.addEventListener('mouseover',e=>{
    ring.classList.toggle('big', !!e.target.closest('a,button,.card,.rcard,.thumb'));
  });
}
