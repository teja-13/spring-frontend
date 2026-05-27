import { useEffect, useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import DashboardLayout from '../layouts/DashboardLayout.jsx'
import StatCard from '../components/StatCard.jsx'
import ChartCard from '../components/ChartCard.jsx'
import api from '../services/api.js'

const COLORS = ['#0f172a', '#38bdf8', '#f97316', '#22c55e', '#a855f7']

const Dashboard = () => {
  const [summary, setSummary] = useState({ totalIncome: 0, totalExpense: 0, balance: 0 })
  const [monthly, setMonthly] = useState([])
  const [categories, setCategories] = useState([])
  const [recent, setRecent] = useState([])

  useEffect(() => {
    const load = async () => {
      const [summaryRes, monthlyRes, categoryRes, recentRes] = await Promise.all([
        api.get('/analytics/summary'),
        api.get('/analytics/monthly'),
        api.get('/analytics/categories', { params: { type: 'EXPENSE' } }),
        api.get('/transactions', { params: { page: 0, size: 5, sortBy: 'date', sortDir: 'DESC' } }),
      ])
      setSummary(summaryRes.data.data)
      setMonthly(monthlyRes.data.data)
      setCategories(categoryRes.data.data)
      setRecent(recentRes.data.data.items)
    }
    load()
  }, [])

  return (
    <DashboardLayout>
      <div className="grid gap-6 lg:grid-cols-3">
        <StatCard label="Total income" value={`$${summary.totalIncome}`} accent="text-emerald-600" />
        <StatCard label="Total expenses" value={`$${summary.totalExpense}`} accent="text-rose-600" />
        <StatCard label="Remaining balance" value={`$${summary.balance}`} accent="text-slate-900" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <ChartCard title="Monthly cashflow">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthly}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="income" stroke="#22c55e" strokeWidth={2} />
              <Line type="monotone" dataKey="expense" stroke="#ef4444" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Expense categories">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={categories} dataKey="total" nameKey="category" outerRadius={90}>
                {categories.map((entry, index) => (
                  <Cell key={entry.category} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold">Recent transactions</h3>
        <div className="mt-4 space-y-3">
          {recent.length === 0 && <p className="text-sm text-slate-500">No transactions yet.</p>}
          {recent.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b pb-3">
              <div>
                <p className="font-medium text-slate-900">{item.category}</p>
                <p className="text-xs text-slate-500">{item.date}</p>
              </div>
              <p className="font-semibold text-slate-900">${item.amount}</p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Dashboard
