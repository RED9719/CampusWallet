// Load tasks from localStorage or start empty
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const taskTitle = document.getElementById('taskTitle');
const taskDue = document.getElementById('taskDue');
const taskList = document.getElementById('taskList');
const addTaskBtn = document.getElementById('addTask');
const taskCounter = document.getElementById('taskCounter');

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, i) => {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';
    li.innerHTML = `
      <span>${task.title} ${task.due ? `(Due: ${task.due})` : ''}</span>
      <button onclick="deleteTask(${i})">X</button>
    `;
    // Toggle completion on click
    li.addEventListener('click', () => {
      task.completed = !task.completed;
      saveTasks();
      renderTasks();
    });
    taskList.appendChild(li);
  });
  updateCounter();
  saveTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateCounter() {
  const completed = tasks.filter(t => t.completed).length;
  const total = tasks.length;
  taskCounter.textContent = `Completed: ${completed} / Total: ${total}`;
}

addTaskBtn.addEventListener('click', () => {
  const title = taskTitle.value.trim();
  const due = taskDue.value;
  if (!title) return;
  tasks.push({ title, due, completed: false });
  taskTitle.value = '';
  taskDue.value = '';
  saveTasks();
  renderTasks();
});

// Initial render
renderTasks();