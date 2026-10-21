---
title: Aprendiendo JavaScript moderno
tags:
  - JavaScript
  - Programación
  - Web
---

# Aprendiendo JavaScript moderno

JavaScript ha evolucionado enormemente en los últimos años. En este artículo repasamos las características más útiles del JavaScript moderno (ES6+) que utilizamos en este blog.

## Variables: const y let

Las nuevas formas de declarar variables hacen el código más seguro y legible:

```javascript
// const para valores que no cambian
const BASE_PATH = '/blog';

// let para valores que pueden cambiar
let currentPage = 1;
currentPage = 2; // OK

// Evitar var
// var era = 'confuso'; // No recomendado
```

### ¿Cuándo usar cada una?

| Declaración | Reasignable | Ámbito | Hoisting |
|-------------|-------------|--------|----------|
| `const`     | No          | Bloque | No       |
| `let`       | Sí          | Bloque | No       |
| `var`       | Sí          | Función| Sí       |

## Funciones flecha

Las *arrow functions* ofrecen una sintaxis más concisa:

```javascript
// Función tradicional
function sumar(a, b) {
  return a + b;
}

// Arrow function
const sumar = (a, b) => a + b;

// Con cuerpo de bloque
const procesarDatos = (datos) => {
  const filtrados = datos.filter(d => d.activo);
  return filtrados.map(d => d.valor);
};
```

## Async/Await

La sintaxis `async/await` hace el código asíncrono mucho más legible:

```javascript
// Con promesas
function cargarPost(id) {
  return fetch(`/post/${id}`)
    .then(response => response.text())
    .then(content => procesar(content))
    .catch(error => console.error(error));
}

// Con async/await (más legible)
async function cargarPost(id) {
  try {
    const response = await fetch(`/post/${id}`);
    const content = await response.text();
    return procesar(content);
  } catch (error) {
    console.error('Error al cargar:', error);
  }
}
```

## Destructuración

Extraer valores de objetos y arrays de forma elegante:

```javascript
// Objetos
const post = { titulo: 'Mi post', fecha: '2026-08-15', tags: ['JS'] };
const { titulo, fecha } = post;

// Arrays
const [primero, segundo, ...resto] = [1, 2, 3, 4, 5];

// En parámetros de función
const renderizar = ({ titulo, contenido }) => {
  console.log(titulo, contenido);
};
```

## Módulos ES

Los módulos nativos de JavaScript permiten organizar el código sin bundlers:

```javascript
// Exportar
export const configuracion = { nombre: 'Blog' };
export function inicializar() { /* ... */ }

// Importar
import { configuracion, inicializar } from './config.js';
```

> Los módulos ES funcionan directamente en navegadores modernos usando `<script type="module">`. No necesitas Webpack, Rollup ni ningún bundler.

## Conclusión

JavaScript moderno es poderoso, expresivo y compatible directamente con los navegadores actuales. No necesitas transpilar ni compilar para crear aplicaciones web funcionales.

[Documentación de MDN sobre JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript)
