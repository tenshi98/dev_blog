---
title: "Guarda previa al Begin documentada y validaciones de Promociones planificadas"
tags:
  - documentacion
  - sdd
  - promociones
---

# Guarda previa al Begin documentada y validaciones de Promociones planificadas

## Resumen

La plantilla 08 de casos de escritura incluye ahora la variante de guarda previa al Begin. Se planifican en tasks dos validaciones nuevas de Promociones (vigencia y tope de Valor).

## Descripción

### Contexto

Estados, Tarifas y Promociones validan los dependientes antes de abrir la transacción, algo que la plantilla 08 no recogía. La spec de Promociones no validaba el rango de vigencia ni el tope de `Valor`.

### Porqué

Alinear la documentación con el código real y cubrir esos dos huecos sin alterar lo existente.

### Descripción

- `docs/architecture/write-cases/templates/08.md`: sección "Variante validada: guarda previa al Begin" (`Base_GetCountData`, 400 con dependientes, 500 si falla la consulta); la variante original se conserva.
- `projects/reserva_servicios_admin`: TASK-005.5 (005.5.1 a 005.5.3), 005.6 y 005.7; RN-004b en la spec funcional, nota técnica y desviaciones.

## Contenido del cambio

Promociones rechazará con 400 `VigenciaHasta < VigenciaDesde` y un `Valor` fuera de rango (porcentaje 0 < Valor <= 100; monto Valor > 0), antes de escribir.

## Notas

Sin breaking changes ni acción requerida. El código se implementa al ejecutar las tasks.
