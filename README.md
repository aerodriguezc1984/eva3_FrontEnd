# Landing Page — Centro de Negocios Santiago (SERCOTEC)

Proyecto desarrollado para la **Evaluación Sumativa Unidad 3 — Desarrollo Frontend**
(Instituto Profesional San Sebastián).

Sitio web de actualización para el **Centro de Negocios Santiago de SERCOTEC**,
construido con **React + Vite** y una API/CMS simulada con **Node + Express**.

---

## 👥 Equipo

> **Nombre del equipo:** `EQUIPO_XYZ`  *(reemplazar antes de entregar)*
>
> **Integrantes:**
> - Integrante 1 — *(nombre)*
> - Integrante 2 — *(nombre)*
> - Integrante 3 — *(nombre)*

---

## 🧱 Tecnologías

| Herramienta | Uso |
|-------------|-----|
| **React 18** | Librería de componentes de interfaz |
| **Vite 5** | Empaquetador y servidor de desarrollo rápido |
| **Express** | Servidor mock que simula el CMS / API REST |
| **CSS con variables** | Sistema de diseño (tokens) reutilizable |

---

## 📁 Estructura del proyecto

```
eva3_sercotec/
├── index.html               # HTML base donde se monta React
├── package.json             # Dependencias y scripts
├── vite.config.js           # Configuración de Vite + proxy a la API
├── public/
│   └── img/                 # Imágenes SVG optimizadas (ligeras)
├── server/
│   ├── server.js            # API/CMS mock (Express): endpoints REST
│   └── content.json         # Contenido editable por el equipo de contenido
├── src/
│   ├── main.jsx             # Punto de entrada de React
│   ├── App.jsx              # Componente raíz: ensambla las secciones
│   ├── styles/
│   │   └── index.css        # Tokens de diseño y estilos globales
│   ├── hooks/
│   │   └── useFetch.js       # Hook reutilizable para consumir la API
│   ├── services/
│   │   └── api.js           # Cliente de API (consumo de endpoints)
│   └── components/
│       ├── Navbar.jsx       # Navegación interactiva responsive
│       ├── Hero.jsx         # Portada
│       ├── ServiceCard.jsx  # ⭐ Componente reutilizable de tarjeta de servicio
│       ├── ServicesSection.jsx
│       ├── AboutSection.jsx
│       ├── TestimonialsCarousel.jsx  # ⭐ Carrusel accesible y responsive
│       ├── FaqSection.jsx
│       ├── ContactForm.jsx  # ⭐ Formulario seguro (validación + anti-bot)
│       └── Footer.jsx
└── docs/
    ├── CAMBIOS_REALIZADOS.md     # Explicación simple de cada cambio
    ├── GUIA_BUENAS_PRACTICAS.md  # Convenciones de desarrollo
    └── RETROSPECTIVA.md          # Retrospectiva del equipo + plan de acción
```

---

## 🚀 Instalación y ejecución

Requisitos: **Node.js 18 o superior**.

```bash
# 1. Instalar dependencias
npm install

# 2. Levantar el frontend + la API mock a la vez
npm start
```

Esto abre:
- **Frontend:** http://localhost:5173
- **API/CMS mock:** http://localhost:4000

> También puedes correrlos por separado: `npm run server` (API) y `npm run dev` (frontend).

Para generar la versión optimizada de producción:

```bash
npm run build      # genera la carpeta dist/
npm run preview    # previsualiza la build
```

---

## 🔌 Endpoints de la API (consumo / CMS)

Todos se pueden probar en **Postman** apuntando a `http://localhost:4000`.

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/about` | Datos de la sección *Nosotros* |
| GET | `/api/servicios` | Lista de servicios (tarjetas) |
| GET | `/api/testimonios` | Testimonios del carrusel |
| GET | `/api/faq` | Preguntas frecuentes |
| POST | `/api/contacto` | Recibe el formulario (con validación y anti-bot) |

Ejemplo de **POST** a `/api/contacto` (cuerpo JSON):

```json
{
  "nombre": "Ana Pérez",
  "email": "ana@correo.cl",
  "servicio": "Marketing Digital",
  "mensaje": "Quiero mejorar mis redes sociales.",
  "website": ""
}
```

> El campo `website` es un **honeypot**: debe ir vacío. Si un bot lo rellena,
> el servidor rechaza la solicitud.

---

## 🧩 Guía de uso de los componentes

### `ServiceCard` (tarjeta de servicio reutilizable)

```jsx
<ServiceCard
  id="marketing-digital"
  titulo="Marketing Digital"
  descripcion="Potencia tu presencia online."
  imagen="/img/servicio-marketing.svg"
  alt="Pantalla con crecimiento en redes"
  onContactar={(servicio) => irAContacto(servicio)}
/>
```
Al pulsar **"Contáctanos"**, lleva al formulario y **prellena el campo *servicio***.

### `TestimonialsCarousel` (carrusel)

```jsx
<TestimonialsCarousel testimonios={listaDeTestimonios} />
```
Soporta teclado (flechas ← →), botón de pausa y puntos de navegación.

### `ContactForm` (formulario seguro)

```jsx
<ContactForm servicioPreseleccionado="Asesoría Financiera" />
```
Valida en cliente y servidor e incluye protección anti-bots.

---

## ♿ Accesibilidad y rendimiento

- Etiquetas semánticas, roles ARIA y enlace "saltar al contenido".
- Foco visible y navegación por teclado en todos los componentes.
- Imágenes con `loading="lazy"`, dimensiones fijas y formato SVG ligero.
- Respeto a `prefers-reduced-motion`.

---

## 🌿 Trabajo colaborativo con Git/GitHub

El proyecto se desarrolló con ramas por funcionalidad y Pull Requests.
Ver el historial sugerido y los comandos en
[`docs/CAMBIOS_REALIZADOS.md`](docs/CAMBIOS_REALIZADOS.md).

Para publicarlo en un repositorio público:

```bash
git remote add origin https://github.com/USUARIO/eva3-sercotec.git
git push -u origin main
```
