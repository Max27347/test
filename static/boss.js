let score = 0;
        let timeLeft = 20;
        let timerId;

        const scoreElement_b1 = document.getElementById('score_b1');
        const timerElement_b1 = document.getElementById('timer_b1');
        const clickableImage_b1 = document.getElementById('clickable-image_b1');
        const startButton = document.getElementById('start-button');

        clickableImage_b1.style.pointerEvents = 'none'; // Отключаем клики до старта игры

        clickableImage_b1.addEventListener('click', () => {
            if (timeLeft > 0) {
                score++;
                scoreElement_b1.textContent = `Очки: ${score}`;

                // Добавляем эффект увеличения при клике
                clickableImage_b1.style.animation = 'clickEffect 0.3s'; // Применяем анимацию
                setTimeout(() => {
                    clickableImage_b1.style.animation = ''; // Убираем анимацию после завершения
                }, 300);

                if (score >= 50) {
                    clearInterval(timerId);
                    alert('Поздравляем! Вы выиграли!');
                }
            }
        });

        function startGame() {
            score = 0; // Сброс очков
            timeLeft = 20; // Сброс времени
            scoreElement_b1.textContent = `Очки: ${score}`; // Обновление очков
            timerElement_b1.textContent = `Время: ${timeLeft}`; // Обновление времени
            clickableImage_b1.style.pointerEvents = 'auto'; // Включаем клики

            timerId = setInterval(() => {
                timeLeft--;
                timerElement_b1.textContent = `Время: ${timeLeft}`;

                if (timeLeft <= 0) {
                    clearInterval(timerId);
                    clickableImage_b1.style.pointerEvents = 'none'; // Отключаем клики после окончания времени
                    alert('Время вышло! Вы набрали ' + score + ' очков.');
                }

                if (Math.random() < 0.3) { // Вероятность появления бомбы
                    createBomb();
                }

            }, 1000);

           createBomb(); // Создаем первую бомбу сразу при запуске игры
        }

        function createBomb() {
            const bomb = document.createElement('div');
            bomb.classList.add('bomb');

             // Получаем координаты области, где будет появляться бомба
             const imageRect = clickableImage_b1.getBoundingClientRect();
             const minX = imageRect.left;
             const maxX = imageRect.right - bomb.offsetWidth;

             // Устанавливаем случайную позицию по горизонтали в пределах области изображения
             bomb.style.left = Math.random() * (maxX - minX) + minX + 'px';

             document.body.appendChild(bomb);

             // Удаляем бомбу после завершения анимации
             bomb.addEventListener('animationend', () => {
                 bomb.remove();
             });

             // Добавляем обработчик клика на бомбу
             bomb.addEventListener('click', () => {
                 score -= 5; // Уменьшаем очки на 5
                 scoreElement_b1.textContent = `Очки: ${score}`;
                 bomb.remove(); // Удаляем бомбу при клике
                 alert("Ой! Вы потеряли 5 очков!");

                 if (score < 0) {
                     score = 0; // Не допускаем отрицательных очков
                     scoreElement_b1.textContent = `Очки: ${score}`;
                 }
             });
         }

         // Добавляем обработчик события для кнопки "Старт"
         startButton.addEventListener('click', startGame);