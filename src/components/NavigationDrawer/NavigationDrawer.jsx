import { Link } from 'react-router-dom'
import Icon from '../Icon/Icon.jsx'
import IconButton from '../IconButton/IconButton.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import './NavigationDrawer.css'

const MENU = [
  { label: 'הפרופיל שלי', icon: 'person', to: '/profile' },
  { label: 'ההודעות שלי', icon: 'chat', to: '/messages' },
  { label: 'סל הקניות', icon: 'shopping_bag', to: '/cart' },
  { label: 'פריטים שאהבתי', icon: 'favorite', to: '/profile' },
  { label: 'שירות לקוחות', icon: 'support_agent', to: '/support' },
]

/**
 * Slide-in side menu. Controlled via `open` / `onClose`.
 * Auth-aware: shows the signed-in user + logout, or login/register links.
 */
function NavigationDrawer({ open = false, onClose }) {
  const { user, signOut } = useAuth()
  const displayName = user?.user_metadata?.full_name || user?.email

  async function handleSignOut() {
    await signOut()
    onClose?.()
  }

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
                <Icon name="account_circle" size="xl" />
              </div>
              <div className="drawer__profile-text">
                <span className="drawer__greeting">שלום</span>
                <span className="drawer__email">{displayName}</span>
              </div>
            </div>
          ) : (
            <span className="drawer__title">תפריט</span>
          )}
          <IconButton name="close" label="סגירה" onClick={onClose} />
        </div>

        {user ? (
          <>
            <nav className="drawer__nav">
              {MENU.map((item) => (
                <Link key={item.label} to={item.to} className="drawer__link" onClick={onClose}>
                  <span>{item.label}</span>
                  <Icon name={item.icon} size="md" />
                </Link>
              ))}
            </nav>
            <button type="button" className="drawer__logout" onClick={handleSignOut}>
              <span>התנתקות</span>
              <Icon name="logout" size="md" />
            </button>
          </>
        ) : (
          <div className="drawer__auth">
            <Link to="/login" className="drawer__auth-primary" onClick={onClose}>
              התחברות
            </Link>
            <Link to="/register" className="drawer__auth-secondary" onClick={onClose}>
              הרשמה
            </Link>
          </div>
        )}
      </aside>
    </>
  )
}

export default NavigationDrawer
