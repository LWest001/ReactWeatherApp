import "./App.css";
import "./Component/CountrySelector/CountrySelector";
import { LocationForm } from "./Component/LocationForm/LocationForm";
import React, { useState, useEffect } from "react";
import { ResultsPage } from "./Container/ResultsPage/ResultsPage";
import { getCoordinates, getLocalWeatherData } from "./API/OpenWeather";
import { getLocationString } from "./API/ZipCodeBase";

function App() {
  // State setters
  const [toggleView, setToggleView] = useState("LocationForm");
  const [postalCode, setPostalCode] = useState("");
  const [countryCode, setCountryCode] = useState("US");
  const [country, setCountry] = useState("United States");
  const [units, setUnits] = useState("");
  const [locationString, setLocationString] = useState("Loading...");
  const [coordinates, setCoordinates] = useState("");
  const [localWeatherData, setLocalWeatherData] = useState({});
  const [icon, setIcon] = useState({});
  const [isValidPostalCode, setIsValidPostalCode] = useState(false);

  // Set units to imperial for US, Liberia, and Myanmar
  useEffect(() => {
    setUnits(
      countryCode === "US" || countryCode === "LR" || countryCode === "MM"
        ? "imperial"
        : "metric"
    );
  }, [countryCode]);

  // Set coordinates and location string when a 5-digit code is entered.
  useEffect(() => {
    if (postalCode.length === 5 && countryCode === "US") {
      getLocationString(postalCode, countryCode).then((locationString) =>
        setLocationString(locationString)
      );
      getCoordinates(postalCode, countryCode).then((coordinates) =>
        setCoordinates(coordinates)
      );
    } else {
      setLocationString("");
      setCoordinates("");
    }
  }, [postalCode]);

  // Enable submit button when coordinates load
  useEffect(() => {
    const submitButton = document.querySelector("#submit");
    if (postalCode.length === 5 && coordinates !== "invalidZip") {
      setIsValidPostalCode(true);
    } else {
      setIsValidPostalCode(false);
    }
  }, [coordinates]);

  useEffect(() => {
    const submitButton = document.querySelector("#submit");
    isValidPostalCode
      ? (submitButton.disabled = false)
      : (submitButton.disabled = true);
  }, [isValidPostalCode]);

  const gatherData = () => {
    if (coordinates) {
      return getLocalWeatherData(
        coordinates.latitude,
        coordinates.longitude,
        units
      )
        .then((localWeather) => {
          setLocalWeatherData(localWeather.text);
          setIcon(localWeather.icon);
        })
        .catch((error) => console.log(error));
    }
  };

  // Event handlers
  const handleSubmit = (e) => {
    e.preventDefault();
    gatherData().then(() => setToggleView("ResultsPage"));
  };

  const handleReturnHome = (e) => {
    setToggleView("LocationForm");
    setLocationString("Loading...");
    setPostalCode("");
    setCoordinates("");
    setLocalWeatherData({});
    setCountryCode("US");
    setCountry("United States");
  };

  return (
    <div className="App">
      <LocationForm
        postalCode={postalCode}
        countryCode={countryCode}
        country={country}
        setPostalCode={setPostalCode}
        setCountryCode={setCountryCode}
        setCountry={setCountry}
        handleSubmit={handleSubmit}
        toggleView={toggleView}
        setIsValidPostalCode={setIsValidPostalCode}
        coordinates={coordinates}
      />
      <ResultsPage
        toggleView={toggleView}
        onClick={handleReturnHome}
        locationString={locationString}
        localWeatherData={localWeatherData}
        icon={icon}
      />
    </div>
  );
}

export default App;
