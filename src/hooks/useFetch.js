import { useEffect, useState } from 'react'

/* =====================================================================
   HOOK PERSONALIZADO useFetch
   Reutiliza la logica de "pedir datos a la API" en cualquier componente.
   Devuelve: datos, si esta cargando, y el error (si lo hubo).
   Esto evita repetir el mismo codigo de carga en cada seccion.
   ===================================================================== */
export function useFetch(fetchFn) {
  const [datos, setDatos] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let activo = true // evita actualizar estado si el componente se desmonta
    setCargando(true)
    fetchFn()
      .then((res) => { if (activo) { setDatos(res); setError(null) } })
      .catch((err) => { if (activo) setError(err.message) })
      .finally(() => { if (activo) setCargando(false) })
    return () => { activo = false }
  }, [])

  return { datos, cargando, error }
}
