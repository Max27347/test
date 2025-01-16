document.addEventListener('DOMContentLoaded', () => {
  const boostEnergyButton = document.getElementById('boostEnergyButton');
  let boostLevel = 0; // Текущий уровень ускорения
  const maxBoostLevel = 5; // Максимальный уровень ускорения

  boostEnergyButton.onclick = () => {
    if (boostLevel < maxBoostLevel) {
      boostLevel++; // Увеличиваем уровень
      window.energyRecoveryRate += 5; // Увеличиваем скорость восстановления энергии
      boostEnergyButton.textContent = `Ускорение энергии: уровень ${boostLevel} из ${maxBoostLevel}`;

      // Отключаем кнопку, если достигнут максимальный уровень
      if (boostLevel === maxBoostLevel) {
        boostEnergyButton.disabled = true;
        boostEnergyButton.textContent = "Максимальное ускорение достигнуто!";
      }
    }
  };
});
