const apikey = "94a008cd38dd31fcbdf791574c23f68d";
const apiurl = "https://api.openweathermap.org/data/2.5/";
const search = document.querySelector(".search input");
const form = document.querySelector(".search button");
const whetherIcon = document.querySelector(".weather-icon");

async function getWeather(city) {
    const response = await fetch(apiurl +`weather`+`?units=metric&q=` + city + `&appid=${apikey}`);
    const response2 = await fetch(apiurl +`forecast`+`?units=metric&q=` + city + `&appid=${apikey}`);
    if (response.status == 404) {
        document.querySelector('.error').style.display = "block";
        document.querySelector('.weather').style.display = "none";
    }
    else {
        const data = await response.json();
        const data2 = await response2.json();

        document.querySelector('.city').innerText = data.name;
        document.querySelector('.country').innerText = data.sys.country;
        document.querySelector('.climate').innerText = data.weather[0].main;
        document.querySelector('.temp').innerText = Math.round(data.main.temp) + "°C";
        document.querySelector('.humidity').innerText = data.main.humidity + "%";
        document.querySelector('.wind').innerText = data.wind.speed + "km/h";
// forecaste    

//write a program for date extraction from the api response and display it in the html
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    

let date = new Date(data2.list[0].dt_txt);
        let day = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();
       let month2 = months[month] ;
        document.querySelector('.current-date').innerText = day + ", " + month2 + " " + year;

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