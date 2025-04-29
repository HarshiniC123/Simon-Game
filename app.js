let gameSeq = [];
let userSeq = [];
let started = false;
let level = 0;
let highScore = 0;

let btns = document.querySelectorAll(".btn");
let h3 = document.querySelector("h3");
let h2 = document.querySelector("h2");

let colors = ["red", "blue", "green", "yellow"]

btns.forEach((btn) => {
    btn.addEventListener("click", () => {
        if (!started) {
            setTimeout(startGame, 500);
        } });
});

function startGame() {
    started = true;
    level = 0;
    gameSeq = [];
    userSeq = [];
    h3.innerText = "Level 1";
    nextSequence();
}

function nextSequence() {
    userSeq = [];
    level++;
    h3.innerText = `Level ${level}`;
    let randomColor = colors[Math.floor(Math.random() * 4)];
    gameSeq.push(randomColor);
   
    setTimeout(() => {
        let btn = document.querySelector(`.${randomColor}`);
        flashButton(btn);
    }, 500);
}
btns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
        if (!started) return;
        
        let userColor = event.target.classList[1];
        userSeq.push(userColor);
        
        
        flashButton(event.target);
        
        checkAnswer(userSeq.length - 1);
    });
});
function checkAnswer(index) {
    if (userSeq[index] === gameSeq[index]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(nextSequence, 1000);
        }
    } else {
        gameOver();
    }
}

function gameOver() {
    if (level > highScore) {
        highScore = level - 1;
    }
    h2.innerHTML = `High Score: ${highScore}`;
    h3.innerHTML = "Game Over! Click any button to restart.";
    document.body.style.backgroundColor = "red";
    setTimeout(() => {
        document.body.style.backgroundColor = "white";
    }, 500);
    setTimeout(() => {
        started = false;
    }, 600);
}

function flashButton(btn) {
    btn.style.boxShadow = `0px 0px 40px white, 0px 0px 60px ${btn.classList[1]}`;
    setTimeout(() => {
        btn.style.boxShadow = "none";
    }, 300);
}
