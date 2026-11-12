---
title: "Cobertura: guarda de Recargo negativo"
tags:
  - fix
  - cobertura
---

# Cobertura: guarda de Recargo negativo

## Descripción

### Contexto
Revisión de TASK-007.4 sobre el CRUD Resumen de Cobertura.

### Porqué
`Recargo` aceptaba valores negativos frente a una columna `decimal unsigned`, lo que daba un 500 genérico.

### Descripción
Insert y Update rechazan un `Recargo` negativo con rollback y un 400 claro. Se corrigió además el criterio de aceptación de TASK-007.1.12 para reflejar que `contarReservasFuturas` devuelve el array de `Base_GetCountData`. Verificado solo con `php -l`.
