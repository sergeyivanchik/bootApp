import './history.scss';
import 'bootstrap';
import {getHistory, setHistory, savePage} from './storage.js';

const historyList = document.getElementById('history-list');
const historyPages = document.getElementById('history-pages');
const countHistoryOnPage = 2;
var history = getHistory('Key');
var countPages;
var iconsDelete = document.getElementsByTagName('i');

function loadHistoryPage() {
    //определяем количество страниц для отображение истории
    if (history.length % countHistoryOnPage != 0) {
        countPages = Math.trunc(history.length / countHistoryOnPage) + 1;
    }
    else {
        countPages = Math.trunc(history.length / countHistoryOnPage);
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
}

function showHistory(i) {
    if (history[i] != undefined) {
        var li = document.createElement('li');
        li.setAttribute('id',i);
        let buttonDelete = document.createElement('i');
        buttonDelete.setAttribute('class', 'fas fa-times');
        buttonDelete.setAttribute('id', i);
        let countProperties = 0;
        for(let key in history[i]) {
            switch(countProperties) {
                case 0: 
                    li.innerHTML += `${changeDate(history[i][key])} - `;
                    break;
                case 1: 
                    li.innerHTML += `${changeDate(history[i][key])}`;
                    break;   
                default:
                    li.innerHTML += `, ${history[i][key]}`;
                    break;        
            }
            countProperties++; 
        }
        historyList.appendChild(li);
        li.appendChild(buttonDelete);
    }
}

addEventListener('click', function (event) {
    if (event.target.classList == 'page-link') {
        localStorage.removeItem('Page');
        savePage(+event.target.innerHTML);
        while (historyList.firstChild) {
            historyList.firstChild.remove();
        }
        for (let i = event.target.innerHTML * countHistoryOnPage - countHistoryOnPage; i < event.target.innerHTML * countHistoryOnPage; i++) {
            showHistory(i);
        }
        deleteHistory();
        
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

function deleteHistory() {
    for(let i = 0; i < iconsDelete.length; i++) {
        iconsDelete[i].addEventListener('click', function() {
            var idElement = iconsDelete[i].id; 
            historyList.removeChild(document.getElementById(idElement));
            history.splice(idElement,1);
            setHistory(history,'Key');
            while (historyList.firstChild) {
                historyList.firstChild.remove();
            }
            while (historyPages.firstChild) {
                historyPages.firstChild.remove();
            }
            window.location.reload();

        })
    }}

 window.onload = function() {
    loadHistoryPage();
    var pages = getHistory('Page');
    var activePage =  pages[pages.length-1].page;
    if(!historyPages.childNodes[activePage]) { 
        activePage --;
        localStorage.removeItem('Page');
        savePage(activePage);
    }  
    for (let i = activePage * countHistoryOnPage - countHistoryOnPage; i < activePage * countHistoryOnPage; i++) {
        showHistory(i);
    }
    deleteHistory();
 } 

