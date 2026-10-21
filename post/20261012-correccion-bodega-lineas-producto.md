---
title: Corregido: los documentos con uso de bodega volvían a poder crear líneas de producto
tags:
  - facturacion
  - bodegas
  - stock
  - correccion
---

# Corregido: los documentos con uso de bodega volvían a poder crear líneas de producto

Al agregar un producto a un documento (compra o venta) configurado para manejar stock en bodega, el sistema respondía un error «Debe indicar una bodega válida» y revertía todo. La causa era un desajuste interno de nombres entre módulos; corregido y cubierto con pruebas que impiden que vuelva a ocurrir.

## Qué cambia

Cuando una empresa trabaja con bodegas activadas en sus documentos comerciales, cada producto agregado a una compra o venta debe además registrar el movimiento de stock en la bodega correspondiente. Este proceso estaba roto: el módulo de facturación envía la indicación de bodega con un nombre de campo y el módulo de bodegas esperaba otro ligeramente distinto, por lo que el sistema interpretaba que faltaba la bodega y rechazaba la operación completa (el documento no se podía completar).

Con la corrección, agregar, editar o quitar productos de un documento con bodega activada vuelve a funcionar: la línea se crea y el stock de la bodega se actualiza de forma atómica. Se añadieron verificaciones automáticas —tanto estáticas como de comportamiento— en ambos módulos para que una discrepancia similar sea detectada de inmediato en lugar de pasar desapercibida.
