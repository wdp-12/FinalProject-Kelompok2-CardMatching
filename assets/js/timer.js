let timerInterval;

function startTimer() {
    let countdown = 5;
    let timer = 0;
    const timerElement = document.getElementById('timer');

    function updateTimer() {
        const minutes = Math.floor((timer % 3600) / 60);
        const seconds = timer % 60;

        const formattedTime =
            padZero(minutes) + ':' + padZero(seconds);

        if (countdown > 0) {
            countdown--;
            startPlay = true;
        } else {
            if (startPlay) {
                startPlay = false;
                timer = 0;
            }
            timer++;
        }
        timerElement.textContent = formattedTime;

    }

    timerInterval = setInterval(updateTimer, 1000);
}

function padZero(number) {
    return (number < 10 ? '0' : '') + number;
}

document.getElementById('levelSelect').addEventListener('click', function () {
    startTimer();
});