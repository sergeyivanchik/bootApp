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

export default countryRequest;