import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../Icon/Icon.jsx'
import IconButton from '../IconButton/IconButton.jsx'
import { fetchProducts } from '../../api/products.js'
import { CATEGORIES } from '../../data/categories.js'
import './CategoryMenu.css'

/**
 * SHEIN-style "shop by category" panel that drops from the header.
 * Each category is a tile linking to its own filtered Shop view. Tile images
 * are pulled lazily from a real product in that category (no separate assets).
 */
function CategoryMenu({ open, onClose }) {
  const [images, setImages] = useState({})
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!open || loaded) return
    let active = true
    fetchProducts()
      .then((products) => {
        if (!active) return
        const map = {}
        for (const p of products) {
          if (p.category && !map[p.category]) map[p.category] = p.image
        }
        setImages(map)
        setLoaded(true)
      })
      .catch(() => active && setLoaded(true))
    return () => {
      active = false
    }
  }, [open, loaded])

  return (
    <>
      <div
        className={`catmenu__scrim ${open ? 'is-open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div className={`catmenu ${open ? 'is-open' : ''}`} role="dialog" aria-hidden={!open}>
        <div className="catmenu__bar">
          <span className="catmenu__heading">קנו לפי קטגוריה</span>
          <IconButton name="close" label="סגירה" onClick={onClose} />
        </div>

        <div className="catmenu__body">
          <aside className="catmenu__quick">
            <Link to="/shop" className="catmenu__quick-link" onClick={onClose}>
              כל הפריטים
            </Link>
            <Link
              to="/shop?sale=1"
              className="catmenu__quick-link catmenu__quick-link--accent"
              onClick={onClose}
            >
              סייל
            </Link>
          </aside>

          <div className="catmenu__grid">
            {CATEGORIES.map((category) => (
              <Link
                key={category}
                to={`/shop?category=${encodeURIComponent(category)}`}
                className="catmenu__tile"
                onClick={onClose}
              >
                <span className="catmenu__thumb">
                  {images[category] ? (
                    <img src={images[category]} alt={category} />
                  ) : (
                    <Icon name="checkroom" size="lg" />
                  )}
                </span>
                <span className="catmenu__label">{category}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default CategoryMenu
