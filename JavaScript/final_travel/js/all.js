// 資料串接
let data;
let xhr = new XMLHttpRequest();
xhr.open('get', 'https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97', true);
xhr.send(null);
xhr.onload = function(){
    data = JSON.parse(xhr.responseText).result.records;
}

// 