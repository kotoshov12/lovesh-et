import { Link } from 'react-router-dom'
import Badge from '../Badge/Badge.jsx'
import FavoriteButton from '../FavoriteButton/FavoriteButton.jsx'
import DistancePill from '../DistancePill/DistancePill.jsx'
import PriceTag from '../PriceTag/PriceTag.jsx'
import { useCart } from '../../context/CartContext.jsx'
import './ProductCard.css'

/**
 * Flat product card. All extras are opt-in via the `product` shape:
 *   { id, name, image, price, original, badge:{text,variant},
 *     distance, caption, favorite }
 * @param {boolean} showFavorite - render the heart overlay
 * @param {boolean} showAddToCart - reveal "add to cart" on hover (desktop)
 */
function ProductCard({ product, showFavorite = false, showAddToCart = false }) {
  const { id, name, image, price, original, badge, distance, caption } = product
  const { add, has } = useCart()
  const inCart = has(id)

  function handleAdd(e) {
    e.preventDefault()
    e.stopPropagation()
    add(product)
  }

  return (
    <Link to={`/product/${id}`} className="product-card">
      <div className="product-card__media">
        <img src={image} alt={name} className="product-card__img" />

        {badge && (
          <Badge variant={badge.variant} className="product-card__badge">
            {badge.text}
          </Badge>
        )}

        {showFavorite && (
          <FavoriteButton product={product} overlay className="product-card__fav" />
        )}

        {distance && <DistancePill distance={distance} className="product-card__distance" />}

        {showAddToCart && (
          <button type="button" className="product-card__cart" onClick={handleAdd}>
            {inCart ? 'נוסף לסל ✓' : 'הוספה לסל'}
          </button>
        )}
      </div>

      <div className="product-card__info">
        <h3 className="product-card__name">{name}</h3>
        {caption && <p className="product-card__caption">{caption}</p>}
        <PriceTag price={price} original={original} size="sm" />
      </div>
    </Link>
  )
}

export default ProductCard
