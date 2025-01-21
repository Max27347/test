document.addEventListener('DOMContentLoaded', () => {
  const clickButton = document.getElementById('clickButton');
  const currentScoreElement = document.querySelector('.currentScore');
  const progressBar = document.querySelector('#progressBar');
  const progressLabel = document.querySelector('#progressLabel');
  const energyStatus = document.querySelector('.energy-status');  // Новый контейнер для отображения энергии
  const coinContainer = document.querySelector('#coinContainer');

  let progress = 0;
  const maxProgress = 100;
  let leagueLevel = 0;
  let clicksPerLevel = 10;

  // Загрузка значений энергии из localStorage
  let energy = parseInt(localStorage.getItem('currentEnergy'), 10) || 100;  // Текущая энергия
  let maxEnergy = parseInt(localStorage.getItem('maxEnergy'), 10) || 100;  // Максимальная энергия
  const energyCost = 10;

  // Инициализация глобальных переменных
  window.currentEnergyLabel = document.getElementById('currentEnergyLabel');
  window.maxEnergyLabel = document.getElementById('maxEnergyLabel');

  // Инициализация глобальной переменной для скорости восстановления энергии
  window.energyRecoveryRate = parseInt(localStorage.getItem('energyRecoveryRate'), 10) || 5;

  let coinsPerClick = 1;  // Глобальная переменная для монет за клик

  // Загрузка сохраненных данных
  const savedCoinsPerClick = localStorage.getItem('coinsPerClick');
  if (savedCoinsPerClick) {
    coinsPerClick = parseInt(savedCoinsPerClick, 10);
  }

  const savedLeagueLevel = localStorage.getItem('leagueLevel');
  if (savedLeagueLevel !== null) {
    leagueLevel = parseInt(savedLeagueLevel, 10);
    setLeagueBackground(leagueLevel);
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

  // Обновление глобальной переменной coinsPerClick и ее отображения
  window.updateCoinsPerClick = (newCoinsPerClick) => {
    coinsPerClick = newCoinsPerClick;
    localStorage.setItem('coinsPerClick', newCoinsPerClick);

    const coinsPerClickDisplay = document.getElementById('coinsPerClickDisplay');
    if (coinsPerClickDisplay) {
      coinsPerClickDisplay.textContent = `Монет за клик: ${coinsPerClick}`;
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

  window.updateEnergy = (newEnergy) => {
    energy = Math.min(newEnergy, maxEnergy); // Обновление текущей энергии, не превышая максимальную
    localStorage.setItem('currentEnergy', energy); // Сохраняем значение в localStorage
    updateEnergyStatus();  // Обновляем отображение энергии
  };

  clickButton.onclick = async (event) => {
    if (energy >= energyCost) {
      try {
        const response = await fetch('/click', { method: 'POST' });
        const data = await response.json();

        if (data.success) {
          let score = parseInt(currentScoreElement.innerText) || 0;

          // Используем актуальное значение coinsPerClick
          score += window.coinsPerClick;  // Вместо coinsPerClick используем global window.coinsPerClick
          updateScore(score);

          // Увеличиваем прогресс в зависимости от coinsPerClick
          const progressIncrement = (maxProgress / clicksPerLevel) * window.coinsPerClick;
          progress = Math.min(progress + progressIncrement, maxProgress);
          progressBar.style.width = `${progress}%`;
          localStorage.setItem('currentProgress', progress);

          energy = Math.max(energy - energyCost, 0);
          updateEnergyStatus();  // Обновляем отображение энергии

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
        backgroundImage = '/static/images/ice.png';
        break;
      case 2:
        progressLabel.innerText = 'Адский мир';
        clicksPerLevel = 6;
        backgroundImage = '/static/images/ad.png';
        break;
      case 3:
        progressLabel.innerText = 'Китай';
        clicksPerLevel = 7;
        backgroundImage = '/static/images/china.png';
        break;
      case 4:
        progressLabel.innerText = 'Водный мир';
        clicksPerLevel = 8;
        backgroundImage = '/static/images/water_world.png';
        break;
      case 5:
        progressLabel.innerText = 'Мистика';
        clicksPerLevel = 8;
        backgroundImage = '/static/images/mystical.png';
        break;
      case 6:
        progressLabel.innerText = 'Кубический мир';
        clicksPerLevel = 10;
        backgroundImage = '/static/images/minecraft.png';
        break;
      case 7:
        progressLabel.innerText = 'Тьма';
        clicksPerLevel = 11;
        backgroundImage = '/static/images/dark.png';
        break;
      case 8:
        progressLabel.innerText = 'Космос';
        clicksPerLevel = 12;
        backgroundImage = '/static/images/cosmos.png';
        break;
      case 9:
        progressLabel.innerText = 'Темнота';
        clicksPerLevel = 13;
        backgroundImage = '/static/images/dark_2.png';
        break;
      case 10:
        progressLabel.innerText = 'НЛО';
        clicksPerLevel = 14;
        backgroundImage = '/static/images/plat.png';
        break;
      default:
        progressLabel.innerText = 'Мистическая деревня';
        leagueLevel = 0;
        clicksPerLevel = 5;
        backgroundImage = '/static/images/hogwarts.png';
    }

    body.style.backgroundImage = `url("${backgroundImage}")`;
    body.style.backgroundSize = 'cover';
    body.style.backgroundPosition = 'center';
    body.style.backgroundAttachment = 'fixed';

    localStorage.setItem('backgroundImage', backgroundImage);
  }

  // Функция обновления отображения энергии
  function updateEnergyStatus() {
    const currentEnergyLabel = document.getElementById('currentEnergyLabel');
    const maxEnergyLabel = document.getElementById('maxEnergyLabel');

    // Округляем текущую энергию до целого числа
    const currentEnergyFormatted = Math.floor(energy); // Используем Math.floor для округления

    // Обновляем отображение энергии
    if (window.currentEnergyLabel && window.maxEnergyLabel) {
      window.currentEnergyLabel.textContent = `${currentEnergyFormatted}`;
      window.maxEnergyLabel.textContent = `/${maxEnergy}`;
    }
  }

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

