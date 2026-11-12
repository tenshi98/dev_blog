---
title: "Resumen de funcionamiento y diagrama de flujo del módulo reserva_limpieza (admin)"
tags:
  - "reserva_limpieza"
  - "flujo"
  - "documentacion"
  - "diagrama"
  - "transacciones"
---

# Resumen de funcionamiento del módulo reserva_limpieza (admin)

## Resumen

Se documenta el funcionamiento completo del backoffice de reservas de limpieza: desde los datos maestros y transacciones que alimentan la reserva, pasando por las etapas de la aplicación principal, el uso de bloqueo (`FOR UPDATE`), los 15 estados y su matriz de transiciones, hasta un diagrama de flujo en Mermaid.

## Descripción

### Contexto

El proyecto `reserva_limpieza_admin` tiene sus documentos SDD completos (`requirements/`, `specs/` con functional, technical, database, api, security y flujo, `architecture/`, `tasks/` en árbol atómico con 388 hojas, `implementation/` en curso y `validation/`). No existía un único documento que conectara el flujo completo de transacciones, estados, bloqueo y datos a rellenar en un resumen de funcionamiento consultable.

### Porqué

El usuario pidió crear el resumen de funcionamiento del módulo a partir de las specs y tareas existentes, contemplando: transacciones que alimentan la parte principal (datos a rellenar, origen BD vs ingreso manual), aplicación principal por etapas (qué se llena, uso de bloqueo, estados y casos de generación), y un diagrama de flujo.

### Descripción

- `docs/architecture/reserva_limpieza_admin_resumen_funcionamiento.md` (nuevo): resumen de funcionamiento con 11 secciones:
  1. Alcance y actores
  2. Datos maestros (qué se rellena, origen BD/manual)
  3. Transacciones T1–T5 que alimentan la parte principal (alta, cambio de estado, retención, borrado, expiración)
  4. Aplicación principal por etapas (flujo web y admin, qué se llena en cada etapa)
  5. Bloqueo y concurrencia (`FOR UPDATE`, retenciones, orden de locks)
  6. 15 estados y matriz de transiciones
  7. Diagrama de flujo (4 bloques Mermaid: ciclo de vida, alta T1, cambio de estado T2, conexión entre transacciones)
  8. Relaciones entre tablas (sin FK)
  9. Códigos de error y rollback
  10. Estado de implementación
  11. Referencias

## Contenido del cambio

Ahora existe un único documento de referencia que explica paso a paso cómo se conectan las operaciones de reserva: cada transacción indica sus pasos, los datos que toca, si se alimentan de la base de datos o requieren ingreso manual, cómo se usa el bloqueo, los estados posibles y los casos en que se generan. Todo se apoya en los specs y tasks del proyecto para no inventar nada.

## Notas

Sin breaking changes ni acción requerida.
