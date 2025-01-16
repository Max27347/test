document.addEventListener('DOMContentLoaded', () => {
  const clickButton = document.getElementById('clickButton');
  const currentScoreElement = document.querySelector('.currentScore');
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

  // Инициализация глобальной переменной для скорости восстановления энергии
  window.energyRecoveryRate = parseInt(localStorage.getItem('energyRecoveryRate'), 10) || 5;

  let coinsPerClick = 1;

  // Загрузка сохраненных данных
  const savedCoinsPerClick = localStorage.getItem('coinsPerClick');
  if (savedCoinsPerClick) {
    coinsPerClick = parseInt(savedCoinsPerClick, 10);
  }

  const savedBackground = localStorage.getItem('backgroundImage');
  if (savedBackground) {
    document.body.style.backgroundImage = `url("${savedBackground}")`;
  }

  const savedLeagueLevel = localStorage.getItem('leagueLevel');
  if (savedLeagueLevel !== null) {
    leagueLevel = parseInt(savedLeagueLevel, 10);
    setLeagueBackground(leagueLevel);
  }

  const savedScore = localStorage.getItem('currentScore');
  if (savedScore !== null) {
    updateScore(parseInt(savedScore) || 0);
  } else {
    updateScore(0);
  }

  const savedEnergy = localStorage.getItem('currentEnergy');
  if (savedEnergy !== null) {
    energy = parseInt(savedEnergy, 10);
    energyBar.style.width = `${(energy / maxEnergy) * 100}%`;
  }

  const savedProgress = localStorage.getItem('currentProgress');
  if (savedProgress !== null) {
    progress = parseFloat(savedProgress);
    progressBar.style.width = `${progress}%`;
  }

  const savedCharacterImg = localStorage.getItem('selectedCharacterImg');
  if (savedCharacterImg) {
    clickButton.src = savedCharacterImg;
  }

  // Экспортируем глобальные функции
  window.updateEnergyRecoveryRate = (newRate) => {
    window.energyRecoveryRate = newRate;
    localStorage.setItem('energyRecoveryRate', newRate);

    const energyRecoveryRateDisplay = document.getElementById('energyRecoveryRateDisplay');
    if (energyRecoveryRateDisplay) {
      energyRecoveryRateDisplay.textContent = `Скорость восстановления энергии: ${newRate}`;
    }
  };

  window.updateEnergy = (newEnergy) => {
    energy = Math.min(newEnergy, maxEnergy);
    energyBar.style.width = `${(energy / maxEnergy) * 100}%`;
    localStorage.setItem('currentEnergy', energy);
  };

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

          const progressIncrement = maxProgress / clicksPerLevel;
          progress = Math.min(progress + progressIncrement, maxProgress);
          progressBar.style.width = `${progress}%`;
          localStorage.setItem('currentProgress', progress);

          energy = Math.max(energy - energyCost, 0);
          energyBar.style.width = `${(energy / maxEnergy) * 100}%`;

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
    }
  };

  // Восстановление энергии
  function recoverEnergy() {
    const recoveryRate = window.energyRecoveryRate; // Получаем актуальное значение
    updateEnergy(energy + recoveryRate / 10);
  }

  setInterval(recoverEnergy, 50); // Восстановление энергии каждые 50 мс

  // Функция обновления счета
  function updateScore(newScore) {
    const scoreElements = document.querySelectorAll('.currentScore');
    scoreElements.forEach((element) => {
      element.innerText = newScore;
    });

    localStorage.setItem('currentScore', newScore);
  }

  // Добавляем обработчик для кнопки увеличения скорости восстановления
  const increaseEnergyButton = document.getElementById('increaseEnergyButton');
  if (increaseEnergyButton) {
    increaseEnergyButton.addEventListener('click', () => {
      const newRate = window.energyRecoveryRate + 0;
      window.updateEnergyRecoveryRate(newRate);
    });
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
        backgroundImage = '/static/images/hogwarts.png'; // Укажите путь к начальному фону
    }
  // Устанавливаем фон с нужным размером
    body.style.backgroundImage = `url("${backgroundImage}")`; // Используем правильный синтаксис
    body.style.backgroundSize = 'cover'; // Растягиваем фон на весь экран
    body.style.backgroundPosition = 'center'; // Центрируем фон
    body.style.backgroundAttachment = 'fixed'; // Фиксируем фон при прокрутке (опционально)

    // Сохраняем фон в localStorage
    localStorage.setItem('backgroundImage', backgroundImage);
  };

  // Функция создания монеты
  const spawnCoinDrop = (event) => {
    const coin = document.createElement('div');
    coin.classList.add('coin_drop');

    const startX = event.clientX - 20;
    const startY = event.clientY - 20;

    coin.style.left = `${startX}px`;
    coin.style.top = `${startY}px`;

    coinContainer.appendChild(coin);

    coin.addEventListener('animationend', () => {
      coin.remove();
    });
  };
});



// Сброс скорости восстановления энергии до начального значения
energyRecoveryRate = 5; // Сбрасываем на начальное значение
localStorage.setItem('energyRecoveryRate', energyRecoveryRate); // Сохраняем в localStorage
console.log(`Скорость восстановления энергии сброшена до начального значения: ${energyRecoveryRate}`);
