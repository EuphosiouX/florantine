document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();

    fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
        .then(response => response.text())
        .then(data => {
            if (data === 'Login successful') {
                window.location.href = 'profile.html';  // Redirect to profile after login
            } else {
                document.getElementById('loginFeedback').textContent = 'Invalid credentials. Try again.';
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});