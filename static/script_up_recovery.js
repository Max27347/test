document.addEventListener('DOMContentLoaded', () => {
  const increaseEnergyButton = document.getElementById('increaseEnergyButton');

  if (increaseEnergyButton) {
    increaseEnergyButton.addEventListener('click', () => {
      const newRate = window.energyRecoveryRate + 10; // Используем глобальную переменную
      window.updateEnergyRecoveryRate(newRate); // Вызываем глобальную функцию
    });
  }
});
