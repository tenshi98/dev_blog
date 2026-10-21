/**
 * markdown.js - Procesamiento de Markdown
 *
 * - Cargar archivos Markdown
 * - Procesar Front Matter (YAML simple)
 * - Convertir Markdown a HTML con Marked.js
 * - Extraer título y extracto
 * - Configurar Marked.js de forma segura
 */

import { BLOG_CONFIG } from './config.js';

/**
 * Configura Marked.js con opciones seguras
 * Evita la ejecución de HTML/scripts no deseados
 */
export function configureMarked() {
  if (typeof marked === 'undefined') {
    console.error('Marked.js no está cargado. Asegúrate de incluir el script antes de los módulos.');
    return;
  }

  // Configurar opciones básicas
  marked.setOptions({
    gfm: true,
    breaks: false,
    pedantic: false,
  });

  // Usar marked.use() con hooks para sanitizar URLs peligrosas
  try {
    // Intentar usar la API de extensiones de marked
    marked.use({
      walkTokens(token) {
        // Sanitizar URLs en tokens de enlace e imagen
        if (token.type === 'link' || token.type === 'image') {
          if (token.href && isDangerousUrl(token.href)) {
            token.href = '#';
          }
        }
      }
    });
  } catch (error) {
    console.warn('No se pudo configurar walkTokens en Marked.js:', error);
    // La sanitización HTML posterior se encargará de la mayoría de casos
  }
}

/**
 * Verifica si una URL es potencialmente peligrosa
 * @param {string} url
 * @returns {boolean}
 */
function isDangerousUrl(url) {
  if (!url) return false;
  const trimmed = url.trim().toLowerCase();
  return trimmed.startsWith('javascript:') ||
         trimmed.startsWith('data:text/html') ||
         trimmed.startsWith('vbscript:');
}

/**
 * Carga un archivo Markdown
 * @param {string} filename - Nombre del archivo (ej: 20260810-mi-post.md)
 * @returns {Promise<string>} Contenido del archivo Markdown
 */
export async function loadMarkdown(filename) {
  try {
    const path = BLOG_CONFIG.postsDir + filename;
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: No se pudo cargar ${path}`);
    }
    return await response.text();
  } catch (error) {
    console.error(`Error al cargar ${filename}:`, error);
    throw new Error(`No se pudo cargar la publicación "${filename}". Verifica que el archivo exista dentro de la carpeta /post/.`);
  }
}

/**
 * Procesa el Front Matter (YAML simple) de un archivo Markdown
 * Extrae metadatos entre los separadores ---
 * @param {string} content - Contenido completo del archivo Markdown
 * @returns {{ metadata: Object, body: string }}
 */
export function parseFrontMatter(content) {
  const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
  const match = content.match(frontMatterRegex);

  if (!match) {
    return { metadata: {}, body: content };
  }

  const frontMatterStr = match[1];
  const body = content.slice(match[0].length);
  const metadata = {};

  // Parsear YAML simple (soporte básico)
  let currentKey = null;
  const lines = frontMatterStr.split('\n');

  for (const line of lines) {
    // Propiedad simple: key: value
    const simpleMatch = line.match(/^(\w[\w-]*):\s*(.+)$/);
    if (simpleMatch) {
      currentKey = simpleMatch[1];
      metadata[currentKey] = simpleMatch[2].trim();
      continue;
    }

    // Propiedad vacía (para listas): key:
    const listStartMatch = line.match(/^(\w[\w-]*):\s*$/);
    if (listStartMatch) {
      currentKey = listStartMatch[1];
      metadata[currentKey] = [];
      continue;
    }

    // Elemento de lista: - value
    const listItemMatch = line.match(/^\s+-\s+(.+)$/);
    if (listItemMatch && currentKey && Array.isArray(metadata[currentKey])) {
      metadata[currentKey].push(listItemMatch[1].trim());
      continue;
    }
  }

  return { metadata, body };
}

/**
 * Convierte Markdown a HTML usando Marked.js
 * Sanitiza HTML peligroso antes de insertarlo en el DOM
 * @param {string} markdown - Contenido Markdown
 * @returns {string} HTML generado
 */
export function renderMarkdown(markdown) {
  if (typeof marked === 'undefined') {
    console.error('Marked.js no está disponible');
    return '<p>Error: No se pudo procesar el contenido Markdown.</p>';
  }

  try {
    const html = marked.parse(markdown);
    return sanitizeHtml(html);
  } catch (error) {
    console.error('Error al procesar Markdown:', error);
    return '<p>Error: No se pudo procesar el contenido Markdown correctamente.</p>';
  }
}

/**
 * Sanitización básica de HTML
 * Elimina tags script y eventos inline peligrosos
 * @param {string} html
 * @returns {string}
 */
function sanitizeHtml(html) {
  // Eliminar tags <script> y su contenido
  let sanitized = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

  // Eliminar atributos de evento inline (on*)
  sanitized = sanitized.replace(/\s+on\w+\s*=\s*["'][^"']*["']/gi, '');
  sanitized = sanitized.replace(/\s+on\w+\s*=\s*[^\s>]+/gi, '');

  // Eliminar <iframe>, <object>, <embed>
  sanitized = sanitized.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '');
  sanitized = sanitized.replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '');
  sanitized = sanitized.replace(/<embed\b[^>]*>/gi, '');

  return sanitized;
}

/**
 * Extrae el título del primer h1 del HTML
 * @param {string} html - HTML renderizado
 * @returns {string|null}
 */
export function extractTitle(html) {
  const match = html.match(/<h1[^>]*>(.*?)<\/h1>/);
  if (match) {
    // Eliminar tags HTML internos del título
    return match[1].replace(/<[^>]+>/g, '').trim();
  }
  return null;
}

/**
 * Extrae un extracto del contenido HTML
 * Toma el primer párrafo significativo
 * @param {string} html - HTML renderizado
 * @param {number} [maxLength] - Longitud máxima del extracto
 * @returns {string}
 */
export function extractExcerpt(html, maxLength = BLOG_CONFIG.excerptLength) {
  // Intentar obtener el primer párrafo
  const paragraphs = html.match(/<p[^>]*>(.*?)<\/p>/gs);

  if (paragraphs && paragraphs.length > 0) {
    // Tomar el texto del primer párrafo, eliminando HTML
    let text = paragraphs[0].replace(/<[^>]+>/g, '').trim();
    if (text.length > maxLength) {
      text = text.substring(0, maxLength).trim() + '…';
    }
    return text;
  }

  // Si no hay párrafos, tomar texto plano
  let text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  if (text.length > maxLength) {
    text = text.substring(0, maxLength).trim() + '…';
  }
  return text;
}

/**
 * Procesa completamente un archivo Markdown
 * Extrae front matter, renderiza HTML, obtiene título y extracto
 * @param {string} rawContent - Contenido del archivo .md
 * @returns {{ metadata: Object, html: string, title: string, excerpt: string, content: string }}
 */
export function processPost(rawContent) {
  const { metadata, body } = parseFrontMatter(rawContent);
  const html = renderMarkdown(body);
  const title = metadata.title || extractTitle(html) || 'Sin título';
  const excerpt = metadata.description || extractExcerpt(html);
  const tags = metadata.tags || [];

  return {
    metadata,
    html,
    title,
    excerpt,
    tags,
    content: body, // Contenido markdown sin front matter
  };
}
