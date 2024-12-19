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

document.getElementById('common-button').addEventListener('click', function() {
            // Переход на страницу page6
            window.location.href = '/page6';  // Указываем путь к странице
        });

// Обработчик клика для кнопки "Редкие"
document.getElementById('rare-button').addEventListener('click', function() {
    // Переход на страницу page9
            window.location.href = '/page9';  // Указываем путь к странице
        });

document.getElementById('premium-button').addEventListener('click', function() {
            // Переход на страницу page10
            window.location.href = '/page10';  // Указываем путь к странице
        });