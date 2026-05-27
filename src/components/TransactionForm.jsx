import { useEffect, useState } from 'react'

const emptyForm = {
  type: 'EXPENSE',
  amount: '',
  category: '',
  note: '',
  date: '',
}

const TransactionForm = ({ categories, onSubmit, initialValues, onCancel }) => {
  const [form, setForm] = useState(emptyForm)

  useEffect(() => {
    if (initialValues) {
      setForm({
        type: initialValues.type,
        amount: initialValues.amount,
        category: initialValues.category,
        note: initialValues.note || '',
        date: initialValues.date,
      })
    } else {
      setForm(emptyForm)
    }
  }, [initialValues])

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit({
      ...form,
      amount: Number(form.amount),
    })
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-slate-700">Type</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3"
          >
            <option value="INCOME">Income</option>
            <option value="EXPENSE">Expense</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">Amount</label>
          <input
            type="number"
            name="amount"
            min="0"
            step="0.01"
            value={form.amount}
            onChange={handleChange}
            className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3"
            required
          />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-slate-700">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3"
            required
          >
            <option value="" disabled>
              Select category
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3"
            required
          />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-slate-700">Notes</label>
        <textarea
          name="note"
          value={form.note}
          onChange={handleChange}
          className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3"
          rows="3"
        />
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" className="rounded-lg bg-slate-900 px-4 py-2 text-white">
          Save transaction
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="text-sm text-slate-500">
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}

export default TransactionForm
