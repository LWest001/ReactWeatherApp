# ReactWeatherApp

**Live production build here: https://amazing-starlight-c69366.netlify.app/.**

This frontend web application delivers local weather information based on postal code using the [OpenWeather API](https://openweathermap.org/) and [ZipCodeBase API](https://zipcodebase.com/). It is built using [React](https://reactjs.org/) and some vanilla Javascript.


## Features
- Lookup by postal code
- Current and hourly weather data
- Filter data type using the slider at the top of the results page
- Dynamic background image based on current weather and day vs. night
- Desktop and mobile support

## Planned features
- International support (currently US only)
- 7-day forecast weather data
- Lookup by other location parameters (eg. city or region)
- Lookup using HTML Geolocation API
- Persistent user data in browser based on previous lookup

## Current limitations and known bugs
- The country selector works but only US lookup is available
- - Submit button does not disable/no user error message is displayed when a non-US country is selected
- The 'Daily' portion of the slider just displays the hourly data (7-day forecast not yet implemented)
- Slider tick labels do not display on Safari for iOS

Currently only US postal codes are compatible with the app.

All code written by Leo Westebbe.
