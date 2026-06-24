import { createContext, useContext, useState, useEffect } from 'react'

const STORAGE_KEY = 'loveshet_favorites'
const FavoritesContext = createContext(null)

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
  } catch {
    return []
  }
}

export function FavoritesProvider({ children }) {
  const [items, setItems] = useState(load)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  function toggle(product) {
    setItems((prev) =>
      prev.some((i) => i.id === product.id)
        ? prev.filter((i) => i.id !== product.id)
        : [...prev, product]
    )
  }

  function isFavorite(id) {
    return items.some((i) => i.id === id)
  }

  return (
    <FavoritesContext.Provider value={{ items, toggle, isFavorite, count: items.length }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  return useContext(FavoritesContext)
}
