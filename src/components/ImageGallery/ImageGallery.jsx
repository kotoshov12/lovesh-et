import { useState } from 'react'
import PaginationDots from '../PaginationDots/PaginationDots.jsx'
import './ImageGallery.css'

/**
 * Product image gallery. Two layouts:
 *  - "single" : full-bleed image + pagination dots (mobile)
 *  - "thumbs" : main image with a thumbnail rail (desktop)
 * @param {string[]} images
 */
function ImageGallery({ images = [], layout = 'single' }) {
  const [active, setActive] = useState(0)

  if (layout === 'thumbs') {
    return (
      <div className="gallery gallery--thumbs">
        <div className="gallery__rail">
          {images.map((src, i) => (
            <button
              key={i}
              type="button"
              className={`gallery__thumb ${i === active ? 'is-active' : ''}`}
              onClick={() => setActive(i)}
            >
              <img src={src} alt="" />
            </button>
          ))}
        </div>
        <div className="gallery__main">
          <img src={images[active]} alt="" />
        </div>
      </div>
    )
  }

  return (
    <div className="gallery gallery--single">
      <img src={images[active]} alt="" className="gallery__hero" />
      <PaginationDots
        count={images.length}
        active={active}
        variant="light"
        className="gallery__dots"
      />
    </div>
  )
}

export default ImageGallery
