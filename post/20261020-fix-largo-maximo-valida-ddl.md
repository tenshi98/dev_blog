---
title: Ajuste de límites de longitud válidos al DDL de columna
tags:
  - validacion
  - ddl
  - truncamiento
  - largo-maximo
date: 2026-10-20
---
# Ajuste de límites de longitud válidos al DDL de columna

## Resumen

Se corrigieron doce reglas de validación de longitud máxima (`ValidarLargoMaximoN`) que aceptaban 255 caracteres en columnas de base de datos más cortas (60 o 120), evitando truncamiento silencioso al guardar productos, documentos de facturación/cobranza, vehículos, usuarios, terceros, sistemas y permisos.

## Contenido del cambio

Al guardar o editar registros en los módulos de productos, facturación/cobranza, vehículos, usuarios, terceros, sistemas y permisos, el servidor ya no aceptará valores de texto que superen la longitud real de la columna de la base de datos. Los límites se ajustaron al tamaño exacto de cada campo (por ejemplo, `N_Doc` pasa de 255 a 60 y `Patente` de 255 a 120), evitando que los datos se corten al escribirse.
