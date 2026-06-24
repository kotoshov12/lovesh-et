import './PriceTag.css'

/**
 * Price display. When `original` is set, current price renders in pomegranate
 * with the original struck through.
 * @param {'sm'|'md'|'lg'} size  - maps to product / section / hero scale
 * @param {'row'|'stack'} layout
 */
function PriceTag({ price, original, size = 'sm', layout = 'row', className = '' }) {
  const onSale = Boolean(original)
  return (
    <div className={`price price--${size} price--${layout} ${className}`}>
      <span className={`price__current ${onSale ? 'price__current--sale' : ''}`}>{price}</span>
      {onSale && <span className="price__original">{original}</span>}
    </div>
  )
}

export default PriceTag
