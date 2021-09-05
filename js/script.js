//const startButton = document.getElementById('start-btn')
//const quetionsContainerElement = document.getElementById('question-container')
//const questionElement = document.getElementById('quesiton')
//const answerButtonsElement = document.getElementById('answer-buttons')

//let shuffledQuestions, currentQuestionIndex

//startButton.addEventListener('clcik', startGame)

//function startGame() {
    //console.log('Started')
    //startButton.classList.add('hide')
    //shuffledQuestions = questions.sort(() => Math.random() - .5)
    //currentQuestionIndex = 0
    //questionContainerElement.classList.removed('hide')
    //setNextQuestion()
//}

//function setNextQuestion() {
    //showQuestion(shuffledQuestions[currentQuestionIndex])
//}

//function showQuestion(questions) {
    //questionElement.innerText = question.question
//}

//function selectAnswer() {


//}

//const questions = [
    //{
        //question:'what is 2+2',
        //answers: [
            //{ text: '4', correct: true },
            //{ text: '4', correct: false }
        //]
    //}
//]
var quizQuestion = document.createElement("h2");
var quizAnswers  = document.createElement("ul");

var timeSpan    = document.querySelector("#seconds-remaining");
var mainContent = document.querySelector(".main-content");
var quizIntro   = document.querySelector(".quiz-intro");

var index    = 0;
var timeLeft = 120;

var timerInterval;
var quizContent;

function checkAnswer(index, buttonID) {    
    var myChoice = questions[index].choices[buttonID];
    var myAnswer = questions[index].answer;

    var feedback   = document.createElement("div");
    var btnElement = document.createElement("button");
    
    if (myChoice === myAnswer) {
        btnElement.setAttribute("class", "btn btn-success btn-block");
        btnElement.textContent = "Correct";
    }
    else {
        btnElement.setAttribute("class", "btn btn-warning btn-block");
        btnElement.textContent = "Incorrect";
        
        if (timeLeft <= 10) {
            timeLeft = 0;
        }
        else {
            timeLeft -= 10;
        }
    }

    feedback.appendChild(btnElement);
    mainContent.appendChild(feedback);

    var removeFeedback = setTimeout(function() {
        mainContent.removeChild(feedback);
    }, 500)
}

function startQuiz() {
    quizContent = document.createElement("div");
    quizQuestion.textContent = questions[index].title;

    quizAnswers.setAttribute("class", "quiz-answers");

    for (i = 0; i < 4; i++) {
        lstElement = document.createElement("li");
        btnElement = document.createElement("button");

        myChoice = questions[index].choices[i];
        myAnswer = questions[index].answer;

        if (myChoice === myAnswer) {
            btnElement.setAttribute("class", "btn btn-primary btn-block");
        } else {
            btnElement.setAttribute("class", "btn btn-danger btn-block");
        }
        
        btnElement.setAttribute("data-id", i);
        btnElement.textContent = questions[index].choices[i];

        lstElement.appendChild(btnElement);
        quizAnswers.appendChild(lstElement);
    }

    quizContent.appendChild(quizQuestion);
    quizContent.appendChild(quizAnswers);
    mainContent.replaceChild(quizContent, quizIntro);

    var buttonArray = quizAnswers.querySelectorAll("button");
    
    quizAnswers.addEventListener("click", function(event) {
        var element = event.target;
        if (element.matches("button")) {
            var buttonID = element.getAttribute("data-id");
            checkAnswer(index, buttonID);
            index++;           
            if (index === questions.length) {
                stopTimer();
                allDone();
                return null;
            }

            quizQuestion.textContent = questions[index].title;

            for (var i = 0; i < 4; i++) {
                myChoice = questions[index].choices[i];
                myAnswer = questions[index].answer;

                buttonArray[i].textContent = myChoice;

                if (myChoice === myAnswer) {
                    buttonArray[i].className = "btn btn-primary btn-block";
                } else {
                    buttonArray[i].className = "btn btn-danger btn-block";
                }
            }
        }
    })
}

// Write out their score to the browser, collect their initials to store the score
function allDone() {
    var divElement = document.createElement("div");
    divElement.setAttribute("class", "quiz-done");    
    
    var h1Element = document.createElement("h1");
    h1Element.textContent = "Your final score is " + timeLeft + ".";

    var formElement = document.createElement("form");
    formElement.setAttribute("class", "quiz-answers");

    var labelElement = document.createElement("label");
    labelElement.textContent = "Enter initials: ";

    var inputElement = document.createElement("input");
    inputElement.setAttribute("type", "text");

    var submitElement = document.createElement("input");
    submitElement.setAttribute("type", "submit");
    submitElement.setAttribute("id", "submit");
    submitElement.setAttribute("class", "btn btn-dark");

    labelElement.appendChild(inputElement);
    formElement.appendChild(labelElement);
    formElement.appendChild(submitElement);

    divElement.appendChild(h1Element);
    divElement.appendChild(formElement);
    mainContent.replaceChild(divElement, quizContent);

    submitElement.addEventListener("click", function(event) {
        event.preventDefault();

        if (inputElement.value === "") {
            alert("Please enter your initials...");
            return null;
        }

        saveScore(inputElement.value, timeLeft);
        window.location = "highscores.html";
    })
}

// Start the clock / timer counting down
function startTimer() {
    timeSpan.textContent = timeLeft;

    timerInterval = setInterval(function() {
        if (timeLeft <= 0) {
            stopTimer();
            allDone();
            return null;
        }
        timeLeft--;
        timeSpan.textContent = timeLeft;
    }, 1000)
}

// That's all folks
function stopTimer() {
    timeSpan.textContent = timeLeft;
    clearInterval(timerInterval);
}

// Event Listener for Button Click for start of quiz
document.querySelector("#btnStart").addEventListener("click", function() {
    startTimer();
    startQuiz();
})
