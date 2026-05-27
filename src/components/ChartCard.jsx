const ChartCard = ({ title, children }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
    </div>
    <div className="mt-6 h-72">{children}</div>
  </div>
)

export default ChartCard
