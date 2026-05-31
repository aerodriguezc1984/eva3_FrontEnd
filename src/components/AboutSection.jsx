import { getAbout } from '../services/api'
import { useFetch } from '../hooks/useFetch'
import './sections.css'

/* SECCION "NOSOTROS" - consume datos de la API y los muestra dinamicamente. */
export default function AboutSection() {
  const { datos, cargando, error } = useFetch(getAbout)

  return (
    <section id="nosotros" className="section">
      <div className="container">
        <h2 className="section__title">Nosotros</h2>
        {cargando && <p className="estado">Cargando información...</p>}
        {error && <p className="estado estado--error">No se pudo cargar la información.</p>}
        {datos && (
          <div className="about">
            <div className="about__texto">
              {datos.parrafos.map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <ul className="about__stats">
              {datos.indicadores.map((ind, i) => (
                <li key={i}>
                  <span className="about__valor">{ind.valor}</span>
                  <span className="about__etiqueta">{ind.etiqueta}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}
