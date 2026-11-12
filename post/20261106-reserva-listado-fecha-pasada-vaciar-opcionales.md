---
title: "Reservas: sin fecha pasada en el alta y opcionales vaciables en la edición"
tags:
  - reservas
  - fix
---

# Reservas: sin fecha pasada en el alta y opcionales vaciables en la edición

## Descripción

### Contexto
El alta de reservas aceptaba fechas pasadas y la edición no permitía quitar trabajador, responsable ni documento de facturación.

### Por qué
La regla RN-010 exige no crear reservas en el pasado, y desasignar un trabajador es una operación legítima.

### Detalle
- El alta responde 400 si la fecha es anterior a hoy (zona America/Santiago); hoy y futuro se aceptan. La edición no valida esto, para poder corregir reservas históricas.
- Al editar, trabajador, responsable y facturación enviados vacíos pasan a NULL en la misma transacción. Si se quita el trabajador se libera su agenda y se registra el evento "Trabajador desasignado".
- Nuevos casos en la suite del módulo. Detalle: `docs/history/2026-11-06_reserva-listado-fecha-pasada-vaciar-opcionales--developer.md`.
