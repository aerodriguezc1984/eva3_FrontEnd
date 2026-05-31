import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AboutSection from './components/AboutSection'
import ServicesSection from './components/ServicesSection'
import TestimonialsCarousel from './components/TestimonialsCarousel'
import FaqSection from './components/FaqSection'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'
import { getTestimonios } from './services/api'
import { useFetch } from './hooks/useFetch'

/* =====================================================================
   COMPONENTE RAIZ App
   Ensambla todas las secciones de la landing page.
   Gestiona el "servicio preseleccionado": cuando el usuario pulsa
   "Contáctanos" en una tarjeta, guardamos el servicio y hacemos scroll
   al formulario, que se autocompleta.
   ===================================================================== */
export default function App() {
  const [servicioSel, setServicioSel] = useState('')
  const { datos: testimonios } = useFetch(getTestimonios)

  const irAContacto = (servicio) => {
    setServicioSel(servicio)
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Enlace de accesibilidad: saltar al contenido principal */}
      <a className="skip-link" href="#contenido">Saltar al contenido</a>

      <Navbar />

      <main id="contenido">
        <Hero />
        <AboutSection />
        <ServicesSection onContactar={irAContacto} />

        <section id="testimonios" className="section section--alt">
          <div className="container">
            <h2 className="section__title">Lo que dicen nuestros clientes</h2>
            <p className="section__subtitle">Historias reales de empresas que crecieron con nosotros</p>
            <TestimonialsCarousel testimonios={testimonios || []} />
          </div>
        </section>

        <FaqSection />

        <section id="contacto" className="section">
          <div className="container">
            <h2 className="section__title">Contáctanos</h2>
            <p className="section__subtitle">Cuéntanos sobre tu negocio y te acompañamos</p>
            <ContactForm servicioPreseleccionado={servicioSel} />
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
