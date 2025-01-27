document.addEventListener('DOMContentLoaded', () => {
    const shopBox = document.querySelector('.shop_box');
    const overlayBox1 = document.querySelector('.overlay_box1');
    const containerBox1 = document.querySelector('.container_box_1');
    const containerBox11 = document.querySelector('.container_box_11');
    const closeButtonBox1 = document.querySelector('.close-button_box1');
    const closeRewardButton = document.querySelector('.close-reward-button');
    const upgradeButtonBox1 = document.querySelector('.upgrade-button_box1');
    const rewardImage = document.getElementById('rewardImage');

    // Массив героев
    const heroes = [
        "/static/images/groot.png",
        "/static/images/groot.png",
        "/static/images/groot.png",
        "/static/images/groot.png",
        "/static/images/groot.png",
    ];

    // Открытие окна сундука
    shopBox.addEventListener('click', () => {
        overlayBox1.style.display = 'block';
        containerBox1.style.display = 'block';
    });

    // Закрытие окна при нажатии на кнопку закрытия
    closeButtonBox1.addEventListener('click', () => {
        overlayBox1.style.display = 'none';
        containerBox1.style.display = 'none';
    });

    // Закрытие окна при клике на слой затемнения
    overlayBox1.addEventListener('click', () => {
        overlayBox1.style.display = 'none';
        containerBox1.style.display = 'none';
    });

    // Покупка сундука
    upgradeButtonBox1.addEventListener('click', () => {
        // Закрываем текущее окно
        containerBox1.style.display = 'none';

        // Открываем окно с выпавшим героем
        containerBox11.style.display = 'block';

        // Выбираем случайного героя
        const randomHero = heroes[Math.floor(Math.random() * heroes.length)];

        // Устанавливаем изображение выпавшего героя
        rewardImage.src = randomHero;
        rewardImage.alt = 'Выпавший герой';
    });

    // Закрытие окна с выпавшим героем
    closeRewardButton.addEventListener('click', () => {
        overlayBox1.style.display = 'none';
        containerBox11.style.display = 'none';
    });
});
