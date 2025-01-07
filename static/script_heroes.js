document.addEventListener('DOMContentLoaded', () => {
  const characters = document.querySelectorAll('.character');
  const preview = document.getElementById('preview');
  const previewImg = preview.querySelector('img');
  const previewName = document.getElementById('preview-name');
  const characterDescription = document.getElementById('character-description');
  const selectButton = document.getElementById('select-button');

  let currentPreviewCharacter = null;
  let selectedCharacter = null;

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

  // Переключение персонажей для предпросмотра
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

    alert(`Вы выбрали персонажа "${name}"!`);
  });
});
