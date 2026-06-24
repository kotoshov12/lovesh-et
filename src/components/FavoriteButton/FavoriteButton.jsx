import { useState } from 'react'
import Icon from '../Icon/Icon.jsx'
import './FavoriteButton.css'

/**
 * Heart toggle. `overlay` renders the translucent card-corner style.
 */
function FavoriteButton({ initial = false, overlay = false, className = '' }) {
  const [active, setActive] = useState(initial)
  return (
    <button
      type="button"
      aria-label="הוסף למועדפים"
      aria-pressed={active}
      onClick={() => setActive((v) => !v)}
      className={`fav ${overlay ? 'fav--overlay' : ''} ${className}`}
    >
      <Icon name="favorite" size="md" filled={active} />
    </button>
  )
}

export default FavoriteButton
