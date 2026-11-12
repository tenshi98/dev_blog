---
title: Controlador de promociones de reserva de servicios
tags: [reservas_servicios, crud-normal, promociones]
---

## Descripción

Se crea `reservaServiciosPromociones.php` en el módulo `reservas_servicios` siguiendo el patrón de Tarifas: listado con filtro (tipo, activo, nombre, rango de VigenciaDesde), vista, edición, alta, edición y borrado. El borrado se rechaza con 400 si la promoción está usada en `reserva_servicios_listado`. La edición deja `VigenciaHasta` en NULL cuando llega vacía.

Registro técnico: `docs/history/2026-11-06_controlador-reserva-servicios-promociones--developer.md`.
