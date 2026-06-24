import { useState } from 'react'
import Header from '../../components/Header/Header.jsx'
import NavigationDrawer from '../../components/NavigationDrawer/NavigationDrawer.jsx'
import Footer from '../../components/Footer/Footer.jsx'
import Input from '../../components/Input/Input.jsx'
import Textarea from '../../components/Textarea/Textarea.jsx'
import Button from '../../components/Button/Button.jsx'
import Icon from '../../components/Icon/Icon.jsx'
import './Support.css'

const FAQ = [
  {
    q: 'איך מזמינים פריט?',
    a: 'נכנסים לעמוד הפריט, מוסיפים לסל וממשיכים לתשלום. אפשר לשלם ב-Bit או במזומן במפגש עם המוכר/ת.',
  },
  {
    q: 'איך מוכרים פריט?',
    a: 'לוחצים על כפתור ההוספה (+) בסרגל העליון, ממלאים את פרטי הפריט ומעלים תמונות.',
  },
  {
    q: 'איך יוצרים קשר עם מוכר/ת?',
    a: 'בעמוד הפריט אפשר לשלוח הודעה ישירות למוכר/ת (בקרוב).',
  },
  {
    q: 'מה קורה כשפריט נמכר?',
    a: 'הפריט יורד מהחנות ומופיע בפרופיל שלך מסומן כ"נמכר".',
  },
]

function Support() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [sent, setSent] = useState(false)

  return (
    <div className="page">
      <Header onMenu={() => setDrawerOpen(true)} />
      <NavigationDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <main className="support">
        <div className="support__intro">
          <h1 className="support__title">שירות לקוחות</h1>
          <p className="support__subtitle">כאן בשבילך — פנייה, שאלה או בעיה, נשמח לעזור.</p>
        </div>

        <div className="support__channels">
          <a href="mailto:help@loveshet.example" className="support__channel">
            <Icon name="mail" size="lg" />
            <span>help@loveshet.example</span>
          </a>
          <a href="tel:+972500000000" className="support__channel">
            <Icon name="call" size="lg" />
            <span>050-0000000</span>
          </a>
          <a href="#" className="support__channel">
            <Icon name="chat" size="lg" />
            <span>צ'אט עם נציג/ה</span>
          </a>
        </div>

        <div className="support__grid">
          <section className="support__faq">
            <h2 className="support__section-title">שאלות נפוצות</h2>
            {FAQ.map((item) => (
              <details key={item.q} className="support__faq-item">
                <summary className="support__faq-q">{item.q}</summary>
                <p className="support__faq-a">{item.a}</p>
              </details>
            ))}
          </section>

          <section className="support__form-wrap">
            <h2 className="support__section-title">פנייה / בקשת עזרה</h2>
            {sent ? (
              <p className="support__sent">תודה! הפנייה נשלחה ונחזור אליך בהקדם.</p>
            ) : (
              <form
                className="support__form"
                onSubmit={(e) => {
                  e.preventDefault()
                  setSent(true)
                }}
              >
                <Input id="s-name" label="שם" placeholder="השם שלך" required />
                <Input id="s-email" label="אימייל" type="email" placeholder="name@example.com" required />
                <Textarea id="s-msg" label="במה נוכל לעזור?" rows={4} placeholder="כתבי לנו…" required />
                <Button type="submit" variant="primary">
                  שליחת פנייה
                </Button>
              </form>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Support
