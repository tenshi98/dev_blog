---
title: Corrección de defectos del módulo kanban
tags:
  - kanban
  - seguridad
  - historial
  - correccion
  - testing
---

# Corrección de defectos del módulo kanban

Se corrigieron 17 defectos del módulo kanban detectados por las nuevas pruebas automáticas: el historial de las tareas ya usa siempre el usuario de la sesión y la fecha del servidor, las altas validan que la tarea esté abierta y se guardan en transacción, y se arreglaron varios fallos de pantalla.

## Qué cambia

El historial de cada tarea ya no puede atribuirse a otro usuario ni llevar una fecha falsa. Al borrar un participante el historial queda en la tarea correcta, no se pueden agregar participantes ni subtareas a tareas cerradas o inexistentes, y un trabajo asignado a subtareas ya no se puede borrar (se desactiva). Los formularios de tareas, subtareas y participantes actualizan el detalle al guardar, las columnas «Prioridad» y «Color Icono» de los tableros muestran lo que dicen y el historial se ordena por fecha.
