---
title: Máquinas — Sensores: CRUD de grupos/subgrupos y administrador JSON en el tab de la máquina
tags:
  - maquinas
  - sensores
  - sdd
  - grupos
  - subgrupos
  - json
  - formSelectDepend
  - KvSortable
  - implementation
---

# Máquinas — Sensores: CRUD de grupos/subgrupos y administrador JSON en el tab de la máquina

Se implementa el nuevo administrador de sensores de máquinas: un CRUD de Grupos y Subgrupos de sensores y un tab donde cada máquina define N sensores dinámicos y ordenables —Nombre, Grupo, Subgrupo, Unidad de Medida y Estado— guardados como arreglo JSON en la propia máquina.

## Qué cambia

- **Catálogos de sensores**: se podrán crear "Grupos" (p. ej. Motor, Eléctrico) y "Subgrupos" dependientes de cada grupo. El listado de subgrupos se muestra agrupado por su grupo, igual que el "Listado de Permisos".
- **Administrador de sensores por máquina**: en el tab "Sensores" se listan todos los sensores de la máquina en su orden; se pueden crear, editar, ver y borrar, y **reordenar arrastrándolos** de arriba hacia abajo, como el orden de widgets de la pantalla principal. La cantidad es libre (de 1 a 100 o más).
- **Datos de cada sensor**: Nombre, Grupo, Subgrupo (con selector dependiente: al elegir el grupo se cargan sus subgrupos), Unidad de Medida (catálogo del sistema) y Estado Sensor. Todos obligatorios.
- **Almacenamiento**: los sensores se guardan dentro de la propia máquina, en una nueva columna en formato JSON, sin crear tablas adicionales de sensores.
- **Permisos**: los catálogos se incorporan bajo la categoría "Mantenimiento Sistema" con los permisos nuevos `Maquinas - Sensores Grupos` y `Maquinas - Sensores Subgrupos`.
- **Reordenamiento**: arrastrar y soltar persiste el orden mediante `KvSortable` 1.5.1 y el endpoint `POST .../sensores/order`; la inicialización se rehace tras cada recarga AJAX mediante `callFNC:'initSensoresSortable'`.
