const form = document.querySelector('form');
const city = document.querySelector('#city');
const feelsLike = document.querySelector('#feelsLike');
const temp = document.querySelector('#temp');
const images = document.querySelectorAll('.image');
const hum = document.querySelector('#humidity');
const wind = document.querySelector('#wind');
const updated = document.querySelector('#updateTime');
const input = document.querySelector('input');
const main = document.querySelector('main');

const apiKey = 'b601a9f2877747f6ba7165927252804';
const url = `http://api.weatherapi.com/v1`;


const get = async (city) => {
    const response = await fetch(`${url}/current.json?key=${apiKey}&q=${city}`)
    const data = await response.json()
    return data
}

form.addEventListener('submit', async (e) =>{
    e.preventDefault();
    const inputValue = input.value;
    const data = await get(inputValue);
    
    // PAIMU INFO IS API
    const cityName = data.location.name;
    const currentTemp = `${data.current.temp_c}°C`;
    const text = data.current.condition.text;
    const icon = data.current.condition.icon;
    const feelsLikeC = data.current.feelslike_c;
    const lastUpdate = data.current.last_updated;
    const humidity = data.current.humidity;
    const windmpH = data.current.wind_mph;
    
    // IDEDU I HTML
    images.forEach(img => img.src = icon);
    city.textContent = cityName;
    feelsLike.textContent = `Feels like: ${feelsLikeC}°C`;
    temp.textContent = currentTemp;
    hum.textContent = `Humidity: ${humidity}%`;
    wind.textContent = `Wind: ${windmpH} mph`;
    updated.textContent = `Last time updated: ${lastUpdate}`
    document.querySelector('#text').textContent = `Today is: ${text}`;
    
    await renderForecast(inputValue);
})

// 7 dienu oru prognoze

const getWeek = async (city) => {
    const response = await fetch(`${url}/forecast.json?key=${apiKey}&q=${city}&days=7`);
    const data = await response.json()
    return data
}

const renderForecast = async (city) => {
    main.innerHTML = '';

    const data = await getWeek(city);
    const forecastInfo = document.createElement('div');
    forecastInfo.innerHTML = '';
    data.forecast.forecastday.forEach(day => {
        const date = day.date;
        const icon = day.day.condition.icon;
        const condition = day.day.condition.text;
        const maxTemp = day.day.maxtemp_c;
        const minTemp = day.day.mintemp_c;

        const dayFc = `
<div class="forecast-day">
<p><strong>${new Date(date).toLocaleDateString('lt-LT', { weekday: 'long' })}</strong></p>
<img src="${icon}" alt="${condition}">
<div class="high-temp">${Math.round(maxTemp)}°
<div class="low-temp">${Math.round(minTemp)}°</div>
</div>
<div class="low-temp2">${Math.round(minTemp)}°</div>
<p>${condition}</p>
</div>`;

        forecastInfo.innerHTML += dayFc;
    })
    main.append(forecastInfo);
}





