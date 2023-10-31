const levelSelect = document.getElementById('levelSelect');
levelSelect.addEventListener('change', () => {
    const selectedLevel = levelSelect.value;
    window.location.href = `game.html?level=${selectedLevel}`;
});

const soundToggle = document.getElementById("soundToggle");
const gameAudio = document.getElementById("gameAudio");

let isMuted = true;

soundToggle.addEventListener("click", toggleSound);

function toggleSound() {
    if (isMuted) {
        gameAudio.play();
        soundToggle.className = "fas fa-sharp fa-regular fa-volume-high fa-2x";
    } else {
        gameAudio.pause();
        soundToggle.className = "fas fa-solid fa-volume-xmark fa-2x";
    }

    isMuted = !isMuted;
}
