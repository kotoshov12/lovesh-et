import PriceTag from '../PriceTag/PriceTag.jsx'
import './ProductInfo.css'

/**
 * Title / price / metadata block for the product detail page.
 * @param {{label:string,value:string}[]} meta - rendered as a bordered grid
 * @param {string[]} tags - simple dot-separated attribute list
 */
function ProductInfo({ eyebrow, title, price, original, meta = [], tags = [] }) {
  return (
    <div className="product-info">
      <div className="product-info__head">
        {eyebrow && <span className="product-info__eyebrow">{eyebrow}</span>}
        <h1 className="product-info__title">{title}</h1>
        <PriceTag price={price} original={original} size="md" className="product-info__price" />
      </div>

      {tags.length > 0 && (
        <div className="product-info__tags">
          {tags.map((tag, i) => (
            <span key={tag} className="product-info__tag">
              {tag}
              {i < tags.length - 1 && <span className="product-info__sep">•</span>}
            </span>
          ))}
        </div>
      )}

      {meta.length > 0 && (
        <div className="product-info__meta">
          {meta.map((m) => (
            <div key={m.label} className="product-info__meta-item">
              <span className="product-info__meta-label">{m.label}</span>
              <span className="product-info__meta-value">{m.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductInfo
