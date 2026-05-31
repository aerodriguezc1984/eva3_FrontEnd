import './sections.css'

/* SECCION HERO (portada). Llamada a la accion principal del sitio. */
export default function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="container hero__inner">
        <div className="hero__texto">
          <h1>Impulsamos el crecimiento de tu empresa</h1>
          <p>
            Asesorías, capacitaciones y acompañamiento gratuito para micro,
            pequeñas y medianas empresas de Santiago. Somos parte de la red de
            Centros de Negocios de SERCOTEC.
          </p>
          <div className="hero__cta">
            <a href="#servicios" className="btn btn--primary">Ver servicios</a>
            <a href="#contacto" className="btn btn--ghost">Contáctanos</a>
          </div>
        </div>
      </div>
    </section>
  )
}
