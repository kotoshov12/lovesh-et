import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Header from '../../components/Header/Header.jsx'
import NavigationDrawer from '../../components/NavigationDrawer/NavigationDrawer.jsx'
import Footer from '../../components/Footer/Footer.jsx'
import BottomNavBar from '../../components/BottomNavBar/BottomNavBar.jsx'
import SectionHeader from '../../components/SectionHeader/SectionHeader.jsx'
import ProductCard from '../../components/ProductCard/ProductCard.jsx'
import Icon from '../../components/Icon/Icon.jsx'
import StateMessage from '../../components/StateMessage/StateMessage.jsx'
import LocationMap from '../../components/LocationMap/LocationMap.jsx'
import { fetchProfile } from '../../api/profiles.js'
import { fetchProductsByUser } from '../../api/products.js'
import '../SellerProfile/SellerProfile.css'

function UserProfile() {
  const { id } = useParams()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [profile, setProfile] = useState(null)
  const [items, setItems] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let active = true
    setStatus('loading')
    Promise.all([fetchProfile(id), fetchProductsByUser(id)])
      .then(([prof, list]) => {
        if (!active) return
        setProfile(prof)
        setItems(list)
        setStatus('ready')
      })
      .catch((err) => {
        console.error(err)
        if (active) setStatus('error')
      })
    return () => {
      active = false
    }
  }, [id])

  const name = profile?.full_name || 'משתמש'

  return (
    <div className="page">
      <Header onMenu={() => setDrawerOpen(true)} />
      <NavigationDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <main className="seller-profile">
        {status === 'loading' && <StateMessage>טוען פרופיל…</StateMessage>}
        {status === 'error' && <StateMessage variant="error">שגיאה בטעינת הפרופיל.</StateMessage>}

        {status === 'ready' && (
          <>
            <section className="seller-profile__head">
              <div className="seller-profile__avatar">
                {profile?.avatar_url ? (
                  <img src={profile.avatar_url} alt={name} />
                ) : (
                  <Icon name="account_circle" size="xl" />
                )}
              </div>
              <div className="seller-profile__id">
                <h1 className="seller-profile__name">{name}</h1>
                {profile?.location && (
                  <p className="seller-profile__loc">
                    <Icon name="location_on" size="sm" />
                    {profile.location}
                  </p>
                )}
                <p className="seller-profile__count">{items.length} פריטים למכירה</p>
                {profile?.bio && <p className="seller-profile__loc">{profile.bio}</p>}
              </div>
            </section>

            <div className="seller-profile__main">
              <section className="seller-profile__listings-col">
                <SectionHeader title={`הפריטים של ${name}`} eyebrow="LISTINGS" />
                {items.length === 0 ? (
                  <StateMessage>אין כרגע פריטים זמינים.</StateMessage>
                ) : (
                  <div className="seller-profile__grid">
                    {items.map((product) => (
                      <ProductCard key={product.id} product={product} showFavorite />
                    ))}
                  </div>
                )}
              </section>

              {profile?.location && (
                <aside className="seller-profile__map-col">
                  <h3 className="seller-profile__aside-title">אזור הפיזור</h3>
                  <LocationMap query={profile.location} title={`מיקום של ${name}`} />
                </aside>
              )}
            </div>

            <p className="seller-profile__back">
              <Link to="/shop">חזרה לחנות ←</Link>
            </p>
          </>
        )}
      </main>

      <Footer />
      <BottomNavBar />
    </div>
  )
}

export default UserProfile
