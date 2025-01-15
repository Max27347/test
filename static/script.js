document.addEventListener('DOMContentLoaded', () => {
  const clickButton = document.getElementById('clickButton');
  const currentScoreElement = document.getElementById('currentScore');
  const progressBar = document.getElementById('progressBar');
  const progressLabel = document.getElementById('progressLabel');
  const energyBar = document.getElementById('energyBar');
  const coinContainer = document.getElementById('coinContainer');

  let progress = 0; // Текущий прогресс
  const maxProgress = 100; // Максимальное значение прогресса
  let leagueLevel = 0; // Уровень лиги: 0 - Бронзовая, 1 - Серебряная, 2 - Золотая
  let clicksPerLevel = 10; // Количество кликов для перехода на следующий уровень (по умолчанию для Бронзовой лиги)

  let energy = 100; // Текущая энергия
  const maxEnergy = 100; // Максимальная энергия
  const energyCost = 10; // Стоимость энергии за нажатие
  const energyRecoveryRate = 5; // Скорость восстановления энергии (единиц в секунду)

  let coinsPerClick = 1; // Количество монет за клик (по умолчанию 1)

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

  // Загружаем сохраненную энергию
  const savedEnergy = localStorage.getItem('currentEnergy');
  if (savedEnergy !== null) {
    energy = parseInt(savedEnergy, 10);
    energyBar.style.width = `${(energy / maxEnergy) * 100}%`;
  }

  // Загружаем сохраненный прогресс
  const savedProgress = localStorage.getItem('currentProgress');
  if (savedProgress !== null) {
    progress = parseFloat(savedProgress); // Восстанавливаем прогресс
    progressBar.style.width = `${progress}%`; // Устанавливаем сохраненное значение прогресса в полосе
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

          // Сохраняем прогресс в localStorage
          localStorage.setItem('currentProgress', progress);

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
            localStorage.setItem('currentProgress', 0); // Сохраняем сброшенный прогресс
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
    updateEnergy(energy); // Сохраняем энергию в localStorage при восстановлении
  }

  // Запускаем таймер восстановления энергии
  setInterval(recoverEnergy, 10); // Восстановление энергии каждые 100 мс (0.1 секунды)

  // Функция обновления счета
  function updateScore(newScore) {
    currentScoreElement.innerText = newScore;
    localStorage.setItem('currentScore', newScore);
  }

  // Функция обновления энергии
  function updateEnergy(newEnergy) {
    energyBar.style.width = `${(newEnergy / maxEnergy) * 100}%`;
    localStorage.setItem('currentEnergy', newEnergy); // Сохраняем энергию в localStorage
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
        progressLabel.innerText = 'Китай';
        clicksPerLevel = 10;
        backgroundImage = '/static/images/china.png'; // Укажите путь к фону Алмазной лиги
        break;
      case 4:
        progressLabel.innerText = 'Водный мир';
        clicksPerLevel = 10;
        backgroundImage = '/static/images/water_world.png'; // Укажите путь к фону Алмазной лиги
        break;
      case 5:
        progressLabel.innerText = 'Мистика';
        clicksPerLevel = 10;
        backgroundImage = '/static/images/mystical.png'; // Укажите путь к фону Алмазной лиги
        break;
      case 6:
        progressLabel.innerText = 'Кубический мир';
        clicksPerLevel = 10;
        backgroundImage = '/static/images/minecraft.png'; // Укажите путь к фону Алмазной лиги
        break;
      case 7:
        progressLabel.innerText = 'Тьма';
        clicksPerLevel = 10;
        backgroundImage = '/static/images/dark.png'; // Укажите путь к фону Алмазной лиги
        break;
      case 8:
        progressLabel.innerText = 'Космос';
        clicksPerLevel = 10;
        backgroundImage = '/static/images/cosmos.png'; // Укажите путь к фону Алмазной лиги
        break;
      case 9:
        progressLabel.innerText = 'Темнота';
        clicksPerLevel = 10;
        backgroundImage = '/static/images/dark_2.png'; // Укажите путь к фону Алмазной лиги
        break;
      case 10:
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
    const coin = document.createElement('img'); // Используем <img> вместо <div>
    coin.src = '/static/images/coin.png'; // Устанавливаем источник изображения монеты
    coin.classList.add('coin_drop'); // Добавляем класс для анимации

    // Устанавливаем начальную позицию монеты около клика
    const startX = event.clientX - 15; // Центрируем монету по клику
    const startY = event.clientY - 15; // Центрируем монету по клику

    coin.style.left = `${startX}px`; // Устанавливаем позицию по горизонтали
    coin.style.top = `${startY}px`; // Устанавливаем позицию по вертикали

    // Добавляем монету в контейнер
    coinContainer.appendChild(coin);

    // Удаляем монету после завершения анимации
    coin.addEventListener('animationend', () => {
      coin.remove();
    });
  }

  // Пример использования функции
  document.getElementById('clickButton').addEventListener('click', spawnCoinDrop);
});
