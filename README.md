# Algebra_EF

Web de estudio para el **Examen Final de Álgebra Lineal (UTEC, ciclo 2026-2)**, hecha con las diapositivas de [`Clases/`](Clases/) (S06–S15) y los bancos de [`Ejercicios_Algebra/`](Ejercicios_Algebra/).

## Secciones

- **Inicio**: qué entra en el examen (5 ítems: linealidad, ortogonalidad/Pitágoras, Gram-Schmidt + QR, SVD, sistemas dinámicos) y las erratas encontradas en el material.
- **Teoría**: resumen por semana; cada bloque enlaza a la página exacta del PDF.
- **Fórmulas**: 23 fórmulas con cuándo usarlas y enlaces a los ejercicios donde aparecen.
- **Resueltos**: 23 ejercicios paso a paso (se revela un paso a la vez).
- **Práctica**: 46 ejercicios con respuesta y solución ocultas; puedes marcar “bien” o “repasar”.
- **V/F**: 48 afirmaciones del banco maratón con justificación, en modo quiz o lista.
- **Simulacro**: 3 exámenes con el formato del final (5 ítems × 4 puntos), con reloj, solución, rúbrica y nota sobre 20, más uno aleatorio.
- **Clases**: los PDFs de las diapositivas y de los bancos.

Todas las respuestas se comprobaron con cálculo simbólico (sympy). Lo que no está en las diapositivas lleva la etiqueta *del banco…*.

## Uso

Es una web estática, sin compilación. Abre `index.html` en el navegador o sírvela localmente:

```sh
python3 -m http.server 8000   # luego abre http://localhost:8000
```

También funciona con GitHub Pages (Settings → Pages → rama `main`, carpeta raíz).

Las fórmulas se dibujan con KaTeX desde un CDN, así que la primera carga necesita internet.
