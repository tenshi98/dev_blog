---
title: Publicando con GitHub Pages
tags:
  - GitHub
  - Deploy
  - Hosting
---

# Publicando con GitHub Pages

GitHub Pages es un servicio de alojamiento estático gratuito que permite publicar sitios web directamente desde un repositorio de GitHub. Es la plataforma ideal para este blog.

## ¿Qué es GitHub Pages?

GitHub Pages sirve archivos estáticos (HTML, CSS, JavaScript) directamente desde un repositorio de GitHub. No hay servidor backend, base de datos ni proceso de compilación en el servidor.

### Características principales

- **Gratuito** para repositorios públicos
- **HTTPS** automático
- **Dominio personalizado** opcional
- **CI/CD automático** al hacer push
- **100% estático** — solo archivos

## Configuración paso a paso

### 1. Crear el repositorio

```bash
# Crear repositorio en GitHub
# Luego clonar localmente
git clone https://github.com/usuario/mi-blog.git
cd mi-blog
```

### 2. Subir los archivos del blog

```bash
# Copiar todos los archivos del proyecto
cp -r /ruta/al/blog/* .

# Hacer commit
git add .
git commit -m "Blog inicial"
git push origin main
```

### 3. Activar GitHub Pages

1. Ir a **Settings** → **Pages**
2. En **Source**, seleccionar la rama `main`
3. En **Folder**, seleccionar `/ (root)`
4. Click en **Save**

### 4. Acceder al blog

Tu blog estará disponible en:

```
https://usuario.github.io/mi-blog/
```

Si el repositorio se llama `usuario.github.io`, estará en:

```
https://usuario.github.io/
```

## Limitaciones

Es importante conocer las limitaciones de GitHub Pages:

| Aspecto | Limitación |
|---------|------------|
| Tamaño del repositorio | 1 GB recomendado |
| Ancho de banda | 100 GB/mes |
| Builds | 10 minutos máximo |
| Plugins Jekyll | Solo los permitidos |
| Backend | No disponible |
| Base de datos | No disponible |
| HTTP redirects | Limitados (`.nojekyll`) |

> **Importante:** El navegador no puede listar archivos de un directorio en GitHub Pages. Por eso este blog utiliza `post/posts.json` como índice de publicaciones.

## Agregar una nueva publicación

El flujo de trabajo es sencillo:

1. Crear el archivo Markdown: `post/20260901-mi-nuevo-post.md`
2. Agregar el nombre a `post/posts.json`
3. Hacer commit y push

```bash
git add post/20260901-mi-nuevo-post.md post/posts.json
git commit -m "Nueva publicación: Mi nuevo post"
git push origin main
```

GitHub Pages publicará automáticamente la nueva publicación en unos minutos.

## Dominio personalizado

Para usar un dominio propio:

1. Ir a **Settings** → **Pages** → **Custom domain**
2. Ingresar el dominio (ej: `blog.misitio.com`)
3. Configurar DNS en el proveedor del dominio:
   - Crear un registro **CNAME** apuntando a `usuario.github.io`
4. Marcar **Enforce HTTPS**

---

GitHub Pages es una solución elegante y gratuita para blogs estáticos. Combinado con Markdown y JavaScript, ofrece una experiencia de publicación simple y eficiente.
