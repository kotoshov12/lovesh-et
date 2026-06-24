import { useState } from 'react'
import Header from '../Header/Header.jsx'
import NavigationDrawer from '../NavigationDrawer/NavigationDrawer.jsx'
import './AuthLayout.css'

/**
 * Centered branded card used by the Login and Register pages, beneath the full
 * site header so users can browse / return home without signing in.
 */
function AuthLayout({ title, subtitle, children, footer }) {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <div className="page">
      <Header onMenu={() => setDrawerOpen(true)} />
      <NavigationDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <div className="auth">
        <div className="auth__card">
          <div className="auth__head">
            <h1 className="auth__title">{title}</h1>
            {subtitle && <p className="auth__subtitle">{subtitle}</p>}
          </div>
          {children}
          {footer && <div className="auth__footer">{footer}</div>}
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
