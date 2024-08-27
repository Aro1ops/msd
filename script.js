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

let clicks = 0;
let clickMultiplier = 1;

// Обработка клика на монету
coin.addEventListener('click', () => {
    coin.style.opacity = 0.5;
    setTimeout(() => {
        coin.style.opacity = 1;
    }, 100);
    clicks += clickMultiplier;
    coinCount.textContent = clicks;
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
        const coinCountElement = option.querySelector('.coin-count span');
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

// Предотвращение зума на телефоне
document.addEventListener('touchmove', (event) => {
    event.preventDefault();
}, { passive: false });

// Запрет прокрутки на мобильных устройствах
document.addEventListener('touchstart', (event) => {
    event.preventDefault();
});
