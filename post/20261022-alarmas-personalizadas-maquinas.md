---
title: Alarmas personalizadas por máquina: diseño funcional y técnico
tags:
  - maquinas
  - alarmas
  - sdd
  - sensores
  - json
date: 2026-10-22
---
# Alarmas personalizadas por máquina: diseño funcional y técnico

## Resumen

Se definió el diseño completo del nuevo administrador de alarmas personalizadas por máquina, basado en los sensores ya configurados. El proyecto incluye ocho tipos de alarma, prioridades, validaciones…

## Contenido del cambio

El tab de Alarmas Personalizadas de una máquina dejará de ser una copia sin uso del gestor de documentos y pasará a ser un administrador real de alarmas. Cada alarma podrá configurarse con su tipo, prioridad, límite de errores, unidad de medida, estado y uno o más sensores activos.

El diseño contempla ocho tipos de alarma: alertas por rango, por valor específico, por errores conjuntos, por promedios y por porcentaje de diferencia entre sensores, además de la detección de sensores funcionando fuera de horario. El formulario mostrará únicamente los campos que correspondan al tipo elegido y explicará con textos claros qué significa cada configuración.

La información se guardará junto a la ficha de la máquina, igual que ya ocurre con sus sensores, y las alarmas se podrán ver, crear, editar y eliminar desde el mismo tab. El listado se presentará en tarjetas desplegables para facilitar la lectura, sin arrastre ni reordenamiento manual.
