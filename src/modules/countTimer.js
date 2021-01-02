const countTimer = deadline => {
    const timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds');

    function getTimeRemaining() {
        const dateStop = new Date(deadline).getTime(),
            dateNow = new Date().getTime(),
            timeRemaining = (dateStop - dateNow) / 1000,
            seconds = Math.floor(timeRemaining % 60),
            minutes = Math.floor((timeRemaining / 60) % 60),
            hours = Math.floor(timeRemaining / 60 / 60);
        return { timeRemaining, hours, minutes, seconds };
    }

    function numberModification(number) {
        if (number  < 10) {
            return '0' + number;
        } else {
            return number;
        }
    }

    function updateClock() {
        const timer = getTimeRemaining(deadline);

        if (timer.seconds >= 0) {
            timerHours.textContent = numberModification(timer.hours);
            timerMinutes.textContent = numberModification(timer.minutes);
            timerSeconds.textContent = numberModification(timer.seconds);
        } else {
            timerHours.textContent = '00';
            timerMinutes.textContent = '00';
            timerSeconds.textContent = '00';
        }
    }
    updateClock();
    setInterval(updateClock, 1000);
};

export default countTimer;