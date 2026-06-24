import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../../components/Header/Header.jsx'
import NavigationDrawer from '../../components/NavigationDrawer/NavigationDrawer.jsx'
import Footer from '../../components/Footer/Footer.jsx'
import BottomNavBar from '../../components/BottomNavBar/BottomNavBar.jsx'
import Button from '../../components/Button/Button.jsx'
import Icon from '../../components/Icon/Icon.jsx'
import StateMessage from '../../components/StateMessage/StateMessage.jsx'
import { useCart } from '../../context/CartContext.jsx'
import { formatPrice } from '../../api/products.js'
import './Cart.css'

function Cart() {
  const { items, remove, clear, total } = useCart()
  const navigate = useNavigate()
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <div className="page">
      <Header onMenu={() => setDrawerOpen(true)} />
      <NavigationDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <main className="cart">
        <h1 className="cart__title">סל הקניות</h1>

        {items.length === 0 ? (
          <div className="cart__empty">
            <StateMessage>הסל שלך ריק.</StateMessage>
            <Link to="/shop">
              <Button variant="primary" icon="arrow_back">
                להמשך קנייה
              </Button>
            </Link>
          </div>
        ) : (
          <div className="cart__layout">
            <ul className="cart__list">
              {items.map((item) => (
                <li key={item.id} className="cart__item">
                  <Link to={`/product/${item.id}`} className="cart__thumb">
                    <img src={item.image} alt={item.name} />
                  </Link>
                  <div className="cart__info">
                    <Link to={`/product/${item.id}`} className="cart__name">
                      {item.name}
                    </Link>
                    {item.caption && <p className="cart__caption">{item.caption}</p>}
                    <span className="cart__price">{item.price}</span>
                  </div>
                  <button
                    type="button"
                    className="cart__remove"
                    onClick={() => remove(item.id)}
                    aria-label="הסרה מהסל"
                  >
                    <Icon name="close" size="md" />
                  </button>
                </li>
              ))}
            </ul>

            <aside className="cart__summary">
              <h2 className="cart__summary-title">סיכום הזמנה</h2>
              <div className="cart__row">
                <span>סה"כ פריטים</span>
                <span>{items.length}</span>
              </div>
              <div className="cart__row cart__row--total">
                <span>סה"כ לתשלום</span>
                <span>{formatPrice(total)}</span>
              </div>
              <Button variant="primary" fullWidth icon="arrow_back" onClick={() => navigate('/checkout')}>
                מעבר לתשלום
              </Button>
              <button type="button" className="cart__clear" onClick={clear}>
                ניקוי הסל
              </button>
            </aside>
          </div>
        )}
      </main>

      <Footer />
      <BottomNavBar />
    </div>
  )
}

export default Cart
