---
title: "Docs: Base_GetByID con 8 claves y recuento de isValidDecrypted en el Delete"
tags:
  - documentacion
  - crud-normal
---

# Docs: Base_GetByID con 8 claves y recuento de isValidDecrypted en el Delete

## Descripción

### Contexto
Las lecturas por id usan `Base_GetByID`, que no necesita `limit`.

### Porqué
Se cerraba una duda recurrente en las revisiones.

### Detalle
Queda documentado que el array-query lleva 8 claves sin `limit` y que no hay que reportarlo. El checklist de CRUD Normal cuenta 2 `isValidDecrypted` (View y GetID) más 1 si el Delete lleva guarda, con una comprobación específica del Delete.
