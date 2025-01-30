document.addEventListener('DOMContentLoaded', () => {
  const characters = document.querySelectorAll('.character');
  const preview = document.getElementById('preview');
  const previewImg = preview.querySelector('img');
  const previewName = document.getElementById('preview-name');
  const characterDescription = document.getElementById('character-description');
  const selectButton = document.getElementById('select-button');

  let currentPreviewCharacter = null;
  let selectedCharacter = null;

  // Загрузка разблокированных персонажей из localStorage
  let unlockedHeroes = JSON.parse(localStorage.getItem('unlockedHeroes')) || ["cot"]; // По умолчанию открыт первый герой

  // Обновление доступности персонажей
  function updateCharacterAvailability() {
    characters.forEach((character) => {
      const characterId = character.getAttribute('data-id');

      if (unlockedHeroes.includes(characterId)) {
        character.classList.remove('locked');  // Разблокируем персонажа
        character.removeAttribute('data-locked');
      } else {
        character.classList.add('locked');  // Блокируем персонажа
        character.setAttribute('data-locked', 'true');
      }
    });
  }

  // Инициализация доступности персонажей при загрузке страницы
  updateCharacterAvailability();

  // Загружаем сохраненного персонажа, если он есть
  const savedCharacterId = localStorage.getItem('selectedCharacter');
  const savedCharacterImg = localStorage.getItem('selectedCharacterImg');
  const savedCharacterName = localStorage.getItem('selectedCharacterName');
  const savedCharacterDescription = localStorage.getItem('selectedCharacterDescription');

  if (savedCharacterId && savedCharacterImg && savedCharacterName && savedCharacterDescription) {
    previewImg.src = savedCharacterImg;
    previewName.textContent = savedCharacterName;
    characterDescription.textContent = savedCharacterDescription;

    const savedCharacterElement = document.querySelector(`.character[data-id="${savedCharacterId}"]`);
    if (savedCharacterElement) {
      savedCharacterElement.classList.add('selected');
      selectedCharacter = savedCharacterElement;
    }
  }

  // Переключение персонажей для предпросмотра (разрешаем смотреть любых)
  characters.forEach(character => {
    character.addEventListener('click', () => {
      const imgSrc = character.getAttribute('data-img');
      const name = character.getAttribute('data-name');
      const description = character.getAttribute('data-description');

      // Обновляем предпросмотр
      previewImg.src = imgSrc;
      previewName.textContent = name;
      characterDescription.textContent = description;

      // Снимаем выделение с предыдущего предпросматриваемого персонажа
      if (currentPreviewCharacter) {
        currentPreviewCharacter.classList.remove('selected-preview');
      }

      // Выделяем текущего персонажа в предпросмотре
      character.classList.add('selected-preview');
      currentPreviewCharacter = character;
    });
  });

  // Логика выбора персонажа
  selectButton.addEventListener('click', () => {
    if (!currentPreviewCharacter) {
      alert('Выберите персонажа!');
      return;
    }

    // Если выбранный персонаж заблокирован, не даем его выбрать
    if (currentPreviewCharacter.getAttribute('data-locked') === 'true') {
      alert('Этот персонаж пока недоступен! Разблокируйте его, чтобы выбрать.');
      return;
    }

    const imgSrc = currentPreviewCharacter.getAttribute('data-img');
    const name = currentPreviewCharacter.getAttribute('data-name');
    const description = currentPreviewCharacter.getAttribute('data-description');
    const characterId = currentPreviewCharacter.getAttribute('data-id');

    // Сохраняем выбранного персонажа
    localStorage.setItem('selectedCharacter', characterId);
    localStorage.setItem('selectedCharacterImg', imgSrc);
    localStorage.setItem('selectedCharacterName', name);
    localStorage.setItem('selectedCharacterDescription', description);

    // Снимаем выделение с предыдущего выбранного персонажа
    if (selectedCharacter) {
      selectedCharacter.classList.remove('selected');
    }

    // Устанавливаем текущего как выбранного
    currentPreviewCharacter.classList.remove('selected-preview');
    currentPreviewCharacter.classList.add('selected');
    selectedCharacter = currentPreviewCharacter;

    // Обновляем изображение кнопки клика в основном скрипте
    if (window.updateClickButtonImage) {
      window.updateClickButtonImage(imgSrc);
    }
  });
});
