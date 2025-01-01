// Функция для обновления счета и сохранения в localStorage
function updateScore(newScore) {
    const currentScoreElement = document.getElementById('currentScore');
    currentScoreElement.innerText = newScore;

    // Сохраняем текущее значение счета в localStorage
    localStorage.setItem('currentScore', newScore);

    // Обновление значения в image-text
    const imageTextElement = document.querySelector('.image-text');
    imageTextElement.innerText = newScore; // Обновляем текст
}

// Функция для загрузки счета из localStorage при загрузке страницы
function loadScore() {
    const storedScore = localStorage.getItem('currentScore');
    if (storedScore) {
        // Устанавливаем сохраненный счет на странице
        updateScore(parseInt(storedScore));
    } else {
        // Если нет сохраненного значения, устанавливаем 0
        updateScore(0);
    }
}

// Загружаем счет при загрузке страницы
window.onload = loadScore;

// Открытие меню сундука
document.getElementById('box1').addEventListener('click', function () {
    const clickBox = document.getElementById('click_box');
    clickBox.style.display = 'flex'; // Показываем меню сундука
});

// Закрытие меню сундука
document.getElementById('closeBoxButton').addEventListener('click', function () {
    const clickBox = document.getElementById('click_box');
    clickBox.style.display = 'none'; // Скрываем меню сундука
});

// Покупка сундука
document.getElementById('buyButton1').addEventListener('click', function () {
    const cost = 10; // Стоимость покупки
    const currentScoreElement = document.getElementById('currentScore');
    let currentScore = parseInt(currentScoreElement.innerText);

    // Проверка, достаточно ли монет для покупки
    if (currentScore >= cost) {
        currentScore -= cost; // Списываем монеты
        updateScore(currentScore); // Обновляем счет

        // Генерация одного случайного предмета
        const items = [
            { name: 'Кот', icon: '/static/images/colt.png' },
            { name: 'Кот', icon: '/static/images/colt.png' },
            { name: 'Кот', icon: '/static/images/colt.png' },
            { name: 'Кот', icon: '/static/images/colt.png' },
            { name: 'Кот', icon: '/static/images/colt.png' },
        ];

        // Генерация одного случайного предмета
        const randomItem = items[Math.floor(Math.random() * items.length)];

        // Отображение выпавшего предмета в rewardsMenu
        const rewardsItems = document.getElementById('rewardsItems');
        rewardsItems.innerHTML = ''; // Очищаем блок
        const rewardDiv = document.createElement('div');
        rewardDiv.className = 'reward_item';

        rewardDiv.innerHTML = `
            <img src="${randomItem.icon}" alt="${randomItem.name}">
            <span>${randomItem.name}</span>
        `;
        rewardsItems.appendChild(rewardDiv);

        // Показать меню с выпавшими предметами
        const rewardsMenu = document.getElementById('rewardsMenu');
        rewardsMenu.style.display = 'flex';

        // Блокируем скроллинг страницы
        document.body.classList.add('no-scroll');

        // Скрыть меню покупки
        const clickBox = document.getElementById('click_box');
        clickBox.style.display = 'none';
    } else {
        showInsufficientFundsModal(); // Показать модальное окно недостатка средств
    }
});

// Закрытие меню с выпавшими предметами
document.getElementById('closeRewardsButton').addEventListener('click', function () {
    const rewardsMenu = document.getElementById('rewardsMenu');
    rewardsMenu.style.display = 'none'; // Скрываем меню с выпавшими предметами

    // Включаем скроллинг страницы
    document.body.classList.remove('no-scroll');
});
