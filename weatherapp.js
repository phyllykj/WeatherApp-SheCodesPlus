function changeCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#weatherWhere");
  let chosenCity = `${searchInput.value}`;
  let currentCity = document.querySelector("#selectedCity");
  currentCity.innerHTML = chosenCity;
  let key = "501f8b61699f32b67fc25b5d269da312";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${chosenCity}&appid=${key}&units=${units}`;

  axios.get(`${apiUrl}`).then(cityTemp);
}

let currentCityForm = document.querySelector("#citySearch");
currentCityForm.addEventListener("submit", changeCity);

function cityTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#currentTemp");
  currentTemp.innerHTML = `${temperature}°`;
}

function myLocationTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#currentTemp");
  let myLocation = document.querySelector("#selectedCity");
  currentTemp.innerHTML = `${temperature}°`;
  myLocation.innerHTML = "My Location";
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let key = "501f8b61699f32b67fc25b5d269da312";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=${units}`;

  axios.get(`${apiUrl}`).then(myLocationTemp);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let myLocationButton = document.querySelector("#myLocation");
myLocationButton.addEventListener("click", getPosition);

function showKLWeather() {
  let key = "501f8b61699f32b67fc25b5d269da312";
  let units = "metric";
  let cityname = "Kuala Lumpur";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${key}&units=${units}`;

  axios.get(`${apiUrl}`).then(KLTemp);
}

function KLTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#currentTemp");
  let myLocation = document.querySelector("#selectedCity");
  currentTemp.innerHTML = `${temperature}°`;
  myLocation.innerHTML = "Kuala Lumpur";
}
let KLButton = document.querySelector("#KL");
KLButton.addEventListener("click", showKLWeather);

function showLondonWeather() {
  let key = "501f8b61699f32b67fc25b5d269da312";
  let units = "metric";
  let cityname = "London";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${key}&units=${units}`;

  axios.get(`${apiUrl}`).then(londonTemp);
}

function londonTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#currentTemp");
  let myLocation = document.querySelector("#selectedCity");
  currentTemp.innerHTML = `${temperature}°`;
  myLocation.innerHTML = "London";
}

let londonButton = document.querySelector("#london");
londonButton.addEventListener("click", showLondonWeather);

function defaultCity(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#currentTemp");
  let defaultCity = document.querySelector("#selectedCity");
  currentTemp.innerHTML = `${temperature}°`;
  defaultCity.innerHTML = "Barcelona";
}

function search(city) {
  let key = "501f8b61699f32b67fc25b5d269da312";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=${units}`;

  axios.get(`${apiUrl}`).then(defaultCity);
}

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