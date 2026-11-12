---
title: La fecha de cada campaña aparece al pasar el cursor por el gráfico
tags:
  - Campañas
  - Informes
  - Gráficos
---

# La fecha de cada campaña aparece al pasar el cursor por el gráfico

## Resumen

El detalle de campañas muestra ahora, al pasar el cursor sobre un punto del gráfico, el nombre de la campaña y su fecha en una línea aparte. Antes solo se veía el nombre.

## Descripción

### Contexto

Los gráficos del informe de detalle de campañas tienen una etiqueta por campaña en el eje horizontal. El cuadro que aparece al pasar el cursor (tooltip) mostraba únicamente esa etiqueta, sin la fecha, por lo que dos campañas con nombres parecidos podían confundirse.

### Porqué

Al comparar costos, ventas, pérdidas y margen entre campañas, la fecha es el dato que permite situar cada punto en el tiempo. El usuario pidió verla junto al nombre, en una segunda línea para no recargar el encabezado.

### Descripción

Se añadió la fecha de cada campaña a los datos que alimentan los gráficos, con el mismo orden que las etiquetas del eje. El título del tooltip se compone ahora como "Campaña <nombre> / Fecha :" y la fecha aparece en la línea siguiente. El eje horizontal sigue mostrando solo el nombre, y los valores de las series mantienen el formato en pesos.

## Contenido del cambio

- Tooltip con nombre de campaña y fecha en dos líneas.
- Etiquetas del eje sin cambios, para mantener el gráfico legible.
- Formato de fecha día-mes-año.

## Notas

No requiere ninguna acción por parte de los usuarios.
