---
title: Rutas de administración renombradas a mantencionSistema en BD e installers
tags:
  - rutas
  - mantencionSistema
  - administracion
  - BD
  - installers
---

# Rutas de administración renombradas a mantencionSistema en BD e installers

Doce rutas del panel de administración pasaron del prefijo `administracion/` y `mantencion/` a `mantencionSistema/`. Se actualizaron tanto la base de datos como los installers de seis módulos para que las páginas dejen de mostrar "Not Found" tras el cambio.

## Qué cambia

- Las rutas de Entidades (sectores), Productos (categorías y tipos), Kanban (tableros), Servicios (categorías), Sistema (orden de widgets) y Reservas (espacios, estados, periodicidad, recursos y unidades) usan ahora el prefijo unificado `mantencionSistema/`.
- Los installers de esos módulos se actualizaron para que una futura reinstalación no revierta los nombres de ruta.
