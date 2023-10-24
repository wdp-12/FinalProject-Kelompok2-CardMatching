let timerInterval;

function startTimer() {
    let timer = 0;
    const timerElement = document.getElementById('timer');

    function updateTimer() {
        const minutes = Math.floor((timer % 3600) / 60);
        const seconds = timer % 60;

        const formattedTime = 
            padZero(minutes) + ':' + padZero(seconds);

        timerElement.textContent = formattedTime;
        timer++;
    }

    timerInterval = setInterval(updateTimer, 1000);
}

function padZero(number) {
    return (number < 10 ? '0' : '') + number;
}

startTimer();