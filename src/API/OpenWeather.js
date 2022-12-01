import { openWeatherKey as apiKey } from "../assets/data/config";

const openWeatherUrl = "https://api.openweathermap.org";
const authQuery = `&appid=${apiKey}`;

/*     GET COORDINATES
 *     Return coordinates {latitude, longitude} object based on zipcode.
 */
export const getCoordinates = async (zipCode, countryCode) => {
  // build fetch url
  const geolocationZipQuery = `/geo/1.0/zip?zip=${zipCode},${countryCode}`;
  const fetchUrl = `${openWeatherUrl}${geolocationZipQuery}${authQuery}`;

  // process fetch data
  try {
    const response = await fetch(fetchUrl);
    if (response.ok) {
      const responseObject = await response.json();
      const coordinates = {
        latitude: responseObject["lat"],
        longitude: responseObject["lon"],
      };
      return coordinates;
    } else {
      alert("Please enter valid postal code/country combination.");
    }
  } catch (error) {
    console.log(error);
  }
};

/*     GET LOCAL WEATHER DATA
 *     Return object of relevant local weather data for submitted location
 */

export const getLocalWeatherData = async (latitude, longitude, units) => {
  // build fetch url
  const exclusions = "minutely,hourly,daily,alerts";
  const coordinateQuery = `/data/3.0/onecall?lat=${latitude}&lon=${longitude}`;
  const paramsQuery = `&units=${units}&exclude=${exclusions}`;
  const fetchUrl = `${openWeatherUrl}${coordinateQuery}${paramsQuery}${authQuery}`;
  // process fetch data
  try {
    const response = await fetch(fetchUrl);
    if (response.ok) {
      const responseObject = await response.json();
      const timezone = responseObject["timezone"];
      const formattedDataObject = formatData(
        responseObject["current"],
        timezone
      );
      return formattedDataObject;
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

  // to deal with minute values under 10
  const fixMinutes = (getMinutesVal) => {
    if (getMinutesVal < 10) {
      return `0${getMinutesVal}`;
    } else {
      return getMinutesVal;
    }
  };

  // build object to display in list
  const formattedObject = {
    Date: date,
    Time: time,
    Sunrise: sunriseTime,
    Sunset: sunsetTime,
    Temperature: object["temp"] + " F",
    "Feels like": object["feels_like"] + " F",
    Humidity: object["humidity"] + "%",
    "UV index": object["uvi"],
    "Wind speed": object["wind_speed"] + "mph",
    Weather: `${weather["main"]} (${weather["description"]})`,
  };
  return formattedObject;
};
