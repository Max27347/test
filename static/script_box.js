// Открытие меню сундука
document.getElementById('box1').addEventListener('click', function () {
    const menu = document.getElementById('menu');
    menu.style.display = (menu.style.display === 'none' || menu.style.display === '') ? 'block' : 'none';
});

// Покупка сундука
document.getElementById('buyButton').addEventListener('click', function () {
    const cost = 10; // Стоимость покупки
    const currentScoreElement = document.getElementById('currentScore');
    let currentScore = parseInt(currentScoreElement.innerText);

    // Проверка, достаточно ли монет для покупки
    if (currentScore >= cost) {
        currentScore -= cost; // Списываем 1000 монет
        updateScore(currentScore); // Обновляем счет

        // Обновляем значение в элементах с классом image-text
        updateImageText(currentScore.toString()); // Обновляем текст

        // Генерация случайных предметов
        const items = [
            { name: 'Кот', icon: '/static/images/colt.png' },
            { name: 'Кот', icon: '/static/images/colt.png' },
            { name: 'Кот', icon: '/static/images/colt.png' },
            { name: 'Кот', icon: '/static/images/colt.png' },
            { name: 'Кот', icon: '/static/images/colt.png' },
        ];
        const rewards = [];
        for (let i = 0; i < 2; i++) {
            const randomItem = items[Math.floor(Math.random() * items.length)];
            rewards.push(randomItem);
        }

        // Отображение выпавших предметов
        const rewardsItems = document.getElementById('rewardsItems');
        rewardsItems.innerHTML = ''; // Очищаем блок
        rewards.forEach(item => {
            const rewardDiv = document.createElement('div');
            rewardDiv.className = 'reward_item';

            rewardDiv.innerHTML = `
                <img src="${item.icon}" alt="${item.name}">
                <span>${item.name}</span>
            `;
            rewardsItems.appendChild(rewardDiv);
        });

        // Показать меню с выпавшими предметами
        const rewardsMenu = document.getElementById('rewardsMenu');
        rewardsMenu.style.display = 'flex';

        // Блокируем скроллинг страницы
        document.body.classList.add('no-scroll');

        // Скрыть меню покупки
        const menu = document.getElementById('menu');
        menu.style.display = 'none';
    } else {
        showInsufficientFundsModal(); // Показать модальное окно недостатка средств
    }
});

// Закрытие меню с выпавшими предметами
document.getElementById('closeRewardsButton').addEventListener('click', function () {
    const rewardsMenu = document.getElementById('rewardsMenu');
    rewardsMenu.style.display = 'none';

    // Включаем скроллинг страницы
    document.body.classList.remove('no-scroll');
});

// Функция для обновления счета и сохранения в localStorage
function updateScore(newScore) {
    const currentScoreElement = document.getElementById('currentScore');
    currentScoreElement.innerText = newScore;

    // Сохраняем текущее значение счета в localStorage
    localStorage.setItem('currentScore', newScore);
}

// Функция для обновления текста в элементах с классом image-text
function updateImageText(newText) {
    const imageTextElements = document.querySelectorAll('.image-text');
    imageTextElements.forEach(element => {
        element.innerText = newText;
    });

    // Сохраняем текст в localStorage (если нужно)
    localStorage.setItem('imageText', newText);
}

// Функция для показа модального окна недостатка средств
function showInsufficientFundsModal() {
    const modal = document.getElementById('insufficientFundsModal');
    modal.style.display = 'block'; // Показываем модальное окно
}

// Закрытие модального окна при нажатии на кнопку закрытия
document.getElementById('closeModalButton').addEventListener('click', function () {
    const modal = document.getElementById('insufficientFundsModal');
    modal.style.display = 'none'; // Скрываем модальное окно
});

// Закрытие модального окна при клике вне его области
window.addEventListener('click', function (event) {
    const modal = document.getElementById('insufficientFundsModal');
    if (event.target === modal) {
        modal.style.display = 'none'; // Скрываем модальное окно при клике вне его области
    }
});
