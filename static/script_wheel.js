 // Показ/скрытие рулетки
        const openWheelBtn = document.getElementById('open-wheel');
        const closeWheelBtn = document.getElementById('close-btn');
        const wheelContainer = document.getElementById('wheel-container');

        openWheelBtn.addEventListener('click', () => {
            wheelContainer.style.display = 'flex';
        });

        closeWheelBtn.addEventListener('click', () => {
            wheelContainer.style.display = 'none';
        });

        // Логика рулетки
        const spinButton = document.getElementById('spin-btn');
        const wheel = document.getElementById('wheel');
        const result = document.getElementById('result');

        const prizes = [
            "Приз: 100 монет",
            "Приз: 200 монет",
            "Приз: 500 монет",
            "Приз: Бесплатный сундук",
            "Приз: Скидка 10%",
            "Приз: Секретный подарок"
        ];

        let isSpinning = false;
        let currentRotation = 0;

        spinButton.addEventListener('click', () => {
            if (isSpinning) return;
            isSpinning = true;

            const randomStop = Math.floor(Math.random() * 360);
            const fullRotations = 5;
            const targetRotation = fullRotations * 360 + randomStop;

            wheel.style.transition = 'transform 5s cubic-bezier(0.17, 0.67, 0.83, 0.67)';
            wheel.style.transform = `rotate(${currentRotation + targetRotation}deg)`;

            const sectorAngle = 360 / prizes.length;
            const winningIndex = Math.floor((randomStop / sectorAngle) % prizes.length);

            setTimeout(() => {
                result.textContent = prizes[winningIndex];
                isSpinning = false;
                currentRotation += targetRotation;
            }, 5000);
        });

        const prizesContainer = document.getElementById('prizes-container');


