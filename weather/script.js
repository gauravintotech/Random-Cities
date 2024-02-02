const citySelect = document.getElementById("city-select");
const getWeatherButton = document.getElementById("get-weather");
const weatherDisplay = document.getElementById("weather-display");

const apiKey = '38be199464d350a6eda9769f8f1060af';
const apiUrl = `https://api.openweathermap.org/data/2.5/weather`;

citySelect.addEventListener("change", () => {
    getWeatherButton.disabled = false;
});

getWeatherButton.addEventListener("click", async() => {
    const cityName = citySelect.value;
    const response = await fetch(`${apiUrl}?q=${cityName}&appid=${apiKey}`);
    const data = await response.json();

    if (data.cod === "404") {
        weatherDisplay.textContent = "City not found. Please try again.";
    } else {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;

        weatherDisplay.innerHTML = `
      <h2>${name}</h2>
      <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
      <p>Temperature: ${temp}°C</p>
      <p>Humidity: ${humidity}%</p>
      <p>Wind Speed: ${speed} m/s</p>
    `;
    }
});