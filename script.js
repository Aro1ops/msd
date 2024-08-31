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
    const dailyRewardTimer = document.getElementById("daily-reward-timer");
    const developerModeText = document.getElementById("developer-mode-text");
    const developerPanel = document.getElementById("developer-panel");
    const submitPasswordButton = document.getElementById("submit-password");
    const adminPanel = document.getElementById("admin-panel");
    const resetProgressButton = document.getElementById("reset-progress");
    const addClicksButton = document.getElementById("add-clicks");
    const addEnergyButton = document.getElementById("add-energy");
    const changeRegenButton = document.getElementById("change-regen");

    let clicks = 0;
    let energy = 2000;
    let maxEnergy = 2000;
    let clickValue = 1;
    let regenRate = 1000; // in milliseconds (1 second)
    let developerModeEnabled = false;

    // Function to update the energy bar
    function updateEnergyBar() {
        energyFill.style.width = `${(energy / maxEnergy) * 100}%`;
        energyLabel.textContent = `${energy} / ${maxEnergy}`;
    }

    // Click event on the coin
    coinImage.addEventListener("click", (event) => {
        if (energy >= clickValue) {
            clicks += clickValue;
            energy -= clickValue;
            clickCounter.textContent = clicks;

            // Display click animation
            const clickAnimation = document.createElement("div");
            clickAnimation.className = "click-animation";
            clickAnimation.style.left = `${event.clientX}px`;
            clickAnimation.style.top = `${event.clientY}px`;
            clickAnimation.textContent = `+${clickValue}`;
            document.body.appendChild(clickAnimation);

            setTimeout(() => {
                clickAnimation.remove();
            }, 1000);

            updateEnergyBar();
        }
    });

    // Energy regeneration
    setInterval(() => {
        if (energy < maxEnergy) {
            energy++;
            updateEnergyBar();
        }
    }, regenRate);

    // Change menu toggle
    changeButton.addEventListener("click", () => {
        changeMenu.classList.toggle("hidden");
    });

    // Store menu toggle
    storeButton.addEventListener("click", () => {
        storeMenu.classList.toggle("hidden");
    });

    // Back button in change menu
    backButton.addEventListener("click", () => {
        changeMenu.classList.add("hidden");
    });

    // Back button in store menu
    backStoreButton.addEventListener("click", () => {
        storeMenu.classList.add("hidden");
    });

    // Change coin image
    document.querySelectorAll(".change-option").forEach(button => {
        button.addEventListener("click", () => {
            const newImage = button.getAttribute("data-image");
            coinImage.src = newImage;
            changeMenu.classList.add("hidden");
        });
    });

    // Upgrade click value
    upgradeClickButton.addEventListener("click", () => {
        if (clicks >= 50) {
            clickValue++;
            clicks -= 50;
            clickCounter.textContent = clicks;
        }
    });

    // Upgrade energy
    upgradeEnergyButton.addEventListener("click", () => {
        if (clicks >= 3000) {
            maxEnergy += 500;
            clicks -= 3000;
            clickCounter.textContent = clicks;
            updateEnergyBar();
        }
    });

    // Reduce regeneration rate
    reduceRegenButton.addEventListener("click", () => {
        if (clicks >= 2000 && regenRate > 100) {
            regenRate -= 100; // reduce by 0.1 second
            clicks -= 2000;
            clickCounter.textContent = clicks;
        }
    });

    // Daily reward timer
    function updateDailyRewardTimer() {
        const now = new Date();
        const nextRewardTime = new Date();
        nextRewardTime.setHours(24, 0, 0, 0); // next midnight

        const timeDiff = nextRewardTime - now;

        const hours = Math.floor(timeDiff / 1000 / 60 / 60);
        const minutes = Math.floor((timeDiff / 1000 / 60) % 60);
        const seconds = Math.floor((timeDiff / 1000) % 60);

        dailyRewardTimer.textContent = `До награды: ${hours}:${minutes}:${seconds}`;
    }

    setInterval(updateDailyRewardTimer, 1000);

    // Developer mode toggle
    developerModeText.addEventListener("click", () => {
        developerPanel.classList.toggle("hidden");
    });

    // Developer mode login
    submitPasswordButton.addEventListener("click", () => {
        const password = document.getElementById("developer-password").value;
        if (password === "save") {
            developerModeEnabled = true;
            adminPanel.classList.remove("hidden");
        }
    });

    // Reset progress
    resetProgressButton.addEventListener("click", () => {
        clicks = 0;
        energy = maxEnergy;
        clickCounter.textContent = clicks;
        updateEnergyBar();
    });

    // Add clicks

});
