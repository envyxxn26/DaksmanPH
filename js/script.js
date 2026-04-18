// JavaScript code for the landing page

// Example: Toggle FAQ answers
document.addEventListener('DOMContentLoaded', function() {
    const questions = document.querySelectorAll('.frame-91');
    questions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
        });
    });
});

// Add more JavaScript functionality as needed