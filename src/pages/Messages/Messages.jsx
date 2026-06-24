import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../components/Header/Header.jsx'
import NavigationDrawer from '../../components/NavigationDrawer/NavigationDrawer.jsx'
import Footer from '../../components/Footer/Footer.jsx'
import BottomNavBar from '../../components/BottomNavBar/BottomNavBar.jsx'
import Icon from '../../components/Icon/Icon.jsx'
import StateMessage from '../../components/StateMessage/StateMessage.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import { fetchConversations } from '../../api/messages.js'
import './Messages.css'

function Messages() {
  const { user } = useAuth()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [conversations, setConversations] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let active = true
    fetchConversations()
      .then((data) => active && (setConversations(data), setStatus('ready')))
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

      <main className="messages">
        <h1 className="messages__title">ההודעות שלי</h1>

        {status === 'loading' && <StateMessage>טוען שיחות…</StateMessage>}
        {status === 'error' && (
          <StateMessage variant="error">
            שגיאה בטעינת השיחות. ודאי שהרצת את מיגרציית ההודעות ב-Supabase.
          </StateMessage>
        )}
        {status === 'ready' && conversations.length === 0 && (
          <StateMessage>אין עדיין שיחות. אפשר לפנות למוכר/ת מעמוד הפריט.</StateMessage>
        )}
        {status === 'ready' && conversations.length > 0 && (
          <ul className="messages__list">
            {conversations.map((c) => (
              <li key={c.id}>
                <Link to={`/messages/${c.id}`} className="messages__item">
                  <span className="messages__thumb">
                    {c.product?.image ? (
                      <img src={c.product.image} alt="" />
                    ) : (
                      <Icon name="chat" size="md" />
                    )}
                  </span>
                  <span className="messages__meta">
                    <span className="messages__name">{c.product?.name || 'שיחה'}</span>
                    <span className="messages__role">
                      {c.seller_id === user?.id ? 'את המוכרת' : 'את הקונה'}
                    </span>
                  </span>
                  <Icon name="chevron_left" size="md" className="messages__chev" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>

      <Footer />
      <BottomNavBar />
    </div>
  )
}

export default Messages
