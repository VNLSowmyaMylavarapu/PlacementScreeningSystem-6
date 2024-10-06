document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simple validation
    if (username === '' || password === '') {
        alert('Please fill in all fields.');
        return;
    }

    // Simulate an AJAX login request (replace with actual AJAX call)
    console.log('Attempting to log in with:', username, password);
    // Here you would typically make a fetch or XMLHttpRequest to your server

    // Simulating a successful login
    setTimeout(() => {
        alert('Login successful!'); // Replace with actual logic
        window.location.href = './dashboard.html'; // Redirect to dashboard
    }, 1000); // Simulated delay
});