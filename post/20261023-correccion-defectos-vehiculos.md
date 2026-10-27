---
title: Vehículos: exportación, filtros y detalle corregidos
tags:
  - vehiculos
  - correccion
  - exportacion
  - permisos
  - qa
date: 2026-10-23
---
# Vehículos: exportación, filtros y detalle corregidos

## Resumen

Se corrigieron los defectos que las pruebas automáticas detectaron en el módulo de vehículos: la exportación a Excel vuelve a funcionar, el filtro del listado deja de fallar en el navegador y el detalle muestra correctamente quién editó una observación.

## Contenido del cambio

- **Exportar a Excel:** ahora lista los datos propios del vehículo (patente, número de serie, capacidades, tipo de carga, ubicación, estado…); antes fallaba por arrastrar columnas de otro módulo.
- **Filtro del listado:** se eliminó código sobrante que producía un error al cargar la pantalla.
- **Detalle de observaciones:** vuelve a mostrar «Editado por … el …».
