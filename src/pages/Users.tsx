import { useState, useEffect } from 'react'
import { User } from '../types'
import { apiFetch } from '../api'

export default function Users() {
  const [users, setUsers] = useState<User[]>([])
  const [newUser, setNewUser] = useState({ name: '', email: '' })
  const [editUser, setEditUser] = useState<User | null>(null)
  const [msg, setMsg] = useState<{ text: string; type: 'success' | 'error' }>({ text: '', type: 'success' })
  const [loading, setLoading] = useState(true)

  useEffect(() => { loadUsers() }, [])

  async function loadUsers() {
    const res = await apiFetch('/api/users')
    const data: User[] = await res.json()
    setUsers(data)
    setLoading(false)
  }

  function handleAddChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewUser({ ...newUser, [e.target.name]: e.target.value })
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    const res = await apiFetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser)
    })
    const result = await res.json()
    if (result.error) {
      setMsg({ text: result.error, type: 'error' })
    } else {
      setMsg({ text: `User ${result.name} added!`, type: 'success' })
      setNewUser({ name: '', email: '' })
      loadUsers()
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Delete this user?')) return
    await apiFetch(`/api/users/${id}`, { method: 'DELETE' })
    loadUsers()
  }

  function handleEditChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!editUser) return
    setEditUser({ ...editUser, [e.target.name]: e.target.value })
  }

  async function handleEditSave(e: React.FormEvent) {
    e.preventDefault()
    if (!editUser) return
    const res = await apiFetch(`/api/users/${editUser.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: editUser.name, email: editUser.email })
    })
    const result = await res.json()
    if (result.error) {
      setMsg({ text: result.error, type: 'error' })
    } else {
      setEditUser(null)
      loadUsers()
    }
  }

  return (
    <main className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-xl shadow">
      <h1 className="text-3xl font-bold mb-6">Users</h1>

      <h2 className="text-xl font-semibold mb-3">Add a User</h2>
      <form onSubmit={handleAdd} className="space-y-3 mb-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input name="name" value={newUser.name} onChange={handleAddChange} required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input name="email" type="email" value={newUser.email} onChange={handleAddChange} required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>
        <button type="submit" className="bg-gray-800 text-white px-5 py-2 rounded hover:bg-gray-600 cursor-pointer">
          Add User
        </button>
      </form>
      {msg.text && (
        <p className={`text-sm mb-4 ${msg.type === 'error' ? 'text-red-500' : 'text-green-600'}`}>{msg.text}</p>
      )}

      <h2 className="text-xl font-semibold mt-6 mb-3">All Users</h2>
      {loading ? <p className="text-gray-500">Loading...</p> : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left px-4 py-2">Name</th>
              <th className="text-left px-4 py-2">Email</th>
              <th className="text-left px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{u.name}</td>
                <td className="px-4 py-2">{u.email}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button onClick={() => setEditUser(u)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-400 cursor-pointer text-sm">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(u.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-400 cursor-pointer text-sm">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {editUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit User</h2>
            <form onSubmit={handleEditSave} className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input name="name" value={editUser.name} onChange={handleEditChange} required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input name="email" type="email" value={editUser.email} onChange={handleEditChange} required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" className="bg-gray-800 text-white px-5 py-2 rounded hover:bg-gray-600 cursor-pointer">
                  Save
                </button>
                <button type="button" onClick={() => setEditUser(null)}
                  className="bg-gray-200 text-gray-700 px-5 py-2 rounded hover:bg-gray-300 cursor-pointer">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  )
}
