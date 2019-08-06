let data = {};
let selectElement = document.querySelector('.header .select');

// Get
let xhr = new XMLHttpRequest();
xhr.open('get', 'https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97', true);
xhr.send(null);
xhr.onload = function () {
    let temp = JSON.parse(xhr.responseText).result.records;
    // 將資料以行政區分類
    let tempLength = temp.length;
    for (let i = 0; i < tempLength; i++) {
        if (data[temp[i].Zone] != null) {
            data[temp[i].Zone].push(temp[i]);
        }
        else {
            data[temp[i].Zone] = Array(temp[i]);
        }
    }
    // 將行政區放入選單
    for (let key in data) {
        selectElement.innerHTML += '<option value="' + key + '">' + key + '</option>';
    }
}

// 選行政區
let option = '';
let page = 0;
selectElement.addEventListener('change', function (event) {
    if (event.target.value != '') {
        option = event.target.value;
        page = 0;
        updateList(page);
    }
}, false);

// 選頁
let paginationElement = document.querySelector('.main .pagination');
paginationElement.addEventListener('click', function (event) {
    if (event.target.classList.contains('unable') == false &&
        event.target.classList.contains('active') == false) {
        if (event.target.classList.contains('previous')) {
            page--;
        }
        else if (event.target.classList.contains('next')) {
            page++;
        }
        else if (event.target.classList.contains('number')) {
            page = parseInt(event.target.dataset.page);
        }
        updateList(page);
    }

}, false);

// 熱門行政區
let popularListElement = document.querySelector('.header .popular .list');
popularListElement.addEventListener('click', function (event) {
    if (event.target.classList.contains('list-button')) {
        option = event.target.textContent;
        selectElement.value = event.target.textContent;
        page = 0;
        updateList(page);
    }
}, false);

// 更新列表
let titleElement = document.querySelector('.main .title');
let listElement = document.querySelector('.main .list');
function updateList(page) {
    titleElement.textContent = option;
    listElement.innerHTML = '';
    paginationElement.innerHTML = '';
    if (data[option] != null) {
        let listLength = data[option].length;
        for (let i = page * 6; i < listLength && i < page * 6 + 6; i++) {
            let node = document.createElement('li');
            node.classList.add('spot');
            node.innerHTML = '<h3 class="name"><a target="_blank">'
                + data[option][i].Name
                + '</a></h3><span class="aria">'
                + data[option][i].Zone
                + '</span><div class="information"><div class="time">'
                + data[option][i].Opentime
                + '</div><a href="http://maps.google.com.tw/maps?q='
                + data[option][i].Add
                + '" target="_blank" class="address">'
                + data[option][i].Add
                + '</a><a href="tel:'
                + data[option][i].Tel
                + '" class="phone">'
                + data[option][i].Tel
                + '</a><div class="tag">'
                + data[option][i].Ticketinfo
                + '</div></div>';
            if (data[option][i].Website != '') {
                node.firstChild.firstChild.setAttribute('href', data[option][i].Website);
            }
            node.style['backgroundImage'] = 'url(' + data[option][i].Picture1 + ')';
            listElement.appendChild(node);
        }
        paginationElement.innerHTML = '<button class="pag-button previous">< prev</button>';
        let pageAmount = Math.ceil(data[option].length / 6);
        for (let i = 0; i < pageAmount; i++) {
            paginationElement.innerHTML += '<button class="pag-button number" data-page="'
                + i + '">' + (i + 1) + '</button>';
        }
        paginationElement.innerHTML += '<button class="pag-button next">next ></button>';
        if (page == 0) {
            paginationElement.childNodes[0].classList.add('unable');
        }
        if (page == pageAmount - 1) {
            paginationElement.lastElementChild.classList.add('unable');
        }
        paginationElement.childNodes[page + 1].classList.add('active');
    }
    else {
        listElement.innerHTML = '<div class="alert">此區查無景點資料。</div>';
    }
}