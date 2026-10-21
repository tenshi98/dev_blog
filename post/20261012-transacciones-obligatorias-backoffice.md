---
title: Transacciones obligatorias en todo el backoffice
tags:
  - php
  - base-de-datos
  - transacciones
  - integridad
  - estandar
---

# Transacciones obligatorias en todo el backoffice

Homogeneizamos el motor para que **cada operación de escritura** del panel de administración (crear, editar y borrar) se ejecute dentro de una transacción de base de datos. Si algo falla a mitad de camino, todo se revierte y no quedan datos a medias. Es un estándar nuevo, aplicado de forma uniforme en los 20 módulos del backoffice.

## Qué cambia

Imagina que al guardar un registro el sistema tiene que escribir en dos tablas (por ejemplo, el dato y su historial de cambios). Si la segunda escritura fallaba, antes podía quedar el registro "a medias". Ahora, gracias a las transacciones, **o se guarda todo o no se guarda nada**: ante cualquier error el sistema deshace automáticamente lo hecho hasta ese momento.

Este comportamiento ya existía en los módulos más complejos (facturación, campañas, cotizaciones, tableros kanban…), pero faltaba en muchas pantallas de mantenimiento (categorías, contactos, documentos, observaciones, alarmas, sensores, tipos, unidades…). Con este cierre, **todo el backoffice queda bajo el mismo paraguas de seguridad de datos**.

Beneficios concretos:

- **Datos coherentes**: adiós a los registros huérfanos o parciales ante un fallo.
- **Base uniforme para el futuro**: cualquier pantalla nueva arranca ya protegida, y si mañana se le añade una segunda escritura, la transacción ya está montada.
- **Menos sorpresas en soporte**: los errores de base de datos se manejan de forma consistente en todos los módulos.

Además, actualizamos las pruebas automáticas afectadas para que verifiquen este nuevo estándar (que cada operación abra, confirme y, si hace falta, revierta su transacción).
