import './Icon.css'

/**
 * Material Symbols icon wrapper.
 * @param {string} name  - the symbol ligature (e.g. "favorite", "search")
 * @param {'sm'|'md'|'lg'|'xl'} size
 * @param {boolean} filled - use the filled variant
 */
function Icon({ name, size = 'lg', filled = false, className = '', style }) {
  return (
    <span
      className={`material-symbols-outlined icon icon--${size} ${className}`}
      style={{ fontVariationSettings: filled ? "'FILL' 1" : "'FILL' 0", ...style }}
      aria-hidden="true"
    >
      {name}
    </span>
  )
}

export default Icon
