import { Link } from 'react-router-dom'
import Logo from '../Logo/Logo.jsx'
import Icon from '../Icon/Icon.jsx'
import IconButton from '../IconButton/IconButton.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import { NAV_CATEGORIES } from '../../data/categories.js'
import './Header.css'

const NAV_LINKS = [
  { label: 'סייל', to: '/shop?sale=1', accent: true },
  ...NAV_CATEGORIES.map((c) => ({ label: c, to: `/shop?category=${encodeURIComponent(c)}` })),
]

/**
 * Fixed pomegranate top app bar. Shows desktop nav links at wide widths and
 * collapses to icon actions + menu on mobile. Always exposes an account entry
 * (→ /profile when signed in, → /login otherwise).
 */
function Header({ onMenu }) {
  const { user } = useAuth()

  return (
    <header className="header">
      <div className="header__group">
        <IconButton name="menu" label="תפריט" onClick={onMenu} className="header__menu" />
        <Link to="/" className="header__logo">
          <Logo size="md" />
        </Link>
      </div>

      <nav className="header__nav">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.label}
            to={link.to}
            className={`header__link ${link.accent ? 'header__link--accent' : ''}`}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="header__group header__actions">
        <Link to="/shop" className="header__action" aria-label="חיפוש">
          <Icon name="search" />
        </Link>
        <Link to="/sell" className="header__action" aria-label="העלאת פריט">
          <Icon name="add" />
        </Link>
        <Link
          to={user ? '/profile' : '/login'}
          className="header__action"
          aria-label={user ? 'הפרופיל שלי' : 'התחברות'}
        >
          <Icon name={user ? 'account_circle' : 'person'} />
        </Link>
        <IconButton name="shopping_bag" label="סל קניות" />
      </div>
    </header>
  )
}

export default Header
