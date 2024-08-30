document.addEventListener("DOMContentLoaded", () => {
    const coinImage = document.getElementById("coin-image");
    const clickCounter = document.getElementById("click-counter");
    const energyFill = document.getElementById("energy-fill");
    const energyLabel = document.getElementById("energy-label");
    const changeButton = document.getElementById("change-button");
    const storeButton = document.getElementById("store-button");
    const changeMenu = document.getElementById("change-menu");
    const storeMenu = document.getElementById("store-menu");
    const backButton = document.getElementById("back-button");
    const backStoreButton = document.getElementById("back-store-button");
    const upgradeClickButton = document.getElementById("upgrade-click");
    const upgradeEnergyButton = document.getElementById("upgrade-energy");
    const reduceRegenerationButton = document.getElementById("reduce-regeneration");
    const resetProgressButton = document.getElementById("reset-progress");

    let clickCounts = {
        coin1: 0,
        coin2: 0,
        coin3: 0,
        coin4: 0
    };

    let clickUpgrades = {
        coin1: 1,
        coin2: 1,
        coin3: 1,
        coin4: 1
    };

    let regenUpgrades = {
        coin1: 0,
        coin2: 0,
        coin3: 0,
        coin4: 0
    };

    let maxEnergy = 2000;
    let energy = 2000;
    let currentCoin = "coin1";
    let regenTime = 10000; // 1 second by default

    function updateEnergyBar() {
        energyFill.style.width = (energy / maxEnergy) * 100 + "%";
        energyLabel.textContent = `${energy} / ${maxEnergy}`;
    }

    function saveGame() {
        localStorage.setItem("clickCounts", JSON.stringify(clickCounts));
        localStorage.setItem("energy", energy);
        localStorage.setItem("currentCoin", currentCoin);
    }

    function loadGame() {
        const savedClickCounts = localStorage.getItem("clickCounts");
        const savedEnergy = localStorage.getItem("energy");
        const savedCurrentCoin = localStorage.getItem("currentCoin");

        if (savedClickCounts) {
            clickCounts = JSON.parse(savedClickCounts);
        }
        if (savedEnergy) {
            energy = parseInt(savedEnergy);
        }
        if (savedCurrentCoin) {
            currentCoin = savedCurrentCoin;
            coinImage.src = currentCoin + ".png";
        }

        clickCounter.textContent = clickCounts[currentCoin];
        updateEnergyBar();
    }

    function incrementClicks() {
        if (energy > 0) {
            clickCounts[currentCoin] += clickUpgrades[currentCoin];
            energy -= 1; // Decrease energy on click
            clickCounter.textContent = clickCounts[currentCoin];
            updateEnergyBar();
            saveGame();

            const animation = document.createElement("div");
            animation.className = "click-animation";
            animation.textContent = "+" + clickUpgrades[currentCoin];
            document.body.appendChild(animation);
            setTimeout(() => {
                animation.remove();
            }, 1000);
        } else {
            alert("Недостаточно энергии!");
        }
    }

    coinImage.addEventListener("click", incrementClicks);

    changeButton.addEventListener("click", () => {
        changeMenu.classList.toggle("hidden");
    });

    backButton.addEventListener("click", () => {
        changeMenu.classList.add("hidden");
    });

    storeButton.addEventListener("click", () => {
        storeMenu.classList.toggle("hidden");
    });

    backStoreButton.addEventListener("click", () => {
        storeMenu.classList.add("hidden");
    });

    upgradeClickButton.addEventListener("click", () => {
        if (clickCounts[currentCoin] >= 50) {
            clickCounts[currentCoin] -= 50;
            clickUpgrades[currentCoin]++;
            clickCounter.textContent = clickCounts[currentCoin];
            saveGame();
        }
    });

    upgradeEnergyButton.addEventListener("click", () => {
        if (clickCounts[currentCoin] >= 3000) {
            clickCounts[currentCoin] -= 3000;
            maxEnergy += 500;
            energy = maxEnergy; // Restore energy to max
            updateEnergyBar();
            saveGame();
        }
    });

    reduceRegenerationButton.addEventListener("click", () => {
        if (clickCounts[currentCoin] >= 2000) {
            clickCounts[currentCoin] -= 2000;
            regenTime = Math.max(500, regenTime - 100); // Decrease regeneration time
            saveGame();
        }
    });

    document.querySelectorAll('.change-option').forEach(button => {
        button.addEventListener('click', () => {
            const newCoin = button.getAttribute('data-image');
            currentCoin = newCoin.split('.')[0]; // Set currentCoin without extension
            coinImage.src = newCoin;
            saveGame();
            clickCounter.textContent = clickCounts[currentCoin];
        });
    });

    resetProgressButton.addEventListener('click', () => {
        if (confirm("Вы уверены, что хотите удалить весь прогресс? Это действие необратимо.")) {
            localStorage.clear();
            clickCounts = {
                coin1: 0,
                coin2: 0,
                coin3: 0,
                coin4: 0
            };
            clickUpgrades = {
                coin1: 1,
                coin2: 1,
                coin3: 1,
                coin4: 1
            };
            regenUpgrades = {
                coin1: 0,
                coin2: 0,
                coin3: 0,
                coin4: 0
            };
            maxEnergy = 2000;
            energy = 2000;
            currentCoin = "coin1";
            clickCounter.textContent = clickCounts[currentCoin];
            updateEnergyBar();
            saveGame();
        }
    });

    setInterval(() => {
        if (energy < maxEnergy) {
            energy += 1;
            updateEnergyBar();
        }
    }, Math.max(regenTime, 1000)); // Ensure the interval doesn't go below 1 second

    loadGame();
});
