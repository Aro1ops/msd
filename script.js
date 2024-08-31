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
    const reduceRegenButton = document.getElementById("reduce-regeneration");

    let clickCount = 0;
    let energy = 2000;
    let maxEnergy = 2000;
    let clickValue = 1;
    let regenTime = 10000; // время регенерации в миллисекундах
    let lastUpdateTime = Date.now();
    const clickCounts = JSON.parse(localStorage.getItem("clickCounts")) || {
        coin1: 0,
        coin2: 0,
        coin3: 0,
        coin4: 0
    };
    const clickUpgrades = JSON.parse(localStorage.getItem("clickUpgrades")) || {
        coin1: 1,
        coin2: 1,
        coin3: 1,
        coin4: 1
    };
    const regenUpgrades = JSON.parse(localStorage.getItem("regenUpgrades")) || {
        coin1: 0,
        coin2: 0,
        coin3: 0,
        coin4: 0
    };
    let currentCoin = "coin1";
    let energyUpgradeLevel = parseInt(localStorage.getItem("energyUpgradeLevel")) || 0;

    const energyUpgradeBaseCost = 3000; // Базовая стоимость улучшения энергии

    document.querySelectorAll('.change-option').forEach(button => {
        button.addEventListener('click', () => {
            const newCoin = button.getAttribute('data-image');
            currentCoin = newCoin.split('.')[0]; // Set currentCoin without extension
            coinImage.src = newCoin;
            saveGame();
            clickCounter.textContent = clickCounts[currentCoin];
        });
    });

    const updateEnergyBar = () => {
        const percentage = (energy / maxEnergy) * 100;
        energyFill.style.width = `${percentage}%`;
        energyLabel.textContent = `${energy} / ${maxEnergy}`;
    };

    const animateClick = (x, y, value) => {
        const animElem = document.createElement("div");
        animElem.textContent = `+${value}`;
        animElem.className = "click-animation";
        animElem.style.left = `${x}px`;
        animElem.style.top = `${y}px`;
        document.body.appendChild(animElem);

        setTimeout(() => {
            animElem.style.top = `${y - 50}px`;
            animElem.style.opacity = "0";
            setTimeout(() => document.body.removeChild(animElem), 1000);
        }, 0);
    };

    const calculateEnergyRegeneration = () => {
        const now = Date.now();
        const timePassed = now - lastUpdateTime;
        const energyToRegen = Math.floor(timePassed / regenTime);

        if (energyToRegen > 0) {
            energy = Math.min(energy + energyToRegen, maxEnergy);
            lastUpdateTime = now;
            saveGame();
            updateEnergyBar();
        }
    };

    coinImage.addEventListener("click", (event) => {
        if (energy > 0) {
            clickCounts[currentCoin] += clickUpgrades[currentCoin];
            clickCounter.textContent = clickCounts[currentCoin];
            const { clientX: x, clientY: y } = event;
            animateClick(x, y, clickUpgrades[currentCoin]);
            energy -= clickUpgrades[currentCoin];
            updateEnergyBar();
            saveGame();
        }
    });

    changeButton.addEventListener("click", () => {
        changeMenu.classList.remove("hidden");
        storeMenu.classList.add("hidden");
    });

    storeButton.addEventListener("click", () => {
        storeMenu.classList.remove("hidden");
        changeMenu.classList.add("hidden");
    });

    backButton.addEventListener("click", () => {
        changeMenu.classList.add("hidden");
    });

    backStoreButton.addEventListener("click", () => {
        storeMenu.classList.add("hidden");
    });

    const saveGame = () => {
        localStorage.setItem("clickCounts", JSON.stringify(clickCounts));
        localStorage.setItem("clickUpgrades", JSON.stringify(clickUpgrades));
        localStorage.setItem("regenUpgrades", JSON.stringify(regenUpgrades));
        localStorage.setItem("maxEnergy", maxEnergy);
        localStorage.setItem("currentCoin", currentCoin);
        localStorage.setItem("regenTime", regenTime);
        localStorage.setItem("lastUpdateTime", lastUpdateTime);
        localStorage.setItem("energy", energy);
        localStorage.setItem("energyUpgradeLevel", energyUpgradeLevel);
    };

    const loadGame = () => {
        const savedClickCounts = JSON.parse(localStorage.getItem("clickCounts"));
        const savedClickUpgrades = JSON.parse(localStorage.getItem("clickUpgrades"));
        const savedRegenUpgrades = JSON.parse(localStorage.getItem("regenUpgrades"));
        const savedMaxEnergy = localStorage.getItem("maxEnergy");
        const savedCurrentCoin = localStorage.getItem("currentCoin");
        const savedRegenTime = localStorage.getItem("regenTime");
        const savedLastUpdateTime = localStorage.getItem("lastUpdateTime");
        const savedEnergy = localStorage.getItem("energy");
        const savedEnergyUpgradeLevel = localStorage.getItem("energyUpgradeLevel");

        if (savedClickCounts) {
            Object.assign(clickCounts, savedClickCounts);
        }
        if (savedClickUpgrades) {
            Object.assign(clickUpgrades, savedClickUpgrades);
        }
        if (savedRegenUpgrades) {
            Object.assign(regenUpgrades, savedRegenUpgrades);
        }
        if (savedMaxEnergy) {
            maxEnergy = parseInt(savedMaxEnergy, 10);
        }
        if (savedCurrentCoin) {
            currentCoin = savedCurrentCoin;
            coinImage.src = `${currentCoin}.png`;
        }
        if (savedRegenTime) {
            regenTime = parseInt(savedRegenTime, 10);
        }
        if (savedLastUpdateTime) {
            lastUpdateTime = parseInt(savedLastUpdateTime, 10);
        }
        if (savedEnergy) {
            energy = parseInt(savedEnergy, 10);
        }
        if (savedEnergyUpgradeLevel) {
            energyUpgradeLevel = parseInt(savedEnergyUpgradeLevel, 10);
            maxEnergy = 2000 + energyUpgradeLevel * 500; // Восстановление корректного значения максимальной энергии
        }

        calculateEnergyRegeneration();
        clickCounter.textContent = clickCounts[currentCoin];
        updateEnergyBar();
        updateUpgradeButtons();
    };

    const updateUpgradeButtons = () => {
        upgradeEnergyButton.textContent = `Прокачка энергии (+500) - ${(energyUpgradeLevel + 1) * energyUpgradeBaseCost}`;
    };

    upgradeClickButton.addEventListener("click", () => {
        const cost = clickUpgrades[currentCoin] * 50;
        if (clickCounts[currentCoin] >= cost) {
            clickCounts[currentCoin] -= cost;
            clickUpgrades[currentCoin] += 1;
            upgradeClickButton.textContent = `Прокачка кликов (+${clickUpgrades[currentCoin]}) - ${clickUpgrades[currentCoin] * 50}`;
            clickCounter.textContent = clickCounts[currentCoin];
            saveGame();
        }
    });

    upgradeEnergyButton.addEventListener("click", () => {
        const cost = (energyUpgradeLevel + 1) * energyUpgradeBaseCost;
        if (clickCounts[currentCoin] >= cost) {
            clickCounts[currentCoin] -= cost;
            energyUpgradeLevel += 1;
            maxEnergy += 500;
            upgradeEnergyButton.textContent = `Прокачка энергии (+500) - ${(energyUpgradeLevel + 1) * energyUpgradeBaseCost}`;
            clickCounter.textContent = clickCounts[currentCoin];
            updateEnergyBar();
            saveGame();
        }
    });

    reduceRegenButton.addEventListener("click", () => {
        const cost = regenUpgrades[currentCoin] * 1000 + 2000;
        if (clickCounts[currentCoin] >= cost && regenTime > 1000) {
            clickCounts[currentCoin] -= cost;
            regenUpgrades[currentCoin] += 1;
            regenTime -= 100; // Уменьшение времени на 0.1 сек
            reduceRegenButton.textContent = `Уменьшение регенерации (на ${regenUpgrades[currentCoin] * 0.1} сек) - ${(regenUpgrades[currentCoin] * 1000) + 2000}`;
            clickCounter.textContent = clickCounts[currentCoin];
            saveGame();
        }
    });

    loadGame();
    setInterval(calculateEnergyRegeneration, 1000);

    document.addEventListener('touchmove', function (event) {
        event.preventDefault();
    }, { passive: false });
});