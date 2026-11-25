# Mundo Cancel — webmundocancel.io

Sitio de una sola página para **Mundo Cancel, cancelería de aluminio y vidrio**:
galería de trabajos reales, colecciones por tipo de trabajo y cotización por WhatsApp.

> Estado actual: 15 trabajos reales con fotos propias en `img/` (WebP).
> La galería ya no usa imágenes de prueba. Quedan pendientes los datos de
> contacto/redes/testimonios — ver la checklist al final, no inventarlos.

## Estructura

```
index.html          Página (ojo: minúsculas, así la sirven Netlify y GitHub Pages)
css/styles.css      Todo el CSS
js/config.js        WhatsApp, categorías, proyectos, redes sociales
js/main.js          Galería, lightbox, hero, colecciones, filtros
img/                Fotos reales en WebP (8 archivos, ~500 KB)
incoming/           Bandeja de entrada: aquí se sueltan las fotos nuevas (no se sube a git)
tools/feed-images.py  Script que optimiza las fotos y actualiza el código
robots.txt / sitemap.xml
```

Secciones de la página (en orden): `#inicio` (hero) → marquee →
`#obra` (galería con filtros) → `#colecciones` → `#proceso` →
`#contacto` → footer.

## Cómo agregar o cambiar una foto (sin tocar código)

1. Suelta la foto en `incoming/` con el nombre exacto del trabajo, por ejemplo
   `fachada-blanca-ventanales-negros.webp`. Acepta WebP, JPG y PNG.
   Si es un trabajo nuevo, primero agrégalo al array `PROJECTS` (abajo).
2. Corre:
   ```bash
   python3 tools/feed-images.py --check   # solo revisa qué falta
   python3 tools/feed-images.py           # optimiza y actualiza el código
   ```
   El script guarda la foto optimizada en `img/` (WebP, lado mayor 1600 px)
   y deja `incoming/` listo para la siguiente. Para JPG en vez de WebP:
   `python3 tools/feed-images.py --format jpg`.
3. Recarga la página. No hay que editar ninguna URL a mano.

Fotos actuales (todas 960×1200, proporción 4/5):

| Archivo | Trabajo |
|---|---|
| `fachada-blanca-ventanales-negros.webp` | Fachada Blanca |
| `puertas-interiores-gris-grafito.webp` | Puertas Interiores Grafito |
| `puerta-negra-esmerilada-abatible.webp` | Puerta Negra Esmerilada |
| `esquina-hueso-cancel-corredizo.webp` | Esquina a Hueso 3" |
| `fachada-piedra-cristal.webp` | Fachada Piedra y Cristal |
| `puertas-ventanas-aluminio-blanco.webp` | Puertas y Ventanas Blancas |
| `fachada-ladrillo-ventanales.webp` | Fachada Ladrillo |
| `cancel-bano-vidrio-templado.webp` | Cancel de Baño |
| `fachada-beige-cristal-piso-techo.webp` | Fachada Beige Cristal |
| `fachada-piedra-columna-gris.webp` | Fachada Piedra y Columna |
| `muro-cristal-corredizo-cocina.webp` | Muro de Cristal Corredizo |
| `domo-vidrio-azotea.webp` | Domo de Vidrio |
| `fachada-piedra-alberca-atardecer.webp` | Fachada Piedra y Alberca |
| `puerta-doble-vidrio-negra.webp` | Puerta Doble de Vidrio |
| `cancel-bano-riel-negro.webp` | Cancel de Baño Riel Negro |

## Cómo editar los trabajos

En `js/config.js`, cada trabajo es un objeto del array `PROJECTS`:

```js
{
  id:'p1',                   // identificador único
  t:'Fachada Blanca',        // título que se ve en la galería y el lightbox
  cat:'fachadas',            // categoría: fachadas | puertas | canceles
  year:'2026',
  seed:'fachada-blanca-ventanales-negros',  // nombre del archivo en img/, sin extensión
  ar:'4/5',                  // proporción de la foto
  client:'Residencial',
  role:'Ventanales y puertas corredizas',
  desc:'Descripción breve...'  // texto del lightbox
}
```

Categorías (`CATS` en el mismo archivo): `fachadas`, `puertas`, `canceles`.
Si agregas una categoría nueva, agrega también su botón en `#filters` de
`index.html` y su colección en `COLS` de `js/main.js`.

Piezas destacadas del hero (4 IDs): `FEATURED` en `js/config.js`,
hoy `['p1','p4','p7','p8']`.

Colecciones (`COLS` en `js/main.js`): Fachadas (7 piezas), Puertas (4),
Canceles (4). Cada colección reutiliza la foto de un proyecto, no necesita
archivo propio; el campo `n` es el conteo que se muestra.

## WhatsApp y contacto

- Número: `WA_NUM` al inicio de `js/config.js`, hoy `5213320827128`.
  Formato: código de país + número, sin `+`, espacios ni guiones.
  **Verificar que sea el número correcto de Mundo Cancel.**
- Los mensajes predefinidos están en cada atributo `data-msg="..."` de
  `index.html` y en `js/config.js` / `js/main.js` (función `waLink`).
- Teléfono visible: `+52 33 2082 7128` (se deriva del `WA_NUM`).

## Identidad visual

Variables en `:root` de `css/styles.css`:

```css
--bg:#07080d;   /* fondo principal */
--tx:#f4f5f8;   /* color de texto */
--acc:#e5c07b;  /* acento dorado */
--wa:#25d366;   /* verde WhatsApp */
```

Fuentes (Google Fonts): Syne (títulos), Instrument Sans (texto),
Space Mono (etiquetas).

## Textos editables

| Texto | Dónde |
|---|---|
| Título del sitio y descripción SEO | `<title>` y `<meta name="description">` en `index.html` |
| Subtítulo del hero | `.hero-sub` en `index.html` |
| Textos del marquee | `#mqTrack` en `index.html` |
| Pasos del proceso | `article.step` en `index.html` |
| Cifras | atributos `data-n` en `.stat` |
| Testimonios | Sección eliminada por ahora; se repone cuando lleguen los comentarios reales de clientes |
| Redes sociales | array `SOCIALS` en `js/config.js` |
| Correo de contacto | `mundocancel@gmail.com` en `index.html` y `js/main.js` (botón copiar) |

## Checklist antes de publicar

- [x] Fotos reales en `img/` y galería sin imágenes de prueba
- [x] `index.html` enlaza `css/styles.css`, `js/config.js` y `js/main.js`
- [x] Filtros y colecciones coinciden con las categorías reales
- [x] **Número de WhatsApp confirmado**: `5213320827128`
- [x] **Correo real**: `mundocancel@gmail.com`
- [ ] **Redes sociales reales** (hoy apuntan a `lumina.studio`, de la plantilla)
- [x] **Testimonios falsos eliminados** (sección quitada; se vuelve a poner con los comentarios reales de clientes consolidados)
- [x] **Cifras falsas eliminadas** (sección quitada; se vuelve a poner solo con números reales)
- [ ] **Proceso real** (hoy habla de brief/moodboard/sprints, lenguaje de
      estudio creativo; el proceso real es medición → fabricación → instalación)
- [x] **Ciudad**: Zona Metropolitana de Guadalajara, Jalisco, con cobertura en casi todo el estado
- [ ] Probar en móvil y escritorio, y con `prefers-reduced-motion`

## Ajustes avanzados

- Velocidad del marquee: `.mq-track{ animation:mq 26s linear infinite; }`
  (el contenido se duplica solo en JS para que el loop no tenga hueco).
- Rotación del hero: `setInterval(()=>setFeatured(feat+1),6000)` en `js/main.js`.
- Tilt 3D: `rotateY(${x*5}deg)` en `js/main.js` (5 = intensidad).
- Para desactivar el anillo del cursor: elimina el bloque `/* CURSOR */`
  de `js/main.js`. Para la isla dinámica: el bloque `/* ISLAND */`.

## Publicación

El repo es `mundocancel-cotiza/webmundocancel.io`. Opciones gratuitas:

- **Netlify** → conecta el repo; publica la raíz tal cual (no hay build).
- **GitHub Pages** → sube el repo y activa Pages desde la rama principal.
- **Netlify Drop** → arrastra la carpeta a
  [app.netlify.com/drop](https://app.netlify.com/drop) para una prueba rápida.

Para probar en local: `python3 -m http.server` dentro de la carpeta y abrir
`http://localhost:8000/`.
