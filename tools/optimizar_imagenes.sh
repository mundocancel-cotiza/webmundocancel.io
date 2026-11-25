#!/bin/bash
# ==========================================
# OPTIMIZACIÓN DE IMÁGENES - MUNDO CANCEL
# Adaptado para este sitio (2026-11-25)
# ==========================================
# Cambios respecto al script original:
#  - Salida en img/ (antes assets/images/, que el sitio no usa)
#  - Lee las fotos de incoming/ (antes, de la carpeta actual)
#  - Acepta .webp además de .jpg/.jpeg/.png
#  - Solo optimiza: NO actualiza el código del sitio.
#    Para eso sigue siendo mejor tools/feed-images.py,
#    que valida los nombres y parchea js/config.js.
#
# Uso (desde la raíz del repo):
#   1. Pon tus fotos en incoming/
#   2. bash tools/optimizar_imagenes.sh
#   3. Las optimizadas quedan en img/*.webp
# Requiere ImageMagick: en Mac, brew install imagemagick

set -u
cd "$(dirname "$0")/.." || exit 1

# 1. Verificar si ImageMagick está instalado
if ! command -v magick &> /dev/null && ! command -v convert &> /dev/null; then
    echo "❌ Error: ImageMagick no está instalado."
    echo "En Mac instálalo con: brew install imagemagick"
    echo "En Linux (Ubuntu/Debian): sudo apt install imagemagick"
    exit 1
fi

# Detectar el comando correcto (v6 usa 'convert', v7 usa 'magick')
if command -v magick &> /dev/null; then
    IM_CMD="magick"
else
    IM_CMD="convert"
fi

# 2. Crear carpeta de salida (la que usa el sitio)
OUTPUT_DIR="img"
INPUT_DIR="incoming"
mkdir -p "$OUTPUT_DIR"
echo "📁 Fotos de: $INPUT_DIR/  ->  optimizadas en: $OUTPUT_DIR/"
echo "----------------------------------------"

# 3. Procesar las imágenes de incoming/
# (Busca .jpg, .jpeg, .png y .webp, en minúsculas o mayúsculas)
shopt -s nullglob nocaseglob
count=0
for img in "$INPUT_DIR"/*.jpg "$INPUT_DIR"/*.jpeg "$INPUT_DIR"/*.png "$INPUT_DIR"/*.webp; do
    [ -e "$img" ] || continue

    # Obtener el nombre sin extensión
    filename=$(basename -- "$img")
    filename="${filename%.*}"

    # Convertir a minúsculas y reemplazar espacios por guiones
    filename=$(echo "$filename" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')

    echo "Procesando: $img -> $OUTPUT_DIR/$filename.webp"

    # Comando de ImageMagick:
    # -resize "1200x1200>" : Reduce a máximo 1200px (solo si es más grande)
    # -strip : Elimina metadatos (GPS, cámara) para ahorrar peso
    # -quality 80 : Buena calidad, peso reducido
    $IM_CMD "$img" \
        -resize "1200x1200>" \
        -strip \
        -quality 80 \
        "$OUTPUT_DIR/$filename.webp"
    count=$((count + 1))
done
shopt -u nullglob nocaseglob

echo "----------------------------------------"
echo "✅ Proceso terminado: $count imagen(es) lista(s) en $OUTPUT_DIR/"
echo "Recuerda: este script no actualiza js/config.js; para eso usa tools/feed-images.py"
