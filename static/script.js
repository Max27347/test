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


document.addEventListener('DOMContentLoaded', () => {
  const clickButton = document.getElementById('clickButton');
  const currentScoreElement = document.getElementById('currentScore');
  const progressBar = document.getElementById('progressBar');
  const progressLabel = document.getElementById('progressLabel');
  const energyBar = document.getElementById('energyBar');
  const coinContainer = document.getElementById('coinContainer');
  const upgradeButton = document.querySelector('.upgrade-button_2'); // Кнопка улучшения

  let progress = 0; // Текущий прогресс
  const maxProgress = 100; // Максимальное значение прогресса
  let leagueLevel = 0; // Уровень лиги: 0 - Бронзовая, 1 - Серебряная, 2 - Золотая
  let clicksPerLevel = 10; // Количество кликов для перехода на следующий уровень (по умолчанию для Бронзовой лиги)

  let energy = 500; // Текущая энергия
  const maxEnergy = 500; // Максимальная энергия
  const energyCost = 10; // Стоимость энергии за нажатие
  const energyRecoveryRate = 10; // Скорость восстановления энергии (единиц в секунду)

  let coinsPerClick = 1; // Количество монет за клик (по умолчанию 1)

  // Загружаем сохраненные данные из localStorage

  // Сохраняем значение монет за клик в localStorage
  const savedCoinsPerClick = localStorage.getItem('coinsPerClick');
  if (savedCoinsPerClick) {
    coinsPerClick = parseInt(savedCoinsPerClick, 10); // Восстанавливаем сохраненное значение
  }

  // Загрузка сохраненного фона из localStorage
  const savedBackground = localStorage.getItem('backgroundImage');
  if (savedBackground) {
    document.body.style.backgroundImage = `url("${savedBackground}")`; // Используем правильные кавычки
  }

  // Загрузка сохраненного уровня лиги из localStorage
  const savedLeagueLevel = localStorage.getItem('leagueLevel');
  if (savedLeagueLevel !== null) {
    leagueLevel = parseInt(savedLeagueLevel, 10);
    setLeagueBackground(leagueLevel); // Применяем фон для сохраненной лиги
  }

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
          score += coinsPerClick; // Увеличиваем счет в зависимости от coinsPerClick
          updateScore(score);

          // Увеличиваем прогресс в зависимости от текущей лиги
          const progressIncrement = maxProgress / clicksPerLevel;
          progress = Math.min(progress + progressIncrement, maxProgress);
          progressBar.style.width = `${progress}%`; // Используем правильный синтаксис

          // Расходуем энергию
          energy = Math.max(energy - energyCost, 0);
          energyBar.style.width = `${(energy / maxEnergy) * 100}%`; // Используем правильный синтаксис

          // Создаем одну монету с анимацией
          spawnCoinDrop(event);

          // Если прогресс достиг максимума, выполняем действие
          if (progress === maxProgress) {
            updateLeague(); // Обновляем лигу
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
    energyBar.style.width = `${(energy / maxEnergy) * 100}%`; // Используем правильный синтаксис
  }

  // Запускаем таймер восстановления энергии
  setInterval(recoverEnergy, 100); // Восстановление энергии каждые 100 мс (0.1 секунды)

  // Функция обновления счета
  function updateScore(newScore) {
    currentScoreElement.innerText = newScore;

    // Сохраняем текущее значение счета в localStorage
    localStorage.setItem('currentScore', newScore);
  }

  // Функция для обновления лиги
  function updateLeague() {
    leagueLevel++;
    localStorage.setItem('leagueLevel', leagueLevel); // Сохраняем текущий уровень лиги
    setLeagueBackground(leagueLevel); // Обновляем фон
  }

  // Функция установки фона для лиги
  function setLeagueBackground(level) {
    const body = document.body; // Элемент, фон которого будем менять
    let backgroundImage = '';

    switch (level) {
      case 1:
        progressLabel.innerText = 'Ледяной мир';
        clicksPerLevel = 10;
        backgroundImage = '/static/images/ice.png'; // Укажите путь к фону Серебряной лиги
        break;
      case 2:
        progressLabel.innerText = 'Адский мир';
        clicksPerLevel = 10;
        backgroundImage = '/static/images/ad.png'; // Укажите путь к фону Золотой лиги
        break;
      case 3:
        progressLabel.innerText = 'Ниндзя';
        clicksPerLevel = 10;
        backgroundImage = '/static/images/ninja_world.png'; // Укажите путь к фону Алмазной лиги
        break;
      case 4:
        progressLabel.innerText = 'Рай';
        clicksPerLevel = 10;
        backgroundImage = '/static/images/rai.png'; // Укажите путь к фону Алмазной лиги
        break;
      case 5:
        progressLabel.innerText = 'Водный мир';
        clicksPerLevel = 10;
        backgroundImage = '/static/images/water_world.png'; // Укажите путь к фону Алмазной лиги
        break;
      case 6:
        progressLabel.innerText = 'Мистика';
        clicksPerLevel = 10;
        backgroundImage = '/static/images/mystical.png'; // Укажите путь к фону Алмазной лиги
        break;
      case 7:
        progressLabel.innerText = 'Майнкрафт';
        clicksPerLevel = 10;
        backgroundImage = '/static/images/minecraft.png'; // Укажите путь к фону Алмазной лиги
        break;
      case 8:
        progressLabel.innerText = 'Тьма';
        clicksPerLevel = 10;
        backgroundImage = '/static/images/dark.png'; // Укажите путь к фону Алмазной лиги
        break;
       case 9:
        progressLabel.innerText = 'Космос';
        clicksPerLevel = 10;
        backgroundImage = '/static/images/cosmos.png'; // Укажите путь к фону Алмазной лиги
        break;
      case 10:
        progressLabel.innerText = 'Темнота';
        clicksPerLevel = 10;
        backgroundImage = '/static/images/dark_2.png'; // Укажите путь к фону Алмазной лиги
       break;
      case 11:
        progressLabel.innerText = 'НЛО';
        clicksPerLevel = 10;
        backgroundImage = '/static/images/plat.png'; // Укажите путь к фону Алмазной лиги
       break;
      default:
        progressLabel.innerText = 'мистическая деревня';
        leagueLevel = 0;
        clicksPerLevel = 10;
        backgroundImage = '/static/images/hogwarts.png'; // Укажите путь к фону Бронзовой лиги
    }

    body.style.backgroundImage = `url("${backgroundImage}")`; // Используем правильный синтаксис
    localStorage.setItem('backgroundImage', backgroundImage); // Сохраняем фон в localStorage
  }

  // Функция для создания одной монеты с анимацией
  function spawnCoinDrop(event) {
    const coin = document.createElement('div');
    coin.classList.add('coin_drop');

    // Устанавливаем начальную позицию монеты около клика
    const startX = event.clientX - 20; // Центрируем монету по клику
    const startY = event.clientY - 20;

    coin.style.left = `${startX}px`; // Используем правильный синтаксис
    coin.style.top = `${startY}px`; // Используем правильный синтаксис

    // Добавляем монету в контейнер
    coinContainer.appendChild(coin);

    // Удаляем монету после завершения анимации
    coin.addEventListener('animationend', () => {
      coin.remove();
    });
  }

  // Обработка нажатия кнопки улучшения
  upgradeButton.onclick = () => {
    coinsPerClick = 2; // Увеличиваем количество монет за клик
    localStorage.setItem('coinsPerClick', coinsPerClick); // Сохраняем значение в localStorage
    upgradeButton.disabled = true; // Делаем кнопку неактивной после улучшения
  };
});



