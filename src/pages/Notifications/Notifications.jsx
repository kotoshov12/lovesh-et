import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../components/Header/Header.jsx'
import NavigationDrawer from '../../components/NavigationDrawer/NavigationDrawer.jsx'
import Footer from '../../components/Footer/Footer.jsx'
import BottomNavBar from '../../components/BottomNavBar/BottomNavBar.jsx'
import Icon from '../../components/Icon/Icon.jsx'
import StateMessage from '../../components/StateMessage/StateMessage.jsx'
import { fetchNotifications, markAllRead } from '../../api/notifications.js'
import './Notifications.css'

function Notifications() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [items, setItems] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let active = true
    fetchNotifications()
      .then((data) => {
        if (!active) return
        setItems(data)
        setStatus('ready')
        markAllRead().catch(() => {})
      })
      .catch((err) => {
        console.error(err)
        if (active) setStatus('error')
      })
    return () => {
      active = false
    }
  }, [])

  return (
    <div className="page">
      <Header onMenu={() => setDrawerOpen(true)} />
      <NavigationDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <main className="notifs">
        <h1 className="notifs__title">התראות</h1>

        {status === 'loading' && <StateMessage>טוען…</StateMessage>}
        {status === 'error' && (
          <StateMessage variant="error">
            שגיאה בטעינת ההתראות. ודא/י שהרצת את migration_v2.
          </StateMessage>
        )}
        {status === 'ready' && items.length === 0 && (
          <StateMessage>אין התראות חדשות.</StateMessage>
        )}
        {status === 'ready' && items.length > 0 && (
          <ul className="notifs__list">
            {items.map((n) => {
              const content = (
                <>
                  <Icon name={n.is_read ? 'notifications' : 'notifications_active'} size="md" />
                  <span className="notifs__body">{n.body}</span>
                </>
              )
              return (
                <li key={n.id} className={`notifs__item ${n.is_read ? '' : 'is-unread'}`}>
                  {n.link ? (
                    <Link to={n.link} className="notifs__link">
                      {content}
                    </Link>
                  ) : (
                    <div className="notifs__link">{content}</div>
                  )}
                </li>
              )
            })}
          </ul>
        )}
      </main>

      <Footer />
      <BottomNavBar />
    </div>
  )
}

export default Notifications
