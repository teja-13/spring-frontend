const TransactionTable = ({ items, onEdit, onDelete }) => (
  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
    <table className="min-w-full text-left text-sm">
      <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
        <tr>
          <th className="px-4 py-3">Date</th>
          <th className="px-4 py-3">Category</th>
          <th className="px-4 py-3">Type</th>
          <th className="px-4 py-3">Amount</th>
          <th className="px-4 py-3">Notes</th>
          <th className="px-4 py-3"></th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id} className="border-t border-slate-200">
            <td className="px-4 py-3 text-slate-600">{item.date}</td>
            <td className="px-4 py-3 text-slate-900">{item.category}</td>
            <td className="px-4 py-3 text-slate-600">{item.type}</td>
            <td className="px-4 py-3 font-semibold text-slate-900">${item.amount}</td>
            <td className="px-4 py-3 text-slate-500">{item.note || '-'}</td>
            <td className="px-4 py-3 text-right">
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => onEdit(item)}
                  className="rounded-md border border-slate-200 px-3 py-1 text-xs"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(item)}
                  className="rounded-md border border-rose-200 px-3 py-1 text-xs text-rose-600"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export default TransactionTable
