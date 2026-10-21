---
title: Cierre functions-vendors-expansion: RF-016, RF-017, RF-018 y documentación de doble registro
tags:
  - functions-vendors-expansion
  - cierre
  - documentación
---

# Cierre functions-vendors-expansion: RF-016, RF-017, RF-018 y documentación de doble registro

Se implementaron las últimas 3 familias de métodos (UIWidgetsCommon WC-1..5, UIWidgetsGraphics GR-1..4) y se cerró el proyecto functions-vendors-expansion con el doble registro obligatorio en docs/history/ y docs/change_logs/.

## Qué cambia

- **RF-016 UIWidgetsCommon**: 5 métodos de widget (countdown, emptyState, progress, carousel, copyToClipboard) con firmas actualizadas según especificación, tipos escalares obligatorios y HTML seguro (RN-004)
- **RF-017 UIWidgetsGraphics**: 4 métodos nuevos (generateApexMultiSeries, generateApexDonut, generateApexRadialBar, generateSparkline) que delegan total en generateApexChart sin duplicar lógica de render
- **RF-018 UIWidgetsViews**: VW-1 (timeline), VW-2 (stepper), VW-3 (avatarStack), VW-4 (table_v8 con fila expandible) añadidos al catálogo de widgets
- **Doble registro**: history + change_logs enlazados con frontmatter consistente, estados de 15/15 tasks en `hecha`


## Cambios técnicos resumidos

| Family | Métodos | Archivos | Estado |
|--------|---------|----------|--------|
| RF-016 | WC-1..WC-5 (5) | UIWidgetsCommon.php | implementado |
| RF-017 | GR-1..GR-4 (4) | UIWidgetsGraphics.php | implementado |
| RF-018 | VW-1..VW-4 (4) | UIWidgetsViews.php | implementado |
| Total | 13 métodos | 3 archivos | cerrados |
