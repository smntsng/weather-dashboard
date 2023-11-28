var searchInputEl = document.getElementById("search-input");
var searchButtonEl = document.getElementById("search-button")
var historyEl = document.getElementById("history");
var searchHistory = [];

searchButtonEl.addEventListener("click", function(e) {
    // prevent form from refreshing
    e.preventDefault(); 


    var userSearch = searchInputEl.value;
    localStorage.setItem("userSearch", userSearch);

    var userSearchGet = localStorage.getItem('userSearch');


searchHistory.unshift(userSearchGet)

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


    var iconcode = data.list[0].weather[0].icon
    var iconUrl = "http://openweathermap.org/img/w/" + iconcode + ".png";
    console.log(iconUrl)
    
    var iconImg = document.createElement("img");
    iconImg.src = iconUrl;

    todayEL.appendChild(h1El);
    todayEL.appendChild(iconImg);


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


    var forecastEl = document.getElementById("forecast");
    forecastEl.innerHTML = "";


    for (var i = 0; i < 40; i+=7) {
      var forecastDate = dayjs(data.list[i].dt_txt).format("DD-MM-YYYY");
      console.log(forecastDate)
      console.log(i)
    

    var forecastDiv = document.createElement("div");
    forecastDiv.classList.add("forecastCard");
    var h3Title = document.createElement("h3");
    var iconImg = document.createElement("img");
    var tempP = document.createElement("p");
    var windP = document.createElement("p");
    var humidityP = document.createElement("p");
    var iconImg = document.createElement("img");
    var forecastEl = document.getElementById("forecast");
forecastEl.classList.add("forecast-container");

    
 
    h3Title.textContent = forecastDate;
    var iconcode = data.list[i].weather[0].icon;
var iconUrl = "http://openweathermap.org/img/w/" + iconcode + ".png";
iconImg.src = iconUrl;
    var forecastTemp = Math.floor(data.list[i].main.temp - 273.15);
    tempP.textContent = "Temp: " + forecastTemp + "ºC";
    var forecastWind = data.list[i].wind.speed;
    windP.textContent = "Wind: " + forecastWind + " KPH";
    var forecastHumidity = data.list[i].main.humidity;
    humidityP.textContent = "Humidity: " + forecastHumidity + "%";
console.log(forecastTemp)
console.log(forecastWind)
console.log(forecastHumidity)

forecastDiv.appendChild(h3Title);
forecastDiv.appendChild(iconImg);
forecastDiv.appendChild(tempP);
forecastDiv.appendChild(windP);
forecastDiv.appendChild(humidityP);
forecastEl.appendChild(forecastDiv);

}
});
  })

});



function updateSearchHistory() {
    historyEl.innerHTML = "";
    var ulEL = document.createElement("ul");
    searchHistory.forEach(function(city) {
        var liEL = document.createElement("li");
        liEL.textContent = city;
        ulEL.appendChild(liEL);
    });
    historyEl.appendChild(ulEL)};