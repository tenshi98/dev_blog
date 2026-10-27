---
title: Orden de Widgets vuelve a guardar en la ruta correcta
tags:
  - sistema
  - widgets
  - rutas
  - fix
date: 2026-10-20
---
# Orden de Widgets vuelve a guardar en la ruta correcta

## Resumen

La pantalla de Orden de Widgets seguía usando las direcciones antiguas `administracion/...` para guardar y recargar, que ya no existen tras el cambio a `mantencionSistema/...`. Se corrigieron y la suite de pruebas del módulo lo confirma.

## Contenido del cambio

- Guardar el orden, Restablecer el orden por defecto y la recarga posterior usan ahora la ruta vigente `mantencionSistema/sistema/widgetsOrden`.
- Detectado por la nueva suite de pruebas del módulo `sistema`.
