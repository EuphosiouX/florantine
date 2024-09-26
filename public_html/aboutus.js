document.getElementById('feedbackForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const customerName = document.getElementById('customerName').value;
    const feedbackText = document.getElementById('feedbackText').value;

    fetch('/submit_feedback', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            'customer_name': customerName,
            'feedback_text': feedbackText
        })
    }).then(response => response.json())
        .then(data => {
            alert(data.message);
            location.reload();  // Reload the page to show the new feedback
        });
});

document.addEventListener('DOMContentLoaded', () => {
    fetch('/get_feedback')
        .then(response => response.json())
        .then(data => {
            const carouselInner = document.getElementById('feedback-carousel');
            data.forEach((feedback, index) => {
                const carouselItem = document.createElement('div');
                carouselItem.classList.add('carousel-item');
                if (index === 0) carouselItem.classList.add('active');
                carouselItem.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <blockquote class="blockquote mb-0">
                            <p>“${feedback.feedback_text}”</p>
                            <footer class="blockquote-footer bg-light-subtle">${feedback.customer_name}</footer>
                        </blockquote>
                    </div>
                </div>`;
                carouselInner.appendChild(carouselItem);
            });
        });
});
