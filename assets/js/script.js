var weatherFormEl = document.querySelector("#weather-form");
var daysContainer = document.querySelector("#days-container");
var cityInputEl = document.querySelector("#city");
var repoContainerEl = document.querySelector("#repos-container");
var button = document.querySelector("button");
var storagedCities = document.querySelector("#saved-cities");

var savedCities = [];
var loadCities = function() {
  var apiKey = "afa3a40bc59c27805d067a2a113069e2";

   var savedCity = JSON.parse(localStorage.getItem("savedCities"));
   if(savedCity) {
     storagedCities.innerHTML = "";
        savedCity.forEach(el => {

            var button = document.createElement("button");
            button.classList.add("button-15");
            var cityName = el.slice(0,1).toUpperCase() + el.slice(1);
            button.textContent = cityName;
            var apiUrl =
              "https://api.openweathermap.org/data/2.5/forecast?q=" +
              el +
              ",us&cnt=1&units=imperial&appid=" +
              apiKey;
            button.addEventListener("click", function(e){
              var city = e.target.textContent.toLowerCase();
              getCurrent(city);
              getWeather(city);
            });
            storagedCities.appendChild(button);
        })
    }
  }
loadCities();

var submitFormHandler = function (e) {
    e.preventDefault();

    var city = cityInputEl.value.toLowerCase().trim();

    if (city) {
        getWeather(city);
        getCurrent(city);
        cityInputEl.value = "";
    } else {
        alert("Please enter the city")
    }


}

button.addEventListener("click", submitFormHandler);

var getWeather = function (city) {
  var apiKey = "afa3a40bc59c27805d067a2a113069e2";
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    ",us&cnt=40&units=imperial&appid=" +
    apiKey;

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data.list);
        displayRepos(data.list);
      });
    } else {
      alert("Error: " + response.statusText);
    }
  });
};


var displayRepos = function(repos, searchTerm) {
console.log(repos);
  daysContainer.innerHTML = "";

    for (var i = 0; i < repos.length; i=i+8) {
        var repoDate = repos[i].dt_txt;
        // var repoRain = repos[i].weather[1].description;
        var repoTempMax = repos[i].main.temp_max;
        var repoTempMin = repos[i].main.temp_min;
        var repoWind = repos[i].wind.speed;
        var repoHum = repos[i].main.humidity;
    
        var div = document.createElement("div");
        div.classList.add("days-container");
        var h4 = document.createElement("p");
        h4.classList.add("days-date");
        h4.textContent = repoDate;
        var pRain = document.createElement("p");
        pRain.classList.add("days-rain");
        // pRain.textContent = repoRain;
        var pTempMax = document.createElement("p");
        pTempMax.classList.add("days-temp");
        pTempMax.textContent = "Max temp: " + repoTempMax + "F";
        var pTempMin = document.createElement("p");
        pTempMin.classList.add("days-temp");
        pTempMin.textContent = "Min temp: " + repoTempMin + "F";
        var pWind = document.createElement("p");
        pWind.classList.add("days-wind");
        pWind.textContent = "Wind: " + repoWind+ "mph" ;
        var pHum = document.createElement("p");
        pHum.classList.add("days-hum");
        pHum.textContent = "Humidity: " + repoHum;

        div.appendChild(h4);
        div.appendChild(pRain);
        div.appendChild(pTempMax);
        div.appendChild(pTempMin);
        div.appendChild(pWind);
        div.appendChild(pHum)
        daysContainer.appendChild(div);
    }
}
var getCurrent = function (city) {
  var apiKey = "afa3a40bc59c27805d067a2a113069e2";
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    ",us&cnt=1&units=imperial&appid=" +
    apiKey;

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayCurrent(data.list);
        saveCity(city);
      });
    } else {
      alert("Error: " + response.statusText);
    }
  });
};

var displayCurrent = function(currentRepo) {

    repoContainerEl.innerHTML = "";
      var repoDate = currentRepo[0].dt_txt;
      // var repoRain = repos[i].weather[1].description;
      var repoTempMax = currentRepo[0].main.temp_max;
      var repoTempMin = currentRepo[0].main.temp_min;
      var repoWind = currentRepo[0].wind.speed;
      var repoHum = currentRepo[0].main.humidity;

      var div = document.createElement("div");
      div.classList.add("card-container");
      var h4 = document.createElement("h4");
      h4.classList.add("card-date");
      h4.textContent = repoDate;
      var pRain = document.createElement("p");
      pRain.classList.add("card-rain");
      var pTempMax = document.createElement("p");
      pTempMax.classList.add("card-temp");
      pTempMax.textContent = "Max temp: " + repoTempMax + "F";
      var pTempMin = document.createElement("p");
      pTempMin.classList.add("card-temp");
      pTempMin.textContent = "Min temp: " + repoTempMin + "F";
      var pWind = document.createElement("p");
      pWind.classList.add("card-wind");
      pWind.textContent = "Wind: " + repoWind + "mph";
      var pHum = document.createElement("p");
      pHum.classList.add("card-hum");
      pHum.textContent = "Humidity: " + repoHum;

      div.appendChild(h4);
      div.appendChild(pRain);
      div.appendChild(pTempMax);
      div.appendChild(pTempMin);
      div.appendChild(pWind);
      div.appendChild(pHum);
      repoContainerEl.appendChild(div);
    
}
var saveCity = function(name) {
  var cities = JSON.parse(localStorage.getItem("savedCities")) || [];
  if (!cities.includes(name)) {
  cities.push(name);
  }
  localStorage.setItem("savedCities", JSON.stringify(cities));
  loadCities();
}