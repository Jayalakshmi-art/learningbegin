let timer;
let seconds = 0, minutes = 0, hours = 0;
let running = false;

function format(num) {
  return num < 10 ? "0" + num : num;
}

function updateDisplay() {
  document.getElementById("display").textContent =
    `${format(hours)}:${format(minutes)}:${format(seconds)}`;
}

function start() {
  if (running) return;
  running = true;
  timer = setInterval(() => {
    seconds++;
    if (seconds === 60) {
      seconds = 0;
      minutes++;
      if (minutes === 60) {
        minutes = 0;
        hours++;
      }
    }
    updateDisplay();
  }, 1000);
}

function pause() {
  clearInterval(timer);
  running = false;
}

function reset() {
  pause();
  seconds = minutes = hours = 0;
  updateDisplay();
  document.getElementById("laps").innerHTML = "";
}

function lap() {
  if (!running) return;
  const lapTime = `${format(hours)}:${format(minutes)}:${format(seconds)}`;
  const lapItem = document.createElement("li");
  lapItem.textContent = `Lap: ${lapTime}`;
  document.getElementById("laps").appendChild(lapItem);
}
