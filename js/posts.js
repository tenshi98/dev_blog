/**
 * posts.js - Gestión de publicaciones
 *
 * - Cargar posts.json (índice con metadatos)
 * - Extraer fechas de nombres de archivo
 * - Ordenar publicaciones
 * - Buscar publicaciones
 * - Recopilar etiquetas
 */

import { BLOG_CONFIG } from './config.js';

/**
 * Carga el índice de publicaciones desde posts.json
 * Acepta el formato actual { version, posts } y el antiguo array de nombres
 * @returns {Promise<Array<Object|string>>} Entradas del índice
 */
export async function loadPostIndex() {
  try {
    const response = await fetch(BLOG_CONFIG.postsIndexFile);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: No se pudo cargar ${BLOG_CONFIG.postsIndexFile}`);
    }
    const data = await response.json();
    const posts = Array.isArray(data) ? data : data && data.posts;
    if (!Array.isArray(posts)) {
      throw new Error('El archivo posts.json no contiene un índice válido');
    }
    return posts;
  } catch (error) {
    console.error('Error al cargar el índice de publicaciones:', error);
    throw new Error('No se pudo cargar el índice de publicaciones. Verifica que el archivo posts.json exista en la carpeta /post/.');
  }
}

/**
 * Extrae la fecha del nombre del archivo
 * Formato esperado: YYYYMMDD-titulo.md
 * @param {string} filename - Nombre del archivo
 * @returns {Date|null} Fecha de publicación
 */
export function parseDateFromFilename(filename) {
  const match = filename.match(/^(\d{4})(\d{2})(\d{2})-/);
  if (!match) {
    console.warn(`No se pudo extraer la fecha del archivo: ${filename}`);
    return null;
  }
  const year = parseInt(match[1], 10);
  const month = parseInt(match[2], 10) - 1; // Meses son 0-indexed en JS
  const day = parseInt(match[3], 10);
  return new Date(year, month, day);
}

/**
 * Formatea una fecha como YYYY-MM-DD
 * @param {Date} date
 * @returns {string}
 */
export function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Formatea una fecha en formato legible en español
 * @param {Date} date
 * @returns {string}
 */
export function formatDateLong(date) {
  const months = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  ];
  return `${date.getDate()} de ${months[date.getMonth()]} de ${date.getFullYear()}`;
}

/**
 * Genera un slug a partir del nombre del archivo
 * Elimina la fecha y la extensión
 * @param {string} filename
 * @returns {string}
 */
export function slugFromFilename(filename) {
  return filename
    .replace(/^\d{8}-/, '')
    .replace(/\.md$/, '');
}

/**
 * Ordena publicaciones por fecha
 * @param {string[]} posts - Lista de nombres de archivo
 * @param {'newest'|'oldest'} order - Ordenamiento
 * @returns {string[]} Lista ordenada
 */
export function sortPosts(posts, order = 'newest') {
  return [...posts].sort((a, b) => {
    const dateA = parseDateFromFilename(a);
    const dateB = parseDateFromFilename(b);

    if (!dateA && !dateB) return 0;
    if (!dateA) return 1;
    if (!dateB) return -1;

    const diff = dateA.getTime() - dateB.getTime();
    return order === 'newest' ? -diff : diff;
  });
}

/**
 * Busca publicaciones que coincidan con un término de búsqueda
 * Busca en títulos, extractos y contenido
 * @param {Object[]} postsData - Datos de publicaciones con {filename, title, excerpt, content, tags}
 * @param {string} query - Término de búsqueda
 * @returns {Object[]} Publicaciones que coinciden
 */
export function searchPosts(postsData, query) {
  if (!query || query.trim() === '') {
    return postsData;
  }

  const terms = query.toLowerCase().trim().split(/\s+/).filter(t => t.length > 0);

  return postsData.filter(post => {
    const searchableText = [
      post.title || '',
      post.excerpt || '',
      post.content || '',
      ...(post.tags || [])
    ].join(' ').toLowerCase();

    return terms.every(term => searchableText.includes(term));
  });
}

/**
 * Filtra publicaciones por etiqueta
 * @param {Object[]} postsData
 * @param {string} tag
 * @returns {Object[]}
 */
export function filterByTag(postsData, tag) {
  if (!tag) return postsData;
  return postsData.filter(post =>
    post.tags && post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  );
}

/**
 * Recopila todas las etiquetas únicas de las publicaciones
 * @param {Object[]} postsData
 * @returns {string[]}
 */
export function collectTags(postsData) {
  const tagCounts = new Map();
  postsData.forEach(post => {
    if (post.tags) {
      post.tags.forEach(tag => {
        tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
      });
    }
  });
  return Array.from(tagCounts.entries())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([tag]) => tag);
}
