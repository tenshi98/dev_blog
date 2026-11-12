---
title: "Borrado con guarda: ahora responde 400"
tags:
  - arquitectura
  - plantillas
---

# Borrado con guarda: ahora responde 400

## Descripción

### Contexto
Las plantillas de borrado con comprobación previa de referencias devolvían 409.

### Porqué
Se unificó con el resto de errores de negocio, ya validado en Estados y Tarifas.

### Detalle
Las tres plantillas afectadas usan 400. El módulo de bodegas conserva 409 por ser anterior a esta decisión.
