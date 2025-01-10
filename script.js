const questions = [
    {
        question: "What do you think has the most impact on livability score?",
        choices: ["Distance to amenenties", "Housing offer", "Companies in the area", "Nearby green areas"],
        answer: "Distance to amenenties"
    },
    {
        question: "Based on teh graphs, where people over timw have decided to live?",
        choices: ["Main cities", "Where companies are located", "Rural areas", "Capital"],
        answer: "Main cities"
    },
    {
        question: "What is the largest planet in our solar system?",
        choices: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: "Jupiter"
    },
    {
        question: "What is the boiling point of water?",
        choices: ["100°C", "90°C", "80°C", "110°C"],
        answer: "100°C"
    }
];

let currentQuestionIndex = 0;

function loadQuestion() {
    const question = questions[currentQuestionIndex];
    const quizContainer = document.getElementById("quiz-container");
    
    quizContainer.innerHTML = `
        <h2>${question.question}</h2>
        ${question.choices.map((choice, index) => `
            <label>
                <input type="radio" name="answer" value="${choice}">
                ${choice}
            </label><br>
        `).join('')}
    `;

    updateProgressBar();
}

function updateProgressBar() {
    const progressBar = document.getElementById("progress-bar");
    const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
    
    progressBar.style.width = `${progressPercentage}%`;
}

document.getElementById("next-button").addEventListener("click", () => {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    
    if (!selectedAnswer) {
        alert("Please select an answer!");
        return;
    }

    const resultContainer = document.getElementById("result-container");
    
    if (selectedAnswer.value === questions[currentQuestionIndex].answer) {
        resultContainer.innerHTML += `<p>Q${currentQuestionIndex + 1}: Correct!</p>`;
    } else {
        resultContainer.innerHTML += `<p>Q${currentQuestionIndex + 1}: Incorrect! Correct answer is ${questions[currentQuestionIndex].answer}.</p>`;
    }

    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        document.getElementById("quiz-container").style.display = 'none';
        document.getElementById("next-button").style.display = 'none';
        resultContainer.style.display = 'block';
        resultContainer.innerHTML += `<h3>Quiz Complete!</h3>`;
        
        // Show final results
        //resultContainer.innerHTML += `<p>Your results:</p>${resultContainer.innerHTML}`;
        
        // Reset for next attempt
        currentQuestionIndex = 0; // Reset for future attempts if needed
        //setTimeout(() => location.reload(), 5000); // Reload after some time
    }
});

// Load the first question on page load
loadQuestion();
