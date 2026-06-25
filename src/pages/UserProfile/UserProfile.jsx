import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Header from '../../components/Header/Header.jsx'
import NavigationDrawer from '../../components/NavigationDrawer/NavigationDrawer.jsx'
import Footer from '../../components/Footer/Footer.jsx'
import BottomNavBar from '../../components/BottomNavBar/BottomNavBar.jsx'
import SectionHeader from '../../components/SectionHeader/SectionHeader.jsx'
import ProductCard from '../../components/ProductCard/ProductCard.jsx'
import Icon from '../../components/Icon/Icon.jsx'
import FollowButton from '../../components/FollowButton/FollowButton.jsx'
import Stars from '../../components/Stars/Stars.jsx'
import Button from '../../components/Button/Button.jsx'
import Textarea from '../../components/Textarea/Textarea.jsx'
import StateMessage from '../../components/StateMessage/StateMessage.jsx'
import LocationMap from '../../components/LocationMap/LocationMap.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import { fetchProfile } from '../../api/profiles.js'
import { fetchProductsByUser } from '../../api/products.js'
import { fetchReviews, submitReview, averageRating } from '../../api/reviews.js'
import '../SellerProfile/SellerProfile.css'

function UserProfile() {
  const { id } = useParams()
  const { user } = useAuth()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [profile, setProfile] = useState(null)
  const [items, setItems] = useState([])
  const [status, setStatus] = useState('loading')
  const [reviews, setReviews] = useState([])
  const [rating, setRating] = useState(5)
  const [reviewText, setReviewText] = useState('')
  const [reviewBusy, setReviewBusy] = useState(false)

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

  useEffect(() => {
    let active = true
    fetchReviews({ userId: id })
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
      await submitReview({ userId: id, rating, body: reviewText.trim() })
      setReviews(await fetchReviews({ userId: id }))
      setReviewText('')
    } catch (err) {
      console.error(err)
    } finally {
      setReviewBusy(false)
    }
  }

  const name = profile?.full_name || 'משתמש'
  const avg = averageRating(reviews)
  const isSelf = user?.id === id

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
                {reviews.length > 0 && (
                  <p className="seller-profile__rating">
                    <Stars value={avg} size="sm" />
                    <span>
                      {avg.toFixed(1)} ({reviews.length})
                    </span>
                  </p>
                )}
                {profile?.bio && <p className="seller-profile__loc">{profile.bio}</p>}
                <FollowButton userId={id} />
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

            <section className="seller-profile__block">
              <SectionHeader title={`ביקורות על ${name}`} eyebrow="REVIEWS" />

              {user && !isSelf ? (
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
                !user && <StateMessage>התחבר/י כדי להשאיר ביקורת.</StateMessage>
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
