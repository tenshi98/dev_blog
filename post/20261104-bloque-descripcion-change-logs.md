---
title: "Cada resumen de cambio incluye ahora una descripción completa"
tags:
  - blog
  - change-logs
  - documentacion
  - agents
---

# Cada resumen de cambio incluye ahora una descripción completa

## Resumen

Los posts de `docs/change_logs/` incorporan un bloque `## Descripción` entre el resumen y el contenido del cambio. El bloque explica el contexto previo, el porqué de la tarea y qué se hizo, para que cada entrada se entienda sin abrir el historial técnico.

## Descripción

### Contexto

Los change_logs tenían un resumen breve, el contenido del cambio y las notas. Faltaba el punto de partida, la motivación y el detalle completo de la tarea ejecutada, que sí estaban en las entradas técnicas de `docs/history/`.

### Porqué

El usuario pidió que cada post describiera la tarea ejecutada por completo, separando contexto, porqué y descripción, y que ese bloque apareciera entre `## Resumen` y `## Contenido del cambio`.

### Descripción

Se añadió el bloque a las 164 entradas existentes. El contenido se tomó de las secciones 1, 2 y 3 de la entrada correspondiente de `docs/history/`, emparejada por `cambio_relacionado` o por fecha y slug. Las dos entradas con estructura especial se trataron aparte: la de SSRF, con encabezados H1, y la de observaciones, sin `## Resumen` ni `## Contenido del cambio`. También se actualizaron la plantilla y el README de `docs/change_logs/`.

## Contenido del cambio

- Nuevo bloque `## Descripción` con `### Contexto`, `### Porqué` y `### Descripción`.
- Contenido reutilizado del historial técnico, sin inventar datos.
- Plantilla y README actualizados para las entradas futuras.
- Las 164 entradas conservan su resumen, su contenido y sus notas.

## Notas

No hay breaking changes de código. Las descripciones pueden incluir rutas internas del proyecto; conviene revisarlas antes de publicarlas en un blog público.
