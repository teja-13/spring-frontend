import { useEffect, useState } from 'react'
import DashboardLayout from '../layouts/DashboardLayout.jsx'
import api from '../services/api.js'

const Categories = () => {
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ name: '', type: 'EXPENSE' })

  const load = async () => {
    const response = await api.get('/categories')
    setItems(response.data.data)
  }

  useEffect(() => {
    load()
  }, [])

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    await api.post('/categories', form)
    setForm({ name: '', type: 'EXPENSE' })
    load()
  }

  const handleDelete = async (item) => {
    await api.delete(`/categories/${item.id}`)
    load()
  }

  return (
    <DashboardLayout>
      <div className="grid gap-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold">Add category</h3>
          <form className="mt-4 grid gap-4 md:grid-cols-3" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Category name"
              className="rounded-lg border border-slate-200 px-4 py-3"
              required
            />
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="rounded-lg border border-slate-200 px-4 py-3"
            >
              <option value="EXPENSE">Expense</option>
              <option value="INCOME">Income</option>
            </select>
            <button type="submit" className="rounded-lg bg-slate-900 px-4 py-3 text-white">
              Create
            </button>
          </form>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold">Your categories</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3"
              >
                <div>
                  <p className="font-medium text-slate-900">{item.name}</p>
                  <p className="text-xs uppercase tracking-wide text-slate-400">{item.type}</p>
                </div>
                {!item.isDefault && (
                  <button
                    type="button"
                    onClick={() => handleDelete(item)}
                    className="text-xs text-rose-600"
                  >
                    Delete
                  </button>
                )}
                {item.isDefault && (
                  <span className="text-xs text-slate-400">Default</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Categories
