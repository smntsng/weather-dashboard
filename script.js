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


// 3. display search data to todays data

// 4. display 5 day forecast to future forecast
    // create 5 cards and append similar to above





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


var city = userSearch
var geocodingURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=c2d42dec65a12122a88666f5d0e55970";

var city = userSearch

fetch(geocodingURL)
  .then(function (response) {
    return response.json();
  }).then(function (data) {

    var lat =data[0].lat
    var lon =data[0].lon

    var weatherURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=c2d42dec65a12122a88666f5d0e55970"


    fetch(weatherURL)
  .then(function (response) {
    return response.json();
  }).then(function (data) {
    console.log(data)
    console.log("temp: " + (Math.floor(data.list[0].main.temp-273.15)))
    console.log("wind: " + data.list[0].wind.speed)
    console.log("humidity: " + data.list[0].main.humidity)
    console.log("city: " + data.city.name)

    
    
    
    var iconcode = data.list[0].weather[0].icon
    var iconUrl = "http://openweathermap.org/img/w/" + iconcode + ".png";
    console.log(iconUrl)
    


   

    var todaysDate = dayjs().format("DD-MM-YYYY");
    console.log(todaysDate)


    document.querySelector("#today").innerHTML = "";
    var todayEL = document.getElementById("today");
    var h1El = document.createElement("h1");
    var city = data.city.name
    var todaysDate = dayjs().format("DD-MM-YYYY");
    var h1Title = document.createTextNode(city + " " + "(" + todaysDate  + ")");
    console.log
    h1El.appendChild(h1Title); 
    todayEL.appendChild(h1El);


    var todayEL = document.getElementById("today");
    var h2El = document.createElement("h2");
    var temp = Math.floor(data.list[0].main.temp-273.15)
    var TempEl = document.createTextNode("Temp: " + temp + "ºC");
    console.log
    h2El.appendChild(TempEl); 
    todayEL.appendChild(h2El);

    var todayEL = document.getElementById("today");
    var h2El = document.createElement("h2");
    var wind = data.list[0].wind.speed
    var windEl = document.createTextNode("Wind: " + wind + " KPH");
    console.log
    h2El.appendChild(windEl); 
    todayEL.appendChild(h2El);

    var todayEL = document.getElementById("today");
    var h2El = document.createElement("h2");
    var humidity = data.list[0].main.humidity
    var humidityEl = document.createTextNode("Humidity: " + humidity + "%");
    console.log
    h2El.appendChild(humidityEl); 
    todayEL.appendChild(h2El);



  })

});

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
    historyEl.appendChild(ulEL)};