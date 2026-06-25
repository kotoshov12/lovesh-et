import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchIncomingOffers, respondOffer } from '../../api/offers.js'
import { fetchMyFollows } from '../../api/follows.js'
import { createNotification } from '../../api/notifications.js'
import Header from '../../components/Header/Header.jsx'
import NavigationDrawer from '../../components/NavigationDrawer/NavigationDrawer.jsx'
import Footer from '../../components/Footer/Footer.jsx'
import BottomNavBar from '../../components/BottomNavBar/BottomNavBar.jsx'
import SectionHeader from '../../components/SectionHeader/SectionHeader.jsx'
import ProductCard from '../../components/ProductCard/ProductCard.jsx'
import Button from '../../components/Button/Button.jsx'
import Input from '../../components/Input/Input.jsx'
import Textarea from '../../components/Textarea/Textarea.jsx'
import Icon from '../../components/Icon/Icon.jsx'
import StateMessage from '../../components/StateMessage/StateMessage.jsx'
import LocationMap from '../../components/LocationMap/LocationMap.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import { useFavorites } from '../../context/FavoritesContext.jsx'
import {
  fetchMyProducts,
  uploadProductImage,
  markProductSold,
  deleteProduct,
  formatPrice,
} from '../../api/products.js'
import { fetchMyOrders } from '../../api/orders.js'
import { updateProfile } from '../../api/auth.js'
import './Profile.css'

function Profile() {
  const { user, signOut } = useAuth()
  const { items: favorites } = useFavorites()
  const [drawerOpen, setDrawerOpen] = useState(false)

  const [items, setItems] = useState([])
  const [status, setStatus] = useState('loading')
  const [orders, setOrders] = useState([])
  const [offers, setOffers] = useState([])
  const [following, setFollowing] = useState([])

  const meta = user?.user_metadata || {}
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(meta.full_name || '')
  const [bio, setBio] = useState(meta.bio || '')
  const [location, setLocation] = useState(meta.location || '')
  const [avatarFile, setAvatarFile] = useState(null)
  const [avatarPreview, setAvatarPreview] = useState(null)
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState(null)

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

  useEffect(() => {
    let active = true
    fetchMyOrders()
      .then((data) => active && setOrders(data))
      .catch((err) => console.error(err))
    fetchIncomingOffers()
      .then((data) => active && setOffers(data))
      .catch((err) => console.error(err))
    fetchMyFollows()
      .then((data) => active && setFollowing(data))
      .catch((err) => console.error(err))
    return () => {
      active = false
    }
  }, [user?.id])

  async function handleDelete(id) {
    try {
      await deleteProduct(id)
      setItems((prev) => prev.filter((p) => p.id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  async function handleRespondOffer(offer, status) {
    try {
      await respondOffer(offer.id, status)
      await createNotification({
        userId: offer.buyer_id,
        type: 'offer',
        body:
          status === 'accepted'
            ? `הצעת המחיר שלך (₪${offer.amount}) התקבלה! 🎉`
            : `הצעת המחיר שלך (₪${offer.amount}) נדחתה.`,
        link: offer.product ? `/product/${offer.product.id}` : '/',
      })
      setOffers((prev) => prev.filter((o) => o.id !== offer.id))
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (!avatarFile) {
      setAvatarPreview(null)
      return
    }
    const url = URL.createObjectURL(avatarFile)
    setAvatarPreview(url)
    return () => URL.revokeObjectURL(url)
  }, [avatarFile])

  async function handleSave() {
    setSaving(true)
    setSaveError(null)
    try {
      let avatarUrl = meta.avatar_url || null
      if (avatarFile) avatarUrl = await uploadProductImage(avatarFile)
      const { error } = await updateProfile({
        fullName: name.trim(),
        avatarUrl,
        bio: bio.trim(),
        location: location.trim(),
      })
      if (error) throw error
      setAvatarFile(null)
      setEditing(false)
    } catch (err) {
      console.error(err)
      setSaveError('שמירת הפרופיל נכשלה. ודא/י שה-bucket לתמונות קיים ונס/י שוב.')
    } finally {
      setSaving(false)
    }
  }

  function cancelEdit() {
    setName(meta.full_name || '')
    setBio(meta.bio || '')
    setLocation(meta.location || '')
    setAvatarFile(null)
    setSaveError(null)
    setEditing(false)
  }

  async function handleMarkSold(id) {
    try {
      await markProductSold(id)
      setItems((prev) => prev.map((p) => (p.id === id ? { ...p, sold: true } : p)))
    } catch (err) {
      console.error(err)
    }
  }

  const activeListings = items.filter((p) => !p.sold)
  const soldListings = items.filter((p) => p.sold)

  const displayName = meta.full_name || user?.email
  const avatarUrl = avatarPreview || meta.avatar_url

  return (
    <div className="page">
      <Header onMenu={() => setDrawerOpen(true)} />
      <NavigationDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <main className="profile">
        {/* Account header */}
        <section className="profile__account">
          {editing ? (
            <label className="profile__avatar profile__avatar--edit">
              {avatarUrl ? (
                <img src={avatarUrl} alt="" />
              ) : (
                <Icon name="account_circle" size="xl" />
              )}
              <span className="profile__avatar-overlay">
                <Icon name="photo_camera" size="md" />
              </span>
              <input
                type="file"
                accept="image/*"
                className="profile__avatar-input"
                onChange={(e) => setAvatarFile(e.target.files?.[0] ?? null)}
              />
            </label>
          ) : (
            <div className="profile__avatar">
              {meta.avatar_url ? (
                <img src={meta.avatar_url} alt="" />
              ) : (
                <Icon name="account_circle" size="xl" />
              )}
            </div>
          )}

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
                <Textarea
                  id="bio"
                  label="קצת עליי (ביו)"
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="תספר/י על עצמך, הסטייל שלך, מה את מוכרת…"
                />
                <Input
                  id="location"
                  label="אזור פיזור / מיקום לאיסוף"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="לדוגמה: תל אביב, דיזנגוף"
                />
                {saveError && <p className="profile__error">{saveError}</p>}
                <div className="profile__edit-actions">
                  <Button variant="primary" onClick={handleSave}>
                    {saving ? 'שומר/ת…' : 'שמירה'}
                  </Button>
                  <Button variant="text" onClick={cancelEdit}>
                    ביטול
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <h1 className="profile__name">{displayName}</h1>
                <p className="profile__email">{user?.email}</p>
                {meta.bio && <p className="profile__bio">{meta.bio}</p>}
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

        {/* Pickup location map */}
        {meta.location && (
          <section className="profile__block">
            <SectionHeader title="אזור הפיזור שלי" eyebrow="PICKUP" />
            <p className="profile__location-text">
              <Icon name="location_on" size="sm" />
              {meta.location}
            </p>
            <LocationMap query={meta.location} title={`מיקום של ${displayName}`} />
          </section>
        )}

        {/* Favorites */}
        <section className="profile__block">
          <SectionHeader title="המועדפים שלי" eyebrow="WISHLIST" />
          {favorites.length === 0 ? (
            <StateMessage>עדיין לא סימנת פריטים בלב.</StateMessage>
          ) : (
            <div className="profile__grid">
              {favorites.map((product) => (
                <ProductCard key={product.id} product={product} showFavorite />
              ))}
            </div>
          )}
        </section>

        {/* My orders */}
        {orders.length > 0 && (
          <section className="profile__block">
            <SectionHeader title="ההזמנות שלי" eyebrow="ORDERS" />
            <ul className="profile__orders">
              {orders.map((o) => (
                <li key={o.id} className="profile__order">
                  <span className="profile__order-items">
                    {o.items.map((i) => i.name).join(', ')}
                  </span>
                  <span className="profile__order-meta">
                    {o.payment_method === 'bit' ? 'Bit' : 'תשלום במקום'} · {formatPrice(o.total)}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Sellers I follow */}
        {following.length > 0 && (
          <section className="profile__block">
            <SectionHeader title="עוקב/ת אחרי" eyebrow="FOLLOWING" />
            <div className="profile__following">
              {following.map((s) => (
                <Link
                  key={`${s.type}-${s.id}`}
                  to={s.type === 'seller' ? `/seller/${s.id}` : `/user/${s.id}`}
                  className="profile__follow-card"
                >
                  <span className="profile__follow-avatar">
                    {s.avatar ? (
                      <img src={s.avatar} alt={s.name} />
                    ) : (
                      <Icon name="account_circle" size="lg" />
                    )}
                  </span>
                  <span className="profile__follow-name">{s.name}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Incoming price offers */}
        {offers.length > 0 && (
          <section className="profile__block">
            <SectionHeader title="הצעות מחיר שקיבלתי" eyebrow="OFFERS" />
            <ul className="profile__offers">
              {offers.map((o) => (
                <li key={o.id} className="profile__offer">
                  <span className="profile__offer-text">
                    {o.product?.name || 'פריט'} — <strong>₪{o.amount}</strong>
                  </span>
                  <span className="profile__offer-actions">
                    <button
                      type="button"
                      className="profile__act-btn"
                      onClick={() => handleRespondOffer(o, 'accepted')}
                    >
                      אישור
                    </button>
                    <button
                      type="button"
                      className="profile__act-btn profile__act-btn--danger"
                      onClick={() => handleRespondOffer(o, 'rejected')}
                    >
                      דחייה
                    </button>
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* My listings */}
        <section className="profile__block">
          <SectionHeader title="המוצרים שלי" eyebrow="MY LISTINGS" />
          {status === 'ready' && items.length > 0 && (
            <p className="profile__stats">
              {activeListings.length} פעילים · {soldListings.length} נמכרו
            </p>
          )}
          {status === 'loading' && <StateMessage>טוען את הפריטים שלך…</StateMessage>}
          {status === 'error' && (
            <StateMessage variant="error">
              לא הצלחנו לטעון את הפריטים שלך. ודא/י שהרצת את מיגרציית ה-user_id ב-Supabase.
            </StateMessage>
          )}
          {status === 'ready' && items.length === 0 && (
            <div className="profile__empty">
              <StateMessage>עדיין לא העלית פריטים למכירה.</StateMessage>
              <Link to="/sell">
                <Button variant="primary" icon="add">
                  העלאת פריט ראשון
                </Button>
              </Link>
            </div>
          )}
          {status === 'ready' && activeListings.length > 0 && (
            <div className="profile__grid">
              {activeListings.map((product) => (
                <div key={product.id} className="profile__listing">
                  <ProductCard product={product} />
                  <div className="profile__listing-actions">
                    <Link to={`/sell/${product.id}`} className="profile__act-btn">
                      עריכה
                    </Link>
                    <button
                      type="button"
                      className="profile__act-btn"
                      onClick={() => handleMarkSold(product.id)}
                    >
                      נמכר
                    </button>
                    <button
                      type="button"
                      className="profile__act-btn profile__act-btn--danger"
                      onClick={() => handleDelete(product.id)}
                    >
                      מחיקה
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Sold items */}
        {status === 'ready' && soldListings.length > 0 && (
          <section className="profile__block">
            <SectionHeader title="נמכרו" eyebrow="SOLD" />
            <div className="profile__grid">
              {soldListings.map((product) => (
                <ProductCard key={product.id} product={product} sold />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
      <BottomNavBar />
    </div>
  )
}

export default Profile
