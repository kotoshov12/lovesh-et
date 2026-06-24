import Icon from '../Icon/Icon.jsx'
import './DistancePill.css'

/**
 * Translucent distance pill anchored to a card corner.
 */
function DistancePill({ distance, className = '' }) {
  return (
    <span className={`distance-pill ${className}`}>
      <Icon name="location_on" size="sm" />
      {distance}
    </span>
  )
}

export default DistancePill
