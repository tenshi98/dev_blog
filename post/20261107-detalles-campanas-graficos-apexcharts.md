---
title: Los gráficos del informe de campañas vuelven a mostrarse
tags:
  - Campañas
  - Informes
  - Gráficos
---

# Los gráficos del informe de campañas vuelven a mostrarse

## Resumen

El informe de detalle de campañas ya pinta un gráfico por producto con costos, ventas, pérdidas y margen, comparando las campañas del filtro. Antes la sección de gráficos aparecía vacía y la tabla podía fallar cuando el filtro no encontraba campañas.

## Descripción

### Contexto

La pantalla "Detalle Campañas" permite filtrar por rango de fechas, estado, campaña y producto. Sobre la tabla de resultados se mostraba un bloque de gráficos por producto que nunca llegaba a dibujarse: el navegador buscaba una librería de gráficos que la aplicación no carga y el dibujo se lanzaba en un momento en que la página ya estaba cargada, por lo que el evento esperado no ocurría.

Además, los datos que debían alimentar esos gráficos nunca se enviaban desde el servidor y el nombre del producto llegaba vacío. Del lado de las consultas, el resumen de pérdidas podía atribuir importes a una campaña distinta de la real.

### Porqué

El informe existe para comparar el resultado de cada campaña por producto. Sin gráficos, esa comparación obliga a leer la tabla completa y no hay una lectura visual del margen. En el caso de filtros sin resultados, la pantalla mostraba un error en lugar de una tabla vacía.

### Descripción

Se alineó la vista con el mismo patrón que ya usan los widgets del panel principal: los datos se preparan en el servidor y se imprimen en la página, y el gráfico se crea con la librería que la aplicación ya carga (ApexCharts). Cada producto tiene su propio gráfico, con una etiqueta por campaña y cuatro series: costos, ventas, pérdidas y margen (ventas menos costos).

También se corrigió la consulta que resumía las pérdidas para que agrupe por campaña y producto, se evitó un error de base de datos cuando el filtro no devuelve ninguna campaña y se completó el nombre del producto desde cualquiera de las tres fuentes de datos. La tabla conserva su estructura y ahora escapa los textos que provienen de la base de datos.

## Contenido del cambio

- Gráficos de área por producto en el informe de detalle de campañas, con tooltip en pesos y etiquetas de campaña.
- La sección de gráficos se redibuja correctamente al repetir la búsqueda, sin acumular gráficos anteriores.
- Filtros sin resultados muestran la tabla vacía, no un error.
- Los importes de pérdidas quedan asociados a su campaña real.
- Nombres de producto siempre visibles en la tabla y en los gráficos.

## Notas

No hay cambios en la base de datos, en rutas ni en permisos. No se requiere ninguna acción por parte de los usuarios.
