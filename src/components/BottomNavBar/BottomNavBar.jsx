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

      <Link
        to="/shop"
        className={`bottom-nav__item ${isActive('/shop') ? 'is-active' : ''}`}
        aria-label="חיפוש"
      >
        <Icon name="search" filled={isActive('/shop')} />
      </Link>

      <Link to="/sell" className="bottom-nav__fab" aria-label="העלאת פריט">
        <Icon name="add" size="xl" />
      </Link>

      <Link
        to="/cart"
        className={`bottom-nav__item ${isActive('/cart') ? 'is-active' : ''}`}
        aria-label="סל קניות"
      >
        <Icon name="shopping_bag" filled={isActive('/cart')} />
      </Link>

      <Link
        to={user ? '/profile' : '/login'}
        className={`bottom-nav__item ${isActive(user ? '/profile' : '/login') ? 'is-active' : ''}`}
        aria-label={user ? 'הפרופיל שלי' : 'התחברות'}
      >
        <Icon name={user ? 'account_circle' : 'login'} filled={isActive('/profile')} />
      </Link>
    </nav>
  )
}

export default BottomNavBar
