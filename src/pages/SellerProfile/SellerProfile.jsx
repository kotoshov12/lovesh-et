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
import Stars from '../../components/Stars/Stars.jsx'
import FollowButton from '../../components/FollowButton/FollowButton.jsx'
import Button from '../../components/Button/Button.jsx'
import Textarea from '../../components/Textarea/Textarea.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import { fetchSeller, fetchProductsBySeller } from '../../api/products.js'
import { fetchReviews, submitReview, averageRating } from '../../api/reviews.js'
import './SellerProfile.css'

function SellerProfile() {
  const { id } = useParams()
  const { user } = useAuth()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [seller, setSeller] = useState(null)
  const [items, setItems] = useState([])
  const [status, setStatus] = useState('loading') // loading | ready | missing | error
  const [reviews, setReviews] = useState([])
  const [rating, setRating] = useState(5)
  const [reviewText, setReviewText] = useState('')
  const [reviewBusy, setReviewBusy] = useState(false)

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

  useEffect(() => {
    let active = true
    fetchReviews({ sellerId: id })
      .then((data) => active && setReviews(data))
      .catch((err) => console.error(err))
    return () => {
      active = false
    }
  }, [id])

  async function handleSubmitReview(e) {
    e.preventDefault()
    setReviewBusy(true)
    try {
      await submitReview({ sellerId: id, rating, body: reviewText.trim() })
      const fresh = await fetchReviews({ sellerId: id })
      setReviews(fresh)
      setReviewText('')
    } catch (err) {
      console.error(err)
    } finally {
      setReviewBusy(false)
    }
  }

  const avg = averageRating(reviews)

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
                {reviews.length > 0 && (
                  <p className="seller-profile__rating">
                    <Stars value={avg} size="sm" />
                    <span>
                      {avg.toFixed(1)} ({reviews.length})
                    </span>
                  </p>
                )}
                <FollowButton sellerId={id} />
              </div>
            </section>

            <div className="seller-profile__main">
              <section className="seller-profile__listings-col">
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

              {seller.location && (
                <aside className="seller-profile__map-col">
                  <h3 className="seller-profile__aside-title">אזור הפיזור</h3>
                  <p className="seller-profile__loc">
                    <Icon name="location_on" size="sm" />
                    {seller.location}
                  </p>
                  <LocationMap query={seller.location} title={`מיקום של ${seller.name}`} />
                </aside>
              )}
            </div>

            <section className="seller-profile__block">
              <SectionHeader title="ביקורות" eyebrow="REVIEWS" />

              {user ? (
                <form className="seller-profile__review-form" onSubmit={handleSubmitReview}>
                  <div className="seller-profile__rate-row">
                    <span>הדירוג שלך:</span>
                    <Stars value={rating} onSelect={setRating} />
                  </div>
                  <Textarea
                    id="review"
                    label="הביקורת שלך"
                    rows={3}
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="איך הייתה החוויה עם המוכר/ת?"
                  />
                  <Button type="submit" variant="primary">
                    {reviewBusy ? 'שולח/ת…' : 'פרסום ביקורת'}
                  </Button>
                </form>
              ) : (
                <StateMessage>תתחבר/י כדי להשאיר ביקורת.</StateMessage>
              )}

              {reviews.length > 0 && (
                <ul className="seller-profile__reviews">
                  {reviews.map((r) => (
                    <li key={r.id} className="seller-profile__review">
                      <div className="seller-profile__review-head">
                        <Stars value={r.rating} size="sm" />
                        <span className="seller-profile__review-author">
                          {r.author_name || 'משתמש'}
                        </span>
                      </div>
                      {r.body && <p className="seller-profile__review-body">{r.body}</p>}
                    </li>
                  ))}
                </ul>
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
