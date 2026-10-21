---
title: Corrección de 10 validaciones en functions (días, patentes, teléfonos, censura, horas)
tags:
  - validaciones
  - patentes
  - telefonos
  - censura
  - fechas
  - php
---

# Corrección de 10 validaciones en functions (días, patentes, teléfonos, censura, horas)

Se corrigieron 10 errores de validación y formato en la librería compartida `functions`: días de semana, patentes chilenas, zona horaria, teléfonos, filtro de palabras, cálculo de horas, RUT, decimales, ceros iniciales y corte de texto. Todo validado con 35 pruebas automáticas.

## Qué cambia

- Los días de semana ya no se rompen con valores 0 u 8.
- Las patentes ahora se validan completas, sin aceptar basura al inicio o final.
- Las funciones de fecha ya no cambian la hora del servidor para el resto de la aplicación.
- Los teléfonos muestran mensajes coherentes y los números extranjeros ya no salen corruptos.
- El filtro de palabras detecta insultos aunque lleven coma o punto al lado, sin marcar palabras inocentes.
- El cálculo de horas entre fechas ahora es consistente en todos los casos.
- RUT, decimales, ceros iniciales y textos con tildes/ñ manejan correctamente sus casos borde.
