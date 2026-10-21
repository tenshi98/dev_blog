/**
 * app.js - Aplicación principal
 *
 * - Inicialización
 * - Routing (SPA con query params)
 * - Coordinación de módulos
 * - Eventos
 */

import { BLOG_CONFIG, BASE_PATH } from './config.js';
import { loadPostIndex, parseDateFromFilename, sortPosts, searchPosts, filterByTag, collectTags } from './posts.js';
import { configureMarked, loadMarkdown, processPost, renderMarkdown } from './markdown.js';
import {
  initElements, getElements, showSection,
  renderPostList, renderPostDetail, renderTagsFilter, renderListFooter,
  showLoading, showError, showPostError,
  initDarkMode, toggleDarkMode, updateMeta,
  toggleMobileMenu, closeMobileMenu, initCursorGlow
} from './ui.js';

// Estado de la aplicación
const state = {
  postFiles: [],         // Nombres de archivo disponibles en el índice
  postsData: [],         // Metadatos y contenido de cada publicación
  sortOrder: 'newest',   // Orden actual
  searchQuery: '',       // Término de búsqueda actual
  activeTag: null,       // Etiqueta de filtro actual
  allTags: [],           // Todas las etiquetas disponibles
  currentPost: null,     // Publicación actualmente visible
  view: 'home',          // Vista activa: 'home' | 'posts'
  currentPage: 1,        // Página actual (solo vista 'posts')
  initialized: false,
};

// ============================================
//  Inicialización
// ============================================

/**
 * Inicializa la aplicación
 */
async function init() {
  // Inicializar referencias al DOM
  initElements();

  // Configurar Marked.js
  configureMarked();

  // Inicializar modo oscuro
  initDarkMode();

  // Efecto de luz que sigue al cursor
  initCursorGlow();

  // Configurar eventos
  setupEvents();

  // Establecer título y descripción del blog
  updateBlogInfo();

  // Cargar índice de publicaciones
  await loadPosts();

  // Manejar ruta actual (si hay ?post= en la URL)
  handleRoute();

  state.initialized = true;
}

/**
 * Actualiza la información del blog en el DOM
 */
function updateBlogInfo() {
  const blogTitle       = document.getElementById('blog-title');
  const blogDescription = document.getElementById('blog-description');
  const navBrand        = document.getElementById('nav-brand');

  if (blogTitle) blogTitle.textContent = BLOG_CONFIG.nameBlog;
  if (blogDescription) blogDescription.textContent = BLOG_CONFIG.description;
  if (navBrand) navBrand.textContent = BLOG_CONFIG.titleBar;

  updateMeta(null, BLOG_CONFIG.description);
}

/**
 * Carga el índice de publicaciones y sus datos
 */
async function loadPosts() {
  showLoading();

  try {
    // Cargar el índice con los metadatos y el contenido de las publicaciones
    const index = await loadPostIndex();

    state.postFiles = [];
    state.postsData = [];

    for (const entry of index) {
      try {
        if (typeof entry === 'string') {
          const rawContent = await loadMarkdown(entry);
          const processed = processPost(rawContent);

          state.postFiles.push(entry);
          state.postsData.push({
            filename: entry,
            title: processed.title,
            excerpt: processed.excerpt,
            tags: processed.tags,
            date: parseDateFromFilename(entry),
            content: processed.content,
          });
          continue;
        }

        if (!entry || typeof entry.filename !== 'string') {
          continue;
        }

        state.postFiles.push(entry.filename);
        state.postsData.push({
          filename: entry.filename,
          title: entry.title || 'Sin título',
          excerpt: entry.excerpt || '',
          tags: Array.isArray(entry.tags) ? entry.tags : [],
          date: parseDateFromFilename(entry.filename),
          content: typeof entry.content === 'string' ? entry.content : '',
        });
      } catch (error) {
        console.error(`Error al procesar ${entry && entry.filename ? entry.filename : entry}:`, error);
        // Continuar con las demás publicaciones
      }
    }

    // Recopilar etiquetas
    state.allTags = collectTags(state.postsData);

    // Renderizar
    renderCurrentView();

  } catch (error) {
    console.error('Error al cargar publicaciones:', error);
    showError('Error de carga', error.message || 'No se pudieron cargar las publicaciones. Intenta recargar la página.');
  }
}

// ============================================
//  Routing
// ============================================

/**
 * Maneja la ruta actual basada en query params
 */
function handleRoute() {
  const params = new URLSearchParams(window.location.search);
  const postFile = params.get('post');
  const nav = params.get('nav');
  const rawPage = params.get('page');
  const pageParam = parseInt(rawPage, 10);

  if (postFile) {
    showPost(postFile);
  } else if (nav === 'about') {
    showSection('about');
    updateMeta('Sobre mí', 'Información sobre el autor del blog.');
  } else if (nav === 'posts') {
    state.currentPost = null;
    state.view = 'posts';
    state.currentPage = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;
    // Normalizar la URL si el parámetro page no es válido
    if (rawPage !== `${state.currentPage}`) {
      syncUrl(state.currentPage > 1 ? `?nav=posts&page=${state.currentPage}` : '?nav=posts', true);
    }
    showSection('home', 'posts');
    updateMeta('Publicaciones', BLOG_CONFIG.description);
    renderCurrentView();
  } else {
    state.currentPost = null;
    state.view = 'home';
    state.currentPage = 1;
    showSection('home');
    updateMeta(null, BLOG_CONFIG.description);
    renderCurrentView();
  }
}

/**
 * Muestra una publicación individual
 * @param {string} filename - Nombre del archivo .md
 */
async function showPost(filename) {
  // Validar nombre de archivo
  if (!filename || !filename.endsWith('.md')) {
    showPostError('Publicación no encontrada', 'El enlace no corresponde a una publicación válida.');
    showSection('post');
    return;
  }

  // Prevenir path traversal
  if (filename.includes('/') || filename.includes('\\') || filename.includes('..')) {
    showPostError('Publicación no encontrada', 'El nombre del archivo no es válido.');
    showSection('post');
    return;
  }

  // Verificar que el archivo está en el índice
  if (state.postFiles.length > 0 && !state.postFiles.includes(filename)) {
    showPostError('Publicación no encontrada', 'La publicación solicitada no existe en el índice.');
    showSection('post');
    return;
  }

  // Buscar en caché
  const cached = state.postsData.find(p => p.filename === filename);

  showSection('post');
  showLoading();

  try {
    let html;
    let title;
    let tags;
    let date;
    let excerpt = '';

    if (cached && typeof cached.content === 'string') {
      // Usar los datos del índice sin descargar el Markdown
      html = renderMarkdown(cached.content);
      title = cached.title;
      tags = cached.tags;
      date = cached.date;
      excerpt = cached.excerpt;
    } else {
      // Fallback: cargar desde el servidor
      const rawContent = await loadMarkdown(filename);
      const processed = processPost(rawContent);
      date = parseDateFromFilename(filename);
      html = processed.html;
      title = processed.title;
      tags = processed.tags;
      excerpt = processed.excerpt;
    }

    // Renderizar
    renderPostDetail({ filename, title, date, html, tags });

    // Actualizar SEO
    updateMeta(title, excerpt);

    // Actualizar URL sin recargar
    const url = `?post=${encodeURIComponent(filename)}`;
    if (window.location.search !== `?post=${encodeURIComponent(filename)}`) {
      history.pushState({ post: filename }, '', url);
    }

    state.currentPost = filename;

  } catch (error) {
    console.error('Error al mostrar publicación:', error);
    showPostError('Error al cargar la publicación', error.message || 'No se pudo cargar la publicación solicitada.');
  }
}

/**
 * Actualiza la URL de la SPA sin recargar
 * @param {string} search - Cadena de query (?nav=posts&page=2) o '?' para limpiar
 * @param {boolean} [replace] - Reemplaza la entrada actual en vez de apilar una nueva
 */
function syncUrl(search, replace = false) {
  const target = search && search !== '?' ? search : '';
  const current = window.location.search || '';
  if (current === target) return;

  const url = window.location.pathname + target;
  if (replace) {
    history.replaceState({}, '', url);
  } else {
    history.pushState({}, '', url);
  }
}

/**
 * Navega al inicio (10 publicaciones, sin categorías)
 */
function navigateHome() {
  state.currentPost = null;
  state.view = 'home';
  state.currentPage = 1;
  state.activeTag = null;
  showSection('home');
  updateMeta(null, BLOG_CONFIG.description);
  syncUrl('?');
  renderCurrentView();
}

/**
 * Navega a la lista completa de publicaciones (paginada)
 * @param {boolean} [forceResetPage] - Reinicia la página aunque ya se esté en la vista
 */
function navigatePosts(forceResetPage = false) {
  const switchingView = state.view !== 'posts';
  state.currentPost = null;
  state.view = 'posts';
  if (switchingView || forceResetPage) state.currentPage = 1;

  showSection('home', 'posts');
  updateMeta('Publicaciones', BLOG_CONFIG.description);
  syncUrl(state.currentPage > 1 ? `?nav=posts&page=${state.currentPage}` : '?nav=posts');
  renderCurrentView();
}

/**
 * Vuelve al listado de la vista desde la que se abrió la publicación
 */
function navigateToList() {
  if (state.view === 'posts') {
    navigatePosts();
  } else {
    navigateHome();
  }
}

/**
 * Cambia de página dentro de la vista de publicaciones
 * @param {number} page
 */
function goToPage(page) {
  if (state.view !== 'posts') return;

  const totalPages = getTotalPages();
  const target = Math.min(Math.max(1, page), totalPages);
  if (target === state.currentPage) return;

  state.currentPage = target;
  syncUrl(target > 1 ? `?nav=posts&page=${target}` : '?nav=posts');
  renderCurrentView();

  const list = document.getElementById('posts-list');
  if (list) list.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/**
 * Reinicia la paginación al cambiar búsqueda, orden o etiqueta,
 * manteniendo la URL en sincronía con la vista de publicaciones
 */
function resetPage() {
  if (state.currentPage === 1) return;
  state.currentPage = 1;
  if (state.view === 'posts') {
    syncUrl('?nav=posts', true);
  }
}

/**
 * Navega a la sección "Sobre mí"
 */
function navigateAbout() {
  state.currentPost = null;
  showSection('about');
  updateMeta('Sobre mí', 'Información sobre el autor del blog.');
  history.pushState({ nav: 'about' }, '', '?nav=about');
}

// ============================================
//  Renderizado de la vista actual
// ============================================

/**
 * Aplica filtros, búsqueda y ordenamiento a las publicaciones
 * @returns {Object[]}
 */
function getVisiblePosts() {
  let posts = [...state.postsData];

  // Filtrar por etiqueta
  if (state.activeTag) {
    posts = filterByTag(posts, state.activeTag);
  }

  // Buscar
  if (state.searchQuery) {
    posts = searchPosts(posts, state.searchQuery);
  }

  // Ordenar por fecha
  const sortedFilenames = sortPosts(
    posts.map(p => p.filename),
    state.sortOrder
  );

  return sortedFilenames.map(fn => posts.find(p => p.filename === fn)).filter(Boolean);
}

/**
 * Total de páginas según la vista de publicaciones
 * @returns {number}
 */
function getTotalPages() {
  return Math.max(1, Math.ceil(getVisiblePosts().length / BLOG_CONFIG.postsPerPage));
}

/**
 * Renderiza la vista actual
 * - Inicio: sin categorías y con 10 publicaciones (sin límite al buscar)
 * - Publicaciones: categorías + paginación de 25 elementos
 */
function renderCurrentView() {
  const posts = getVisiblePosts();

  if (state.view === 'posts') {
    const totalPages = Math.max(1, Math.ceil(posts.length / BLOG_CONFIG.postsPerPage));

    // Ajustar página fuera de rango sin apilar historial
    if (state.currentPage > totalPages) {
      state.currentPage = totalPages;
      syncUrl(state.currentPage > 1 ? `?nav=posts&page=${state.currentPage}` : '?nav=posts', true);
    }

    const start = (state.currentPage - 1) * BLOG_CONFIG.postsPerPage;
    renderPostList(posts.slice(start, start + BLOG_CONFIG.postsPerPage));
    renderTagsFilter(state.allTags, state.activeTag);
    renderListFooter('posts', state.currentPage, totalPages);
    return;
  }

  const limited = state.searchQuery ? posts : posts.slice(0, BLOG_CONFIG.homePostsLimit);
  renderPostList(limited);
  renderTagsFilter([]);
  renderListFooter('home');
}

// ============================================
//  Eventos
// ============================================

/**
 * Configura todos los event listeners
 */
function setupEvents() {
  const els = getElements();

  // Toggle modo oscuro
  if (els.themeToggle) {
    els.themeToggle.addEventListener('click', toggleDarkMode);
  }

  // Menú móvil
  if (els.mobileMenuBtn) {
    els.mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });
  }

  // Búsqueda
  if (els.searchInput) {
    let debounceTimer;
    els.searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        state.searchQuery = e.target.value;
        resetPage();
        renderCurrentView();
      }, 300);
    });
  }

  // Ordenamiento
  if (els.sortSelect) {
    els.sortSelect.addEventListener('change', (e) => {
      state.sortOrder = e.target.value;
      resetPage();
      renderCurrentView();
    });
  }

  // Navegación (delegación de eventos en el main)
  document.addEventListener('click', (e) => {
    // Clicks en el chip para expandir/colapsar etiquetas de una tarjeta
    const tagsToggle = e.target.closest('[data-tags-toggle]');
    if (tagsToggle) {
      e.preventDefault();
      const tagsContainer = tagsToggle.closest('.post-card-tags');
      const extraTags = tagsContainer ? tagsContainer.querySelector('.post-card-tags-extra') : null;
      if (extraTags) {
        const isExpanded = tagsToggle.getAttribute('aria-expanded') === 'true';
        const count = tagsToggle.getAttribute('data-count') || '';
        extraTags.hidden = isExpanded;
        tagsToggle.setAttribute('aria-expanded', String(!isExpanded));
        tagsToggle.textContent = isExpanded ? `+${count}` : 'Ver menos';
        tagsToggle.setAttribute('aria-label', isExpanded ? `Mostrar ${count} etiquetas más` : 'Ocultar etiquetas adicionales');
      }
      return;
    }

    // Clicks en enlaces de publicaciones
    const postLink = e.target.closest('[data-post]');
    if (postLink) {
      e.preventDefault();
      const filename = postLink.getAttribute('data-post');
      closeMobileMenu();
      showPost(filename);
      return;
    }

    // Clicks en navegación
    const navLink = e.target.closest('[data-nav]');
    if (navLink) {
      e.preventDefault();
      const nav = navLink.getAttribute('data-nav');
      closeMobileMenu();
      if (nav === 'home') {
        navigateHome();
      } else if (nav === 'posts') {
        navigatePosts();
      } else if (nav === 'about') {
        navigateAbout();
      }
      return;
    }

    // Clicks en controles de paginación
    const pageBtn = e.target.closest('.page-btn');
    if (pageBtn) {
      e.preventDefault();
      if (pageBtn.disabled) return;
      const page = parseInt(pageBtn.getAttribute('data-page'), 10);
      if (Number.isFinite(page)) goToPage(page);
      return;
    }

    // Clicks en el chip para expandir/colapsar el filtro de etiquetas
    const filterToggle = e.target.closest('[data-tags-filter-toggle]');
    if (filterToggle) {
      e.preventDefault();
      const filterContainer = filterToggle.closest('.tags-filter');
      const extraTags = filterContainer ? filterContainer.querySelector('.tags-filter-extra') : null;
      if (extraTags) {
        const isExpanded = filterToggle.getAttribute('aria-expanded') === 'true';
        const count = filterToggle.getAttribute('data-count') || '';
        extraTags.hidden = isExpanded;
        filterToggle.setAttribute('aria-expanded', String(!isExpanded));
        filterToggle.textContent = isExpanded ? `+${count}` : 'Ver menos';
        filterToggle.setAttribute('aria-label', isExpanded ? `Mostrar ${count} etiquetas más` : 'Ocultar etiquetas adicionales');
      }
      return;
    }

    // Clicks en etiquetas de filtro
    const tagBtn = e.target.closest('.tag-filter-btn');
    if (tagBtn) {
      e.preventDefault();
      const tag = tagBtn.getAttribute('data-tag');
      state.activeTag = tag || null;
      resetPage();
      renderCurrentView();
      return;
    }

    // Click en brand
    if (e.target.closest('#nav-brand')) {
      e.preventDefault();
      closeMobileMenu();
      navigateHome();
      return;
    }

    // Click en enlace "volver"
    if (e.target.closest('.back-link')) {
      e.preventDefault();
      navigateToList();
      return;
    }
  });

  // Historial del navegador (botón atrás/adelante)
  window.addEventListener('popstate', (e) => {
    handleRoute();
  });

  // Teclado: Escape cierra menú móvil
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMobileMenu();
    }
  });
}

// ============================================
//  Inicio
// ============================================

// Iniciar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
