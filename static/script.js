    // Выделение навигации
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".nav-button");
  const currentPath = window.location.pathname;

  // Убираем класс 'active' у всех ссылок
  links.forEach(link => {
    link.classList.remove("active");
  });

  // Применяем класс 'active' только к ссылке, которая соответствует текущему пути
  links.forEach(link => {
    const linkPath = link.getAttribute("href");

    // Проверяем, если текущий путь точно совпадает с путем ссылки или если ссылка - это главная
    if (currentPath === linkPath || (currentPath === "/" && linkPath === "/")) {
      link.classList.add("active");
    }
  });
});


document.addEventListener('DOMContentLoaded', () => {
    const clickButton = document.getElementById('clickButton');
    const currentScoreElement = document.getElementById('currentScore');
    const imageTextElement = document.querySelector('.image-text');

    // Загружаем сохраненное значение счета
    const savedScore = localStorage.getItem('currentScore');
    if (savedScore !== null) {
        updateScore(parseInt(savedScore) || 0); // Устанавливаем сохраненное значение или 0
    } else {
        updateScore(0); // Устанавливаем начальное значение
    }

    // Загружаем сохраненный текст
    const savedImageText = localStorage.getItem('imageText');
    if (savedImageText) {
        updateImageText(savedImageText); // Устанавливаем сохраненный текст
    } else {
        updateImageText('0'); // Устанавливаем начальное значение
    }

    clickButton.onclick = async (event) => {
        try {
            const response = await fetch('/click', { method: 'POST' });
            const data = await response.json();

            if (data.success) {
                let score = parseInt(currentScoreElement.innerText) || 0; // Проверка на NaN
                score++;
                updateScore(score);

                // Обновляем текст в элементе с классом image-text
                updateImageText(score);

                // Создаем одну монету с классом coin_drop
                spawnCoinDrop(event);
            }
        } catch (error) {
            console.error("Ошибка при обновлении счета:", error);
        }
    };
});

function updateScore(newScore) {
    const currentScoreElement = document.getElementById('currentScore');
    currentScoreElement.innerText = newScore;

    // Сохраняем текущее значение счета в localStorage
    localStorage.setItem('currentScore', newScore);
}

function updateImageText(newText) {
    const imageTextElement = document.querySelector('.image-text');
    imageTextElement.innerText = newText;

    // Сохраняем текст в localStorage
    localStorage.setItem('imageText', newText);
}


// Функция для создания одной монеты с классом coin_drop
function spawnCoinDrop(event) {
    const coinContainer = document.getElementById('coinContainer');

    if (!coinContainer) {
        console.error('Контейнер для монет (coinContainer) не найден');
        return;
    }

    // Создаем одну монету
    const coin = document.createElement('div');
    coin.classList.add('coin_drop');

    // Устанавливаем начальную позицию монеты около клика
    const startX = event.clientX; // Позиция клика по X
    const startY = event.clientY; // Позиция клика по Y

    coin.style.left = `${startX}px`;
    coin.style.top = `${startY}px`;

    // Добавляем монету в контейнер
    coinContainer.appendChild(coin);

    // Удаляем монету после завершения анимации
    coin.addEventListener('animationend', () => {
        coin.remove();
    });
}



// Менюшка
const menuIcon = document.getElementById('menu-icon');
const dropdownMenu = document.getElementById('dropdown-menu');

// Переключение видимости меню при клике на картинку
menuIcon.addEventListener('click', (event) => {
    event.stopPropagation(); // Предотвращаем всплытие события
    dropdownMenu.classList.toggle('active');
});

// Закрываем меню, если кликнули вне его
document.addEventListener('click', (event) => {
    if (!menuIcon.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.classList.remove('active');
    }
});



