

function init(end, showDays) {
    // Set initial clock hands position
    setClockHands();
    
    const interval = () => {
        const now = new Date();
        const distance = end - now;
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Update digital countdown
        if (showDays && days > 0) {
            renderNumber("days", days);
            document.getElementById("days-unit").style.display = "flex";
            document.getElementById("days-separator").style.display = "block";
        }
        
        if (hours > 0 || showDays) {
            renderNumber("hours", hours);
            document.getElementById("hours-unit").style.display = "flex";
            document.getElementById("hours-separator").style.display = "block";
        } else {
            document.getElementById("hours-unit").style.display = "none";
            document.getElementById("hours-separator").style.display = "none";
        }
        
        renderNumber("minutes", minutes);
        renderNumber("seconds", seconds);

        // Update analog clock
        updateAnalogClock(hours, minutes, seconds);

        if (distance < 0) {
            clearInterval(intervalId);
            document.getElementById("countdown").style.display = "none";
            document.querySelector(".clock-container").style.display = "none";
            document.getElementById("end").style.display = "block";
            
            // Add confetti effect
            createConfetti();
        }
    }
    
    interval();
    const intervalId = setInterval(interval, 1000);
}

function renderNumber(id, number) {
    const strNum = `${number}`.padStart(2, "0");
    const el = document.getElementById(id);
    if (el) {
        el.innerHTML = strNum;
    }
}

function setClockHands() {
    const now = new Date();
    const hours = now.getHours() % 12;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    
    const hourDeg = (hours * 30) + (minutes * 0.5);
    const minuteDeg = minutes * 6;
    const secondDeg = seconds * 6;
    
    document.querySelector('.hour-hand').style.transform = `translateX(-50%) rotate(${hourDeg}deg)`;
    document.querySelector('.minute-hand').style.transform = `translateX(-50%) rotate(${minuteDeg}deg)`;
    document.querySelector('.second-hand').style.transform = `translateX(-50%) rotate(${secondDeg}deg)`;
}

function updateAnalogClock(hours, minutes, seconds) {
    // Calculate countdown position on clock
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    const totalMinutes = totalSeconds / 60;
    const totalHours = totalMinutes / 60;
    
    // Update hands to show countdown time
    const hourDeg = (totalHours % 12) * 30;
    const minuteDeg = (totalMinutes % 60) * 6;
    const secondDeg = (seconds % 60) * 6;
    
    document.querySelector('.hour-hand').style.transform = `translateX(-50%) rotate(${hourDeg}deg)`;
    document.querySelector('.minute-hand').style.transform = `translateX(-50%) rotate(${minuteDeg}deg)`;
    document.querySelector('.second-hand').style.transform = `translateX(-50%) rotate(${secondDeg}deg)`;
}

function createConfetti() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6ab04c'];
    const confettiCount = 100;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.opacity = Math.random() + 0.5;
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        confetti.style.transition = `all ${Math.random() * 3 + 2}s ease-out`;
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.style.top = '110%';
            confetti.style.transform = `rotate(${Math.random() * 720}deg)`;
            confetti.style.opacity = '0';
        }, 10);
        
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// Add touch feedback for mobile
document.addEventListener('DOMContentLoaded', () => {
    const clock = document.querySelector('.analog-clock');
    if (clock) {
        clock.addEventListener('touchstart', () => {
            clock.style.transform = 'scale(0.95)';
        });
        
        clock.addEventListener('touchend', () => {
            clock.style.transform = 'scale(1)';
        });
    }
});