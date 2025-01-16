document.addEventListener('DOMContentLoaded', () => {
  const increaseEnergyButton = document.getElementById('increaseEnergyButton');

  if (increaseEnergyButton) {
    increaseEnergyButton.addEventListener('click', () => {
      const newRate = window.energyRecoveryRate + 20; // Используем глобальную переменную
      window.updateEnergyRecoveryRate(newRate); // Вызываем глобальную функцию
    });
  }
});