document.getElementById('loginForm').addEventListener('submit', e => {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  let users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    alert(`Welcome back, ${user.username}!`);
    window.location.href = "../index.html"; // go to dashboard
  } else {
    alert("Invalid credentials. Try again.");
  }
});document.getElementById('loginForm').addEventListener('submit', e => {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  let users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    alert(`Welcome back, ${user.username}!`);
    window.location.href = "../index.html"; // go to dashboard
  } else {
    alert("Invalid credentials. Try again.");
  }
});