import './SectionHeader.css'

/**
 * Section title with optional eyebrow and "view all" link.
 */
function SectionHeader({ eyebrow, title, linkText, onLink, className = '' }) {
  return (
    <div className={`section-header ${className}`}>
      <div className="section-header__titles">
        {eyebrow && <span className="section-header__eyebrow">{eyebrow}</span>}
        <h2 className="section-header__title">{title}</h2>
      </div>
      {linkText && (
        <button type="button" className="section-header__link" onClick={onLink}>
          {linkText}
        </button>
      )}
    </div>
  )
}

export default SectionHeader
