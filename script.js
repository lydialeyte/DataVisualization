const questions = [
    {
        question: "What factor most strongly impacts the livability score?",
        choices: ["Distance to amenities", "Housing availability", "Number of local companies", "Proximity to green spaces"],
        answer: "Distance to amenities"
    },
    {
        question: "Based on the graphs, where have people increasingly chosen to live over time?",
        choices: ["Main cities", "Areas with high company density", "Rural areas", "Capital cities"],
        answer: "Main cities"
    },
    {
        question: "Which region cluster shows the fastest improvement in livability?",
        choices: ["Urban areas", "Suburban districts", "Rural neighborhoods", "Industrial hubs"],
        answer: "Urban areas"
    },
    {
        question: "What socioeconomic factor correlates strongly with higher livability?",
        choices: ["Higher average income", "More green spaces", "Lower housing density", "Proximity to public transport"],
        answer: "Higher average income"
    }
];

let currentQuestionIndex = 0;

function loadQuestion() {
    const question = questions[currentQuestionIndex];
    const quizContainer = document.getElementById("quiz-container");
    
    quizContainer.innerHTML = `
        <div style="margin-bottom: 20px;">
            <h2 style="font-size: 1.5rem; color: #333;">${question.question}</h2>
        </div>
        ${question.choices.map((choice, index) => `
            <div style="margin: 10px 0;">
                <label style="font-size: 1rem; color: #555;">
                    <input type="radio" name="answer" value="${choice}" style="margin-right: 10px;">
                    ${choice}
                </label>
            </div>
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
        resultContainer.innerHTML += `<p style="color: green; font-size: 1rem; margin: 10px 0;">Q${currentQuestionIndex + 1}: Correct! Your understanding aligns with the data. This highlights the importance of factors such as accessibility and population trends identified in the visualizations.</p>`;
    } else {
        resultContainer.innerHTML += `<p style="color: red; font-size: 1rem; margin: 10px 0;">Q${currentQuestionIndex + 1}: Incorrect! The correct answer is "${questions[currentQuestionIndex].answer}". Insights from the data show that understanding socioeconomic and accessibility factors is crucial for improving livability.</p>`;
    }

    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        document.getElementById("quiz-container").style.display = 'none';
        document.getElementById("next-button").style.display = 'none';
        resultContainer.style.display = 'block';
        resultContainer.innerHTML += `<h3 style="font-size: 1.5rem; color: #333;">Quiz Complete!</h3><p style="font-size: 1rem; color: #555;">Great job exploring insights from the visualizations.</p><div style="margin-top: 20px; font-size: 1rem; color: #555;">Based on the data you've explored, here are steps to formulate actionable policies:<ul style="margin-top: 10px; padding-left: 20px;"><li><strong>Address Accessibility:</strong> Invest in improving proximity to essential services like schools, supermarkets, and healthcare centers in less accessible regions.</li><li><strong>Promote Sustainable Urban Growth:</strong> Focus on urban areas with fast-improving livability scores to expand infrastructure while preserving green spaces.</li><li><strong>Support Socioeconomic Advancement:</strong> Implement programs to boost average income levels and housing availability in regions with lower livability scores.</li><li><strong>Tailor Local Initiatives:</strong> Use granular insights (municipality, district, or neighborhood) to address specific regional needs effectively.</li></ul></div>`;
        
        // Reset for the next attempt
        currentQuestionIndex = 0;
    }
});

// Load the first question on page load
loadQuestion();
