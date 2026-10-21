---
title: Doble clic y ediciones simultáneas: la plataforma deja de duplicar stock, facturas y reservas
tags:
  - concurrencia
  - bloqueos
  - stock
  - facturacion
  - cotizaciones
  - campanas
  - reservas
  - estabilidad
---

# Doble clic y ediciones simultáneas: la plataforma deja de duplicar stock, facturas y reservas

Cuando dos personas (o la misma persona con doble clic, o dos pestañas) tocan a la vez el mismo dato —una reserva, el stock de un producto, el total de una factura o el costo de una campaña—, la plataforma ahora los hace esperar su turno en lugar de pisarse entre sí. El resultado práctico: se acaban los registros duplicados o triplicados y los totales descuadrados que aparecían en esas condiciones.

## Qué cambia

Los sistemas de gestión multiempresa suelen usarlos varias personas a la vez sobre los mismos datos. Hasta ahora, si dos acciones coincidían en el mismo instante sobre un mismo registro, el sistema podía cometer errores difíciles de detectar después:

- **Reservas de espacios**: dos personas reservaban el mismo espacio en la misma franja y ambas creían tenerlo.
- **Stock e inventario**: dos movimientos de entrada o salida sobre el mismo producto se sobrescribían, dejando el inventario descuadrado.
- **Facturas, cotizaciones y campañas**: dos ediciones a la vez dejaban los totales con valores antiguos (no reflejaban el último cambio) o generaban cobros de más.

La causa no era un fallo visible, sino una condición de carrera: el sistema comprobaba un dato, y antes de guardar su respuesta, otra acción ya lo había cambiado por debajo.

Con este cambio, la plataforma coloca un "turno" sobre el dato compartido en el momento exacto de trabajar con él: si otra acción quiere tocar lo mismo, espera a que la primera termine. Así cada operación parte siempre del dato más reciente y real. No cambia ninguna pantalla ni se pide nada nuevo al usuario; simplemente las acciones concurrentes dejan de pisarse y los datos quedan correctos.
