const TransactionFilters = ({ filters, onChange, categories }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <div className="grid gap-4 md:grid-cols-4">
      <input
        type="text"
        name="search"
        placeholder="Search notes"
        value={filters.search}
        onChange={onChange}
        className="rounded-lg border border-slate-200 px-4 py-2"
      />
      <select
        name="category"
        value={filters.category}
        onChange={onChange}
        className="rounded-lg border border-slate-200 px-4 py-2"
      >
        <option value="">All categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
      <select
        name="type"
        value={filters.type}
        onChange={onChange}
        className="rounded-lg border border-slate-200 px-4 py-2"
      >
        <option value="">All types</option>
        <option value="INCOME">Income</option>
        <option value="EXPENSE">Expense</option>
      </select>
      <div className="grid grid-cols-2 gap-3">
        <input
          type="date"
          name="from"
          value={filters.from}
          onChange={onChange}
          className="rounded-lg border border-slate-200 px-4 py-2"
        />
        <input
          type="date"
          name="to"
          value={filters.to}
          onChange={onChange}
          className="rounded-lg border border-slate-200 px-4 py-2"
        />
      </div>
    </div>
  </div>
)

export default TransactionFilters
