let record = JSON.parse(localStorage.getItem('record')) || [];
let height, weight;

// 輸入數值
let inputs = document.querySelector('.inputs');
inputs.addEventListener('change', function (event) {
    if (event.target.id == 'height') {
        height = parseInt(event.target.value);
    }
    else if (event.target.id == 'weight') {
        weight = parseInt(event.target.value);
    }
}, false);

// 輸入行為
inputs.addEventListener('keydown', function (event) {
    if (event.keyCode == 13) {
        if (event.target == inputs.children[1]) {
            inputs.children[3].focus();
        }
        else if (event.target == inputs.children[3]) {
            event.target.blur();
        }
        calculate();
    }
    else if ((event.keyCode >= 32 && event.keyCode < 48) || 57 < event.keyCode) {
        event.returnValue = false;
    }
}, false);

// 計算結果
let result = document.querySelector('.header .result');
let submit = document.querySelector('.header .submit');
submit.addEventListener('click', calculate, false);
function calculate() {
    if (inputs.children[1].value != '' && inputs.children[3].value != '') {
        inputs.classList.remove('empty');
        let bmi = Math.round((weight / (height * height / 10000)) * 100) / 100;
        result.children[0].children[0].textContent = bmi;
        submit.style.display = 'none';
        result.style.display = 'flex';
        let type, color;
        if (bmi < 18.5) {
            type = '過輕';
            color = '#31BAF9';
        }
        else if (bmi < 25) {
            type = '理想';
            color = '#86D73F';
        }
        else if (bmi < 30) {
            type = '過重';
            color = '#FF982D';
        }
        else if (bmi < 35) {
            type = '輕度肥胖';
            color = '#FF6C03';
        }
        else if (bmi < 40) {
            type = '中度肥胖';
            color = '#FF6C03';
        }
        else {
            type = '重度肥胖';
            color = '#FF1200';
        }
        result.children[0].style['borderColor'] = color;
        result.style.color = color;
        result.children[1].style['backgroundColor'] = color;
        result.children[2].textContent = type;
        let date = new Date(),
            y = String(date.getFullYear()),
            m = String(date.getMonth() + 1).padStart(2, '0'),
            d = String(date.getDate()).padStart(2, '0');
        record.unshift(
            {
                'type': type,
                'color': color,
                'bmi': bmi,
                'weight': weight,
                'height': height,
                'date': m + '-' + d + '-' + y,
            }
        );
        localStorage.setItem('record', JSON.stringify(record));

        showRecord();
    } else {
        inputs.classList.add('empty');
    }
};

// 清空輸入框
let renew = document.querySelector('.renew');
renew.addEventListener('click', function (event) {
    submit.style.display = 'flex';
    result.style.display = 'none';
    inputs.children[1].value = '';
    inputs.children[3].value = '';
    inputs.children[1].focus();
}, false);

// 顯示紀錄
let records = document.querySelector('.main .records');
function showRecord() {
    records.innerHTML = '';
    let recordLength = record.length;
    for (let i = 0; i < recordLength; i++) {
        records.innerHTML += '<li class="record" data-number="'
            + i
            + '"style="border-color:'
            + record[i].color
            + '"><div class="type">'
            + record[i].type
            + '</div><div class="bmi"><span class="key">BMI</span><span class="value">'
            + record[i].bmi
            + '</span></div><div class="weight"><span class="key">weight</span><span class="value">'
            + record[i].weight
            + 'kg</span></div><div class="height"><span class="key">height</span><span class="value">'
            + record[i].height
            + 'cm</span></div><div class="date">'
            + record[i].date
            + '</div><button class="delete">╳</button></li >';
    }
}

// 刪除紀錄
records.addEventListener('click', function (event) {
    if (event.target.className == 'delete') {
        record.splice(parseInt(event.target.parentElement.dataset.number), 1);
        localStorage.setItem('record', JSON.stringify(record));
        showRecord();
    }
}, false);

// 刪除全部紀錄
document.querySelector('.main .delete-all').addEventListener('click', function () {
    record = [];
    localStorage.setItem('record', JSON.stringify(record));
    showRecord();
}, false);

showRecord();