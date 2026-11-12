---
title: "Árbol de dependencias y guía de la capa agents"
tags:
  - "agents"
  - "dependencias"
  - "documentacion"
  - "flujo"
---

# Árbol de dependencias y guía de la capa agents

## Resumen

Se añade un fichero `flujo.md` en la raíz del repositorio que documenta el árbol de dependencias de la capa `agents/` y explica qué hace cada uno de sus archivos, para facilitar cambios futuros conociendo las relaciones entre agents.

## Descripción

### Contexto

El usuario solicita un archivo `flujo.md` que muestre el árbol de dependencias de la carpeta `@agents/` (en este repositorio la carpeta real es `agents/`) y explique qué hace cada archivo, para poder hacer cambios conociendo las relaciones entre los agents.

Previamente no existía ningún fichero `flujo.md` en la raíz del repositorio. La única visión consolidada de la capa agents era el contrato común `agents/README.md` junto con los `instructions.md` individuales de cada agent.

### Porqué

Conocer cómo están relacionados los files de `agents/` y la responsabilidad de cada uno antes de realizar modificaciones, evitando romper el contrato común y el protocolo de registro doble obligatorio.

### Descripción

- Creación de `/mnt/Desarrollos/Entornos/docker_entorno_lamp/www/coreEngine/flujo.md` con:
  - Árbol de archivos de la carpeta `agents/` (incluyendo `AGENTS.md`, `README.md`, `docs/architecture/`, `skills/` y los 11 agents con sus `instructions.md` y `README.md`).
  - Tabla de relaciones clave (dependencias) entre cada `instructions.md` y los recursos que usa.
  - Descripción detallada de qué hace cada uno de los 23 archivos (`agents/README.md` + 11 pares de `instructions.md`/`README.md`).
  - Flujo típico de una petición (Triage → Architect → Developer → Reviewer → Debugger → Documentation → Registro doble).
  - Recomendación antes de hacer cambios.

## Contenido del cambio

El documento reúne en un solo sitio: el árbol completo de archivos de `agents/` (11 agents con su `instructions.md` y `README.md`, más el `README.md` común), una tabla de dependencias entre cada agent y los recursos que usa, la descripción de la responsabilidad de cada archivo, el flujo típico de una petición (Triage → Architect → Developer → Reviewer → Debugger → Documentation → registro doble) y una lista de recomendaciones antes de modificar la capa agents.

## Notas

No hay cambios que rompan la compatibilidad ni acción requerida para el usuario. Es un fichero de consulta únicamente.
