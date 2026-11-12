---
title: "La documentación de arquitectura vuelve a reflejar el código real"
tags:
  - "arquitectura"
  - "modulos"
  - "adr"
  - "documentacion"
---

# La documentación de arquitectura vuelve a reflejar el código real

## Resumen

La documentación de arquitectura se ha alineado con los 20 módulos actuales del backoffice. Se describen los patrones reales de transacciones y errores, y las decisiones arquitectónicas vigentes se enlazan desde las secciones a las que aplican.

## Descripción

### Contexto

`docs/architecture/` describía un estado anterior del código:

- `modules.md` (auditado el 2026-10-02) listaba módulos sin controladores (`—`), no recogía los sub-controladores nuevos de `bodegas` (Zonas, Pasillos, Racks, Distribucion), ni la carpeta `functions/` de `campanas`, y tenía líneas de `maquinas` coladas en el árbol de `bodegas`.
- `database.md` y `api.md` presentaban `ControllerBase::failOperation()` como manejo canónico de fallos de escritura, con una "migración completa 2026-10-14". Ese helper **ya no existe** en `vendors/application/controller/ControllerBase.php`; todos los controllers usan rollback inline + `Response::error('Error al operar con la Base de Datos', 500, ...)` (p. ej. `bodegasListado.php:586-663`).
- No se documentaban `ControllerFiles`, la API real de `ControllerInstaller`, `WidgetsOrderService`, los ficheros de rutas `userMiUsuario.php` / `userPasswordForzada.php`, el autoload de `functions/` (`admin/public/index.php:70`) ni la evolución idempotente del esquema en los installers.
- `decisions/README.md` indexaba ADR-0003 (`failOperation`) y ADR-0004 (largo máximo por campo), cuyos ficheros no existen; ADR-0001 citaba ADR-0003.
- Los docs no enlazaban los ADR vigentes desde las secciones a las que aplican.

Durante la revisión el árbol cambió: `reserva_limpieza` desapareció de `admin/app/modules/` y aparecieron 14 módulos más (20 en total). La documentación refleja el estado final verificado.

### Porqué

Petición del usuario: revisar `admin/app/modules/`, actualizar `docs/architecture/` a la configuración actual e integrar los ADR de `docs/architecture/decisions/`. Aclaraciones del usuario:

- Integrar significa **referenciar** los ADR desde los docs, manteniéndolos como ficheros.
- **Eliminar toda referencia a ADR-0003 y ADR-0004**, que ya no se utilizan.
- Los módulos que faltaban se han vuelto a añadir al árbol.

### Descripción

- `docs/architecture/architecture.md`:
  - Árbol con `ControllerFiles`, `CsrfToken`, `ScopeAccess` y `FunctionsReservaLimpieza`; `sites_*` marcado como no presente.
  - Helpers con `WidgetsOrderService`; autoload con `functions/`; rutas en modo contraseña forzada.
  - Tabla de núcleo con la API real de `ControllerBase`, `ControllerFiles` y `ControllerInstaller`.
  - Carpeta `functions/` en la estructura de módulo; regla 5 de integración.
  - Nueva §8 "Decisiones arquitectónicas vigentes (ADR)" con 0001/0002/0005, enlazados a las secciones donde aplican.
- `docs/architecture/modules.md`: reescrito.
  - Tabla de los 20 módulos con controladores reales y columnas I/T/W/F.
  - Nota de `reserva_limpieza` planificado (ADR-0005).
  - Árbol de `bodegas` actualizado (9 controladores, 9 suites, widgets).
  - Tabla obligatorio/opcional con `functions/`, `ControllerFiles` y los módulos sin installer.
  - Patrones 2, 4, 8 y 10 (controllerName/viewName, transacción, `Int_Fnc_*`, wrappers `_N`).
  - Mapa de dependencias desde `ListDataModule()`.
- `docs/architecture/database.md`:
  - INSERT, DELETE y §9 con el patrón inline real (rollback antes de cada error, también si falla el commit). Sin `failOperation`.
  - §4 reescrito sobre ADR-0001 y ADR-0002 (transacciones anidadas con `$NewDBConn`, puntos de lock actuales, excepción `testeos.php`).
  - §7 con la evolución idempotente sin versionado (`IF NOT EXISTS`, `seed*` con `INSERT IGNORE`, orden de `InstallModule`).
- `docs/architecture/api.md`:
  - Inventario completo de `admin/app/utils/*.php`.
  - Anatomía del endpoint con transacción/lock (ADR-0001/0002) y error inline; sin la referencia a `projects/failoperation-plataforma`.
  - Códigos 409/419 añadidos a la tabla.
- `docs/architecture/development-patterns.md`:
  - Esqueleto CRUD con transacción y `delFiles`; enlace a ADR-0001 y a las plantillas `crudNormal`/`crudResumen`.
  - Installer sobre `ControllerInstaller`.
  - Nuevas §1.5 (helpers `functions/`), §2.1 (sub-controlador que comparte permisos) y §3.1 (read-modify-write, ADR-0002).
  - §5 de widgets con `WidgetsOrderService` y los dos formatos de `Menu_Value`.
  - Errores clásicos 2, 8 y 9.
- `docs/architecture/conventions.md`:
  - Origen generalizado; fila de helper interno.
  - Bases `ControllerFiles`/`ControllerInstaller`; `delFiles` frente a `->DelFiles` en rutas.
  - Métodos de sub-entidad y wrappers; claves `Fnc_*`/`Int_Fnc_*`; `controllerName`/`viewName`.
- `docs/architecture/security.md`:
  - CSRF también en `ControllerFiles::beforeroute`; se corrige el anidado de la config CSRF, que estaba mal colocado bajo `ScopeAccess`.
  - Consumidores y umbrales de `ScopeAccess`.
  - El nivel no se re-verifica en el controlador.
  - `.htaccess` en `controller/` y `functions/`; aviso sobre ficheros `.bak`.
- `docs/architecture/testing.md`: nueva §4.3 "Módulos con suite"; anti-patrón 6 (suites que afirman `failOperation(`).
- `docs/architecture/decisions/README.md`: eliminadas las filas 0003 y 0004; nota de que los números retirados no se reutilizan.
- `docs/architecture/decisions/0001-transacciones-en-escrituras.md`: en §Decisión punto 2 se elimina solo el inciso "(o dentro de `failOperation()`, ADR-0003)". Es una edición mínima de un ADR aceptado, hecha por petición expresa del usuario y aprobada en el plan; la decisión no cambia.
- `docs/history/DECISIONES.md`, `INDEX.md`, `PENDIENTES.md`: regenerados con `docs/tools/history-index.sh` (la tabla de ADR vigentes ya no lista 0003/0004).

## Contenido del cambio

- Inventario completo de módulos: controladores, instalador, pruebas, widgets, helpers internos y dependencias entre módulos.
- Patrones nuevos documentados:
  - helpers internos por módulo (`functions/`);
  - sub-controladores que comparten permisos (distribución física de bodegas);
  - widgets con orden configurable;
  - instaladores idempotentes;
  - controladores sin base de datos.
- El manejo de errores de escritura se documenta como está implementado: rollback y respuesta en cada controlador.
- Las decisiones vigentes (transacciones, bloqueo por concurrencia y helper de reserva de limpieza) se citan donde aplican. Se retiran del índice las dos decisiones que ya no se usan.
- Quedan registrados como pendientes los defectos encontrados durante la revisión.

## Notas

Sin breaking changes. Acción recomendada: actualizar las suites de pruebas que aún esperan el antiguo helper `failOperation` (detalle en la entrada de history).
