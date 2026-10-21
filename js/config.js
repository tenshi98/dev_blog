/**
 * config.js - Configuración global del blog
 *
 * Determina la ruta base para funcionar tanto en
 * https://usuario.github.io/ como en
 * https://usuario.github.io/repositorio/
 */

// Detectar ruta base a partir de la URL actual
function detectBasePath() {
  const path = window.location.pathname;
  // Eliminar index.html si está presente
  let basePath = path.replace(/\/index\.html$/, '');
  // Asegurar que termine con /
  if (!basePath.endsWith('/')) {
    basePath += '/';
  }
  return basePath;
}

export const BASE_PATH = detectBasePath();

// Configuración del blog (personalizable)
export const BLOG_CONFIG = {
  name: 'Dev Blog | Víctor Reyes',
  nameBlog: 'Dev Blog | Víctor Reyes',
  title: 'Víctor Reyes',
  titleBar: 'Dev Blog',
  description: 'Un Dev Blog orientado al desarrollo de software, diseñado para compartir conocimientos técnicos, documentar proyectos y publicar soluciones, experiencias y buenas prácticas de desarrollo.',
  author: 'Víctor Reyes',
  language: 'es',
  homePostsLimit: 10,
  cardTagsLimit: 5,
  tagsFilterLimit: 12,
  postsPerPage: 25,
  excerptLength: 200,
  postsDir: 'post/',
  postsIndexFile: 'post/posts.json',
};

// Generar URL completa para un recurso relativo
export function url(path) {
  // Si el path ya es absoluto (http/https), devolverlo tal cual
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  // Para recursos relativos al proyecto, no necesitamos BASE_PATH
  // ya que fetch() resuelve rutas relativas correctamente
  return path;
}

// Obtener URL canónica de la página actual
export function getCanonicalUrl() {
  return window.location.origin + window.location.pathname + window.location.search;
}
