# Blog Estático para GitHub Pages

Un blog estático, moderno, responsive y completamente funcional, diseñado específicamente para ser alojado en **GitHub Pages** sin necesidad de backend, frameworks ni procesos de compilación.

Publica tus artículos en Markdown, genera un índice JSON con un solo comando y despliega todo como sitio estático.

## Índice

* [Tecnologías utilizadas](#tecnologías-utilizadas)
* [Estructura del proyecto](#estructura-del-proyecto)
* [Cómo agregar una publicación](#cómo-agregar-una-publicación)
  * [Paso 1: Crear el archivo Markdown](#paso-1-crear-el-archivo-markdown)
  * [Paso 2: Escribir el contenido](#paso-2-escribir-el-contenido)
  * [Paso 3: Generar el índice](#paso-3-generar-el-índice)
  * [Paso 4: Publicar](#paso-4-publicar)
* [Formato de nombres de archivos](#formato-de-nombres-de-archivos)
* [Cómo agregar imágenes](#cómo-agregar-imágenes)
* [Cómo publicar en GitHub Pages](#cómo-publicar-en-github-pages)
  * [1. Crear el repositorio](#1-crear-el-repositorio)
  * [2. Subir los archivos](#2-subir-los-archivos)
  * [3. Configurar GitHub Pages](#3-configurar-github-pages)
  * [4. Acceder al blog](#4-acceder-al-blog)
* [Cómo personalizar el blog](#cómo-personalizar-el-blog)
  * [Cambiar el nombre del blog](#cambiar-el-nombre-del-blog)
  * [Cambiar colores](#cambiar-colores)
  * [Cambiar información personal](#cambiar-información-personal)
  * [Agregar Google Analytics](#agregar-google-analytics)
* [Funcionalidades](#funcionalidades)
* [Dependencia: Marked.js](#dependencia-markedjs)
  * [Usar versión local (recomendado para producción)](#usar-versión-local-recomendado-para-producción)
* [Script de generación del índice](#script-de-generación-del-índice)
* [Limitaciones](#limitaciones)
* [Compatibilidad con GitHub Pages](#compatibilidad-con-github-pages)
* [Licencia](#licencia)

## Tecnologías utilizadas

| Tecnología | Uso |
|-----------|-----|
| HTML5 | Estructura semántica y accesible |
| CSS3 | Estilos, diseño responsive, modo oscuro |
| JavaScript (ES Modules) | Interactividad, routing, búsqueda |
| Markdown | Formato de contenido de publicaciones |
| Marked.js | Interpretación de Markdown a HTML (CDN) |
| FontAwesome | Iconografía (CDN) |
| Python 3 | Script de generación del índice (`posts.json`) |

**No se utilizan:** React, Vue, Angular, Svelte, Astro, Next.js, Jekyll, Node.js, bases de datos, APIs backend, ni ningún framework o generador de sitios estáticos.

## Estructura del proyecto

```
/
├── index.html              # Página principal (SPA)
├── 404.html                # Página de error personalizada
├── robots.txt              # Instrucciones para crawlers
├── sitemap.xml             # Sitemap básico
├── README.md               # Este archivo
│
├── css/
│   ├── style.css           # Estilos principales y temas (claro/oscuro)
│   └── responsive.css      # Estilos responsive y media queries
│
├── js/
│   ├── config.js           # Configuración y ruta base (BASE_PATH)
│   ├── posts.js            # Gestión de publicaciones
│   ├── markdown.js         # Procesamiento de Markdown
│   ├── ui.js               # Interfaz y modo oscuro
│   └── app.js              # Aplicación principal y routing
│
├── scripts/
│   └── build_posts.py      # Genera post/posts.json a partir de los .md
│
├── post/                   # Publicaciones reales (.md + índice generado)
│   ├── posts.json          # Índice generado con metadatos y contenido (396 posts)
│   ├── 20190101-*.md       # Publicaciones desde 2019
│   └── 20261019-*.md       # Publicaciones más recientes
│
├── examples/               # Publicaciones de ejemplo y plantilla
│   ├── posts.json          # Índice de ejemplo (5 publicaciones)
│   ├── 20260810-mi-primer-post.md
│   ├── 20260815-aprendiendo-javascript.md
│   ├── 20260820-github-pages.md
│   ├── 20260825-markdown-en-un-blog.md
│   └── 20260901-crear-un-blog-estatico.md
│
├── assets/
│   └── favicon/            # Iconos del sitio (PNG, ICO, site.webmanifest)
│       ├── favicon.ico
│       ├── favicon-16x16.png
│       ├── favicon-32x32.png
│       ├── apple-touch-icon.png
│       ├── android-chrome-192x192.png
│       ├── android-chrome-512x512.png
│       └── site.webmanifest
│
└── change_logs/            # Registros de cambios del proyecto
```

> El directorio `post/` contiene las publicaciones reales del blog. El directorio `examples/` incluye 5 publicaciones de ejemplo más su `posts.json`, útiles como plantilla para entender el formato antes de crear las tuyas propias.

## Cómo agregar una publicación

### Paso 1: Crear el archivo Markdown

El nombre del archivo debe seguir el formato `YYYYMMDD-titulo-descriptivo.md` y guardarse en `post/`:

```
post/20260915-mi-nueva-publicacion.md
```

### Paso 2: Escribir el contenido

Puedes incluir Front Matter opcional y contenido Markdown:

```markdown
---
title: Mi nueva publicación
tags:
  - Etiqueta1
  - Etiqueta2
---

# Mi nueva publicación

Contenido de la publicación en Markdown...

## Un subtítulo

Más contenido...
```

Si no incluyes Front Matter, el título se extrae del primer `# Título` del archivo.

Puedes consultar cualquiera de los archivos en `examples/` para ver el formato en uso.

### Paso 3: Generar el índice

No edites `post/posts.json` a mano. Ejecuta el script desde la raíz del proyecto:

```bash
python3 scripts/build_posts.py
```

El script lee todos los `.md` de `post/`, extrae `title`, `description`, `tags`, la fecha del nombre y el contenido, y regenera el índice:

```json
{
  "version": 1,
  "posts": [
    {
      "filename": "20260915-mi-nueva-publicacion.md",
      "title": "Mi nueva publicación",
      "excerpt": "Primer párrafo de la publicación…",
      "tags": ["Etiqueta1", "Etiqueta2"],
      "date": "2026-09-15",
      "content": "Contenido Markdown sin frontmatter"
    }
  ]
}
```

Ventajas:

- La página carga **un solo JSON** con todos los metadatos, en vez de descargar los cientos de Markdown uno por uno.
- La búsqueda por contenido sigue funcionando gracias al campo `content`.
- El formato incluye `version` para poder migrar el esquema en el futuro.

Vuelve a ejecutar el script cada vez que agregues, edites o elimines una publicación.

### Paso 4: Publicar

```bash
git add post/20260915-mi-nueva-publicacion.md post/posts.json
git commit -m "Nueva publicación: Mi nueva publicación"
git push
```

GitHub Pages publicará automáticamente la nueva publicación.

## Formato de nombres de archivos

**Obligatorio:** El nombre debe comenzar con la fecha en formato `YYYYMMDD`:

```
✅ 20260901-mi-post.md
✅ 20260815-aprendiendo-js.md
❌ mi-post.md              (sin fecha)
❌ 2026-09-01-mi-post.md   (formato incorrecto)
❌ 09-01-mi-post.md        (fecha incompleta)
```

La fecha del nombre se usa como **fecha principal de publicación** y determina el ordenamiento (más recientes primero).

## Cómo agregar imágenes

1. Colocar la imagen en una carpeta de recursos, por ejemplo `assets/images/` (crearla si no existe):

```
assets/images/mi-imagen.jpg
```

2. Referenciarla en el Markdown con ruta relativa:

```markdown
![Descripción de la imagen](../assets/images/mi-imagen.jpg)
```

> **Importante:** Usar rutas relativas (`../assets/images/`) en lugar de absolutas (`/assets/images/`). Esto asegura que las imágenes funcionen correctamente tanto si el blog se publica en `https://usuario.github.io/` como en `https://usuario.github.io/repositorio/`.

## Cómo publicar en GitHub Pages

### 1. Crear el repositorio

```bash
# En GitHub, crear un nuevo repositorio
# Luego clonar localmente
git clone https://github.com/usuario/mi-blog.git
cd mi-blog
```

### 2. Subir los archivos

```bash
# Copiar todo el contenido del proyecto
cp -r /ruta/al/blog/* .

# Commit inicial
git add .
git commit -m "Blog inicial"
git push origin main
```

### 3. Configurar GitHub Pages

1. Ir al repositorio en GitHub
2. **Settings** → **Pages**
3. En *Build and deployment* → *Source*, seleccionar **Deploy from a branch**
4. Elegir la rama `main` y la carpeta `/ (root)`
5. Guardar. GitHub Pages desplegará el sitio automáticamente

### 4. Acceder al blog

El blog estará disponible en:

- `https://usuario.github.io/` (si el repositorio es `usuario.github.io`)
- `https://usuario.github.io/mi-blog/` (en cualquier otro repositorio)

## Cómo personalizar el blog

### Cambiar el nombre del blog

Editar `js/config.js`:

```javascript
export const BLOG_CONFIG = {
  name: 'Mi Blog Personal',
  nameBlog: 'Mi Blog Personal',
  title: 'Tu Nombre',
  titleBar: 'Mi Blog',
  description: 'Una descripción personalizada de mi blog.',
  author: 'Tu Nombre',
  // ...
};
```

### Cambiar colores

Editar las variables CSS en `css/style.css`:

```css
:root {
  --accent: #ea4a4c;        /* Color principal */
  --accent-hover: #f56565;  /* Color principal al hover */
  /* ... */
}

[data-theme="dark"] {
  --accent: #758694;        /* Color principal en modo oscuro */
  /* ... */
}
```

### Cambiar información personal

Editar la sección "Sobre mí" en `index.html` y el campo `author` en `js/config.js`. Los enlaces de redes sociales están en el `<footer>` de `index.html`.

### Agregar Google Analytics

Agregar antes de `</head>` en `index.html`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXX');
</script>
```

## Funcionalidades

- ✅ Publicaciones en Markdown con Front Matter
- ✅ Ordenamiento por fecha (más recientes / más antiguas)
- ✅ Buscador de publicaciones (títulos, contenido, etiquetas)
- ✅ Filtro por etiquetas
- ✅ Modo oscuro / modo claro con detección de preferencia
- ✅ Diseño responsive (desktop, tablet, móvil)
- ✅ Navegación SPA con history.pushState
- ✅ SEO básico (meta tags, Open Graph, canonical)
- ✅ Accesibilidad (HTML semántico, aria labels, skip link, focus visible)
- ✅ Sanitización de HTML (elimina scripts, eventos inline)
- ✅ Manejo de errores con mensajes claros
- ✅ Favicon multiplataforma (PNG, ICO, webmanifest)
- ✅ Compatible con GitHub Pages (raíz y subdirectorio)
- ✅ Sin backend, sin compilación, sin dependencias de servidor

## Dependencia: Marked.js

Este blog utiliza **Marked.js v15.0.12** vía CDN para convertir Markdown a HTML:

```html
<script src="https://cdn.jsdelivr.net/npm/marked@15.0.12/marked.min.js"></script>
```

### Usar versión local (recomendado para producción)

1. Descargar desde: https://cdn.jsdelivr.net/npm/marked@15.0.12/marked.min.js
2. Guardar como `vendor/marked.min.js`
3. Cambiar en `index.html`:

```html
<!-- Reemplazar CDN por archivo local -->
<script src="vendor/marked.min.js"></script>
```

## Script de generación del índice

`scripts/build_posts.py` recorre el directorio `post/`, lee cada archivo `.md`, extrae Front Matter y contenido, y genera `post/posts.json`.

Ejecutar siempre que se añada, modifique o elimine una publicación:

```bash
python3 scripts/build_posts.py
```

El script valida que el nombre del archivo tenga formato `YYYYMMDD-titulo.md`, ordena los posts por fecha (descendente) y escribe el JSON con codificación UTF-8.

## Limitaciones

| Limitación | Explicación |
|-----------|------------|
| Índice generado | Hay que ejecutar `python3 scripts/build_posts.py` al agregar o modificar publicaciones |
| URLs dinámicas | Las publicaciones usan `?post=archivo.md`, crawlers pueden no indexarlas todas |
| Sin comentarios | No hay sistema de comentarios (podría agregarse Disqus/u otro) |
| Sin búsqueda server-side | La búsqueda carga todo el contenido en el cliente |
| Sin RSS/Atom autogenerado | Podría generarse con un GitHub Action |
| Marked.js vía CDN | Depende de disponibilidad del CDN (solucionable con copia local) |

## Compatibilidad con GitHub Pages

El blog funciona correctamente tanto si se publica en:

- `https://usuario.github.io/` (raíz)
- `https://usuario.github.io/repositorio/` (subdirectorio)

Para lograrlo:

- Se usan **rutas relativas** para CSS, JS, imágenes y Markdown
- Se detecta la **ruta base** automáticamente en `js/config.js`
- No se asume que `/` es la raíz del proyecto
- Las URLs de navegación usan **query parameters** (`?post=...`)

## Licencia

Este proyecto está disponible como código abierto. Siéntete libre de usarlo, modificarlo y distribuirlo.
