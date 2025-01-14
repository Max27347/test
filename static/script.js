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

  let progress = 0;
  const maxProgress = 100;
  let leagueLevel = 0;
  let clicksPerLevel = 10;

  let energy = 100; // Текущая энергия
  const maxEnergy = 100;
  const energyCost = 10; // Стоимость энергии за нажатие
  const energyRecoveryRate = 5; // Скорость восстановления энергии (единиц в секунду)

  let coinsPerClick = 1;

  // Загружаем сохраненные данные из localStorage
  const savedCoinsPerClick = localStorage.getItem('coinsPerClick');
  if (savedCoinsPerClick) {
    coinsPerClick = parseInt(savedCoinsPerClick, 10);
  }

  // Загрузка сохраненной энергии
  const savedEnergy = localStorage.getItem('currentEnergy');
  if (savedEnergy !== null) {
    energy = parseInt(savedEnergy, 10); // Восстанавливаем сохраненную энергию
    energyBar.style.width = `${(energy / maxEnergy) * 100}%`;
  }

  // Загрузка времени последнего обновления энергии
  const lastEnergyUpdateTime = localStorage.getItem('lastEnergyUpdateTime');
  const currentTime = Date.now();

  // Если время последнего обновления энергии существует, восстанавливаем энергию
  if (lastEnergyUpdateTime) {
    const elapsedTime = (currentTime - lastEnergyUpdateTime) / 1000; // Время в секундах
    const energyRecovered = Math.floor(energyRecoveryRate * elapsedTime); // Сколько энергии восстанавливается
    energy = Math.min(energy + energyRecovered, maxEnergy);
    updateEnergy(energy);
  }

  // Сохраняем текущее время как время последнего обновления энергии
  localStorage.setItem('lastEnergyUpdateTime', currentTime);

  // Загрузка сохраненного прогресса
  const savedProgress = localStorage.getItem('currentProgress');
  if (savedProgress !== null) {
    progress = parseFloat(savedProgress); // Восстанавливаем сохраненный прогресс
    progressBar.style.width = `${progress}%`; // Обновляем отображение прогресса
  }

  // Функция для обновления энергии
  function updateEnergy(newEnergy) {
    energy = newEnergy;
    energyBar.style.width = `${(energy / maxEnergy) * 100}%`;
    localStorage.setItem('currentEnergy', energy); // Сохраняем энергию в localStorage
  }

  // Функция восстановления энергии
  function recoverEnergy() {
    const currentTime = Date.now();
    const lastEnergyUpdateTime = parseInt(localStorage.getItem('lastEnergyUpdateTime'), 10);
    if (lastEnergyUpdateTime) {
      const elapsedTime = (currentTime - lastEnergyUpdateTime) / 1000; // Время в секундах
      const energyRecovered = Math.floor(energyRecoveryRate * elapsedTime); // Сколько энергии восстанавливается
      energy = Math.min(energy + energyRecovered, maxEnergy);
      updateEnergy(energy);
    }
  }

  // Запускаем таймер восстановления энергии
  setInterval(() => {
    recoverEnergy();
    localStorage.setItem('lastEnergyUpdateTime', Date.now()); // Обновляем время последнего обновления энергии
  }, 1000); // Проверка каждую секунду

  // Обработка клика на кнопку
  clickButton.onclick = async (event) => {
    if (energy >= energyCost) {
      try {
        const response = await fetch('/click', { method: 'POST' });
        const data = await response.json();

        if (data.success) {
          let score = parseInt(currentScoreElement.innerText) || 0;
          score += coinsPerClick;
          updateScore(score);

          // Увеличиваем прогресс в зависимости от текущей лиги
          const progressIncrement = maxProgress / clicksPerLevel;
          progress = Math.min(progress + progressIncrement, maxProgress);
          updateProgress(progress);

          // Расходуем энергию
          energy = Math.max(energy - energyCost, 0);
          updateEnergy(energy); // Обновляем энергию и сохраняем в localStorage

          // Создаем одну монету с анимацией
          spawnCoinDrop(event);

          // Если прогресс достиг максимума, выполняем действие
          if (progress === maxProgress) {
            updateLeague();
            progress = 0;
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

  // Функция для обновления счета
  function updateScore(newScore) {
    currentScoreElement.innerText = newScore;
    localStorage.setItem('currentScore', newScore);
  }

  // Функция обновления прогресса
  function updateProgress(newProgress) {
    progress = newProgress;
    progressBar.style.width = `${progress}%`;
    localStorage.setItem('currentProgress', progress); // Сохраняем прогресс в localStorage
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
        progressLabel.innerText = 'Кубический мир';
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
 // Применяем фон и сохраняем данные в localStorage
  body.style.backgroundImage = `url("${backgroundImage}")`; // Используем правильный синтаксис
  localStorage.setItem('leagueLevel', level); // Сохраняем уровень лиги в localStorage
  localStorage.setItem('backgroundImage', backgroundImage); // Сохраняем фон в localStorage
}

// Восстановление данных о лиге и фоне после перезагрузки страницы
document.addEventListener('DOMContentLoaded', () => {
  // Восстанавливаем данные из localStorage
  const savedLeagueLevel = localStorage.getItem('leagueLevel');
  const savedBackgroundImage = localStorage.getItem('backgroundImage');

  // Если данные о лиге существуют, восстанавливаем их
  if (savedLeagueLevel) {
    setLeagueBackground(parseInt(savedLeagueLevel, 10));
  } else {
    // Если данных нет, устанавливаем начальный уровень
    setLeagueBackground(1);
  }
});

  // Обработка нажатия кнопки улучшения
  upgradeButton.onclick = () => {
    coinsPerClick = 2; // Увеличиваем количество монет за клик
    localStorage.setItem('coinsPerClick', coinsPerClick); // Сохраняем значение в localStorage
    upgradeButton.disabled = true; // Делаем кнопку неактивной после улучшения
  };
});

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


