import { useCollection } from '../hooks/useCollection.js'

function CollectionView({
  title,
  description,
  endpoint,
  fetcher,
  emptyMessage,
  children,
}) {
  const { items, loading, error } = useCollection(endpoint, fetcher)

  return (
    <section>
      <header className="page-heading">
        <h1>{title}</h1>
        <p>{description}</p>
      </header>

      {loading && (
        <div className="d-flex align-items-center gap-2 text-secondary" role="status">
          <span className="spinner-border spinner-border-sm" aria-hidden="true" />
          Loading {title.toLowerCase()}...
        </div>
      )}

      {!loading && error && (
        <div className="alert alert-danger" role="alert">
          <strong>Could not load {title.toLowerCase()}.</strong> {error}
        </div>
      )}

      {!loading && !error && items.length === 0 && (
        <div className="alert alert-light border" role="status">
          {emptyMessage}
        </div>
      )}

      {!loading && !error && items.length > 0 && children(items)}
    </section>
  )
}

export default CollectionView
