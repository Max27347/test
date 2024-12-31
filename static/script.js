
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
    const currentScoreElement = document.getElementById('currentScore');
    const imageTextElement = document.querySelector('.image-text');

    // Загружаем сохраненное значение счета
    const savedScore = localStorage.getItem('currentScore');
    if (savedScore) {
        updateScore(parseInt(savedScore)); // Устанавливаем сохраненное значение
    } else {
        updateScore(0); // Устанавливаем начальное значение
    }

    // Загружаем сохраненный текст
    const savedImageText = localStorage.getItem('imageText');
    if (savedImageText) {
        updateImageText(savedImageText); // Устанавливаем сохраненный текст
    } else {
        updateImageText('0'); // Устанавливаем начальное значение
    }

    clickButton.onclick = async () => {
        try {
            const response = await fetch('/click', { method: 'POST' });
            const data = await response.json();

            if (data.success) {
                let score = parseInt(currentScoreElement.innerText);
                score++;
                updateScore(score);

                // Обновляем текст в элементе с классом image-text
                updateImageText(score);

                // Другие действия...
            }
        } catch (error) {
            console.error("Ошибка при обновлении счета:", error);
        }
    };
});

function updateScore(newScore) {
    const currentScoreElement = document.getElementById('currentScore');
    currentScoreElement.innerText = newScore;

    // Сохраняем текущее значение счета в localStorage
    localStorage.setItem('currentScore', newScore);
}

function updateImageText(newText) {
    const imageTextElement = document.querySelector('.image-text');
    imageTextElement.innerText = newText;

    // Сохраняем текст в localStorage
    localStorage.setItem('imageText', newText);
}


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

function selectCharacter(character, price) {
    let imagePath;

    // Определяем путь к изображению в зависимости от выбранного персонажа
    switch (character) {
        case 'shelly':
            imagePath = '/static/images/shelly.png';
            break;
        case 'colt':
            imagePath = '/static/images/colt.png';
            break;
        case 'dyno':
            imagePath = '/static/images/dyno.png';
            break;
        case 'piper':
            imagePath = '/static/images/piper.png';
            break;
        case 'edgar':
            imagePath = '/static/images/edgar.png';
            break;
        case 'mortis':
            imagePath = '/static/images/mortis.png';
            break;
        case 'spike':
            imagePath = '/static/images/spike.png';
            break;
        case 'leon':
            imagePath = '/static/images/leon.png';
            break;
        case 'kit':
            imagePath = '/static/images/kit.png';
            break;
        default:
            console.error('Unknown character:', character);
            return; // Если персонаж не найден, выходим из функции
    }

    // Вызываем функцию для изменения изображения
    changeImage(imagePath);

    // Обновляем цену в элементе с id "price"
    const priceElement = document.getElementById('price');
    priceElement.innerHTML = `${price} <img src="/static/images/coin.png" alt="Монета" class="coin-icon">`; // Обновляем текст с ценой и добавляем значок монеты
}





