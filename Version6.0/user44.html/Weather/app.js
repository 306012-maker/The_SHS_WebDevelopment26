// || API KEY ||
const key = "3b3d7ee928112590da0656922ffe4c02";

// Hardcoded coordinates for Shakopee
var latitude = "44.7974";
var longitude = "-93.5273";

// SELECT ELEMENTS
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

const humidityElement = document.querySelector(".humidity-value");
const windElement = document.querySelector(".wind-value"); 
const updateTimeElement = document.querySelector(".update-time");

// App data
const weather = {};

weather.temperature = {
    unit : "celsius"
}

// APP CONSTS AND VARS
const KELVIN = 273;

// GET WEATHER FROM API PROVIDER
function getWeather(){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    
    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
            // CHANGE #2: Save humidity value from API data
            weather.humidity = data.main.humidity; 
            weather.windSpeed = data.wind.speed;
        })
        .then(function(){
            displayWeather();
        });
}

// DISPLAY WEATHER TO UI
function displayWeather(){
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
    // CHANGE #2: Render humidity to the screen
    humidityElement.innerHTML = weather.humidity;
    windElement.innerHTML = weather.windSpeed; 

    // ADDED FOR TIMESTAMP: Create a date object and extract the local time string
    let currentTime = new Date();
    let formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Render the current time into the HTML element
    updateTimeElement.innerHTML = formattedTime;
}

// C to F conversion
function celsiusToFahrenheit(temperature){
    return (temperature * 9/5) + 32;
}

// WHEN THE USER CLICKS ON THE TEMPERATURE ELEMENT
tempElement.addEventListener("click", function(){
    if(weather.temperature.value === undefined) return;
    
    if(weather.temperature.unit == "celsius"){
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);
        
        tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    }else{
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius"
    }
});

getWeather();