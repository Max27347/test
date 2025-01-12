document.addEventListener('DOMContentLoaded', () => {
  // Найти элементы
  const itemUp = document.querySelector('.item_up');
  const itemUp2 = document.querySelector('.item_up2');
  const containerUpBuy2 = document.querySelector('.container_up_buy_2');
  const overlay = document.querySelector('.overlay');
  const closeButton2 = document.querySelector('.close-button_2');
  const upgradeButton = document.querySelector('.upgrade-button_2'); // Кнопка улучшения
  const upgradeMessage = document.createElement('div'); // Сообщение
  const itemDetails = document.querySelector('.item_up2 .item-details'); // Поле для обновления
  const coinElement = document.querySelector('.coin_up'); // Элемент для отображения цены улучшения (используем класс coin_up)
  const currentScoreElement = document.getElementById('currentScore'); // Элемент для отображения текущего баланса монет

  // Добавляем сообщение на страницу
  upgradeMessage.classList.add('upgrade-message');
  upgradeMessage.style.display = 'none'; // Изначально скрыто
  document.body.appendChild(upgradeMessage);

  // Восстановление значений из localStorage
  let coinsPerClick = parseInt(localStorage.getItem('coinsPerClick')) || 1;
  let level = parseInt(localStorage.getItem('level')) || 1; // Уровень
  const maxLevel = 10; // Максимальный уровень

  // Массив цен для каждого уровня
  const upgradePrices = [1000, 5000, 20000, 100000, 400000, 1000000, 3000000, 7000000, 18000000];

  // Функция обновления отображения уровня и стоимости
  function updateLevelDetails() {
    itemDetails.textContent = `${coinsPerClick} • Уровень ${level}`;

    // Если уровень не превышает максимальный, показываем цену для следующего уровня
    if (level < maxLevel) {
      coinElement.textContent = upgradePrices[level - 1]; // Устанавливаем цену для текущего уровня
    } else {
      coinElement.textContent = "Максимум"; // Устанавливаем текст "Максимум", если достигнут максимальный уровень
    }
  }

  updateLevelDetails(); // Первоначальное обновление

  // Обработка нажатия кнопки улучшения
  upgradeButton.addEventListener('click', () => {
    const currentPrice = upgradePrices[level - 1]; // Цена для текущего уровня

    // Проверяем, есть ли достаточно средств для улучшения (проверка баланса)
    const currentScore = parseInt(localStorage.getItem('currentScore')) || 0;

    if (level < maxLevel) { // Если уровень не максимальный
      if (currentScore >= currentPrice) { // Проверяем наличие достаточно средств
        level++; // Увеличиваем уровень
        coinsPerClick = level; // Монеты за клик равны уровню
        localStorage.setItem('level', level); // Сохраняем уровень в localStorage
        localStorage.setItem('coinsPerClick', coinsPerClick); // Сохраняем монеты за клик
        localStorage.setItem('currentScore', currentScore - currentPrice); // Списываем монеты

        // Обновляем текст в элементе <p class="item-details">
        updateLevelDetails();

        // Обновляем текст в блоке отображения монет на странице
        currentScoreElement.innerText = currentScore - currentPrice;

        // Отображаем сообщение
        upgradeMessage.innerText = `Монеты за клик увеличены до ${coinsPerClick}!`;
        upgradeMessage.style.display = 'block'; // Показываем сообщение

        // Через 1.5 секунды скрываем сообщение
        setTimeout(() => {
          upgradeMessage.style.display = 'none';
        }, 1500);

        // Закрываем окно улучшения
        containerUpBuy2.style.display = 'none';
        overlay.style.display = 'none';
      } else {
        // Если недостаточно средств
        upgradeMessage.innerText = 'У вас недостаточно средств для улучшения!';
        upgradeMessage.style.display = 'block';

        setTimeout(() => {
          upgradeMessage.style.display = 'none';
        }, 1500);
      }
    } else {
      // Если достигнут максимальный уровень, выводим сообщение
      upgradeMessage.innerText = 'Вы достигли максимального уровня!';
      upgradeMessage.style.display = 'block';

      setTimeout(() => {
        upgradeMessage.style.display = 'none';
      }, 1500);
    }
  });

  // Открытие окна улучшений
  itemUp2.addEventListener('click', () => {
    containerUpBuy2.style.display = 'block';
    overlay.style.display = 'block';
  });

  // Закрытие окон
  closeButton2.addEventListener('click', () => {
    containerUpBuy2.style.display = 'none';
    overlay.style.display = 'none';
  });

  // Закрытие окна при клике на затемнение
  overlay.addEventListener('click', () => {
    containerUpBuy2.style.display = 'none';
    overlay.style.display = 'none';
  });

  // Обработчик клика для кнопки на этой странице, увеличиваем счет
  const clickButton = document.getElementById('clickButton');

  clickButton.addEventListener('click', () => {
    let currentScore = parseInt(currentScoreElement.innerText) || 0;
    currentScore += coinsPerClick;
    currentScoreElement.innerText = currentScore;
    localStorage.setItem('currentScore', currentScore);
  });
});
