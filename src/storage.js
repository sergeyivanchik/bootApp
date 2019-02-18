function getHistory() {
    return  JSON.parse(localStorage.getItem('Key'))||[];
}

function setHistory(historyList) {
    return localStorage.setItem('Key',JSON.stringify(historyList));
}

function saveItem (form) {
    let historyList = getHistory();
    let historyObject = {};
    let length = form.elements.length-2;
    for(let i = 0; i < length; i++) {
        historyObject[form.elements[i].id] = form.elements[i].value;
    }
    historyList.push(historyObject);
    setHistory(historyList);
};

function getPage() {
    return  JSON.parse(localStorage.getItem('Page'))||[];
}

function setPage(historyList) {
    return localStorage.setItem('Page',JSON.stringify(historyList));
}

function savePage (page) {
    let historyListPage = getPage();
    let historyObject = {};
    historyObject.page = page;  
    historyListPage.push(historyObject);
    setPage(historyListPage);
};

export {getHistory, setHistory, saveItem, setPage, getPage, savePage};