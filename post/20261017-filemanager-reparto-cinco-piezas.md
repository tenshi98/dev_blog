---
title: FileManager ya no es una clase que lo hace todo: reparto en cinco piezas
tags:
  - arquitectura
  - refactor
  - filemanager
  - mantenibilidad
  - seguridad
  - sdd
---

# FileManager ya no es una clase que lo hace todo: reparto en cinco piezas

La clase que gestiona los archivos del sistema (`FileManager`) ha dejado de ser un archivo enorme que hacía cinco cosas a la vez. Ahora su trabajo está repartido en cinco piezas especializadas y ella actúa como una puerta única que sigue ofreciendo exactamente las mismas funciones que antes.

## Qué cambia

`FileManager` concentraba decisiones que no tienen nada que ver entre sí: qué tipos de archivo se permiten, cómo se limpian las rutas peligrosas, cómo se detecta el tipo real de un archivo, cómo se sube y cómo se navega por las carpetas. Con casi 1.500 líneas, revisar su seguridad era costoso y cualquier cambio obligaba a entenderlo entero.

El trabajo se ha repartido en cinco piezas, cada una con una única responsabilidad:

- **reglas de archivos** (qué se bloquea y qué se permite);
- **limpieza de rutas** (evitar accesos no deseados);
- **lectura del tipo real** de cada archivo a partir de su contenido;
- **subida y validación** de archivos;
- **explorador y carpetas**.

`FileManager` se queda como una **fachada**: quien lo usa no cambia nada — las mismas funciones, los mismos resultados y los mismos mensajes — pero por dentro ahora el trabajo lo hacen piezas pequeñas y fáciles de auditar.

El valor para el usuario: el sistema se comporta igual, pero la seguridad de las subidas es mucho más fácil de revisar (cada control tiene un único hogar) y añadir mejoras futuras no obliga a leer un archivo gigante.
