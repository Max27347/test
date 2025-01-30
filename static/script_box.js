document.addEventListener('DOMContentLoaded', () => {
    const shopBox = document.querySelector('.shop_box');
    const overlayBox1 = document.querySelector('.overlay_box1');
    const containerBox1 = document.querySelector('.container_box_1');
    const containerBox11 = document.querySelector('.container_box_11');
    const closeButtonBox1 = document.querySelector('.close-button_box1');
    const closeRewardButton = document.querySelector('.close-reward-button');
    const upgradeButtonBox1 = document.querySelector('.upgrade-button_box1');
    const rewardImage = document.getElementById('rewardImage');

    // Список героев с ID
    const heroes = [
        { id: "cot", img: "/static/images/cot.png" },
        { id: "groot", img: "/static/images/groot.png" },
        { id: "golem", img: "/static/images/golem.png" },
        { id: "fire", img: "/static/images/fire.png" },
        { id: "water", img: "/static/images/water.png" }
    ];

    // Получаем список разблокированных персонажей из localStorage
    let unlockedHeroes = JSON.parse(localStorage.getItem('unlockedHeroes')) || ["cot"]; // По умолчанию открыт первый герой

    // Обновляем доступность персонажей
    function updateCharacterAvailability() {
        document.querySelectorAll('.character').forEach(character => {
            const characterId = character.getAttribute('data-id');

            if (unlockedHeroes.includes(characterId)) {
                character.classList.remove('locked');  // Разблокируем персонажа
                character.removeAttribute('data-locked');
            } else {
                character.classList.add('locked');  // Блокируем персонажа
                character.setAttribute('data-locked', 'true');
            }
        });
    }

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

        // Фильтруем только заблокированных персонажей
        const lockedHeroes = heroes.filter(hero => !unlockedHeroes.includes(hero.id));

        if (lockedHeroes.length === 0) {
            alert("Все персонажи уже разблокированы!");
            return;
        }

        // Выбираем случайного персонажа из заблокированных
        const randomHero = lockedHeroes[Math.floor(Math.random() * lockedHeroes.length)];

        // Добавляем его в список разблокированных
        unlockedHeroes.push(randomHero.id);
        localStorage.setItem('unlockedHeroes', JSON.stringify(unlockedHeroes));

        // Обновляем отображение персонажей
        updateCharacterAvailability();

        // Показываем окно с выпавшим героем
        containerBox11.style.display = 'block';
        rewardImage.src = randomHero.img;
        rewardImage.alt = 'Выпавший герой';
    });

    // Закрытие окна с выпавшим героем
    closeRewardButton.addEventListener('click', () => {
        overlayBox1.style.display = 'none';
        containerBox11.style.display = 'none';
    });

    // Первоначальная проверка доступных персонажей при загрузке страницы
    updateCharacterAvailability();
});
