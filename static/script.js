document.addEventListener('DOMContentLoaded', () => {
  const clickButton = document.getElementById('clickButton');
  const currentScoreElement = document.querySelector('.currentScore');
  const progressBar = document.querySelector('#progressBar');
  const progressLabel = document.querySelector('#progressLabel');
  const energyDisplay = document.querySelector('#energyDisplay'); // Элемент для отображения энергии
  const coinContainer = document.querySelector('#coinContainer');

  let progress = 0;
  const maxProgress = 100;
  let leagueLevel = 0;
  let clicksPerLevel = 10;

  // Сделаем energy и maxEnergy глобальными переменными через window
  window.energy = parseInt(localStorage.getItem('currentEnergy'), 10) || 100;
  window.maxEnergy = parseInt(localStorage.getItem('maxEnergy'), 10) || 100;
  const energyCost = 10;

  // Инициализация глобальной переменной для скорости восстановления энергии
  window.energyRecoveryRate = parseInt(localStorage.getItem('energyRecoveryRate'), 10) || 5;

  window.coinsPerClick = 1;  // Глобальная переменная для монет за клик

  // Загрузка сохраненных данных
  const savedCoinsPerClick = localStorage.getItem('coinsPerClick');
  if (savedCoinsPerClick) {
    window.coinsPerClick = parseInt(savedCoinsPerClick, 10);
  }

  const savedLeagueLevel = localStorage.getItem('leagueLevel');
  if (savedLeagueLevel !== null) {
    leagueLevel = parseInt(savedLeagueLevel, 10);
    setLeagueBackground(leagueLevel);
  }

  const savedEnergy = localStorage.getItem('currentEnergy');
  if (savedEnergy !== null) {
    window.energy = parseInt(savedEnergy, 10);
    energyDisplay.textContent = `${Math.round(window.energy)}/${window.maxEnergy}`; // Отображаем текущую энергию как целое число
  }

  const savedProgress = localStorage.getItem('currentProgress');
  if (savedProgress !== null) {
    progress = parseFloat(savedProgress);
    progressBar.style.width = `${progress}%`;
  }

  // Установка героя
  const savedCharacterImg = localStorage.getItem('selectedCharacterImg');
  if (savedCharacterImg) {
    clickButton.src = savedCharacterImg;
  }

window.updateClickButtonImage = (imgSrc) => {
  const clickButton = document.getElementById('clickButton');
  if (clickButton) {
    clickButton.src = imgSrc;
  }
};

  // Обновление глобальной переменной coinsPerClick и ее отображения
  window.updateCoinsPerClick = (newCoinsPerClick) => {
    window.coinsPerClick = newCoinsPerClick;
    localStorage.setItem('coinsPerClick', newCoinsPerClick);

    const coinsPerClickDisplay = document.getElementById('coinsPerClickDisplay');
    if (coinsPerClickDisplay) {
      coinsPerClickDisplay.textContent = `Монет за клик: ${window.coinsPerClick}`;
    }
  };

  // Экспортируем глобальные функции
  window.updateEnergyRecoveryRate = (newRate) => {
    window.energyRecoveryRate = newRate;
    localStorage.setItem('energyRecoveryRate', newRate);

    const energyRecoveryRateDisplay = document.getElementById('energyRecoveryRateDisplay');
    if (energyRecoveryRateDisplay) {
      energyRecoveryRateDisplay.textContent = `Скорость восстановления энергии: ${newRate}`;
    }
  };

  // Восстановление энергии
  function recoverEnergy() {
    const recoveryRate = window.energyRecoveryRate; // Получаем актуальное значение
    window.energy = Math.min(window.energy + recoveryRate / 10, window.maxEnergy); // Ограничиваем восстановленную энергию maxEnergy
    energyDisplay.textContent = `${Math.round(window.energy)}/${window.maxEnergy}`; // Обновляем отображение энергии
  }

  setInterval(recoverEnergy, 50); // Восстановление энергии каждые 50 мс

  // Кликер
  clickButton.onclick = async (event) => {
    if (window.energy >= energyCost) {
      try {
        const response = await fetch('/click', { method: 'POST' });
        const data = await response.json();

        if (data.success) {
          let score = parseInt(currentScoreElement.innerText) || 0;

          // Используем актуальное значение window.coinsPerClick
          score += window.coinsPerClick;  // Вместо coinsPerClick используем window.coinsPerClick
          updateScore(score);

          // Увеличиваем прогресс в зависимости от window.coinsPerClick
          const progressIncrement = (maxProgress / clicksPerLevel) * window.coinsPerClick;
          progress = Math.min(progress + progressIncrement, maxProgress);
          progressBar.style.width = `${progress}%`;
          localStorage.setItem('currentProgress', progress);

          window.energy = Math.max(window.energy - energyCost, 0);
          energyDisplay.textContent = `${Math.round(window.energy)}/${window.maxEnergy}`; // Обновляем отображение энергии

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

  // Функция обновления счета
  function updateScore(newScore) {
    const scoreElements = document.querySelectorAll('.currentScore');
    scoreElements.forEach((element) => {
      element.innerText = newScore;
    });

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
        clicksPerLevel = 5;
        backgroundImage = '/static/images/ice.png'; // Укажите путь к фону Серебряной лиги
        break;
      case 2:
        progressLabel.innerText = 'Адский мир';
        clicksPerLevel = 6;
        backgroundImage = '/static/images/ad.png'; // Укажите путь к фону Золотой лиги
        break;
      case 3:
        progressLabel.innerText = 'Китай';
        clicksPerLevel = 7;
        backgroundImage = '/static/images/china.png'; // Укажите путь к фону Алмазной лиги
        break;
      case 4:
        progressLabel.innerText = 'Водный мир';
        clicksPerLevel = 8;
        backgroundImage = '/static/images/water_world.png'; // Укажите путь к фону Алмазной лиги
        break;
      case 5:
        progressLabel.innerText = 'Мистика';
        clicksPerLevel = 8;
        backgroundImage = '/static/images/mystical.png'; // Укажите путь к фону Алмазной лиги
        break;
      case 6:
        progressLabel.innerText = 'Кубический мир';
        clicksPerLevel = 10;
        backgroundImage = '/static/images/minecraft.png'; // Укажите путь к фону Алмазной лиги
        break;
      case 7:
        progressLabel.innerText = 'Тьма';
        clicksPerLevel = 11;
        backgroundImage = '/static/images/dark.png'; // Укажите путь к фону Алмазной лиги
        break;
      case 8:
        progressLabel.innerText = 'Космос';
        clicksPerLevel = 12;
        backgroundImage = '/static/images/cosmos.png'; // Укажите путь к фону Алмазной лиги
        break;
      case 9:
        progressLabel.innerText = 'Темнота';
        clicksPerLevel = 13;
        backgroundImage = '/static/images/dark_2.png'; // Укажите путь к фону Алмазной лиги
        break;
      case 10:
        progressLabel.innerText = 'НЛО';
        clicksPerLevel = 14;
        backgroundImage = '/static/images/plat.png'; // Укажите путь к фону Алмазной лиги
        break;
      default:
        progressLabel.innerText = 'Деревня';
        leagueLevel = 0;
        clicksPerLevel = 5;
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
