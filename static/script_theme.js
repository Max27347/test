 // Функция для изменения фонового изображения
        function changeBackgroundImage(imageName) {
            const newImage = `/static/images/${imageName}`; // Путь к новому изображению
            document.body.style.backgroundImage = `url('${newImage}')`; // Устанавливаем новое изображение фона

            // Сохраняем выбранное изображение в localStorage
            localStorage.setItem('backgroundImage', newImage);
        }

        // Функция для сброса фона на стандартный
        function resetBackground() {
            document.body.style.backgroundImage = ''; // Устанавливаем пустое изображение (стандартный фон)
            localStorage.removeItem('backgroundImage'); // Удаляем сохраненное изображение из localStorage
        }

        // Проверяем наличие сохраненного изображения при загрузке страницы
        window.onload = function() {
            const savedImage = localStorage.getItem('backgroundImage');
            if (savedImage) {
                document.body.style.backgroundImage = `url('${savedImage}')`; // Устанавливаем сохраненное изображение
            }
        };






