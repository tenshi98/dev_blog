---
title: "Bloqueos de agenda: guarda Manual, validaciones previas al lock y errores 400/500 exactos"
tags:
  - reserva-servicios
  - bloqueos
  - fix
---

# Bloqueos de agenda: guarda Manual, validaciones previas al lock y errores 400/500 exactos

## Descripción

### Contexto
La revision de TASK-006.4 detecto que el mantenedor de bloqueos permitia editar y borrar retenciones del portal, devolvia 400 ante fallos de consulta, heredaba reglas no documentadas y tomaba el lock del trabajador antes de validar.

### Porqué
Proteger las retenciones en curso, dar respuestas HTTP correctas y especificar las reglas del modulo.

### Detalle
- Solo se listan, editan y borran bloqueos Manual; las retenciones responden 400.
- Duracion minima de 30 minutos y fecha no anterior a hoy, con mensajes propios.
- El solape con una reserva activa responde 400 (antes 409); otros bloqueos o retenciones no lo provocan.
- Errores de consulta del helper responden 500 generico; un rango de fechas invalido en el filtro responde 400.
- Las validaciones de datos corren antes de abrir la transaccion y tomar el lock.
- Specs actualizadas (RN-018, api, technical con la dependencia del lock de fila del trabajador).

Registro tecnico: `docs/history/2026-11-06_fix-bloqueos-revision--developer.md`.
