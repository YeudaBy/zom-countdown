

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


// --------------- Analog Clock -----------------
function initAnalogClock() {
    const hourHand = document.getElementById("hour-hand");
    const minuteHand = document.getElementById("minute-hand");
    const secondHand = document.getElementById("second-hand");

    if (!hourHand || !minuteHand || !secondHand) {
        return; // the markup is missing
    }

    const update = () => {
        const now = new Date();
        const seconds = now.getSeconds();
        const minutes = now.getMinutes();
        const hours = now.getHours();

        const secondDeg = seconds * 6; // 360/60
        const minuteDeg = minutes * 6 + seconds * 0.1; // add 0.1 deg per sec
        const hourDeg = (hours % 12) * 30 + minutes * 0.5; // 360/12 + minute adjust

        secondHand.style.transform = `translate(-50%, -100%) rotate(${secondDeg}deg)`;
        minuteHand.style.transform = `translate(-50%, -100%) rotate(${minuteDeg}deg)`;
        hourHand.style.transform = `translate(-50%, -100%) rotate(${hourDeg}deg)`;
    }

    update();
    setInterval(update, 1000);
}


// --------------- Background Cycle -----------------
function startBackgroundCycle() {
    const images = [
        "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1080&q=80", // steak
        "https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?auto=format&fit=crop&w=1080&q=80" // ice cream
    ];
    let index = 0;

    const change = () => {
        document.body.style.backgroundImage = `linear-gradient(rgba(255,255,255,0.6), rgba(255,255,255,0.6)), url('${images[index]}')`;
        index = (index + 1) % images.length;
    }

    change();
    setInterval(change, 15000); // change every 15 seconds
}