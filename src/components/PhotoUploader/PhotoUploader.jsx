import Icon from '../Icon/Icon.jsx'
import './PhotoUploader.css'

/**
 * Photo upload area. Two layouts:
 *  - "row"  : horizontal scrolling slots (mobile)
 *  - "grid" : feature primary slot + small add slots (desktop)
 * Images are mock previews; no real upload logic.
 */
function PhotoUploader({ layout = 'row', photos = [], emptySlots = 4 }) {
  if (layout === 'grid') {
    return (
      <div className="uploader uploader--grid">
        <div className="uploader__primary">
          <Icon name="add_a_photo" size="xl" className="uploader__primary-icon" />
          <span className="uploader__primary-label">תמונה ראשית (3:4)</span>
        </div>
        {Array.from({ length: emptySlots }).map((_, i) => (
          <div key={i} className="uploader__slot uploader__slot--dashed">
            <Icon name="add" size="lg" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="uploader uploader--row hide-scrollbar">
      <div className="uploader__add">
        <Icon name="camera_alt" size="lg" className="uploader__add-icon" />
        <span className="uploader__add-label">הוסיפי תמונה</span>
      </div>
      {photos.map((src, i) => (
        <div key={i} className="uploader__preview">
          <img src={src} alt="" className="uploader__preview-img" />
          <button type="button" className="uploader__remove" aria-label="הסר תמונה">
            <Icon name="close" size="sm" />
          </button>
        </div>
      ))}
    </div>
  )
}

export default PhotoUploader
