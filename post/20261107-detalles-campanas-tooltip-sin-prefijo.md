---
title: El tooltip del informe de campañas muestra el nombre tal como aparece en la tabla
tags:
  - Campañas
  - Informes
  - Gráficos
---

# El tooltip del informe de campañas muestra el nombre tal como aparece en la tabla

## Resumen

Al pasar el cursor por un punto del gráfico, el nombre de la campaña aparece ahora tal como se ve en la primera columna de la tabla del informe, sin el prefijo "Campaña". La fecha se mantiene en la línea de abajo.

## Descripción

### Contexto

En la versión anterior del informe, el tooltip de los gráficos anteponía la palabra "Campaña" al nombre del registro para dar contexto. La tabla de resultados, en cambio, muestra ese nombre sin prefijo.

### Porqué

El usuario pidió que el dato del título coincida con el valor que ya conoce de la tabla (columna `Fact.Compra.Nro`), para evitar dos formas distintas de nombrar la misma campaña en la misma pantalla.

### Descripción

Se eliminó el prefijo literal del título del tooltip. Ahora se muestra el nombre de la campaña tal cual y, debajo, la fecha con el formato día-mes-año. No cambian el eje del gráfico, las series ni la tabla.

## Contenido del cambio

- Título del tooltip igual al nombre que aparece en la primera columna de la tabla.
- Fecha de la campaña en la segunda línea, sin cambios.
- Sin modificaciones en los datos ni en los permisos.

## Notas

No requiere ninguna acción por parte de los usuarios.
