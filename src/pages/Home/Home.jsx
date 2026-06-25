import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header/Header.jsx'
import NavigationDrawer from '../../components/NavigationDrawer/NavigationDrawer.jsx'
import SaleCarousel from '../../components/SaleCarousel/SaleCarousel.jsx'
import SectionHeader from '../../components/SectionHeader/SectionHeader.jsx'
import ProductCard from '../../components/ProductCard/ProductCard.jsx'
import ProductCarousel from '../../components/ProductCarousel/ProductCarousel.jsx'
import NewsletterSignup from '../../components/NewsletterSignup/NewsletterSignup.jsx'
import Footer from '../../components/Footer/Footer.jsx'
import BottomNavBar from '../../components/BottomNavBar/BottomNavBar.jsx'
import StateMessage from '../../components/StateMessage/StateMessage.jsx'
import { fetchProducts } from '../../api/products.js'
import { useFavorites } from '../../context/FavoritesContext.jsx'
import './Home.css'

function Home() {
  const navigate = useNavigate()
  const { items: favorites } = useFavorites()
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

  // "For you": items from categories the user favorited; otherwise the newest.
  const forYou = useMemo(() => {
    const favIds = new Set(favorites.map((f) => f.id))
    const favCats = new Set(favorites.map((f) => f.category).filter(Boolean))
    let list = products.filter((p) => favCats.has(p.category) && !favIds.has(p.id))
    if (list.length < 4) list = products.filter((p) => !favIds.has(p.id))
    return list.slice(0, 8)
  }, [products, favorites])

  return (
    <div className="page">
      <Header onMenu={() => setDrawerOpen(true)} />
      <NavigationDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <main className="home">
        {status === 'loading' && <StateMessage>טוען…</StateMessage>}
        {status === 'error' && (
          <StateMessage variant="error">
            שגיאה בטעינת החנות. בדקי את החיבור ל-Supabase.
          </StateMessage>
        )}

        {status === 'ready' && (
          <>
            <SaleCarousel items={saleItems} />

            <section className="home__section">
              <SectionHeader eyebrow="FOR YOU" title="מיועד עבורך" />
              <ProductCarousel items={forYou} />
            </section>

            <section className="home__section">
              <SectionHeader
                eyebrow="NEW IN"
                title="החדש בחנות"
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
              body="הירשמי לניוזלטר וקבלי עדכונים על פריטי וינטג׳ חדשים לפני כולם · בלי ספאם."
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
