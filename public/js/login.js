document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
  
    const data = await response.json();
  
    if (response.ok) {
      // Token will be saved as a cookie on the client side, no need for further handling here
      window.location.href = '/dashboard';
    } else {
      console.error('Error:', data.message || 'Login failed');
    }
  });
  