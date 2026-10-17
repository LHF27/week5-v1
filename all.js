let data = [
    {
        "id": 0,
        "name": "肥宅心碎賞櫻3日",
        "imgUrl": "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80",
        "area": "高雄",
        "description": "賞櫻花最佳去處。肥宅不得不去的超讚景點！",
        "group": 87,
        "price": 1400,
        "rate": 10
    },
    {
        "id": 1,
        "name": "貓空纜車雙程票",
        "imgUrl": "https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
        "area": "台北",
        "description": "乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感",
        "group": 99,
        "price": 240,
        "rate": 2
    },
    {
        "id": 2,
        "name": "台中谷關溫泉會1日",
        "imgUrl": "https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
        "area": "台中",
        "description": "全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。",
        "group": 20,
        "price": 1765,
        "rate": 7
    }
];

// 搜尋區
const ticketCardArea = document.querySelector(".ticketCard-area");
const regionSearch = document.querySelector(".regionSearch");
const searchResultText = document.querySelector("#searchResult-text");
const cantFindArea = document.querySelector(".cantFind-area");
// 表單
const addTicketForm = document.querySelector(".addTicket-form");
const ticketName = document.querySelector("#ticketName");
const ticketImgUrl = document.querySelector("#ticketImgUrl");
const ticketRegion = document.querySelector("#ticketRegion");
const ticketPrice = document.querySelector("#ticketPrice");
const ticketNum = document.querySelector("#ticketNum");
const ticketRate = document.querySelector("#ticketRate");
const ticketDescription = document.querySelector("#ticketDescription");
const addTicketBtn = document.querySelector(".addTicket-btn");

// !!! img url 判斷 
ticketImgUrl.addEventListener("blur", function() {
    const url = ticketImgUrl.value.trim();
    if (url === "") return; // 如果沒填就不做檢查

    const testImg = new Image();
    testImg.src = url;

    // 如果圖片載入失敗（死連結或非圖片）
    testImg.onerror = function() {
        alert("警告：此圖片網址無法正常載入，請確認網址是否正確！");
        ticketImgUrl.value = ""; // 清空錯誤的網址，或讓使用者重新輸入
        ticketImgUrl.focus();    // 把游標重新聚焦回圖片輸入框
    };
});

addTicketBtn.addEventListener("click", function(e){
    e.preventDefault();
    if (
        ticketName.value === "" ||
        ticketImgUrl.value === "" ||
        ticketRegion.value === "" ||
        ticketPrice.value === "" ||
        ticketNum.value === "" ||
        ticketRate.value === "" ||
        ticketDescription.value === ""
    ) {
        alert("請填寫所有欄位！"); 
        return; 
    }

    if (ticketPrice.value <= 0 || ticketNum.value <= 0) {
        alert("套票金額與組數任一個必須大於 0！");
        return;
    }

    if (ticketRate.value < 1 || ticketRate.value > 10) {
        alert("星級評分必須介於 1 到 10 之間！");
        return;
    }

    const obj = {
        "id": data.length,
        "name": ticketName.value.trim(),
        "imgUrl": ticketImgUrl.value.trim(),
        "area": ticketRegion.value,
        "description": ticketDescription.value.trim(),
        "group": Number(ticketNum.value),
        "price": Number(ticketPrice.value),
        "rate": Number(ticketRate.value)
    };
    data.push(obj);
    regionSearch.value = "";
    renderData(data);
    addTicketForm.reset();
});


regionSearch.addEventListener("change", function (e) {
    if (regionSearch.value === "") { 
        renderData(data);
        return;
    } 
    let filterData = data.filter(ticket => ticket.area === regionSearch.value);
    renderData(filterData);
});
// ------------------------------------------------------------------------------------

// 渲染資料 
function renderData(tickets) {
    if (tickets.length === 0) {
        ticketCardArea.innerHTML = ""; 
        cantFindArea.style.display = "block"; 
        searchResultText.textContent = `本次搜尋共 0 筆資料`;
        return;
    }

    cantFindArea.style.display = "none";
    let str = "";
    tickets.forEach(function (ticket) {
        str += `<li class="ticketCard">
                    <div class="ticketCard-img">
                        <a href="#"><img src="${ticket.imgUrl}"alt="${ticket.name}"></a>
                        <div class="ticketCard-region">${ticket.area}</div>
                        <div class="ticketCard-rank">${ticket.rate}</div>
                    </div>
                    <div class="ticketCard-content">
                        <div>
                            <h3><a href="#" class="ticketCard-name">${ticket.name}</a></h3>
                            <p class="ticketCard-description">${ticket.description}</p>
                        </div>
                        <div class="ticketCard-info">
                            <p class="ticketCard-num">
                                <span><i class="fas fa-exclamation-circle"></i></span>
                                剩下最後 <span id="ticketCard-num"> ${ticket.group} </span> 組
                            </p>
                            <p class="ticketCard-price">
                                TWD <span id="ticketCard-price">$${ticket.price}</span>
                            </p>
                        </div>
                    </div>
                </li>`
    })

    ticketCardArea.innerHTML = str;
    searchResultText.textContent = `本次搜尋共 ${tickets.length} 筆資料`;
};

// 初始
renderData(data);
