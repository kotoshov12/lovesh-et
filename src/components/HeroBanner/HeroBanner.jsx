import Button from '../Button/Button.jsx'
import PriceTag from '../PriceTag/PriceTag.jsx'
import PaginationDots from '../PaginationDots/PaginationDots.jsx'
import './HeroBanner.css'

/**
 * Home hero. Two variants:
 *  - "slide" : compact image+text banner with pagination (mobile)
 *  - "split" : large two-column editorial hero (desktop)
 */
function HeroBanner({
  variant = 'slide',
  eyebrow,
  title,
  body,
  image,
  price,
  original,
  ctaText,
  tag,
}) {
  if (variant === 'split') {
    return (
      <section className="hero hero--split">
        <div className="hero__panel">
          <span className="hero__eyebrow">{eyebrow}</span>
          <h1 className="hero__headline">{title}</h1>
          {body && <p className="hero__body">{body}</p>}
          {ctaText && <Button variant="primary">{ctaText}</Button>}
        </div>
        <div className="hero__media">
          <img src={image} alt="" className="hero__img" />
          {tag && <span className="hero__tag">{tag}</span>}
        </div>
      </section>
    )
  }

  return (
    <section className="hero hero--slide">
      <div className="hero__slide-text">
        <span className="hero__eyebrow hero__eyebrow--accent">{eyebrow}</span>
        <h2 className="hero__slide-title">{title}</h2>
        {(price || original) && (
          <PriceTag price={price} original={original} size="sm" className="hero__price" />
        )}
      </div>
      <div className="hero__slide-media">
        <img src={image} alt="" className="hero__img" />
      </div>
      <PaginationDots count={3} active={0} variant="saffron" className="hero__dots" />
    </section>
  )
}

export default HeroBanner
