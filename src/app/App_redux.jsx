import "./App.css";
import { LocationForm_redux } from "../Container/LocationForm/LocationForm_redux";
import { useEffect } from "react";
import { ResultsPage_redux } from "../Container/ResultsPage/ResultsPage_redux";
import { backgroundSelector } from "../functions/backgroundSelector";

import {
  getCoordinates,
  getLocalWeatherData,
  getLocationFromCoordinates,
} from "./appSlice";

import {
  selectBackgroundImage,
  selectCoordinates,
  selectIsValidLocation,
  selectLocation,
  selectUnits,
  selectView,
  selectWeatherData,
} from "./appSlice";

import {
  setBackgroundImage,
  setCoordinates,
  setLocation,
  setStatus,
  setUnits,
  setView,
  setWeatherData,
} from "./appSlice";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

function App_redux() {
  const dispatch = useDispatch();

  // selectors
  const { postalCode, country } = useSelector(selectLocation);
  const backgroundImage = useSelector(selectBackgroundImage);
  const coordinates = useSelector(selectCoordinates);
  const isValidLocation = useSelector(selectIsValidLocation);
  const units = useSelector(selectUnits);
  const view = useSelector(selectView);
  const weatherData = useSelector(selectWeatherData);

  // Set units to imperial for US, Liberia, and Myanmar
  useEffect(() => {
    setUnits(
      country.code === "US" || country.code === "LR" || country.code === "MM"
        ? "imperial"
        : "metric"
    );
  }, [country]);

  // Set coordinates when a 5-digit code is entered.
  useEffect(() => {
    if (postalCode.length === 5 && country.code === "US") {
      setStatus("loading");
      dispatch(getCoordinates({ postalCode, countryCode: country.code }));
    }
  }, [postalCode]);

  useEffect(() => {
    if (coordinates.latitude) {
      dispatch(
        getLocationFromCoordinates({
          lat: coordinates.latitude,
          lon: coordinates.longitude,
        })
      );
    }
  }, [coordinates]);

  // Enable or disable submit button
  useEffect(() => {
    const submitButton = document.querySelector("#submit");
    isValidLocation
      ? (submitButton.disabled = false)
      : (submitButton.disabled = true);
  }, [isValidLocation]);

  const gatherData = async () => {
    if (coordinates.latitude) {
      setStatus("loading");
      dispatch(
        getLocalWeatherData({
          lat: coordinates.latitude,
          lon: coordinates.longitude,
          units: units,
        })
      );
      window.scroll(0, 0);
    }
  };

  // Set background based on weather and day segment
  useEffect(() => {
    if (weatherData.currentData.text.Temperature) {
      const background = backgroundSelector(
        weatherData.currentData.weather,
        weatherData.currentData.daySegment
      );
      dispatch(setBackgroundImage(background));
    }
  }, [weatherData]);

  useEffect(() => {
    document.querySelector(
      ".App"
    ).style.backgroundImage = `url(${backgroundImage})`;
  }, [backgroundImage]);

  // Event handlers
  const handleSubmit = (e) => {
    e.preventDefault();
    gatherData();
    dispatch(setView("ResultsPage"));
  };

  const handleGeolocate = (e) => {
    navigator.geolocation.getCurrentPosition((position) =>
      dispatch(
        setCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      )
    );
  };

  const handleReturnHome = (e) => {
    dispatch(setView("LocationForm"));
    dispatch(setCoordinates({ latitude: "", longitude: "" }));
    dispatch(
      setWeatherData({
        currentData: {
          text: {
            Temperature: "",
            Weather: "",
            "Feels like": "",
            "Wind speed": "",
            Humidity: "",
            Sunrise: "",
            Sunset: "",
            "UV index": "",
            Time: "",
            Date: "",
          },
          icon: "",
          daySegment: "",
          weatherType: "",
        },
        hourlyData: [],
        dailyData: [],
      })
    );
    dispatch(setBackgroundImage(null));
    dispatch(
      setLocation({
        postalCode: "",
        city: "",
        state: "",
        country: { name: "United States", code: "US" },
      })
    );
    window.scroll(0, 0);
  };

  return (
    <div className="App">
      {view === "LocationForm" && (
        <LocationForm_redux
          handleSubmit={handleSubmit}
          handleGeolocate={handleGeolocate}
        />
      )}
      {view === "ResultsPage" && (
        <ResultsPage_redux onClick={handleReturnHome} />
      )}
    </div>
  );
}

export default App_redux;
