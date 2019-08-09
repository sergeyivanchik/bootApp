function getHistory(key) {
    return  JSON.parse(localStorage.getItem(key))||[];
}

function setHistory(historyList, key) {
    return localStorage.setItem(key, JSON.stringify(historyList));
}

function saveItem (form) {
    let historyList = getHistory('Key');
    let historyObject = {};
    let length = form.elements.length-2;
    for(let i = 0; i < length; i++) {
        historyObject[form.elements[i].id] = form.elements[i].value;
    }
    historyList.push(historyObject);
    setHistory(historyList,'Key');
};
/*
function getPage() {
    return  JSON.parse(localStorage.getItem('Page'))||[];
}

function setPage(historyList) {
    return localStorage.setItem('Page',JSON.stringify(historyList));
}
*/
function savePage (page) {
    let historyListPage = getHistory('Page');
    let historyObject = {};
    historyObject.page = page;  
    historyListPage.push(historyObject);
    setHistory(historyListPage,'Page');
};

export {getHistory, setHistory, saveItem, savePage};