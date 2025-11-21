// ---------------- Pomodoro ----------------
let timerDuration = 25 * 60; // default 25 minutes
let timeLeft = timerDuration;
let timerInterval = null;
let sessionsCompleted = parseInt(localStorage.getItem('pomodoroSessions')) || 0;

const timerDisplay = document.getElementById('timerDisplay');
const timerProgress = document.getElementById('timerProgress');
const sessionCount = document.getElementById('sessionCount');

function updateDisplay() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  timerProgress.value = timerDuration - timeLeft; // progress bar moves forward
}

function startTimer() {
  if (timerInterval) return;
  timerInterval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateDisplay();
    } else {
      clearInterval(timerInterval);
      timerInterval = null;
      sessionsCompleted++;
      localStorage.setItem('pomodoroSessions', sessionsCompleted);
      sessionCount.textContent = `Sessions completed: ${sessionsCompleted}`;
      alert("Pomodoro session complete!");
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  timerDuration = 25 * 60;
  timeLeft = timerDuration;
  timerProgress.max = timerDuration;
  timerProgress.value = 0;
  updateDisplay();
}

function shortBreak() {
  clearInterval(timerInterval);
  timerInterval = null;
  timerDuration = 5 * 60;
  timeLeft = timerDuration;
  timerProgress.max = timerDuration;
  timerProgress.value = 0;
  updateDisplay();
}

function longBreak() {
  clearInterval(timerInterval);
  timerInterval = null;
  timerDuration = 15 * 60;
  timeLeft = timerDuration;
  timerProgress.max = timerDuration;
  timerProgress.value = 0;
  updateDisplay();
}

// Event listeners (matching HTML IDs)
document.getElementById('startTimer').addEventListener('click', startTimer);
document.getElementById('pauseTimer').addEventListener('click', pauseTimer);
document.getElementById('resetTimer').addEventListener('click', resetTimer);
document.getElementById('shortBreak').addEventListener('click', shortBreak);
document.getElementById('longBreak').addEventListener('click', longBreak);

// Init
updateDisplay();
sessionCount.textContent = `Sessions completed: ${sessionsCompleted}`;