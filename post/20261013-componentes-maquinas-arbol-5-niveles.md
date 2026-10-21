---
title: Cada máquina ahora puede organizar su equipo en un árbol de hasta 5 niveles
tags:
  - maquinas
  - componentes
  - arbol
  - tareas
  - mantenimiento
  - adjuntos
---

# Cada máquina ahora puede organizar su equipo en un árbol de hasta 5 niveles

El tab «Componentes» del resumen de máquina pasa a ser un árbol real: raíces y subcomponentes hasta 5 niveles de profundidad, cargados bajo demanda, con tareas de mantenimiento por componente, marca «No utilizable», adjunto, detalle con la ruta jerárquica completa y borrado en cascada (incluidos archivos) al eliminar la máquina.

## Qué cambia

- **Árbol de componentes**: crea componentes raíces y anídalos hasta 5 niveles; cada fila muestra tipo (Componente/Subcomponente), la marca «No utilizable» cuando aplique, sus datos básicos y cuántos hijos tiene.
- **Carga diferida**: los hijos de un nodo se descargan solo al expandirlo (una sola vez) y el nodo se puede colapsar de nuevo; la lista no se satura al abrir el resumen.
- **Tareas por componente**: asigna una o varias tareas del catálogo (Utilización Grasa, Aceite, Otros Productos, Inspecciones) al crear o editar; el detalle las lista.
- **Detalle completo (Ver)**: muestra la ruta desde la máquina hasta el nodo (breadcrumb), todos los campos, las tareas y la previsualización del archivo adjunto.
- **Edición confiable**: editar un componente refresca solo el nivel afectado (si es hijo, su lista de hermanos; si es raíz, la lista de raíces).
- **Seguridad y consistencia**: los identificadores viajan cifrados, un 6.º nivel se rechaza con error y el hijo siempre hereda la máquina del padre aunque se manipule el POST.
- **Borrado seguro**: borrar un nodo elimina su subárbol completo con archivos, y borrar la máquina limpia sus componentes, sus tareas relacionadas y sus adjuntos.
