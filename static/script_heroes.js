document.addEventListener('DOMContentLoaded', () => {
  const characters = document.querySelectorAll('.character');
  const preview = document.getElementById('preview');
  const previewImg = preview.querySelector('img');
  const previewName = document.getElementById('preview-name');
  const buyButton = document.getElementById('buy-button');
  const priceValue = document.getElementById('price-value');
  const currentScoreElement = document.getElementById('currentScore');

  let currentPreviewCharacter = null; // Персонаж, который сейчас показывается
  let purchasedCharacter = null; // Персонаж, который куплен и сохранен

  // Загружаем сохраненный персонаж, если он куплен
  const savedCharacterId = localStorage.getItem('selectedCharacter');
  const savedCharacterImg = localStorage.getItem('selectedCharacterImg');
  const savedCharacterName = localStorage.getItem('selectedCharacterName');

  if (savedCharacterId && savedCharacterImg && savedCharacterName) {
    // Если персонаж сохранен, показываем его
    previewImg.src = savedCharacterImg;
    previewName.textContent = savedCharacterName;

    const savedCharacterElement = document.querySelector(`.character[data-id="${savedCharacterId}"]`);
    if (savedCharacterElement) {
      savedCharacterElement.classList.add('selected');
      purchasedCharacter = savedCharacterElement;
    }
  }

  // Переключение персонажей для предпросмотра
  characters.forEach(character => {
    character.addEventListener('click', () => {
      const imgSrc = character.getAttribute('data-img');
      const name = character.getAttribute('data-name');
      const price = character.getAttribute('data-price');

      // Обновляем предпросмотр
      previewImg.src = imgSrc;
      previewName.textContent = name;
      priceValue.textContent = price;

      // Снимаем выделение с предыдущего предпросматриваемого персонажа
      if (currentPreviewCharacter) {
        currentPreviewCharacter.classList.remove('selected');
      }

      // Выделяем текущего персонажа
      character.classList.add('selected');
      currentPreviewCharacter = character;
    });
  });

  // Покупка персонажа
  buyButton.addEventListener('click', () => {
    if (!currentPreviewCharacter) {
      alert('Выберите персонажа перед покупкой!');
      return;
    }

    const price = parseInt(currentPreviewCharacter.getAttribute('data-price'), 10);
    const currentScore = parseInt(currentScoreElement.textContent, 10);

    if (isNaN(price)) {
      alert('У выбранного персонажа некорректная цена!');
      return;
    }

    if (currentScore < price) {
      alert('У вас недостаточно монет для покупки этого персонажа.');
      return;
    }

    // Списываем монеты
    currentScoreElement.textContent = currentScore - price;

    // Сохраняем выбранного персонажа
    const imgSrc = currentPreviewCharacter.getAttribute('data-img');
    const name = currentPreviewCharacter.getAttribute('data-name');
    const characterId = currentPreviewCharacter.getAttribute('data-id');

    localStorage.setItem('selectedCharacter', characterId);
    localStorage.setItem('selectedCharacterImg', imgSrc);
    localStorage.setItem('selectedCharacterName', name);

    // Устанавливаем купленного персонажа
    if (purchasedCharacter) {
      purchasedCharacter.classList.remove('selected');
    }
    purchasedCharacter = currentPreviewCharacter;

    alert(`Вы купили персонажа "${name}" за ${price} монет!`);
  });
});
