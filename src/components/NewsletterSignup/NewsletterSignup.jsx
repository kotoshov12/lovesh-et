import Button from '../Button/Button.jsx'
import './NewsletterSignup.css'

function NewsletterSignup({ title, body }) {
  return (
    <section className="newsletter">
      <div className="newsletter__inner">
        <h2 className="newsletter__title">{title}</h2>
        {body && <p className="newsletter__body">{body}</p>}
        <form className="newsletter__form" onSubmit={(e) => e.preventDefault()}>
          <Button type="submit" variant="primary">
            הרשמה
          </Button>
          <input
            type="email"
            className="newsletter__input"
            placeholder="האימייל שלך"
            aria-label="כתובת אימייל"
          />
        </form>
      </div>
    </section>
  )
}

export default NewsletterSignup
