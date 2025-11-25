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
    li.className = "expense-item";

    li.innerHTML = `
      <div class="expense-content">
        <span><strong>${exp.title}</strong> (Date: ${exp.date})</span>
        <div>
          <strong>₹${exp.amount}</strong>
        </div>
      </div>
      <div class="expense-actions">
        <button onclick="editExpense(${i})">Edit</button>
        <button onclick="deleteExpense(${i})">Delete</button>
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

function editExpense(index) {
  const li = expenseList.children[index];
  const exp = expenses[index];

  li.innerHTML = `
    <input type="text" id="editTitle${index}" value="${exp.title}" />
    <input type="number" id="editAmount${index}" value="${exp.amount}" />
    <div class="expense-actions">
      <button onclick="saveEdit(${index})">Save</button>
      <button onclick="renderExpenses()">Cancel</button>
    </div>
  `;
}

function saveEdit(index) {
  const newTitle = document.getElementById(`editTitle${index}`).value.trim();
  const newAmount = parseFloat(document.getElementById(`editAmount${index}`).value);

  if (newTitle && !isNaN(newAmount)) {
    expenses[index].title = newTitle;
    expenses[index].amount = newAmount;
    expenses[index].date = new Date().toISOString().slice(0, 10);
    saveExpenses();
    renderExpenses();
  }
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