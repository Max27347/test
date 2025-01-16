document.addEventListener('DOMContentLoaded', () => {
  // Найти элементы
  const itemUp4 = document.querySelector('.item_up4');
  const containerUpBuy4 = document.querySelector('.container_up_buy_4');
  const overlay4 = document.querySelector('.overlay_4');
  const closeButton4 = document.querySelector('.close-button_4');
  const upgradeButton4 = document.querySelector('.upgrade-button_4');
  const upgradeMessage4 = document.createElement('div'); // Сообщение
  const itemDetails4 = document.querySelector('.item_up4 .item-details_4'); // Поле для обновления
  const coinElement4 = document.querySelector('.coin_up4'); // Элемент для отображения цены улучшения
  const currentScoreElements = document.querySelectorAll('.currentScore'); // Все элементы для отображения текущего баланса монет

  // Добавляем сообщение на страницу
  upgradeMessage4.classList.add('upgrade-message');
  upgradeMessage4.style.display = 'none'; // Изначально скрыто
  document.body.appendChild(upgradeMessage4);

  // Восстановление значений из localStorage
  let energyRecoveryRate = parseInt(localStorage.getItem('energyRecoveryRate')) || 5; // Скорость восстановления
  let recoveryLevel = parseInt(localStorage.getItem('recoveryLevel')) || 1; // Уровень восстановления
  const maxRecoveryLevel = 10; // Максимальный уровень восстановления

  // Массив цен для каждого уровня
  const recoveryUpgradePrices = [2000, 8000, 30000, 120000, 500000, 1500000, 4000000, 10000000, 25000000];

  // Функция обновления отображения уровня и стоимости
  function updateRecoveryDetails() {
    itemDetails4.textContent = `${energyRecoveryRate} • Уровень ${recoveryLevel}`;

    // Если уровень не превышает максимальный, показываем цену для следующего уровня
    if (recoveryLevel < maxRecoveryLevel) {
      coinElement4.textContent = recoveryUpgradePrices[recoveryLevel - 1]; // Устанавливаем цену для текущего уровня
    } else {
      coinElement4.textContent = "Максимум"; // Устанавливаем текст "Максимум", если достигнут максимальный уровень
    }
  }

  updateRecoveryDetails(); // Первоначальное обновление

  // Обработка нажатия кнопки улучшения
  upgradeButton4.addEventListener('click', () => {
    const currentPrice = recoveryUpgradePrices[recoveryLevel - 1]; // Цена для текущего уровня

    // Проверяем, есть ли достаточно средств для улучшения (проверка баланса)
    const currentScore = parseInt(localStorage.getItem('currentScore')) || 0;

    if (recoveryLevel < maxRecoveryLevel) { // Если уровень не максимальный
      if (currentScore >= currentPrice) { // Проверяем наличие достаточно средств
        recoveryLevel++; // Увеличиваем уровень
        energyRecoveryRate += 1; // Увеличиваем скорость восстановления энергии
        localStorage.setItem('recoveryLevel', recoveryLevel); // Сохраняем уровень восстановления
        localStorage.setItem('energyRecoveryRate', energyRecoveryRate); // Сохраняем скорость восстановления
        localStorage.setItem('currentScore', currentScore - currentPrice); // Списываем монеты

        // Обновляем текст в элементе <p class="item-details_4">
        updateRecoveryDetails();

        // Обновляем текст в блоке отображения монет на всех элементах
        updateScore(currentScore - currentPrice);

        // Отображаем сообщение
        upgradeMessage4.innerText = `Скорость восстановления увеличена до ${energyRecoveryRate}!`;
        upgradeMessage4.style.display = 'block'; // Показываем сообщение

        // Через 1.5 секунды скрываем сообщение
        setTimeout(() => {
          upgradeMessage4.style.display = 'none';
        }, 1500);

        // Закрываем окно улучшения и скрываем оверлей
        containerUpBuy4.style.display = 'none';
        overlay4.style.display = 'none';
      } else {
        // Если недостаточно средств
        upgradeMessage4.innerText = 'У вас недостаточно средств для улучшения!';
        upgradeMessage4.style.display = 'block';

        setTimeout(() => {
          upgradeMessage4.style.display = 'none';
        }, 1500);
      }
    } else {
      // Если достигнут максимальный уровень, выводим сообщение
      upgradeMessage4.innerText = 'Вы достигли максимального уровня!';
      upgradeMessage4.style.display = 'block';

      setTimeout(() => {
        upgradeMessage4.style.display = 'none';
      }, 1500);
    }
  });

  // Открытие окна улучшений (item_up4)
  itemUp4.addEventListener('click', () => {
    containerUpBuy4.style.display = 'block';
    overlay4.style.display = 'block';
  });

  // Закрытие окна улучшений
  closeButton4.addEventListener('click', () => {
    containerUpBuy4.style.display = 'none';
    overlay4.style.display = 'none';
  });

  // Закрытие окна при клике на затемнение
  overlay4.addEventListener('click', () => {
    containerUpBuy4.style.display = 'none';
    overlay4.style.display = 'none';
  });

  // Функция обновления счета на всех элементах с классом "currentScore"
  function updateScore(newScore) {
    currentScoreElements.forEach((element) => {
      element.innerText = newScore; // Обновляем значение
    });

    localStorage.setItem('currentScore', newScore); // Сохраняем в localStorage
  }
});
