import Icon from '../Icon/Icon.jsx'
import IconButton from '../IconButton/IconButton.jsx'
import './NavigationDrawer.css'

const MENU = [
  { label: 'הפרופיל שלי', icon: 'person' },
  { label: 'ההזמנות שלי', icon: 'package_2' },
  { label: 'פריטים שאהבתי', icon: 'favorite' },
  { label: 'הגדרות', icon: 'settings' },
]

/**
 * Slide-in side menu. Controlled via `open` / `onClose`.
 * @param {object} [user] - { name, avatar }; when present, renders a profile header
 */
function NavigationDrawer({ open = false, onClose, user }) {
  return (
    <>
      <div
        className={`drawer__scrim ${open ? 'is-open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside className={`drawer ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <div className="drawer__head">
          {user ? (
            <div className="drawer__profile">
              <div className="drawer__avatar">
                <img src={user.avatar} alt={user.name} />
              </div>
              <div className="drawer__profile-text">
                <span className="drawer__greeting">שלום, {user.name}</span>
                <span className="drawer__profile-link">צפייה בפרופיל</span>
              </div>
            </div>
          ) : (
            <span className="drawer__title">תפריט</span>
          )}
          <IconButton name="close" label="סגירה" onClick={onClose} />
        </div>

        <nav className="drawer__nav">
          {MENU.map((item) => (
            <a key={item.label} href="#" className="drawer__link">
              <span>{item.label}</span>
              <Icon name={item.icon} size="md" />
            </a>
          ))}
        </nav>
      </aside>
    </>
  )
}

export default NavigationDrawer
