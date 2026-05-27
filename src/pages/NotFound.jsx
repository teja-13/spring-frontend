import { Link } from 'react-router-dom'

const NotFound = () => (
  <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
    <div className="space-y-4 text-center">
      <h1 className="text-3xl font-semibold">Page not found</h1>
      <Link to="/" className="text-emerald-300 underline">
        Go back home
      </Link>
    </div>
  </div>
)

export default NotFound
