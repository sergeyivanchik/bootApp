const historyList = document.getElementById('history-list');
const historyPages = document.getElementById('history-pages');
const countHistoryOnPage = 2;
var historyArray = JSON.parse(localStorage.getItem('Key'))||[];
var countPages;
var iconsDelete = document.getElementsByTagName('i');
//определяем количество страниц для отображение истории
if (historyArray.length % countHistoryOnPage != 0) {
    countPages = Math.trunc(historyArray.length / countHistoryOnPage) + 1;
}
else {
    countPages = Math.trunc(historyArray.length / countHistoryOnPage);
}
//создание страничек
for (let i = 1; i <= countPages; i++) {
    let li = document.createElement('li');
    li.setAttribute('class', 'page-item');
    historyPages.appendChild(li);
    var a = document.createElement('a');
    a.setAttribute('class', 'page-link');
    a.innerHTML = i;
    li.appendChild(a);
}

function showHistory(i) {
    if (historyArray[i] != undefined) {
        var li = document.createElement('li');
        li.setAttribute('id',i);
        let buttonDelete = document.createElement('i');
        buttonDelete.setAttribute('class', 'fas fa-times');
        buttonDelete.setAttribute('id', i);
        li.innerHTML = `${historyArray[i].startDateFlights} ${historyArray[i].endDateFlights} ${historyArray[i].fromFlights} ${historyArray[i].toFlights}  `;
        historyList.appendChild(li);
        li.appendChild(buttonDelete);
    }
}

for (let i = 0; i < countHistoryOnPage; i++) {
    showHistory(i);
}

addEventListener('click', function (event) {
    if (event.target.classList == 'page-link') {
        while (historyList.firstChild) {
            historyList.firstChild.remove();
        }
        for (let i = event.target.innerHTML * countHistoryOnPage - countHistoryOnPage; i < event.target.innerHTML * countHistoryOnPage; i++) {
            showHistory(i);
        }
    }
})
 function changeDate(date) {
    var options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      };
 
    return new Date(date).toLocaleString("en-US", options);
 }

 for(let i = 0; i < iconsDelete.length; i++) {
    iconsDelete[i].addEventListener('click', function() {
        var idElement = iconsDelete[i].id;
        historyList.removeChild(document.getElementById(idElement));
        historyArray.splice(idElement,1);
        localStorage.setItem('Key',JSON.stringify(historyArray));
        for (let i = event.target.innerHTML * countHistoryOnPage - countHistoryOnPage; i < event.target.innerHTML * countHistoryOnPage; i++) {
            showHistory(i);
        }
    })
 }