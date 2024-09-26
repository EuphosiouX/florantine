document.getElementById('registerForm').addEventListener('submit', function (event) {
    event.preventDefault();

    let username = document.getElementById("username").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
    })
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error('register failed');
            }
        })
        .then(data => {
            console.log(data);
            if (data === 'User registered successfully') {
                window.location.href = 'login.html';
            } else {
                document.getElementById('registerFeedback').textContent = 'Try again.';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('registerFeedback').textContent = 'Username already exist. Try again.';
        });
});