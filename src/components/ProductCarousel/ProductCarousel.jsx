import { Link } from 'react-router-dom'
import PriceTag from '../PriceTag/PriceTag.jsx'
import './ProductCarousel.css'

/**
 * Horizontal-scroll row of compact "similar items" cards.
 * @param {Array} items - { id, name, image, price, original }
 */
function ProductCarousel({ title, items = [] }) {
  return (
    <section className="carousel">
      {title && <h2 className="carousel__title">{title}</h2>}
      <div className="carousel__track hide-scrollbar">
        {items.map((item) => (
          <Link key={item.id} to={`/product/${item.id}`} className="carousel__card">
            <div className="carousel__media">
              <img src={item.image} alt={item.name} />
            </div>
            <p className="carousel__name">{item.name}</p>
            <PriceTag price={item.price} original={item.original} size="sm" />
          </Link>
        ))}
      </div>
    </section>
  )
}

export default ProductCarousel
