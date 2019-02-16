const forms = document.getElementsByTagName('form');
const dayInMilliseconds = 24*60*60*1000;


for(let i = 0; i<forms.length; i++) {
    let length = forms[i].length;
    forms[i].elements[0].min = (new Date()).toISOString().split('T')[0]; 
    
    forms[i].elements[0].addEventListener('change', function() {
        forms[i].elements[1].disabled = false;
        forms[i].elements[length-1].disabled = false;
        forms[i].elements[1].min = new Date(new Date(forms[i][0].value).getTime()+dayInMilliseconds).toISOString().split('T')[0];  
    })

    forms[i].elements[length-2].addEventListener('click', function() {
        forms[i].reset();
        forms[i].elements[1].disabled = true;
        forms[i].elements[length-1].disabled = true;
    })
}