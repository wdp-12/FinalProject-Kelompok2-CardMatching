const levelSelect = document.getElementById('levelSelect');
const memoryGame = document.querySelector('.memory-game');
const timerContainer = document.querySelector('.timer-container');
const container = document.querySelector('.container');
const nameInput = document.getElementById('name');
const saveNameButton = document.getElementById('play');
const playerNameElement = document.getElementById('playerNameDisplay');

function myFunction() {
    var element = document.body;
    element.classList.toggle("dark-mode");
}

saveNameButton.addEventListener('click', () => {
    const playerName = nameInput.value;

    // Menyimpan nama pemain ke dalam Local Storage dengan key "playerName"
    if (playerName) {
        localStorage.setItem('playerName', playerName);
        location.reload();
    } else {
        alert('Silakan masukkan nama pemain.');
    }
});

// menampilkan nama pemain
document.addEventListener('DOMContentLoaded', () => {
    const savedPlayerName = localStorage.getItem('playerName');
    if (savedPlayerName) {
        playerNameElement.textContent = `Player: ${savedPlayerName}`;
    }
});

levelSelect.addEventListener('change', () => {
    const selectedLevel = levelSelect.value;

    if (selectedLevel === 'easy' || selectedLevel === 'medium' || selectedLevel === 'hard') {
        memoryGame.style.visibility = 'visible';
        timerContainer.style.visibility = 'visible';
        container.style.visibility = 'hidden';

        const message = document.querySelector('.message');
        message.style.display = 'block';
        setTimeout(() => {
            message.textContent = 'Are you ready?';
        }, 1000);

        setTimeout(() => {
            message.innerHTML = '3';
            const countdown = document.getElementById('countdown');
            countdown.volume = 0.25;
            countdown.play();
        }, 2000);

        setTimeout(() => {
            message.innerHTML = '2'
        }, 3000);

        setTimeout(() => {
            message.innerHTML = '1'
        }, 4000)

        setTimeout(() => {
            message.innerHTML = 'BEGIN';
        }, 5000)

        setTimeout(() => {
            message.style.display = 'none';
        }, 7000);

    } else {
        memoryGame.style.visibility = 'hidden';
    }
    setupGame(selectedLevel);
})

function setupGame(selectedLevel) {
    const cardData = {
        easy: {
            cardCount: 12,
            cardImages: ['assets/img/alpukat.png', 'assets/img/anggur.png', 'assets/img/apel.png', 'assets/img/bluebery.png', 'assets/img/chery.png', 'assets/img/jeruk.png'],
        },
        medium: {
            cardCount: 24,
            cardImages: ['assets/img/alpukat.png', 'assets/img/anggur.png', 'assets/img/apel.png', 'assets/img/bluebery.png', 'assets/img/chery.png', 'assets/img/jeruk.png',
                'assets/img/durian.png', 'assets/img/jambu.png', 'assets/img/kiwi.png', 'assets/img/leci.png', 'assets/img/lemon.png', 'assets/img/mangga.png'],
        },
        hard: {
            cardCount: 40,
            cardImages: ['assets/img/alpukat.png', 'assets/img/anggur.png', 'assets/img/apel.png', 'assets/img/bluebery.png', 'assets/img/chery.png', 'assets/img/jeruk.png',
                'assets/img/durian.png', 'assets/img/jambu.png', 'assets/img/kiwi.png', 'assets/img/leci.png', 'assets/img/lemon.png', 'assets/img/mangga.png',
                'assets/img/manggis.png', 'assets/img/melon.png', 'assets/img/nanas.png', 'assets/img/peach.png', 'assets/img/pear.png', 'assets/img/pisang.png',
                'assets/img/semangka.png', 'assets/img/stroberi.png'],
        },
    };
    const cardContainer = document.querySelector('.memory-game');
    cardContainer.innerHTML = '';

    const { cardCount, cardImages } = cardData[selectedLevel];
    const columns = selectedLevel === 'easy' ? 4 : selectedLevel === 'medium' ? 6 : 8;

    const duplicatedImages = cardImages.concat(cardImages);
    for (let i = duplicatedImages.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [duplicatedImages[i], duplicatedImages[j]] = [duplicatedImages[j], duplicatedImages[i]];
    }

    //untuk munculin kartunya
    for (let i = 0; i < cardCount; i++) {
        const card = document.createElement('div');
        card.classList.add('memory-card', selectedLevel);
        card.dataset.src = duplicatedImages[i];

        const frontFace = document.createElement('img');
        frontFace.classList.add('front-face');
        frontFace.src = duplicatedImages[i];
        frontFace.alt = 'Front Face';

        const backFace = document.createElement('img');
        backFace.classList.add('back-face');
        backFace.src = 'assets/img/backcard.png';
        backFace.alt = 'Back Face';

        card.appendChild(frontFace);
        card.appendChild(backFace);

        cardContainer.appendChild(card);
    }

    cardContainer.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;

    initializeGameLogic();
}

function initializeGameLogic() {
    const cards = document.querySelectorAll('.memory-card');
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;

    // Flip Card Function
    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;
        this.classList.add('flip');
        // sound effect kartu di click
        const clickSound = new Audio('assets/sound/klik.mp3');
        clickSound.currentTime = 0;//mengatur ulang audio ke awal
        clickSound.volume = 0.25;//mengatur volume 
        clickSound.play();

        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        secondCard = this;
        checkForMatch();
    }

    // Cek Match card
    function checkForMatch() {
        let isMatch = firstCard.dataset.src === secondCard.dataset.src;

        isMatch ? disableCards() : unflipCards();
    }

    //hentikan waktu
    function stopTimer() {
        clearInterval(timerInterval);
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);

        // sound effect kartu match
        const matchSound = new Audio('assets/sound/match.mp3');
        matchSound.currentTime = 0;//mengatur ulang audio ke awal
        matchSound.volume = 0.5;
        matchSound.play();

        if (document.querySelectorAll('.memory-card.flip').length === cards.length) {
            stopTimer(); // Menghentikan waktu jika semua kartu cocok
        }

        resetBoard();
    }

    function unflipCards() {
        lockBoard = true;

        // sound effect kartu no match
        const noMatchSound = new Audio('assets/sound/notmatch.mp3');
        noMatchSound.currentTime = 0;//mengatur ulang audio ke awal
        noMatchSound.volume = 0.5;
        noMatchSound.play();

        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');

            resetBoard();
        }, 1000);
    }

    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    cards.forEach(card => card.addEventListener('click', flipCard));
}

document.addEventListener('DOMContentLoaded', () => {
    setupGame(levelSelect.value)
})