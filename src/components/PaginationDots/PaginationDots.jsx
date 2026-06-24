import './PaginationDots.css'

/**
 * @param {number} count
 * @param {number} active - index of the active dot
 * @param {'saffron'|'light'} variant - active dot color
 */
function PaginationDots({ count = 3, active = 0, variant = 'saffron', className = '' }) {
  return (
    <div className={`dots dots--${variant} ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className={`dots__dot ${i === active ? 'is-active' : ''}`} />
      ))}
    </div>
  )
}

export default PaginationDots
