

function init(end, showDays) {
    const interval = () => {
        const now = new Date();
        const distance = end - now;
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        if (showDays) {
            renderNumber("days", days);
        }
        renderNumber("hours", hours);
        renderNumber("minutes", minutes);
        renderNumber("seconds", seconds);

        if (distance < 0) {
            clearInterval(interval);
            document.getElementById("countdown").style.display = "none";
            document.getElementById("end").style.display = "block";
        }
    }
    interval();
    setInterval(interval, 1000);
}


function renderNumber(id, number) {
    let strNum = `${number}`.padStart(2, "0");
    if (id != "seconds") {
        strNum = strNum + ":"
    }
    const el = document.getElementById(id);
    el.innerHTML = strNum;
}