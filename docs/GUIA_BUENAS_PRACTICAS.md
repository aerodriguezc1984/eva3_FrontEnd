# Guía de Buenas Prácticas — Desarrollo Frontend con React

Esta guía reúne las convenciones que seguimos en el proyecto. La idea es que
cualquier persona que se sume al equipo pueda escribir código consistente,
accesible y fácil de mantener. Cada práctica incluye **qué hacer**, **cómo se
nota (algo observable)** y un **ejemplo**.

---

## 1. Convenciones de nomenclatura

**Qué hacer:** usar nombres claros y un estilo consistente según el tipo de cosa.

| Elemento | Convención | Ejemplo |
|----------|-----------|---------|
| Componentes | `PascalCase` | `ServiceCard.jsx` |
| Funciones y variables | `camelCase` | `irAContacto`, `servicioSel` |
| Hooks personalizados | empiezan con `use` | `useFetch` |
| Constantes globales | `MAYUSCULAS` | `BASE`, `PORT` |
| Clases CSS | `kebab-case` + BEM | `.card__title`, `.is-active` |

**Observable:** ningún archivo de componente está en minúsculas; los hooks
siempre empiezan con `use`.

---

## 2. Estructura de archivos por responsabilidad

**Qué hacer:** separar el código según lo que hace, no mezclar todo.

```
src/
 ├── components/   → piezas de interfaz (cada una con su .jsx y .css)
 ├── hooks/        → lógica reutilizable (useFetch)
 ├── services/     → comunicación con la API (api.js)
 └── styles/       → estilos globales y tokens
```

**Observable:** cada componente vive junto a su propio CSS; la lógica de red
está centralizada en `services/api.js`.

---

## 3. Componentes pequeños y reutilizables

**Qué hacer:** un componente = una responsabilidad. Si crece demasiado, se divide.

**Ejemplo:** `ServiceCard` solo dibuja una tarjeta; no sabe de dónde vienen los
datos. La sección `ServicesSection` se encarga de pedirlos y repetir la tarjeta.

**Observable:** `ServiceCard` recibe todo por props y se reutiliza 6 veces sin copiar código.

---

## 4. Uso de variables CSS (tokens de diseño)

**Qué hacer:** definir colores, espaciados y tipografías una sola vez en `:root`
y reutilizarlos con `var(--nombre)`.

```css
:root { --color-primary: #0a3d62; --space-md: 1.25rem; }
.card__title { color: var(--color-primary); }
```

**Observable:** cambiar el color institucional en un solo lugar actualiza todo el sitio.

---

## 5. Separar datos del código (contenido administrable)

**Qué hacer:** el texto e información del sitio vive en `content.json` (el "CMS"),
no escrito a mano dentro de los componentes.

**Observable:** el equipo de contenido edita `content.json` sin tocar el código React.

---

## 6. Centralizar el consumo de la API

**Qué hacer:** todas las llamadas pasan por `services/api.js` y el hook `useFetch`.

**Ejemplo:**
```js
const { datos, cargando, error } = useFetch(getServicios)
```

**Observable:** ningún componente usa `fetch` suelto; si cambia la URL base se edita en un solo archivo.

---

## 7. Manejar siempre los tres estados de la carga

**Qué hacer:** mostrar *cargando*, *error* y *datos*. Nunca asumir que la API responde bien.

**Observable:** cada sección dinámica muestra un mensaje mientras carga y otro si falla.

---

## 8. Accesibilidad (WCAG 2.1) desde el inicio

**Qué hacer:**
- HTML semántico (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`).
- Roles y atributos ARIA en componentes interactivos (carrusel, menú).
- Texto alternativo (`alt`) en todas las imágenes.
- Foco visible y navegación por teclado.
- Enlace "saltar al contenido".

**Observable:** el carrusel se opera con flechas del teclado y anuncia los cambios a lectores de pantalla.

---

## 9. Usabilidad en formularios

**Qué hacer:** etiquetas (`<label>`) asociadas, mensajes de error junto al campo,
y confirmación clara al enviar.

**Observable:** si un campo falla, el mensaje aparece bajo el campo y el lector de
pantalla lo anuncia (`aria-describedby`, `role="status"`).

---

## 10. Rendimiento

**Qué hacer:**
- Imágenes ligeras (SVG) con `loading="lazy"` y dimensiones fijas (evita saltos de diseño).
- Separar dependencias grandes en su propio "chunk" (`manualChunks`).
- Evitar trabajo innecesario en cada render.

**Observable:** las imágenes fuera de pantalla no se cargan hasta que se necesitan.

---

## 11. Seguridad básica en el frontend

**Qué hacer:**
- Validar en cliente **y** en servidor.
- Sanitizar entradas (quitar `<` y `>`).
- Honeypot anti-bots en formularios.

**Observable:** un POST con el campo `website` relleno es rechazado por el servidor.

---

## 12. Control de versiones ordenado

**Qué hacer:**
- Una rama por funcionalidad (`feature/...`).
- Commits pequeños con mensajes descriptivos en infinitivo.
- Pull Requests revisados antes de unir a `main`.

**Ejemplo de mensaje de commit:**
```
feat(tarjeta): agrega componente reutilizable ServiceCard con botón de contacto
```

**Observable:** el historial muestra ramas y mensajes claros que explican cada cambio.
