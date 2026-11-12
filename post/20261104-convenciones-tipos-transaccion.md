---
title: "Cinco tipos de transacción y una arquitectura que cabe en un modelo pequeño"
tags:
  - "arquitectura"
  - "sdd"
  - "skills"
  - "transacciones"
  - "dry"
---

# Cinco tipos de transacción y una arquitectura que cabe en un modelo pequeño

## Resumen

La documentación del proyecto ahora define cinco tipos de artefacto: CRUD Normal, CRUD Resumen, Informe, Installer y Widgets. Cada uno tiene métodos obligatorios, opcionales y prohibidos, y plantillas listas para rellenar. La arquitectura quedó partida en archivos cortos, de un solo tema, que un modelo de IA pequeño puede leer completos.

## Descripción

### Contexto

`docs/architecture/` tenía 11 archivos grandes (hasta 436 líneas) y mezclaba patrones de CRUD, informes, installer y widgets en `development-patterns.md`. Las skills repetían en "Convenciones del proyecto" lo que ya estaba en la arquitectura. No había una definición formal de los tipos de transacción, ni recetas para generar tasks SDD por tipo.

### Porqué

Lo pidió el usuario: reglas por tipo (CRUD Normal, CRUD Resumen, Informe, Installer, Widgets) con métodos, consultas, vistas y checkeo POST obligatorios y opcionales; arquitectura dividida para que la lea una IA de 1B-4B; skills que sean solo procedimiento; DRY estilo `bodegasListado` en los proyectos SDD nuevos; y sin texto histórico redundante.

### Descripción

- `docs/architecture/`: nuevo `README.md` (mapa tarea → archivos), `glossary.md`, `core/`, `transactions/` (5 tipos con `methods`, `checklist` y plantillas fill-in por método), `write-cases/` (11 casos de escritura con plantilla), `data/`, `patterns/`, `ui/`, `api/`, `security/`, `testing/`, `conventions/` y `sdd/` (`task-rules`, `verification` y `recipe-<tipo>`). Se eliminaron `architecture.md`, `modules.md`, `conventions.md`, `conventions-sdd-generacion.md`, `database.md`, `api.md`, `security.md`, `testing.md`, `documentation-standards.md` y `development-patterns.md`.
- `docs/architecture/reserva_limpieza_admin_resumen_funcionamiento.md` se movió a `projects/reserva_limpieza_admin/resumen-funcionamiento.md`, sin la sección de estado.
- `docs/architecture/decisions/`: rutas re-enlazadas en 0001, 0005, 0006, 0007 y 0008.
- `skills/`: todas en formato Objetivo · Cuándo · Lee · Procedimiento · Errores · Checklist. `javascript` se fusionó en `frontend`. Hay una skill nueva, `transactions`.
- `agents/`, `AGENTS.md`, `README.md`: la lectura previa pasa por el mapa. El architect usa `recipe-<tipo>` y el reviewer verifica contra `transactions/<tipo>/checklist.md`. Se fusionó `flujo.md` en `agents/README.md` y se borró.
- `projects/README.md`: la hoja tiene los campos nuevos `Tipo transacción`, `Receta`, `Contexto mínimo` y `Valores`.
- `root_plataforma/controller/crud{Resumen,Informe,ResumenObservaciones}.php`: refactor DRY con helpers privados `getDataList`, `getDataDetail*` y `getDataEdit`.
- Bugs corregidos:
  - `cotizacionListado`: `updateCotizacion` se llamaba tras el commit y en Update recibía `[]`. Ahora se ejecuta dentro de la transacción con el id correcto.
  - `gestionDocumentos`: la comparación de `idTipo` era estricta entre string e int; en el bucle de borrado se reportaba otro error; faltaba validar `rowMovimiento`.
  - `bodegasListado-Resumen.php`: `distZonaDel` usaba una variable PHP desde JS.
  - `informeProductos`: `showError(1)` en listAll, `Print` reescrito sobre tablas reales y `mergeResponses`.

## Contenido del cambio

- Un mapa (`docs/architecture/README.md`) indica qué archivos leer, como máximo tres, según la tarea.
- Cada tipo tiene su lista de métodos, vistas, validaciones y un checklist de conformidad.
- Once casos de escritura documentados con su plantilla: alta simple, maestro-detalle, borrado en cascada, borrado protegido, recálculo con bloqueo y otros.
- Las tasks SDD incluyen ahora la plantilla exacta y el contexto mínimo que debe leer quien las ejecute.
- Las skills se dedican solo a describir procedimientos, y se eliminó el texto histórico repetido.
- Se corrigieron fallos en cotizaciones (recálculo de totales al editar), facturación (ventas con productos, borrado de documentos), bodegas (borrado de zonas) y el informe de stock.

## Notas

Sin breaking changes de código. Los agentes leen rutas nuevas de `docs/architecture/`. Las rutas de las skills se mantienen, salvo `skills/javascript`, que se fusionó en `skills/frontend`.
