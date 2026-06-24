import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../../components/AuthLayout/AuthLayout.jsx'
import Input from '../../components/Input/Input.jsx'
import Button from '../../components/Button/Button.jsx'
import GoogleButton from '../../components/GoogleButton/GoogleButton.jsx'
import { signUpWithEmail, signInWithGoogle } from '../../api/auth.js'

function Register() {
  const navigate = useNavigate()

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [note, setNote] = useState(null)
  const [busy, setBusy] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setNote(null)

    if (password.length < 6) {
      setError('הסיסמה חייבת להכיל לפחות 6 תווים.')
      return
    }

    setBusy(true)
    const { data, error } = await signUpWithEmail({ email, password, fullName })
    if (error) {
      setError(error.message || 'ההרשמה נכשלה. נסי שוב.')
      setBusy(false)
      return
    }

    // If email confirmation is on, there is no active session yet.
    if (data.session) {
      navigate('/', { replace: true })
    } else {
      setNote('נשלח אליך מייל לאישור החשבון. אשרי אותו ואז התחברי.')
      setBusy(false)
    }
  }

  async function handleGoogle() {
    setError(null)
    const { error } = await signInWithGoogle()
    if (error) setError('ההרשמה עם Google נכשלה. ודאי שהספק מופעל ב-Supabase.')
  }

  return (
    <AuthLayout
      title="הרשמה"
      subtitle="הצטרפי לקהילת האופנה של LOVEsh\et"
      footer={
        <span>
          כבר רשומה? <Link to="/login">להתחברות</Link>
        </span>
      }
    >
      <GoogleButton onClick={handleGoogle}>הרשמה עם Google</GoogleButton>
      <div className="auth__divider">או</div>

      <form className="auth__form" onSubmit={handleSubmit}>
        <Input
          label="שם מלא"
          id="full-name"
          placeholder="השם שלך"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
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
          placeholder="לפחות 6 תווים"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="auth__error">{error}</p>}
        {note && <p className="auth__note">{note}</p>}
        <Button type="submit" variant="primary" fullWidth>
          {busy ? 'נרשמת…' : 'יצירת חשבון'}
        </Button>
      </form>
    </AuthLayout>
  )
}

export default Register
