let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
  },
  moscow: {
    temp: -5,
    humidity: 20,
  },
};

// let city = cityFirst.toLowerCase();
// let cityFirst = prompt("Enter city");
//
// if (weather[city] !== undefined) {
//   let temperature = Math.round(weather[city].temp);
//   let temperatureF = Math.round(temperature * 1.8 + 32);
//   let humidity = weather[city].humidity;
//
//   alert(
// `It is currently ${temperature}°C (${temperatureF}°F) in Paris with a humidity of ${humidity}%`
//   );
// } else {
//   alert(
// `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`
//   );
// }

// ⏰Feature #1
// In your project, display the current date and time using JavaScript: Tuesday 16:00

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let dateToday = new Date();
let dayToday = days[dateToday.getDay()];
let hoursToday = dateToday.getHours();
let minutesToday = dateToday.getMinutes();

let dateAndTime = document.querySelector("#date-and-time");

if (hoursToday < 10) {
  hoursToday = `0${hoursToday}`;
}
if (minutesToday < 10) {
  minutesToday = `0${hoursToday}`;
}
dateAndTime.innerHTML = `${dayToday} ${hoursToday}:${minutesToday} minutes`;

// 🕵️‍♀️Feature #2
// Add a search engine, when searching for a city (i.e. Paris), display the city name on the page after the user submits the form.

function dateFunction(event) {
  event.preventDefault();

  let actualTemperature = document.querySelector("#actualTemperature");
  let citySearched = document.querySelector("#citySearched");
  let searchField = document.querySelector("#search-city");
  citySearched.innerHTML = searchField.value;
  let apiKeyWeather = "602c4f12fdc5707a356fb2740b6b3e24";
  let cityWeatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${searchField.value}&appid=${apiKeyWeather}&units=metric`;

  axios.get(cityWeatherApi).then(function cityWeatherApiShow(respond) {
    let apiTemperatureCity = Math.round(respond.data.main.temp);
    actualTemperature.innerHTML = `${apiTemperatureCity}˚`;

    let humidity = respond.data.main.humidity;
    let detailsHumidity = document.querySelector(".city-searched-more-info-2");
    detailsHumidity.innerHTML = `Humidity: ${humidity}%`;

    let wind = respond.data.wind.speed;
    let detailsWind = document.querySelector(".wind");
    detailsWind.innerHTML = `Wind: ${wind}km/h`;

    let details = respond.data.weather[0].main;
    let detailsWeather = document.querySelector(".details-weather");
    detailsWeather.innerHTML = `${details}`;
  });
}

let search = document.querySelector(".main-search");
search.addEventListener("submit", dateFunction);

function changeTemperatureF(event) {
  let apiKeyWeather = "602c4f12fdc5707a356fb2740b6b3e24";
  let cityWeatherApi = `https://api.openweathermap.org/data/2.5/weather?q=Kyiv&appid=${apiKeyWeather}&units=imperial`;
  axios.get(cityWeatherApi).then(function cityWeatherApiShow(respond) {
    let apiTemperatureCity = Math.round(respond.data.main.temp);
    actualTemperature.innerHTML = `${apiTemperatureCity}˚`;
  });
}
let farenheit = document.querySelector(".farengeit");
farenheit.onclick = changeTemperatureF;

function changeTemperatureC(event) {
  let apiKeyWeather = "602c4f12fdc5707a356fb2740b6b3e24";
  let cityWeatherApi = `https://api.openweathermap.org/data/2.5/weather?q=Kyiv&appid=${apiKeyWeather}&units=metric`;
  axios.get(cityWeatherApi).then(function cityWeatherApiShow(respond) {
    let apiTemperatureCity = Math.round(respond.data.main.temp);
    actualTemperature.innerHTML = `${apiTemperatureCity}˚`;
  });
}
let celsius = document.querySelector(".celcius");
celsius.onclick = changeTemperatureC;

function currentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let getTemperature = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=602c4f12fdc5707a356fb2740b6b3e24&units=metric`;

  axios.get(getTemperature).then(function temp(response) {
    let place = response.data.name;

    let citySearched = document.querySelector("#citySearched");
   
    citySearched.innerHTML = place;

    let apiTemperatureCity = Math.round(response.data.main.temp);
    actualTemperature.innerHTML = `${apiTemperatureCity}˚`;

    let humidity = response.data.main.humidity;
    let detailsHumidity = document.querySelector(".city-searched-more-info-2");
    detailsHumidity.innerHTML = `Humidity: ${humidity}%`;

    let wind = response.data.wind.speed;
    let detailsWind = document.querySelector(".wind");
    detailsWind.innerHTML = `Wind: ${wind}km/h`;

    let details = response.data.weather[0].main;
    let detailsWeather = document.querySelector(".details-weather");
    detailsWeather.innerHTML = `${details}`;
  });
}

function currentFunction() {
  navigator.geolocation.getCurrentPosition(currentPosition);
}

let searchCurrent = document.querySelector(".search-city-button-current");

searchCurrent.onclick = currentFunction;
