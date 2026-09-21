import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import { apiFetch } from '../api'

export default function Navbar() {
  const { user, setUser } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await apiFetch('/api/logout', { method: 'POST' })
    setUser(null)
    navigate('/login')
  }

  return (
    <nav className="bg-gray-800 px-6 py-3 flex items-center gap-6">
      <Link to="/" className="text-white font-bold hover:text-blue-300">Home</Link>
      {user && <Link to="/users" className="text-white font-bold hover:text-blue-300">Users</Link>}
      <Link to="/about" className="text-white font-bold hover:text-blue-300">About</Link>
      <div className="flex-1" />
      {user
        ? <>
            <span className="text-blue-300">Hi, {user.username}</span>
            <button onClick={handleLogout} className="border border-blue-300 text-blue-300 px-3 py-1 rounded hover:bg-white/10 cursor-pointer">
              Logout
            </button>
          </>
        : <Link to="/login" className="text-white font-bold hover:text-blue-300">Login</Link>
      }
    </nav>
  )
}
