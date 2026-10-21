---
title: Los almacenes ahora modelan pasillos dobles: racks enfrentados con un corredor ancho
tags:
  - bodegas
  - threejs
  - 3d
  - visualizacion
  - distribucion
  - pasillo-doble
  - racks
---

# Los almacenes ahora modelan pasillos dobles: racks enfrentados con un corredor ancho

Ya se pueden dibujar «pasillos dobles» reales: dos racks distintos, uno a cada lado, enfrentados con un corredor ancho entre ambos. Se eligen desde un nuevo desplegable «Enfrentar con» en el formulario de racks, y la vista 3D los coloca enfrentados automáticamente (tanto si el pasillo es horizontal como vertical).

## Qué cambia

- **Enlazar dos racks como gemelos**: al crear o editar un rack aparece «Enfrentar con (pasillo doble)», un desplegable con los otros racks del mismo pasillo (o «Sin gemelo»). El enlace es simétrico: si A se enfrenta a B, B queda enfrentado a A.
- **Vista 3D de pasillo doble**: dos racks enlazados se dibujan enfrentados, separados por un corredor más ancho que el pasillo normal, en horizontal (uno detrás de otro) o en vertical (lado a lado). Cada rack conserva su propio color/etiqueta, así que el enfoque por rack sigue funcionando.
- **Listado de racks**: aparece un badge con el nombre del rack gemelo junto al rack que tiene pareja, para ver de un vistazo qué racks forman un pasillo doble.
- **Borrado seguro**: al borrar un rack se desvincula automáticamente de su gemelo en ambos sentidos.
