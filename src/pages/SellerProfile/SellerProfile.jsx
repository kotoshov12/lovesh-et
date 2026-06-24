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
import { fetchSeller, fetchProductsBySeller } from '../../api/products.js'
import './SellerProfile.css'

function SellerProfile() {
  const { id } = useParams()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [seller, setSeller] = useState(null)
  const [items, setItems] = useState([])
  const [status, setStatus] = useState('loading') // loading | ready | missing | error

  useEffect(() => {
    let active = true
    setStatus('loading')
    Promise.all([fetchSeller(id), fetchProductsBySeller(id)])
      .then(([s, list]) => {
        if (!active) return
        if (!s) {
          setStatus('missing')
          return
        }
        setSeller(s)
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

  return (
    <div className="page">
      <Header onMenu={() => setDrawerOpen(true)} />
      <NavigationDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <main className="seller-profile">
        {status === 'loading' && <StateMessage>טוען פרופיל…</StateMessage>}
        {status === 'error' && <StateMessage variant="error">שגיאה בטעינת הפרופיל.</StateMessage>}
        {status === 'missing' && (
          <div className="seller-profile__missing">
            <h1 className="seller-profile__missing-title">המוכר/ת לא נמצא/ה</h1>
            <Link to="/shop" className="seller-profile__missing-link">חזרה לחנות ←</Link>
          </div>
        )}

        {status === 'ready' && (
          <>
            <section className="seller-profile__head">
              <div className="seller-profile__avatar">
                {seller.avatar ? (
                  <img src={seller.avatar} alt={seller.name} />
                ) : (
                  <Icon name="account_circle" size="xl" />
                )}
              </div>
              <div className="seller-profile__id">
                <h1 className="seller-profile__name">{seller.name}</h1>
                {seller.location && (
                  <p className="seller-profile__loc">
                    <Icon name="location_on" size="sm" />
                    {seller.location}
                  </p>
                )}
                <p className="seller-profile__count">{items.length} פריטים למכירה</p>
              </div>
            </section>

            {seller.location && (
              <section className="seller-profile__block">
                <SectionHeader title="אזור הפיזור" eyebrow="PICKUP" />
                <LocationMap query={seller.location} title={`מיקום של ${seller.name}`} />
              </section>
            )}

            <section className="seller-profile__block">
              <SectionHeader title={`הפריטים של ${seller.name}`} eyebrow="LISTINGS" />
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
          </>
        )}
      </main>

      <Footer />
      <BottomNavBar />
    </div>
  )
}

export default SellerProfile
