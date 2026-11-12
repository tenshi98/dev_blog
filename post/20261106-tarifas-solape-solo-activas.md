---
title: "Tarifas: el solape solo mirará las activas"
tags:
  - reservas_servicios
  - tarifas
---

# Tarifas: el solape solo mirará las activas

## Descripción

### Contexto
Al guardar una tarifa se comprueba que su vigencia no se solape con otras del mismo servicio y variante.

### Porqué
Hoy también cuentan las tarifas inactivas, que no deberían impedir guardar una nueva.

### Detalle
Se planificó el cambio para que solo se comparen las activas, con sus pruebas y su revisión. Queda pendiente decidir si una tarifa inactiva que se guarda también salta la comprobación, y que no se podrá repetir la misma fecha de inicio aunque la existente esté inactiva.
