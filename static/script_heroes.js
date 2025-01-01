document.addEventListener('DOMContentLoaded', () => {
      const characters = document.querySelectorAll('.character');
      const preview = document.getElementById('preview');
      const previewImg = preview.querySelector('img');
      const previewName = document.getElementById('preview-name');

      // Load saved character from localStorage or set default
      const savedCharacterId = localStorage.getItem('selectedCharacter') || "1";
      const savedCharacterImg = localStorage.getItem('selectedCharacterImg') || "https://via.placeholder.com/200";
      const savedCharacterName = localStorage.getItem('selectedCharacterName') || "Character 1";

      // Set default preview
      previewImg.src = savedCharacterImg;
      previewName.textContent = savedCharacterName;
      const defaultCharacter = document.querySelector(`.character[data-id="${savedCharacterId}"]`);
      if (defaultCharacter) {
        defaultCharacter.classList.add('selected');
      }

      // Add click event to show preview and select character
      characters.forEach(character => {
        character.addEventListener('click', () => {
          const imgSrc = character.getAttribute('data-img');
          const name = character.getAttribute('data-name');

          // Show preview
          previewImg.src = imgSrc;
          previewName.textContent = name;

          // Remove selected class from all characters
          characters.forEach(c => c.classList.remove('selected'));

          // Add selected class to the clicked character
          character.classList.add('selected');

          // Save the selected character to localStorage
          const characterId = character.getAttribute('data-id');
          localStorage.setItem('selectedCharacter', characterId);
          localStorage.setItem('selectedCharacterImg', imgSrc);
          localStorage.setItem('selectedCharacterName', name);
        });
      });
    });