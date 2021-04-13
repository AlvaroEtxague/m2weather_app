"use strict";

var api = {
  key: '206a05d5aca4673b3c39375f43ce0dd1',
  baseUrl: 'https://api.openweathermap.org/data/2.5/'
};

var setQuery = function setQuery(event) {
  if (event.keyCode == 13) {
    getResults(searchbox.value);
    console.log(searchbox.value);
  }
};

var getResults = function getResults(query) {
  fetch("".concat(api.baseUrl, "weather?q=").concat(query, "&units=metric&APPID=").concat(api.key)).then(function (weather) {
    return weather.json();
  }).then(displayResults);
};

var dateBuilder = function dateBuilder(date) {
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  var day = days[date.getDay()];
  var myDate = date.getDate();
  var month = months[date.getMonth()];
  var year = date.getFullYear();
  return "".concat(day, " ").concat(myDate, " ").concat(month, " ").concat(year);
};

var displayResults = function displayResults(weather) {
  // console.log(weather);
  var city = document.querySelector('.location .city');
  var now = new Date();
  var date = document.querySelector('.location .date');
  city.innerText = "".concat(weather.name, ", ").concat(weather.sys.country);
  date.innerText = dateBuilder(now);
  var temp = document.querySelector('.current .temp');
  temp.innerHTML = "".concat(Math.round(weather.main.temp).toFixed(0), "<span>\xB0c</span>");
  var weatherElement = document.querySelector('.current .weather');
  weatherElement.innerText = weather.weather[0].main;
  var hilow = document.querySelector('.current .hi-low');
  hilow.innerText = "".concat(Math.round(weather.main.temp_min), "\xB0c / ").concat(Math.round(weather.main.temp_max), "\xB0c");
};

var searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);