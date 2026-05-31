import './ServiceCard.css'

/* =====================================================================
   COMPONENTE REUTILIZABLE: ServiceCard (Tarjeta de servicio)
   ---------------------------------------------------------------------
   Recibe por "props": imagen, titulo, descripcion y el id del servicio.
   Incluye un boton "Contáctanos" que lleva al formulario de contacto y,
   mediante la funcion onContactar, prellena el campo "servicio".

   Es reutilizable: la misma tarjeta sirve para cualquier servicio,
   solo cambian los datos que recibe.
   ===================================================================== */
export default function ServiceCard({ id, titulo, descripcion, imagen, alt, onContactar }) {
  return (
    <article className="card" aria-labelledby={`titulo-${id}`}>
      <img
        className="card__img"
        src={imagen}
        alt={alt || titulo}
        loading="lazy"   /* carga diferida: mejora el rendimiento */
        width="320"
        height="180"
      />
      <div className="card__body">
        <h3 className="card__title" id={`titulo-${id}`}>{titulo}</h3>
        <p className="card__desc">{descripcion}</p>
        <button
          type="button"
          className="btn btn--primary card__btn"
          onClick={() => onContactar(titulo)}
          aria-label={`Contáctanos por el servicio ${titulo}`}
        >
          Contáctanos
        </button>
      </div>
    </article>
  )
}
