const spinButton = document.getElementById('spin-btn');
const wheel = document.getElementById('wheel');
const result = document.getElementById('result');

const prizes = [
    "Приз: 100 монет",
    "Приз: 200 монет",
    "Приз: 500 монет",
    "Приз: Бесплатный сундук",
    "Приз: Скидка 10%",
    "Приз: Секретный подарок"
];

let isSpinning = false; // Чтобы предотвратить повторный запуск во время вращения
let currentRotation = 0; // Хранение текущего угла вращения

spinButton.addEventListener('click', (event) => {
    if (isSpinning) return; // Игнорировать клик, если рулетка крутится
    isSpinning = true;

    // Генерация случайного угла для остановки
    const randomStop = Math.floor(Math.random() * 360); // Случайный сектор
    const fullRotations = 5; // Количество полных оборотов
    const targetRotation = fullRotations * 360 + randomStop; // Общий угол вращения

    // Установка вращения колеса с замедлением
    wheel.style.transition = 'transform 5s cubic-bezier(0.17, 0.67, 0.83, 0.67)';
    wheel.style.transform = `rotate(${currentRotation + targetRotation}deg)`;

    // Рассчитываем выигрышный сектор
    const sectorAngle = 360 / prizes.length;
    const winningIndex = Math.floor((randomStop / sectorAngle) % prizes.length);

    // Задержка для показа результата
    setTimeout(() => {
        result.textContent = prizes[winningIndex];
        isSpinning = false; // Разрешить следующий запуск
        currentRotation += targetRotation; // Обновляем текущий угол
    }, 5000); // Время совпадает с длительностью вращения
});
