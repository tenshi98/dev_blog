---
title: Recuperación de contraseña por enlace: adiós a las contraseñas enviadas por correo
tags:
  - seguridad
  - contrasenas
  - recuperacion
  - tokens
  - email
---

# Recuperación de contraseña por enlace: adiós a las contraseñas enviadas por correo

La recuperación de contraseña del admin ya no envía una contraseña generada por correo: ahora envía un enlace de un solo uso, válido 60 minutos, con el que cada usuario elige su propia contraseña. Además, solicitar la recuperación responde siempre igual aunque el correo no exista, para que nadie pueda averiguar quién tiene cuenta.

## Qué cambia

- **Un enlace, no una contraseña**: "Olvidé mi contraseña" llega al correo con un enlace personal que caduca en una hora y solo sirve una vez; la contraseña nueva la define el propio usuario y nunca queda escrita en el correo.
- **Más privado**: pedir la recuperación con un correo que no existe, con uno desactivado o con uno real devuelve exactamente la misma respuesta, así que nadie puede usar el formulario para comprobar si alguien tiene cuenta en la plataforma.
- **Menos ventanas abiertas**: al definir la contraseña nueva se invalidan los enlaces anteriores y se cierran las sesiones activas del usuario (siguiendo el mismo mecanismo que el botón de "cerrar sesión"), y cada solicitud recente limita los reintentos.
- **Sin cambios para quien sí recuerda su contraseña**: login, cambio desde el perfil y el resto de flujos siguen igual; solo cambia el camino de "olvidé mi contraseña".
