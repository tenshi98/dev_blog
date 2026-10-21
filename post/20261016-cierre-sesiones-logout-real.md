---
title: Cerrar sesión ahora cierra de verdad: la cookie y la base de datos vuelven al unísono
tags:
  - seguridad
  - sesiones
  - logout
  - cookies
  - tokens
---

# Cerrar sesión ahora cierra de verdad: la cookie y la base de datos vuelven al unísono

Cerramos el hallazgo pendiente del logout: al pulsar "cerrar sesión" ahora se borra realmente la cookie de sesión (antes no coincidía la ruta y sobrevivía), se desactivan las sesiones en base de datos (antes una validación impedía la actualización) y el token de sesión se guarda siempre en dos lugares a la vez, de modo que la sesión puede restaurarse de forma fiable.

## Qué cambia

- **Cerrar sesión cierra de verdad**: la cookie se elimina con la misma ruta con la que se creó, así que el navegador la descarta de inmediato; antes seguía siendo válida y permitía volver a entrar sin contraseña.
- **Un solo uso real de cada sesión**: las sesiones anteriores del usuario quedan marcadas como cerradas en la base de datos al salir (y al entrar), por lo que una copia vieja de la cookie ya no sirve para nadie más.
- **Sesión que se recupera sin sorpresas**: cada vez que el sistema renueva el token de sesión, el nuevo valor se guarda también en base de datos; así, si el navegador pierde la sesión interna, con la cookie se recupera el acceso y la seguridad sigue intacta (el token rota en ambos lados).
- **Recovery y reset más sólidos**: el flujo de recuperación de contraseña que desactiva sesiones ahora surte efecto completo, cerrando también sus ramas de prueba documentadas.
