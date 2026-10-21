---
title: Los movimientos de bodega ahora registran en qué posición física queda cada producto
tags:
  - bodegas
  - movimientos
  - posiciones
  - stock
  - distribucion-fisica
---

# Los movimientos de bodega ahora registran en qué posición física queda cada producto

Al ingresar, egresar o traspasar productos en una bodega, el formulario permite indicar opcionalmente la posición física (rack/nivel) donde queda la mercancía. El sistema valida que la posición exista y pertenezca a la bodega del movimiento, y la muestra en el listado de productos del movimiento.

## Qué cambia

Con la distribución física de bodegas (zonas, pasillos, racks y posiciones) ya disponible, el siguiente paso lógico era **conectar los movimientos de mercancía con esas posiciones**. Ahora, al agregar un producto a un ingreso, egreso o traspaso, aparece un selector opcional de «Posición» con las posiciones vigentes de la bodega correspondiente (en traspasos, de las dos bodegas involucradas):

- **Alta y edición**: se elige la posición donde queda el producto; es opcional para no romper flujos existentes (como los movimientos generados desde facturación). Al editar, volver a dejar la posición vacía la quita del registro.
- **Validación**: si se indica una posición inexistente o de otra bodega, el sistema rechaza la operación con un mensaje claro, evitando datos incoherentes.
- **Visibilidad**: la tabla de productos del movimiento muestra una columna «Posición» con el código de la ubicación física, para que el operador sepa sin salir de la pantalla dónde buscar la mercancía.

La administración de las posiciones (crear racks, niveles y códigos) sigue en el módulo de distribución física de cada bodega; aquí solo se usa lo que ya existe.
