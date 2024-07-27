const API_KEY = "your_api_key_here";
const API_BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

// DOM Elements
const elements = {
  city: document.querySelector("#city"),
  temperature: document.querySelector(".temp"),
  windSpeed: document.querySelector(".speedTemp"),
  humidity: document.querySelector(".humidityTemp"),
  maxTemp: document.querySelector(".maxTemp"),
  minTemp: document.querySelector(".minTemp"),
  description: document.querySelector("#weather"),
  date: document.querySelector("#date"),
  input: document.querySelector(".input"),
  button: document.getElementById("Btn"),
  mainBox: document.getElementById("main-box") // Add this line
};

async function fetchWeatherData(city) {
  try {
    if (!city) {
      throw new Error('Please enter a valid city name.');
    }
    const response = await fetch(`${API_BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
    if (!response.ok) {
      throw new Error('City not found. Please check the spelling and try again.');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching weather data:', error);
    alert(error.message);
  }
}

async function fetchWeatherDataByCoords(lat, lon) {
  try {
    const response = await fetch(`${API_BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
    if (!response.ok) {
      throw new Error('Unable to fetch weather data for your location.');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching weather data:', error);
    alert(error.message);
  }
}

function setBackgroundImage(weatherDescription) {
  const backgroundImages = {
    'clear sky': 'url("./image/clear-sky.avif")',
    'few clouds': 'url("./image/few-clouds.avif")',
    'scattered clouds': 'url("./image/scattered-clouds.avif")',
    'broken clouds': 'url("./image/broken-clouds.avif")',
    'shower rain': 'url("./image/shower-rain.avif")',
    'rain': 'url("./image/rain.avif")',
    'thunderstorm': 'url("./image/thunderstorm.avif")',
    'snow': 'url("./image/snow.avif")',
    'mist': 'url("./image/mist.avif")'
  };

  const defaultBackground = 'url("./image/rain.avif")';
  
  elements.mainBox.style.backgroundImage = backgroundImages[weatherDescription.toLowerCase()] || defaultBackground;
  elements.mainBox.style.backgroundSize = 'cover';
  elements.mainBox.style.backgroundPosition = 'center';
}

function updateWeatherUI(data) {
  elements.city.textContent = `${data.name}, ${data.sys.country}`;
  elements.temperature.textContent = `${Math.round(data.main.temp)}°C`;
  elements.windSpeed.textContent = `${data.wind.speed.toFixed(1)} km/h`;
  elements.humidity.textContent = `${data.main.humidity}%`;
  elements.maxTemp.textContent = `${Math.round(data.main.temp_max)}°`;
  elements.minTemp.textContent = `${Math.round(data.main.temp_min)}°`;

  const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  const description = data.weather[0].description;
  elements.description.innerHTML = `
    <img src="${iconUrl}" alt="${description}" width="60"> 
    <b>${description.charAt(0).toUpperCase() + description.slice(1)}</b>
  `;

  elements.date.textContent = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Set background image based on weather description
  setBackgroundImage(description);
}

async function handleWeatherSearch(e) {
  e.preventDefault();
  const city = elements.input.value.trim();
  if (city) {
    const weatherData = await fetchWeatherData(city);
    if (weatherData) {
      updateWeatherUI(weatherData);
      elements.input.value = '';
    }
  }
}

function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    } else {
      reject(new Error("Geolocation is not available in your browser."));
    }
  });
}

async function showCurrentLocationWeather() {
  try {
    const position = await getCurrentLocation();
    const { latitude, longitude } = position.coords;
    const weatherData = await fetchWeatherDataByCoords(latitude, longitude);
    if (weatherData) {
      updateWeatherUI(weatherData);
    }
  } catch (error) {
    console.error("Error getting current location weather:", error);
    alert("Unable to get your current location. Please search for a city manually.");
  }
}

// Event Listeners
elements.button.addEventListener("click", handleWeatherSearch);
elements.input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    handleWeatherSearch(e);
  }
});

// Initial weather data for current location
document.addEventListener('DOMContentLoaded', showCurrentLocationWeather);