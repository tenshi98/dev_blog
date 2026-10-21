---
title: Mega-menú superior más compacto
tags:
  - menu
  - ux
  - bootstrap
---

# Mega-menú superior más compacto

El menú desplegable del encabezado ahora reparte las categorías por tamaño en 3 columnas equilibradas, eliminando los huecos que dejaba el contador anterior. Además se reforzó la seguridad del renderizado.

## Qué cambia

- Las secciones del menú se agrupan para que las columnas queden parejas: menos espacio vacío entre categorías.
- Las categorías más grandes aparecen primero para aprovechar mejor el alto del desplegable.
- Los nombres con caracteres especiales (`&`, `<`, `>`) se muestran correctamente sin romper el diseño.
- En móvil el menú sigue apilándose en una columna como antes.
