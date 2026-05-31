import { useEffect, useRef, useState } from 'react'
import './TestimonialsCarousel.css'

/* =====================================================================
   COMPONENTE: TestimonialsCarousel (Carrusel de testimonios)
   ---------------------------------------------------------------------
   - Responsive: se adapta a movil y escritorio (CSS).
   - Accesible: usa roles ARIA, navegacion por teclado (flechas),
     boton de pausa para la reproduccion automatica y anuncios para
     lectores de pantalla.
   - Avanza solo cada 6 segundos; se puede pausar.
   ===================================================================== */
export default function TestimonialsCarousel({ testimonios = [] }) {
  const [actual, setActual] = useState(0)
  const [pausado, setPausado] = useState(false)
  const intervalRef = useRef(null)
  const total = testimonios.length

  const ir = (i) => setActual((i + total) % total)
  const siguiente = () => ir(actual + 1)
  const anterior = () => ir(actual - 1)

  // Reproduccion automatica (se detiene si el usuario la pausa).
  useEffect(() => {
    if (pausado || total <= 1) return
    intervalRef.current = setInterval(() => {
      setActual((a) => (a + 1) % total)
    }, 6000)
    return () => clearInterval(intervalRef.current)
  }, [pausado, total])

  // Navegacion por teclado con flechas izquierda/derecha.
  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') siguiente()
    if (e.key === 'ArrowLeft') anterior()
  }

  if (total === 0) return null

  const t = testimonios[actual]

  return (
    <div
      className="carousel"
      role="region"
      aria-roledescription="carrusel"
      aria-label="Testimonios de clientes"
      onKeyDown={onKeyDown}
      tabIndex={0}
    >
      <button
        className="carousel__nav carousel__nav--prev"
        onClick={anterior}
        aria-label="Testimonio anterior"
      >‹</button>

      {/* Region que se actualiza: avisamos a lectores de pantalla */}
      <div className="carousel__viewport" aria-live="polite">
        <figure className="carousel__slide" aria-roledescription="diapositiva"
                aria-label={`${actual + 1} de ${total}`}>
          <blockquote className="carousel__quote">“{t.texto}”</blockquote>
          <figcaption className="carousel__author">
            <strong>{t.nombre}</strong>
            <span>{t.empresa}</span>
          </figcaption>
        </figure>
      </div>

      <button
        className="carousel__nav carousel__nav--next"
        onClick={siguiente}
        aria-label="Testimonio siguiente"
      >›</button>

      <div className="carousel__controls">
        <button
          className="carousel__pause"
          onClick={() => setPausado((p) => !p)}
          aria-pressed={pausado}
        >
          {pausado ? '▶ Reanudar' : '⏸ Pausar'}
        </button>

        {/* Indicadores (puntos) navegables */}
        <div className="carousel__dots" role="tablist" aria-label="Seleccionar testimonio">
          {testimonios.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === actual}
              aria-label={`Ir al testimonio ${i + 1}`}
              className={`carousel__dot ${i === actual ? 'is-active' : ''}`}
              onClick={() => ir(i)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
