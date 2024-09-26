function sendEnquiry() {
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email");
    let emailValue = email.value.trim();
    let message = document.getElementById("message").value.trim();

    let isValid = true;

    if (name === "" || name.length > 100) {
        displayFeedback("nameFeedback", "Name cannot be empty and must be less than 100 characters.", false);
        isValid = false;
    } else {
        displayFeedback("nameFeedback", "Valid name entered.", true);
    }

    if (!/^[A-Za-z0-9.]{1,}@[A-Za-z]{1,}[A-Za-z.]{1,}$/.test(emailValue)) {
        displayFeedback("emailFeedback", "Email is not valid. Must end with '@deakin.edu.au'.", false);
        isValid = false;
    } else {
        displayFeedback("emailFeedback", "Valid email entered.", true);
    }

    if (message === "" || message.length > 500) {
        displayFeedback("messageFeedback", "message cannot be empty and must be less than 500 characters.", false);
        isValid = false;
    } else {
        displayFeedback("messageFeedback", "Valid message entered.", true);
    }

    if (isValid) {
        alert("Message sent!!");
    }
};

function displayFeedback(elementId, message, isValid) {
    const feedbackElement = document.getElementById(elementId);
    feedbackElement.textContent = message;
    feedbackElement.className = isValid ? "valid-feedback" : "invalid-feedback";
}

