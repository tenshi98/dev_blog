---
title: Entidades completa su red de pruebas: seis fases, del listado a los sectores
tags:
  - testing
  - entidades
  - qa
---

# Entidades completa su red de pruebas: seis fases, del listado a los sectores

El módulo de Entidades cerró la cobertura de sus seis controladores con pruebas automáticas que revisan estructura, rutas, permisos, pantallas, validación y seguridad sin tocar la base de datos. La batería se descubre sola desde el panel de testeos del backoffice y permite comprobar cada parte del módulo sin riesgo para los datos reales.

## Fase 1: listado principal

El listado de entidades estrenó nueve suites. Cubren el ciclo completo: listado con filtros, exportación, detalle por pestañas según los permisos, creación, edición y borrado en cascada de cargas, contactos, documentos y observaciones.

Se verifican los permisos de cada nivel, la validación de correos, RUT, teléfonos, URL y fechas, y que la contraseña nunca se consulte ni se muestre. La fase también retiró un fichero de pruebas vacío que aparecía en el panel sin resultados.

Como aviso, las pruebas dejaron constancia de que el alta de entidades asigna una contraseña inicial fija; se recomienda revisar esa práctica por separado.

## Fase 2: cargas familiares

Las cargas familiares suman ocho suites con alta, edición, detalle y borrado, además de los catálogos de parentesco, estudios y estados. Se comprueban las fechas legibles, los formularios con los datos de la entidad ya asignados y los identificadores cifrados.

## Fase 3: contactos

Los contactos de una entidad tienen otras ocho suites. La cobertura incluye ciudad, comuna y tipo de contacto según el tipo de entidad, los teléfonos con formato legible y la validación de correo, RUT, teléfonos y largos de texto.

## Fase 4: documentos

El detalle de documentos suma ocho suites, con foco en la subida y el borrado de archivos. Se comprueba que el servidor asigne su propio nombre al archivo, que solo se acepten tipos documentales o multimedia, que se limite el peso y que solo el alta permita subir.

También se verifica que al borrar un documento se elimine su archivo, además de las pantallas de vencimientos y vista previa.

## Fase 5: observaciones

Las observaciones tienen ocho suites con alta, edición, detalle y borrado. Se comprueba que el autor lo asigne el servidor desde la sesión y que los formularios nunca lo envíen.

La fase dejó documentado que, al editar una observación, se actualizaban su autor y su fecha de creación; ese comportamiento se corrigió después en un cambio independiente.

## Fase 6: sectores

La administración de sectores cierra la cobertura con nueve suites y una matriz completa de permisos. Se verifica que el nombre sea obligatorio, único, de entre 3 y 255 caracteres y libre de palabras censuradas, además de la búsqueda con consultas preparadas y los identificadores cifrados.
