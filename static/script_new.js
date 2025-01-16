document.addEventListener("DOMContentLoaded", function() {
  const menuButtons = document.querySelectorAll(".nav-button");
  const pages = document.querySelectorAll(".page");
  const currentScoreElement = document.querySelectorAll('.currentScore'); // Все элементы для отображения баланса монет
  const coinsPerClickElement = document.querySelectorAll('.coinsPerClick'); // Все элементы для отображения монет за клик

  let coinsPerClick = parseInt(localStorage.getItem('coinsPerClick')) || 1; // Восстановление монет за клик из localStorage

  // Функция для обновления баланса монет
  function updateScoreDisplay(newScore) {
    currentScoreElement.forEach(element => {
      element.innerText = newScore;
    });
    // Сохраняем новое значение монет в localStorage
    localStorage.setItem('currentScore', newScore);
  }

  // Функция для обновления монет за клик
  function updateCoinsPerClickDisplay(newCoinsPerClick) {
    coinsPerClickElement.forEach(element => {
      element.innerText = newCoinsPerClick;
    });
    // Сохраняем новое значение монет за клик в localStorage
    localStorage.setItem('coinsPerClick', newCoinsPerClick);
  }

  // Восстановление значений из localStorage (при загрузке страницы)
  function initializeScore() {
    const storedScore = parseInt(localStorage.getItem('currentScore')) || 0;
    updateScoreDisplay(storedScore);
  }

  // Восстановление монет за клик
  function initializeCoinsPerClick() {
    updateCoinsPerClickDisplay(coinsPerClick);
  }

  // Функция для скрытия всех страниц
  function hideAllPages() {
    pages.forEach(page => {
      page.style.display = "none"; // Скрываем все страницы
    });
  }

  // Функция для деактивации всех кнопок меню
  function deactivateAllButtons() {
    menuButtons.forEach(button => {
      button.classList.remove("active"); // Убираем активный класс
    });
  }

  // Обработчик кликов по кнопкам меню
  menuButtons.forEach(button => {
    button.addEventListener("click", function(event) {
      event.preventDefault();

      // Деактивируем все кнопки
      deactivateAllButtons();

      // Активируем текущую кнопку
      this.classList.add("active");

      // Скрываем все страницы
      hideAllPages();

      // Получаем id страницы из атрибута data-page
      const pageId = this.getAttribute("data-page");

      // Отображаем нужную страницу
      const activePage = document.getElementById(pageId);
      activePage.style.display = "block"; // Показываем нужную страницу
    });
  });

  // Инициализация при загрузке страницы
  initializeScore();
  initializeCoinsPerClick(); // Инициализируем отображение монет за клик

});

// Менюшка
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

// Функция для загрузки содержимого по вкладке
function loadContent(section) {
  // Скрываем все секции
  const sections = document.querySelectorAll('.content-section');
  sections.forEach(section => {
    section.style.display = 'none';
  });

  // Показываем нужную секцию
  const activeSection = document.getElementById(section);
  if (activeSection) {
    activeSection.style.display = 'block';
  }
}
