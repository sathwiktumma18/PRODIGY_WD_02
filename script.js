let startTime;
let updatedTime;
let difference;
let timerInterval;
let running = false;
let lapCount = 0;

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const laps = document.getElementById('laps');

function startTimer() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        timerInterval = setInterval(updateTime, 1000 / 60);
        running = true;
    }
}

function pauseTimer() {
    if (running) {
        clearInterval(timerInterval);
        running = false;
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    running = false;
    difference = 0;
    lapCount = 0;
    display.innerHTML = '00:00:00';
    laps.innerHTML = '';
}

function lapTimer() {
    if (running) {
        const lapTime = formatTime(difference);
        const lapElement = document.createElement('li');
        lapElement.innerText = `Lap ${++lapCount}: ${lapTime}`;
        laps.appendChild(lapElement);
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    display.innerHTML = formatTime(difference);
}

function formatTime(time) {
    const date = new Date(time);
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());
    const milliseconds = pad(Math.floor(date.getMilliseconds() / 10), 2);
    return `${minutes}:${seconds}:${milliseconds}`;
}

function pad(number, digits = 2) {
    return String(number).padStart(digits, '0');
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', lapTimer);
