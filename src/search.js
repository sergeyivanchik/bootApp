import countryRequest from './service.js';
import {saveItem} from './storage.js';
import './search.scss';
import 'bootstrap';

const forms = document.getElementsByTagName('form');
const dayInMilliseconds = 24*60*60*1000;
const historyPage = document.getElementById('history-link');

countryRequest().then(addCountries); 

function addCountries(data) {
    let fromFlight = document.getElementById('select-from-flights');
    let toFlight = document.getElementById('select-to-flights');

    for(let i = 0; i < data.length; i++){
        let option = document.createElement('option');
        option.value = data[i].name;
        option.innerHTML = data[i].name;
        fromFlight.appendChild(option.cloneNode(true));
        toFlight.appendChild(option);
    }
}

for(let i = 0; i < forms.length; i++) {
    let length = forms[i].length;
    forms[i].elements[0].min = (new Date()).toISOString().split('T')[0]; 
    forms[i].elements[0].addEventListener('change', function() {
        forms[i].elements[1].disabled = false;
        forms[i].elements[length-1].disabled = false;
        forms[i].elements[1].min = new Date(new Date(forms[i][0].value).getTime()+dayInMilliseconds).toISOString().split('T')[0];  
    });

forms[i].elements[length-2].addEventListener('click', function() {
    forms[i].reset();
    forms[i].elements[1].disabled = true;
    forms[i].elements[length-1].disabled = true;
});

forms[i].elements[length-1].addEventListener('click', function() {  
    saveItem(forms[i]);
    });  
}

historyPage.addEventListener('click', function () {
    function getPage() {
        return  JSON.parse(localStorage.getItem('Page'))||[];
    }
    
    function setPage(historyList) {
        return localStorage.setItem('Page',JSON.stringify(historyList));
    }

    let historyListPage = getPage();
    let historyObject = {};
    historyObject.page = 1;  
    historyListPage.push(historyObject);
    setPage(historyListPage);
})