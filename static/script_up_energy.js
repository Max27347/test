document.addEventListener('DOMContentLoaded', () => {
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
    console.log("Обновление интерфейса:");

    // Выводим текущую энергию и максимальную энергию
    console.log(`Текущая энергия: ${energy}, Максимальная энергия: ${maxEnergy}`);

    if (itemDetails3) {
      itemDetails3.textContent = `${maxEnergy} • Уровень ${energyLevel}`;
    }

    if (coinElement3) {
      coinElement3.textContent = energyLevel < maxEnergyLevel ? upgradePricesEnergy[energyLevel - 1] : "Максимум";
    }

    // Обновляем метки энергии
    if (currentEnergyLabel) {
      currentEnergyLabel.textContent = `Текущая энергия: ${energy}`;
    } else {
      console.warn("Не найден элемент с id 'currentEnergyLabel'");
    }

    if (maxEnergyLabel) {
      maxEnergyLabel.textContent = `Максимальная энергия: ${maxEnergy}`;
    } else {
      console.warn("Не найден элемент с id 'maxEnergyLabel'");
    }
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
    // Увеличиваем уровень энергии
    energyLevel++;
    maxEnergy += 50;
    // Увеличиваем текущую энергию пропорционально новому максимуму
    energy += 50; // Или другое значение по вашему усмотрению
    // Убедимся, что текущая энергия не превышает нового максимума
    energy = Math.min(energy, maxEnergy);

        // Сохраняем изменения в localStorage
        localStorage.setItem('energyLevel', energyLevel);
        localStorage.setItem('maxEnergy', maxEnergy);
        localStorage.setItem('currentEnergy', energy);
        localStorage.setItem('currentScore', currentScore - currentPriceEnergy);

        // Обновляем интерфейс
        updateScore(currentScore - currentPriceEnergy);

        // Показ сообщения об успешном улучшении
        upgradeMessage3.textContent = `Максимальная энергия увеличена до ${maxEnergy}!`;
        upgradeMessage3.style.display = 'block';

        setTimeout(() => {
          upgradeMessage3.style.display = 'none';
        }, 1500);

        // Закрытие окна улучшения
        containerUpBuy3.style.display = 'none';
        overlay3.style.display = 'none';

        // Обновляем интерфейс с новыми значениями
        updateEnergyDetails();

        // Восстановление энергии до максимума сразу
        restoreEnergy();
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

  // Если произошли изменения в localStorage, обновляем интерфейс
  if (localStorage.getItem('currentEnergy') !== null && localStorage.getItem('maxEnergy') !== null) {
    energy = parseInt(localStorage.getItem('currentEnergy')) || maxEnergy;
    maxEnergy = parseInt(localStorage.getItem('maxEnergy')) || 100;
    energyLevel = parseInt(localStorage.getItem('energyLevel')) || 1;

    // Обновляем интерфейс в случае изменений
    updateEnergyDetails();
  }

  // Функция восстановления текущей энергии
  function restoreEnergy() {
    // Восстанавливаем текущую энергию до максимума, если она меньше максимума
    if (energy < maxEnergy) {
      energy = maxEnergy;
      localStorage.setItem('currentEnergy', energy); // Сохраняем новое значение в localStorage
      console.log("Восстановление энергии:", energy);  // Проверяем в консоли

      // Обновляем интерфейс с новой энергией
      updateEnergyDetails();
    } else {
      console.log("Энергия уже на максимуме:", energy);
    }
  }
});
// Сброс энергии до 0
localStorage.setItem('currentEnergy', 0); // Сброс текущей энергии
localStorage.setItem('maxEnergy', 100); // Установка начальной максимальной энергии (например, 100)
localStorage.setItem('energyLevel', 1); // Установка начального уровня энергии
// Обновление переменных в скрипте
energy = 0;
maxEnergy = 100; // Или любое другое начальное значение
energyLevel = 1;
// Обновление интерфейса
updateEnergyDetails(); // Обновление интерфейса с новыми значениями