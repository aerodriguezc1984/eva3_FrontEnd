import './sections.css'

/* PIE DE PAGINA con datos de contacto reales del cliente. */
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div>
          <h3>Centro de Negocios Santiago</h3>
          <p>SERCOTEC — Apoyo a micro, pequeñas y medianas empresas.</p>
        </div>
        <address className="footer__datos">
          <p>📍 Manuel Rodríguez Sur 749, Santiago (Metro Toesca)</p>
          <p>✉ <a href="mailto:centro.santiago@centrossercotec.cl">centro.santiago@centrossercotec.cl</a></p>
          <p>🌐 <a href="https://sitios.sercotec.cl/centros-de-negocios/centro-de-desarrollo-de-negocios-santiago/" target="_blank" rel="noopener noreferrer">Sitio oficial SERCOTEC</a></p>
        </address>
      </div>
      <p className="footer__copy">© {new Date().getFullYear()} Centro de Negocios Santiago. Demo educativa.</p>
    </footer>
  )
}
