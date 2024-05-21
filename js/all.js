import JSONdata from './data.json';
console.log(JSONdata);
//更新 Selection 裡面的 ZoneList
function updateZone(){

    let zoneList = [];
    let loc = JSONdata.result.records;
    let zoneSelect = document.querySelector('#zoneSelect');

    //將每個物件裡面分別的 Zone 挑出來，重新組陣列
    for (let i = 0; i < loc.length ; i++){
        let zoneName = loc[i].Zone;
        
        //檢查 zoneList 是否有重複 zoneName
        if (!zoneList.includes(zoneName)){
            zoneList.push(zoneName);
        };
    }
    //將 zoneList 組成 option 給 zoneSelect
    for (let zone of zoneList){
        let option = document.createElement('option');
        option.textContent = zone;
        zoneSelect.appendChild(option); 
    };
};

//在瀏覽器啟用時就載入此 func
window.onload = function(){
    updateZone();
};




// 在切換選項時判斷 zoneName 顯示卡片
function changeZone(zone){
    
    let zoneSelect = document.querySelector('#zoneSelect');
    let cardGroup = document.querySelector('.cardGroup');
    let zoneTitle = document.querySelector('.zoneTitle');
    let fragment = document.createDocumentFragment();

    //讓選擇的項目跟 button 賦予的 zone 一樣
    zoneSelect.value = zone;

    //先定義每次選取/賦值前為空
    cardGroup.innerHTML = '';
    
    let loc = JSONdata.result.records;
    for (i = 0 ; i < loc.length; i++){
 
        //創建卡片同時也改 zoneTitle
        if (zone === loc[i].Zone){    
            zoneTitle.textContent = loc[i].Zone;
            
            //定義卡片 HTML & class
            let card = document.createElement('div');
            card.classList.add('card');

            //卡片內容
            card.innerHTML = `
                <div class="image" style="background-image: url( ${loc[i].Picture1})">
                    <div class="cardHeader">
                        <div class="cardTitle"> ${loc[i].Name} </div>
                        <div class="cardDescription"> ${loc[i].Zone} </div>
                    </div>
                </div>
                <div class = "cardContent">
                    <div class="cardTime">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 icon clock">
                            <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clip-rule="evenodd" />
                        </svg>
                        <p class="time"> ${loc[i].Opentime} </p>
                    </div>
                    <div class="cardLocation">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 icon pin">
                            <path fill-rule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd" />
                        </svg>
                        <p class="location"> ${loc[i].Add} </p>
                    </div>
                    <div class="cardTel">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 icon phone">
                            <path d="M10.5 18.75a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" /><path fill-rule="evenodd" d="M8.625.75A3.375 3.375 0 0 0 5.25 4.125v15.75a3.375 3.375 0 0 0 3.375 3.375h6.75a3.375 3.375 0 0 0 3.375-3.375V4.125A3.375 3.375 0 0 0 15.375.75h-6.75ZM7.5 4.125C7.5 3.504 8.004 3 8.625 3H9.75v.375c0 .621.504 1.125 1.125 1.125h2.25c.621 0 1.125-.504 1.125-1.125V3h1.125c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125h-6.75A1.125 1.125 0 0 1 7.5 19.875V4.125Z" clip-rule="evenodd" />
                        </svg>
                        <p class="tel"> ${loc[i].Tel} </p>
                    </div>
                    <!--隱藏沒有資料的價格資訊-->
                    <div class="cardTag" style = "${loc[i].Ticketinfo ? ' ' : 'display:none'}">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 icon tag">
                            <path fill-rule="evenodd" d="M5.25 2.25a3 3 0 0 0-3 3v4.318a3 3 0 0 0 .879 2.121l9.58 9.581c.92.92 2.39 1.186 3.548.428a18.849 18.849 0 0 0 5.441-5.44c.758-1.16.492-2.629-.428-3.548l-9.58-9.581a3 3 0 0 0-2.122-.879H5.25ZM6.375 7.5a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z" clip-rule="evenodd" />
                        </svg>
                        <p class="tag"> ${loc[i].Ticketinfo} </p>
                    </div>
                </div>
            `;
            //先在 fragment 底下創建卡片
            fragment.appendChild(card);
        };
    //再把 fragment 裡的值給 cardGroup 子層
    cardGroup.appendChild(fragment); 
    };
    //若只有一個選項時，card Group 的 justify-content 改為 center
    cardGroup.style.justifyContent = cardGroup.childElementCount === 1 ? 'center' : 'flex-start';

    //將 scroll 位置移到卡片區域
    window.scrollTo(0,500);
};

//掃過所有 tabBtn 的 NoteList，在點擊時觸發 changeZone，並帶入 textContent
document.querySelectorAll('.tabBtn').forEach(btn => {
    btn.addEventListener('click', function(){
        let zone = this.textContent;
        changeZone(zone);
    });
});

//當選項改變時觸發 changeZone，並帶入 value
zoneSelect.addEventListener('change', function(){
    let zone = this.value;
    changeZone(zone);
});

