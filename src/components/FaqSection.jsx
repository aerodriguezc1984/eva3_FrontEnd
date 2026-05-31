import { getFaq } from '../services/api'
import { useFetch } from '../hooks/useFetch'
import './sections.css'

/* SECCION "PREGUNTAS FRECUENTES" - acordeon accesible que consume la API.
   Usamos <details>/<summary>: accesible y con teclado de forma nativa. */
export default function FaqSection() {
  const { datos, cargando, error } = useFetch(getFaq)

  return (
    <section id="faq" className="section">
      <div className="container container--narrow">
        <h2 className="section__title">Preguntas frecuentes</h2>

        {cargando && <p className="estado">Cargando preguntas...</p>}
        {error && <p className="estado estado--error">No se pudieron cargar las preguntas.</p>}

        {datos && (
          <div className="faq">
            {datos.map((item) => (
              <details key={item.id} className="faq__item">
                <summary className="faq__pregunta">{item.pregunta}</summary>
                <p className="faq__respuesta">{item.respuesta}</p>
              </details>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
