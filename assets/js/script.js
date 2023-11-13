var startBtn = document.querySelector(".btn");
var timerEl = document.querySelector(".timer-count");
var questionEl = document.querySelector("#question");
var optionsEl = document.querySelector("#options");
var highScoreBtn = document.querySelector("#hi-scores");
var scoreboard = document.querySelector("#scoreboard");
var timerCount = "60";
var currentQuestion = 0;
var score = 0;

var questions = [
    {
        question: "How do you write a conditional statement for executing some statements only if 'i' is NOT equal to 5?",
        options: ["if (i <> 5)", "if i =! 5 then", "if (i != 5)", "if i <> 5"],
        correctAns: 2,
    },
    {
        question: "How does a 'for' loop start?",
        options: ["for (i <= 5; i++)", "for (i = 0; i <= 5)", "for (i = 0; i <= 5; i++)", "for i = 1 to 5"],
        correctAns: 2,
    },
    {
        question: "How can you add a comment in a JavaScript?",
        options: ["//This is a comment", "(This is a comment)", "<This is a comment>", "`This is a comment"],
        correctAns: 0,
    },
    {
        question: "What is the correct way to write a JavaScript array?",
        options: ["var colors = 'red', 'green', 'blue'", "var colors = (1:'red', 2:'green', 3:'blue')", "var colors = ['red', 'green', 'blue']", "var colors = 1 = ('red'), 2 = ('green'), 3 = ('blue')"],
        correctAns: 2,
    },
    {
        question: "How do you declare a JavaScript variable?",
        options: ["v carName;", "variable carName;", "var carName;", "var: carName;"],
        correctAns: 2,
    },
    {
        question: "What will the following code return: Boolean(10 > 9)",
        options: ["NaN", "false", "true", "undefined"],
        correctAns: 2,
    },
]

function renderQuestion() {
    questionEl.innerHTML = "";
    optionsEl.innerHTML = "";
    questionEl.innerHTML = questions[currentQuestion].question;
    questionEl.classList.add("questions");
    questions[currentQuestion].options.forEach((option, index) => {
        var optionEl = document.createElement("div");
        optionEl.innerHTML = option;
        optionEl.classList.add("options");
        optionEl.value = index;
        optionEl.addEventListener("click", optionClick);
        optionsEl.appendChild(optionEl);
    })
}

function optionClick(event) {
    var selectedOption = event.target;
    var selectedAns = parseInt(selectedOption.value);
    if (selectedAns === questions[currentQuestion].correctAns) {
        score += 20;
    } else {
        timerCount -= 10;
    }
    currentQuestion++
    if (currentQuestion === questions.length) {
        endQuiz();
    } else {
        renderQuestion();
    }
}

function startQuiz(event) {
   var timer = setInterval(function() {
    timerEl.innerText = timerCount + " seconds remaining."
    if (timerCount <= 0) {
        endQuiz();
    } else {
        timerCount--
    }
    }, 1000);
    renderQuestion();
}

function endQuiz(event) {
    var scoreEl = document.querySelector("#score");
    var quizEl = document.querySelector("#quiz")
    scoreEl.innerText = "Your score is " + score + "!";
    scoreEl.style.display = "block";
    timerEl.style.display = "none";
    quizEl.style.display = "none";
    var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    var playerName = document.querySelector("#playerName").value;
    var playerScore = { name: playerName, score: score };
    highScores.push(playerScore);
    localStorage.setItem("highScores", JSON.stringify(highScores));
    var scoreboard = document.querySelector("#scoreboard");
    scoreboard.classList.remove("form");
}

function displayHighScores() {
    var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.sort((a, b) => b.score - a.score);
    var scoresList = document.querySelector("#scoresList");
    scoresList.innerHTML = "";
    var topScores = highScores.slice(0, 10);
    topScores.forEach(function (scoreObj) {
        var scoreItem = document.createElement("li");
        scoreItem.textContent = scoreObj.name + " - " + scoreObj.score;
        scoresList.appendChild(scoreItem);
    });
    var highScoresSection = document.querySelector("#highScoresSection");
    highScoresSection.style.display = "block";
}

startBtn.addEventListener("click", startQuiz);
scoreboard.addEventListener("submit", endQuiz);
highScoreBtn.addEventListener("click", displayHighScores)
scoreboard.classList.add("form");