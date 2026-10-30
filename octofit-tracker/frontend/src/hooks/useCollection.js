import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

export function useCollection(path, fetcher = fetchCollection) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadCollection() {
      setLoading(true)
      setError('')

      try {
        const collection = await fetcher(path, {
          signal: controller.signal,
        })
        setItems(collection)
      } catch (requestError) {
        if (!controller.signal.aborted) {
          setItems([])
          setError(
            requestError instanceof Error
              ? requestError.message
              : String(requestError),
          )
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    void loadCollection()

    return () => controller.abort()
  }, [fetcher, path])

  return { items, loading, error }
}
