const AuthLayout = ({ title, children }) => (
  <div className="min-h-screen bg-slate-950 text-white">
    <div className="mx-auto flex min-h-screen w-full max-w-5xl items-center gap-12 px-6">
      <div className="hidden w-1/2 space-y-4 lg:block">
        <p className="text-sm uppercase tracking-[0.25em] text-emerald-300">Track smarter</p>
        <h1 className="text-4xl font-semibold">Modern expense tracking with clarity.</h1>
        <p className="text-slate-300">
          Manage income, expenses, and analytics in a single, secure workspace.
        </p>
      </div>
      <div className="w-full rounded-2xl bg-white p-8 text-slate-900 shadow-xl lg:w-1/2">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <div className="mt-6 space-y-4">{children}</div>
      </div>
    </div>
  </div>
)

export default AuthLayout
