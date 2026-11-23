const titleEl = document.getElementById('title');
const foodCard = document.getElementById('food-card');
const foodImg = document.getElementById('food-img');
const mapBtn = document.getElementById('map-btn');
const drawBtn = document.getElementById('draw-btn');

// 午餐清單資料庫（可自由增減）
const foodList = [
    {
        name: "日式拉麵 🍜",
        keyword: "拉麵",
        img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80"
    },
    {
        name: "台式牛肉麵 🥩",
        keyword: "牛肉麵",
        img: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=600&q=80"
    },
    {
        name: "美式漢堡薯條 🍔",
        keyword: "漢堡",
        img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80"
    },
    {
        name: "健康水煮餐盒 🥗",
        keyword: "健康餐盒",
        img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80"
    },
    {
        name: "義式義大利麵 🍝",
        keyword: "義大利麵",
        img: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=600&q=80"
    },
    {
        name: "韓式石鍋拌飯 🍲",
        keyword: "韓式料理",
        img: "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=600&q=80"
    }
];

drawBtn.addEventListener('click', () => {
    // 抽籤期間鎖定按鈕並隱藏舊卡片
    drawBtn.disabled = true;
    drawBtn.textContent = "命運轉動中...";
    foodCard.classList.add('hidden');
    mapBtn.classList.add('hidden');

    let counter = 0;
    const totalSpins = 15; // 跳動次數

    // 製造文字快速跳動的抽籤感
    const interval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * foodList.length);
        titleEl.textContent = foodList[randomIndex].name;
        counter++;

        if (counter >= totalSpins) {
            clearInterval(interval);
            showResult();
        }
    }, 80);
});

function showResult() {
    const finalFood = foodList[Math.floor(Math.random() * foodList.length)];
    
    // 更新標題與圖片
    titleEl.textContent = `決定了！吃 ${finalFood.name}`;
    foodImg.src = finalFood.img;
    foodImg.alt = finalFood.name;

    // 產生搜尋附近該食物的 Google Maps 連結
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(finalFood.keyword)}`;
    mapBtn.href = mapsUrl;

    // 顯示卡片與按鈕
    foodCard.classList.remove('hidden');
    mapBtn.classList.remove('hidden');

    // 恢復抽籤按鈕
    drawBtn.disabled = false;
    drawBtn.textContent = "再抽一次 🔄";
}
