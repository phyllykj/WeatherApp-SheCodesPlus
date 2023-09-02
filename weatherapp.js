function changeCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#weatherWhere");
  let chosenCity = `${searchInput.value}`;
  let currentCity = document.querySelector("#selectedCity");
  currentCity.innerHTML = chosenCity;
  let key = "b2d9fa1f2b35557e4615dd5fab218834";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${chosenCity}&appid=${key}&units=${units}`;
  axios.get(`${apiUrl}`).then(cityWeather);
}

let currentCityForm = document.querySelector("#citySearch");
currentCityForm.addEventListener("submit", changeCity);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  return days[day];
}

function getForecastIcon(forecastIconId, forecastIcon) {
  if (forecastIconId === "01d") {
    forecastIcon.innerHTML = "☀️";
  } else if (forecastIconId === "01n") {
    forecastIcon.innerHTML = "🌕";
  } else if (forecastIconId === "02d") {
    forecastIcon.innerHTML = "🌤";
  } else if (forecastIconId === "03d") {
    forecastIcon.innerHTML = "🌥";
  } else if (forecastIconId === "04d") {
    forecastIcon.innerHTML = "☁️";
  } else if (
    forecastIconId === "02n" ||
    forecastIconId === "03n" ||
    forecastIconId === "04n"
  ) {
    forecastIcon.innerHTML = "☁️";
  } else if (
    forecastIconId === "09d" ||
    forecastIconId === "09n" ||
    forecastIconId === "10n"
  ) {
    forecastIcon.innerHTML = "🌧";
  } else if (forecastIconId === "10d") {
    forecastIcon.innerHTML = "🌦";
  } else if (forecastIconId === "11d" || forecastIconId === "11n") {
    forecastIcon.innerHTML = "⛈";
  } else if (forecastIconId === "13d" || forecastIconId === "13n") {
    weatherIcon.innerHTML = "❄️";
  } else if (forecastIconId === "50d" || forecastIconId === "50n") {
    forecastIcon.innerHTML = " 🌬";
  } else forecastIcon.innerHTML = "🌥";
}

function displayForecast(response) {
  let forecast = response.data.daily;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      let forecastDayEl = document.querySelector(`#forecast-day-${index}`);
      forecastDayEl.innerHTML = `${formatDay(forecastDay.dt)}`;
      let forecastDayMinTempEl = document.querySelector(
        `#forecast-day-${index}-min-temp`
      );
      forecastDayMinTempEl.innerHTML = Math.round(forecastDay.temp.min);
      let forecastDayMaxTempEl = document.querySelector(
        `#forecast-day-${index}-max-temp`
      );
      forecastDayMaxTempEl.innerHTML = Math.round(forecastDay.temp.max);

      let forecastIcon = document.querySelector(`#forecast-icon-${index}`);
      let forecastIconId = forecastDay.weather[0].icon;

      getForecastIcon(forecastIconId, forecastIcon);
    }
  });
}
function getForecast(coordinates) {
  let key = "b2d9fa1f2b35557e4615dd5fab218834";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${key}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function getIcon(weatherIconId, weatherIcon) {
  if (weatherIconId === "01d") {
    weatherIcon.innerHTML = "☀️";
  } else if (weatherIconId === "01n") {
    weatherIcon.innerHTML = "🌕";
  } else if (weatherIconId === "02d") {
    weatherIcon.innerHTML = "🌤";
  } else if (weatherIconId === "03d") {
    weatherIcon.innerHTML = "🌥";
  } else if (weatherIconId === "04d") {
    weatherIcon.innerHTML = "☁️";
  } else if (
    weatherIconId === "02n" ||
    weatherIconId === "03n" ||
    weatherIconId === "04n"
  ) {
    weatherIcon.innerHTML = "☁️";
  } else if (
    weatherIconId === "09d" ||
    weatherIconId === "09n" ||
    weatherIconId === "10n"
  ) {
    weatherIcon.innerHTML = "🌧";
  } else if (weatherIconId === "10d") {
    weatherIcon.innerHTML = "🌦";
  } else if (weatherIconId === "11d" || weatherIconId === "11n") {
    weatherIcon.innerHTML = "⛈";
  } else if (weatherIconId === "13d" || weatherIconId === "13n") {
    weatherIcon.innerHTML = "❄️";
  } else if (weatherIconId === "50d" || weatherIconId === "50n") {
    weatherIcon.innerHTML = " 🌬";
  } else weatherIcon.innerHTML = "🌥";
}

function cityWeather(response) {
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperature = Math.round(response.data.main.temp);
  let windspeed = Math.round(response.data.wind.speed);
  let humidity = Math.round(response.data.main.humidity);
  let low = Math.round(response.data.main.temp_min);
  let weatherDescription = response.data.weather[0].description;
  let weatherIcon = document.querySelector("#currentWeather");
  let weatherIconId = response.data.weather[0].icon;
  let currentWindspeed = document.querySelector("#windSpeed");
  let currentHumidity = document.querySelector("#humidityPercentage");
  let currentTemp = document.querySelector("#currentTemp");
  let lowestTemp = document.querySelector("#lowTemp");
  let description = document.querySelector("h6");

  lowestTemp.innerHTML = `${low}`;
  currentTemp.innerHTML = `${temperature}`;
  currentWindspeed.innerHTML = `${windspeed}km/h`;
  currentHumidity.innerHTML = `${humidity}%`;
  description.innerHTML = `"${weatherDescription}"`;
  celciusTemperature = Math.round(response.data.main.temp);
  celciusTemperatureLow = Math.round(response.data.main.temp_min);

  if (temperature <= 18) {
    currentTemp.classList.add("cold-high");
    lowestTemp.classList.add("cold-low");
  } else {
    currentTemp.classList.remove("cold-high");
    lowestTemp.classList.remove("cold-low");
  }

  getIcon(weatherIconId, weatherIcon);
  getForecast(response.data.coord);
}

function myLocationWeather(response) {
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperature = Math.round(response.data.main.temp);
  let windspeed = Math.round(response.data.wind.speed);
  let humidity = Math.round(response.data.main.humidity);
  let low = Math.round(response.data.main.temp_min);
  let weatherDescription = response.data.weather[0].description;
  let weatherIconId = response.data.weather[0].icon;
  let weatherIcon = document.querySelector("#currentWeather");
  let currentWindspeed = document.querySelector("#windSpeed");
  let currentHumidity = document.querySelector("#humidityPercentage");
  let currentTemp = document.querySelector("#currentTemp");
  let myLocation = document.querySelector("#selectedCity");
  let lowestTemp = document.querySelector("#lowTemp");
  let description = document.querySelector("h6");

  lowestTemp.innerHTML = `${low}`;
  currentTemp.innerHTML = `${temperature}`;
  currentWindspeed.innerHTML = `${windspeed}km/h`;
  currentHumidity.innerHTML = `${humidity}%`;
  myLocation.innerHTML = "My Location";
  description.innerHTML = `"${weatherDescription}"`;
  celciusTemperature = Math.round(response.data.main.temp);
  celciusTemperatureLow = Math.round(response.data.main.temp_min);

  if (temperature <= 18) {
    currentTemp.classList.add("cold-high");
    lowestTemp.classList.add("cold-low");
  } else {
    currentTemp.classList.remove("cold-high");
    lowestTemp.classList.remove("cold-low");
  }
  getIcon(weatherIconId, weatherIcon);
  getForecast(response.data.coord);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let key = "b2d9fa1f2b35557e4615dd5fab218834";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=${units}`;

  axios.get(`${apiUrl}`).then(myLocationWeather);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let myLocationButton = document.querySelector("#myLocation");
myLocationButton.addEventListener("click", getPosition);

function showKLWeather() {
  let key = "b2d9fa1f2b35557e4615dd5fab218834";
  let units = "metric";
  let cityname = "Kuala Lumpur";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${key}&units=${units}`;

  axios.get(`${apiUrl}`).then(KLWeather);
}

function KLWeather(response) {
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperature = Math.round(response.data.main.temp);
  let windspeed = Math.round(response.data.wind.speed);
  let humidity = Math.round(response.data.main.humidity);
  let low = Math.round(response.data.main.temp_min);
  let weatherDescription = response.data.weather[0].description;
  let weatherIcon = document.querySelector("#currentWeather");
  let weatherIconId = response.data.weather[0].icon;
  let currentWindspeed = document.querySelector("#windSpeed");
  let currentHumidity = document.querySelector("#humidityPercentage");
  let currentTemp = document.querySelector("#currentTemp");
  let myLocation = document.querySelector("#selectedCity");
  let lowestTemp = document.querySelector("#lowTemp");
  let description = document.querySelector("h6");

  lowestTemp.innerHTML = `${low}`;
  currentTemp.innerHTML = `${temperature}`;
  currentWindspeed.innerHTML = `${windspeed}km/h`;
  currentHumidity.innerHTML = `${humidity}%`;
  myLocation.innerHTML = "Kuala Lumpur";
  description.innerHTML = `"${weatherDescription}"`;
  celciusTemperature = Math.round(response.data.main.temp);
  celciusTemperatureLow = Math.round(response.data.main.temp_min);

  if (temperature <= 18) {
    currentTemp.classList.add("cold-high");
    lowestTemp.classList.add("cold-low");
  } else {
    currentTemp.classList.remove("cold-high");
    lowestTemp.classList.remove("cold-low");
  }

  getIcon(weatherIconId, weatherIcon);
  getForecast(response.data.coord);
}

let KLButton = document.querySelector("#KL");
KLButton.addEventListener("click", showKLWeather);

function showLondonWeather() {
  let key = "b2d9fa1f2b35557e4615dd5fab218834";
  let units = "metric";
  let cityname = "London";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${key}&units=${units}`;
  console.log(apiUrl);
  axios.get(`${apiUrl}`).then(londonWeather);
}

function londonWeather(response) {
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperature = Math.round(response.data.main.temp);
  let windspeed = Math.round(response.data.wind.speed);
  let humidity = Math.round(response.data.main.humidity);
  let low = Math.round(response.data.main.temp_min);
  let weatherDescription = response.data.weather[0].description;
  let weatherIcon = document.querySelector("#currentWeather");
  let weatherIconId = response.data.weather[0].icon;
  let currentWindspeed = document.querySelector("#windSpeed");
  let currentHumidity = document.querySelector("#humidityPercentage");
  let currentTemp = document.querySelector("#currentTemp");
  let myLocation = document.querySelector("#selectedCity");
  let lowestTemp = document.querySelector("#lowTemp");
  let description = document.querySelector("h6");

  lowestTemp.innerHTML = `${low}`;
  currentTemp.innerHTML = `${temperature}`;
  currentWindspeed.innerHTML = `${windspeed}km/h`;
  currentHumidity.innerHTML = `${humidity}%`;
  myLocation.innerHTML = "London";
  description.innerHTML = `"${weatherDescription}"`;
  celciusTemperature = Math.round(response.data.main.temp);
  celciusTemperatureLow = Math.round(response.data.main.temp_min);

  if (temperature <= 18) {
    currentTemp.classList.add("cold-high");
    lowestTemp.classList.add("cold-low");
  } else {
    currentTemp.classList.remove("cold-high");
    lowestTemp.classList.remove("cold-low");
  }

  getIcon(weatherIconId, weatherIcon);
  getForecast(response.data.coord);
}

let londonButton = document.querySelector("#london");
londonButton.addEventListener("click", showLondonWeather);

function defaultCity(response) {
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperature = Math.round(response.data.main.temp);
  let windspeed = Math.round(response.data.wind.speed);
  let humidity = Math.round(response.data.main.humidity);
  let low = Math.round(response.data.main.temp_min);
  let weatherDescription = response.data.weather[0].description;
  let weatherIcon = document.querySelector("#currentWeather");
  let weatherIconId = response.data.weather[0].icon;
  let currentWindspeed = document.querySelector("#windSpeed");
  let currentHumidity = document.querySelector("#humidityPercentage");
  let currentTemp = document.querySelector("#currentTemp");
  let defaultCity = document.querySelector("#selectedCity");
  let lowestTemp = document.querySelector("#lowTemp");
  let description = document.querySelector("h6");

  lowestTemp.innerHTML = `${low}`;
  currentTemp.innerHTML = `${temperature}`;
  currentWindspeed.innerHTML = `${windspeed}km/h`;
  currentHumidity.innerHTML = `${humidity}%`;
  defaultCity.innerHTML = "Barcelona";
  description.innerHTML = `"${weatherDescription}"`;
  celciusTemperature = Math.round(response.data.main.temp);
  celciusTemperatureLow = Math.round(response.data.main.temp_min);

  if (temperature <= 18) {
    currentTemp.classList.add("cold-high");
    lowestTemp.classList.add("cold-low");
  } else {
    currentTemp.classList.remove("cold-high");
    lowestTemp.classList.remove("cold-low");
  }

  getIcon(weatherIconId, weatherIcon);
  getForecast(response.data.coord);
}

function search(city) {
  let key = "b2d9fa1f2b35557e4615dd5fab218834";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=${units}`;

  axios.get(`${apiUrl}`).then(defaultCity);
}

function showFahrenheitTemp(event) {
  event.preventDefault();

  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let tempHigh = document.querySelector("#currentTemp");
  let tempLow = document.querySelector("#lowTemp");

  let fahrenheitTemp = (celciusTemperature * 9) / 5 + 32;
  let fahrenheitTempLow = (celciusTemperatureLow * 9) / 5 + 32;

  tempHigh.innerHTML = Math.round(fahrenheitTemp);
  tempLow.innerHTML = Math.round(fahrenheitTempLow);
}

function showCelciusTemp(event) {
  event.preventDefault();

  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let tempHigh = document.querySelector("#currentTemp");
  let tempLow = document.querySelector("#lowTemp");

  tempHigh.innerHTML = celciusTemperature;
  tempLow.innerHTML = celciusTemperatureLow;
}

let celciusTemperature = null;
let celciusTemperatureLow = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", showCelciusTemp);

search("Barcelona");

let now = new Date();
let h2 = document.querySelector("h2");
let timeNow = document.querySelector(".timeNow");

let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
let day = days[now.getDay()];

let date = now.getDate();

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
let year = now.getFullYear();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let formattedDate = `${day} ${date} ${month} ${year}`;
h2.innerHTML = formattedDate;

let formattedTime = `${hours} : ${minutes}`;
timeNow.innerHTML = formattedTime;

function nightTheme() {
  let container = document.querySelector(".container");
  let body = document.querySelector("body");
  let weatherWrittenDescription = document.querySelector("h6");
  let selectedCity = document.querySelector(".selectedCity");
  let currentTime = document.querySelector(".timeNow");
  let dateAtLocation = document.querySelector("h2");

  if (hours >= 19 || hours < 6) {
    container.classList.add("night-theme");
    body.classList.add("night-theme");
    weatherWrittenDescription.classList.add("night-theme");
    dateAtLocation.classList.add("night-theme");
    selectedCity.classList.add("night-theme");
    currentTime.classList.add("night-theme");
  } else {
    container.classList.remove("night-theme");
    body.classList.remove("night-theme");
    weatherWrittenDescription.classList.remove("night-theme");
    selectedCity.classList.remove("night-theme");
    currentTime.classList.remove("night-theme");
    dateAtLocation.classList.remove("night-theme");
  }
}

nightTheme();
