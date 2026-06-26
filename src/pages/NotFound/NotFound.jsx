import { Link } from 'react-router-dom'
import Header from '../../components/Header/Header.jsx'
import Footer from '../../components/Footer/Footer.jsx'
import BottomNavBar from '../../components/BottomNavBar/BottomNavBar.jsx'
import Button from '../../components/Button/Button.jsx'
import Icon from '../../components/Icon/Icon.jsx'
import './NotFound.css'

function NotFound() {
  return (
    <div className="page">
      <Header />

      <main className="notfound">
        <Icon name="sentiment_dissatisfied" size="xl" className="notfound__icon" />
        <p className="notfound__code">404</p>
        <h1 className="notfound__title">העמוד לא נמצא</h1>
        <p className="notfound__text">
          הקישור שגוי או שהעמוד הוסר. אפשר לחזור לדף הבית ולהמשיך לגלוש.
        </p>
        <div className="notfound__actions">
          <Link to="/">
            <Button variant="primary" icon="home">
              חזרה לדף הבית
            </Button>
          </Link>
          <Link to="/shop">
            <Button variant="outline" icon="storefront">
              למעבר לחנות
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
      <BottomNavBar />
    </div>
  )
}

export default NotFound
