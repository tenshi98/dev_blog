/**
 * ui.js - Interfaz de usuario
 *
 * - Renderizar lista de publicaciones
 * - Renderizar artículo completo
 * - Mostrar errores
 * - Controlar modo oscuro
 * - Actualizar metadatos SEO/OG
 * - Navegación entre secciones
 */

import { BLOG_CONFIG, getCanonicalUrl } from './config.js';
import { formatDateLong, slugFromFilename, parseDateFromFilename } from './posts.js';

// Referencias a elementos del DOM
let elements = {};

/**
 * Inicializa las referencias a elementos del DOM
 */
export function initElements() {
  elements = {
    mainContent: document.getElementById('main-content'),
    homeSection: document.getElementById('home-section'),
    postSection: document.getElementById('post-section'),
    aboutSection: document.getElementById('about-section'),
    postsList: document.getElementById('posts-list'),
    listFooter: document.getElementById('list-footer'),
    postContent: document.getElementById('post-content'),
    searchInput: document.getElementById('search-input'),
    sortSelect: document.getElementById('sort-select'),
    themeToggle: document.getElementById('theme-toggle'),
    mobileMenuBtn: document.getElementById('mobile-menu-btn'),
    navLinks: document.getElementById('nav-links'),
    navBrand: document.getElementById('nav-brand'),
    tagsFilter: document.getElementById('tags-filter'),
    blogTitle: document.getElementById('blog-title'),
    blogDescription: document.getElementById('blog-description'),
  };

  return elements;
}

/**
 * Obtiene las referencias a elementos del DOM
 */
export function getElements() {
  return elements;
}

// ============================================
//  Navegación entre secciones
// ============================================

/**
 * Muestra una sección y oculta las demás
 * @param {'home'|'post'|'about'} section
 * @param {string} [navKey] - Clave del enlace de navegación a resaltar
 */
export function showSection(section, navKey = section) {
  const sections = ['home-section', 'post-section', 'about-section'];
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.classList.toggle('active', id === `${section}-section`);
    }
  });

  // Actualizar enlace activo en la navegación
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    const nav = link.getAttribute('data-nav');
    link.classList.toggle('active', nav === navKey);
  });

  // Scroll al inicio
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================
//  Renderizado de publicaciones
// ============================================

/**
 * Renderiza la lista de publicaciones (tarjetas)
 * @param {Object[]} posts - Array de objetos {filename, title, excerpt, date, tags}
 */
export function renderPostList(posts) {
  const container = elements.postsList;
  if (!container) return;

  if (posts.length === 0) {
    container.innerHTML = `
      <div class="no-results" role="status">
        <p>No se encontraron publicaciones.</p>
        <p>Intenta con otros términos de búsqueda.</p>
      </div>
    `;
    return;
  }

  const html = posts.map(post => {
    const date = post.date ? formatDateLong(post.date) : '';
    const tagLimit = BLOG_CONFIG.cardTagsLimit;
    const visibleTags = post.tags ? post.tags.slice(0, tagLimit) : [];
    const extraTags = post.tags ? post.tags.slice(tagLimit) : [];

    let tagsHtml = '';
    if (post.tags && post.tags.length > 0) {
      const visibleHtml = visibleTags.map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('');
      const extraHtml = extraTags.length > 0
        ? `<div class="post-card-tags-extra" hidden>${extraTags.map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('')}</div>
           <button type="button" class="tag tag-toggle" data-tags-toggle data-count="${extraTags.length}" aria-expanded="false" aria-label="Mostrar ${extraTags.length} etiquetas más">+${extraTags.length}</button>`
        : '';
      tagsHtml = `<div class="post-card-tags">${visibleHtml}${extraHtml}</div>`;
    }

    return `
      <article class="post-card" role="article">
        <time class="post-card-date" datetime="${post.date ? post.date.toISOString().split('T')[0] : ''}">${escapeHtml(date)}</time>
        <h2 class="post-card-title">
          <a href="?post=${encodeURIComponent(post.filename)}" data-post="${escapeHtml(post.filename)}" aria-label="Leer: ${escapeHtml(post.title)}">${escapeHtml(post.title)}</a>
        </h2>
        ${tagsHtml}
        <p class="post-card-excerpt">${escapeHtml(post.excerpt)}</p>
        <a href="?post=${encodeURIComponent(post.filename)}" class="post-card-link" data-post="${escapeHtml(post.filename)}" aria-label="Leer publicación completa: ${escapeHtml(post.title)}">Leer publicación</a>
      </article>
    `;
  }).join('');

  container.innerHTML = html;
}

/**
 * Renderiza el filtro de etiquetas
 * @param {string[]} tags - Lista de etiquetas únicas
 * @param {string|null} activeTag - Etiqueta activa
 */
export function renderTagsFilter(tags, activeTag = null) {
  const container = elements.tagsFilter;
  if (!container) return;

  if (tags.length === 0) {
    container.innerHTML = '';
    return;
  }

  const activeLower = activeTag ? activeTag.toLowerCase() : null;
  let visibleTags = tags.slice(0, BLOG_CONFIG.tagsFilterLimit);

  if (activeLower && !visibleTags.some(tag => tag.toLowerCase() === activeLower)) {
    const active = tags.find(tag => tag.toLowerCase() === activeLower);
    if (active) visibleTags = visibleTags.concat(active);
  }

  const hiddenTags = tags.filter(tag => !visibleTags.includes(tag));

  const renderButton = tag => {
    const isActive = activeLower && tag.toLowerCase() === activeLower;
    return `<button class="tag-filter-btn ${isActive ? 'active' : ''}" data-tag="${escapeHtml(tag)}" aria-label="Filtrar por ${escapeHtml(tag)}">${escapeHtml(tag)}</button>`;
  };

  let html = '<span class="tags-filter-label">Etiquetas:</span>';
  html += `<button class="tag-filter-btn ${!activeTag ? 'active' : ''}" data-tag="" aria-label="Todas las publicaciones">Todas</button>`;
  html += visibleTags.map(renderButton).join('');

  if (hiddenTags.length > 0) {
    html += `<div class="tags-filter-extra" hidden>${hiddenTags.map(renderButton).join('')}</div>`;
    html += `<button type="button" class="tag-filter-btn tag-filter-toggle" data-tags-filter-toggle data-count="${hiddenTags.length}" aria-expanded="false" aria-label="Mostrar ${hiddenTags.length} etiquetas más">+${hiddenTags.length}</button>`;
  }

  container.innerHTML = html;
}

// ============================================
//  Pie del listado (CTA y paginación)
// ============================================

/**
 * Renderiza el pie del listado según la vista activa
 * - Inicio: enlace a todas las publicaciones
 * - Publicaciones: controles de paginación
 * @param {'home'|'posts'} view
 * @param {number} [current] - Página actual
 * @param {number} [total] - Total de páginas
 */
export function renderListFooter(view, current = 1, total = 1) {
  const container = elements.listFooter;
  if (!container) return;

  if (view !== 'posts') {
    container.innerHTML = `
      <a href="?nav=posts" class="cta-all-posts" data-nav="posts">Ver todas las publicaciones</a>
    `;
    return;
  }

  if (total <= 1) {
    container.innerHTML = '';
    return;
  }

  const pageItems = getPageItems(current, total).map(page => {
    if (page === '…') {
      return '<span class="page-ellipsis" aria-hidden="true">…</span>';
    }
    const isActive = page === current;
    return `
      <button type="button" class="page-btn ${isActive ? 'active' : ''}" data-page="${page}"
        ${isActive ? 'aria-current="page"' : ''} aria-label="Ir a la página ${page}">${page}</button>
    `;
  }).join('');

  container.innerHTML = `
    <nav class="pagination" aria-label="Paginación de publicaciones">
      <button type="button" class="page-btn page-nav-btn" data-page="${current - 1}"
        ${current <= 1 ? 'disabled' : ''} aria-label="Página anterior">‹ Anterior</button>
      ${pageItems}
      <button type="button" class="page-btn page-nav-btn" data-page="${current + 1}"
        ${current >= total ? 'disabled' : ''} aria-label="Página siguiente">Siguiente ›</button>
    </nav>
  `;
}

/**
 * Genera la lista de páginas a mostrar, con puntos suspensivos
 * cuando hay un salto de más de una página
 * @param {number} current
 * @param {number} total
 * @returns {(number|'…')[]}
 */
function getPageItems(current, total) {
  if (total <= 9) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages = new Set([1, total, current - 1, current, current + 1]);
  if (current <= 3) [2, 3, 4].forEach(p => pages.add(p));
  if (current >= total - 2) [total - 1, total - 2, total - 3].forEach(p => pages.add(p));

  const sorted = [...pages].filter(p => p >= 1 && p <= total).sort((a, b) => a - b);

  const items = [];
  let previous = 0;
  sorted.forEach(page => {
    if (previous && page - previous > 1) items.push('…');
    items.push(page);
    previous = page;
  });
  return items;
}

/**
 * Muestra un indicador de carga
 */
export function showLoading() {
  const container = elements.postsList;
  if (!container) return;

  if (elements.listFooter) elements.listFooter.innerHTML = '';

  container.innerHTML = `
    <div class="loading" role="status" aria-live="polite">
      <div class="loading-spinner" aria-hidden="true"></div>
      <p>Cargando publicaciones…</p>
    </div>
  `;
}

// ============================================
//  Renderizado de artículo completo
// ============================================

/**
 * Renderiza una publicación completa
 * @param {Object} post - {filename, title, date, html, tags}
 */
export function renderPostDetail(post) {
  const container = elements.postContent;
  if (!container) return;

  const date = post.date ? formatDateLong(post.date) : '';
  const tagsHtml = post.tags && post.tags.length > 0
    ? `<div class="post-article-tags">${post.tags.map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('')}</div>`
    : '';

  container.innerHTML = `
    <article class="post-article" role="article">
      <header class="post-article-header">
        <time class="post-article-date" datetime="${post.date ? post.date.toISOString().split('T')[0] : ''}">${escapeHtml(date)}</time>
        <h1 class="post-article-title">${escapeHtml(post.title)}</h1>
        ${tagsHtml}
      </header>
      <div class="markdown-content">
        ${post.html}
      </div>
      <a href="?" class="back-link" aria-label="Volver al listado de publicaciones">Volver al listado</a>
    </article>
  `;

  // Aplicar resaltado de sintaxis si Prism.js está disponible
  if (typeof Prism !== 'undefined') {
    container.querySelectorAll('pre code').forEach(block => {
      Prism.highlightElement(block);
    });
  }
}

// ============================================
//  Mensajes de error
// ============================================

/**
 * Muestra un mensaje de error
 * @param {string} title - Título del error
 * @param {string} message - Descripción del error
 */
export function showError(title, message) {
  const container = elements.postsList || elements.postContent || elements.mainContent;
  if (!container) return;

  if (elements.listFooter) elements.listFooter.innerHTML = '';

  container.innerHTML = `
    <div class="error-message" role="alert">
      <h3>${escapeHtml(title)}</h3>
      <p>${escapeHtml(message)}</p>
    </div>
  `;
}

/**
 * Muestra error en la sección de post
 * @param {string} title
 * @param {string} message
 */
export function showPostError(title, message) {
  const container = elements.postContent;
  if (!container) return;

  container.innerHTML = `
    <div class="error-message" role="alert">
      <h3>${escapeHtml(title)}</h3>
      <p>${escapeHtml(message)}</p>
    </div>
    <a href="?" class="back-link" aria-label="Volver al listado de publicaciones">Volver al listado</a>
  `;
}

// ============================================
//  Modo oscuro
// ============================================

/**
 * Inicializa el modo oscuro
 * Detecta preferencia del sistema y preferencia guardada
 */
export function initDarkMode() {
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeButton(savedTheme);
  } else {
    // Detectar preferencia del sistema
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = prefersDark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeButton(theme);
  }

  // Escuchar cambios en la preferencia del sistema
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      const theme = e.matches ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', theme);
      updateThemeButton(theme);
    }
  });
}

/**
 * Alterna entre modo claro y oscuro
 */
export function toggleDarkMode() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeButton(next);
}

/**
 * Actualiza el icono del botón de tema
 * @param {string} theme
 */
function updateThemeButton(theme) {
  const btn = elements.themeToggle;
  if (!btn) return;

  if (theme === 'dark') {
    btn.setAttribute('aria-label', 'Cambiar a modo claro');
  } else {
    btn.setAttribute('aria-label', 'Cambiar a modo oscuro');
  }
}

// ============================================
//  Efectos visuales
// ============================================

/**
 * Inicializa el círculo de luz que sigue al cursor
 */
export function initCursorGlow() {
  const circle = document.getElementById('cursorCircle');
  if (!circle) return;

  document.addEventListener('mousemove', (e) => {
    circle.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });

  document.addEventListener('mouseleave', () => {
    circle.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    circle.style.opacity = '1';
  });
}

// ============================================
//  SEO y Open Graph
// ============================================

/**
 * Actualiza los metadatos de la página
 * @param {string} title - Título de la página
 * @param {string} description - Descripción
 */
export function updateMeta(title, description) {
  // Título del documento
  document.title = title ? `${title} — ${BLOG_CONFIG.name}` : BLOG_CONFIG.name;

  // Meta description
  setMeta('description', description || BLOG_CONFIG.description);

  // Open Graph
  setMetaProperty('og:title', title || BLOG_CONFIG.name);
  setMetaProperty('og:description', description || BLOG_CONFIG.description);
  setMetaProperty('og:type', title ? 'article' : 'website');
  setMetaProperty('og:url', getCanonicalUrl());

  // Canonical
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', getCanonicalUrl());
}

/**
 * Establece un meta tag por nombre
 */
function setMeta(name, content) {
  let meta = document.querySelector(`meta[name="${name}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', name);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}

/**
 * Establece un meta tag por propiedad
 */
function setMetaProperty(property, content) {
  let meta = document.querySelector(`meta[property="${property}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('property', property);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}

// ============================================
//  Menú móvil
// ============================================

/**
 * Alterna el menú móvil
 */
export function toggleMobileMenu() {
  const navLinks = elements.navLinks;
  const btn = elements.mobileMenuBtn;
  if (!navLinks || !btn) return;

  const isOpen = navLinks.classList.toggle('open');
  btn.setAttribute('aria-expanded', isOpen);

  // Cerrar al hacer clic fuera
  if (isOpen) {
    setTimeout(() => {
      document.addEventListener('click', closeMobileMenuOutside, { once: true });
    }, 10);
  }
}

/**
 * Cierra el menú móvil al hacer clic fuera
 */
function closeMobileMenuOutside(e) {
  const navLinks = elements.navLinks;
  const btn = elements.mobileMenuBtn;
  if (!navLinks || !btn) return;

  if (!navLinks.contains(e.target) && !btn.contains(e.target)) {
    navLinks.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  }
}

/**
 * Cierra el menú móvil
 */
export function closeMobileMenu() {
  const navLinks = elements.navLinks;
  const btn = elements.mobileMenuBtn;
  if (navLinks) navLinks.classList.remove('open');
  if (btn) btn.setAttribute('aria-expanded', 'false');
}

// ============================================
//  Utilidades
// ============================================

/**
 * Escapa HTML para prevenir XSS al insertar texto
 * @param {string} str
 * @returns {string}
 */
function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
