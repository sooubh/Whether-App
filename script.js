const apikey = "94a008cd38dd31fcbdf791574c23f68d";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const search = document.querySelector(".search input");
const form = document.querySelector(".search button");
const whetherIcon = document.querySelector(".weather-icon");

async function getWeather(city) {
    const response = await fetch(apiurl + city + `&appid=${apikey}`);
    if (response.status == 404) {
        document.querySelector('.error').style.display = "block";
        document.querySelector('.whether').style.display = "none";
    }
    else {
        const data = await response.json();

        document.querySelector('.city').innerText = data.name;
        document.querySelector('.country').innerText = data.sys.country;
        document.querySelector('.climate').innerText = data.weather[0].main;
        document.querySelector('.temp').innerText = Math.round(data.main.temp) + "°C";
        document.querySelector('.humidity').innerText = data.main.humidity + "%";
        document.querySelector('.wind').innerText = data.wind.speed + "km/h";

console.log(data);

        if (data.weather[0].main == "Clear") {
            whetherIcon.src = "images/clear.png";
        }
        else if (data.weather[0].main == "Clouds") {
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