const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const selectedLevel = urlParams.get('level');

const cardData = {
  easy: {
    cardCount: 12,
    cardImages: ['img/aurelia.svg', 'img/vue.svg', 'img/angular.svg', 'img/react.svg', 'img/backbone.svg', 'img/ember.svg'],
  },
  medium: {
    cardCount: 24,
    cardImages: ['img/aurelia.svg', 'img/vue.svg', 'img/angular.svg', 'img/react.svg', 'img/backbone.svg'],
  },
  hard: {
    cardCount: 40,
    cardImages: ['img/aurelia.svg', 'img/vue.svg', 'img/angular.svg', 'img/react.svg', 'img/backbone.svg', 'img/ember.svg'],
  },
};

function createMemoryCards(selectedLevel) {
  const cardContainer = document.querySelector('.memory-game');
  cardContainer.innerHTML = ''; // Kosongkan kontainer kartu

  const { cardCount, cardImages } = cardData[selectedLevel];
  const columns = selectedLevel === 'easy' ? 4 : selectedLevel === 'medium' ? 6 : 8;
  
  //untuk ngacak kartunya
  for (let i = cardImages.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cardImages[i], cardImages[j]] = [cardImages[j], cardImages[i]];
  }

  //untuk munculin kartunya
  for (let i = 0; i < cardCount; i++) {
    const card = document.createElement('div');
    card.classList.add('memory-card',selectedLevel);

    const frontFace = document.createElement('img');
    frontFace.classList.add('front-face');
    frontFace.src = cardImages[i % cardImages.length];
    frontFace.alt = 'Front Face';

    const backFace = document.createElement('img');
    backFace.classList.add('back-face');
    backFace.src = 'https://i.pinimg.com/736x/81/a6/32/81a63248e824a68a17e66ca5354f5865.jpg';
    backFace.alt = 'Back Face';

    card.appendChild(frontFace);
    card.appendChild(backFace);

    cardContainer.appendChild(card);
  }

  cardContainer.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
}

createMemoryCards(selectedLevel)

