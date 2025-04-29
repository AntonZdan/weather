const form = document.querySelector('form');
const city = document.querySelector('#city');
const feelsLike = document.querySelector('#feelsLike');
const temp = document.querySelector('#temp');
const images = document.querySelectorAll('.image');
const hum = document.querySelector('#humidity');
const wind = document.querySelector('#wind');
const updated = document.querySelector('#updateTime');
const input = document.querySelector('input');

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
})

// 7 dienu oru prognoze

const getWeek = async (city) => {
    const response = await fetch(`${url}/forecast.json?key=${apiKey}&q=${city}&days=7`);
    const data = await response.json()
    return data
}



