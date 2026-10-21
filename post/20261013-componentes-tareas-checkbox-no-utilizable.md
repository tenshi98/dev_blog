---
title: El componente ya no se guarda como «No utilizable» por error, y las tareas se eligen con casillas
tags:
  - maquinas
  - componentes
  - tareas
  - checkbox
  - noutilizable
  - ux
---

# El componente ya no se guarda como «No utilizable» por error, y las tareas se eligen con casillas

Se corrigió un bug por el que todo componente nuevo o editado se guardaba marcado como «No utilizable» aunque la casilla estuviera sin marcar. Además, la asignación de tareas de mantenimiento pasa de un desplegable múltiple a una lista de casillas (una por tarea), más directa y visible, en los tres formularios de componentes.

## Qué cambia

- **Marca «No utilizable» fiable**: al crear o editar un componente, la marca ahora respeta lo que marques en la casilla; antes se guardaba como marcado siempre que no hicieras nada.
- **Tareas con casillas**: «Tareas Asignadas» muestra ahora cada tarea del catálogo (Utilización Grasa, Aceite, Otros Productos, Inspecciones) como una casilla independiente que puedes activar o desactivar de un vistazo, en crear, crear subcomponente y editar.
- **Edición más simple**: al editar, las tareas ya asignadas aparecen precargadas directamente en las casillas.
