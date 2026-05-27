import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../layouts/AuthLayout.jsx'
import api from '../services/api.js'
import { useAuth } from '../context/AuthContext.jsx'

const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    try {
      const response = await api.post('/api/auth/login', form)
      login(response.data.data)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <AuthLayout title="Welcome back">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3"
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3"
            required
          />
        </div>
        {error && <p className="text-sm text-rose-600">{error}</p>}
        <button type="submit" className="w-full rounded-lg bg-slate-900 py-3 text-white">
          Sign in
        </button>
      </form>
      <p className="text-sm text-slate-600">
        New here?{' '}
        <Link className="font-semibold text-slate-900" to="/register">
          Create an account
        </Link>
      </p>
    </AuthLayout>
  )
}

export default Login
