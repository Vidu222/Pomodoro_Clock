// ----------------------
// Pomodoro Timer Script
// ----------------------

let pomodoroTime = 25 * 60;
let shortBreakTime = 5 * 60;
let longBreakTime = 15 * 60;

let currentTime = pomodoroTime;
let timerInterval = null;
let pomodoroCount = 0;

// DOM elements
const pomodoroBtn = document.getElementById("pomodorobtn");
const shortBreakBtn = document.getElementById("shortbreakbtn");
const longBreakBtn = document.getElementById("longbreakbtn");

const startBtn = document.getElementById("startbtn");
const pauseBtn = document.getElementById("pausebtn");
const resetBtn = document.getElementById("resetbtn");

const progressNumber = document.querySelector(".progressbar-number");
const pomodoroCountDisplay = document.querySelector(".pomodoro-count");

// ----------------------
// Helper Functions
// ----------------------

function updateDisplay() {
    let minutes = Math.floor(currentTime / 60);
    let seconds = currentTime % 60;
    progressNumber.textContent = 
        `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function clearActiveButtons() {
    pomodoroBtn.classList.remove("active");
    shortBreakBtn.classList.remove("active");
    longBreakBtn.classList.remove("active");
}

function startTimer() {
    if (timerInterval) return; // prevent multiple intervals

    timerInterval = setInterval(() => {
        currentTime--;
        updateDisplay();

        if (currentTime <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;

            // Count completed pomodoros
            if (pomodoroBtn.classList.contains("active")) {
                pomodoroCount++;
                pomodoroCountDisplay.textContent = `Completed Pomodoros: ${pomodoroCount}`;
            }
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function resetTimer() {
    pauseTimer();

    if (pomodoroBtn.classList.contains("active")) currentTime = pomodoroTime;
    if (shortBreakBtn.classList.contains("active")) currentTime = shortBreakTime;
    if (longBreakBtn.classList.contains("active")) currentTime = longBreakTime;

    updateDisplay();
}

// ----------------------
// Mode Buttons
// ----------------------

pomodoroBtn.addEventListener("click", () => {
    clearActiveButtons();
    pomodoroBtn.classList.add("active");
    currentTime = pomodoroTime;
    resetTimer();
});

shortBreakBtn.addEventListener("click", () => {
    clearActiveButtons();
    shortBreakBtn.classList.add("active");
    currentTime = shortBreakTime;
    resetTimer();
});

longBreakBtn.addEventListener("click", () => {
    clearActiveButtons();
    longBreakBtn.classList.add("active");
    currentTime = longBreakTime;
    resetTimer();
});

// ----------------------
// Control Buttons
// ----------------------

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

// Initialize display
updateDisplay();
