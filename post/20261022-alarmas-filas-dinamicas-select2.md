---
title: Alarmas de máquinas: alta sin filas precargadas y sensores dinámicos confiables
tags:
  - maquinas
  - alarmas
  - formularios
  - select2
date: 2026-10-22
---
# Alarmas de máquinas: alta sin filas precargadas y sensores dinámicos confiables

## Resumen

El formulario de nueva alarma ahora se abre sin filas de sensor precargadas. Además, cada fila que se agrega con el botón "Agregar Sensor" funciona de forma independiente, sin que su selector de sentido modifique filas anteriores.

## Contenido del cambio

Al crear una alarma, el usuario ya no encuentra una fila de sensor agregada por defecto: el formulario parte limpio y solo muestra las filas que él decida agregar con "Agregar Sensor".

También se corrigió el comportamiento de los selectores de sensores en las filas nuevas. Antes, al agregar varias filas, el selector de una fila podía abrir o actualizar el de otra fila ya existente. Ahora cada fila mantiene su propio selector y sus propios valores, tanto en el alta como en la edición de alarmas.
