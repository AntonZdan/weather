
const input = document.querySelector('#text');
const form = document.querySelector('form');
const city = document.querySelector('#city');
const feelsLike = document.querySelector('#feelsLike');
const temp = document.querySelector('#temp');

const apiKey = 'b601a9f2877747f6ba7165927252804';
const url = `http://api.weatherapi.com/v1`;


const get = async (city) => {
    const response = await fetch(`${url}/current.json?key=${apiKey}&q=${city}`)
    const data = await response.json()
    return data
}
console.log(get('London'));

const cityWeather = async () =>{
    const data = await get('London');
    const push = document.querySelector('.mainPage');

    const cityName = data.location.name;
    const currentTemp = `${data.current.temp_c}°C`;
    const text = data.current.condition.text;
    const icon = data.current.condition.icon;
    const feelsLikeC = `Feels like: ${data.current.feelslike_c}°C`;
    const lastUpdate = data.current.last_updated;

    const img = document.createElement('img');
    img.src = icon;
    push.append(img);
    const p = document.createElement('p');
    p.textContent = `Current temp ${currentTemp}, Feels Like: ${feelsLikeC} It is: ${text}. Last update: ${lastUpdate}`;
    push.append(p);

    city.textContent = cityName;
    feelsLike.textContent = feelsLikeC;
    temp.textContent = currentTemp;

    console.log(cityName, currentTemp, text, icon, feelsLikeC);
    console.log(lastUpdate);
}

cityWeather()

// PABANDYMASgi