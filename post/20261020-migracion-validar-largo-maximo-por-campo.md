---
title: Validación de longitud máxima exacta por campo
tags:
  - validacion
  - dataCheck
  - ddl
  - largo-maximo
  - backoffice
date: 2026-10-20
---
# Validación de longitud máxima exacta por campo

## Resumen

Los formularios de 16 módulos del backoffice ahora validan el largo máximo de cada campo contra el tamaño real de su columna, en lugar de aplicar un único límite a todos los campos de una regla. La migración cubre 77 controllers y 103 métodos de validación, sin cambios de esquema ni de rutas.

## Contenido del cambio

Antes, una misma regla de longitud agrupaba campos con columnas de distinto tamaño. Eso permitía que algunos valores superaran la columna y se truncaran al guardar, mientras que otros quedaban innecesariamente limitados. Ahora cada campo tiene su propio máximo, tomado de la definición de la tabla.

El cambio se aplicó en campañas, cotizaciones, entidades, facturación, kanban, máquinas, productos, reservas de espacios, servicios, sistema, terceros, usuarios, vehículos, bodegas, archivos e IA. Los formularios siguen respondiendo con el mismo formato de error; solo cambia el límite aplicado a cada campo.

La matriz completa de campo, tabla, tipo y largo queda documentada en `projects/migracion-validar-largo-maximo-por-campo/implementation/migracion.csv`.
