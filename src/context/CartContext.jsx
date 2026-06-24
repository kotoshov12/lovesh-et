import { createContext, useContext, useState, useEffect } from 'react'

const STORAGE_KEY = 'loveshet_cart'
const CartContext = createContext(null)

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(load)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  function add(product) {
    setItems((prev) => (prev.some((i) => i.id === product.id) ? prev : [...prev, product]))
  }

  function remove(id) {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  function clear() {
    setItems([])
  }

  function has(id) {
    return items.some((i) => i.id === id)
  }

  const count = items.length
  const total = items.reduce((sum, i) => sum + (i.priceValue || 0), 0)

  return (
    <CartContext.Provider value={{ items, add, remove, clear, has, count, total }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
