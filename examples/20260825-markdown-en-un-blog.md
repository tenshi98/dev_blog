---
title: Markdown en un blog estático
tags:
  - Markdown
  - Contenido
  - Escritura
---

# Markdown en un blog estático

Markdown es el formato de escritura elegido para este blog. Su simplicidad y legibilidad lo hacen ideal para crear contenido web sin la complejidad del HTML.

## ¿Por qué Markdown?

Markdown ofrece ventajas significativas para la escritura de contenido:

- **Sencillo de escribir** — sintaxis minimalista
- **Legible como texto plano** — no necesitas renderizar para entender
- **Convertible a HTML** — mediante Marked.js en este blog
- **Ampliamente soportado** — GitHub, editores, herramientas
- **Control de versiones** — ideal para Git

## Sintaxis soportada

Este blog soporta toda la sintaxis estándar de Markdown:

### Títulos

```markdown
# Título principal (h1)
## Subtítulo (h2)
### Sección (h3)
#### Sub-sección (h4)
```

### Formato de texto

- **Negrita** con `**texto**`
- *Cursiva* con `*texto*`
- ***Negrita y cursiva*** con `***texto***`
- `Código inline` con `` `código` ``

### Listas

Lista no ordenada:

- Primer elemento
- Segundo elemento
  - Sub-elemento
  - Otro sub-elemento
- Tercer elemento

Lista ordenada:

1. Paso uno
2. Paso dos
3. Paso tres

### Enlaces e imágenes

```markdown
[Texto del enlace](https://ejemplo.com)
![Texto alternativo](../assets/images/imagen.jpg)
```

### Citas

> Markdown fue creado por John Gruber en 2004 como una forma de escribir contenido web que sea legible incluso sin renderizar.
>
> — John Gruber

### Código

Código inline: `const x = 42;`

Bloque de código con sintaxis:

```python
def fibonacci(n):
    """Generar la secuencia de Fibonacci"""
    a, b = 0, 1
    resultado = []
    for _ in range(n):
        resultado.append(a)
        a, b = b, a + b
    return resultado

print(fibonacci(10))
```

### Tablas

| Característica | Markdown | HTML |
|---------------|----------|------|
| Legibilidad   | Alta     | Baja |
| Verbosidad    | Baja     | Alta |
| Curva de aprendizaje | Suave | Empinada |
| Flexibilidad  | Limitada | Total |

### Línea horizontal

---

### Listas de tareas

- [x] Crear el archivo Markdown
- [x] Agregar a posts.json
- [ ] Hacer commit y push
- [ ] Verificar publicación

## Front Matter

Este blog soporta Front Matter simple en formato YAML al inicio del archivo:

```markdown
---
title: Título personalizado
tags:
  - Etiqueta1
  - Etiqueta2
---

# Contenido del post...
```

El Front Matter se procesa con JavaScript, **no con Jekyll**.

## Imágenes en publicaciones

Para incluir imágenes, almacenarlas en `assets/images/` y referenciarlas con rutas relativas:

```markdown
![Descripción de la imagen](../assets/images/mi-imagen.jpg)
```

> **Nota sobre rutas:** Al usar rutas relativas `../assets/images/`, el navegador resuelve la ruta correctamente desde la carpeta `post/`. Esto funciona tanto en GitHub Pages como localmente.

## Consejos de escritura

1. **Escribe primero, formatea después** — concéntrate en el contenido
2. **Usa títulos jerárquicos** — no saltes de h1 a h4
3. **Párrafos cortos** — facilitan la lectura en pantallas pequeñas
4. **Código con lenguaje** — especifica el lenguaje en los bloques de código
5. **Imágenes con texto alternativo** — accesibilidad y SEO

Markdown te permite enfocarte en lo más importante: **el contenido**.
