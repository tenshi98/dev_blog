---
title: Cotizaciones estrena su red de pruebas: del listado al informe, fase por fase
tags:
  - testing
  - cotizaciones
  - qa
---

# Cotizaciones estrena su red de pruebas: del listado al informe, fase por fase

El módulo de Cotizaciones completó una cobertura de pruebas automáticas que recorre toda su operación: la cabecera, las líneas libres, los productos, los servicios y el informe de búsqueda. Las suites se ejecutan desde el panel de testeos del backoffice y no escriben en la base de datos, así que pueden correrse sin riesgo.

## Cobertura de la cabecera

El controlador principal recuperó su batería de nueve suites. Cubre listado, filtro, detalle, impresión, resumen y las operaciones de crear, editar y borrar, además de la matriz de permisos de cada nivel de acceso.

Al ejecutarla apareció un punto débil real: el recálculo de montos usaba el número de cotización tal cual dentro de una consulta. Ahora se trata siempre como entero antes de usarlo, sin cambiar el comportamiento con datos válidos.

## Fase 1: líneas de detalle (Items)

Las líneas de detalle de una cotización estrenaron ocho suites propias. Se revisan estructura, controlador, rutas, permisos, vistas, validación y seguridad.

La fase también dejó dos correcciones: la desinstalación retira ahora las rutas de los sub-recursos (Items, Productos y Servicios), que antes quedaban huérfanas en los permisos, y la ruta `delFiles` —publicada pero sin implementación— responde de forma neutra porque el módulo no guarda archivos.

## Fase 2: líneas libres

La segunda fase amplió la cobertura sobre las líneas libres que se agregan a mano. Comprueba el alta, la edición y el borrado, que cada operación use una transacción y que los montos de la cotización se recalculen.

También verifica las seis rutas de Items contra el instalador, los identificadores cifrados y que los textos con comillas no rompan las pantallas.

## Fase 3: productos

El detalle de productos suma ocho suites. Se cubre el alta, la edición y el borrado dentro de la cotización, la transacción y el recálculo de montos.

Las pantallas se renderizan con datos de ejemplo: la tabla muestra la cantidad con su unidad de medida y los formularios ofrecen el catálogo de productos activos. Los identificadores viajan cifrados y se validan como enteros.

## Fase 4: servicios

El detalle de servicios tiene otras ocho suites con el mismo enfoque: operaciones completas, transacción, recálculo, catálogo de servicios activos e identificadores protegidos.

## Fase 5: informe de búsqueda

El informe de búsqueda cierra la cobertura con siete suites. Una de ellas garantiza que sea estrictamente de solo lectura: no expone creación, edición ni borrado y su permiso es de nivel «solo ver».

Se comprueban los filtros por entidad y rango de fechas, las consultas preparadas, la tabla de resultados para personas y empresas, el estado vacío y los identificadores cifrados.
