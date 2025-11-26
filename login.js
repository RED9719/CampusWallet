document.getElementById('loginForm').addEventListener('submit', async e => {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (!res.ok) {
      alert(data.message || 'Login failed');
      return;
    }

    // Save token and user to localStorage for frontend usage
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));

    alert(`Welcome back, ${data.user.username}!`);
    window.location.href = "../index.html";
  } catch (err) {
    console.error(err);
    alert('Login error');
  }
});