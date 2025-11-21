// Load expenses from localStorage or start empty
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

const expenseTitle = document.getElementById('expenseTitle');
const expenseAmount = document.getElementById('expenseAmount');
const expenseList = document.getElementById('expenseList');
const expenseTotal = document.getElementById('expenseTotal');
const addExpenseBtn = document.getElementById('addExpense');

function saveExpenses() {
  localStorage.setItem('expenses', JSON.stringify(expenses));
}

function renderExpenses() {
  expenseList.innerHTML = '';
  let total = 0;

  expenses.forEach((exp, i) => {
    total += exp.amount;
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${exp.title} (Date: ${exp.date})</span>
      <div>
        <strong>₹${exp.amount}</strong>
        <button onclick="deleteExpense(${i})">X</button>
      </div>
    `;
    expenseList.appendChild(li);
  });

  expenseTotal.textContent = `Total: ₹${total}`;
  saveExpenses();
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  renderExpenses();
}

addExpenseBtn.addEventListener('click', () => {
  const title = expenseTitle.value.trim();
  const amount = parseFloat(expenseAmount.value);
  if (!title || isNaN(amount)) return;

  expenses.push({
    title,
    amount,
    date: new Date().toISOString().slice(0, 10) // YYYY-MM-DD
  });

  expenseTitle.value = '';
  expenseAmount.value = '';
  renderExpenses();
});

// Initial render
renderExpenses();