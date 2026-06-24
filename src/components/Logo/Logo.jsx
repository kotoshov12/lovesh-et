import './Logo.css'

/**
 * LOVEsh\et wordmark. The "\" is the brand signature in saffron.
 * @param {'sm'|'md'|'lg'} size
 * @param {boolean} onDark - render in cream for dark backgrounds (default)
 */
function Logo({ size = 'md', onDark = true, className = '' }) {
  return (
    <span className={`logo logo--${size} ${onDark ? 'logo--on-dark' : 'logo--on-light'} ${className}`}>
      LOVEsh<span className="logo__slash">\</span>et
    </span>
  )
}

export default Logo
