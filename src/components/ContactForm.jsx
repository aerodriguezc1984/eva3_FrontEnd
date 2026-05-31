import { useEffect, useState } from 'react'
import { enviarContacto, getServicios } from '../services/api'
import { useFetch } from '../hooks/useFetch'
import './ContactForm.css'

/* =====================================================================
   COMPONENTE: ContactForm (Formulario de contacto seguro)
   ---------------------------------------------------------------------
   Seguridad (tarea 10):
     - Validacion del lado del CLIENTE (antes de enviar).
     - Validacion del lado del SERVIDOR (en server.js).
     - Honeypot anti-bots: campo oculto "website".
   Usabilidad (tarea 6):
     - Mensajes de error claros junto a cada campo.
     - El campo "servicio" se prellena al pulsar "Contáctanos" en una tarjeta.

   La prop "servicioPreseleccionado" viene desde App cuando el usuario
   pulsa el boton de una tarjeta de servicio.
   ===================================================================== */
export default function ContactForm({ servicioPreseleccionado }) {
  const { datos: servicios } = useFetch(getServicios)
  const [form, setForm] = useState({
    nombre: '', email: '', servicio: '', mensaje: '', website: '' // website = honeypot
  })
  const [errores, setErrores] = useState({})
  const [enviando, setEnviando] = useState(false)
  const [resultado, setResultado] = useState(null)

  // Cuando llega un servicio preseleccionado, lo cargamos en el campo.
  useEffect(() => {
    if (servicioPreseleccionado) {
      setForm((f) => ({ ...f, servicio: servicioPreseleccionado }))
    }
  }, [servicioPreseleccionado])

  const actualizar = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  // Validacion del lado del cliente.
  const validar = () => {
    const err = {}
    if (form.nombre.trim().length < 2) err.nombre = 'Ingresa tu nombre.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) err.email = 'Ingresa un correo válido.'
    if (!form.servicio) err.servicio = 'Selecciona un servicio.'
    if (form.mensaje.trim().length < 10) err.mensaje = 'Cuéntanos un poco más (mín. 10 caracteres).'
    setErrores(err)
    return Object.keys(err).length === 0
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setResultado(null)
    if (!validar()) return
    setEnviando(true)
    try {
      const r = await enviarContacto(form)
      if (r.ok) {
        setResultado({ tipo: 'ok', texto: r.mensaje })
        setForm({ nombre: '', email: '', servicio: '', mensaje: '', website: '' })
        setErrores({})
      } else if (r.errores) {
        setErrores(r.errores) // errores que vienen del servidor
      } else {
        setResultado({ tipo: 'error', texto: r.error || 'No se pudo enviar. Intenta nuevamente.' })
      }
    } catch {
      setResultado({ tipo: 'error', texto: 'Error de conexión. Intenta más tarde.' })
    } finally {
      setEnviando(false)
    }
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      {/* Honeypot: oculto para humanos, visible para bots. aria-hidden + tabindex -1 */}
      <div className="form__honeypot" aria-hidden="true">
        <label>No completar este campo
          <input type="text" name="website" tabIndex={-1} autoComplete="off"
                 value={form.website} onChange={actualizar} />
        </label>
      </div>

      <div className="form__row">
        <label htmlFor="nombre">Nombre completo *</label>
        <input id="nombre" name="nombre" type="text" value={form.nombre}
               onChange={actualizar} aria-invalid={!!errores.nombre}
               aria-describedby={errores.nombre ? 'err-nombre' : undefined} />
        {errores.nombre && <p className="form__error" id="err-nombre">{errores.nombre}</p>}
      </div>

      <div className="form__row">
        <label htmlFor="email">Correo electrónico *</label>
        <input id="email" name="email" type="email" value={form.email}
               onChange={actualizar} aria-invalid={!!errores.email}
               aria-describedby={errores.email ? 'err-email' : undefined} />
        {errores.email && <p className="form__error" id="err-email">{errores.email}</p>}
      </div>

      <div className="form__row">
        <label htmlFor="servicio">Servicio de interés *</label>
        <select id="servicio" name="servicio" value={form.servicio}
                onChange={actualizar} aria-invalid={!!errores.servicio}
                aria-describedby={errores.servicio ? 'err-servicio' : undefined}>
          <option value="">-- Selecciona un servicio --</option>
          {(servicios || []).map((s) => (
            <option key={s.id} value={s.titulo}>{s.titulo}</option>
          ))}
        </select>
        {errores.servicio && <p className="form__error" id="err-servicio">{errores.servicio}</p>}
      </div>

      <div className="form__row">
        <label htmlFor="mensaje">Mensaje *</label>
        <textarea id="mensaje" name="mensaje" rows="4" value={form.mensaje}
                  onChange={actualizar} aria-invalid={!!errores.mensaje}
                  aria-describedby={errores.mensaje ? 'err-mensaje' : undefined} />
        {errores.mensaje && <p className="form__error" id="err-mensaje">{errores.mensaje}</p>}
      </div>

      <button type="submit" className="btn btn--primary" disabled={enviando}>
        {enviando ? 'Enviando...' : 'Enviar mensaje'}
      </button>

      {/* Region viva: el resultado se anuncia a lectores de pantalla */}
      {resultado && (
        <p className={`form__feedback form__feedback--${resultado.tipo}`} role="status">
          {resultado.texto}
        </p>
      )}
    </form>
  )
}
