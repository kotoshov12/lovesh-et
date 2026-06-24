import Icon from '../Icon/Icon.jsx'
import './SellerCard.css'

/**
 * Seller summary. `boxed` renders the bordered card style (desktop);
 * default is the borderless row (mobile detail).
 */
function SellerCard({ seller, boxed = false }) {
  const { name, avatar, location, distance } = seller
  return (
    <div className={`seller ${boxed ? 'seller--boxed' : ''}`}>
      <div className="seller__identity">
        <div className="seller__avatar">
          <img src={avatar} alt={name} />
        </div>
        <div className="seller__meta">
          <span className="seller__name">{name}</span>
          <span className="seller__location">
            <Icon name="location_on" size="sm" />
            {distance} · {location}
          </span>
        </div>
      </div>
      <a href="#" className="seller__link">
        פרופיל המוכרת ←
      </a>
    </div>
  )
}

export default SellerCard
