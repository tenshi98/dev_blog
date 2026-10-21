---
title: Métodos reorganizados por tema en las utilidades PHP de la plataforma
tags:
  - refactor
  - functions
  - php
  - arquitectura
  - sdd
---

# Métodos reorganizados por tema en las utilidades PHP de la plataforma

Se reorganizaron los métodos de las 22 clases de `vendors/application/functions/` agrupándolos por tema y extrayendo 16 métodos huérfanos a 10 clases/ficheros nuevos (archivos, colores, clima, shell, indicadores, preview, feed, radio y explorador de archivos). Todos los call-sites del admin fueron migrados; la validación pasó al 100% (1050 pruebas de funciones + 358 aserciones de suites).

## Qué cambia

La capa de utilidades PHP de la plataforma quedó reorganizada para que cada clase tenga una responsabilidad clara y sus métodos estén agrupados por tema, lo que facilita localizar código y mantenerlo:

- **Reordenación interna** de 14 clases (fechas, números, texto, SQL, validaciones, seguridad, ubicación, formularios y vistas) sin cambiar una sola firma.
- **Nuevas clases especializadas**: manejo de archivos (`FunctionsCommonFiles`), colorimetría (`FunctionsCommonColors`), comandos de sistema (`FunctionsServerShell`), widgets de indicadores, vista previa, feed, radio y explorador de archivos, y widget meteorológico (`UIWidgetsWeather`).
- **`UIWidgetsCommon` pasó de ~3000 a ~500 líneas**, conservando sólo lo que realmente es común (alertas, pestañas, acordeones, tablas responsivas).
- Todos los call-sites del panel de administración fueron migrados a las nuevas clases; los cinco sitios web externos no se vieron afectados (no usaban estas utilidades).
