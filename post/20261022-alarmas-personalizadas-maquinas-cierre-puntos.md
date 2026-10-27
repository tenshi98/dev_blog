---
title: Alarmas personalizadas: ayuda del tipo fuera de horario y rango de porcentaje
tags:
  - maquinas
  - alarmas
  - sdd
  - documentacion
date: 2026-10-22
---
# Alarmas personalizadas: ayuda del tipo fuera de horario y rango de porcentaje

## Resumen

Se completó la documentación del proyecto de alarmas personalizadas con el texto de ayuda que faltaba para el tipo "Sensor funcionando fuera de horario". Además, se confirmó que el porcentaje de diferencia entre sensores debe mantenerse entre 0 y 100.

## Contenido del cambio

El formulario de alarmas ya tiene definido qué explicar cuando se elige el tipo "Sensor funcionando fuera de horario": el sistema avisará cuando el sensor se encuentre activo fuera del horario establecido entre la hora de inicio y la hora de término.

También quedó confirmado que el campo de porcentaje de diferencia solo acepta valores entre 0 y 100, lo que evita configuraciones ambiguas o fuera de rango.

Con esto, el diseño del formulario queda completo para los ocho tipos de alarma y no quedan dudas sobre la validación del porcentaje.
