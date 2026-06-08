const questions = [
    {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "High Text Machine Language", "Hyper Tool Multi Language", "Home Text Markup Language"],
        answer: "Hyper Text Markup Language"
    },
    {
        question: "Which language is used to style web pages?",
        options: ["HTML", "CSS", "Python", "Java"],
        answer: "CSS"
    },
    {
        question: "Which language is used to make web pages interactive?",
        options: ["CSS", "HTML", "JavaScript", "SQL"],
        answer: "JavaScript"
    },
    {
        question: "Which tag is used to link CSS in HTML?",
        options: ["<script>", "<link>", "<style>", "<css>"],
        answer: "<link>"
    },
    {
        question: "Which symbol is used for ID selector in CSS?",
        options: [".", "#", "*", "&"],
        answer: "#"
    },
    {
        question: "Which method selects an element by ID in JavaScript?",
        options: ["querySelectorAll()", "getElementById()", "getElementsByClassName()", "innerHTML()"],
        answer: "getElementById()"
    },
    {
        question: "Which HTML tag creates a button?",
        options: ["<btn>", "<button>", "<inputbutton>", "<click>"],
        answer: "<button>"
    },
    {
        question: "Which CSS property changes text color?",
        options: ["font-color", "text-color", "color", "background-color"],
        answer: "color"
    },
    {
        question: "Which keyword declares a variable in JavaScript?",
        options: ["var", "int", "string", "define"],
        answer: "var"
    },
    {
        question: "What does CSS stand for?",
        options: ["Creative Style System", "Cascading Style Sheets", "Computer Style Syntax", "Colorful Style Sheet"],
        answer: "Cascading Style Sheets"
    }
];

let currentQuestion = 0;
let score = 0;

const welcomeScreen = document.getElementById("welcomeScreen");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const progressText = document.getElementById("progressText");
const progress = document.getElementById("progress");
const scoreText = document.getElementById("scoreText");
const message = document.getElementById("message");
const percentageText = document.getElementById("percentageText");
const liveScore = document.getElementById("liveScore");
const questionNumber = document.getElementById("questionNumber");

function startQuiz() {
    welcomeScreen.classList.add("hide");
    resultScreen.classList.add("hide");
    quizScreen.classList.remove("hide");
    currentQuestion = 0;
    score = 0;
    liveScore.textContent = score;
    showQuestion();
}

function showQuestion() {
    nextBtn.style.display = "none";

    const q = questions[currentQuestion];

    questionNumber.textContent = `Question ${currentQuestion + 1}`;
    questionElement.textContent = q.question;
    progressText.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
    progress.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;

    optionsElement.innerHTML = "";

    q.options.forEach(option => {
        const button = document.createElement("button");
        button.classList.add("option");
        button.textContent = option;
        button.onclick = () => selectOption(button, option);
        optionsElement.appendChild(button);
    });
}

function selectOption(button, option) {
    const allOptions = document.querySelectorAll(".option");

    allOptions.forEach(btn => {
        btn.disabled = true;

        if (btn.textContent === questions[currentQuestion].answer) {
            btn.classList.add("correct");
        }
    });

    if (option === questions[currentQuestion].answer) {
        score++;
        liveScore.textContent = score;
        button.classList.add("correct");
    } else {
        button.classList.add("wrong");
    }

    nextBtn.style.display = "inline-block";
}

function nextQuestion() {
    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    quizScreen.classList.add("hide");
    resultScreen.classList.remove("hide");

    const percentage = Math.round((score / questions.length) * 100);

    scoreText.textContent = `${score}/${questions.length}`;
    percentageText.textContent = `You scored ${percentage}%`;

    if (score >= 8) {
        message.innerHTML = "🏆 Excellent Performance!";
    } else if (score >= 5) {
        message.innerHTML = "👏 Good Job!";
    } else {
        message.innerHTML = "📚 Keep Practicing!";
    }
}

function restartQuiz() {
    startQuiz();
}

function goHome() {
    resultScreen.classList.add("hide");
    quizScreen.classList.add("hide");
    welcomeScreen.classList.remove("hide");
}