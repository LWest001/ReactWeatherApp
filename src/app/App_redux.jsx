import "./App.css";
import { LocationForm_redux } from "../Container/LocationForm/LocationForm_redux";
import { useEffect } from "react";
import { ResultsPage_redux } from "../Container/ResultsPage/ResultsPage_redux";
import { backgroundSelector } from "../functions/backgroundSelector";

import {
  // Fetch functions
  getCoordinates,
  getLocalWeatherData,
  getLocationFromCoordinates,
  // State setters
  setBackgroundImage,
  setIsValidLocation,
  setStatus,
  setCoordinates,
  setLocation,
  setUnits,
  setView,
  setWeatherData,
  // State selectors
  selectBackgroundImage,
  selectCoordinates,
  selectIsValidLocation,
  selectLocation,
  selectUnits,
  selectView,
  selectWeatherData,
  selectStatus,
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
  const status = useSelector(selectStatus);

  // Set units to imperial for US, Liberia, and Myanmar
  useEffect(() => {
    setUnits(
      country.code === "US" || country.code === "LR" || country.code === "MM"
        ? "imperial"
        : "metric"
    );
  }, [country]);

  // Set status and get coordinates when a 5-digit code is entered (US)
  useEffect(() => {
    if (country.code === "US") {
      if (postalCode.length === 5) {
        dispatch(getCoordinates({ postalCode, countryCode: country.code }));
      }
      if (postalCode.length < 5) {
        dispatch(setStatus("idle"));
        dispatch(setIsValidLocation(false));
      }
      if (postalCode.length > 5) {
        dispatch(setStatus("error"));
        dispatch(setIsValidLocation(false));
      }
    }
  }, [postalCode]);

  // Get location when coordinates are valid
  useEffect(() => {
    if (coordinates?.latitude) {
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

  // Event handlers
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
    dispatch(setStatus("idle"));
    dispatch(setIsValidLocation(false));
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
      {view === "LocationForm" && <LocationForm_redux />}
      {view === "ResultsPage" && (
        <ResultsPage_redux onClick={handleReturnHome} />
      )}
    </div>
  );
}

export default App_redux;
