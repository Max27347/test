// Найти элементы
const itemUp = document.querySelector('.item_up');
const itemUp2 = document.querySelector('.item_up2'); // Новый элемент
const itemUp3 = document.querySelector('.item_up3'); // Новый элемент
const itemUp4 = document.querySelector('.item_up4'); // Новый элемент
const containerUpBuy = document.querySelector('.container_up_buy');
const containerUpBuy2 = document.querySelector('.container_up_buy_2'); // Новый контейнер
const containerUpBuy3 = document.querySelector('.container_up_buy_3');
const containerUpBuy4 = document.querySelector('.container_up_buy_4');
const overlay = document.querySelector('.overlay');
const closeButton = document.querySelector('.close-button');
const closeButton2 = document.querySelector('.close-button_2'); // Кнопка закрытия для второго окна
const closeButton3 = document.querySelector('.close-button_3');
const closeButton4 = document.querySelector('.close-button_4');

// Открытие окна для первого элемента
itemUp.addEventListener('click', () => {
    containerUpBuy.style.display = 'block';
    overlay.style.display = 'block';
});

// Открытие окна для второго элемента
itemUp2.addEventListener('click', () => {
    containerUpBuy2.style.display = 'block'; // Показать второе окно
    overlay.style.display = 'block'; // Показать затемнение
});


itemUp3.addEventListener('click', () => {
    containerUpBuy3.style.display = 'block'; // Показать второе окно
    overlay.style.display = 'block'; // Показать затемнение
});


itemUp4.addEventListener('click', () => {
    containerUpBuy4.style.display = 'block'; // Показать второе окно
    overlay.style.display = 'block'; // Показать затемнение
});

// Закрытие окон при клике на затемнение
overlay.addEventListener('click', () => {
    containerUpBuy.style.display = 'none';
    containerUpBuy2.style.display = 'none';
    containerUpBuy3.style.display = 'none';
    containerUpBuy4.style.display = 'none';
    overlay.style.display = 'none';
});

// Закрытие 1 окна при клике на кнопку закрытия
closeButton.addEventListener('click', () => {
    containerUpBuy.style.display = 'none';
    overlay.style.display = 'none';
});

// Закрытие второго окна при клике на кнопку закрытия
closeButton2.addEventListener('click', () => {
    containerUpBuy2.style.display = 'none'; // Закрыть второе окно
    overlay.style.display = 'none';
});

closeButton3.addEventListener('click', () => {
    containerUpBuy3.style.display = 'none'; //
    overlay.style.display = 'none';
});

closeButton4.addEventListener('click', () => {
    containerUpBuy4.style.display = 'none';
    overlay.style.display = 'none';
});