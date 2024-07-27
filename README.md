# Weather Application

This weather application provides real-time weather information for any city worldwide. It offers a sleek, responsive design with dynamic background images that change based on the current weather conditions.

## Features

- **Current Weather Display**: Shows temperature, humidity, wind speed, and weather description.
- **Min/Max Temperature**: Displays the day's minimum and maximum temperatures.
- **Geolocation**: Automatically fetches weather for the user's current location on page load.
- **City Search**: Allows users to search for weather information in any city.
- **Dynamic Backgrounds**: Changes the background image based on the current weather condition.
- **Responsive Design**: Adapts to various screen sizes for optimal viewing on all devices.

## How to Use

1. **Current Location Weather**:
   - When you first open the application, it will attempt to get your current location.
   - If successful, it will display the weather for your current location.

2. **Search for a City**:
   - In the search bar at the top, type the name of any city.
   - Press the search button or hit Enter to fetch the weather data for that city.

3. **Reading the Weather Card**:
   - The large number in the center shows the current temperature in Celsius.
   - Below the temperature, you'll see an icon and description of the current weather.
   - The top left shows the city name and country.
   - The top right displays the current date.
   - At the bottom, you can find:
     - Minimum temperature
     - Maximum temperature
     - Humidity percentage
     - Wind speed in km/h

## Technical Details

- The application uses the OpenWeatherMap API to fetch weather data.
- It's built with HTML, CSS, and JavaScript.
- The design uses CSS variables for easy customization of colors and styles.
- Background images are dynamically set based on the weather description.

## Error Handling

- If a city is not found or there's an issue with the API, an alert will notify the user.
- If geolocation is not available or permission is denied, the user will be prompted to search for a city manually.

## Customization

You can easily customize the appearance by modifying the CSS variables in the `:root` selector:

```css
:root {
  --text-color: white;
  --input-text-color: #333;
  --primary-color: #3498db;
  --secondary-color: #2ecc71;
  --background-color: rgba(0, 0, 0, 0.6);
}
```

## 🔗 API Key
The application uses an [OpenWeatherMap API key](https://home.openweathermap.org/api_keys). To use this application, you'll need to obtain your own API key:
- Go to the OpenWeatherMap website.
- Sign up for a free account or log in if you already have one.
- Once logged in, go to your account dashboard.
- Navigate to the "API Keys" section.
- Generate a new API key or use an existing one.
After obtaining your API key, replace the placeholder in the JavaScript code with your actual key:

```
const API_KEY = "your_api_key_here";
```