---
title: Actualización de pruebas del módulo archivos (Gestor de Documentación)
tags:
  - Pruebas
  - Módulo archivos
  - sistemaTesteos
---

# Actualización de pruebas del módulo archivos

## Resumen

Se actualizó la suite de pruebas del módulo `archivos` (Gestor de Documentación / explorador de archivos del panel de administración) para que refleje el código real del controlador y la vista.

## Descripción

### Contexto
El módulo `admin/app/modules/archivos` ya había sido refactorizado: su controlador extiende `ControllerFiles`, concede el ámbito de autorización con `ScopeAccess::grant`, deniega el acceso con HTTP 403 sin nivel suficiente y usa el widget dedicado `UIWidgetsFileExplorer`. La vista envía el ámbito `AccessScope` y la ruta base `fileExplorer`. Sin embargo, la suite de pruebas aún esperaba el widget antiguo (`UIWidgetsCommon`) y no cubría el gate de autorización.

### Qué se hizo
- Se corrigió el caso que verificaba la instancia del widget (`UIWidgetsFileExplorer` en lugar de `UIWidgetsCommon`).
- Se añadieron casos de concesión de ámbito, denegación 403 y constructor sin dependencia de base de datos.
- Se reforzó el contrato de la vista: valor de `Route`, presencia de `AccessScope` e invocación a `Fnc_WidgetsFileExplorer`.
- Se agregó la prueba `autorizacionListadoTest`, que valida con un doble de F3 (sin tocar la base de datos) que `listAll()` deniega con HTTP 403 sin nivel de acceso y deja pasar el gate con nivel suficiente.

La suite queda con 10 pruebas automatizadas (`*Test`) descubiertas por `sistemaTesteos`, sin ejercitar el instalador ni subidas reales de archivos (ámbito intencional, igual que en el resto de módulos).

## Notas

No hubo cambios en controlador, vista, installer ni en ninguna otra parte del sistema. Solo se modificó `admin/app/modules/archivos/testing/archivosTesting.php`. Se validó sintaxis con `php -l` (PHP 8.3.6).