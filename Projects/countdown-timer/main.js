let timer = document.getElementById("timer");
const datetimeInput = prompt("Enter the target date and time (YYYY-MM-DDTHH:MM:SS)");
    if (datetimeInput) {
        const countDownDate = new Date(datetimeInput).getTime();
    const countdownFunction = setInterval(() => {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    const days = Math.floor(distance/(1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60))/ (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    timer.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    if (distance < 0) {
        clearInterval(countdownFunction);
        timer.innerHTML = "TIME OUT";
    }
}, 1000);
    }
    if (isNaN(countDownDate)) {
        alert("Invalid date format.");
        return;
    }