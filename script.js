const apikey = "94a008cd38dd31fcbdf791574c23f68d";
const apiurl = "https://api.openweathermap.org/data/2.5/";
const search = document.querySelector(".search input");
const form = document.querySelector(".search button");
const whetherIcon = document.querySelector(".weather-icon");

async function getWeather(city) {
	const response = await fetch(apiurl + `weather` + `?units=metric&q=` + city.trim() + `&appid=${apikey}`);
	const response2 = await fetch(apiurl + `forecast` + `?units=metric&q=` + city.trim() + `&appid=${apikey}`);
	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

	if (response.status == 404) {
		document.querySelector('.error').style.display = "block";
		document.querySelector('.weather').style.display = "none";
	} else {
		const data = await response.json();
		const data2 = await response2.json();

		document.querySelector('.city').innerText = data.name;
		document.querySelector('.country').innerText = data.sys.country;
		document.querySelector('.climate').innerText = data.weather[0].main;
		document.querySelector('.temp').innerText = Math.round(data.main.temp) + "°C";
		document.querySelector('.humidity').innerText = data.main.humidity + "%";
		document.querySelector('.wind').innerText = data.wind.speed + "km/h";

		document.querySelector('.weather1').innerHTML = data2.list[0].weather[0].main;
		document.querySelector('.weather2').innerHTML = data2.list[8].weather[0].main;
		document.querySelector('.weather3').innerHTML = data2.list[16].weather[0].main;
		document.querySelector('.weather4').innerHTML = data2.list[24].weather[0].main;
		document.querySelector('.weather5').innerHTML = data2.list[32].weather[0].main;
		document.querySelector('.weather6').innerHTML = data2.list[39].weather[0].main;

		// Helper function to return the corresponding icon path
		function getWeatherIcon(weatherType) {
			switch (weatherType) {
				case "Clouds":
					return "images/clouds.png";
				case "Clear":
					return "images/clear.png";
				case "Rain":
					return "images/rain.png";
				case "Drizzle":
					return "images/drizzle.png";
				case "Snow":
					return "images/snow.png";
				case "Mist":
					return "images/clear.png";
				default:
					return "images/default.png"; // Fallback icon
			}
		}

		const indices = [0, 8, 16, 24, 32, 39];

		for (let i = 0; i < indices.length; i++) {
			// Get the weather type from the API data
			const weatherMain = data2.list[indices[i]].weather[0].main;

			// Retrieve the corresponding icon using our helper function
			const iconSrc = getWeatherIcon(weatherMain);

			// Update the image source for the forecast element
			document.querySelector(`.forecaste-icon-${i + 1}`).src = iconSrc;
		}


		// today date
		let date = new Date(data2.list[0].dt_txt);
		let day = date.getDate();
		let month = date.getMonth();
		let year = date.getFullYear();
		let month2 = months[month];
		document.querySelector('.current-date').innerText = day + ", " + month2 + " " + year;
		// today date end

		const months1 = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

		function formatForecastDate(index, selector) {
			if (data2.list[index]) {
				let forecastDate = new Date(data2.list[index].dt_txt);
				let day = forecastDate.getDate();
				let monthName = months1[forecastDate.getMonth()];
				document.querySelector(selector).innerText = `${day}, ${monthName}`;
			}

		}
		const forecastIndexes = [0, 8, 16, 24, 32, 39];
		const selectors = ['.day1', '.day2', '.day3', '.day4', '.day5', '.day6'];

		forecastIndexes.forEach((index, i) => formatForecastDate(index, selectors[i]));

		function formatForecastTemp(index, selector) {
			if (data2.list[index]) {
				let forecastTemp = Math.round(data2.list[index].main.temp);
				document.querySelector(selector).innerText = `${forecastTemp}°C`;

			}

		}
		const forecastIndexes2 = [0, 8, 16, 24, 32, 39];
		const selectors2 = ['.temp1', '.temp2', '.temp3', '.temp4', '.temp5', '.temp6'];
		forecastIndexes2.forEach((index, i) => formatForecastTemp(index, selectors2[i]));

		if (data.weather[0].main == "Clear") {
			whetherIcon.src = "images/clear.png";
		} else if (data.weather[0].main == "Clouds") {
			whetherIcon.src = "images/clouds.png";
		} else if (data.weather[0].main == "Rain") {
			whetherIcon.src = "images/rain.png";
		} else if (data.weather[0].main == "Drizzle") {
			whetherIcon.src = "images/drizzle.png";
		} else if (data.weather[0].main == "mist") {
			whetherIcon.src = "images/mist.png";
		} else if (data.weather[0].main == "Snow") {
			whetherIcon.src = "images/snow.png";
		}
		document.querySelector('.weather').style.display = "block";
		document.querySelector('.error').style.display = "none";
	}

}

form.addEventListener("click", () => {
	(getWeather(search.value))

});