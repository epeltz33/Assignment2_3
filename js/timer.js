
/*
I chose setInterval() over setTimeout() for a few reasons:
1. setInterval() is designed to run a function repeatedly, with a fixed time delay between each call,
which suits the timer use case well.
2. setInterval() is more accurate for repeated calls at a fixed interval, as setTimeout() can drift over time.
3. setInterval() is easier to use for this purpose, as it doesn't require manually setting up the next timeout
after each call.

 */



const canvas = document.getElementById('timerCanvas'); // Get the canvas element
const ctx = canvas.getContext('2d');
let startTime;
let elapsedTime = 0;
let timerInterval; // Interval ID for the timer update

function drawTimer(time) {
    // Clear the canvas before drawing the new time string
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Calculate hours, minutes, seconds, and milliseconds
    const hours = Math.floor(time / 3600000); // 3600000ms = 1 hour
    const minutes = Math.floor((time % 3600000) / 60000); // 60000ms = 1 minute so 1 hour /
    const seconds = Math.floor((time % 60000) / 1000); // 1000ms = 1 second
    const milliseconds = time % 1000; // Remaining milliseconds

    // Format the time string as HH:MM:SS.mmm (padNumber is a helper function)
    const timeString = `${padNumber(hours)}:${padNumber(minutes)}:${padNumber(seconds)}.${padNumber(milliseconds, 3)}`;

    // Draw the time string in the center of the canvas
    ctx.fillStyle = 'white';
    ctx.font = '48px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(timeString, canvas.width / 2, canvas.height / 2);
}

function padNumber(num, length = 2) { // Pad the number with zeros to the specified length (default is 2)
    return num.toString().padStart(length, '0');
}

function startTimer() {
    if (!timerInterval) { // if timerInterval is not set (null) then start the timer
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTimer, 10); // Update every 10ms for smoother display
    }
}

function stopTimer() {
    if (timerInterval) {  // if timerInterval is set then stop
        clearInterval(timerInterval);
        timerInterval = null; // Reset the timer interval ID
    }
}

function resetTimer() {
    stopTimer();
    elapsedTime = 0;
    drawTimer(0); // Reset the timer display
}

function updateTimer() {
    elapsedTime = Date.now() - startTime; // Calculate the time elapsed since the start time
    drawTimer(elapsedTime);
}

// Event listeners for buttons to start, stop, and reset the timer
document.getElementById('startBtn').addEventListener('click', startTimer);
document.getElementById('stopBtn').addEventListener('click', stopTimer);
document.getElementById('resetBtn').addEventListener('click', resetTimer);

// Initial display of the timer
drawTimer(0);