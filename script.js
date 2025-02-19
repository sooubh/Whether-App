const apikey = "94a008cd38dd31fcbdf791574c23f68d";
const apiurl = "https://api.openweathermap.org/data/2.5/";
const search = document.querySelector(".search input");
const form = document.querySelector(".search button");
const whetherIcon = document.querySelector(".weather-icon");

async function getWeather(city) {
    const response = await fetch(apiurl +`weather`+`?units=metric&q=` + city.trim() + `&appid=${apikey}`);
    const response2 = await fetch(apiurl +`forecast`+`?units=metric&q=` + city.trim() + `&appid=${apikey}`);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
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

        let date = new Date(data2.list[0].dt_txt);
        let day = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();
       let month2 = months[month] ;
        document.querySelector('.current-date').innerText = day + ", " + month2 + " " + year;

        document.querySelector('.day1').innerText = data2.list[0].dt_txt;
        let day1 = date.getDay();
        let month1 = date.getMonth();
        
        document.querySelector('.day2').innerText = data2.list[8].dt_txt;
        document.querySelector('.day3').innerText = data2.list[16].dt_txt;
        document.querySelector('.day4').innerText = data2.list[24].dt_txt;
        document.querySelector('.day5').innerText = data2.list[32].dt_txt;
        document.querySelector('.day6').innerText = data2.list[39].dt_txt;


        document.querySelector('.temp1').innerText = Math.round(data2.list[0].main.temp) + "°C";
        document.querySelector('.temp2').innerText = Math.round(data2.list[8].main.temp) + "°C";
        document.querySelector('.temp3').innerText = Math.round(data2.list[16].main.temp) + "°C";
        document.querySelector('.temp4').innerText = Math.round(data2.list[24].main.temp) + "°C";
        document.querySelector('.temp5').innerText = Math.round(data2.list[32].main.temp) + "°C";
        document.querySelector('.temp6').innerText = Math.round(data2.list[39].main.temp) + "°C";
        
// forecaste    


console.log(data2);

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