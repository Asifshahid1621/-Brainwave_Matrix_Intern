document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expense-form');
    const expenseList = document.getElementById('expenses');
    const totalAmountElement = document.getElementById('total');
    const filterCategory = document.getElementById('filter-category');
  
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    let totalAmount = 0;
  
    // Render expenses
    function renderExpenses(filterCategoryValue = 'All') {
      expenseList.innerHTML = '';
      totalAmount = 0;
  
      const filteredExpenses = filterCategoryValue === 'All'
        ? expenses
        : expenses.filter(expense => expense.category === filterCategoryValue);
  
      filteredExpenses.forEach((expense, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
          <span>${expense.name} - $${expense.amount.toFixed(2)} (${expense.date}, ${expense.category})</span>
          <button onclick="deleteExpense(${index})">Delete</button>
        `;
        expenseList.appendChild(li);
        totalAmount += expense.amount;
      });
  
      totalAmountElement.textContent = `$${totalAmount.toFixed(2)}`;
    }
  
    // Add expense
    expenseForm.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const expenseName = document.getElementById('expense-name').value;
      const expenseAmount = parseFloat(document.getElementById('expense-amount').value);
      const expenseDate = document.getElementById('expense-date').value;
      const expenseCategory = document.getElementById('expense-category').value;
  
      if (expenseName && !isNaN(expenseAmount) && expenseDate && expenseCategory) {
        const expense = {
          name: expenseName,
          amount: expenseAmount,
          date: expenseDate,
          category: expenseCategory
        };
  
        expenses.push(expense);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        renderExpenses(filterCategory.value);
        expenseForm.reset();
      } else {
        alert('Please fill out all fields correctly.');
      }
    });
  
    // Delete expense
    window.deleteExpense = (index) => {
      expenses.splice(index, 1);
      localStorage.setItem('expenses', JSON.stringify(expenses));
      renderExpenses(filterCategory.value);
    };
  
    // Filter expenses
    filterCategory.addEventListener('change', () => {
      renderExpenses(filterCategory.value);
    });
  
    // Initial render
    renderExpenses();
  });