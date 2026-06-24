import { Link } from 'react-router-dom'
import Logo from '../Logo/Logo.jsx'
import IconButton from '../IconButton/IconButton.jsx'
import './Header.css'

const NAV_LINKS = [
  { label: 'סייל', accent: true },
  { label: 'חולצות' },
  { label: 'מכנסיים' },
  { label: 'נעליים' },
  { label: 'אקססוריז' },
]

/**
 * Fixed pomegranate top app bar. Shows desktop nav links at wide widths and
 * collapses to icon actions + menu on mobile.
 */
function Header({ onMenu }) {
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
          <a
            key={link.label}
            href="#"
            className={`header__link ${link.accent ? 'header__link--accent' : ''}`}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className="header__group header__actions">
        <IconButton name="search" label="חיפוש" />
        <IconButton name="notifications" label="התראות" className="header__hide-mobile" />
        <Link to="/sell" className="header__sell" aria-label="העלאת פריט">
          <IconButton name="add" label="העלאת פריט" />
        </Link>
        <IconButton name="shopping_bag" label="סל קניות" />
      </div>
    </header>
  )
}

export default Header
