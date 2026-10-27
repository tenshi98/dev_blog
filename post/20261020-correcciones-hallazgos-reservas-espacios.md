---
title: Reservas: el borrado del listado vuelve a funcionar y se alinean rutas y permisos
tags:
  - reservas_espacios
  - fix
  - instalador
  - testing
date: 2026-10-20
---
# Reservas: el borrado del listado vuelve a funcionar y se alinean rutas y permisos

## Resumen

Borrar una reserva desde el listado fallaba porque la pantalla enviaba el identificador con otro nombre del que esperaba el servidor; ahora funciona. También se completan dos rutas que el instalador publicaba sin método detrás y se corrige el tipo de permiso de los Espacios.

## Contenido del cambio

- **Borrado de reservas operativo:** el botón de borrar del listado de reservas envía ahora el dato correcto.
- **Rutas sin método completadas:** las rutas de eliminar archivos de reservas y de exportar a Excel del informe ya tienen su método, sin lógica porque no manejan archivos ni exportan desde el servidor.
- **Permiso de Espacios coherente:** se registra como mantenimiento simple, igual que sus rutas reales (en instalaciones nuevas).
- **Teléfonos:** se verificó que el formulario del solicitante ya sigue el criterio del resto del sistema (solo dígitos); sin cambios.
