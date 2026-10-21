---
title: Kanban completa su red de pruebas: siete fases y 1.730 comprobaciones
tags:
  - testing
  - kanban
  - qa
---

# Kanban completa su red de pruebas: siete fases y 1.730 comprobaciones

El módulo kanban sumó siete suites automáticas que recorren el informe de tareas, los estados, los tableros, las tareas, los participantes, las subtareas y los trabajos. En total son 1.730 comprobaciones que se ejecutan desde el panel de testeos sin modificar datos.

## Fase 1: informe de tareas

La primera suite cubre el informe de tareas con 198 comprobaciones: estructura, rutas y permisos, pantallas de búsqueda, detalle e impresión, y la garantía de que el informe sea de solo lectura.

## Fase 2: estados

La gestión de estados suma 158 comprobaciones sobre la creación, edición y borrado. Se verifican las rutas con el nivel de permiso correcto, los formularios con sus catálogos, la validación del nombre y de los identificadores, y los IDs cifrados.

## Fase 3: tableros

La administración de tableros tiene 274 comprobaciones sobre el CRUD completo: permisos por nivel, listado, formularios, detalle, validación y seguridad de las vistas.

La fase documentó una inconsistencia visual existente —los encabezados «Color Icono» y «Prioridad» aparecían cruzados en la tabla y el detalle— para valorarla aparte.

## Fase 4: tareas

El tablero de tareas es la suite más completa, con 488 comprobaciones. Cubre creación, edición, cambio de tablero y borrado, además de los permisos por nivel y la seguridad de las pantallas.

Se verifica que las tareas cerradas no se puedan editar, que las escrituras usen transacciones y reviertan ante fallos, que los IDs viajen cifrados y que las validaciones rechacen datos inválidos. También quedó documentado que el cambio de tablero toma el usuario del formulario y no de la sesión, para valorarlo como corrección.

## Fase 5: participantes

El alta y la baja de participantes suma 150 comprobaciones. Se revisan los permisos, el formulario —solo usuarios activos que aún no participan—, los IDs cifrados y el registro de cada movimiento en el historial de la tarea.

La fase dejó documentada una inconsistencia: el borrado de un participante puede registrar el historial en otra tarea. Queda anotada para corregirla aparte.

## Fase 6: subtareas

La creación y edición de subtareas tiene 189 comprobaciones. Se cubren los formularios con o sin trabajo específico, los valores y catálogos, los IDs cifrados y las reglas de validación que aceptan una subtarea sin trabajo y rechazan textos demasiado cortos o largos.

## Fase 7: trabajos

El catálogo de trabajos específicos cierra la etapa con 273 comprobaciones sobre permisos por nivel, formularios con su estado preseleccionado, alta siempre como trabajo activo y reglas de validación del nombre y el estado.

Quedaron documentadas algunas inconsistencias existentes, como nombres confusos del permiso y un borrado que no comprueba el uso, para corregirlas en una pasada posterior.
