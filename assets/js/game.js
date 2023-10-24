const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const selectedLevel = urlParams.get('level');

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

function createMemoryCards(selectedLevel) {
  const cardContainer = document.querySelector('.memory-game');
  cardContainer.innerHTML = ''; // Kosongkan kontainer kartu

  const { cardCount, cardImages } = cardData[selectedLevel];
  const columns = selectedLevel === 'easy' ? 4 : selectedLevel === 'medium' ? 6 : 8;

  // Duplicate gambar untuk menampilkan dua kartu yang sama
  const duplicatedImages = cardImages.concat(cardImages);
   
  // Untuk ngacak kartu
  for (let i = duplicatedImages.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [duplicatedImages[i], duplicatedImages[j]] = [duplicatedImages[j], duplicatedImages[i]];
  }

  //untuk munculin kartunya
  for (let i = 0; i < cardCount; i++) {
    const card = document.createElement('div');
    card.classList.add('memory-card',selectedLevel);
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
}

createMemoryCards(selectedLevel)

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

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  // sound effect kartu match
  const matchSound = new Audio('assets/sound/match.mp3');
  matchSound.currentTime = 0;//mengatur ulang audio ke awal
  matchSound.play();

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  // sound effect kartu no match
  const noMatchSound = new Audio('assets/sound/notmatch.mp3');
  noMatchSound.currentTime = 0;//mengatur ulang audio ke awal
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
