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

// Логика для кнопки, которая показывает прогресс и обновляет счет
document.addEventListener('DOMContentLoaded', () => {
  const clickButton = document.getElementById('clickButton');
  const currentScoreElement = document.getElementById('currentScore');
  const progressBar = document.getElementById('progressBar');
  const energyBar = document.getElementById('energyBar');
  const coinContainer = document.getElementById('coinContainer');

  let progress = 0; // Текущий прогресс
  const maxProgress = 100; // Максимальное значение прогресса

  let energy = 100; // Текущая энергия
  const maxEnergy = 100; // Максимальная энергия
  const energyCost = 10; // Стоимость энергии за нажатие
  const energyRecoveryRate = 15; // Скорость восстановления энергии (единиц в секунду)

  // Загружаем сохраненное значение счета
  const savedScore = localStorage.getItem('currentScore');
  if (savedScore !== null) {
    updateScore(parseInt(savedScore) || 0); // Устанавливаем сохраненное значение или 0
  } else {
    updateScore(0); // Устанавливаем начальное значение
  }

  // Загружаем изображение выбранного персонажа
  const savedCharacterImg = localStorage.getItem('selectedCharacterImg');
  if (savedCharacterImg) {
    clickButton.src = savedCharacterImg; // Устанавливаем выбранное изображение на кнопку
  }

  // Обработка клика на кнопку
  clickButton.onclick = async (event) => {
    if (energy >= energyCost) {
      try {
        const response = await fetch('/click', { method: 'POST' });
        const data = await response.json();

        if (data.success) {
          let score = parseInt(currentScoreElement.innerText) || 0; // Проверка на NaN
          score++;
          updateScore(score);

          // Увеличиваем прогресс
          progress = Math.min(progress + 10, maxProgress);
          progressBar.style.width = `${progress}%`;

          // Расходуем энергию
          energy = Math.max(energy - energyCost, 0);
          energyBar.style.width = `${(energy / maxEnergy) * 100}%`;

          // Создаем одну монету с анимацией
          spawnCoinDrop(event);

          // Если прогресс достиг максимума, выполняем действие
          if (progress === maxProgress) {
            alert('Прогресс завершен!');
            progress = 0; // Сбрасываем прогресс
            progressBar.style.width = '0%';
          }
        }
      } catch (error) {
        console.error("Ошибка при обновлении счета:", error);
      }
    } else {
      alert('Недостаточно энергии!');
    }
  };

  // Функция восстановления энергии
  function recoverEnergy() {
    energy = Math.min(energy + energyRecoveryRate / 10, maxEnergy);
    energyBar.style.width = `${(energy / maxEnergy) * 100}%`;
  }

  // Запускаем таймер восстановления энергии
  setInterval(recoverEnergy, 100); // Восстановление энергии каждые 100 мс (0.1 секунды)

  // Функция обновления счета
  function updateScore(newScore) {
    currentScoreElement.innerText = newScore;

    // Сохраняем текущее значение счета в localStorage
    localStorage.setItem('currentScore', newScore);
  }

  // Функция для создания одной монеты с анимацией
  function spawnCoinDrop(event) {
    const coin = document.createElement('div');
    coin.classList.add('coin_drop');

    // Устанавливаем начальную позицию монеты около клика
    const startX = event.clientX - 20; // Центрируем монету по клику
    const startY = event.clientY - 20;

    coin.style.left = `${startX}px`;
    coin.style.top = `${startY}px`;

    // Добавляем монету в контейнер
    coinContainer.appendChild(coin);

    // Удаляем монету после завершения анимации
    coin.addEventListener('animationend', () => {
      coin.remove();
    });
  }
});

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
