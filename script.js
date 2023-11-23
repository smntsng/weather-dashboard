console.log("hello")

https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}.

// Create a weather dashboard with form inputs.
// When a user searches for a city they are presented with current and future conditions for that city and that city is added to the search history

// When a user views the current weather conditions for that city they are presented with:
// The city name
// The date
// An icon representation of weather conditions
// The temperature
// The humidity
// The wind speed
// When a user view future weather conditions for that city they are presented with a 5-day forecast that displays:
// The date
// An icon representation of weather conditions
// The temperature
// The humidity
// When a user click on a city in the search history they are again presented with current and future conditions for that city

// 1. connect weather API
    // a. create a var to hold geocoding API URL with a placeholder varible for city
    // b. create a var to hold user input to = city, remember to clean the data, spaces....etc
    // c. create fetch
    // d. fetch the LONG LAT
    // e. create a varible in the weather api that will append the long lat
// 2. append search results to search history
    // a. save user input to a var
    // b. find the value and set item to local storage
    // c. these values need to be "get" and placed in an array
    // d. how do you append this array to screen
// 3. display search data to todays data
    //  fetch the weather api
    // creating a var to hold the temp of the returned data
    // creating a var to hold the wind of the returned data
    // creating a var to hold the humidity of the returned data
// 4. display 5 day forecast to future forecast
    // create 5 cards and append similar to above



// var geocodingURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=c2d42dec65a12122a88666f5d0e55970";


var searchInputEl = document.getElementById("search-input");
var searchButtonEl = document.getElementById("search-button")
var historyEl = document.getElementById("history");
var searchHistory = [];

// adding event listener to search button
searchButtonEl.addEventListener("click", function(e) {
    // prevent form from refreshing
    e.preventDefault(); 

// saving search value to local storage
    var userSearch = searchInputEl.value;
    localStorage.setItem("userSearch", userSearch);
// creating a var to hold the value of userSearch
    var userSearchGet = localStorage.getItem('userSearch');

// adding the newley created varible to the start of the 
searchHistory.unshift(userSearchGet)
// calling function
updateSearchHistory();

});

function updateSearchHistory() {
    // clear html content so to remove duplicates when displaying on browser
    historyEl.innerHTML = "";

    var ulEL = document.createElement("ul");

// iterate through each item in the searchHistory array and create a list item, set the text and append the list item to the unordered list.
    searchHistory.forEach(function(city) {
        var liEL = document.createElement("li");
        liEL.textContent = city;
        ulEL.appendChild(liEL);
    });

// add the new ul to the historyEl
    historyEl.appendChild(ulEL);
}
