---
title: Protección anti-SSRF extendida a descargas, indicadores SII y geocodificación
tags:
  - seguridad
  - ssrf
  - wget
  - sii
  - geocodificacion
---

# Protección anti-SSRF extendida a descargas, indicadores SII y geocodificación

Se extendió la validación de destinos externos a las descargas con `wget`, a la lectura de indicadores del SII y a los tres métodos de geocodificación (Google y OpenStreetMap).

## Qué cambia

- Las descargas en segundo plano ahora rechazan direcciones internas o no permitidas antes de ejecutarse en el servidor.
- La consulta de indicadores económicos valida el destino al ingreso, además de la validación que ya existía en la descarga del XML.
- Las consultas de direcciones y coordenadas verifican el destino antes de contactar al proveedor, registrando el motivo en el log si se bloquea.
