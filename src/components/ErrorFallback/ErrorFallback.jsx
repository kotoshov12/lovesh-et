import Logo from '../Logo/Logo.jsx'
import './ErrorFallback.css'

/**
 * Friendly full-screen fallback shown by the Sentry ErrorBoundary when a render
 * error would otherwise white-screen the app. Self-contained (no router hooks).
 */
function ErrorFallback({ onReset }) {
  return (
    <div className="errfb">
      <div className="errfb__card">
        <Logo size="md" onDark={false} />
        <h1 className="errfb__title">אופס, משהו השתבש</h1>
        <p className="errfb__text">
          נתקלנו בתקלה לא צפויה. אפשר לנסות שוב או לחזור לדף הבית — והדיווח כבר נשלח אלינו.
        </p>
        <div className="errfb__actions">
          <button
            type="button"
            className="errfb__btn errfb__btn--primary"
            onClick={() => {
              onReset?.()
              window.location.reload()
            }}
          >
            רענון הדף
          </button>
          <a className="errfb__btn errfb__btn--outline" href="/">
            חזרה לדף הבית
          </a>
        </div>
      </div>
    </div>
  )
}

export default ErrorFallback
