import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../components/Header/Header.jsx'
import NavigationDrawer from '../../components/NavigationDrawer/NavigationDrawer.jsx'
import Footer from '../../components/Footer/Footer.jsx'
import BottomNavBar from '../../components/BottomNavBar/BottomNavBar.jsx'
import SectionHeader from '../../components/SectionHeader/SectionHeader.jsx'
import ProductCard from '../../components/ProductCard/ProductCard.jsx'
import Button from '../../components/Button/Button.jsx'
import Input from '../../components/Input/Input.jsx'
import Icon from '../../components/Icon/Icon.jsx'
import StateMessage from '../../components/StateMessage/StateMessage.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import { fetchMyProducts } from '../../api/products.js'
import { updateFullName } from '../../api/auth.js'
import './Profile.css'

function Profile() {
  const { user, signOut } = useAuth()
  const [drawerOpen, setDrawerOpen] = useState(false)

  const [items, setItems] = useState([])
  const [status, setStatus] = useState('loading') // loading | ready | error

  const initialName = user?.user_metadata?.full_name || ''
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(initialName)
  const [savingName, setSavingName] = useState(false)

  useEffect(() => {
    let active = true
    fetchMyProducts(user?.id)
      .then((data) => active && (setItems(data), setStatus('ready')))
      .catch((err) => {
        console.error(err)
        if (active) setStatus('error')
      })
    return () => {
      active = false
    }
  }, [user?.id])

  async function handleSaveName() {
    setSavingName(true)
    const { error } = await updateFullName(name.trim())
    setSavingName(false)
    if (!error) setEditing(false)
  }

  const displayName = initialName || user?.email

  return (
    <div className="page">
      <Header onMenu={() => setDrawerOpen(true)} />
      <NavigationDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <main className="profile">
        {/* Account header */}
        <section className="profile__account">
          <div className="profile__avatar">
            <Icon name="account_circle" size="xl" />
          </div>

          <div className="profile__identity">
            {editing ? (
              <div className="profile__edit">
                <Input
                  id="name"
                  label="שם מלא"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="השם שלך"
                />
                <div className="profile__edit-actions">
                  <Button variant="primary" onClick={handleSaveName}>
                    {savingName ? 'שומרת…' : 'שמירה'}
                  </Button>
                  <Button
                    variant="text"
                    onClick={() => {
                      setName(initialName)
                      setEditing(false)
                    }}
                  >
                    ביטול
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <h1 className="profile__name">{displayName}</h1>
                <p className="profile__email">{user?.email}</p>
                <div className="profile__account-actions">
                  <Button variant="outline" onClick={() => setEditing(true)}>
                    עריכת פרופיל
                  </Button>
                  <Button variant="text" onClick={signOut}>
                    התנתקות
                  </Button>
                </div>
              </>
            )}
          </div>
        </section>

        {/* My listings */}
        <section className="profile__listings">
          <SectionHeader title="המוצרים שלי" eyebrow="MY LISTINGS" />

          {status === 'loading' && <StateMessage>טוען את הפריטים שלך…</StateMessage>}
          {status === 'error' && (
            <StateMessage variant="error">
              לא הצלחנו לטעון את הפריטים שלך. ודאי שהרצת את מיגרציית ה-user_id ב-Supabase.
            </StateMessage>
          )}
          {status === 'ready' && items.length === 0 && (
            <div className="profile__empty">
              <StateMessage>עדיין לא העלית פריטים למכירה.</StateMessage>
              <Link to="/sell" className="profile__empty-cta">
                <Button variant="primary" icon="add">
                  העלאת פריט ראשון
                </Button>
              </Link>
            </div>
          )}
          {status === 'ready' && items.length > 0 && (
            <div className="profile__grid">
              {items.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
      <BottomNavBar />
    </div>
  )
}

export default Profile
