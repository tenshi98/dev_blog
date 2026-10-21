---
title: El listado de Máquinas estrena pruebas y su instalador deja al descubierto tres puntos débiles
tags:
  - testing
  - maquinas
  - qa
---

# El listado de Máquinas estrena pruebas y su instalador deja al descubierto tres puntos débiles

El CRUD principal de máquinas suma nueve suites automáticas con más de cuatrocientas comprobaciones sobre estructura, rutas, permisos, pantallas, validación y seguridad, sin tocar la base de datos. Al ejecutarlas aparecieron tres puntos débiles del instalador que quedaron corregidos en la misma pasada.

## Qué se cubrió

La batería recorre el listado y el filtro, la ficha por pestañas, la configuración de telemetría, la imagen, los documentos y las observaciones. También comprueba la matriz de permisos de cada nivel y las validaciones de nombre, identificador y horarios.

## Tres fallos reales del instalador

- **Rutas que sobrevivían a la baja:** la desinstalación del módulo dejaba veintiuna rutas sin dueño en los permisos. Ahora se retiran las rutas de sus seis componentes.
- **Tabla instalada incompleta:** el instalador creaba la tabla de máquinas con solo seis columnas, mientras la aplicación escribe y consulta diecisiete. En una instalación nueva, la pantalla de máquinas no podía funcionar.
- **Índices que nunca se creaban:** las cuatro sentencias de índice del instalador se solapaban entre sí y solo sobrevivía una. Ahora cada tabla recibe la suya.
