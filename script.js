const coin = document.getElementById('coin');
const coinCount = document.getElementById('coin-count');
const changeCoinButton = document.getElementById('change-coin');
const changeOptions = document.getElementById('change-options');
const backButton = document.getElementById('back-button');
const coinOptions = document.querySelectorAll('.coin-option');
const shopButton = document.getElementById('shop-button');
const shopOptions = document.getElementById('shop-options');
const buyClickButton = document.getElementById('buy-click');
const clickPrice = document.getElementById('click-price');
const backButtonShop = document.getElementById('back-button-shop');
const hotbar = document.getElementById('hotbar');
const hotbarValue = document.getElementById('hotbar-value');
const buyEnergyButton = document.getElementById('buy-energy');
const energyPrice = document.getElementById('energy-price');

let clicks = 0;
let clickMultiplier = 1;
let energy = 2000;
let hotbarValueInt = 2000;
let hotbarInterval;

// Обработка клика на монету
coin.addEventListener('click', () => {
    coin.style.opacity = 0.5;
    setTimeout(() => {
        coin.style.opacity = 1;
    }, 100);

    clicks += clickMultiplier;
    coinCount.textContent = clicks;

    // Анимация цифры 1
    const clickAnimation = document.createElement('div');
    clickAnimation.classList.add('click-animation');
    clickAnimation.textContent = clickMultiplier;
    coinCount.appendChild(clickAnimation);
    setTimeout(() => {
        clickAnimation.remove();
    }, 500);

    // Обновление хот-бара
    hotbarValueInt -= clickMultiplier;
    updateHotbar();
});

// Изменение монеты
changeCoinButton.addEventListener('click', () => {
    changeOptions.style.display = 'block';
});

backButton.addEventListener('click', () => {
    changeOptions.style.display = 'none';
});

coinOptions.forEach(option => {
    option.addEventListener('click', () => {
        const newCoinImage = option.dataset.coin;
        coin.src = newCoinImage;
        changeOptions.style.display = 'none';

        // Сброс счетчика для новой монеты
        const coinCountElement = option.querySelector('.coin-count');
        coinCountElement.textContent = 0;
    });
});

// Магазин
shopButton.addEventListener('click', () => {
    shopOptions.style.display = 'block';
});

backButtonShop.addEventListener('click', () => {
    shopOptions.style.display = 'none';
});

buyClickButton.addEventListener('click', () => {
    if (clicks >= parseInt(clickPrice.textContent)) {
        clicks -= parseInt(clickPrice.textContent);
        clickMultiplier++;
        coinCount.textContent = clicks;
        clickPrice.textContent = parseInt(clickPrice.textContent) * 2;
    }
});

// Прокачка энергии
buyEnergyButton.addEventListener('click', () => {
    if (clicks >= parseInt(energyPrice.textContent)) {
        clicks -= parseInt(energyPrice.textContent);
        energy += 500;
        hotbarValueInt += 500; // Увеличиваем хот-бар
        updateHotbar();
        energyPrice.textContent = parseInt(energyPrice.textContent) + 500;

    }
});

// Обновление хот-бара
function updateHotbar() {
    hotbarValue.textContent = hotbarValueInt;
    const hotbarPercentage = (hotbarValueInt / 2000) * 100; // 2500 - максимальное значение
    hotbar.style.width = hotbarPercentage + '%';
}

// Регенерация хот-бара
hotbarInterval = setInterval(() => {
    if (hotbarValueInt < energy) { // Регенерация только если не максимальная

      hotbarValueInt++;
      updateHotbar();
    }
}, 1000);

// Предотвращение зума на телефоне
document.addEventListener('touchmove', (event) => {
    event.preventDefault();
}, { passive: false });

// Запрет прокрутки на мобильных устройствах
document.addEventListener('touchstart', (event) => {
    event.preventDefault();
});
