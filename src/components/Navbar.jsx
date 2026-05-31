import { useState } from 'react'
import './Navbar.css'

/* =====================================================================
   COMPONENTE: Navbar (Navegacion interactiva)
   ---------------------------------------------------------------------
   - Menu responsive con boton "hamburguesa" en moviles.
   - Accesible: usa <nav>, aria-expanded y aria-controls.
   - Los enlaces hacen scroll suave a cada seccion (anclas #).
   ===================================================================== */
const enlaces = [
  { href: '#nosotros', texto: 'Nosotros' },
  { href: '#servicios', texto: 'Servicios' },
  { href: '#testimonios', texto: 'Testimonios' },
  { href: '#faq', texto: 'Preguntas frecuentes' },
  { href: '#contacto', texto: 'Contacto' }
]

export default function Navbar() {
  const [abierto, setAbierto] = useState(false)

  return (
    <header className="nav">
      <div className="container nav__inner">
        <a className="nav__brand" href="#inicio">
          <span className="nav__logo" aria-hidden="true">CN</span>
          <span>Centro de Negocios <strong>Santiago</strong></span>
        </a>

        <button
          className="nav__toggle"
          aria-expanded={abierto}
          aria-controls="menu-principal"
          aria-label="Abrir menú de navegación"
          onClick={() => setAbierto((v) => !v)}
        >
          <span className="nav__bars" aria-hidden="true">☰</span>
        </button>

        <nav id="menu-principal" className={`nav__menu ${abierto ? 'is-open' : ''}`}
             aria-label="Navegación principal">
          <ul>
            {enlaces.map((e) => (
              <li key={e.href}>
                <a href={e.href} onClick={() => setAbierto(false)}>{e.texto}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
