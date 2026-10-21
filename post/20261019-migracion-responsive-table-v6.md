---
title: Migración de fichas resumen: de responsiveTable a table_v6
tags:
  - ui
  - table_v6
  - responsiveTable
  - widgets
  - migracion
  - sdd
---

# Migración de fichas resumen: de responsiveTable a table_v6

Se migraron 63 vistas y 102 llamadas de `responsiveTable` a `table_v6`, unificando las fichas resumen de 17 módulos con el patrón visual de bodegas: tema, iconos, encabezados y botones de copiado en email/teléfono.

## Qué cambia

- **Fichas más consistentes**: los detalles de entidades, reservas, usuarios, máquinas, productos, servicios, terceros, vehículos, documentos, campañas, cotizaciones y perfil usan la misma tarjeta visual.
- **Mejor lectura**: se mantienen los encabezados de sección y se ajusta la densidad de columnas según el contexto (detalle, modal ancho o bloque estrecho).
- **Copiado rápido**: los correos y teléfonos muestran el botón de copiar con el valor original de la base de datos.
- **Sin cambios de datos**: la migración es solo de presentación; no altera tablas, rutas, API ni permisos.
- **Controladores actualizados**: las vistas reciben `Fnc_WidgetsViews` junto con las dependencias que ya usaban.
