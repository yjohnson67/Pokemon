//search bar redirect
document.addEventListener("DOMContentLoaded", function() {
    document.querySelector("#searchButton").addEventListener("click", function() {
        const pokemonName = document.querySelector("#pokemonSearch").value.toLowerCase();
        window.location.href = `details.html?name=${pokemonName}`;
    });
 });

 document.addEventListener('DOMContentLoaded', () => {
    // Select all buttons inside the #types div
    const buttons = document.querySelectorAll('#types button');

    buttons.forEach(button => {
        // Add hover effect on mouse over
        button.addEventListener('mouseover', () => {
            button.style.backgroundColor = '#f8d7da'; // Light red
            button.style.color = '#721c24';          // Dark red
            button.style.transform = 'scale(1.1)';   // Slightly enlarge
            button.style.transition = 'transform 0.3s ease, background-color 0.3s ease';
        });

        // Remove hover effect on mouse out
        button.addEventListener('mouseout', () => {
            button.style.backgroundColor = ''; // Reset to default
            button.style.color = '';           // Reset to default
            button.style.transform = '';       // Reset to default
        });
    });
});

// Light and Dark Mode Toggle
const toggleButton = document.getElementById("toggleMode");
const toggleIcon = document.getElementById("toggleIcon");
const body = document.body;

const moonImage = "..img/crescent-moon.png";
const sunImage = ".. img/sun.png"

toggleButton.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    toggleIcon.src = body.classList.contains("dark-mode") ? sunImage : moonImage;
    toggleIcon.alt = body.classList.contains("dark-mode") ? "Sun Icon" : "Moon Icon";
});
