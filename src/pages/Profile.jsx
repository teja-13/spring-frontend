import { useEffect, useState } from 'react'
import DashboardLayout from '../layouts/DashboardLayout.jsx'
import api from '../services/api.js'
import { useAuth } from '../context/AuthContext.jsx'

const Profile = () => {
  const { user, updateUser } = useAuth()
  const [name, setName] = useState(user?.name || '')
  const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '' })
  const [message, setMessage] = useState('')

  useEffect(() => {
    const load = async () => {
      const response = await api.get('/users/me')
      setName(response.data.data.name)
    }
    load()
  }, [])

  const handleProfileSubmit = async (event) => {
    event.preventDefault()
    const response = await api.patch('/users/me', { name })
    updateUser({ id: response.data.data.id, name: response.data.data.name, email: response.data.data.email })
    setMessage('Profile updated')
  }

  const handlePasswordSubmit = async (event) => {
    event.preventDefault()
    await api.patch('/users/me/password', passwords)
    setPasswords({ currentPassword: '', newPassword: '' })
    setMessage('Password updated')
  }

  return (
    <DashboardLayout>
      <div className="grid gap-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold">Profile</h3>
          <form className="mt-4 space-y-4" onSubmit={handleProfileSubmit}>
            <div>
              <label className="text-sm font-medium text-slate-700">Name</label>
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3"
              />
            </div>
            <button type="submit" className="rounded-lg bg-slate-900 px-4 py-2 text-white">
              Save changes
            </button>
          </form>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold">Change password</h3>
          <form className="mt-4 space-y-4" onSubmit={handlePasswordSubmit}>
            <div>
              <label className="text-sm font-medium text-slate-700">Current password</label>
              <input
                type="password"
                value={passwords.currentPassword}
                onChange={(event) => setPasswords((prev) => ({ ...prev, currentPassword: event.target.value }))}
                className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">New password</label>
              <input
                type="password"
                value={passwords.newPassword}
                onChange={(event) => setPasswords((prev) => ({ ...prev, newPassword: event.target.value }))}
                className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3"
              />
            </div>
            <button type="submit" className="rounded-lg bg-slate-900 px-4 py-2 text-white">
              Update password
            </button>
          </form>
        </div>

        {message && <p className="text-sm text-emerald-600">{message}</p>}
      </div>
    </DashboardLayout>
  )
}

export default Profile
