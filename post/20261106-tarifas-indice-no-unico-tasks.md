---
title: "Tarifas: se planifica quitar el índice único de vigencia"
tags:
  - reservas_servicios
  - tarifas
  - installer
---

# Tarifas: se planifica quitar el índice único de vigencia

## Descripción

### Contexto
El installer creaba un índice único (servicio, variante, VigenciaDesde) en las tarifas.

### Porqué
Impedía repetir la misma fecha de inicio aunque la tarifa existente estuviera inactiva, contra lo definido en la regla de solape.

### Detalle
Se crean tres tareas: sustituir el índice único por uno no único (y eliminar el antiguo en instalaciones existentes), ajustar las pruebas y re-verificar. La integridad del solape queda en la validación de la aplicación. Aún no se ha tocado código.
