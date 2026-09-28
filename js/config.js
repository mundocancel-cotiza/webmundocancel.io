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