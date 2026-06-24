import { Link } from 'react-router-dom'
import Logo from '../Logo/Logo.jsx'
import './AuthLayout.css'

/**
 * Centered branded card used by the Login and Register pages.
 */
function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="auth">
      <div className="auth__card">
        <Link to="/" className="auth__logo" aria-label="לדף הבית">
          <Logo size="md" onDark={false} />
        </Link>
        <div className="auth__head">
          <h1 className="auth__title">{title}</h1>
          {subtitle && <p className="auth__subtitle">{subtitle}</p>}
        </div>
        {children}
        {footer && <div className="auth__footer">{footer}</div>}
      </div>
    </div>
  )
}

export default AuthLayout
