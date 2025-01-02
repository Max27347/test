document.addEventListener('DOMContentLoaded', () => {
  const characters = document.querySelectorAll('.character');
  const preview = document.getElementById('preview');
  const previewImg = preview.querySelector('img');
  const previewName = document.getElementById('preview-name');
  const selectButton = document.getElementById('select-button');

  let currentPreviewCharacter = null;
  let selectedCharacter = null;

  // Загружаем сохраненного персонажа, если он есть
  const savedCharacterId = localStorage.getItem('selectedCharacter');
  const savedCharacterImg = localStorage.getItem('selectedCharacterImg');
  const savedCharacterName = localStorage.getItem('selectedCharacterName');

  if (savedCharacterId && savedCharacterImg && savedCharacterName) {
    previewImg.src = savedCharacterImg;
    previewName.textContent = savedCharacterName;

    const savedCharacterElement = document.querySelector(`.character[data-id="${savedCharacterId}"]`);
    if (savedCharacterElement) {
      savedCharacterElement.classList.add('selected');
      selectedCharacter = savedCharacterElement;
    }
  }

  // Переключение персонажей для предпросмотра
  characters.forEach(character => {
    character.addEventListener('click', () => {
      const imgSrc = character.getAttribute('data-img');
      const name = character.getAttribute('data-name');

      // Обновляем предпросмотр
      previewImg.src = imgSrc;
      previewName.textContent = name;

      // Снимаем выделение с предыдущего персонажа в предпросмотре
      if (currentPreviewCharacter) {
        currentPreviewCharacter.classList.remove('selected');
      }

      // Выделяем текущего персонажа
      character.classList.add('selected');
      currentPreviewCharacter = character;
    });
  });

  // Логика выбора персонажа
  selectButton.addEventListener('click', () => {
    if (!currentPreviewCharacter) {
      alert('Выберите персонажа!');
      return;
    }

    const imgSrc = currentPreviewCharacter.getAttribute('data-img');
    const name = currentPreviewCharacter.getAttribute('data-name');
    const characterId = currentPreviewCharacter.getAttribute('data-id');

    // Сохраняем выбранного персонажа
    localStorage.setItem('selectedCharacter', characterId);
    localStorage.setItem('selectedCharacterImg', imgSrc);
    localStorage.setItem('selectedCharacterName', name);

    // Обновляем визуальное выделение
    if (selectedCharacter) {
      selectedCharacter.classList.remove('selected');
    }
    selectedCharacter = currentPreviewCharacter;

    alert(`Вы выбрали персонажа "${name}"!`);
  });
});
