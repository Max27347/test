
// Найти элементы
const itemUp = document.querySelector('.item_up');
const containerUpBuy = document.querySelector('.container_up_buy');
const overlay = document.querySelector('.overlay');
const closeButton = document.querySelector('.close-button');

// Открытие окна
itemUp.addEventListener('click', () => {
    containerUpBuy.style.display = 'block';
    overlay.style.display = 'block';
});

// Закрытие окна
overlay.addEventListener('click', () => {
    containerUpBuy.style.display = 'none';
    overlay.style.display = 'none';
});

closeButton.addEventListener('click', () => {
    containerUpBuy.style.display = 'none';
    overlay.style.display = 'none';
});
