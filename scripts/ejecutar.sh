#!/usr/bin/env bash
set -e

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
POST_DIR="$ROOT/post"
BUILD_SCRIPT="$ROOT/scripts/build_posts.py"

if [ ! -d "$POST_DIR" ]; then
    echo "Error: no existe el directorio post/ en $ROOT"
    exit 1
fi

shopt -s nullglob
md_files=("$POST_DIR"/*.md)

if [ ${#md_files[@]} -eq 0 ]; then
    echo "No se encontraron archivos .md en post/. No hay nada que procesar."
    exit 0
fi

echo "Se encontraron ${#md_files[@]} archivos .md en post/."
echo "Ejecutando build_posts.py para generar post/posts.json..."

python3 "$BUILD_SCRIPT"

echo "Proceso completado: post/posts.json fue actualizado."
