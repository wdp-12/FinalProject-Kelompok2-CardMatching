const levelSelect = document.getElementById('levelSelect');
levelSelect.addEventListener('change', () => {
    const selectedLevel = levelSelect.value;
    window.location.href = `game.html?level=${selectedLevel}`;
});
