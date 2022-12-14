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
      const currentData = formatData(
        responseObject.current,
        timezone,
        "current"
      );
      const hourlyData = responseObject.hourly.map((hour) => {
        return formatData(hour, timezone, "hour");
      });
      const dailyData = responseObject.daily.map((day) => {
        return formatData(day, timezone, "current");
      });
      const returnObject = {
        currentData: currentData,
        hourlyData: hourlyData,
        dailyData: dailyData,
      };
      return returnObject;
    }
  } catch (error) {
    console.log(error);
  }
};

const formatData = (object, timezone, dataType) => {
  // Items for use within new object
  let sunriseTime;
  let sunsetTime;
  let options = {
    timeZone: timezone,
  };
  if (dataType === "current") {
    options.timeStyle = "short";
  }
  if (dataType === "hour") {
    options.hour = "numeric";
  }
  let date = new Date(object["dt"] * 1000);
  date = date.toLocaleDateString("en-US", {
    timeZone: timezone,
  });

  let time = new Date(object["dt"] * 1000);
  time = time.toLocaleTimeString("en-US", options);

  if (dataType === "current") {
    sunriseTime = new Date(object["sunrise"] * 1000);
    sunriseTime = sunriseTime.toLocaleTimeString("en-US", {
      timeZone: timezone,
      timeStyle: "short",
    });

    sunsetTime = new Date(object["sunset"] * 1000);
    sunsetTime = sunsetTime.toLocaleTimeString("en-US", {
      timeZone: timezone,
      timeStyle: "short",
    });
  }

  const weather = object["weather"][0];
  const icon = `http://openweathermap.org/img/wn/${weather["icon"]}@4x.png`;
  const daySegment = weather["icon"][2];

  // build object to display in list
  const formattedData = () => {
    if (dataType === "current") {
      return {
        Temperature: Math.round(object["temp"]) + "\xB0 F",
        Weather: `${weather["main"]} (${weather["description"]})`,
        "Feels like": object["feels_like"] + "\xB0 F",
        "Wind speed": object["wind_speed"] + "mph",
        Humidity: object["humidity"] + "%",
        Sunrise: sunriseTime,
        Sunset: sunsetTime,
        "UV index": object["uvi"],
        Time: time,
        Date: date,
      };
    } else if (dataType === "hour") {
      return {
        Weather: `${weather["main"]} (${weather["description"]})`,
        Temperature: Math.round(object["temp"]) + "\xB0 F",
        Time: time,
        Date: date,
      };
    }
  };

  const returnObj = {
    text: formattedData(),
    icon: icon,
    weather: weather.main,
    daySegment: daySegment,
  };

  return returnObj;
};
