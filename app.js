let startTime;
let running = false;
let elapsedTime = 0;
const recordedTimes = [];

const display = document.getElementById("display");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");
const recordedTimesList = document.getElementById("recorded-times");
const saveButton = document.getElementById("save");

function formatTime(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(2);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function updateDisplay() {
  display.textContent = formatTime(elapsedTime);
}

function startTimer() {
  if (!running) {
    startTime = Date.now() - elapsedTime;
    running = true;
    startButton.textContent = "Pause";
    startButton.classList.remove("btn-success");
    startButton.classList.add("btn-secondary");
    update();
  } else {
    running = false;
    startButton.textContent = "Resume";
    startButton.classList.remove("btn-secondary");
    startButton.classList.add("btn-success");
  }
}

function stopTimer() {
  if (running) {
    running = false;
    startButton.textContent = "Resume";
    startButton.classList.remove("btn-secondary");
    startButton.classList.add("btn-success");
  }
}

function resetTimer() {
  elapsedTime = 0;
  updateDisplay();
  recordedTimes.length = 0; // Clear the recorded times array
  recordedTimesList.innerHTML = ""; // Clear the recorded times list
}

function recordTime() {
  recordedTimes.push(formatTime(elapsedTime));
  const li = document.createElement("li");
  li.textContent = `Recorded: ${recordedTimes[recordedTimes.length - 1]}`;
  li.classList.add("list-group-item");
  recordedTimesList.appendChild(li);
}

function update() {
  if (running) {
    elapsedTime = Date.now() - startTime;
    updateDisplay();
  }
  requestAnimationFrame(update);
}

startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", resetTimer);
saveButton.addEventListener("click", recordTime);
