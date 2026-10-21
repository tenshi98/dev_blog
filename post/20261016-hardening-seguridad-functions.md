---
title: Hardening de seguridad en la librería functions/ (22 bugs del informe antiguo)
tags:
  - seguridad
  - hardening
  - SSRF
  - XSS
  - functions
  - vendors
---

# Hardening de seguridad en la librería functions/ (22 bugs del informe antiguo)

Se verificó uno a uno el informe de seguridad antiguo y se corrigieron los 22 hallazgos que seguían vigentes en `vendors/application/functions/`: SSRF en clientes HTTP y borrado sin confinamiento de ruta, XSS en formularios/mapas/explorador/indicadores, credenciales expuestas y validaciones faltantes. Todo quedó validado con `php -l` y 69 pruebas de humo en verde.

## Qué cambia

- Las funciones que piden URLs externas o borran/crean carpetas ahora rechazan destinos internos o fuera de las zonas autorizadas, cerrando la puerta a accesos a servicios internos del servidor.
- Los formularios, mapas, explorador de archivos e indicadores escapan correctamente los datos antes de pintarlos, evitando inyección de código en el navegador.
- Las credenciales HTTP Basic ya no aparecen en texto plano en la información del servidor.
- Los envíos de WhatsApp, las consultas de IP/geocodificación y la lectura de XML externo ahora tienen timeouts, errores controlados y registro real de fallos en el log.
- Se eliminó código duplicado en la generación de formularios (rutas de plantilla y popovers centralizados) sin cambiar el comportamiento.
