document.addEventListener('DOMContentLoaded', () => {
  // Найти элементы
  const itemUp3 = document.querySelector('.item_up3');
  const containerUpBuy3 = document.querySelector('.container_up_buy_3');
  const overlay3 = document.querySelector('.overlay_3');
  const closeButton3 = document.querySelector('.close-button_3');
  const upgradeButton3 = document.querySelector('.upgrade-button_3');
  const upgradeMessage3 = document.createElement('div'); // Сообщение
  const itemDetails3 = document.querySelector('.item_up3 .item-details_3');
  const coinElement3 = document.querySelector('.coin_up3');
  const currentScoreElements3 = document.querySelectorAll('.currentScore');
  const currentEnergyLabel = document.querySelector('#currentEnergyLabel'); // Текущая энергия
  const maxEnergyLabel = document.querySelector('#maxEnergyLabel'); // Максимальная энергия

  // Добавляем сообщение на страницу
  upgradeMessage3.classList.add('upgrade-message');
  upgradeMessage3.style.display = 'none';
  document.body.appendChild(upgradeMessage3);

  // Восстановление значений из localStorage
  let maxEnergy = parseInt(localStorage.getItem('maxEnergy')) || 100;
  let energyLevel = parseInt(localStorage.getItem('energyLevel')) || 1;
  let energy = parseInt(localStorage.getItem('currentEnergy')) || maxEnergy;
  const maxEnergyLevel = 5;

  // Массив цен для каждого уровня улучшения энергии
  const upgradePricesEnergy = [2000, 5000, 15000, 30000];

  // Функция обновления отображения уровня энергии и стоимости
  function updateEnergyDetails() {
    // Обновляем текст в элементе itemDetails3
    itemDetails3.textContent = `${maxEnergy} • Уровень ${energyLevel}`;
    // Обновляем цену следующего уровня
    coinElement3.textContent =
      energyLevel < maxEnergyLevel ? upgradePricesEnergy[energyLevel - 1] : "Максимум";
    // Обновляем отображение текущей и максимальной энергии
    currentEnergyLabel.textContent = `Текущая энергия: ${energy}`;
    if (maxEnergyLabel) {
      maxEnergyLabel.textContent = `Максимальная энергия: ${maxEnergy}`;
    }
  }

  // Функция обновления текущей энергии
  function updateEnergy(newEnergy) {
    energy = Math.min(newEnergy, maxEnergy); // Убедимся, что энергия не превышает максимальную
    localStorage.setItem('currentEnergy', energy); // Сохраняем текущее значение в localStorage
    updateEnergyDetails(); // Обновляем отображение
  }

  // Функция обновления счета
  function updateScore(newScore) {
    currentScoreElements3.forEach((element) => {
      element.innerText = newScore;
    });
    localStorage.setItem('currentScore', newScore); // Сохраняем баланс монет в localStorage
  }

  // Инициализация интерфейса
  updateEnergyDetails();

  // Обработка нажатия кнопки улучшения энергии
  upgradeButton3.addEventListener('click', () => {
    const currentScore = parseInt(localStorage.getItem('currentScore')) || 0;
    const currentPriceEnergy = upgradePricesEnergy[energyLevel - 1];

    if (energyLevel < maxEnergyLevel) {
      if (currentScore >= currentPriceEnergy) {
        energyLevel++;
        maxEnergy += 50; // Увеличиваем максимальный запас энергии
        energy = Math.min(energy, maxEnergy); // Устанавливаем текущую энергию на максимум или оставляем прежнее значение, если оно меньше

        // Сохраняем изменения в localStorage
        localStorage.setItem('energyLevel', energyLevel);
        localStorage.setItem('maxEnergy', maxEnergy);
        localStorage.setItem('currentScore', currentScore - currentPriceEnergy);
        localStorage.setItem('currentEnergy', energy);

        // Обновляем интерфейс
        updateScore(currentScore - currentPriceEnergy);
        updateEnergyDetails(); // Обновляем сразу все

        // Немедленно обновляем максимальную энергию в интерфейсе
        if (maxEnergyLabel) {
          maxEnergyLabel.textContent = `Максимальная энергия: ${maxEnergy}`;
        }

        // Показ сообщения об успешном улучшении
        upgradeMessage3.textContent = `Максимальная энергия увеличена до ${maxEnergy}!`;
        upgradeMessage3.style.display = 'block';

        setTimeout(() => {
          upgradeMessage3.style.display = 'none';
        }, 1500);

        // Закрытие окна улучшения
        containerUpBuy3.style.display = 'none';
        overlay3.style.display = 'none';
      } else {
        // Если недостаточно монет
        upgradeMessage3.textContent = 'У вас недостаточно средств для улучшения!';
        upgradeMessage3.style.display = 'block';

        setTimeout(() => {
          upgradeMessage3.style.display = 'none';
        }, 1500);
      }
    } else {
      // Если максимальный уровень достигнут
      upgradeMessage3.textContent = 'Вы достигли максимального уровня!';
      upgradeMessage3.style.display = 'block';

      setTimeout(() => {
        upgradeMessage3.style.display = 'none';
      }, 1500);
    }
  });

  // Открытие окна улучшения
  itemUp3.addEventListener('click', () => {
    containerUpBuy3.style.display = 'block';
    overlay3.style.display = 'block';
  });

  // Закрытие окна улучшения
  closeButton3.addEventListener('click', () => {
    containerUpBuy3.style.display = 'none';
    overlay3.style.display = 'none';
  });

  // Закрытие окна при клике на затемнение
  overlay3.addEventListener('click', () => {
    containerUpBuy3.style.display = 'none';
    overlay3.style.display = 'none';
  });
});
