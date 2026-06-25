import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header/Header.jsx'
import NavigationDrawer from '../../components/NavigationDrawer/NavigationDrawer.jsx'
import HeroBanner from '../../components/HeroBanner/HeroBanner.jsx'
import SaleCarousel from '../../components/SaleCarousel/SaleCarousel.jsx'
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
  const [status, setStatus] = useState('loading')

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

  const saleItems = useMemo(() => products.filter((p) => p.original), [products])

  return (
    <div className="page">
      <Header onMenu={() => setDrawerOpen(true)} />
      <NavigationDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <main className="home">
        <HeroBanner variant="split" {...heroSplit} onCta={() => navigate('/shop')} />

        {status === 'loading' && <StateMessage>טוען…</StateMessage>}
        {status === 'error' && (
          <StateMessage variant="error">שגיאה בטעינת החנות.</StateMessage>
        )}

        {status === 'ready' && (
          <>
            {saleItems.length > 0 && (
              <section className="home__sale">
                <div className="home__sale-head">
                  <SectionHeader
                    eyebrow="SALE"
                    title="מבצעים"
                    linkText="לכל המבצעים"
                    onLink={() => navigate('/shop?sale=1')}
                  />
                </div>
                <SaleCarousel items={saleItems} />
              </section>
            )}

            <section className="home__section">
              <SectionHeader
                eyebrow="NEW IN"
                title="חדש בחנות"
                linkText="צפו בכל הפריטים"
                onLink={() => navigate('/shop')}
              />
              <div className="home__grid">
                {products.slice(0, 8).map((product) => (
                  <ProductCard key={product.id} product={product} showFavorite showAddToCart />
                ))}
              </div>
            </section>

            <NewsletterSignup
              title="אל תפספסי את הדרופ הבא"
              body="תירשמ/י לניוזלטר ותקבל/י עדכונים על פריטי יד-שנייה חדשים לפני כולם · בלי ספאם."
            />
          </>
        )}
      </main>

      <Footer />
      <BottomNavBar />
    </div>
  )
}

export default Home
