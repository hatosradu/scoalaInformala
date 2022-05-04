let state = {
    cities: []
};

var URL_CURRENT_WEATHER = "https://api.openweathermap.org/data/2.5/weather?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=";
var URL_FORECAST_WEATHER = "https://api.openweathermap.org/data/2.5/forecast?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=";
var URL_WEATHER_ICON_PREFIX = "http://openweathermap.org/img/w/"; // sufix .png

let URL_COUNTRIES_WITH_CITIES = "https://countriesnow.space/api/v0.1/countries";

async function onBodyLoad() {
    state.cities = await getCities();
    autocomplete(document.getElementById("myInput"), state.cities);

}

async function getCities() {
    let result = [];

    try {
        let response = await fetch(URL_COUNTRIES_WITH_CITIES);
        let jsonReponse = await response.json();
        if (!jsonReponse.error) {
            for (let country of jsonReponse.data) {
                result = result.concat(country.cities)
            }
        }
        else {
            console.log("Failed to get cities. Error message: " + jsonReponse.msg);
        }
    } catch (error) {
        console.log("Unexpected error: " + error);
    }

    return result;
}

async function onInputKeyPress(event) {
    if (event.keyCode === 13) {
        await onSearch();
    }
}

async function onSearch() {
    let city = document.querySelector("[name='myCountry']").value;
    if (city) {
        let response = await fetch(URL_CURRENT_WEATHER + city);
        if (response.ok) {
            let jsonResponse = await response.json();
            await loadCurrentWeather(jsonResponse);
        }

        await onForecast();
    }
}

async function onForecast() {
    let city = document.querySelector("[name='myCountry']").value;
    if (city) {
        let response = await fetch(URL_FORECAST_WEATHER + city);
        if (response.ok) {
            let jsonResponse = await response.json();
            await loadForecastWeather(jsonResponse);
        }
    }
}

async function loadCurrentWeather(weather) {
    var dateTimeNow = new Date();
    document.querySelector("#city").innerText = weather.name;
    document.querySelector("#status").innerText = `${weather.weather[0].main} (${weather.weather[0].description})`;
    document.querySelector(".weather-header").innerText = dateTimeNow.toUTCString();
    document.querySelector("#weather-celsius").innerHTML = weather.main.temp + "&deg;C";
    document.querySelector("#min-weather").innerHTML = "Min: " + weather.main.temp_min + "&deg;C";
    document.querySelector("#max-weather").innerHTML = "Max: " + weather.main.temp_max + "&deg;C";
    document.querySelector("#actual-weather-icon").src = `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`;
}

async function loadForecastWeather(forecast) {
    let forecastTable = "";

    let dateForecasts = forecast.list.reduce((groups, forecastDay) => {
        let date = forecastDay.dt_txt.split(' ')[0];
        if (!groups[date]) {
            groups[date] = [];
        }

        groups[date].push(forecastDay);
        return groups;
    }, {});

    for (let [key, value] of Object.entries(dateForecasts)) {
        let dayForecastItems = "";

        for (let item of value) {
            let hour = item.dt_txt.split(' ')[1].substring(0, 5);

            dayForecastItems +=
            `
                <div style="text-align: center;">
                    <div>${hour}</div>
                    <img src="http://openweathermap.org/img/w/${item.weather[0].icon}.png" alt="">
                    <div>${item.weather[0].main}</div>
                    <div id="weather-celsius" style="font-size: 36px;">${item.main.temp}&deg;C</div>
                </div>
            `;
        }

        forecastTable += 
        ` 
            <div class="forecast-container">
                <div class="forecast-container-header">${key}</div>
                <div id="forecast-table" class="forecast-container">
                ${dayForecastItems}
                </div>
            </div>
        `;
    }

    document.querySelector("#forecast-weather").innerHTML = forecastTable;
}