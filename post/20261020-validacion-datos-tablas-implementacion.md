---
title: Validaciones de formularios alineadas con las columnas de la base de datos
tags:
  - validacion
  - dataCheck
  - base-de-datos
  - calidad
  - backoffice
date: 2026-10-20
---
# Validaciones de formularios alineadas con las columnas de la base de datos

## Resumen

Se completó la auditoría de validaciones de los 16 módulos del backoffice y se corrigieron los formularios que no respetaban el tipo o el largo de sus columnas. La matriz final no deja campos con reglas faltantes y el motor de validación ahora admite largos exactos y fechas con formato por campo.

## Contenido del cambio

La revisión comparó cada campo enviado por los formularios con la definición real de su tabla. Se detectaron teléfonos, RUT, redes sociales y textos que podían superar el largo de la columna, identificadores que no se validaban como números y fechas que solo aceptaban el formato corto.

Ahora los formularios rechazan esos valores con un mensaje claro antes de llegar a la base de datos. El cambio cubre campañas, cotizaciones, entidades, facturación, máquinas, reservas, sistema, terceros, usuarios y vehículos, entre otros módulos.

La matriz de cobertura queda en `projects/validacion-datos-tablas/implementation/coverage-matrix.md` y sirve como referencia para futuras revisiones.
