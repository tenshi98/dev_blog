---
title: Las bodegas ahora se pueden recorrer en 3D desde el navegador
tags:
  - bodegas
  - threejs
  - 3d
  - visualizacion
  - distribucion
---

# Las bodegas ahora se pueden recorrer en 3D desde el navegador

La pestaña «Visual» del resumen de cada bodega ahora muestra una vista tridimensional interactiva del almacén: cada rack aparece como un estante real con sus niveles y posiciones coloreadas según su estado (disponible, bloqueada, reservada, desactivada). Se puede rotar, hacer zoom y hacer clic en cualquier posición para ver su detalle, todo sin instalar nada extra en el navegador.

## Qué cambia

Antes, la única forma de entender la distribución de una bodega era mirar un árbol de texto o un mapa plano de botones. Ahora, al abrir la pestaña «Visual», se genera una réplica 3D del almacén donde:

- **Cada rack se ve como un estante físico**, con tantos niveles y casillas como se hayan configurado.
- **Los colores indican el estado real** de cada posición en el momento de la consulta (verde = disponible, rojo = bloqueada, amarillo = reservada, gris = desactivada), igual que en el mapa 2D pero con profundidad.
- **La orientación de los pasillos se respeta**: los pasillos horizontales y verticales se dibujan con los racks girados correctamente.
- **Se puede explorar**: arrastrar para rotar la vista, rueda del ratón para acercar/alejar, y un botón para reiniciar la cámara o activar una rotación automática.
- **Clic en cualquier posición** abre el mismo formulario de detalle/estado que ya existía en el mapa, sin perder el contexto espacial.
- Las zonas del almacén se muestran como áreas de suelo tintadas con el color del tipo de zona (almacenamiento, recepción, despacho, etc.).

La vista carga solo three.js la primera vez que se abre la pestaña (y se reutiliza en visitas posteriores), por lo que no ralentiza el resto del módulo. Si la bodega aún no tiene zonas ni racks, se muestra un mensaje claro indicando cómo crear la distribución.
