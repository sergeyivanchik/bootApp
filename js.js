//Form flights

const inputStartDateFlights = document.getElementById('input-start-date-flights'); 
const inputEndDateFlights = document.getElementById('input-end-date-flights'); 
const clearButtonFlights = document.getElementById('button-clear-flights');
const searchButtonFlights = document.getElementById('button-search-flights');  
const formFlights = document.getElementById('form-flights'); 
const dateNow = new Date(); 

inputEndDateFlights.disabled = true;
searchButtonFlights.disabled = true; 
inputStartDateFlights.min =dateNow.toISOString().split('T')[0]; 

inputStartDateFlights.onchange = function(){ 
    inputEndDateFlights.disabled = false;
    searchButtonFlights.disabled = false;  
    let valueInputDate = inputStartDateFlights.value; 
    let dateEnd = new Date(valueInputDate).getTime()+24*60*60*1000; 
    inputEndDateFlights.min = new Date(dateEnd).toISOString().split('T')[0]; 
}; 

clearButtonFlights.addEventListener('click', function() { 
    formFlights.reset(); 
    inputEndDateFlights.disabled = true; 
    searchButtonFlights.disabled = true; 
});

//Form hotels

const inputStartDateHotels = document.getElementById('input-start-date-hotels'); 
const inputEndDateHotels = document.getElementById('input-end-date-hotels'); 
const clearButtonHotels = document.getElementById('button-clear-hotels');
const searchButtonHotels = document.getElementById('button-search-hotels');  
const formHotels = document.getElementById('form-hotels'); 
//const dateNow = new Date(); 

inputEndDateHotels.disabled = true;
searchButtonHotels.disabled = true; 
inputStartDateHotels.min =dateNow.toISOString().split('T')[0]; 

inputStartDateHotels.onchange = function(){ 
    inputEndDateHotels.disabled = false;
    searchButtonHotels.disabled = false;  
    let valueInputDate = inputStartDateHotels.value; 
    let dateEnd = new Date(valueInputDate).getTime()+24*60*60*1000; 
    inputEndDateHotels.min = new Date(dateEnd).toISOString().split('T')[0]; 
}; 

clearButtonHotels.addEventListener('click', function() { 
    formHotels.reset(); 
    inputEndDateHotels.disabled = true; 
    searchButtonHotels.disabled = true; 
});