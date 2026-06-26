import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Header from '../../components/Header/Header.jsx'
import ImageGallery from '../../components/ImageGallery/ImageGallery.jsx'
import ProductInfo from '../../components/ProductInfo/ProductInfo.jsx'
import SellerCard from '../../components/SellerCard/SellerCard.jsx'
import ActionBar from '../../components/ActionBar/ActionBar.jsx'
import Button from '../../components/Button/Button.jsx'
import Input from '../../components/Input/Input.jsx'
import ProductCarousel from '../../components/ProductCarousel/ProductCarousel.jsx'
import Footer from '../../components/Footer/Footer.jsx'
import StateMessage from '../../components/StateMessage/StateMessage.jsx'
import { useCart } from '../../context/CartContext.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import { fetchProduct, fetchSimilar } from '../../api/products.js'
import { getOrCreateConversation, sendMessage } from '../../api/messages.js'
import { submitOffer } from '../../api/offers.js'
import { createNotification } from '../../api/notifications.js'
import { fetchProfile } from '../../api/profiles.js'
import './ProductDetail.css'

function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { add } = useCart()
  const { user } = useAuth()
  const [product, setProduct] = useState(null)
  const [similar, setSimilar] = useState([])
  const [status, setStatus] = useState('loading') // loading | ready | missing | error
  const [offerOpen, setOfferOpen] = useState(false)
  const [offerAmount, setOfferAmount] = useState('')
  const [offerMsg, setOfferMsg] = useState(null)
  const [ownerProfile, setOwnerProfile] = useState(null)

  useEffect(() => {
    let active = true
    setStatus('loading')
    Promise.all([fetchProduct(id), fetchSimilar(id)])
      .then(([prod, sim]) => {
        if (!active) return
        if (!prod) {
          setStatus('missing')
          return
        }
        setProduct(prod)
        setSimilar(sim)
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

  // If the item has no sellers-table seller, show the uploader's public profile.
  useEffect(() => {
    if (product && !product.seller && product.ownerId) {
      fetchProfile(product.ownerId)
        .then(setOwnerProfile)
        .catch(() => {})
    }
  }, [product])

  if (status === 'loading' || status === 'error' || status === 'missing') {
    return (
      <div className="page">
        <Header />
        <main className="detail detail--missing">
          {status === 'loading' && <StateMessage>טוען פריט…</StateMessage>}
          {status === 'error' && (
            <StateMessage variant="error">שגיאה בטעינת הפריט.</StateMessage>
          )}
          {status === 'missing' && (
            <>
              <h1 className="detail__missing-title">הפריט לא נמצא</h1>
              <Link to="/" className="detail__missing-link">חזרה לחנות ←</Link>
            </>
          )}
        </main>
        <Footer />
      </div>
    )
  }

  const meta = [
    { label: 'מידה', value: product.size },
    { label: 'מצב הפריט', value: product.condition },
  ]
  const tags = [product.brand, product.size && `מידה ${product.size}`, product.condition].filter(
    Boolean
  )
  const seller = product.seller ?? {
    userId: product.ownerId || undefined,
    name: ownerProfile?.full_name || 'מוכר/ת',
    avatar: ownerProfile?.avatar_url || '',
    location: ownerProfile?.location || '',
    distance: product.distance,
  }

  function handleBuy() {
    add(product)
    navigate('/cart')
  }

  async function handleMessage() {
    if (!user) {
      navigate('/login')
      return
    }
    if (!product.ownerId) {
      alert('זהו פריט הדגמה ללא מוכר/ת רשום/ה — נס/י פריט שהועלה על ידי משתמש.')
      return
    }
    if (product.ownerId === user.id) {
      alert('זהו הפריט שלך :)')
      return
    }
    try {
      const conv = await getOrCreateConversation({
        productId: product.id,
        sellerId: product.ownerId,
      })
      navigate(`/messages/${conv.id}`)
    } catch (err) {
      console.error(err)
      alert('לא ניתן לפתוח שיחה כרגע. ודא/י שהרצת את מיגרציית ההודעות.')
    }
  }

  async function handleSendOffer(e) {
    e.preventDefault()
    setOfferMsg(null)
    if (!user) {
      navigate('/login')
      return
    }
    const amount = Number(offerAmount)
    if (!amount || amount <= 0) {
      setOfferMsg({ type: 'error', text: 'יש להזין סכום תקין.' })
      return
    }
    try {
      // Reuse the existing buyer⇄seller conversation for this product (or open it),
      // so the offer lives in the same chat as the messages.
      const conv = await getOrCreateConversation({
        productId: product.id,
        sellerId: product.ownerId,
      })
      await sendMessage({
        conversationId: conv.id,
        body: `הצעת מחיר: ₪${amount} על "${product.name}" 💰`,
      })
      await submitOffer({
        productId: product.id,
        productName: product.name,
        sellerId: product.ownerId,
        amount,
        conversationId: conv.id,
      })
      await createNotification({
        userId: product.ownerId,
        type: 'offer',
        body: `הצעת מחיר חדשה: ₪${amount} על "${product.name}"`,
        link: `/messages/${conv.id}`,
      })
      setOfferAmount('')
      setOfferOpen(false)
      navigate(`/messages/${conv.id}`)
    } catch (err) {
      console.error(err)
      setOfferMsg({ type: 'error', text: 'שליחת ההצעה נכשלה. ודא/י שהרצת את המיגרציות.' })
    }
  }

  const canOffer = Boolean(product?.ownerId) && product?.ownerId !== user?.id

  return (
    <div className="page">
      <Header />

      <main className="detail">
        <div className="detail__layout">
          <div className="detail__gallery">
            <ImageGallery images={product.gallery} layout="thumbs" />
          </div>

          <div className="detail__sidebar">
            <ProductInfo
              eyebrow={product.eyebrow}
              title={product.name}
              price={product.price}
              original={product.original}
              meta={meta}
              tags={tags}
            />

            <div className="detail__block">
              <h3 className="detail__block-title">תיאור המוצר</h3>
              <p className="detail__description">{product.description}</p>
            </div>

            <SellerCard seller={seller} boxed />

            <ActionBar
              buyText="קנייה מאובטחת"
              messageText="שליחת הודעה למוכרת"
              onBuy={handleBuy}
              onMessage={handleMessage}
            />

            {canOffer && (
              <div className="detail__offer">
                {offerOpen ? (
                  <form className="detail__offer-form" onSubmit={handleSendOffer}>
                    <Input
                      id="offer"
                      type="number"
                      prefix="₪"
                      placeholder="הסכום שלך"
                      value={offerAmount}
                      onChange={(e) => setOfferAmount(e.target.value)}
                    />
                    <Button type="submit" variant="primary" fullWidth>
                      שליחת הצעה
                    </Button>
                  </form>
                ) : (
                  <Button
                    variant="outline"
                    fullWidth
                    icon="local_offer"
                    onClick={() => setOfferOpen(true)}
                  >
                    הציעו מחיר
                  </Button>
                )}
                {offerMsg && (
                  <p className={offerMsg.type === 'error' ? 'detail__offer-err' : 'detail__offer-ok'}>
                    {offerMsg.text}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {similar.length > 0 && (
          <section className="detail__similar">
            <ProductCarousel title="פריטים דומים" items={similar} />
          </section>
        )}
      </main>

      <Footer />

      <div className="detail__mobile-bar">
        <ActionBar
          fixed
          buyText="תקנ/י עכשיו"
          messageText="תשלח/י הודעה"
          onBuy={handleBuy}
          onMessage={handleMessage}
        />
      </div>
    </div>
  )
}

export default ProductDetail
