document.addEventListener("DOMContentLoaded", function() {
    let timer; // To store the interval timer
    let isRunning = false; // To track if the stopwatch is running
    let startTime; // To store the start time of the stopwatch
    let elapsedTime = 0; // To store the elapsed time
  
    const display = document.querySelector('.display');
    const startBtn = document.querySelector('.start');
    const pauseBtn = document.querySelector('.pause');
    const resetBtn = document.querySelector('.reset');
    const lapBtn = document.querySelector('.lap');
    const lapsList = document.querySelector('.laps');
  
    function formatTime(time) {
      const pad = num => num.toString().padStart(2, '0');
      const hours = pad(Math.floor(time / 3600));
      const minutes = pad(Math.floor((time % 3600) / 60));
      const seconds = pad(Math.floor(time % 60));
      return `${hours}:${minutes}:${seconds}`;
    }
  
    function updateDisplay() {
      display.textContent = formatTime(elapsedTime);
    }
  
    function startTimer() {
      if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - elapsedTime * 1000; // multiply by 1000 to convert seconds to milliseconds
        timer = setInterval(function() {
          elapsedTime = Math.floor((Date.now() - startTime) / 1000);
          updateDisplay();
        }, 1000);
      }
    }
  
    function pauseTimer() {
      if (isRunning) {
        clearInterval(timer);
        isRunning = false;
      }
    }
  
    function resetTimer() {
      clearInterval(timer);
      isRunning = false;
      elapsedTime = 0;
      updateDisplay();
      lapsList.innerHTML = '';
    }
  
    function lapTime() {
      const lapTime = elapsedTime;
      const lapItem = document.createElement('li');
      lapItem.textContent = formatTime(lapTime);
      lapsList.appendChild(lapItem);
    }
  
    startBtn.addEventListener('click', startTimer);
    pauseBtn.addEventListener('click', pauseTimer);
    resetBtn.addEventListener('click', resetTimer);
    lapBtn.addEventListener('click', lapTime);
  });
  