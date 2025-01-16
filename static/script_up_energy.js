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
  const currentScoreElements3 = document.querySelectorAll('.currentScore'); // Все элементы для отображения текущего баланса монет
  const energyBar = document.querySelector('.energy-bar'); // Элемент прогресс-бара

  // Добавляем сообщение на страницу
  upgradeMessage3.classList.add('upgrade-message');
  upgradeMessage3.style.display = 'none'; // Изначально скрыто
  document.body.appendChild(upgradeMessage3);

  // Восстановление значений из localStorage
  let maxEnergy = parseInt(localStorage.getItem('maxEnergy')) || 100; // Максимальный запас энергии
  let energyLevel = parseInt(localStorage.getItem('energyLevel')) || 1; // Уровень энергии
  let energy = parseInt(localStorage.getItem('currentEnergy')) || 100; // Текущее количество энергии
  const maxEnergyLevel = 10; // Максимальный уровень энергии

  // Массив цен для каждого уровня улучшения энергии
  const upgradePricesEnergy = [2000, 5000, 15000, 30000, 70000, 150000, 300000, 500000, 800000];

  // Функция обновления отображения уровня энергии и стоимости
  function updateEnergyDetails() {
    itemDetails3.textContent = `${maxEnergy} • Уровень ${energyLevel}`;

    // Если уровень не превышает максимальный, показываем цену для следующего уровня
    if (energyLevel < maxEnergyLevel) {
      coinElement3.textContent = upgradePricesEnergy[energyLevel - 1]; // Устанавливаем цену для текущего уровня
    } else {
      coinElement3.textContent = "Максимум"; // Устанавливаем текст "Максимум", если достигнут максимальный уровень
    }
  }

  updateEnergyDetails(); // Первоначальное обновление

  // Функция обновления энергии
  function updateEnergy(newEnergy) {
    energy = newEnergy;
    localStorage.setItem('currentEnergy', newEnergy); // Сохраняем в localStorage

    // Обновляем прогресс-бар
    energyBar.style.width = `${(newEnergy / maxEnergy) * 100}%`;

    // Выводим текущую энергию (например, в консоль или на странице)
    console.log(`Текущая энергия: ${newEnergy}`);
  }

  // Обработка нажатия кнопки улучшения энергии
  upgradeButton3.addEventListener('click', () => {
    const currentPriceEnergy = upgradePricesEnergy[energyLevel - 1]; // Цена для текущего уровня улучшения энергии

    // Проверяем, есть ли достаточно средств для улучшения (проверка баланса)
    const currentScore = parseInt(localStorage.getItem('currentScore')) || 0;

    if (energyLevel < maxEnergyLevel) { // Если уровень не максимальный
      if (currentScore >= currentPriceEnergy) { // Проверяем наличие достаточно средств
        energyLevel++; // Увеличиваем уровень
        maxEnergy += 50; // Увеличиваем максимальный запас энергии (например, на 50 за уровень)
        energy = maxEnergy; // Устанавливаем текущую энергию на максимальный уровень
        localStorage.setItem('energyLevel', energyLevel); // Сохраняем уровень в localStorage
        localStorage.setItem('maxEnergy', maxEnergy); // Сохраняем максимальную энергию в localStorage
        localStorage.setItem('currentScore', currentScore - currentPriceEnergy); // Списываем монеты
        localStorage.setItem('currentEnergy', energy); // Сохраняем текущую энергию

        // Обновляем текст в элементе <p class="item-details_3">
        updateEnergyDetails();

        // Обновляем текст в блоке отображения монет на всех элементах
        updateScore(currentScore - currentPriceEnergy);

        // Отображаем сообщение
        upgradeMessage3.innerText = `Максимальная энергия увеличена до ${maxEnergy}!`;
        upgradeMessage3.style.display = 'block'; // Показываем сообщение

        // Через 1.5 секунды скрываем сообщение
        setTimeout(() => {
          upgradeMessage3.style.display = 'none';
        }, 1500);

        // Закрываем окно улучшения и скрываем оверлей
        containerUpBuy3.style.display = 'none';
        overlay3.style.display = 'none';

        // Обновляем прогресс-бар
        updateEnergy(energy);
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
    console.log('Клик по item_up3!'); // Логирование для отладки
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

  // Функция обновления счета на всех элементах с классом "currentScore"
  function updateScore(newScore) {
    currentScoreElements3.forEach((element) => {
      element.innerText = newScore; // Обновляем значение
    });

    localStorage.setItem('currentScore', newScore); // Сохраняем в localStorage
  }
});
