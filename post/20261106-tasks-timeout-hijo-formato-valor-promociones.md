---
title: "Planificadas dos mejoras en Promociones: pruebas más robustas y valores con % o $"
tags:
  - sdd
  - promociones
---

# Planificadas dos mejoras en Promociones: pruebas más robustas y valores con % o $

## Resumen

Se planifican en tasks dos mejoras de Promociones: un límite de tiempo para las pruebas automáticas y mostrar el valor como porcentaje o monto según el tipo.

## Descripción

### Contexto

Las pruebas de Promociones podían quedarse esperando indefinidamente si un proceso auxiliar se colgaba, y el valor se mostraba solo como número.

### Porqué

Evitar bloqueos en la pantalla de testeos y hacer el valor más legible.

### Descripción

Habrá un corte a los 10 segundos en las pruebas y el valor aparecerá como `25,50 %` o `$ 25.000,50`, con una única función que permitirá añadir tipos nuevos en un solo lugar.

## Contenido del cambio

Solo planificación (tasks TASK-005.8 a 005.14); el código se implementa al ejecutarlas.

## Notas

Sin breaking changes ni acción requerida.
