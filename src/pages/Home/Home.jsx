import { useState } from 'react'
import Header from '../../components/Header/Header.jsx'
import NavigationDrawer from '../../components/NavigationDrawer/NavigationDrawer.jsx'
import HeroBanner from '../../components/HeroBanner/HeroBanner.jsx'
import SectionHeader from '../../components/SectionHeader/SectionHeader.jsx'
import ProductCard from '../../components/ProductCard/ProductCard.jsx'
import NewsletterSignup from '../../components/NewsletterSignup/NewsletterSignup.jsx'
import Footer from '../../components/Footer/Footer.jsx'
import BottomNavBar from '../../components/BottomNavBar/BottomNavBar.jsx'
import { products, heroSplit } from '../../data/products.js'
import './Home.css'

function Home() {
  const [drawerOpen, setDrawerOpen] = useState(false)

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
          />
          <div className="home__grid">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                showFavorite
                showAddToCart
              />
            ))}
          </div>
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
