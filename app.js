const apiKey = config.MY_API_TOKEN;
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric`;
const apiUrlHourly = `https://pro.openweathermap.org/data/2.5/forecast/hourly?units=metric`;

let cityName = document.querySelector(".search input");
let weatherImg = document.querySelector(".weather-icon");
let searchBtn = document.querySelector(".searchButton");
let locationButton = document.querySelector(".mylocation");


// User's current Location
locationButton.addEventListener("click", () => {
    if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const apiUrlLatLon_1 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`;
        const apiUrlLatLon_2 = `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&units=metric`;
        showWeather(apiUrlLatLon_1, apiUrlLatLon_2);
        
    }, error => {
        console,log("Location access denied. Please enable permissions to use this feature.");
    });
}else{
    console.error("Geolocation is not supported by this browser.");
}
});

let hourlyWeatherDiv = document.querySelector(".hourly-weather .weather-list");


// Calculate the next 24 hours timestamp and settig the HTML for Hourly weather
const displayHourlyForecast = (hourlyData) => {
    const currentHour = new Date().setMinutes(0, 0, 0);
    const next24Hours = currentHour + 24 * 60 *60 * 1000;

    const next24HoursData = hourlyData.filter(({dt_txt}) => {
        const forecastTime = new Date(dt_txt).getTime();
        return forecastTime >= currentHour && forecastTime <= next24Hours;
    });

    console.log(next24HoursData);

    hourlyWeatherDiv.innerHTML = next24HoursData.map(item => {
        let time = item.dt_txt.slice(11, 16);
        let temparature = Math.round(item.main.temp) + "\u00B0C";
        
        if(item.weather[0].main == "Clear"){
            src = "images/clear.png";
        }else if(item.weather[0].main == "Clouds"){
            src = "images/clouds.png";
        }else if(item.weather[0].main == "Rain"){
            src = "images/rain.png";
        }else if(item.weather[0].main == "Drizzle"){
            src = "images/drizzle.png";
        }else if(item.weather[0].main == "Mist"){
            src = "images/mist.png";
        }

        return `<li class="weather-item">
                    <p class="time">${time}</p>
                    <img src=${src} class="weather-item-icon">
                    <p class="weather-item-temp">${temparature}</p>
                </li>`
    }).join("");


}


// Show Current Weather data and Hourly Weather Data
const showWeather = async (apiUrl, apiUrlHourly) => {
    let data = await getWeather(apiUrl + `&q=${cityName.value}`);
    console.log(data);

    console.log(cityName.value);
    document.querySelector(".city").innerText = data.name;
    document.querySelector(".temp").innerText = Math.round(data.main.temp) + "\u00B0C";
    document.querySelector(".weather-desc").innerText = data.weather[0].description[0].toUpperCase() + data.weather[0].description.slice(1);
    document.querySelector(".humidity").innerText = data.main.humidity + "%";
    document.querySelector(".humidity+p").innerHTML = "Humidity";
    document.querySelector(".humidity-icon").setAttribute("src", "images/humidity.png");
    document.querySelector(".wind").innerText = data.wind.speed + " km/h";
    document.querySelector(".wind+p").innerHTML = "Wind Speed";
    document.querySelector(".wind-icon").setAttribute("src", "images/wind.png");

    if(data.weather[0].main == "Clear"){
        weatherImg.setAttribute("src", "images/clear.png");
    }else if(data.weather[0]. main == "Clouds"){
        weatherImg.setAttribute("src", "images/clouds.png");
    }else if(data.weather[0]. main == "Rain"){
        weatherImg.setAttribute("src", "images/rain.png");
    }else if(data.weather[0]. main == "Drizzle"){
        weatherImg.setAttribute("src", "images/drizzle.png");
    }else if(data.weather[0]. main == "Mist"){
        weatherImg.setAttribute("src", "images/mist.png");
    }


    if(cityName.value.length > 0){
        let hourlyData = await getWeatherHourly(apiUrlHourly + `&q=${cityName.value}`);
        console.log(hourlyData);
        displayHourlyForecast(hourlyData);
        setTimeout(() => {
            cityName.value = ''
        }, 1000);
    }else{
        let hourlyData = await getWeatherHourly(apiUrlHourly);
        console.log(hourlyData);
        displayHourlyForecast(hourlyData);
        cityName.value = data.name;
    }

  
    
    document.querySelectorAll(".weather, .hourly-weather").forEach(element => {
        element.style.display = "block";
    });

}


// Search Weather from the Input Box and with the Search Button
searchBtn.addEventListener("click", async () => {
    showWeather(apiUrl, apiUrlHourly);
})



// Current Weather Data
async function getWeather(apiUrl) {
    try{
        let res = await axios.get(apiUrl + `&appid=${apiKey}`);
        return res.data;
    }catch(err){
        console.log("Error Occured:", err);
    }
    
}


// Hourly Weather Data
async function getWeatherHourly(apiUrlHourly) {
    try{
        let res = await axios.get(apiUrlHourly + `&appid=${apiKey}`);
        return res.data.list;
    }catch(err){
        console.log("Error Occured:", err);
    }
    
}


