import Icon from '../Icon/Icon.jsx'
import './Stars.css'

/**
 * Star rating. Read-only by default; pass `onSelect` to make it interactive.
 * @param {number} value
 * @param {(n:number)=>void} [onSelect]
 */
function Stars({ value = 0, max = 5, onSelect, size = 'md' }) {
  return (
    <span className="stars">
      {Array.from({ length: max }).map((_, i) => {
        const n = i + 1
        const filled = n <= Math.round(value)
        if (onSelect) {
          return (
            <button
              key={n}
              type="button"
              className="stars__btn"
              onClick={() => onSelect(n)}
              aria-label={`${n} כוכבים`}
            >
              <Icon name="star" filled={n <= value} size={size} className="stars__star" />
            </button>
          )
        }
        return <Icon key={n} name="star" filled={filled} size={size} className="stars__star" />
      })}
    </span>
  )
}

export default Stars
