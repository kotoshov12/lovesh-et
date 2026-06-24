import './Badge.css'

/**
 * Product badge. Positioned absolutely by the parent card.
 * @param {'new'|'sale'|'last'} variant
 */
function Badge({ children, variant = 'new', className = '' }) {
  return <span className={`badge badge--${variant} ${className}`}>{children}</span>
}

export default Badge
