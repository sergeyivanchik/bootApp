const forms = document.getElementsByTagName('form');
const dayInMilliseconds = 24*60*60*1000;

countryRequest().then(addCountries); 

function makeRequest(url) {
    var status = function (response) {
        if (response.status !== 200) {
            return Promise.reject(new Error(response.statusText))
        }
        return Promise.resolve(response)
    }
    
    var json = function (response) {
        return response.json()
    }
return fetch(url)
        .then(status)
        .then(json)
        .then(function(data) {
            console.log(data);
            return data;
        })
        .catch(function (error) {
          console.log('error', error)
        })
}

function countryRequest() {
    const url = 'https://restcountries.eu/rest/v2/all?fields=name;alpha2Code';
    return makeRequest(url);
}

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


for(let i = 0; i<forms.length; i++) {
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
        
    })
}

var historyArray = JSON.parse(localStorage.getItem('Key'))||[];
var localStorageObject = {};

forms[0].elements[forms[0].length-1].addEventListener('click', function() {
    if(forms[0].elements[1].value != '' && forms[0].elements[2].value != '' && forms[0].elements[3].value != ''){
        localStorageObject = {};
	    localStorageObject.startDateFlights = forms[0].elements[0].value; 
	    localStorageObject.endDateFlights = forms[0].elements[1].value;
	    localStorageObject.fromFlights = forms[0].elements[2].value;
	    localStorageObject.toFlights = forms[0].elements[3].value;
	    historyArray.push(localStorageObject);
        localStorage.setItem('Key',JSON.stringify(historyArray));
    }
})