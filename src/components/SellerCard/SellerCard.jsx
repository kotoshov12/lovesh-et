import { Link } from 'react-router-dom'
import Icon from '../Icon/Icon.jsx'
import './SellerCard.css'

/**
 * Seller summary. `boxed` renders the bordered card style (desktop);
 * default is the borderless row (mobile detail). Links to the seller's public
 * profile when the seller has an id.
 */
function SellerCard({ seller, boxed = false }) {
  const { id, name, avatar, location, distance } = seller
  return (
    <div className={`seller ${boxed ? 'seller--boxed' : ''}`}>
      <div className="seller__identity">
        <div className="seller__avatar">
          {avatar ? <img src={avatar} alt={name} /> : <Icon name="account_circle" size="lg" />}
        </div>
        <div className="seller__meta">
          <span className="seller__name">{name}</span>
          <span className="seller__location">
            <Icon name="location_on" size="sm" />
            {distance} · {location}
          </span>
        </div>
      </div>
      {id && (
        <Link to={`/seller/${id}`} className="seller__link">
          פרופיל המוכרת ←
        </Link>
      )}
    </div>
  )
}

export default SellerCard
