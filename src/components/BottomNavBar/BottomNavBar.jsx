import { Link, useLocation } from 'react-router-dom'
import Icon from '../Icon/Icon.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import './BottomNavBar.css'

/**
 * Mobile bottom navigation with a raised center "+" action.
 * Hidden on desktop via CSS.
 */
function BottomNavBar() {
  const { pathname } = useLocation()
  const { user } = useAuth()
  const isActive = (path) => pathname === path

  return (
    <nav className="bottom-nav">
      <Link to="/" className={`bottom-nav__item ${isActive('/') ? 'is-active' : ''}`}>
        <Icon name="home" filled={isActive('/')} />
        {isActive('/') && <span className="bottom-nav__dot" />}
      </Link>

      <button type="button" className="bottom-nav__item" aria-label="חיפוש">
        <Icon name="search" />
      </button>

      <Link to="/sell" className="bottom-nav__fab" aria-label="העלאת פריט">
        <Icon name="add" size="xl" />
      </Link>

      <button type="button" className="bottom-nav__item" aria-label="מועדפים">
        <Icon name="favorite" />
      </button>

      <Link
        to={user ? '/sell' : '/login'}
        className={`bottom-nav__item ${isActive('/login') ? 'is-active' : ''}`}
        aria-label={user ? 'החשבון שלי' : 'התחברות'}
      >
        <Icon name={user ? 'account_circle' : 'login'} />
      </Link>
    </nav>
  )
}

export default BottomNavBar
