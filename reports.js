// Chart.js contexts
const ctxBar = document.getElementById('reportChart').getContext('2d');
const ctxLine = document.getElementById('spendLineChart').getContext('2d');

// Initialize charts once
const reportChart = new Chart(ctxBar, {
  type: 'bar',
  data: {
    labels: ['Spend (₹)', 'Tasks'],
    datasets: [{
      label: 'Weekly Progress',
      data: [0, 0], // placeholder
      backgroundColor: ['#7b4b3a', '#d8c2b0'],
      borderRadius: 8
    }]
  },
  options: {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      y: { beginAtZero: true, ticks: { color: '#3e2c23' } },
      x: { ticks: { color: '#3e2c23' } }
    }
  }
});

const spendLineChart = new Chart(ctxLine, {
  type: 'line',
  data: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Daily Spend (₹)',
      data: [0,0,0,0,0,0,0], // placeholder
      borderColor: '#7b4b3a',
      backgroundColor: '#d8c2b0',
      tension: 0.4,
      fill: true,
      pointRadius: 5,
      pointBackgroundColor: '#7b4b3a'
    }]
  },
  options: { responsive: true }
});

// Update reports from localStorage
function updateReports() {
  let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  // Weekly spend
  let weeklySpend = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  // Completed tasks
  let tasksCompleted = tasks.filter(t => t.completed).length;

  // Daily spend Mon–Sun
  let dailySpend = [0,0,0,0,0,0,0];
  expenses.forEach(exp => {
    if (exp.date) {
      let dayIndex = new Date(exp.date).getDay(); // 0=Sun
      let mappedIndex = (dayIndex === 0) ? 6 : dayIndex - 1;
      dailySpend[mappedIndex] += exp.amount;
    }
  });

  // Update text
  document.getElementById('reportSpend').textContent = `Weekly spend: ₹${weeklySpend}`;
  document.getElementById('reportTasks').textContent = `Tasks completed: ${tasksCompleted}`;

  // Update charts
  reportChart.data.datasets[0].data = [weeklySpend, tasksCompleted];
  reportChart.update();

  spendLineChart.data.datasets[0].data = dailySpend;
  spendLineChart.update();
}

// Initial render
updateReports();

// Listen for changes across pages/tabs
window.addEventListener('storage', updateReports);
