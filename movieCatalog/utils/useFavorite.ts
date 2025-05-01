import { useState, useEffect, useCallback } from 'react'
import { getFavorites, toggleFavorite as toggleFavStorage } from './favorites'

export function useFavorite(id: string) {
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    let mounted = true
    getFavorites().then(list => {
      if (mounted) setIsFavorite(list.includes(id))
    })
    return () => { mounted = false }
  }, [id])

  const toggle = useCallback(async () => {
    await toggleFavStorage(id)
    setIsFavorite(prev => !prev)
  }, [id])

  return { isFavorite, toggle }
}