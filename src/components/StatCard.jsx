const StatCard = ({ label, value, accent }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{label}</p>
    <p className={`mt-3 text-2xl font-semibold ${accent || 'text-slate-900'}`}>{value}</p>
  </div>
)

export default StatCard
