/* ═══════════ CONFIG ═══════════ */
const WA_NUM = '5213320827128'; // ← cambia este número por el tuyo (código país + número)
const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const FINE = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
const waLink = m => `https://wa.me/${WA_NUM}?text=${encodeURIComponent(m)}`;

const CATS = {fachadas:'Fachadas', puertas:'Puertas', canceles:'Canceles'};
const PROJECTS = [
 {id:'p1', t:'Fachada Blanca',               cat:'fachadas', year:'2026', seed:'fachada-blanca-ventanales-negros',    ar:'4/5', client:'Residencial', role:'Ventanales y puertas corredizas', desc:'Fachada residencial con ventanales de aluminio negro y puertas corredizas de piso a techo.'},
 {id:'p2', t:'Puertas Interiores Grafito',   cat:'puertas',  year:'2026', seed:'puertas-interiores-gris-grafito',     ar:'4/5', client:'Residencial', role:'Puertas interiores',              desc:'Puertas interiores de aluminio grafito con cristal claro y divisiones horizontales.'},
 {id:'p3', t:'Puerta Negra Esmerilada',      cat:'puertas',  year:'2026', seed:'puerta-negra-esmerilada-abatible',     ar:'4/5', client:'Residencial', role:'Puerta y ventana abatible',        desc:'Puerta de aluminio negro con cristal esmerilado, ventana abatible y fijo superior en arco.'},
 {id:'p4', t:'Esquina a Hueso 3"',           cat:'canceles', year:'2026', seed:'esquina-hueso-cancel-corredizo',       ar:'4/5', client:'Residencial', role:'Cancel corredizo',                desc:'Cancel corredizo en esquina a hueso de 3 pulgadas, cristal templado y perfilería negra.'},
 {id:'p5', t:'Fachada Piedra y Cristal',     cat:'fachadas', year:'2026', seed:'fachada-piedra-cristal',               ar:'4/5', client:'Residencial', role:'Ventanales y puerta corrediza',    desc:'Fachada con muro de piedra, ventanal fijo y puerta corrediza de aluminio negro.'},
 {id:'p6', t:'Puertas y Ventanas Blancas',   cat:'puertas',  year:'2026', seed:'puertas-ventanas-aluminio-blanco',     ar:'4/5', client:'Residencial', role:'Puertas y ventanas',              desc:'Puertas y ventanas de aluminio blanco con cristal bronce, para exterior.'},
 {id:'p7', t:'Fachada Ladrillo',             cat:'fachadas', year:'2026', seed:'fachada-ladrillo-ventanales',          ar:'4/5', client:'Residencial', role:'Ventanales',                      desc:'Fachada de ladrillo con ventanales negros de dos niveles y puerta corrediza a recámara.'},
 {id:'p8', t:'Cancel de Baño',               cat:'canceles', year:'2026', seed:'cancel-bano-vidrio-templado',          ar:'4/5', client:'Residencial', role:'Cancel de baño',                  desc:'Cancel de baño en vidrio templado con herraje corredizo, fijo y puerta.'},
 {id:'p9', t:'Fachada Beige Cristal',        cat:'fachadas', year:'2026', seed:'fachada-beige-cristal-piso-techo',     ar:'4/5', client:'Residencial', role:'Ventanal de piso a techo y puertas corredizas', desc:'Casa de dos niveles con ventanal de piso a techo en planta alta y canceles corredizos que abren la cocina y el comedor al jardín.'},
 {id:'p10', t:'Fachada Piedra y Columna',    cat:'fachadas', year:'2026', seed:'fachada-piedra-columna-gris',          ar:'4/5', client:'Residencial', role:'Ventanales y puertas corredizas',    desc:'Fachada con columna de piedra gris, volúmenes blancos y cancelería negra corrediza.'},
 {id:'p11', t:'Muro de Cristal Corredizo',   cat:'fachadas', year:'2026', seed:'muro-cristal-corredizo-cocina',        ar:'4/5', client:'Residencial', role:'Canceles corredizos de piso a techo', desc:'Muro completo de cristal corredizo que conecta la cocina con el jardín.'},
 {id:'p12', t:'Domo de Vidrio',              cat:'canceles', year:'2026', seed:'domo-vidrio-azotea',                   ar:'4/5', client:'Residencial', role:'Domo de vidrio templado',         desc:'Domo de vidrio templado en azotea que llena de luz natural el interior.'},
 {id:'p13', t:'Fachada Piedra y Alberca',    cat:'fachadas', year:'2026', seed:'fachada-piedra-alberca-atardecer',     ar:'4/5', client:'Residencial', role:'Ventanales, barandal de vidrio y puertas corredizas', desc:'Casa de dos niveles con muro de piedra, barandal de vidrio en el balcón y canceles corredizos frente a la alberca.'},
 {id:'p14', t:'Puerta Doble de Vidrio',      cat:'puertas',  year:'2026', seed:'puerta-doble-vidrio-negra',            ar:'4/5', client:'Residencial', role:'Puerta doble de aluminio negro y vidrio', desc:'Puerta doble interior de aluminio negro con vidrio claro, en pasillo de mármol.'},
 {id:'p15', t:'Cancel de Baño Riel Negro',   cat:'canceles', year:'2026', seed:'cancel-bano-riel-negro',               ar:'4/5', client:'Residencial', role:'Cancel corredizo con riel negro', desc:'Cancel de baño corredizo con riel negro y vidrio templado, en baño de azulejo blanco.'},
 {id:'p16', t:'Ventanal Negro con Retícula', cat:'fachadas', year:'2023', seed:'fachada-ventanal-negro-reticula-piedra', ar:'4/5', client:'Residencial', role:'Ventanal con retícula', desc:'Ventanal negro con retícula sobre muro de piedra y fachada blanca.'},
 {id:'p17', t:'Cancel Corredizo Negro', cat:'canceles', year:'2023', seed:'cancel-corredizo-negro-tres-hojas', ar:'4/3', client:'Residencial', role:'Cancel corredizo', desc:'Cancel corredizo negro de tres hojas, vista frontal completa.'},
 {id:'p18', t:'Patio con Canceles Negros', cat:'fachadas', year:'2023', seed:'fachada-patio-canceles-negros', ar:'4/3', client:'Residencial', role:'Canceles corredizos', desc:'Casa blanca terminada con canceles negros en el patio, cielo despejado.'},
 {id:'p19', t:'Ventanal Espejo con Arco', cat:'fachadas', year:'2023', seed:'ventanal-negro-espejo-arco', ar:'4/3', client:'Residencial', role:'Ventanal espejo', desc:'Ventanal espejo negro con arco decorativo y palmera.'},
 {id:'p20', t:'Puerta en Arco Abatible', cat:'puertas', year:'2024', seed:'puerta-arco-abatible-vidrio', ar:'4/5', client:'Residencial', role:'Puerta abatible en arco', desc:'Puerta en arco de vidrio abatible que abre a la terraza.'},
 {id:'p21', t:'Cancel Corredizo en Terraza', cat:'canceles', year:'2019', seed:'cancel-corredizo-negro-terraza', ar:'4/3', client:'Residencial', role:'Cancel corredizo', desc:'Cancel corredizo negro gigante de piso a techo en terraza.'},
 {id:'p22', t:'Casa Negra con Alberca', cat:'fachadas', year:'2019', seed:'fachada-casa-negra-alberca', ar:'4/5', client:'Residencial', role:'Ventanales y puertas corredizas', desc:'Casa moderna negra con alberca y jardín, cancelería negra de piso a techo.'},
 {id:'p23', t:'Ventana en Arco con Cantera', cat:'fachadas', year:'2019', seed:'ventana-arco-blanca-cantera', ar:'4/3', client:'Residencial', role:'Ventana en arco', desc:'Ventana en arco blanca con retícula, muro de cantera y plantas.'},
 {id:'p24', t:'Fachada Blanca con Canceles', cat:'fachadas', year:'2019', seed:'fachada-blanca-canceles-negros', ar:'4/3', client:'Residencial', role:'Cancelería negra', desc:'Fachada blanca terminada con cancelería negra grande.'},
 {id:'p25', t:'Cancel de Baño en Mármol', cat:'canceles', year:'2019', seed:'cancel-bano-marmol-esquinero', ar:'4/3', client:'Residencial', role:'Cancel de baño', desc:'Cancel de baño esquinero negro sobre mármol.'},
 {id:'p26', t:'Ventanal Negro de Piso a Techo', cat:'fachadas', year:'2026', seed:'ventanal-negro-piso-techo', ar:'4/5', client:'Residencial', role:'Ventanal de piso a techo', desc:'Ventanal negro enorme de piso a techo con vista a la calle.'},
 {id:'p27', t:'Ventana con Rendijas Verticales', cat:'fachadas', year:'2019', seed:'ventana-negra-rendijas-verticales', ar:'4/5', client:'Residencial', role:'Ventana negra', desc:'Ventana negra con tres rendijas verticales en interior blanco.'},
 {id:'p28', t:'Fachada Blanca Moderna', cat:'fachadas', year:'2019', seed:'fachada-blanca-moderna-dos-pisos', ar:'4/5', client:'Residencial', role:'Ventanales negros', desc:'Fachada moderna blanca de dos pisos con ventanales negros y barandal de vidrio.'},
 {id:'p29', t:'Fachada de Ladrillo y Blanco', cat:'fachadas', year:'2019', seed:'fachada-ladrillo-blanco', ar:'4/3', client:'Residencial', role:'Ventanales', desc:'Fachada de ladrillo con volúmenes blancos y cancelería negra.'},
 {id:'p30', t:'Puerta Negra con Retícula', cat:'puertas', year:'2019', seed:'puerta-negra-reticula', ar:'4/5', client:'Residencial', role:'Puerta interior', desc:'Puerta negra con divisiones horizontales, interior limpio y bien iluminado.'},
 {id:'p31', t:'Cúpula con Ventanas en Arco', cat:'fachadas', year:'2020', seed:'cupula-ventanas-arco', ar:'4/5', client:'Residencial', role:'Ventanas en arco', desc:'Cúpula interior con cinco ventanitas en arco.'},
 {id:'p32', t:'Puerta de Aluminio a Patio', cat:'puertas', year:'2020', seed:'puerta-aluminio-cocina-patio', ar:'4/5', client:'Residencial', role:'Puerta de aluminio', desc:'Puerta de aluminio con ventana junto a la cocina, que abre al patio.'},
 {id:'p33', t:'Fachada con Ventanal Esquinero', cat:'fachadas', year:'2020', seed:'fachada-moderna-ventanal-esquinero', ar:'4/3', client:'Residencial', role:'Ventanal esquinero', desc:'Casa moderna blanca con ventanal esquinero de vidrio.'},
 {id:'p34', t:'Cancel Corredizo en Comedor', cat:'canceles', year:'2021', seed:'cancel-corredizo-negro-comedor', ar:'4/5', client:'Residencial', role:'Cancel corredizo', desc:'Cancel corredizo negro gigante que abre el comedor a la cocina y al patio.'},
 {id:'p35', t:'Puerta Corrediza de Local', cat:'puertas', year:'2021', seed:'puerta-corrediza-aluminio-local', ar:'4/3', client:'Comercial', role:'Puerta corrediza', desc:'Puerta corrediza de aluminio en local comercial de ladrillo.'},
 {id:'p36', t:'Edificio de Departamentos', cat:'fachadas', year:'2021', seed:'fachada-edificio-departamentos', ar:'4/3', client:'Residencial', role:'Cancelería y barandales de vidrio', desc:'Edificio de departamentos con balcones y barandales de vidrio.'},
 {id:'p37', t:'Ventana en Arco con Retícula', cat:'fachadas', year:'2022', seed:'ventana-arco-reticula-blanca', ar:'4/3', client:'Residencial', role:'Ventana en arco', desc:'Ventana en arco blanca con retícula grande en terraza.'}
];
const FEATURED = ['p22','p1','p4','p7','p8'];
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
  a.href = waLink(a.dataset.msg || 'Hola Mundo Cancel 👋 Vi su galería y quiero cotizar.');
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
