---
title: Facturación completa su red de pruebas: siete fases, de documentos a informes
tags:
  - testing
  - facturacion
  - qa
---

# Facturación completa su red de pruebas: siete fases, de documentos a informes

El módulo de Facturación cubrió sus siete controladores con pruebas automáticas que revisan estructura, rutas, permisos, pantallas, validación y seguridad sin tocar la base de datos. En el camino aparecieron varios puntos débiles reales —rutas huérfanas, un identificador sin tratar y una inyección SQL— que quedaron corregidos en la misma pasada.

## Fase 1: documentos de compra y venta

El controlador principal de documentos estrenó nueve suites con más de 500 comprobaciones. Cubre compras y ventas por igual: listados, filtros, detalle por pestañas, impresión, creación, edición y borrado, con los permisos de cada nivel y la bodega que corresponde a cada tipo.

La fase corrigió tres puntos débiles: la desinstalación ahora retira las rutas de todos los componentes (guías, pagos, items, productos y servicios), el recálculo de montos trata el número de documento siempre como entero y la ruta de borrado de archivos —que existía sin implementación— responde de forma neutra porque el módulo no guarda archivos.

## Fase 2: guías de despacho

La asociación de guías suma ocho suites. Al ejecutarlas se corrigieron dos fallos reales: el selector de guías salía siempre vacío y, en ventas, la pantalla usaba los permisos de compras.

Ahora el selector lista las guías pendientes de la misma entidad, las pantallas de una venta respetan su permiso y su ruta, y asociar o quitar una guía actualiza el estado de pago y recalcula el documento dentro de una misma transacción.

## Fase 3: líneas libres (Items)

El detalle de líneas libres tiene ocho suites con alta, edición y borrado. Cada operación se ejecuta en una transacción que recalcula los montos del documento.

Se comprueba que editar y borrar solo aparezcan mientras el documento está pendiente de pago, que cada ruta use el permiso y los endpoints de su tipo y que los identificadores viajen cifrados.

## Fase 4: pagos

El registro de pagos suma ocho suites. Al ejecutarlas apareció una vulnerabilidad de inyección SQL en el cálculo del monto pagado: se usaban números enviados desde el navegador sin comprobarlos. Ahora se tratan siempre como enteros.

También se verifican las reglas de negocio: un pago no puede superar el valor del documento y el documento pasa a «pagado» cuando los pagos igualan o superan su total, y vuelve a «pendiente» si se borra un pago. Las acciones de editar y borrar solo aparecen con el documento pendiente.

## Fase 5: productos

El detalle de productos suma ocho suites, con especial atención al movimiento de stock. Se verifica que solo ocurra cuando la empresa lo tiene activado, que las compras ingresen a la bodega de ingreso y las ventas descuenten de la de egreso, y que todo se revierta junto si algún paso falla.

El selector solo ofrece las bodegas permitidas para el usuario cuando así está configurado, y ningún dato del navegador se concatena en las consultas.

## Fase 6: servicios

Los servicios de los documentos tienen ocho suites con alta, edición y borrado en compras y ventas, cada operación en una transacción que recalcula los montos. Los formularios solo ofrecen servicios activos y editar o borrar solo aparece mientras el documento está pendiente de pago.

## Fase 7: informe de búsqueda

El informe de búsqueda cierra la cobertura con siete suites, incluida una que garantiza que sea estrictamente de solo lectura. Se comprueban los filtros por documento, número, entidad, fechas, estado de pago y tipo de movimiento, además de los resultados para personas y empresas y los identificadores cifrados.
