// Открытие меню сундука
    document.getElementById('box1').addEventListener('click', function () {
        const menu = document.getElementById('menu');
        menu.style.display = (menu.style.display === 'none' || menu.style.display === '') ? 'block' : 'none';
    });

    // Покупка сундука
    document.getElementById('buyButton').addEventListener('click', function () {
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
    });

    // Закрытие меню с выпавшими предметами
    document.getElementById('closeRewardsButton').addEventListener('click', function () {
        const rewardsMenu = document.getElementById('rewardsMenu');
        rewardsMenu.style.display = 'none';

        // Включаем скроллинг страницы
        document.body.classList.remove('no-scroll');
    });