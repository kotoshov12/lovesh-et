import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../../components/Header/Header.jsx'
import NavigationDrawer from '../../components/NavigationDrawer/NavigationDrawer.jsx'
import Footer from '../../components/Footer/Footer.jsx'
import Button from '../../components/Button/Button.jsx'
import Input from '../../components/Input/Input.jsx'
import Icon from '../../components/Icon/Icon.jsx'
import StateMessage from '../../components/StateMessage/StateMessage.jsx'
import { useCart } from '../../context/CartContext.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import { formatPrice } from '../../api/products.js'
import { createOrder, sendReceipt } from '../../api/orders.js'
import { createPurchaseRequest } from '../../api/purchases.js'
import { createNotification } from '../../api/notifications.js'
import './Checkout.css'

const METHODS = [
  {
    id: 'bit',
    label: 'תשלום ב-Bit',
    icon: 'smartphone',
    desc: 'העברת התשלום ישירות למוכר/ת באפליקציית Bit.',
  },
  {
    id: 'cash',
    label: 'תשלום במקום',
    icon: 'handshake',
    desc: 'תשלום במזומן בעת המפגש לאיסוף הפריט.',
  },
]

function Checkout() {
  const navigate = useNavigate()
  const { items, total, clear } = useCart()
  const { user } = useAuth()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [method, setMethod] = useState('bit')
  const [bitPhone, setBitPhone] = useState('')
  const [placed, setPlaced] = useState(false)

  // Items from a registered seller need that seller's approval first; demo/
  // catalogue items (no registered owner) are completed straight away.
  const needsApproval = items.some((i) => i.ownerId)

  async function handlePlaceOrder() {
    const sellerItems = items.filter((i) => i.ownerId)
    const demoItems = items.filter((i) => !i.ownerId)
    try {
      // Real listings → ask the seller to approve the Bit/meeting first.
      for (const i of sellerItems) {
        await createPurchaseRequest({
          productId: i.id,
          productName: i.name,
          sellerId: i.ownerId,
          amount: i.priceValue || 0,
          paymentMethod: method,
        })
        await createNotification({
          userId: i.ownerId,
          type: 'purchase',
          body: `בקשת רכישה חדשה: ${i.name} — מחכה לאישורך`,
          link: '/profile',
        })
      }

      // Demo items → complete immediately and email a receipt.
      if (demoItems.length) {
        const demoTotal = demoItems.reduce((s, i) => s + (i.priceValue || 0), 0)
        await createOrder({ items: demoItems, total: demoTotal, paymentMethod: method })
        await sendReceipt({
          email: user?.email,
          items: demoItems,
          total: demoTotal,
          paymentMethod: method,
        })
      }
    } catch (err) {
      console.error(err)
      // Even if persistence fails (e.g. migration missing), don't block the flow.
    }
    clear()
    setPlaced(true)
  }

  return (
    <div className="page">
      <Header onMenu={() => setDrawerOpen(true)} />
      <NavigationDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <main className="checkout">
        {placed ? (
          <div className="checkout__done">
            <Icon name="check_circle" size="xl" className="checkout__done-icon" />
            <h1 className="checkout__title">
              {needsApproval ? 'הבקשה נשלחה למוכר/ת!' : 'ההזמנה התקבלה!'}
            </h1>
            <p className="checkout__done-text">
              {needsApproval ? (
                <>
                  המוכר/ת צריכ/ה לאשר את ה{method === 'bit' ? 'תשלום ב-Bit' : 'מפגש'} לפני
                  שהרכישה תסתיים. נעדכן אותך בהתראה ובאימייל ברגע שתאושר 🧾
                </>
              ) : (
                <>
                  {method === 'bit'
                    ? 'נשלח אליך אישור עם פרטי התשלום ב-Bit מול המוכר/ת.'
                    : 'תאמ/י עם המוכר/ת מפגש לאיסוף ותשלום במזומן.'}{' '}
                  קבלה נשלחה לאימייל שלך 🧾
                </>
              )}
            </p>
            <Link to="/shop">
              <Button variant="primary" icon="arrow_back">
                להמשך קנייה
              </Button>
            </Link>
          </div>
        ) : items.length === 0 ? (
          <div className="checkout__empty">
            <StateMessage>הסל ריק — אין מה לשלם.</StateMessage>
            <Link to="/shop">
              <Button variant="primary">למעבר לחנות</Button>
            </Link>
          </div>
        ) : (
          <>
            <h1 className="checkout__title">תשלום</h1>

            <div className="checkout__layout">
              <section className="checkout__methods">
                <h2 className="checkout__subtitle">תבחר/י אמצעי תשלום</h2>
                {METHODS.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    className={`checkout__method ${method === m.id ? 'is-selected' : ''}`}
                    onClick={() => setMethod(m.id)}
                  >
                    <Icon name={m.icon} size="lg" />
                    <span className="checkout__method-text">
                      <span className="checkout__method-label">{m.label}</span>
                      <span className="checkout__method-desc">{m.desc}</span>
                    </span>
                    <span className={`checkout__radio ${method === m.id ? 'is-on' : ''}`} />
                  </button>
                ))}

                {method === 'bit' && (
                  <Input
                    id="bit-phone"
                    label="מספר טלפון ל-Bit"
                    type="tel"
                    placeholder="050-0000000"
                    value={bitPhone}
                    onChange={(e) => setBitPhone(e.target.value)}
                  />
                )}

                <p className="checkout__note">
                  * זהו תהליך הדגמה — לא מתבצע חיוב אמיתי. התשלום מתואם ישירות מול המוכר/ת.
                </p>
              </section>

              <aside className="checkout__summary">
                <h2 className="checkout__subtitle">סיכום הזמנה</h2>
                <ul className="checkout__items">
                  {items.map((i) => (
                    <li key={i.id} className="checkout__item">
                      <span>{i.name}</span>
                      <span>{i.price}</span>
                    </li>
                  ))}
                </ul>
                <div className="checkout__total">
                  <span>סה"כ לתשלום</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <Button variant="primary" fullWidth icon="arrow_back" onClick={handlePlaceOrder}>
                  אישור הזמנה
                </Button>
                <button type="button" className="checkout__back" onClick={() => navigate('/cart')}>
                  חזרה לסל
                </button>
              </aside>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default Checkout
