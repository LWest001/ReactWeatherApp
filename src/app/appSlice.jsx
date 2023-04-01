import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import countriesJson from "../assets/data/countries.json";
import getWindDirection from "../functions/getWindDirection";

export const initialState = {
  status: "idle",
  view: "LocationForm", // LocationForm | ResultsPage
  dataView: "Now", // "Now" | "Hourly" | "Daily"
  location: {
    postalCode: null,
    city: null,
    state: null,
    country: { name: "United States", code: "US" },
  },
  units: "imperial",
  coordinates: { lat: null, lon: null },
  isValidLocation: false,
  backgroundImage: null,
  weatherData: {
    currentData: {
      Weather: null,
      Temperature: null,
      "Feels like": null,
      Sunrise: null,
      Sunset: null,
      "Wind speed": null,
      "Wind direction": null,
      Humidity: null,
      "UV index": null,
      Time: null,
      Date: null,
      Weekday: null,
      daySegment: null,
      icon: null,
      weatherType: null,
    },
    hourlyData: [],
    dailyData: [],
  },
};

/*     GET COORDINATES
 *     Return coordinates {latitude, longitude} object based on zipcode.
 */

export const getCoordinates = createAsyncThunk(
  "app/getCoordinates",
  async ({ postalCode, countryCode }) => {
    const url = `/.netlify/functions/fetch-weather?zipCode=${postalCode}&countryCode=${countryCode}`;
    try {
      const response = await fetch(url);
      if (response.ok) {
        const { lat, lon } = await response.json();
        const coordinates = {
          lat,
          lon,
        };
        return coordinates;
      } else {
        throw "Invalid location information";
      }
    } catch (error) {
      console.error(error);
    }
  }
);

/*    GET LOCATION FROM COORDINATES
 *    Return location name object based on coordinates
 */

export const getLocationFromCoordinates = createAsyncThunk(
  "app/getLocationFromCoordinates",
  async ({ lat, lon }) => {
    const url = `/.netlify/functions/fetch-reverseGeocoding?lat=${lat}&lon=${lon}&limit=1`;
    try {
      const response = await fetch(url);
      if (response.ok) {
        const responseObject = await response.json();
        const location = responseObject;
        return location;
      } else {
        return "invalidCoordinates";
      }
    } catch (error) {
      console.log(error);
    }
  }
);

/*     GET LOCAL WEATHER DATA
 *     Return object of relevant local weather data for submitted location
 */

export const getLocalWeatherData = createAsyncThunk(
  "app/getLocalWeatherData",
  async ({ lat, lon, units }) => {
    const url = `/.netlify/functions/fetch-weatherData?latitude=${lat}&longitude=${lon}&units=${units}`;
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
          return formatData(day, timezone, "day");
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
  }
);

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setStatus: {
      reducer(state, action) {
        state.status = action.payload;
      },
    },
    setView: {
      reducer(state, action) {
        state.view = action.payload;
      },
    },
    setDataView: {
      reducer(state, action) {
        state.dataView = action.payload;
      },
    },
    setLocation: {
      reducer(state, action) {
        state.location = action.payload;
      },
    },
    setUnits: {
      reducer(state, action) {
        state.units = action.payload;
      },
    },
    setCoordinates: {
      reducer(state, action) {
        state.coordinates = action.payload;
      },
    },
    setIsValidLocation: {
      reducer(state, action) {
        state.isValidLocation = action.payload;
      },
    },
    setBackgroundImage: {
      reducer(state, action) {
        state.backgroundImage = action.payload;
        document.querySelector(
          ":root"
        ).style.backgroundImage = `url(${state.backgroundImage})`;
      },
    },
    setWeatherData: {
      reducer(state, action) {
        state.weatherData = action.payload;
      },
    },
    resetState: {
      reducer(state) {
        state = initialState;
      },
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getCoordinates.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getCoordinates.fulfilled, (state, action) => {
        if (action.payload) {
          state.status = "succeeded";
          state.coordinates = action.payload;
        } else {
          state.status = "error";
        }
      })
      .addCase(getCoordinates.rejected, (state, action) => {
        state.status = "error";
      })
      .addCase(getLocalWeatherData.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getLocalWeatherData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.weatherData = {
          currentData: action.payload.currentData,
          hourlyData: action.payload.hourlyData,
          dailyData: action.payload.dailyData,
        };
        state.view = "ResultsPage";
      })
      .addCase(getLocationFromCoordinates.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getLocationFromCoordinates.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isValidLocation = true;
        const country = countriesJson.find(
          (country) => country.code === action.payload[0].country
        );

        state.location = {
          ...state.location,
          city: action.payload[0].name,
          state: action.payload[0].state,
          country: {
            code: country.code,
            name: country.name,
          },
        };
      })
      .addCase(getLocationFromCoordinates.rejected, (state, action) => {
        state.status = "error";
      });
  },
});

function formatData(object, timezone, dataType) {
  // Items for use within new object
  let sunriseTime;
  let sunsetTime;

  // Set options for use in getDateObject function
  let options = {
    timeZone: timezone,
  };

  if (dataType === "current") {
    options.timeStyle = "short";
  }

  if (dataType === "hour") {
    options.hour = "numeric";
  }

  function getDateObject(property, options, format = "time") {
    if (format === "date") {
      return new Date(object[property] * 1000).toLocaleDateString(
        "en-US",
        options
      );
    }
    return new Date(object[property] * 1000).toLocaleTimeString(
      "en-US",
      options
    );
  }

  let date = getDateObject(
    "dt",
    { timeZone: timezone, weekday: "short", day: "numeric", month: "short" },
    "date"
  );
  let weekday = getDateObject(
    "dt",
    { timeZone: timezone, weekday: "short" },
    "date"
  );
  let time = getDateObject("dt", options);
  if (dataType === "current") {
    sunriseTime = getDateObject("sunrise", options);
    sunsetTime = getDateObject("sunset", options);
  }

  const weather = object["weather"][0];
  const icon = `/icon/${weather.icon}.png`;
  const daySegment = weather["icon"][2];

  // build object to display in list
  function buildObject() {
    const product = {
      Weather: `${weather["main"]} (${weather["description"]})`,
      Temperature: Math.round(object["temp"]) + "\xB0 F",
      "Feels like": null,
      Sunrise: null,
      Sunset: null,
      "Wind speed": null,
      "Wind direction": null,
      Humidity: null,
      "UV index": null,
      Time: time,
      Date: date,
      Weekday: weekday,
    };
    if (dataType === "current") {
      product["Feels like"] = Math.round(object["feels_like"]) + "\xB0 F";
      product["Sunrise"] = sunriseTime;
      product["Sunset"] = sunsetTime;
      product["Wind speed"] = Math.round(object["wind_speed"]) + " mph";
      product["Wind direction"] = getWindDirection(object["wind_deg"]);
      product["Humidity"] = object["humidity"] + "%";
      product["UV index"] = object["uvi"];
      product["daySegment"] = daySegment;
    } else if (dataType === "day") {
      product["Min"] = Math.round(object.temp.min) + "\xB0 F";
      product["Max"] = Math.round(object.temp.max) + "\xB0 F";
    }
    return product;
  }

  const returnObj = {
    ...buildObject(),
    icon: icon,
    weatherType: weather.main,
  };

  return returnObj;
}

export const selectView = (state) => state.app.view;
export const selectDataView = (state) => state.app.dataView;
export const selectLocation = (state) => state.app.location;
export const selectUnits = (state) => state.app.units;
export const selectCoordinates = (state) => state.app.coordinates;
export const selectIsValidLocation = (state) => state.app.isValidLocation;
export const selectBackgroundImage = (state) => state.app.backgroundImage;
export const selectWeatherData = (state) => state.app.weatherData;
export const selectCurrentWeatherData = (state) =>
  state.app.weatherData.currentData;
export const selectHourlyWeatherData = (state) =>
  state.app.weatherData.hourlyData;
export const selectDailyWeatherData = (state) =>
  state.app.weatherData.dailyData;
export const selectStatus = (state) => state.app.status;

export const {
  setBackgroundImage,
  setCoordinates,
  setIsValidLocation,
  setLocation,
  setStatus,
  setUnits,
  setView,
  setWeatherData,
  setDataView,
} = appSlice.actions;
export default appSlice.reducer;
