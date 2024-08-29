function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function generate() {
    const container = document.querySelector(".container");
    const numStar = Math.floor(window.innerWidth / 2);

    // Clear previous stars
    container.querySelectorAll('.star').forEach(star => star.remove());

    for (let i = 0; i < numStar; i++) {
        const size = getRandomInt(1, 4);
        const color = getRandomInt(100, 255);
        const blueOrYellow = Math.random() < 0.5;
        const domStar = document.createElement("div");
        
        domStar.classList.add("star");
        container.appendChild(domStar);
        
        domStar.style.left = `${getRandomInt(0, window.innerWidth)}px`;
        domStar.style.bottom = `${getRandomInt(0, window.innerHeight)}px`;
        domStar.style.width = `${size}px`;
        domStar.style.height = `${size}px`;
        domStar.style.background = `rgb(${!blueOrYellow ? color : "255"},255,${blueOrYellow ? color : "255"})`;
        domStar.style.boxShadow = `${getRandomInt(0, 5)}px ${getRandomInt(0, 5)}px ${size * 5}px rgb(${!blueOrYellow ? color : "255"},255,${blueOrYellow ? color : "255"})`;
        domStar.style.filter = `blur(${getRandomInt(0, 1)}px)`;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    generate();
    setInterval(() => {
        const generateStars = document.querySelectorAll(".star");
        if (generateStars.length > 0) {
            const randomStar = getRandomInt(0, generateStars.length - 1);
            setTimeout(() => {
                generateStars[randomStar].style.opacity = `${Math.random()}`;
                setTimeout(() => {
                    generateStars[randomStar].style.opacity = '1';
                }, getRandomInt(20, 1000));
            }, getRandomInt(50, 1000));
        }
    }, 10);
});

window.addEventListener("resize", generate);
