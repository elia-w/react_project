// Affiché pendant le chargement d'une page
// (créé en avance : cacheComponents exige un écran de chargement
// pour une page qui attend ses données)
export default function Loading() {
  return (
    <div className="loading" aria-busy="true">
      <p className="muted">Chargement…</p>
      <div className="skeleton" />
      <div className="skeleton" />
    </div>
  );
}
