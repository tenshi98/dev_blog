---
title: "Mantenedor de Cobertura de Reserva de Servicios: controlador y vistas"
tags:
  - reservas-servicios
  - crud-resumen
---

# Mantenedor de Cobertura de Reserva de Servicios: controlador y vistas

## Resumen

Se crea el controlador `reservaServiciosCobertura` y sus siete vistas como CRUD Resumen con ficha de pestañas.

## Descripción

### Contexto

La cobertura define qué comunas atiende el servicio, con un recargo y los trabajadores asignados. Faltaba su mantenedor en el backoffice.

### Porqué

Completar TASK-007.1 y TASK-007.2 del proyecto de administración de reserva de servicios.

### Descripción

- Listado con filtro por comuna y estado, alta en modal que redirige a la ficha, y ficha con pestañas Resumen, Editar Datos y Trabajadores.
- Una comuna con reservas futuras activas no se puede borrar (400); al borrar una cobertura se borran también sus trabajadores.
- Solo se ha verificado la sintaxis (`php -l`); falta la suite y la revisión (TASK-007.3 y 007.4).

Registro técnico: `docs/history/2026-11-06_task-007-1-2-cobertura-controlador-vistas--developer.md`.
