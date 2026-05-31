import { getServicios } from '../services/api'
import { useFetch } from '../hooks/useFetch'
import ServiceCard from './ServiceCard'
import './sections.css'

/* SECCION "SERVICIOS" - consume la API y pinta una ServiceCard por servicio.
   Recibe onContactar desde App para prellenar el formulario. */
export default function ServicesSection({ onContactar }) {
  const { datos, cargando, error } = useFetch(getServicios)

  return (
    <section id="servicios" className="section section--alt">
      <div className="container">
        <h2 className="section__title">Nuestros Servicios</h2>
        <p className="section__subtitle">Acompañamiento integral para hacer crecer tu negocio</p>

        {cargando && <p className="estado">Cargando servicios...</p>}
        {error && <p className="estado estado--error">No se pudieron cargar los servicios.</p>}

        {datos && (
          <div className="grid-cards">
            {datos.map((s) => (
              <ServiceCard
                key={s.id}
                id={s.id}
                titulo={s.titulo}
                descripcion={s.descripcion}
                imagen={s.imagen}
                alt={s.alt}
                onContactar={onContactar}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
