---
title: Guardar una máquina responde 400 cuando el fallo es de validación, no 500
tags:
  - maquinas
  - api
  - errores
  - core
---

# Guardar una máquina responde 400 cuando el fallo es de validación, no 500

Las respuestas de error de los servicios de máquinas ahora distinguen entre datos inválidos (400, con el mensaje concreto) y fallos reales de base de datos (500). Además se corrigió un clasificador de errores que estaba devolviendo 400 cuando correspondía 500.

## Qué cambia

- **Errores claros y correctos**: si el formulario trae un nombre duplicado, un archivo demasiado grande o un campo obligatorio vacío, el sistema responde 400 con el mensaje exacto del problema, en lugar de un genérico "Error al operar con la Base de Datos" con código 500.
- **Fallo de base de datos bien identificado**: los fallos internos de la base de datos quedan en 500; se corrigió un clasificador que los marcaba erróneamente como 400.
- **Patrón único y reutilizable**: la lógica de "revertir la operación y responder según el origen del fallo" ahora vive en la clase base de los controladores, de modo que todos los módulos pueden usarla de forma consistente.
- La pantalla de administración no cambia su comportamiento visible: los mismos mensajes se muestran en la notificación.
