import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'

/**
 * Gate a route behind authentication. Sends unauthenticated users to /login,
 * remembering where they came from so login can send them back.
 */
function ProtectedRoute({ children }) {
  const { session, loading } = useAuth()
  const location = useLocation()

  if (loading) return null
  if (!session) return <Navigate to="/login" state={{ from: location }} replace />
  return children
}

export default ProtectedRoute
