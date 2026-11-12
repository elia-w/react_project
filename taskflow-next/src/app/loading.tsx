// Affiché pendant le chargement d'une page
// (avec cacheComponents, il sert aussi de <Suspense> obligatoire
// pour les pages qui attendent leurs données)
export default function Loading() {
  return (
    <div className="loading" aria-busy="true">
      <p className="muted">Chargement…</p>
      <div className="skeleton" />
      <div className="skeleton" />
    </div>
  );
}
