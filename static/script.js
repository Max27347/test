
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".nav-button");
  const currentPath = window.location.pathname;

  // Убираем класс 'active' у всех ссылок
  links.forEach(link => {
    link.classList.remove("active");
  });

  // Применяем класс 'active' только к ссылке, которая соответствует текущему пути
  links.forEach(link => {
    const linkPath = link.getAttribute("href");

    // Проверяем, если текущий путь точно совпадает с путем ссылки или если ссылка - это главная
    if (currentPath === linkPath || (currentPath === "/" && linkPath === "/")) {
      link.classList.add("active");
    }
  });
});


document.addEventListener('DOMContentLoaded', () => {
    const clickButton = document.getElementById('clickButton');
    const currentScore = document.getElementById('currentScore');
    const progressBar = document.getElementById('progressBar');

    let score = parseInt(currentScore.innerText);

    clickButton.onclick = async () => {
        try {
            const response = await fetch('/click', { method: 'POST' });
            const data = await response.json();

            if (data.success) {
                score++;
                currentScore.innerText = score;
                let currentValue = progressBar.value; // Текущее значение прогресса

                // Уменьшаем значение полосы на 10% при каждом клике, но не меньше 0%
                if (currentValue > 0) {
                    progressBar.value = currentValue - 10;
                }

                // Проверяем, достиг ли прогресс минимума
                if (progressBar.value === 0) {
                    alert('Энергия закончилась');
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


let autoClickInterval;

        // Функция для показа кнопки автокликера
        function showAutoClickerButton() {
            document.getElementById("autoClickerButton").style.display = "block";
        }

        // Функция для автоматического нажатия на изображение
        function autoClick() {
            document.getElementById("clickButton").click();
        }

        // Запуск автокликера
        document.getElementById("autoClickerButton").onclick = function() {
            if (!autoClickInterval) {
                autoClickInterval = setInterval(autoClick, 1000); // Нажимает каждую секунду

                // Остановка автокликера через 30 секунд
                setTimeout(function() {
                    clearInterval(autoClickInterval);
                    autoClickInterval = null;
                    alert("Автокликер остановлен через 10 секунд.");
                }, 10000); // 10000 миллисекунд = 10 секунд
            }
        };

 function changeImage(imagePath) {
            const mainImage = document.getElementById('mainImage');
            mainImage.src = imagePath; // Изменяем путь к изображению на переданный
}





