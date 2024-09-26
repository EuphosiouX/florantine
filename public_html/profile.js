window.addEventListener('load', function () {
    // Fetch profile data from the server
    fetch('/api/profile', { method: 'GET' })
        .then(response => {
            if (response.status === 401) {
                window.location.href = 'login.html';  // Redirect to login if not authenticated
            } else if (response.status === 500) {
                throw new Error('Server error while fetching profile');  // Handle server error
            } else {
                return response.json();  // Parse the response data as JSON
            }
        })
        .then(profile => {
            if (profile) {
                document.getElementById('profileDetails').innerHTML = `
                    <p><strong>Username:</strong> ${profile.username}</p>
                    <p><strong>Email:</strong> ${profile.email}</p>
                `;
            }
        })
        .catch(error => {
            console.error('Error fetching profile:', error);  // Log error details
            alert('An error occurred while fetching your profile. Please try again later.');
        });
});

document.getElementById('logoutBtn').addEventListener('click', function () {
    fetch('/logout', { method: 'GET' })
        .then(response => {
            if (response.redirected) {
                window.location.href = 'index.html';  // Redirect to index.html
            } else {
                console.error('Logout failed');
            }
        })
        .catch(error => {
            console.error('Error logging out:', error);
        });
});