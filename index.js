

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
        } else {
            // Hide days unit if not needed
            const daysUnit = document.getElementById("days").parentElement;
            daysUnit.style.display = "none";
        }
        
        renderNumber("hours", hours);
        renderNumber("minutes", minutes);
        renderNumber("seconds", seconds);

        if (distance < 0) {
            clearInterval(intervalId);
            document.getElementById("countdown").style.display = "none";
            document.getElementById("end").style.display = "flex";
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
        
        // Add a pulse effect when the number changes
        const parent = el.parentElement;
        parent.classList.remove('pulse');
        // Force reflow
        parent.offsetHeight;
        parent.classList.add('pulse');
    }
}

// Add some additional mobile-friendly features
document.addEventListener('DOMContentLoaded', function() {
    // Prevent zoom on double tap for mobile
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function (event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    // Add swipe gesture support (optional enhancement)
    let startX = 0;
    let startY = 0;
    
    document.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchmove', function(e) {
        if (!startX || !startY) return;
        
        const diffX = startX - e.touches[0].clientX;
        const diffY = startY - e.touches[0].clientY;
        
        if (Math.abs(diffX) > Math.abs(diffY)) {
            if (diffX > 0) {
                // Swipe left - could add functionality here
            } else {
                // Swipe right - could add functionality here
            }
        }
        
        startX = 0;
        startY = 0;
    });
    
    // Add visual feedback for touch interactions
    const timeUnits = document.querySelectorAll('.time-unit');
    timeUnits.forEach(unit => {
        unit.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        unit.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

// Add a function to handle different screen orientations
function handleOrientationChange() {
    const isPortrait = window.innerHeight > window.innerWidth;
    const countdown = document.getElementById('countdown');
    
    if (isPortrait) {
        countdown.style.flexDirection = 'column';
        countdown.style.gap = '10px';
    } else {
        countdown.style.flexDirection = 'row';
        countdown.style.gap = '15px';
    }
}

// Listen for orientation changes
window.addEventListener('orientationchange', handleOrientationChange);
window.addEventListener('resize', handleOrientationChange);

// Initialize orientation handling
handleOrientationChange();