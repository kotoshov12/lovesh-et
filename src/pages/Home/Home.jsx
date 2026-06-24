import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header/Header.jsx'
import NavigationDrawer from '../../components/NavigationDrawer/NavigationDrawer.jsx'
import HeroBanner from '../../components/HeroBanner/HeroBanner.jsx'
import SectionHeader from '../../components/SectionHeader/SectionHeader.jsx'
import ProductCard from '../../components/ProductCard/ProductCard.jsx'
import NewsletterSignup from '../../components/NewsletterSignup/NewsletterSignup.jsx'
import Footer from '../../components/Footer/Footer.jsx'
import BottomNavBar from '../../components/BottomNavBar/BottomNavBar.jsx'
import StateMessage from '../../components/StateMessage/StateMessage.jsx'
import { fetchProducts } from '../../api/products.js'
import { heroSplit } from '../../data/content.js'
import './Home.css'

function Home() {
  const navigate = useNavigate()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [products, setProducts] = useState([])
  const [status, setStatus] = useState('loading') // loading | ready | error

  useEffect(() => {
    let active = true
    fetchProducts()
      .then((data) => {
        if (!active) return
        setProducts(data)
        setStatus('ready')
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

      <main className="home">
        <HeroBanner variant="split" {...heroSplit} />

        <section className="home__section">
          <SectionHeader
            eyebrow="POPULAR ITEMS"
            title="החדש בחנות"
            linkText="צפו בכל הפריטים"
            onLink={() => navigate('/shop')}
          />

          {status === 'loading' && <StateMessage>טוען פריטים…</StateMessage>}
          {status === 'error' && (
            <StateMessage variant="error">
              שגיאה בטעינת הפריטים. בדקי את החיבור ל-Supabase ונסי שוב.
            </StateMessage>
          )}
          {status === 'ready' && products.length === 0 && (
            <StateMessage>אין עדיין פריטים בחנות. היו הראשונים להעלות!</StateMessage>
          )}
          {status === 'ready' && products.length > 0 && (
            <div className="home__grid">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} showFavorite showAddToCart />
              ))}
            </div>
          )}
        </section>

        <NewsletterSignup
          title="אל תפספסי את הדרופ הבא"
          body="הירשמי לניוזלטר וקבלי עדכונים על פריטי וינטג׳ חדשים לפני כולם · בלי ספאם."
        />
      </main>

      <Footer />
      <BottomNavBar />
    </div>
  )
}

export default Home
