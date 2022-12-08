const openWeatherUrl = "https://api.openweathermap.org";

/*     GET COORDINATES
 *     Return coordinates {latitude, longitude} object based on zipcode.
 */
export const getCoordinates = async (zipCode, countryCode) => {
  const url = `/.netlify/functions/fetch-weather?zipCode=${zipCode}&countryCode=${countryCode}`;
  try {
    const response = await fetch(url);
    if (response.ok) {
      const responseObject = await response.json();
      const coordinates = {
        latitude: responseObject["lat"],
        longitude: responseObject["lon"],
      };
      return coordinates;
    } else {
      return "invalidZip";
    }
  } catch (error) {
    console.log(error);
  }
};

/*     GET LOCAL WEATHER DATA
 *     Return object of relevant local weather data for submitted location
 */

export const getLocalWeatherData = async (latitude, longitude, units) => {
  const url = `/.netlify/functions/fetch-weatherData?latitude=${latitude}&longitude=${longitude}&units=${units}`;
  // process fetch data
  try {
    const response = await fetch(url);
    if (response.ok) {
      const responseObject = await response.json();
      const timezone = responseObject["timezone"];
      const currentData = formatData(responseObject.current, timezone);
      const returnObject = {
        currentData: currentData,
      };
      return returnObject
    }
  } catch (error) {
    console.log(error);
  }
};

const formatData = (object, timezone) => {
  // Items for use within new object
  let date = new Date(object["dt"] * 1000);
  date = date.toLocaleDateString("en-US", { timeZone: timezone });

  let time = new Date(object["dt"] * 1000);
  time = time.toLocaleTimeString("en-US", { timeZone: timezone });

  let sunriseTime = new Date(object["sunrise"] * 1000);
  sunriseTime = sunriseTime.toLocaleTimeString("en-US", { timeZone: timezone });

  let sunsetTime = new Date(object["sunset"] * 1000);
  sunsetTime = sunsetTime.toLocaleTimeString("en-US", { timeZone: timezone });

  const weather = object["weather"][0];

  // build object to display in list
  const formattedObject = {
    Weather: `${weather["main"]} (${weather["description"]})`,
    Temperature: object["temp"] + " F",
    Sunrise: sunriseTime,
    Sunset: sunsetTime,
    "Feels like": object["feels_like"] + " F",
    Humidity: object["humidity"] + "%",
    "UV index": object["uvi"],
    "Wind speed": object["wind_speed"] + "mph",
    Time: time,
    Date: date,
  };

  const icon = `http://openweathermap.org/img/wn/${weather["icon"]}@4x.png`;
  const daySegment = weather["icon"][2];

  const returnObj = {
    text: formattedObject,
    icon: icon,
    weather: weather.main,
    daySegment: daySegment,
  };

  return returnObj;
};
