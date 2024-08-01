// Variables
const startButton = document.getElementById('startButton');
const recordButton = document.getElementById('recordButton');
const hardLevelButton = document.getElementById('hardLevelButton');
const gameArea = document.getElementById('gameArea');

const images = [];
for (let i = 0; i <= 15; i++) {
    images.push(`imagen numeros/maya${i}.png`);
}

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let backgroundMusic = null;

// Funciones
function startGame() {
    gameArea.innerHTML = '';
    playAudio('voz numeros/bienvenidos.mp3');
    const shuffledImages = shuffle([...images, ...images]);
    shuffledImages.forEach(image => {
        const card = document.createElement('img');
        card.src = 'imagen numeros/imagen fondo.jpeg'; // Imagen de fondo por defecto
        card.dataset.image = image;
        card.addEventListener('click', flipCard);
        gameArea.appendChild(card);
    });
    playBackgroundMusic();
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.src = this.dataset.image;

    playAudio(`voz numeros/soundsmaya${this.dataset.image.match(/\d+/)[0]}.mp3`);

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;

    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.dataset.image === secondCard.dataset.image;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.src = 'imagen numeros/imagen fondo.jpeg';
        secondCard.src = 'imagen numeros/imagen fondo.jpeg';

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

function playAudio(file) {
    const audio = new Audio(file);
    audio.play();
}

function playBackgroundMusic() {
    if (backgroundMusic) {
        backgroundMusic.pause();
    }
    backgroundMusic = new Audio('voz numeros/music fondo.mp3');
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.2; // Baja el volumen de la música de fondo
    backgroundMusic.play();
}

// Event Listeners
startButton.addEventListener('click', startGame);
// Añadir funcionalidad para los otros botones (recordButton, hardLevelButton)
