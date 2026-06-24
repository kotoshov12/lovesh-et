import { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo/Logo.jsx'
import Icon from '../Icon/Icon.jsx'
import IconButton from '../IconButton/IconButton.jsx'
import CategoryMenu from '../CategoryMenu/CategoryMenu.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import { useCart } from '../../context/CartContext.jsx'
import './Header.css'

/**
 * Fixed pomegranate top app bar. Categories now live behind a "קטגוריות"
 * trigger that opens a SHEIN-style panel, instead of inline links.
 */
function Header({ onMenu }) {
  const { user } = useAuth()
  const { count } = useCart()
  const [catOpen, setCatOpen] = useState(false)

  return (
    <>
      <header className="header">
        <div className="header__group">
          <IconButton name="menu" label="תפריט" onClick={onMenu} className="header__menu" />
          <Link to="/" className="header__logo">
            <Logo size="md" />
          </Link>
        </div>

        <nav className="header__nav">
          <button
            type="button"
            className="header__cats"
            onClick={() => setCatOpen((v) => !v)}
            aria-expanded={catOpen}
          >
            <Icon name="grid_view" size="md" />
            <span className="header__cats-label">קטגוריות</span>
          </button>
          <Link to="/shop?sale=1" className="header__link header__link--accent">
            מבצע
          </Link>
          <Link to="/support" className="header__link header__link--muted">
            שירות לקוחות
          </Link>
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
          <Link to="/cart" className="header__action header__cart" aria-label="סל קניות">
            <Icon name="shopping_bag" />
            {count > 0 && <span className="header__cart-count">{count}</span>}
          </Link>
        </div>
      </header>

      <CategoryMenu open={catOpen} onClose={() => setCatOpen(false)} />
    </>
  )
}

export default Header
