---
title: Sin partidas repetidas: creación de campañas más segura
tags:
  - campanas
  - partidas
  - duplicados
  - concurrencia
  - ux
---

# Sin partidas repetidas: creación de campañas más segura

Al crear partidas de campaña ya no es posible que se dupliquen o tripliquen los registros por un doble clic o por dos personas trabajando al mismo tiempo: la plataforma ahora bloquea el envío repetido y serializa la creación por campaña. Además, el filtro «Quitar Repetidos» ahora sólo excluye las entidades que ya tienen partida **ese mismo día**, y al crear una partida individual el sistema avisa con un mensaje claro si la entidad ya estaba registrada para esa campaña y fecha.

## Qué cambia

- **Adiós a los registros duplicados por accidente**: si el botón «Guardar Cambios» se pulsa dos o tres veces rápido (o dos personas crean partidas de la misma campaña a la vez), ahora sólo se registra una vez. Antes podía ocurrir que una misma entidad quedara repetida con la misma campaña y fecha.
- **Filtro de repetidos más preciso**: la opción «Quitar Repetidos» del paso de filtros antes descartaba a una entidad de la campaña **cualquiera que fuera la fecha**; ahora sólo descarta las que ya tienen partida de hoy, de modo que puede trabajarse día a día sin perder clientes equivocadamente.
- **Aviso claro al crear una partida individual**: si la entidad elegida ya tiene una partida para esa campaña y fecha, el sistema muestra «La entidad seleccionada ya tiene una partida para esta campaña en la fecha indicada.» en lugar de un mensaje técnico genérico. Las partidas ya entregadas no bloquean volver a asignar al cliente (comportamiento deseado por el negocio).
- Sin cambios de base de datos ni de formularios: todo ocurre detrás de escena.
