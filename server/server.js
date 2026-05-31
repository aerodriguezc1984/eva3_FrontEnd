/* =====================================================================
   SERVIDOR MOCK (CMS + API)
   ---------------------------------------------------------------------
   Simula el backend / CMS del sitio. Expone endpoints REST con la misma
   forma que tendria una API headless (por ejemplo WordPress REST API:
   /wp-json/...). El equipo de contenido editaria el archivo content.json
   o, en produccion, lo haria desde el panel del CMS.

   Endpoints disponibles:
     GET  /api/about         -> seccion "Nosotros"
     GET  /api/servicios     -> lista de servicios (tarjetas)
     GET  /api/testimonios   -> testimonios para el carrusel
     GET  /api/faq           -> preguntas frecuentes
     POST /api/contacto      -> recibe el formulario (con validacion + anti-bot)

   Se puede probar todo con Postman apuntando a http://localhost:4000/api/...
   ===================================================================== */
import express from 'express'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = 4000

// Permite recibir JSON en el cuerpo de las peticiones POST.
app.use(express.json())

// CORS basico para poder probar desde Postman u otros origenes.
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.sendStatus(200)
  next()
})

// Lee el contenido desde el "CMS" (archivo JSON) en cada peticion,
// asi el equipo de contenido puede editarlo sin reiniciar el servidor.
function getContent() {
  const raw = readFileSync(join(__dirname, 'content.json'), 'utf-8')
  return JSON.parse(raw)
}

// ---- Endpoints de lectura (consumo de contenido) ----
app.get('/api/about', (_req, res) => res.json(getContent().about))
app.get('/api/servicios', (_req, res) => res.json(getContent().servicios))
app.get('/api/testimonios', (_req, res) => res.json(getContent().testimonios))
app.get('/api/faq', (_req, res) => res.json(getContent().faq))

// ---- Endpoint de escritura: formulario de contacto ----
// Aqui aplicamos SEGURIDAD del lado del servidor:
//  1) Honeypot: campo oculto "website". Si viene relleno, es un bot.
//  2) Validacion de campos obligatorios y formato de email.
//  3) Sanitizacion basica para evitar inyeccion de HTML/scripts.
app.post('/api/contacto', (req, res) => {
  const { nombre, email, servicio, mensaje, website } = req.body || {}

  // 1) Trampa anti-bots (honeypot): un humano nunca completa este campo.
  if (website && website.trim() !== '') {
    return res.status(400).json({ ok: false, error: 'Solicitud rechazada.' })
  }

  // 2) Validacion del lado del servidor.
  const errores = {}
  if (!nombre || nombre.trim().length < 2) errores.nombre = 'El nombre es obligatorio.'
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || '')
  if (!emailOk) errores.email = 'El correo no es válido.'
  if (!servicio) errores.servicio = 'Debe seleccionar un servicio.'
  if (!mensaje || mensaje.trim().length < 10) errores.mensaje = 'El mensaje debe tener al menos 10 caracteres.'

  if (Object.keys(errores).length > 0) {
    return res.status(422).json({ ok: false, errores })
  }

  // 3) Sanitizacion: quitamos caracteres < y > para evitar inyeccion de HTML.
  const limpiar = (t) => String(t).replace(/[<>]/g, '')
  const registro = {
    nombre: limpiar(nombre),
    email: limpiar(email),
    servicio: limpiar(servicio),
    mensaje: limpiar(mensaje),
    fecha: new Date().toISOString()
  }

  // En un sistema real aqui se guardaria en base de datos / se enviaria correo.
  console.log('Nuevo contacto recibido:', registro)
  return res.status(201).json({ ok: true, mensaje: 'Gracias por contactarnos. Te responderemos pronto.' })
})

app.listen(PORT, () => {
  console.log(`Servidor mock (CMS/API) escuchando en http://localhost:${PORT}`)
})
