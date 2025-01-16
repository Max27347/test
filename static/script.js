document.addEventListener('DOMContentLoaded', () => {
  const clickButton = document.getElementById('clickButton');
  const currentScoreElement = document.querySelector('.currentScore'); // Это для "Играть"
  const progressBar = document.querySelector('#progressBar');
  const progressLabel = document.querySelector('#progressLabel');
  const energyBar = document.querySelector('#energyBar');
  const coinContainer = document.querySelector('#coinContainer');

  let progress = 0;
  const maxProgress = 100;
  let leagueLevel = 0;
  let clicksPerLevel = 10;

  let energy = 100;
  const maxEnergy = 100;
  const energyCost = 10;
  const energyRecoveryRate = 5;

  let coinsPerClick = 1;

  // Сохраняем значение монет за клик в localStorage
  const savedCoinsPerClick = localStorage.getItem('coinsPerClick');
  if (savedCoinsPerClick) {
    coinsPerClick = parseInt(savedCoinsPerClick, 10); // Восстанавливаем сохраненное значение
  }

  // Загрузка сохраненного фона из localStorage
  const savedBackground = localStorage.getItem('backgroundImage');
  if (savedBackground) {
    document.body.style.backgroundImage = `url("${savedBackground}")`;
  }

  // Загрузка сохраненного уровня лиги из localStorage
  const savedLeagueLevel = localStorage.getItem('leagueLevel');
  if (savedLeagueLevel !== null) {
    leagueLevel = parseInt(savedLeagueLevel, 10);
    setLeagueBackground(leagueLevel);
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
    progress = parseFloat(savedProgress);
    progressBar.style.width = `${progress}%`;
  }

  // Загружаем изображение выбранного персонажа
  const savedCharacterImg = localStorage.getItem('selectedCharacterImg');
  if (savedCharacterImg) {
    clickButton.src = savedCharacterImg;
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

          const progressIncrement = maxProgress / clicksPerLevel;
          progress = Math.min(progress + progressIncrement, maxProgress);
          progressBar.style.width = `${progress}%`;

          // Сохраняем прогресс в localStorage
          localStorage.setItem('currentProgress', progress);

          // Расходуем энергию
          energy = Math.max(energy - energyCost, 0);
          energyBar.style.width = `${(energy / maxEnergy) * 100}%`;

          // Создаем одну монету с анимацией
          spawnCoinDrop(event);

          if (progress === maxProgress) {
            updateLeague();
            progress = 0;
            progressBar.style.width = '0%';
            localStorage.setItem('currentProgress', 0);
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
    updateEnergy(energy);
  }

  setInterval(recoverEnergy, 10); // Восстановление энергии каждые 100 мс (0.1 секунды)

  // Функция обновления счета
  function updateScore(newScore) {
    // Обновляем все элементы, которые содержат класс "currentScore"
    const scoreElements = document.querySelectorAll('.currentScore');
    scoreElements.forEach((element) => {
      element.innerText = newScore; // Обновляем значение
    });

    localStorage.setItem('currentScore', newScore); // Сохраняем в localStorage
  }

  // Функция обновления энергии
  function updateEnergy(newEnergy) {
    energyBar.style.width = `${(newEnergy / maxEnergy) * 100}%`;
    localStorage.setItem('currentEnergy', newEnergy);
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
        progressLabel.innerText = 'Мистическая деревня';
        leagueLevel = 0;
        clicksPerLevel = 10;
        backgroundImage = '/static/images/hogwarts.png'; // Укажите путь к фону Бронзовой лиги
    }

  // Устанавливаем фон с нужным размером
    body.style.backgroundImage = `url("${backgroundImage}")`; // Используем правильный синтаксис
    body.style.backgroundSize = 'cover'; // Растягиваем фон на весь экран
    body.style.backgroundPosition = 'center'; // Центрируем фон
    body.style.backgroundAttachment = 'fixed'; // Фиксируем фон при прокрутке (опционально)

    // Сохраняем фон в localStorage
    localStorage.setItem('backgroundImage', backgroundImage);
}
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