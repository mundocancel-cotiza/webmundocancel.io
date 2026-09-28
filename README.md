mundocancel web contacto 

# 📝 Guía de Edición — LÚMINA (Portafolio Galería)

> Documento de referencia para personalizar el prototipo de página web.
> Abre el archivo `index.html` en tu editor y sigue las secciones de abajo.

---

## 🗂️ 1. Estructura del archivo

| Zona | Qué contiene | Dónde está |
|---|---|---|
| `<head>` | Fuentes, título, SEO | Líneas iniciales |
| `<style>` | Todo el CSS | Dentro del `<head>` |
| `<body>` | Secciones HTML visibles | Después del `</style>` |
| `<script>` | Toda la lógica JS | Antes del `</body>` |

**Secciones de la página (en orden):**
1. `#inicio` → Sala principal / pieza destacada
2. `.marquee` → Cinta de disciplinas en movimiento
3. `#obra` → Galería con filtros
4. `#colecciones` → Carrusel de salas temáticas
5. `#proceso` → Método de trabajo (sticky)
6. `.stats` → Cifras animadas
7. `.testi` → Testimonios
8. `#contacto` → WhatsApp + redes
9. `<footer>` → Créditos

---

## 📱 2. WhatsApp (¡cámbialo primero!)

Busca esta línea al inicio del `<script>`:

```js
const WA_NUM = '5215512345678'; // ← cambia este número
```

**Formato:** código de país + número, **sin** `+`, espacios ni guiones.

| País | Ejemplo correcto |
|---|---|
| México | `5215512345678` |
| Colombia | `573001234567` |
| España | `34600123456` |
| Argentina | `5491123456789` |

Los mensajes predefinidos están en cada atributo `data-msg="..."`. Puedes editarlos libremente:

```html
<a class="btn btn-wa" data-wa data-msg="Hola, quiero cotizar un proyecto">
```

---

## 🎨 3. Identidad visual (CSS)

Todo se controla desde las variables en `:root`:

```css
:root{
  --bg:#07080d;       /* fondo principal */
  --tx:#f4f5f8;       /* color de texto */
  --acc:#e5c07b;      /* acento dorado (botones, detalles) */
  --acc2:#8ab4ff;     /* acento secundario */
  --wa:#25d366;       /* verde WhatsApp */
  --r-lg:24px;        /* redondeo grande */
  --r-md:18px;        /* redondeo medio */
}
```

**Paletas sugeridas para probar:**

| Estilo | `--acc` | `--bg` |
|---|---|---|
| Dorado (actual) | `#e5c07b` | `#07080d` |
| Azul eléctrico | `#6ea8ff` | `#05070d` |
| Verde salvia | `#9fc7a4` | `#0a0d0a` |
| Coral | `#ff8f6b` | `#0d0808` |
| Lila | `#b79cff` | `#0a0810` |

**Fuentes tipográficas** (cámbialas en el `<link>` de Google Fonts):

```
Display: Syne          → títulos
Cuerpo:  Instrument Sans → párrafos
Mono:    Space Mono    → etiquetas técnicas
```

---

## 🖼️ 4. Tus proyectos (lo más importante)

Edita el array `PROJECTS` en el `<script>`. Cada proyecto es un objeto:

```js
{
  id:'p1',                     // identificador único
  t:'Aura Café',               // título de la obra
  cat:'identidad',             // categoría: identidad | web | foto | 3d
  year:'2025',                 // año
  seed:'branding-aura-cafe',   // semilla de imagen (o URL completa)
  ar:'4/3',                    // proporción: 4/3, 3/4, 1/1, 16/10, 4/5
  w:900, h:675,                // dimensiones de la imagen
  client:'Aura Café',          // cliente
  role:'Dirección de arte',    // tu rol
  desc:'Descripción breve...'  // texto del lightbox
}
```

**Categorías disponibles** (objeto `CATS`):

```js
const CATS = {
  identidad:'Identidad',
  web:'Web & App',
  foto:'Fotografía',
  '3d':'3D & Render'
};
```
> Puedes agregar nuevas categorías aquí y su botón de filtro correspondiente en `#filters`.

**Piezas destacadas del hero** (elige 4 IDs):

```js
const FEATURED = ['p1','p2','p7','p4'];
```

### Usar tus propias imágenes

Reemplaza la función que genera URLs. Busca `picsum.photos/seed/` y cambia por tu ruta:

```js
// Antes
src = `https://picsum.photos/seed/${p.seed}/${p.w}/${p.h}`

// Después (ejemplo con carpeta local)
src = `img/${p.seed}.jpg`
```

---

## 🌐 5. Redes sociales

Edita el array `SOCIALS` en el `<script>`:

```js
const SOCIALS=[
  { n:'Instagram', u:'https://instagram.com/TU_USUARIO', svg:'...' },
  { n:'Behance',   u:'https://behance.net/TU_USUARIO', txt:'Bē' },
  // agrega o elimina las que quieras
];
```

---

## ✍️ 6. Textos editables

| Texto | Dónde buscarlo |
|---|---|
| Nombre de marca | `LÚMINA®` (nav + footer) |
| Título del sitio | `<title>` en el `<head>` |
| Descripción SEO | `<meta name="description">` |
| Subtítulo del hero | `.hero-sub` |
| Disciplinas del marquee | `#mqTrack` |
| Pasos del proceso | `article.step` |
| Cifras | atributos `data-n` en `.stat` |
| Testimonios | `article.tcard` |
| Correo de contacto | `hola@lumina.studio` (aparece 2 veces + en JS del botón copiar) |
| Teléfono mostrado | `+52 55 1234 5678` |

---

## ✅ 7. Checklist antes de publicar

- [ ] Número de WhatsApp actualizado en `WA_NUM`
- [ ] Teléfono visible coincide con el de WhatsApp
- [ ] Correo real en las 3 apariciones
- [ ] URLs de redes sociales correctas
- [ ] Proyectos reales en el array `PROJECTS`
- [ ] Imágenes propias (opcional pero recomendado)
- [ ] Nombre de marca reemplazado (buscar y reemplazar `LÚMINA`)
- [ ] Título y descripción SEO actualizados
- [ ] Año del footer (se actualiza solo con `new Date()`)
- [ ] Probar en móvil y escritorio
- [ ] Probar que `prefers-reduced-motion` no rompa nada

---

## ⚙️ 8. Ajustes avanzados

**Velocidad del marquee:**
```css
.mq-track{ animation:mq 26s linear infinite; } /* sube el número = más lento */
```

**Velocidad de rotación del hero (ms):**
```js
heroTimer=setInterval(()=>setFeatured(feat+1),6000); // 6000 = 6 segundos
```

**Intensidad del tilt 3D:**
```js
el.style.transform=`perspective(900px) rotateY(${x*5}deg) rotateX(${-y*5}deg)`;
// cambia 5 por 8 para más efecto, o 3 para menos
```

**Desactivar el anillo del cursor:** elimina el bloque `/* CURSOR */` al final del script.

**Desactivar la isla dinámica:** elimina el bloque `/* ISLAND */`.

---

## 🚀 9. Publicación rápida

1. Guarda el archivo como `index.html`
2. Opciones gratuitas:
   - **Netlify Drop** → arrastra el archivo a [app.netlify.com/drop](https://app.netlify.com/drop)
   - **GitHub Pages** → sube a un repositorio y activa Pages
   - **Vercel** → `vercel deploy` en la carpeta
3. Comparte el enlace en tu bio de redes ✦

---

