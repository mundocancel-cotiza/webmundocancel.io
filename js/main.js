/* ═══════════ CONFIG ═══════════ */
const WA_NUM = '5215512345678'; // ← cambia este número por el tuyo (código país + número)
const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const FINE = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
const waLink = m => `https://wa.me/${WA_NUM}?text=${encodeURIComponent(m)}`;

const CATS = {identidad:'Identidad', web:'Web & App', foto:'Fotografía', '3d':'3D & Render'};
const PROJECTS = [
 {id:'p1', t:'Aura Café',        cat:'identidad', year:'2025', seed:'branding-aura-cafe',       ar:'4/3',  w:900,  h:675,  client:'Aura Café',     role:'Dirección de arte', desc:'Identidad integral para cafetería de especialidad: naming, logotipo, sistema visual, empaque y señalética del local.'},
 {id:'p2', t:'Nébula Finance',   cat:'web',       year:'2024', seed:'fintech-app-nebula-ui',    ar:'3/4',  w:750,  h:1000, client:'Nébula',        role:'UX/UI + Desarrollo', desc:'Diseño de producto para fintech: sistema de diseño, landing page y aplicación móvil iOS/Android.'},
 {id:'p3', t:'Retrato Editorial',cat:'foto',      year:'2025', seed:'studio-editorial-portrait',ar:'3/4',  w:750,  h:1000, client:'Revista Prisma',role:'Fotografía', desc:'Serie de retratos en estudio para la edición Nº12 de Revista Prisma. Luz dura, fondo neutro, carácter.'},
 {id:'p4', t:'Monolito',         cat:'3d',        year:'2024', seed:'3d-monolith-render-dark',  ar:'1/1',  w:900,  h:900,  client:'Personal',      role:'3D & Render', desc:'Exploración escultórica digital: volúmenes pétreos flotantes con iluminación dramática. Render 4K.'},
 {id:'p5', t:'Kōri Tea',         cat:'identidad', year:'2024', seed:'packaging-kori-tea',       ar:'4/5',  w:800,  h:1000, client:'Kōri',          role:'Branding + Packaging', desc:'Identidad y empaque para línea de tés fríos de inspiración japonesa. Minimalismo y textura.'},
 {id:'p6', t:'Ondas',            cat:'web',       year:'2025', seed:'music-web-waves-audio',    ar:'16/10',w:1200, h:750,  client:'Ondas Records', role:'Web creativa', desc:'Experiencia web interactiva para sello de música electrónica: audio-reactividad y WebGL.'},
 {id:'p7', t:'Neón Urbano',      cat:'foto',      year:'2023', seed:'urban-neon-night-street',  ar:'16/10',w:1200, h:750,  client:'Galería Norte', role:'Fotografía', desc:'Serie fotográfica nocturna: la ciudad como circuito de luz. Exhibida en Galería Norte, 2023.'},
 {id:'p8', t:'Vitrales',         cat:'3d',        year:'2025', seed:'glass-abstract-3d-art',    ar:'4/5',  w:800,  h:1000, client:'Colección',     role:'3D & Render', desc:'Estudio de materiales translúcidos y refracción. Pieza parte de la colección digital del estudio.'},
 {id:'p9', t:'Terra Vinos',      cat:'identidad', year:'2023', seed:'wine-label-terra-brand',   ar:'1/1',  w:900,  h:900,  client:'Terra Vinos',   role:'Branding', desc:'Identidad y etiquetas para viñedo boutique: papel algodón, foil cobre y tipografía a medida.'},
 {id:'p10',t:'Atlas Panel',      cat:'web',       year:'2024', seed:'dashboard-analytics-atlas',ar:'4/3',  w:960,  h:720,  client:'Atlas Data',    role:'UX/UI', desc:'Dashboard de analítica en tiempo real: dark mode, visualización de datos y micro-interacciones.'},
 {id:'p11',t:'Prisma Moda',      cat:'foto',      year:'2024', seed:'fashion-editorial-prisma', ar:'3/4',  w:750,  h:1000, client:'Prisma',        role:'Fotografía', desc:'Editorial de moda primavera: color bloque, geometría y movimiento congelado.'},
 {id:'p12',t:'Flora Digital',    cat:'3d',        year:'2023', seed:'digital-flora-3d-render',  ar:'1/1',  w:900,  h:900,  client:'Personal',      role:'3D & Render', desc:'Botánica imposible: flora generativa explorando color y simetría orgánica.'}
];
const FEATURED = ['p1','p2','p7','p4'];
const byId = id => PROJECTS.find(p=>p.id===id);

/* ═══════════ UTILIDADES ═══════════ */
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
let toastT;
function toast(msg){ const t=$('#toast'); t.textContent=msg; t.classList.add('show'); clearTimeout(toastT); toastT=setTimeout(()=>t.classList.remove('show'),2300); }

function scramble(el,text){
  if(RM){ el.textContent=text; return; }
  if(el._iv) clearInterval(el._iv);
  const chars='█▓▒░<>/*+#0123456789'; let it=0;
  el._iv=setInterval(()=>{ it++;
    el.textContent=text.split('').map((c,i)=> i<it-5 ? c : (c===' '?' ':chars[Math.random()*chars.length|0])).join('');
    if(it-5>=text.length){ clearInterval(el._iv); el.textContent=text; }
  },26);
}

/* enlaces WhatsApp dinámicos */
$$('[data-wa]').forEach(a=>{
  a.href = waLink(a.dataset.msg || 'Hola LÚMINA 👋 Vi su portafolio y quiero más información.');
  a.target='_blank'; a.rel='noopener';
  a.addEventListener('click',()=>toast('Abriendo WhatsApp…'));
});

/* redes sociales */
const SOCIALS=[
 {n:'Instagram', u:'https://instagram.com/lumina.studio', svg:'<svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0 5.838a6 6 0 100 12 6 6 0 000-12zm0 9.9a3.9 3.9 0 110-7.8 3.9 3.9 0 010 7.8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>'},
 {n:'Behance', u:'https://behance.net/luminastudio', txt:'Bē'},
 {n:'X', u:'https://x.com/luminastudio', svg:'<svg viewBox="0 0 24 24"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>'},
 {n:'LinkedIn', u:'https://linkedin.com/company/lumina-studio', svg:'<svg viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>'},
 {n:'YouTube', u:'https://youtube.com/@luminastudio', svg:'<svg viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>'}
];
function socHTML(){ return SOCIALS.map(s=>`<a class="soc glass" href="${s.u}" target="_blank" rel="noopener" aria-label="${s.n}" title="${s.n}">${s.svg||`<span class="be">${s.txt}</span>`}</a>`).join(''); }
$('#socials').innerHTML = socHTML();
$('#msoc').innerHTML = socHTML();
$('#year').textContent = new Date().getFullYear();

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
