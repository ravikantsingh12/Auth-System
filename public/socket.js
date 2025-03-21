const socket = io('http://localhost:5000');

socket.on("alert", (data) => {
  if (data && data.message) {
    alert(data.message); // Show alert pop-up
  } else {
    alert("Unauthorized IP detected. Redirecting in 30 seconds...");
  }

  // Auto redirect after 30 seconds
  setTimeout(() => {
    window.location.href = "/register"; // Redirect to registration page
  }, 30000);
});

socket.on('forceLogout', () => {
  // Clear local storage/session
  localStorage.removeItem('token');
  // Redirect to login page
  window.location.href = '/';
});

socket.on('logoutSuccess', (message) => {
  alert(message); // Display the "Logged out successfully" message in an alert pop-up
});

// Listen for the 'registrationSuccess' event to show registration success message
socket.on('registrationSuccess', (message) => {
  alert(message); // Display the "User registered successfully" message in an alert pop-up
});