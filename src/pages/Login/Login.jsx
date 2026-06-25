import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import AuthLayout from '../../components/AuthLayout/AuthLayout.jsx'
import Input from '../../components/Input/Input.jsx'
import Button from '../../components/Button/Button.jsx'
import GoogleButton from '../../components/GoogleButton/GoogleButton.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import { signInWithEmail, signInWithGoogle } from '../../api/auth.js'

function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { session } = useAuth()
  const from = location.state?.from?.pathname || '/'

  // Already signed in? Skip the form.
  useEffect(() => {
    if (session) navigate(from, { replace: true })
  }, [session, from, navigate])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [busy, setBusy] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setBusy(true)
    const { error } = await signInWithEmail({ email, password })
    if (error) {
      setError('אימייל או סיסמה שגויים.')
      setBusy(false)
      return
    }
    navigate(from, { replace: true })
  }

  async function handleGoogle() {
    setError(null)
    const { error } = await signInWithGoogle()
    if (error) setError('ההתחברות עם Google נכשלה. ודא/י שהספק מופעל ב-Supabase.')
  }

  return (
    <AuthLayout
      title="התחברות"
      subtitle="טוב לראות אותך שוב ב-LOVEsh\et"
      footer={
        <span>
          עדיין אין לך חשבון? <Link to="/register">להרשמה</Link>
        </span>
      }
    >
      <GoogleButton onClick={handleGoogle} />
      <div className="auth__divider">או</div>

      <form className="auth__form" onSubmit={handleSubmit}>
        <Input
          label="אימייל"
          id="email"
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          label="סיסמה"
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="auth__error">{error}</p>}
        <Button type="submit" variant="primary" fullWidth>
          {busy ? 'מתחבר/ת…' : 'התחברות'}
        </Button>
      </form>
    </AuthLayout>
  )
}

export default Login
