import { Link } from 'react-router-dom'
import Logo from '../Logo/Logo.jsx'
import Icon from '../Icon/Icon.jsx'
import './Footer.css'

const CUSTOMER_LINKS = ['משלוחים והחזרות', 'צרו קשר', 'שאלות נפוצות']

/**
 * Site footer. Pomegranate background, three columns + bottom copyright.
 */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <Logo size="sm" />
          <p className="footer__tagline">
            חנות יד-שנייה המובילה בישראל. אופנה מעגלית, מחירים שפויים, וקהילה שאוהבת לתת לבגדים חיים חדשים.
          </p>
        </div>

        <div className="footer__col">
          <h4 className="footer__heading">שירות לקוחות</h4>
          {CUSTOMER_LINKS.map((link) => (
            <Link key={link} to="/support" className="footer__link">
              {link}
            </Link>
          ))}
        </div>

        <div className="footer__col">
          <h4 className="footer__heading">עקבו אחרינו</h4>
          <div className="footer__social">
            <a href="#" aria-label="אינסטגרם" className="footer__social-link">
              <Icon name="photo_camera" size="md" />
            </a>
            <a href="#" aria-label="שיתוף" className="footer__social-link">
              <Icon name="share" size="md" />
            </a>
            <a href="#" aria-label="אימייל" className="footer__social-link">
              <Icon name="alternate_email" size="md" />
            </a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© 2024 LOVEsh\et. כל הזכויות שמורות.</p>
      </div>
    </footer>
  )
}

export default Footer
