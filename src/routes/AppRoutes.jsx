import { Routes, Route } from 'react-router-dom'
import Login from '../pages/Login.jsx'
import Register from '../pages/Register.jsx'
import Dashboard from '../pages/Dashboard.jsx'
import Transactions from '../pages/Transactions.jsx'
import Categories from '../pages/Categories.jsx'
import Profile from '../pages/Profile.jsx'
import NotFound from '../pages/NotFound.jsx'
import ProtectedRoute from '../components/ProtectedRoute.jsx'

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route
      path="/"
      element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/transactions"
      element={
        <ProtectedRoute>
          <Transactions />
        </ProtectedRoute>
      }
    />
    <Route
      path="/categories"
      element={
        <ProtectedRoute>
          <Categories />
        </ProtectedRoute>
      }
    />
    <Route
      path="/profile"
      element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      }
    />
    <Route path="*" element={<NotFound />} />
  </Routes>
)

export default AppRoutes
