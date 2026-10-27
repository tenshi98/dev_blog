---
title: Nuevo proyecto para auditar y completar las validaciones de datos del backoffice
tags:
  - validacion
  - dataCheck
  - base-de-datos
  - sdd
  - calidad
date: 2026-10-20
---
# Nuevo proyecto para auditar y completar las validaciones de datos del backoffice

## Resumen

Se creó un proyecto SDD para comparar las reglas de validación de los formularios con la definición real de las tablas. El objetivo es detectar campos sin validar, exigir largos exactos por columna y mejorar la validación de fechas y horas antes de corregir los controladores.

## Contenido del cambio

El backoffice cuenta con 16 módulos y casi un centenar de controladores que validan los datos de sus formularios mediante `dataCheck`. Hasta ahora no existía una revisión sistemática que confirmara que cada campo enviado por el usuario respeta el tipo y las restricciones de su columna en la base de datos.

El nuevo proyecto define el alcance, las reglas de comparación, las excepciones y las tareas necesarias para auditar los 94 controladores y las 79 tablas de los módulos. También planifica una extensión del motor de validación para comprobar largos exactos por columna y fechas con formato `datetime`, algo que hoy no era posible con las reglas globales.

El resultado esperado es una matriz de cobertura que permita ver, campo por campo, qué está validado, qué falta y qué queda justificadamente fuera de alcance.
