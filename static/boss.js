const boss = document.getElementById('boss');
const healthBarInner = document.getElementById('health-bar-inner');
const timerElement = document.getElementById('timer');
const gameOverElement = document.getElementById('game-over');
const startButton = document.getElementById('start-button');

let maxHealth = 100;
let currentHealth = maxHealth;
let timeLeft = 20; // В секундах
let timerInterval;
let gameStarted = false; // Флаг, что игра не началась

// Начать игру
function startGame() {
    // Сброс состояния
    currentHealth = maxHealth;
    timeLeft = 20;
    healthBarInner.style.width = '100%';
    timerElement.textContent = `Time Left: ${timeLeft}s`;
    gameOverElement.textContent = '';
    startButton.style.display = 'none';  // Скрыть кнопку старт

    // Показать таймер
    timerElement.style.display = 'block';

    // Таймер
    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Time Left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endGame(false);
        }
    }, 1000);

    // Игра началась
    gameStarted = true;

    // Включить возможность кликов по боссу
    boss.style.pointerEvents = 'auto';
    boss.classList.remove('grow-shrink');  // Убираем анимацию до начала игры
}

// Нажатие на босса
boss.addEventListener('click', () => {
    if (gameStarted && timeLeft > 0 && currentHealth > 0) {
        currentHealth -= 10;
        if (currentHealth < 0) currentHealth = 0;

        const healthPercentage = (currentHealth / maxHealth) * 100;
        healthBarInner.style.width = `${healthPercentage}%`;

        // Анимация при попадании (увеличение и уменьшение)
        boss.classList.add('grow-shrink');
        setTimeout(() => {
            boss.classList.remove('grow-shrink');
        }, 300);

        if (currentHealth === 0) {
            clearInterval(timerInterval);
            endGame(true);
        }
    }
});

// Завершение игры
function endGame(won) {
    boss.style.pointerEvents = 'none'; // Отключить клики
    if (won) {
        gameOverElement.textContent = 'You Win!';
        gameOverElement.style.color = 'lime';
    } else {
        gameOverElement.textContent = 'Game Over!';
        gameOverElement.style.color = 'red';
    }

    startButton.style.display = 'inline-block';  // Показать кнопку старт
    gameStarted = false; // Игра закончена
}

// Кнопка старт
startButton.addEventListener('click', startGame);
