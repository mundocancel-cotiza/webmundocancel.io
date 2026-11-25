#!/usr/bin/env python3
"""
feed-images.py — Alimentar las imágenes reales de webmundocancel.io
====================================================================
Repo: mundocancel-cotiza/webmundocancel.io (Mundo Cancel)

No, no tiene que ser JPG. WebP es mejor para web: mismo aspecto,
25-35% menos peso que JPG, y todos los navegadores modernos y Netlify
lo soportan. Por eso el formato de salida por defecto ahora es WebP.

Qué hace:
  1. Lee las fotos que pongas en `incoming/` (WebP, JPG, PNG, con
     cualquier nombre legible, pero lo ideal es el nombre exacto).
  2. Las normaliza (minúsculas, sin acentos, guiones), las optimiza
     con Pillow y las guarda en `img/<nombre-exacto>.webp`
     (o `.jpg` si usas `--format jpg`).
  3. Con `--patch` (por defecto activado cuando procesa al menos 1
     foto) reemplaza las URLs de Picsum en `js/main.js` e `index.html`
     por las rutas locales `img/...`. Hace respaldo `.bak` la primera vez.

Uso:
  # Solo revisar qué falta, sin tocar nada:
  python3 tools/feed-images.py --check

  # Procesar todo lo que haya en incoming/ y parchear el código (WebP):
  python3 tools/feed-images.py

  # Si prefieres JPG en vez de WebP:
  python3 tools/feed-images.py --format jpg

  # Procesar sin parchear el código (solo genera img/):
  python3 tools/feed-images.py --no-patch

  # Ver qué haría sin escribir nada:
  python3 tools/feed-images.py --dry-run

Nombres esperados (8 trabajos reales + 3 avatares opcionales = 11 archivos).
Las 3 colecciones reutilizan fotos de proyectos, no necesitan archivo propio.
  Proyectos (lado mayor 1600 px, calidad 82, todas 4/5 porque las fotos son 960x1200):
    fachada-blanca-ventanales-negros.webp   Fachada Blanca
    puertas-interiores-gris-grafito.webp    Puertas Interiores Grafito
    puerta-negra-esmerilada-abatible.webp   Puerta Negra Esmerilada
    esquina-hueso-cancel-corredizo.webp     Esquina a Hueso 3"
    fachada-piedra-cristal.webp             Fachada Piedra y Cristal
    puertas-ventanas-aluminio-blanco.webp   Puertas y Ventanas Blancas
    fachada-ladrillo-ventanales.webp        Fachada Ladrillo
    cancel-bano-vidrio-templado.webp        Cancel de Baño
  Avatares (400x400 px, opcionales):
    avatar-mariana-soto.webp
    avatar-diego-ramirez.webp
    avatar-lucia-ferrer.webp

Si ya las tienes optimizadas en WebP, el script solo las redimensiona
si te pasaste de tamaño y las renombra; no vuelve a comprimir de más.

Requisitos: Python 3.10+ y Pillow (`pip install Pillow`).
El CSS usa `object-fit: cover`, así que si tu foto no tiene la
proporción exacta, el sitio la recorta centrada, no la deforma.
El script solo avisa si la proporción difiere más de un 8%.
"""

import argparse
import re
import shutil
import sys
import unicodedata
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("Falta Pillow. Instálalo con: pip install Pillow")
    sys.exit(1)

ROOT = Path(__file__).resolve().parent.parent
INCOMING = ROOT / "incoming"
IMG_DIR = ROOT / "img"

# nombre -> (etiqueta, lado mayor en px, proporción esperada w/h o None)
# Las colecciones reutilizan fotos de proyectos, por eso no están aquí.
EXPECTED = {
    # Proyectos reales de Mundo Cancel (fotos 960x1200 = 4/5)
    "fachada-blanca-ventanales-negros": ("Fachada Blanca · proyecto", 1600, 4 / 5),
    "puertas-interiores-gris-grafito": ("Puertas Interiores Grafito · proyecto", 1600, 4 / 5),
    "puerta-negra-esmerilada-abatible": ("Puerta Negra Esmerilada · proyecto", 1600, 4 / 5),
    "esquina-hueso-cancel-corredizo": ("Esquina a Hueso 3\" · proyecto", 1600, 4 / 5),
    "fachada-piedra-cristal": ("Fachada Piedra y Cristal · proyecto", 1600, 4 / 5),
    "puertas-ventanas-aluminio-blanco": ("Puertas y Ventanas Blancas · proyecto", 1600, 4 / 5),
    "fachada-ladrillo-ventanales": ("Fachada Ladrillo · proyecto", 1600, 4 / 5),
    "cancel-bano-vidrio-templado": ("Cancel de Baño · proyecto", 1600, 4 / 5),
    "fachada-beige-cristal-piso-techo": ("Fachada Beige Cristal · proyecto", 1600, 4 / 5),
    "fachada-piedra-columna-gris": ("Fachada Piedra y Columna · proyecto", 1600, 4 / 5),
    "muro-cristal-corredizo-cocina": ("Muro de Cristal Corredizo · proyecto", 1600, 4 / 5),
    "domo-vidrio-azotea": ("Domo de Vidrio · proyecto", 1600, 4 / 5),
    "fachada-piedra-alberca-atardecer": ("Fachada Piedra y Alberca · proyecto", 1600, 4 / 5),
    "puerta-doble-vidrio-negra": ("Puerta Doble de Vidrio · proyecto", 1600, 4 / 5),
    "cancel-bano-riel-negro": ("Cancel de Baño Riel Negro · proyecto", 1600, 4 / 5),
    # Lote 3 (2026-11-25, 22 seleccionadas; proporción real por foto:
    # vertical 900x1200 = 4/5, horizontal 1200x900 / 1040x780 = 4/3)
    "fachada-ventanal-negro-reticula-piedra": ("Ventanal Negro con Retícula · proyecto", 1600, 4 / 5),
    "cancel-corredizo-negro-tres-hojas": ("Cancel Corredizo Negro · proyecto", 1600, 4 / 3),
    "fachada-patio-canceles-negros": ("Patio con Canceles Negros · proyecto", 1600, 4 / 3),
    "ventanal-negro-espejo-arco": ("Ventanal Espejo con Arco · proyecto", 1600, 4 / 3),
    "puerta-arco-abatible-vidrio": ("Puerta en Arco Abatible · proyecto", 1600, 4 / 5),
    "cancel-corredizo-negro-terraza": ("Cancel Corredizo en Terraza · proyecto", 1600, 4 / 3),
    "fachada-casa-negra-alberca": ("Casa Negra con Alberca · proyecto", 1600, 4 / 5),
    "ventana-arco-blanca-cantera": ("Ventana en Arco con Cantera · proyecto", 1600, 4 / 3),
    "fachada-blanca-canceles-negros": ("Fachada Blanca con Canceles · proyecto", 1600, 4 / 3),
    "cancel-bano-marmol-esquinero": ("Cancel de Baño en Mármol · proyecto", 1600, 4 / 3),
    "ventanal-negro-piso-techo": ("Ventanal Negro de Piso a Techo · proyecto", 1600, 4 / 5),
    "ventana-negra-rendijas-verticales": ("Ventana con Rendijas Verticales · proyecto", 1600, 4 / 5),
    "fachada-blanca-moderna-dos-pisos": ("Fachada Blanca Moderna · proyecto", 1600, 4 / 5),
    "fachada-ladrillo-blanco": ("Fachada de Ladrillo y Blanco · proyecto", 1600, 4 / 3),
    "puerta-negra-reticula": ("Puerta Negra con Retícula · proyecto", 1600, 4 / 5),
    "cupula-ventanas-arco": ("Cúpula con Ventanas en Arco · proyecto", 1600, 4 / 5),
    "puerta-aluminio-cocina-patio": ("Puerta de Aluminio a Patio · proyecto", 1600, 4 / 5),
    "fachada-moderna-ventanal-esquinero": ("Fachada con Ventanal Esquinero · proyecto", 1600, 4 / 3),
    "cancel-corredizo-negro-comedor": ("Cancel Corredizo en Comedor · proyecto", 1600, 4 / 5),
    "puerta-corrediza-aluminio-local": ("Puerta Corrediza de Local · proyecto", 1600, 4 / 3),
    "fachada-edificio-departamentos": ("Edificio de Departamentos · proyecto", 1600, 4 / 3),
    "ventana-arco-reticula-blanca": ("Ventana en Arco con Retícula · proyecto", 1600, 4 / 3),
    # Avatares
    "avatar-mariana-soto": ("Mariana Soto · avatar", 400, 1 / 1),
    "avatar-diego-ramirez": ("Diego Ramírez · avatar", 400, 1 / 1),
    "avatar-lucia-ferrer": ("Lucía Ferrer · avatar", 400, 1 / 1),
}

ALLOWED_EXTS = {".jpg", ".jpeg", ".png", ".webp", ".jfif"}


def normalize_stem(name: str) -> str:
    """minúsculas, sin acentos, espacios/guiones bajos -> guion."""
    name = unicodedata.normalize("NFKD", name.lower())
    name = "".join(c for c in name if not unicodedata.combining(c))
    name = re.sub(r"[^a-z0-9]+", "-", name).strip("-")
    return name


def find_candidates():
    """Devuelve {stem_normalizado: Path} para lo que haya en incoming/."""
    found = {}
    if not INCOMING.exists():
        return found
    for p in sorted(INCOMING.iterdir()):
        if p.is_file() and p.suffix.lower() in ALLOWED_EXTS:
            found[normalize_stem(p.stem)] = p
    return found


def optimize(src: Path, dest: Path, max_side: int, quality: int = 82, fmt: str = "webp") -> tuple:
    """Redimensiona al lado mayor y guarda optimizado. Devuelve (w, h, kb)."""
    with Image.open(src) as im:
        w, h = im.size
        scale = max_side / max(w, h)
        if scale < 1:
            im = im.resize((round(w * scale), round(h * scale)), Image.LANCZOS)
        if fmt == "webp":
            # WebP conserva transparencia si la hay; si no, RGB es más chico
            if im.mode in ("RGBA", "LA"):
                pass
            elif im.mode == "P":
                im = im.convert("RGBA") if "transparency" in im.info else im.convert("RGB")
            elif im.mode != "RGB":
                im = im.convert("RGB")
            im.save(dest, "WEBP", quality=quality, method=6)
        else:
            if im.mode in ("RGBA", "LA", "P"):
                bg = Image.new("RGB", im.size, (255, 255, 255))
                if im.mode == "P":
                    im = im.convert("RGBA")
                bg.paste(im, mask=im.split()[-1] if im.mode in ("RGBA", "LA") else None)
                im = bg
            else:
                im = im.convert("RGB")
            im.save(dest, "JPEG", quality=quality, optimize=True, progressive=True)
        return im.size[0], im.size[1], dest.stat().st_size // 1024


def patch_code(processed: set, ext: str) -> list:
    """Reemplaza Picsum por img/ solo para las fotos ya procesadas."""
    changed = []

    main_js = ROOT / "js" / "main.js"
    if main_js.exists():
        text = main_js.read_text(encoding="utf-8")
        orig = text
        # Plantillas JS: ${p.seed} y ${c.seed} -> img/${...}.webp (o .jpg)
        # También cubre el caso de que ya estuviera parcheado a .jpg
        text = re.sub(
            r"https://picsum\.photos/seed/\$\{p\.seed\}/[^\"`]+",
            f"img/${{p.seed}}.{ext}",
            text,
        )
        text = re.sub(
            r"https://picsum\.photos/seed/\$\{c\.seed\}/[^\"`]+",
            f"img/${{c.seed}}.{ext}",
            text,
        )
        text = text.replace(f"img/${{p.seed}}.jpg", f"img/${{p.seed}}.{ext}")
        text = text.replace(f"img/${{c.seed}}.jpg", f"img/${{c.seed}}.{ext}")
        if text != orig:
            backup(main_js)
            main_js.write_text(text, encoding="utf-8")
            changed.append("js/main.js")

    index = ROOT / "index.html"
    if not index.exists():
        index = ROOT / "Index.html"  # compatibilidad con el nombre viejo
    if index.exists():
        text = index.read_text(encoding="utf-8")
        orig = text
        for seed in processed:
            # https://picsum.photos/seed/<seed>/<w>/<h> -> img/<seed>.webp
            # o img/<seed>.jpg si ya estaba parcheado -> img/<seed>.webp
            text = re.sub(
                rf"https://picsum\.photos/seed/{re.escape(seed)}/\d+/\d+",
                f"img/{seed}.{ext}",
                text,
            )
            text = re.sub(
                rf"img/{re.escape(seed)}\.(jpg|webp)",
                f"img/{seed}.{ext}",
                text,
            )
        if text != orig:
            backup(index)
            index.write_text(text, encoding="utf-8")
            changed.append("index.html")
    return changed


def backup(path: Path):
    bak = path.with_suffix(path.suffix + ".bak")
    if not bak.exists():
        shutil.copy2(path, bak)


def main():
    ap = argparse.ArgumentParser(description="Alimenta las imágenes de webmundocancel.io")
    ap.add_argument("--check", action="store_true", help="Solo reporta qué falta, sin escribir nada")
    ap.add_argument("--dry-run", action="store_true", help="Muestra qué haría, sin escribir nada")
    ap.add_argument("--no-patch", action="store_true", help="Genera img/ pero no toca js/main.js ni index.html")
    ap.add_argument("--format", choices=["webp", "jpg"], default="webp",
                    help="Formato de salida en img/ (por defecto webp)")
    ap.add_argument("--quality", type=int, default=82, help="Calidad de salida (por defecto 82)")
    args = ap.parse_args()
    ext = args.format

    candidates = find_candidates()
    already = set()
    if IMG_DIR.exists():
        already = {p.stem for p in IMG_DIR.glob(f"*.{ext}")}
        # Avisa si hay archivos en el otro formato, para no dejar duplicados
        other_ext = "jpg" if ext == "webp" else "webp"
        other = {p.stem for p in IMG_DIR.glob(f"*.{other_ext}")}
        if other:
            print(f"Nota: hay {len(other)} archivo(s) en .{other_ext} en img/ que no se usarán con --format {ext}: {', '.join(sorted(other))}\n")

    print(f"Repo: {ROOT}  ·  formato de salida: .{ext}")
    print(f"incoming/: {len(candidates)} archivo(s) | img/: {len(already)} foto(s) ya guardada(s) en .{ext}\n")

    missing = [k for k in EXPECTED if k not in already]
    print(f"Faltan en img/: {len(missing)} de {len(EXPECTED)}")
    for k in missing:
        label, max_side, _ = EXPECTED[k]
        mark = "← en incoming" if k in candidates else ""
        print(f"  ✗ {k}.{ext}  ({label}) {mark}")
    print()

    unknown = sorted(set(candidates) - set(EXPECTED))
    if unknown:
        print("Archivos en incoming/ que no reconozco (revisa el nombre):")
        for k in unknown:
            print(f"  ? {candidates[k].name}  -> esperado algo como branding-aura-cafe.{ext}")
        print()

    if args.check:
        return 0

    to_process = {k: candidates[k] for k in EXPECTED if k in candidates}
    if not to_process:
        print("No hay nada nuevo que procesar. Pon las fotos en incoming/ y vuelve a correrlo.")
        return 0

    if args.dry_run:
        print("DRY RUN — procesaría:")
        for k in sorted(to_process):
            print(f"  • {to_process[k].name} -> img/{k}.{ext}")
        return 0

    IMG_DIR.mkdir(exist_ok=True)
    processed = set()
    for key in sorted(to_process):
        src = to_process[key]
        label, max_side, expected_ar = EXPECTED[key]
        dest = IMG_DIR / f"{key}.{ext}"
        # Borra la versión en el otro formato, si existía, para no duplicar
        other_ext = "jpg" if ext == "webp" else "webp"
        other_file = IMG_DIR / f"{key}.{other_ext}"
        if other_file.exists():
            other_file.unlink()
        before_kb = src.stat().st_size // 1024
        w, h, after_kb = optimize(src, dest, max_side, args.quality, ext)
        ar = w / h
        warn = ""
        if expected_ar and abs(ar - expected_ar) / expected_ar > 0.08:
            warn = f"  ⚠ proporción {w}x{h} ({ar:.2f}), se esperaba ~{expected_ar:.2f}; el CSS la recorta con object-fit:cover, revisa el encuadre"
        print(f"  ✓ {label}: {src.name} ({before_kb} KB) -> img/{key}.{ext} {w}x{h} ({after_kb} KB){warn}")
        processed.add(key)

    if not args.no_patch and processed:
        changed = patch_code(processed, ext)
        if changed:
            print(f"\nCódigo actualizado (respaldo .bak creado la primera vez): {', '.join(changed)}")
        else:
            print("\nEl código ya usaba rutas locales para esas fotos, no hubo nada que parchear.")
    elif args.no_patch:
        print("\n--no-patch: no toqué js/main.js ni index.html.")

    still_missing = [k for k in EXPECTED if k not in already and k not in processed]
    if still_missing:
        print(f"\nSiguen faltando {len(still_missing)}: {', '.join(still_missing)}")
    else:
        print(f"\n🎉 Listo: las {len(EXPECTED)} imágenes esperadas ya están en img/ como .{ext} y el sitio ya no depende de Picsum para la galería.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
