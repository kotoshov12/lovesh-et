import { useParams, Link } from 'react-router-dom'
import Header from '../../components/Header/Header.jsx'
import ImageGallery from '../../components/ImageGallery/ImageGallery.jsx'
import ProductInfo from '../../components/ProductInfo/ProductInfo.jsx'
import SellerCard from '../../components/SellerCard/SellerCard.jsx'
import ActionBar from '../../components/ActionBar/ActionBar.jsx'
import ProductCarousel from '../../components/ProductCarousel/ProductCarousel.jsx'
import Footer from '../../components/Footer/Footer.jsx'
import { getProduct, getSimilar, sellers } from '../../data/products.js'
import './ProductDetail.css'

function ProductDetail() {
  const { id } = useParams()
  const product = getProduct(id)

  if (!product) {
    return (
      <div className="page">
        <Header />
        <main className="detail detail--missing">
          <h1 className="detail__missing-title">הפריט לא נמצא</h1>
          <Link to="/" className="detail__missing-link">חזרה לחנות ←</Link>
        </main>
        <Footer />
      </div>
    )
  }

  const similar = getSimilar(product.id)
  const meta = [
    { label: 'מידה', value: product.size },
    { label: 'מצב הפריט', value: product.condition },
  ]
  const tags = [product.brand, `מידה ${product.size}`, product.condition].filter(Boolean)

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

            <SellerCard seller={sellers.default} boxed />

            <ActionBar buyText="קנייה מאובטחת" messageText="שליחת הודעה למוכרת" />
          </div>
        </div>

        <section className="detail__similar">
          <ProductCarousel title="פריטים דומים שאהבנו" items={similar} />
        </section>
      </main>

      <Footer />

      {/* Mobile fixed purchase bar */}
      <div className="detail__mobile-bar">
        <ActionBar fixed buyText="קני עכשיו" messageText="שלחי הודעה" />
      </div>
    </div>
  )
}

export default ProductDetail
