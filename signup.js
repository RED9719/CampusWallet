document.getElementById('signupForm').addEventListener('submit', async e => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });

    const data = await res.json();
    if (!res.ok) {
      alert(data.message || 'Signup failed');
      return;
    }

    // Save token and user so user is logged in after signup
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));

    alert('Signup successful! Redirecting...');
    window.location.href = "../index.html";
  } catch (err) {
    console.error(err);
    alert('Signup error');
  }
});