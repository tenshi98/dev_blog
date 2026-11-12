---
title: "Exportar a Excel: patrón del cliente y documentación"
tags:
  - excel
  - documentacion
---

# Exportar a Excel: patrón del cliente y documentación

## Resumen

El Informe de reservas exporta a Excel desde el navegador, como el resto del sistema, y el patrón quedó documentado.

## Descripción

### Contexto
El informe tenía una descarga generada en el servidor, distinta a la forma habitual de exportar.

### Porqué
Mantener una sola manera de exportar, sin dependencias de servidor, y dejar una guía para futuras pantallas.

### Descripción
El botón Exportar a Excel descarga todas las filas del filtro, no solo la página visible de la tabla. Se quitó la ruta de exportación del servidor. La guía está en `docs/architecture/ui/export-excel.md`.

## Contenido del cambio

El archivo descargado es un `.xls` en formato HTML; Excel puede avisar del formato al abrirlo.
