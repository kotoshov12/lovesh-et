import './LocationMap.css'

/**
 * Google Maps embed for a free-text place (no API key needed).
 * @param {string} query - e.g. "תל אביב"
 */
function LocationMap({ query, title = 'מיקום' }) {
  if (!query) return null
  const src = `https://www.google.com/maps?q=${encodeURIComponent(query)}&z=13&output=embed`
  return (
    <div className="location-map">
      <iframe
        className="location-map__frame"
        title={title}
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  )
}

export default LocationMap
