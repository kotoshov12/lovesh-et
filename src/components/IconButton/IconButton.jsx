import Icon from '../Icon/Icon.jsx'
import './IconButton.css'

/**
 * Bare icon button used in headers, cards and bars.
 * @param {string} name - Material Symbol name
 * @param {'sm'|'md'|'lg'|'xl'} size
 */
function IconButton({ name, size = 'lg', filled = false, label, onClick, className = '' }) {
  return (
    <button
      type="button"
      className={`icon-button ${className}`}
      onClick={onClick}
      aria-label={label}
    >
      <Icon name={name} size={size} filled={filled} />
    </button>
  )
}

export default IconButton
