import React, { useState } from 'react';
import useExpenses from "./hooks/useExpenses";
import './index.css';
import useFilters from './hooks/useFilters';

function App() {
  const { expenses, addExpenses, removeExpense, getTotalAmount, getExpensesByCategory } = useExpenses();
  const {
    filters,
    filteredData: filteredExpenses,
    updateFilter,
    clearFilters,
    getFiltersSummary


  } = useFilters(expenses);
  const summary = getFiltersSummary();
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('food');


  // Categeories
  const categories = ['all', 'food', 'transportation', 'entertainment', 'utilities', 'healthcare', 'education', 'personal care', 'miscellaneous'];


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim() || !amount.trim() || isNaN(amount) || Number(amount) <= 0) return;

    addExpenses({
      description: description.trim(),
      amount: parseFloat(amount),
      category,
    });

    setDescription('');
    setAmount('');

  }

  return (
    <div className="App">
      <h1>Personal Expense Tracker</h1>

      <form onSubmit={handleSubmit} className="expense-form">
        <div className="form-group">
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What did you spend on?"
            required
            maxLength='60'
          />
          <small>{description.length}/60</small>
        </div>
        <div className="form-group">
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            step="0.01"
            min="0"
            required
          />
        </div>
        <div className="form-group">
          <label>Category:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} required>

            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Add Expense</button>
      </form>

      <div className="filters">
        <div className="form-group">
          <label>Filter By Category</label>

          <select
            value={filters.category}
            onChange={(e) => updateFilter('category', e.target.value)
            }
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}

          </select>
        </div>

        <div className="form-group">
          <label htmlFor="search">Search Description</label>
          <input type="text" value={filters.searchTerm}
            onChange={(e) => updateFilter('searchTerm', e.target.value)}
            placeholder='Search description'
          />
        </div>

        <div className="form-group">
          <label htmlFor="searchTerm">Min Amount</label>
          <input type="number" value={filters.minAmount}
            onChange={(e) => updateFilter('minAmount', e.target.value)}
            placeholder='0.00'
          />
        </div>

        <div className="form-group">
          <label htmlFor="maxAmount">Max Amount</label>
          <input type="number" value={filters.maxAmount}
            onChange={(e) => updateFilter('maxAmount', e.target.value)}
            placeholder='999.99'
          />
        </div>

        {summary.hasActiveFilters && (

          <button
            type='button'
            onClick={clearFilters}
            style={{ background: '#6c757d' }}
          >
            Clear Filters ({summary.activeCount})

          </button>
        )}

        <div style={{ margin: '20px', padding: '10px', background: '#f8f9fa', borderRadius: '8px' }}>
          <p>Showing {getFiltersSummary.totalResults} of {expenses.length} expenses.
            {getFiltersSummary.hasActiveFilters && 1 `(getFiltersSummary.activeCount) filter ${getFiltersSummary.activeCount !== '1' ? 's' : ''}`}
          </p>
        </div>
      </div>

      <div className="expense-list">
        {
          filteredExpenses.length === 0 ?
            <p style={{ color: 'gray', textAlign: 'center', fontStyle: 'italic' }}>
              No expenses added yet.
            </p> : (
              (
                filteredExpenses.map(expense => (
                  <div key={expense.id} className="expense-item">

                    <div className="expense-info">
                      <div className="expense-description">{expense.description}</div>
                      <div className="expense-category">{expense.category}</div>
                      <div className="expense-date" style={{ color: '#666', fontSize: '14px' }}>{expense.date}</div>
                    </div>
                    <div className="expense-amount">${expense.amount.toFixed(2)}</div>
                    <button onClick={() => removeExpense(expense.id)}
                      style={{ background: '#e53e3e', padding: '5px 10px', fontSize: '12px' }}
                    >
                      Remove Expense
                    </button>
                  </div>

                )
                )
              )
            )
        }
      </div>

      <div className="total-section">
        <h2>Total Expenses</h2>
        <div className="total-amount">$ {getTotalAmount.toFixed(2)}

          {summary.hasActiveFilters && (
            <div style={{
              fontSize: '16px', color: '#666',
              marginTop: '10px'
            }}>
              Filtered Total : $ {filteredExpenses.reduce((sum, expenses) => sum + expenses.amount, 0).toFixed(2)}

            </div>
          )}</div>
      </div>

    </div>
  );
}

export default App;