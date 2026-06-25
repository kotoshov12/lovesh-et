import { Link } from 'react-router-dom'
import PriceTag from '../PriceTag/PriceTag.jsx'
import './SaleCarousel.css'

/**
 * Full-width, swipeable hero carousel of items currently on sale.
 * @param {Array} items - sale products ({ id, name, image, price, original })
 */
function SaleCarousel({ items = [] }) {
  if (items.length === 0) return null
  return (
    <section className="sale-carousel" aria-label="מבצעים">
      <div className="sale-carousel__track hide-scrollbar">
        {items.map((p) => (
          <Link key={p.id} to={`/product/${p.id}`} className="sale-carousel__slide">
            <img src={p.image} alt={p.name} className="sale-carousel__img" />
            <div className="sale-carousel__panel">
              <span className="sale-carousel__eyebrow">במבצע עכשיו</span>
              <h2 className="sale-carousel__title">{p.name}</h2>
              <PriceTag price={p.price} original={p.original} size="md" className="sale-carousel__price" />
              <span className="sale-carousel__cta">לצפייה בפריט ←</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default SaleCarousel
