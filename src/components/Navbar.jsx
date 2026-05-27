import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const Navbar = () => {
  const { user, logout } = useAuth()

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <NavLink to="/" className="text-lg font-semibold text-slate-900">
          Expense Tracker
        </NavLink>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-500 md:flex">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'text-slate-900' : '')}>
            Dashboard
          </NavLink>
          <NavLink
            to="/transactions"
            className={({ isActive }) => (isActive ? 'text-slate-900' : '')}
          >
            Transactions
          </NavLink>
          <NavLink
            to="/categories"
            className={({ isActive }) => (isActive ? 'text-slate-900' : '')}
          >
            Categories
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) => (isActive ? 'text-slate-900' : '')}
          >
            Profile
          </NavLink>
        </nav>
        <div className="flex items-center gap-4 text-sm">
          {user && <span className="text-slate-600">Hi, {user.name}</span>}
          <button
            type="button"
            onClick={logout}
            className="rounded-md bg-slate-900 px-3 py-2 text-white"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
