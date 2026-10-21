---
title: Los productos de un documento avisan cuando falta su movimiento de bodega
tags:
  - facturacion
  - bodegas
  - qa
---

# Los productos de un documento avisan cuando falta su movimiento de bodega

Al agregar, editar o quitar un producto de un documento con bodegas activas, el sistema verifica que el documento tenga su movimiento de bodega y, si no, informa el motivo y no modifica nada.

## Qué cambia

- **Mensaje claro:** «No se encontró el movimiento de bodega del documento» en vez de un error confuso.
- **Sin cambios a medias:** la operación se revierte por completo.
