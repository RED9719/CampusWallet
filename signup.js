document.getElementById('signupForm').addEventListener('submit', e => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  let users = JSON.parse(localStorage.getItem('users')) || [];
  users.push({ username, email, password });
  localStorage.setItem('users', JSON.stringify(users));

  alert("Signup successful! Please login.");
  window.location.href = "../login/login.html";
});