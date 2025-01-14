let energy = 100; // Текущая энергия
const maxEnergy = 100; // Максимальная энергия

document.addEventListener('DOMContentLoaded', () => {
  // Найти элементы
  const itemUp3 = document.querySelector('.item_up3');
  const containerUpBuy3 = document.querySelector('.container_up_buy_3');
  const overlay3 = document.querySelector('.overlay_3');
  const closeButton3 = document.querySelector('.close-button_3');
  const upgradeButton3 = document.querySelector('.upgrade-button_3');
  const upgradeMessage3 = document.createElement('div'); // Сообщение
  const itemDetails3 = document.querySelector('.item_up3 .item-details_3'); // Поле для обновления
  const coinElement3 = document.querySelector('.coin_up3'); // Элемент для отображения цены улучшения
  const currentScoreElement = document.getElementById('currentScore'); // Элемент для отображения текущего баланса монет

  // Добавляем сообщение на страницу
  upgradeMessage3.classList.add('upgrade-message');
  upgradeMessage3.style.display = 'none'; // Изначально скрыто
  document.body.appendChild(upgradeMessage3);

  // Восстановление значений из localStorage
  let energyLevel = parseInt(localStorage.getItem('energyLevel')) || 1; // Уровень энергии
  let currentEnergy = parseInt(localStorage.getItem('currentEnergy')) || 100; // Текущая энергия
  const maxEnergyLevel = 5; // Максимальный уровень энергии

  // Массив цен для каждого уровня
  const upgradePricesEnergy = [500, 2000, 8000, 30000];

  // Функция обновления отображения уровня и стоимости
  function updateEnergyDetails() {
    itemDetails3.textContent = `${currentEnergy} • Уровень ${energyLevel}`;

    // Если уровень не превышает максимальный, показываем цену для следующего уровня
    if (energyLevel < maxEnergyLevel) {
      coinElement3.textContent = upgradePricesEnergy[energyLevel - 1]; // Устанавливаем цену для текущего уровня
    } else {
      coinElement3.textContent = "Максимум"; // Устанавливаем текст "Максимум", если достигнут максимальный уровень
    }
  }

  updateEnergyDetails(); // Первоначальное обновление

  // Обработка нажатия кнопки улучшения
  upgradeButton3.addEventListener('click', () => {
    const currentPrice = upgradePricesEnergy[energyLevel - 1]; // Цена для текущего уровня

    // Проверяем, есть ли достаточно средств для улучшения (проверка баланса)
    const currentScore = parseInt(localStorage.getItem('currentScore')) || 0;

    if (energyLevel < maxEnergyLevel) { // Если уровень не максимальный
      if (currentScore >= currentPrice) { // Проверяем наличие достаточно средств
        energyLevel++; // Увеличиваем уровень
        currentEnergy += 50; // Увеличиваем энергию
        localStorage.setItem('energyLevel', energyLevel); // Сохраняем уровень в localStorage
        localStorage.setItem('currentEnergy', currentEnergy); // Сохраняем текущую энергию
        localStorage.setItem('currentScore', currentScore - currentPrice); // Списываем монеты

        // Обновляем текст в элементе <p class="item-details_3">
        updateEnergyDetails();

        // Обновляем текст в блоке отображения монет на странице
        currentScoreElement.innerText = currentScore - currentPrice;

        // Отображаем сообщение
        upgradeMessage3.innerText = `Энергия увеличена до ${currentEnergy}!`;
        upgradeMessage3.style.display = 'block'; // Показываем сообщение

        // Через 1.5 секунды скрываем сообщение
        setTimeout(() => {
          upgradeMessage3.style.display = 'none';
        }, 1500);

        // Закрываем окно улучшения
        containerUpBuy3.style.display = 'none';
        overlay3.style.display = 'none';
      } else {
        // Если недостаточно средств
        upgradeMessage3.innerText = 'У вас недостаточно средств для улучшения!';
        upgradeMessage3.style.display = 'block';

        setTimeout(() => {
          upgradeMessage3.style.display = 'none';
        }, 1500);
      }
    } else {
      // Если достигнут максимальный уровень, выводим сообщение
      upgradeMessage3.innerText = 'Вы достигли максимального уровня!';
      upgradeMessage3.style.display = 'block';

      setTimeout(() => {
        upgradeMessage3.style.display = 'none';
      }, 1500);
    }
  });

  // Открытие окна улучшений (item_up3)
  itemUp3.addEventListener('click', () => {
    containerUpBuy3.style.display = 'block';
    overlay3.style.display = 'block';
  });

  // Закрытие окна улучшений
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
