---
title: Endurecimiento del login: anti-enumeración, IP real en LAN y dispositivo móvil en sesión
tags:
  - seguridad
  - login
  - anti-enumeracion
  - csrf
  - ip
  - movil
  - sdd
---

# Endurecimiento del login: anti-enumeración, IP real en LAN y dispositivo móvil en sesión

Se corrigió el bug que devolvía `false` al obtener la IP del cliente en redes locales (el bloqueo por IP de fuerza bruta no funcionaba en LAN/dev), se eliminó la enumeración de usuarios del login (todos los fallos de credencial devuelven ahora el mismo 401, con equalización de timing) y se integró la detección de dispositivo móvil en la sesión del usuario.

## Qué cambia

- **IP real en LAN**: `getClientIp()` ahora acepta IPs privadas (`127.0.0.1`, `192.168.x.x`, `10.x`, etc.) y hace fallback a `REMOTE_ADDR` si ninguna cabecera HTTP produce una IP válida. Ello activa el bloqueo por IP de fuerza bruta en entornos de desarrollo y LAN, que antes quedaba inútil (la IP se registraba como vacía).
- **Login sin enumeración de usuarios**: un atacante que pruebe emails ya no puede distinguir si una cuenta existe o no por el código de respuesta — todos los fallos de credencial (email inexistente, contraseña incorrecta, cuenta sin hash) devuelven el mismo `401 "Credenciales incorrectas"`, y el tiempo de respuesta se equaliza con una verificación ficticia contra un hash dummy. El `403 "Usuario Inactivo"` solo aparece cuando la contraseña es correcta (solo quien ya conoce la contraseña llega a verlo).
- **Dispositivo móvil en sesión**: la sesión del usuario ahora incluye un flag `DeviceMobile` (derivado del User-Agent), disponible para futuras alertas de "nuevo dispositivo" o ajustes de UX móvil.
- **CSRF del login verificado**: se confirmó que `POST /login` ya valida el token CSRF correctamente y que la sesión de invitado (pre-login) solo porta el token, sin datos sensibles; se documentó en `security.md`.
