import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Header from '../../components/Header/Header.jsx'
import ImageGallery from '../../components/ImageGallery/ImageGallery.jsx'
import ProductInfo from '../../components/ProductInfo/ProductInfo.jsx'
import SellerCard from '../../components/SellerCard/SellerCard.jsx'
import ActionBar from '../../components/ActionBar/ActionBar.jsx'
import ProductCarousel from '../../components/ProductCarousel/ProductCarousel.jsx'
import Footer from '../../components/Footer/Footer.jsx'
import StateMessage from '../../components/StateMessage/StateMessage.jsx'
import { useCart } from '../../context/CartContext.jsx'
import { fetchProduct, fetchSimilar } from '../../api/products.js'
import './ProductDetail.css'

function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { add } = useCart()
  const [product, setProduct] = useState(null)
  const [similar, setSimilar] = useState([])
  const [status, setStatus] = useState('loading') // loading | ready | missing | error

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
    name: 'מוכר/ת',
    avatar: '',
    location: '',
    distance: product.distance,
  }

  function handleBuy() {
    add(product)
    navigate('/cart')
  }

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

            <ActionBar buyText="קנייה מאובטחת" messageText="שליחת הודעה למוכרת" onBuy={handleBuy} />
          </div>
        </div>

        {similar.length > 0 && (
          <section className="detail__similar">
            <ProductCarousel title="פריטים דומים שאהבנו" items={similar} />
          </section>
        )}
      </main>

      <Footer />

      <div className="detail__mobile-bar">
        <ActionBar fixed buyText="קני עכשיו" messageText="שלחי הודעה" onBuy={handleBuy} />
      </div>
    </div>
  )
}

export default ProductDetail
