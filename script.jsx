
// element selectors
var scoreDisplay = document.querySelector("#custom-score");
var timerDisplay = document.querySelector("#custom-timer");
var titleDisplay = document.querySelector("#custom-header");
var startButton = document.querySelector("#start-button");
var scoreButton = document.querySelector("#score-button");
var questionDisplay = document.querySelector("#question-display");
var quizQuestion = document.querySelector("#quiz-question");
var quizCode = document.querySelector("#quiz-code");
var answerOne = document.querySelector("#answer1");
var answerTwo = document.querySelector("#answer2");
var answerThree = document.querySelector("#answer3");
var answerFour = document.querySelector("#answer4");
var gameOverDisplay = document.querySelector("#game-over");
var gameOverOverlay = document.querySelector("#overlay-background");
var gameOverScore = document.querySelector("#game-over-score");
var gameOverSplash = document.querySelector("#game-over-splash");
var userNameForm = document.querySelector("#name-form");
var userName = document.querySelector("#userName");
var HighScoreList = document.querySelector("#score-list");
var dynamicList = document.querySelector("#dynamic-list");
var submitBtn = document.querySelector("#submit-btn");
var letsGoAgain = document.querySelector("#go-again");
var clearHighScores = document.querySelector("#clear-scores");
var retakeQuiz = document.querySelector("#retake-quiz");
var footer = document.querySelector("#footer");

var timerInterval; // make interval global
var currentTime = 300; //  start with a minute on the clock
var score = 0; // score start
var currentQuestion = 0; // keep adding to it to access others in the quiz Index
var questionTimeLeft = 20;
var multiplicadorDePontos = 20;
var scoreList = []; // empty score list

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

var tagsToReplace = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
};

function replaceTag(tag) {
    return tagsToReplace[tag] || tag;
}

function safe_tags_replace(str) {
    return str.replace(/[&<>]/g, replaceTag);
}

var quizQuestionsArray = [
    {
        question: "O que acontece quando o computador executa este trecho de código?",
        answers: [
            "O computador salvará na memória o texto 'Olá, mundo!'",
            "O computador salvará no disco rígido o texto 'Olá, mundo!'",
            "O computador mostrará na tela o texto 'Olá, mundo!'.",
            "Nada acontecerá"
        ],
        optrue: "O computador mostrará na tela o texto 'Olá, mundo!'.",
        code: "print('Olá, mundo!')",
    },
    {
        question: "O que faz a função 'soma' e qual será o resultado da execução do trecho de código?",
        answers: [
            "Soma dois números, e o resultado será 10",
            "Soma dois números, e o resultado será 8",
            "Soma dois números, e o resultado será 9",
            "Soma dois números, e o resultado será 11"
        ],
        optrue: "Soma dois números, e o resultado será 8",
        code: "a = 5 <br> b = 3 <br> funcao soma(a, b) <br> &nbsp; retorne a+b",
    },
    {
        question: "Qual será a saída desse código?",
        answers: [
            "pessoa + ' gosta de '+ fruta",
            "Ambrósio gosta de laranja",
            "Ambrósio gosta de fruta",
            "pessoa gosta de laranja"
        ],
        optrue: "Ambrósio gosta de laranja",
        code: "pessoa = 'Ambrósio' <br> fruta = 'laranja' <br> mensagem = pessoa + ' gosta de '+ fruta <br> print(mensagem)",
    },
    {
        question: "Qual será o valor lógico das variáveis D e E?",
        answers: [
            "D Verdadeiro, E Falso",
            "D Verdadeiro, E Verdadeiro",
            "D Falso, E Verdadeiro",
            "D Falso, E Falso"
        ],
        optrue: "D Verdadeiro, E Verdadeiro",
        code: "A = Verdadeiro <br> B = Falso <br> C = Verdadeiro  <br> D = ((A ou B) e C) <br> E = (A e C)",
    },
    {
        question: "Qual será o valor da variável após a execução deste algoritmo?",
        answers: [
            "10",
            "9",
            "11",
            "Nenhuma das alternativas"
        ],
        optrue: "10",
        code: "variavel = 0 <br> (Enquanto variavel < 10) faça <br> &nbsp; variavel = variavel + 1",
    },
    {
        question: "Qual é o valor da variável f?",
        answers: [
            "9",
            "7",
            "2",
            "10"
        ],
        optrue: "10",
        code: "c = 7 <br> d = 2 <br> e = 10 <br> f = c + d <br> d = e <br> f = d",
    },
    {
        question: "Qual o tipo de variável mais adequada para armazenar o valor 'c':",
        answers: [
            "Variável do tipo carácter/string",
            "Variável do tipo número inteiro",
            "Variável do tipo número decimal (float)",
            "Variável do tipo número decimal de dupla precisão (double)"
        ],
        optrue: "Variável do tipo carácter/string",
        code: "",
    },
    {
        question: "Qual algoritmo de ordenação tem maior eficiência de tempo?",
        answers: [
            "Bubble Sort",
            "Quick Sort",
            "Selection Sort",
            "Insertion Sort"
        ],
        optrue: "Quick Sort",
        code: "",
    },
    {
        question: "Qual algoritmo de ordenação tem maior eficiência de espaço?",
        answers: [
            "Heap Sort",
            "Quick Sort",
            "Merge Sort",
            "Count Sort"
        ],
        optrue: "Heap Sort",
        code: "",
    },
    {
        question: "Qual dos algoritmos abaixo tem complexidade de tempo de execução linear?",
        answers: [
            "a",
            "b",
            "c",
            "Nenhuma das alternativas"
        ],
        optrue: "b",
        code:
            "Alternativa a<br>" +
            "i = 1 <br>" +
            "j = 1 <br>" +
            "enquanto (i < 10) <br>" +
            "&nbsp; enquanto (j < 10) <br>" +
            "&nbsp; &nbsp; print('Olá, mundo!')<br>" +
            "&nbsp; &nbsp; j = j+1 <br>" +
            "&nbsp; i = i+1<br>" +
            "________________________<br>" +
            "Alternativa b<br>" +
            "i = 1 <br>" +
            "enquanto (i < 10)<br>" +
            "&nbsp; i = i+1 <br>" +
            "________________________<br>" +
            "Alternativa c<br>" +
            "i = 1 <br>" +
            "j = 1 <br>" +
            "enquanto (i < 10)<br>" +
            "&nbsp; enquanto (j < 10)<br>" +
            "&nbsp; &nbsp; print('Olá, mundo!')<br>" +
            "&nbsp; &nbsp; j = j+1 <br>" +
            "&nbsp; i = i+1 <br>" +
            "<br>" +
            "i = 1<br>" +
            "enquanto (i < 10)<br>" +
            "&nbsp; i = i+1"
    }
];

// quizQuestionsArray = shuffle(quizQuestionsArray);

// setting display visibility
if (scoreDisplay) { scoreDisplay.hidden = true; } //  hide score, timer, and q&a areas
if (timerDisplay) { timerDisplay.hidden = true; }
if (questionDisplay) { questionDisplay.hidden = true; }
if (gameOverDisplay) { gameOverDisplay.hidden = true; } // hide all end screens
if (gameOverOverlay) { gameOverOverlay.hidden = true; }
if (HighScoreList) { HighScoreList.hidden = true; }
if (letsGoAgain) { letsGoAgain.hidden = true; }

// begin script
init();

// retrieves list of previous scores in local storage
function init() {
    // need to parse array of user score objects

    var storedScoreList = [];
    if (localStorage.getItem("scoresList") !== null) {
        storedScoreList = JSON.parse(atob(localStorage.getItem("scoresList").replaceAll("GGG", "F")));
    }

    // assign the parsed array to scoreList array to render later
    if (storedScoreList !== null) {
        scoreList = storedScoreList;
    }

    // prepare the score list to show later
    renderScoreList();
    // we are at start of the quiz
    currentQuestion = 0;
}


function showScore(event) {
    event.preventDefault();
    HighScoreList.hidden = false;
    footer.hidden = true;
    titleDisplay.hidden = true;
    startButton.hidden = true;
    scoreButton.hidden = true;
    gameOverOverlay.hidden = false;
    gameOverDisplay.hidden = false;
    userNameForm.hidden = true;
    gameOverSplash.hidden = true;
    letsGoAgain.hidden = false;
    clearHighScores.hidden = false;
    renderScoreList();
}

// start or restarting quiz; reset all visible sections and variables
function startQuiz(event) {
    event.preventDefault();
    footer.hidden = true;
    gameOverSplash.hidden = true;
    titleDisplay.hidden = true;
    startButton.hidden = true;
    scoreButton.hidden = true;
    score = 0; // reset score
    currentTime = 300; //reset clock
    currentQuestion = 0; // reset to start of quiz
    questionDisplay.hidden = false; // show Q&A
    // display score and timer
    scoreDisplay.textContent = "Pontuação: 00" + score;
    scoreDisplay.hidden = false;
    timerDisplay.textContent = "Tempo: " + currentTime;
    timerDisplay.hidden = false; // could be put in function instead

    // initialize countdown timer
    setTime();
    // render Q&A
    renderQuestion();
}

// this function taken from class activities
// begins the countdown
function setTime() {
    timerInterval = setInterval(function () {
        questionTimeLeft--;
        console.log(questionTimeLeft);
        console.log(multiplicadorDePontos);

        if (questionTimeLeft <= 5) {
            multiplicadorDePontos = 5;
        }
        if (questionTimeLeft <= 2) {
            questionTimeLeft = 1;
        }

        currentTime--;
        timerDisplay.textContent = "Tempo: " + currentTime;

        // Time is up, game over
        if (currentTime <= 0) {
            clearInterval(timerInterval);
            questionTimeLeft = 20;
            multiplicadorDePontos = 20;
            gameOver();
        }
        // if you have less than 10 secs left
        // display a red shadow around the timer
        if (currentTime <= 10) {
            timerDisplay.setAttribute("style", "box-shadow: 0px 5px 2px red");
        }
    }, 1000);
}

// populates the question and answer fields
function renderQuestion() {
    // did we run out of questions? if so, game over.
    if (currentQuestion >= quizQuestionsArray.length) {
        gameOver();
        return;
    }
    // reset all of the stylings from right/wrong answers and displays
    answerOne.removeAttribute("style");
    answerTwo.removeAttribute("style");
    answerThree.removeAttribute("style");
    answerFour.removeAttribute("style");
    scoreDisplay.removeAttribute("style");
    timerDisplay.removeAttribute("style");

    //reset to default 4 choices
    answerOne.hidden = false;
    answerTwo.hidden = false;
    answerThree.hidden = false;
    answerFour.hidden = false;
    // perhaps will implement true of false questions
    if (quizQuestionsArray[currentQuestion].answers.length < 4) {
        //true of false question
        answerThree.hidden = true;
        answerFour.hidden = true;
    }

    //   populate next question and its answer choices
    quizQuestion.textContent = quizQuestionsArray[currentQuestion].question;
    quizCode.innerHTML = quizQuestionsArray[currentQuestion].code;

    // go print list of answers for however many answers there are
    // only <p> elements are the possible answer choices
    var listOfAnswers = document.querySelectorAll("p");
    for (var i = 0; i < quizQuestionsArray[currentQuestion].answers.length; i++) {
        listOfAnswers[i].textContent =
            quizQuestionsArray[currentQuestion].answers[i];
    }
}

// this function checks for right or wrong responses
function verifyResponse(event) {
    event.preventDefault();
    // grab this element being clicked
    var thisAnswer = event.target;
    // this variable holds the return value of setTimeout()
    var timeOutId = 0;

    if (
        // correct choice!
        thisAnswer.textContent === quizQuestionsArray[currentQuestion].optrue
    ) {
        // se acertar em menos de 3 segundos então obterá menos pontuação
        if (questionTimeLeft > 17) {
            multiplicadorDePontos = 1;
        }

        // disabled double click
        thisAnswer.setAttribute(
            // change style to green to indicate correct choice
            "style",
            "background-color: rgb(104, 226, 56); color: white; box-shadow: 0px 5px 2px rgb(104, 226, 56);pointer-events:none"
        );
        score = score + questionTimeLeft * multiplicadorDePontos; // get 377 points
        currentQuestion++; // go to next question index
        // update score, flash green
        scoreDisplay.textContent = "Pontuação: " + score;
        scoreDisplay.setAttribute(
            "style",
            "box-shadow: 0px 5px 3px rgb(104, 226, 56)"
        );
        // this function sets a delay, so we can see if you got it right or wrong
        // then render the next question after the short delay
        timeOutId = window.setTimeout(renderQuestion, 600);
    } else {
        // wrong choice!
        //  disabled double click
        thisAnswer.setAttribute(
            // style this answer with red to indicate incorrect response
            "style",
            "background-color: red; color: white; box-shadow: 0px 5px 2px red;pointer-events:none"
        );
        // flash timer display with yellow to indicated penalty
        timerDisplay.setAttribute("style", "box-shadow: 0px 5px 3px yellow");
        currentTime = currentTime - 14; // penalty, you got it wrong!
        currentQuestion++; // next question
        // delay to show the color indication right or wrong
        timeOutId = window.setTimeout(renderQuestion, 600);
    }

    // reseta multiplicador e tempo restante apos resposta recebida
    multiplicadorDePontos = 20;
    questionTimeLeft = 20;
}

// this function is called when
// A. time is up, or B. we ran out of questions
function gameOver() {
    gameOverOverlay.hidden = false; // display overlay and game over screen
    gameOverDisplay.hidden = false;
    gameOverSplash.hidden = false; // prompt user name
    userNameForm.hidden = false; // display scores and buttons
    clearHighScores.hidden = true;
    retakeQuiz.hidden = false;
    letsGoAgain.hidden = false;
    HighScoreList.hidden = false;
    answerOne.hidden = true;
    answerTwo.hidden = true;
    answerThree.hidden = true;
    answerFour.hidden = true;

    clearInterval(timerInterval); // freeze time
    // display final score
    gameOverScore.textContent = "FIM do desafio! Você conseguiu " + score + " pontos!";
}

// this function is called to store a new entry
function storeScores() {
    localStorage.setItem("scoresList", btoa(JSON.stringify(scoreList)).replace("F", "GGG"));
}

// this function renders the score list
function renderScoreList() {
    // first clear everything
    if (dynamicList)
        dynamicList.innerHTML = "";
    if (scoreList) {
        // ordenando por pontuação mais alta
        scoreList.sort(function (a, b) {
            if (a.highScore > b.highScore) {
                return -1
            }

            if (a.highScore === b.highScore) {
                return 0
            }

            if (a.highScore < b.highScore) {
                return 1
            }
        });
    }


    if (scoreList) {
        // loop through the stored scores and print them onto li elements
        for (var i = 0; i < scoreList.length; i++) {
            var storedScores = scoreList[i];
            var tr = document.createElement("tr");

            var td = document.createElement("td");
            td.textContent = i + 1;
            tr.appendChild(td);

            var td = document.createElement("td");
            td.textContent = scoreList[i].name
            tr.appendChild(td);

            var td = document.createElement("td");
            tr.appendChild(td);
            var span = document.createElement("span");
            span.textContent = scoreList[i].highScore;
            td.appendChild(span);

            dynamicList.appendChild(tr);
        }
    }
}


// double submit capability
// with enter or clicking submit button
function submitScores(event) {
    event.preventDefault();
    // grab user input name
    var user = userName.value.trim();
    // clear the input field
    userName.value = "";
    // if empty string, don't submit
    if (user === "") {
        return;
    }

    user = user.toLowerCase();

    const arr = user.split(" ");
    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);

    }
    user = arr.join(" ");

    // create a new object containing user and score pair
    var userScore = {
        name: user,
        highScore: score,
    };

    let user_added = true;
    for (var i = 0; i < scoreList.length; i++) {
        if (scoreList[i].name === user) {
            alert("O seu nome já está na lista!");
            user_added = false;
            break;
        }
    }

    if (user_added) {
        // push new user-score pair into score list array
        scoreList.push(userScore);
        // now store, then display score list
        storeScores();
        userNameForm.hidden = true;
        gameOverSplash.hidden = true;
        HighScoreList.hidden = false;
        letsGoAgain.hidden = false;
        renderScoreList();
    }

}
// this function erases local storage, score list,
// and clears global array variable
function clearScores(event) {
    // need to clear local storage too
    event.preventDefault();

    let pw = prompt("Digite a senha para zerar o placar: ");

    if (pw === "inovacaoal") {
        dynamicList.innerHTML = "";
        localStorage.clear();
        scoreList = [];
    } else {
        if (!!pw)
            alert("Senha invalida!")
    }

}

// event listeners for buttons and submit
if (startButton)
    startButton.addEventListener("mouseup", startQuiz);
if (scoreButton)
    scoreButton.addEventListener("mouseup", showScore);
if (answerOne)
    answerOne.addEventListener("click", verifyResponse);
if (answerTwo)
    answerTwo.addEventListener("click", verifyResponse);
if (answerThree)
    answerThree.addEventListener("click", verifyResponse);
if (answerFour)
    answerFour.addEventListener("click", verifyResponse);
if (submitBtn)
    submitBtn.addEventListener("click", submitScores);
if (userNameForm)
    userNameForm.addEventListener("submit", submitScores);
if (clearHighScores)
    clearHighScores.addEventListener("mouseup", clearScores);
// retake the quiz, go to start of application
if (retakeQuiz) {
    retakeQuiz.addEventListener("mouseup", function (event) {
        event.preventDefault();
        gameOverDisplay.hidden = true;
        gameOverOverlay.hidden = true;
        questionDisplay.hidden = true;
        scoreDisplay.hidden = true;
        timerDisplay.hidden = true;
        footer.hidden = false;
        titleDisplay.hidden = false;
        startButton.hidden = false;
        scoreButton.hidden = false;

        // reseta multiplicador e tempo restante apos clicar em voltar
        questionTimeLeft = 20;
        multiplicadorDePontos = 20;
    });
}