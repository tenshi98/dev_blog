---
title: Endureciendo los modelos del núcleo: correo, archivos e imágenes
tags:
  - seguridad
  - filemanager
  - mailsender
  - imagemanager
  - templaterenderer
  - checkdata
  - sdd
---

# Endureciendo los modelos del núcleo: correo, archivos e imágenes

Hemos implantado las mejoras de seguridad que quedaron planificadas para las clases centrales del sistema: el envío de correo ya no permite colar cabeceras ocultas ni filtra las credenciales del servidor en un error, y tanto la gestión de archivos como el procesamiento de imágenes son más estrictos. Además, dos validaciones internas (edad y dominio de correo) ahora son correctas y más ligeras.

## Qué cambia

Con las decisiones ya tomadas, se ha llevado a la práctica el plan de endurecimiento del núcleo:

- **Correo más seguro**: un remitente o asunto manipulado ya no puede introducir cabeceras ocultas en un envío; si el servidor de correo rechaza el mensaje, el sistema devuelve un fallo claro en lugar de exponer las credenciales de acceso. El cuerpo del mensaje admite HTML (por decisión de negocio), pero el asunto se limpia siempre.
- **Archivos**: se ha ampliado la lista de extensiones peligrosas bloqueadas (`.pht`, `.shtml`, `.php7`, etc.), evitando subidas que pudieran ejecutarse en el servidor.
- **Imágenes**: el procesamiento ya no confía en rutas que puedan venir manipuladas y reconoce formatos modernos como webp y bmp, respondiendo con un fallo controlado ante cualquier formato no soportado.
- **Plantillas**: el motor ya no permite que datos de entrada sobrescriban variables internas.
- **Validaciones**: el cálculo de edad contempla correctamente los bordes (años bisiestos) y la comprobación de dominio de correo evita repetir consultas DNS en la misma petición.

El valor para el usuario: las piezas más sensibles del sistema (archivos, correo, imágenes y validaciones) quedan protegidas frente a los abusos más habituales, sin cambiar cómo se usan desde el resto de la aplicación.
