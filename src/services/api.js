/* =====================================================================
   CLIENTE DE API
   Centraliza el "consumo de endpoints". Todos los componentes piden
   datos a traves de estas funciones en vez de usar fetch suelto.
   Beneficio: un solo lugar para manejar URL base, errores y headers.
   ===================================================================== */

// URL base. Gracias al proxy de Vite, "/api" apunta al servidor mock.
const BASE = '/api'

// Funcion generica para hacer GET y manejar errores de forma consistente.
async function getJson(ruta) {
  const res = await fetch(`${BASE}${ruta}`)
  if (!res.ok) {
    throw new Error(`Error al consultar ${ruta} (estado ${res.status})`)
  }
  return res.json()
}

// Endpoints de lectura (secciones dinamicas).
export const getAbout = () => getJson('/about')
export const getServicios = () => getJson('/servicios')
export const getTestimonios = () => getJson('/testimonios')
export const getFaq = () => getJson('/faq')

// Endpoint de escritura: enviar el formulario de contacto.
export async function enviarContacto(datos) {
  const res = await fetch(`${BASE}/contacto`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos)
  })
  const cuerpo = await res.json().catch(() => ({}))
  // Devolvemos el estado para que el formulario muestre errores del servidor.
  return { ok: res.ok, status: res.status, ...cuerpo }
}
