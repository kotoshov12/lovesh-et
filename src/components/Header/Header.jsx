import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from '../Logo/Logo.jsx'
import Icon from '../Icon/Icon.jsx'
import CategoryMenu from '../CategoryMenu/CategoryMenu.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import { useCart } from '../../context/CartContext.jsx'
import { fetchUnreadCount, subscribeToNotifications } from '../../api/notifications.js'
import { fetchUnreadMessageCount } from '../../api/messages.js'
import './Header.css'

/**
 * Fixed pomegranate top app bar.
 *  - Left edge: logo, categories trigger, customer service.
 *  - Right edge: profile, upload, notifications, cart, search.
 *  - Middle: empty. ("מבצע" lives only inside the categories panel.)
 */
function Header() {
  const { user } = useAuth()
  const { count } = useCart()
  const { pathname } = useLocation()
  const [catOpen, setCatOpen] = useState(false)
  const [unread, setUnread] = useState(0)
  const [msgUnread, setMsgUnread] = useState(0)

  useEffect(() => {
    if (!user) {
      setUnread(0)
      return
    }
    let active = true
    fetchUnreadCount().then((c) => active && setUnread(c))
    const unsub = subscribeToNotifications(user.id, () => setUnread((c) => c + 1))
    return () => {
      active = false
      unsub()
    }
  }, [user?.id])

  // Unread chat messages — refreshed on navigation (e.g. after reading a chat).
  useEffect(() => {
    if (!user) {
      setMsgUnread(0)
      return
    }
    let active = true
    fetchUnreadMessageCount().then((c) => active && setMsgUnread(c))
    return () => {
      active = false
    }
  }, [user?.id, pathname])

  return (
    <>
      <header className="header">
        {/* Left edge */}
        <div className="header__left">
          <Link to="/" className="header__logo">
            <Logo size="md" />
          </Link>
          <button
            type="button"
            className="header__cats"
            onClick={() => setCatOpen((v) => !v)}
            aria-expanded={catOpen}
          >
            <Icon name="grid_view" size="md" />
            <span className="header__cats-label">קטגוריות</span>
          </button>
        </div>

        {/* Right edge — profile is the right-most item */}
        <div className="header__right">
          <Link to="/shop" className="header__action" aria-label="חיפוש">
            <Icon name="search" />
          </Link>
          <Link to="/cart" className="header__action header__badge-host" aria-label="סל קניות">
            <Icon name="shopping_bag" />
            {count > 0 && <span className="header__badge">{count}</span>}
          </Link>
          {user && (
            <Link to="/messages" className="header__action header__badge-host" aria-label="הודעות">
              <Icon name="forum" />
              {msgUnread > 0 && <span className="header__badge">{msgUnread}</span>}
            </Link>
          )}
          {user && (
            <Link
              to="/notifications"
              className="header__action header__badge-host"
              aria-label="התראות"
            >
              <Icon name="notifications" />
              {unread > 0 && <span className="header__badge">{unread}</span>}
            </Link>
          )}
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
        </div>
      </header>

      <CategoryMenu open={catOpen} onClose={() => setCatOpen(false)} />
    </>
  )
}

export default Header
