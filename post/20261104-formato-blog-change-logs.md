---
title: "El registro de cambios adopta el formato de blog"
tags:
  - blog
  - change-logs
  - documentacion
  - agents
---

# El registro de cambios adopta el formato de blog

## Resumen

Los resúmenes divulgativos del proyecto ahora se publican como posts de blog: nombre `YYYYMMDD-titulo-descriptivo.md`, frontmatter opcional con `title` y `tags`, y contenido en Markdown. Además se retiró el resumen semanal y el script que generaba los índices históricos.

## Descripción

### Contexto

- `docs/change_logs/` tenía 163 entradas con nombres `YYYY-MM-DD_<slug>.md` y frontmatter `titulo`, `categoria`, `fecha`, `autor_ia`, `tags`, `cambio_relacionado`.
- El agent `chronicler` generaba posts semanales en `docs/change_logs/resumenes/AAAA-SS.md`; existía `2026-43.md`.
- `docs/tools/history-index.sh` generaba `docs/history/{INDEX,DECISIONES,PENDIENTES}.md` y validaba el frontmatter con `--lint`.
- El script y el chronicler estaban referenciados en `AGENTS.md`, `README.md`, `agents/README.md`, `agents/triage`, `agents/documentation`, `skills/README.md`, los envoltorios `.opencode/agents/*.md`, `.claude/agents/triage.md`, `.claude/settings.local.json` y varios registros de `projects/`.
- El directorio no es un repositorio git, así que no había red de seguridad para renombrados ni borrados.

### Porqué

El usuario pidió adaptar el registro de `docs/change_logs/` a un formato de blog estático: nombre `YYYYMMDD-titulo-descriptivo.md`, frontmatter opcional con `title` y `tags`, y contenido Markdown. También pidió eliminar el resumen semanal guardado en `resumenes/` y el script `docs/tools/history-index.sh`.

### Descripción

- **Renombrado:** 163 entradas de `docs/change_logs/` pasaron de `YYYY-MM-DD_<slug>.md` a `YYYYMMDD-<slug>.md`. Se pasaron a minúsculas dos slugs con mayúsculas (`idBodegas` y `mantencionSistema`).
- **Frontmatter:** cada entrada quedó con `title` y `tags` (lista YAML); se eliminaron `titulo`, `categoria`, `fecha`, `autor_ia`, `cambio_relacionado` y `amplia`. Los títulos sin comillas se reescribieron como cadenas YAML válidas.
- **Cuerpo:** se normalizaron los encabezados `## Resumen (2-3 líneas para el blog)`, `## Contenido del cambio (…)` y `## Notas (…)` a `## Resumen`, `## Contenido del cambio` y `## Notas`. Se añadió `# Título` a los dos ficheros que no lo tenían.
- **Casos irregulares corregidos:** dos ficheros sin `---` de apertura y uno sin frontmatter se migraron a la estructura estándar.
- **Referencias:** 159 enlaces `cambio_relacionado` de `docs/history/` y los enlaces de `docs/history/INDEX.md` y `_normalizacion.md` se actualizaron a los nombres nuevos. Se validó que no queda ninguna referencia rota.
- **Borrados:** `docs/change_logs/resumenes/` (con `2026-43.md`), `docs/tools/` y `history-index.sh`, `agents/chronicler/`, `skills/chronicler/`, `.opencode/agents/chronicler.md` y `.claude/agents/chronicler.md`.
- **Retirada del chronicler:** se quitaron sus filas y referencias de `AGENTS.md`, `README.md`, `agents/README.md`, `agents/triage/instructions.md`, `skills/README.md` y del vocabulario `agente` de `docs/history/README.md`.
- **Script retirado:** se quitaron las instrucciones de `--lint` y regeneración de `AGENTS.md`, `README.md`, `agents/README.md`, `agents/triage`, `agents/documentation`, los envoltorios y `.claude/settings.local.json`. Los índices se conservan congelados y sus cabeceras lo indican.
- **Documentación nueva:** `docs/change_logs/README.md` y `_template.md` describen el formato blog; `docs/history/README.md` enlaza el nuevo formato y documenta que los índices ya no se regeneran.
- **`projects/`:** no se tocó, por la regla de alcance de peticiones puntuales. Algunos registros de proyecto siguen mencionando `docs/tools/history-index.sh` como referencia histórica.

## Contenido del cambio

- Las 163 entradas existentes se renombraron al formato `YYYYMMDD-<slug>.md` y adoptaron `title` y `tags`.
- El contenido sigue siendo el mismo: resumen, explicación del cambio y notas.
- La trazabilidad con la memoria técnica se mantiene desde `docs/history/`, que apunta a cada post con `cambio_relacionado`.
- Se eliminó la carpeta de resúmenes semanales y el agent que los generaba.
- Los índices de `docs/history/` se conservan como archivos históricos, pero ya no se regeneran automáticamente.
- Los posts nuevos no necesitan frontmatter: si falta, el título se toma del primer `# Título`.

## Notas

Este cambio no afecta al código de la aplicación. Afecta a la organización de `docs/change_logs/` y a las referencias documentales. Los registros de `projects/` no se modificaron.
