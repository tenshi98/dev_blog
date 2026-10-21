---
title: Cómo crear un blog estático sin frameworks
tags:
  - Tutorial
  - Blog
  - HTML
  - CSS
  - JavaScript
---

# Cómo crear un blog estático sin frameworks

En este tutorial explicamos la arquitectura y decisiones de diseño detrás de este blog, demostrando que es posible crear un sitio web moderno y funcional sin frameworks ni herramientas de compilación.

## Filosofía del proyecto

La filosofía es simple:

> **Simplicidad + compatibilidad con GitHub Pages + ausencia total de backend.**

No introducimos tecnologías adicionales para facilitar el desarrollo. Si algo no se puede implementar con HTML + CSS + JavaScript + Markdown, documentamos la limitación.

## Arquitectura

### Estructura de archivos

```
/
├── index.html          # Página principal (SPA)
├── 404.html            # Página de error
├── css/
│   ├── style.css       # Estilos principales
│   └── responsive.css  # Estilos responsive
├── js/
│   ├── config.js       # Configuración
│   ├── posts.js        # Gestión de posts
│   ├── markdown.js     # Procesamiento Markdown
│   ├── ui.js           # Interfaz de usuario
│   └── app.js          # Aplicación principal
├── post/
│   ├── posts.json      # Índice de publicaciones
│   └── *.md            # Publicaciones en Markdown
└── assets/
    └── favicon.svg     # Favicon
```

### Flujo de datos

```javascript
// 1. Cargar índice
const postFiles = await fetch('post/posts.json').then(r => r.json());

// 2. Cargar cada post
const content = await fetch('post/20260901-mi-post.md').then(r => r.text());

// 3. Procesar con Marked.js
const html = marked.parse(markdown);

// 4. Mostrar en el DOM
document.getElementById('content').innerHTML = html;
```

## Sistema de publicaciones

### El problema del descubrimiento

GitHub Pages no permite listar archivos de un directorio. La solución es `posts.json`:

```json
[
  "20260901-mi-nuevo-post.md",
  "20260820-github-pages.md"
]
```

### Fechas en nombres de archivo

El formato `YYYYMMDD-titulo.md` permite:

- Ordenar cronológicamente sin metadatos
- Extraer la fecha sin abrir el archivo
- Mantener un orden natural en el sistema de archivos

```javascript
function parseDate(filename) {
  const match = filename.match(/^(\d{4})(\d{2})(\d{2})-/);
  return new Date(
    parseInt(match[1]),
    parseInt(match[2]) - 1,
    parseInt(match[3])
  );
}
```

## Routing como SPA

Usamos query parameters para navegar sin recargar:

```
?post=20260820-github-pages.md   → Ver publicación
?nav=about                       → Ver "Sobre mí"
?                                → Inicio
```

Esto funciona correctamente con:

- `history.pushState()` para cambiar la URL
- `popstate` para el botón "Atrás"
- Sin necesidad de un router externo

## Modo oscuro

Implementado con CSS custom properties y JavaScript:

```css
:root { --bg-primary: #ffffff; }
[data-theme="dark"] { --bg-primary: #1a1a1c; }
```

```javascript
// Detectar preferencia
const prefersDark = matchMedia('(prefers-color-scheme: dark)').matches;

// Guardar preferencia
localStorage.setItem('theme', 'dark');
```

## Seguridad

Marked.js se configura para evitar ejecución de scripts no deseados:

- Se eliminan tags `<script>` del HTML generado
- Se eliminan atributos de evento inline (`onclick`, etc.)
- Se validan URLs en enlaces (no `javascript:` protocol)
- Se eliminan `<iframe>`, `<object>`, `<embed>`

## Rendimiento

- **Carga diferida** — las publicaciones se cargan solo cuando se necesitan
- **Caché en memoria** — el contenido cargado se almacena para evitar peticiones duplicadas
- **Sin frameworks** — no hay overhead de React, Vue, etc.
- **CSS custom properties** — transiciones de tema sin JavaScript costoso
- **Debounce en búsqueda** — evita renderizados excesivos

## Limitaciones documentadas

| Limitación | Solución |
|-----------|----------|
| No se pueden listar archivos del servidor | `posts.json` como índice manual |
| URLs dinámicas no indexables por crawlers | Documentado en sitemap.xml |
| Sin comentarios | Servicio externo (Disqus, etc.) |
| Sin analíticas | Google Analytics o Plausible |
| Sin búsqueda full-text | Búsqueda client-side en contenido cargado |

---

Crear un blog estático sin frameworks no solo es posible, sino que resulta en un sitio más rápido, más simple y más fácil de mantener. La clave está en aprovechar las capacidades nativas del navegador.
