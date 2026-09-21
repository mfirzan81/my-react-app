import { Navigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'

export default function ProtectedRoute({ children }) {
  const { user } = useAuth()

  if (user === undefined) return <p style={{ padding: 20 }}>Loading...</p>
  if (!user) return <Navigate to="/login" />
  return children
}
