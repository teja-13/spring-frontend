import { useEffect, useState } from 'react'
import DashboardLayout from '../layouts/DashboardLayout.jsx'
import TransactionFilters from '../components/TransactionFilters.jsx'
import TransactionTable from '../components/TransactionTable.jsx'
import TransactionForm from '../components/TransactionForm.jsx'
import api from '../services/api.js'

const Transactions = () => {
  const [categories, setCategories] = useState([])
  const [items, setItems] = useState([])
  const [editing, setEditing] = useState(null)
  const [filters, setFilters] = useState({ search: '', category: '', type: '', from: '', to: '' })
  const [page, setPage] = useState(0)
  const [size] = useState(10)
  const [total, setTotal] = useState(0)

  const load = async (pageIndex = 0) => {
    const categoryRes = await api.get('/categories')
    setCategories(categoryRes.data.data)
    const params = {
      page: pageIndex,
      size,
      sortBy: 'date',
      sortDir: 'DESC',
    }
    if (filters.search) params.search = filters.search
    if (filters.category) params.category = filters.category
    if (filters.type) params.type = filters.type
    if (filters.from) params.from = filters.from
    if (filters.to) params.to = filters.to
    const response = await api.get('/transactions', {
      params,
    })
    setItems(response.data.data.items)
    setTotal(response.data.data.total)
  }

  useEffect(() => {
    load(page)
  }, [page])

  useEffect(() => {
    setPage(0)
    load(0)
  }, [filters])

  const handleFilterChange = (event) => {
    setFilters((prev) => ({ ...prev, [event.target.name]: event.target.value }))
  }

  const handleSubmit = async (payload) => {
    if (editing) {
      await api.put(`/transactions/${editing.id}`, payload)
    } else {
      await api.post('/transactions', payload)
    }
    setEditing(null)
    load(page)
  }

  const handleDelete = async (item) => {
    await api.delete(`/transactions/${item.id}`)
    load(page)
  }

  const pageCount = Math.ceil(total / size)

  return (
    <DashboardLayout>
      <div className="grid gap-6">
        <TransactionFilters filters={filters} onChange={handleFilterChange} categories={categories} />
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold">Add transaction</h3>
          <div className="mt-4">
            <TransactionForm
              categories={categories}
              onSubmit={handleSubmit}
              initialValues={editing}
              onCancel={() => setEditing(null)}
            />
          </div>
        </div>
        <TransactionTable items={items} onEdit={setEditing} onDelete={handleDelete} />
        <div className="flex items-center justify-between text-sm text-slate-500">
          <span>
            Page {page + 1} of {pageCount || 1}
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
              className="rounded-md border border-slate-200 px-3 py-1"
              disabled={page === 0}
            >
              Prev
            </button>
            <button
              type="button"
              onClick={() => setPage((prev) => Math.min(prev + 1, pageCount - 1))}
              className="rounded-md border border-slate-200 px-3 py-1"
              disabled={page + 1 >= pageCount}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Transactions
