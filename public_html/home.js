document.getElementById("greeting").innerText = greeting;

const welcomeSection = document.getElementById('welcome-section');
welcomeSection.onmouseover = function () {
    welcomeSection.style.backgroundColor = '#396d25';
    welcomeSection.classList.toggle("bg-dark-subtle", false);
    welcomeSection.classList.toggle("text-light", true);
};
welcomeSection.onmouseout = function () {
    welcomeSection.style.backgroundColor = '';
    welcomeSection.classList.toggle("bg-dark-subtle", true);
    welcomeSection.classList.toggle("text-light", false);
};