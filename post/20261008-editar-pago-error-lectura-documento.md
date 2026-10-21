---
title: Editar un pago ya no devuelve una respuesta vacía cuando falla la lectura del documento
tags:
  - facturacion
  - pagos
  - qa
---

# Editar un pago ya no devuelve una respuesta vacía cuando falla la lectura del documento

Si al editar un pago el sistema no podía leer el documento asociado, la pantalla quedaba sin respuesta. Ahora muestra el error correspondiente.

## Qué cambia

- **Mensaje de error visible:** el usuario recibe «Error al operar con la Base de Datos» en vez de una respuesta vacía.
