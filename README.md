# Weather Dashboard

![Weather Dashboard Screenshot](https://github.com/Koushik890/weather-dashboard/blob/main/Initial.png)
![Weather Dashboard Screenshot](https://github.com/Koushik890/weather-dashboard/blob/main/weather_dashboard.png)

## Overview

The Weather Dashboard is a simple web application that provides real-time weather information for any city in the world. It fetches data from the OpenWeatherMap API and displays the current temperature, weather description, humidity, and wind speed. The dashboard also allows users to get weather updates based on their current location.

## Features

- **Current Weather**: Get the current weather data for any city by entering the location name.
- **Hourly Forecast**: View the weather forecast for the next 24 hours.
- **Geolocation**: Automatically fetch weather data for your current location with a single click.
- **Responsive Design**: The application is designed to be fully responsive and works well on both desktop and mobile devices.

## Technologies Used

- **HTML5**: For the structure of the web pages.
- **CSS3**: For styling and layout.
- **JavaScript**: For fetching data from the API and dynamically updating the UI.
- **Axios**: For making HTTP requests to the OpenWeatherMap API.
- **OpenWeatherMap API**: To retrieve weather data.

## How to Use

1. Clone the repository:
   ```
   git clone https://github.com/Koushik890/weather-dashboard.git
   ```
2. Navigate to the project directory:
   ```
   cd weather-dashboard
   ```
3. Open ```index.html``` in your preferred web browser.

## Configuration
You need to add your own ```OpenWeatherMap API``` key to the project to make it work. Follow these steps:
1. Create a file named ```config.js``` in the root directory.
2. Add the following code to ```config.js```:
   ```
   const config = {
    MY_API_TOKEN: 'your_openweathermap_api_key_here'
   };
   ```
3. Replace ```your_openweathermap_api_key_here``` with your actual OpenWeatherMap API key.

## Screen Recording

Below is a screen recording demonstrating the Weather Dashboard in action:

![Weather Dashboard Screen Recording](https://github.com/Koushik890/weather-dashboard/blob/main/Demonstration.mp4)

