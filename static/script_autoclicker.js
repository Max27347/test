document.addEventListener('DOMContentLoaded', () => {
  const itemUp1 = document.querySelector('.item_up1');
  const containerUpBuy1 = document.querySelector('.container_up_buy_1');
  const overlay1 = document.querySelector('.overlay_1');
  const closeButton1 = document.querySelector('.close-button_1');
  const upgradeButton3 = document.querySelector('.upgrade-button_1');
  const upgradeMessage1 = document.createElement('div'); // Сообщение
  const itemDetails1 = document.querySelector('.item_up1 .item-details_1');
  const coinElement1 = document.querySelector('.coin_up1');
  const currentScoreElements1 = document.querySelectorAll('.currentScore');

  // Добавляем сообщение на страницу
  upgradeMessage1.classList.add('upgrade-message');
  upgradeMessage1.style.display = 'none';
  document.body.appendChild(upgradeMessage1);



  // Функция обновления счета
  function updateScore(newScore) {
    currentScoreElements1.forEach((element) => {
      element.innerText = newScore;
    });
    localStorage.setItem('currentScore', newScore); // Сохраняем баланс монет в localStorage
  }

  // Инициализация интерфейса
  updateEnergyDetails();

      // Обновляем интерфейс с новыми значениями
      updateEnergyDetails();
    } else if (energyLevel >= maxEnergyLevel) {
      // Если максимальный уровень достигнут
      upgradeMessage1.textContent = 'Вы достигли максимального уровня!';
      upgradeMessage1.style.display = 'block';

      setTimeout(() => {
        upgradeMessage1.style.display = 'none';
      }, 1500);
    } else {
      // Если недостаточно монет
      upgradeMessage1.textContent = 'У вас недостаточно средств для улучшения!';
      upgradeMessage1.style.display = 'block';

      setTimeout(() => {
        upgradeMessage1.style.display = 'none';
      }, 1500);
    }
  });

  // Открытие окна улучшения
  itemUp1.addEventListener('click', () => {
    containerUpBuy1.style.display = 'block';
    overlay1.style.display = 'block';
  });

  // Закрытие окна улучшения
  closeButton1.addEventListener('click', () => {
    containerUpBuy1.style.display = 'none';
    overlay1.style.display = 'none';
  });

  // Закрытие окна при клике на затемнение
  overlay1.addEventListener('click', () => {
    containerUpBuy1.style.display = 'none';
    overlay1.style.display = 'none';
  });

  // Обновляем интерфейс в случае изменений
  updateEnergyDetails();
});


