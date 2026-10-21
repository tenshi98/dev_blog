---
title: Toda la plataforma responde 400 cuando el fallo es de validación: 365 puntos migrados a failOperation
tags:
  - api
  - errores
  - failoperation
  - plataforma
  - core
---

# Toda la plataforma responde 400 cuando el fallo es de validación: 365 puntos migrados a failOperation

Los 365 puntos de error de escritura de todos los módulos del admin ahora usan el mismo mecanismo (`failOperation`): datos inválidos, duplicados o archivos rechazados responden 400 con el mensaje exacto, y solo los fallos reales de base de datos quedan en 500. La migración se hizo por fases (controlador + sus pruebas juntas) con las suites de testing verdes en los 6 módulos con pruebas.

## Qué cambia

- **Mensajes de error correctos en todo el admin**: si un formulario trae un campo obligatorio vacío, un código duplicado o un archivo demasiado grande, el sistema responde 400 con el mensaje concreto del problema en cualquier módulo (entidades, bodegas, cotizaciones, facturación, kanban, campañas, productos, servicios, usuarios, terceros, vehículos, reservas, etc.), en lugar del genérico "Error al operar con la Base de Datos" con código 500.
- **Errores de base de datos bien identificados**: las excepciones reales de SQL siguen respondiendo 500 "Error al operar con la Base de Datos", sin exponer detalles internos.
- **Un solo comportamiento, todos los módulos**: la lógica de "revertir la transacción y responder según el origen del fallo" vive en la clase base; se eliminaron los rollbacks manuales duplicados junto a cada error.
- **La pantalla de administración no cambia**: muestra exactamente los mismos mensajes de notificación que antes; solo cambia el código HTTP de fondo.
- Excepciones documentadas: los instaladores (`installer`, `sistemaInstalacion`) conservan su forma anterior por incompatibilidad técnica; los 500 de negocio (p. ej. "No hay productos ingresados") y los patrones de rollback internos sin respuesta HTTP no se tocaron.
