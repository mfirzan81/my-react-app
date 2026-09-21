import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Account } from './types'
import { apiFetch } from './api'

interface AuthContextType {
  user: Account | null | undefined
  setUser: (user: Account | null) => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Account | null | undefined>(undefined)

  useEffect(() => {
    apiFetch('/api/me')
      .then(r => r.json())
      .then(data => setUser(data.user))
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
