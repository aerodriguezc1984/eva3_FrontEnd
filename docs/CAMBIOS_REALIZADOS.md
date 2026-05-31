# Detalle de cambios realizados (explicado en simple)

Este documento explica, en lenguaje fácil de entender, **qué se construyó y por
qué**, conectando cada parte con lo que pedía la evaluación. La idea es que
cualquier persona —aunque no sea programadora— entienda el trabajo hecho.

---

## En una frase

Tomamos el sitio del **Centro de Negocios Santiago de SERCOTEC** y creamos una
nueva *landing page* moderna con **React**, donde el contenido se administra
desde un sistema aparte (un "CMS" simulado), con formularios seguros, diseño
accesible y pensado para celulares y computadores.

---

## Qué se pidió y cómo lo resolvimos

### 1. Tarjeta de servicio reutilizable
**Lo pedido:** una tarjeta con imagen, título, descripción y un botón
"Contáctanos" que lleve al formulario y deje el servicio ya seleccionado.

**Lo que hicimos:** creamos el componente `ServiceCard`. Es como un "molde": lo
usamos una vez y sirve para todos los servicios, solo cambian los datos. Al
apretar **Contáctanos**, la página baja al formulario y el campo *servicio* ya
viene escrito con el servicio elegido. Esto le ahorra pasos al usuario.

### 2. Carrusel de testimonios
**Lo pedido:** un carrusel que funcione en celular y computador, accesible y usable.

**Lo que hicimos:** el componente `TestimonialsCarousel` muestra los comentarios
de clientes uno a uno. Se puede mover con los botones, con las **flechas del
teclado**, y tiene un botón para **pausar** el movimiento automático. Avisa a los
lectores de pantalla cuando cambia, para personas con discapacidad visual.

### 3. Sistema de gestión de contenido (CMS)
**Lo pedido:** conectar la página con un CMS para que el equipo de contenido
administre fácil, pudiendo usar Postman.

**Lo que hicimos:** montamos un pequeño servidor (`server.js`) que entrega el
contenido desde un archivo `content.json`. Ese archivo es el "panel de
administración": el equipo de contenido edita ahí los textos, servicios o
testimonios **sin tocar el código**. Todo se puede probar con **Postman**
llamando a direcciones como `http://localhost:4000/api/servicios`.

### 4. Guía de buenas prácticas
**Lo pedido:** una guía con nomenclatura, estructura de archivos, uso de
variables y recomendaciones de accesibilidad/usabilidad.

**Lo que hicimos:** ver el archivo `GUIA_BUENAS_PRACTICAS.md`, con 12 prácticas,
cada una con ejemplo y algo concreto que se puede observar.

### 5. Git y GitHub (trabajo en equipo)
**Lo pedido:** usar ramas por funcionalidad, revisiones (pull requests),
commits documentados y un README completo.

**Lo que hicimos:** el proyecto trae un historial de Git con una rama por cada
funcionalidad (ver más abajo) y un `README.md` con la estructura, instalación,
guía de uso y ejemplos de código. (Más abajo están los comandos exactos para
subirlo a un repositorio público de GitHub.)

### 6. Navegación y formulario centrados en el usuario
**Lo pedido:** navegación interactiva y formulario intuitivos.

**Lo que hicimos:** el menú (`Navbar`) se adapta al celular con un botón
"hamburguesa" y lleva suavemente a cada sección. El formulario es claro, con
etiquetas y mensajes de error fáciles de entender.

### 7. Optimización de rendimiento
**Lo pedido:** imágenes comprimidas y carga eficiente.

**Lo que hicimos:** usamos imágenes **SVG** (muy livianas), con carga diferida
(`lazy`) para que solo se carguen cuando se ven, y dimensiones fijas para que la
página no "salte". Además separamos las librerías grandes para que el navegador
las guarde en caché.

### 8. JavaScript para interactividad avanzada
**Lo pedido:** interactividad avanzada con componentes del framework.

**Lo que hicimos:** el carrusel automático, el menú que se abre/cierra, el
formulario que valida en vivo y el autocompletado del servicio son ejemplos de
interactividad hecha con React + JavaScript.

### 9. Secciones que consumen datos de una API
**Lo pedido:** "Nosotros", "Servicios" y "Preguntas frecuentes" alimentadas
desde una API y mostradas dinámicamente.

**Lo que hicimos:** esas tres secciones **no tienen el texto escrito a mano**:
lo piden a la API cuando la página carga y lo muestran solo. Si mañana cambia un
servicio, se edita en el CMS y la página se actualiza sola.

### 10. Seguridad en los formularios
**Lo pedido:** validación en cliente y servidor, y protección contra robots.

**Lo que hicimos:**
- **Cliente:** antes de enviar, revisamos que los campos estén bien.
- **Servidor:** volvemos a revisar todo en `server.js` (nunca confiamos solo en el navegador).
- **Anti-robots:** un campo oculto ("honeypot") que las personas no ven; si un
  robot lo rellena, se rechaza el envío.
- **Limpieza:** quitamos caracteres peligrosos (`<` y `>`) para evitar inyección de código.

### 11. Retrospectiva y mejora continua
**Lo pedido:** liderar una retrospectiva y proponer un plan de acción.

**Lo que hicimos:** ver `RETROSPECTIVA.md`, con lo que funcionó, lo mejorable y
un plan concreto para la próxima iteración.

---

## Historial de ramas sugerido (Git)

El desarrollo se organizó en ramas por funcionalidad, unidas a `main` mediante
Pull Requests:

| Rama | Funcionalidad |
|------|---------------|
| `feature/setup` | Configuración base del proyecto |
| `feature/api-cms` | Servidor mock / CMS y cliente de API |
| `feature/service-card` | Tarjeta de servicio reutilizable |
| `feature/carousel` | Carrusel de testimonios accesible |
| `feature/sections` | Secciones Nosotros / Servicios / FAQ |
| `feature/contact-form` | Formulario seguro de contacto |
| `feature/navbar-footer` | Navegación y pie de página |
| `feature/docs` | Documentación y guías |

### Comandos para publicar en GitHub

```bash
# Si aún no está iniciado
git init
git add .
git commit -m "chore: versión inicial del proyecto"

# Crear el repositorio en GitHub (vacío) y luego:
git remote add origin https://github.com/USUARIO/eva3-sercotec.git
git branch -M main
git push -u origin main

# Ejemplo de flujo por funcionalidad:
git checkout -b feature/carousel
# ... cambios ...
git commit -m "feat(carrusel): agrega navegación por teclado y botón de pausa"
git push origin feature/carousel
# luego se abre un Pull Request en GitHub y se revisa antes de unir a main
```
