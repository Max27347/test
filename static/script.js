document.addEventListener("DOMContentLoaded", function() {
    const clickButton = document.getElementById("clickButton");
    const currentScore = document.getElementById("currentScore");
    const progressBar = document.getElementById('progress-bar');

    let score = parseInt(currentScore.innerText);

    clickButton.onclick = async () => {
        try {
            const response = await fetch('/click', {method: 'POST'});
            const data = await response.json();

            if (data.success) {
                score++;
                currentScore.innerText = score;
                let currentValue = progressBar.value; // Текущее значение прогресса

                // Увеличиваем значение полосы на 10% при каждом клике, но не больше 100%
                if (currentValue < 100) {
                    progressBar.value = currentValue + 10;
                }

                // Проверяем, достиг ли прогресс максимума
                if (progressBar.value === 100) {
                    alert('Прогресс завершён!');
                }
            }
        } catch (error) {
            console.error("Ошибка при обновлении счета:", error);
        }
    };
});

// Получаем элементы
const menuIcon = document.getElementById('menu-icon');
const dropdownMenu = document.getElementById('dropdown-menu');

// Переключение видимости меню при клике на картинку
menuIcon.addEventListener('click', (event) => {
    event.stopPropagation(); // Предотвращаем всплытие события
    dropdownMenu.classList.toggle('active');
});

// Закрываем меню, если кликнули вне его
document.addEventListener('click', (event) => {
    if (!menuIcon.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.classList.remove('active');
    }
});

function changeBackgroundImage() {
            document.body.style.backgroundImage = "url('/static/images/theme_2.png')"; // Устанавливаем новое изображение фона
        }