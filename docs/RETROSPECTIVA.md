# Retrospectiva del equipo y plan de mejora continua

Sesión de retrospectiva realizada al cierre de la primera iteración del
desarrollo de la landing page del Centro de Negocios Santiago (SERCOTEC).

**Objetivo:** identificar áreas de mejora en el uso del framework y en la gestión
del proyecto, y definir un plan de acción para la próxima iteración.

---

## 1. ¿Qué funcionó bien? (Mantener)

- Separar el contenido (`content.json`) del código permitió avanzar en paralelo:
  unos en componentes, otros en contenido.
- El uso de **componentes reutilizables** (como `ServiceCard`) ahorró tiempo y
  evitó código duplicado.
- Los **tokens de diseño** (variables CSS) dieron consistencia visual desde el inicio.
- Trabajar con **ramas por funcionalidad** mantuvo `main` siempre estable.

## 2. ¿Qué se puede mejorar? (Cambiar)

- No incorporamos **pruebas automatizadas**; se probó manualmente.
- La accesibilidad se revisó al final; conviene revisarla en cada componente.
- Los mensajes de algunos commits podrían ser más descriptivos.
- El CMS es un mock; falta conectarlo a una solución real (p. ej. WordPress REST API o Strapi).

## 3. ¿Qué nos frenó? (Eliminar)

- Pequeños retrabajos por no acordar las convenciones de nombres al comienzo
  (se resolvió creando la Guía de Buenas Prácticas).

---

## 4. Plan de acción para la próxima iteración

| # | Acción | Responsable | Indicador de éxito |
|---|--------|-------------|--------------------|
| 1 | Conectar el CMS a una solución real (WordPress headless / Strapi) | Backend | Las secciones consumen datos reales del CMS |
| 2 | Agregar pruebas con Vitest + React Testing Library | Frontend | Cobertura ≥ 60% en componentes clave |
| 3 | Auditoría de accesibilidad con Lighthouse y axe | Todo el equipo | Puntaje de accesibilidad ≥ 95 |
| 4 | Definir plantilla de mensajes de commit (Conventional Commits) | Líder técnico | 100% de commits con formato `tipo(scope): descripción` |
| 5 | Optimizar imágenes reales con `srcset` y formatos modernos (WebP/AVIF) | Frontend | Tiempo de carga < 2s en 3G simulada |
| 6 | Configurar despliegue continuo (Netlify/Vercel) desde `main` | DevOps | Cada PR aprobado se publica automáticamente |

---

## 5. Acuerdos del equipo

1. Revisar accesibilidad **dentro** de cada Pull Request, no al final.
2. Todo cambio entra por rama y PR con al menos una revisión.
3. Mantener actualizada la documentación junto con el código.
