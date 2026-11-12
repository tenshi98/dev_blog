---
title: Los gráficos del informe de campañas ahora siguen el orden de las fechas
tags:
  - Campañas
  - Informes
  - Gráficos
---

# Los gráficos del informe de campañas ahora siguen el orden de las fechas

## Resumen

Los gráficos del detalle de campañas ordenan los productos alfabéticamente y, dentro de cada uno, las campañas de más antigua a más reciente. Antes las campañas aparecían en el orden interno de la base de datos.

## Descripción

### Contexto

El informe de detalle de campañas muestra un gráfico por producto. La consulta de campañas devuelve los registros del más nuevo al más antiguo, y ese era el orden que heredaba el eje del gráfico, por lo que la comparación visual no seguía una línea temporal.

### Porqué

Para comparar la evolución de costos, ventas, pérdidas y margen entre campañas, el eje debe leerse de izquierda a derecha en orden cronológico. También conviene que los productos aparezcan siempre en el mismo orden alfabético.

### Descripción

Se añadió la fecha de la campaña a los datos que alimentan los gráficos y se ordenan las etiquetas del eje por fecha ascendente, usando el identificador como desempate cuando dos campañas comparten fecha. Los productos se ordenan alfabéticamente sin distinguir mayúsculas de minúsculas. El cambio no altera la tabla de resultados ni las consultas de importes.

## Contenido del cambio

- Eje de los gráficos en orden cronológico, de la campaña más antigua a la más reciente.
- Productos ordenados alfabéticamente, con un orden estable entre búsquedas.
- Sin cambios en los importes, en la tabla ni en los permisos.

## Notas

No requiere ninguna acción por parte de los usuarios.
