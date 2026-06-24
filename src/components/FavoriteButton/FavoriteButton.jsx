import Icon from '../Icon/Icon.jsx'
import { useFavorites } from '../../context/FavoritesContext.jsx'
import './FavoriteButton.css'

/**
 * Heart toggle backed by the favorites store. Pass the `product` so it can be
 * saved/removed. `overlay` renders the translucent card-corner style.
 */
function FavoriteButton({ product, overlay = false, className = '' }) {
  const { isFavorite, toggle } = useFavorites()
  const active = product ? isFavorite(product.id) : false

  function handleClick(e) {
    // The button usually sits inside a card <Link> — don't navigate.
    e.preventDefault()
    e.stopPropagation()
    if (product) toggle(product)
  }

  return (
    <button
      type="button"
      aria-label="הוספה למועדפים"
      aria-pressed={active}
      onClick={handleClick}
      className={`fav ${overlay ? 'fav--overlay' : ''} ${className}`}
    >
      <Icon name="favorite" size="md" filled={active} />
    </button>
  )
}

export default FavoriteButton
