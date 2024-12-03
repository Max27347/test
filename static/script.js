document.addEventListener("DOMContentLoaded", function() {
    const clickButton = document.getElementById("clickButton");
    const currentScore = document.getElementById("currentScore");

    let score = parseInt(currentScore.innerText);

    clickButton.onclick = async () => {
        try {
            const response = await fetch('/click', {method: 'POST'});
            const data = await response.json();

            if (data.success) {
                score++;
                currentScore.innerText = score;
            }
        } catch (error) {
            console.error("Ошибка при обновлении счета:", error);
        }
    };
});