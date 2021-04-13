const api = {
	key: '206a05d5aca4673b3c39375f43ce0dd1',
	baseUrl: 'https://api.openweathermap.org/data/2.5/',
};

let setQuery = (event) => {
	if (event.keyCode == 13) {
		getResults(searchbox.value);
		console.log(searchbox.value);
	}
};

let getResults = (query) => {
	fetch(`${api.baseUrl}weather?q=${query}&units=metric&APPID=${api.key}`)
		.then((weather) => {
			return weather.json();
		})
		.then(displayResults);
};

let dateBuilder = (date) => {
	let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

	let day = days[date.getDay()];
	let myDate = date.getDate();
	let month = months[date.getMonth()];
	let year = date.getFullYear();

	return `${day} ${myDate} ${month} ${year}`;
};

let displayResults = (weather) => {
	// console.log(weather);

	let city = document.querySelector('.location .city');
	let now = new Date();
	let date = document.querySelector('.location .date');

	city.innerText = `${weather.name}, ${weather.sys.country}`;
	date.innerText = dateBuilder(now);

	let temp = document.querySelector('.current .temp');
	temp.innerHTML = `${Math.round(weather.main.temp).toFixed(0)}<span>°c</span>`;

	let weatherElement = document.querySelector('.current .weather');
	weatherElement.innerText = weather.weather[0].main;

	let hilow = document.querySelector('.current .hi-low');
	hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
};

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);
