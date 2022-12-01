import "./MainDiv.css";
import "../../Component/CountrySelector/CountrySelector";
import { LocationForm } from "../../Component/LocationForm/LocationForm";
import React, { useState, useEffect } from "react";
import { ResultsPage } from "../ResultsPage/ResultsPage";
import { getCoordinates, getLocalWeatherData } from "../../API/OpenWeather";
import { getLocationString } from "../../API/ZipCodeBase";

export const MainDiv = () => {
  // State setters
  const [toggleView, setToggleView] = useState("LocationForm");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("US");
  const [units, setUnits] = useState("");
  const [locationString, setLocationString] = useState("Loading...");
  const [coordinates, setCoordinates] = useState("");
  const [localWeatherData, setLocalWeatherData] = useState({});

  // Set units to imperial for US, Liberia, and Myanmar
  useEffect(() => {
    setUnits(
      country === "US" || country === "LR" || country === "MM"
        ? "imperial"
        : "metric"
    );
  }, [country]);

  // Set coordinates and location string when a 5-digit code is entered.
  useEffect(() => {
    if (postalCode.length === 5 && country === "US") {
      getLocationString(postalCode, country).then((locationString) =>
        setLocationString(locationString)
      );
      getCoordinates(postalCode, country)
        .then((coordinates) => setCoordinates(coordinates))
        .then(() => {
          document.querySelector("#submit").disabled = "true";
        });
    } else {
      setLocationString("");
      setCoordinates("");
    }
  }, [postalCode]);

  // Enable submit button when coordinates
  useEffect(() => {
    const submitButton = document.querySelector("#submit");
    coordinates
      ? (submitButton.disabled = false)
      : (submitButton.disabled = true);
  }, [coordinates]);

  const gatherData = () => {
    if (coordinates) {
      getLocalWeatherData(coordinates.latitude, coordinates.longitude, units)
        .then((localWeather) => setLocalWeatherData(localWeather))
        .catch((error) => console.log(error));
    }
  };

  // Event handlers
  const handleSubmit = (e) => {
    e.preventDefault();
    gatherData();
    // Switch view
    setToggleView("ResultsPage");
  };

  const handleReturnHome = (e) => {
    setToggleView("LocationForm");
    setLocationString("Loading...");
    setPostalCode("");
    setCoordinates("");
    setLocalWeatherData({});
    setCountry("US");
  };

  return (
    <div className="MainDiv">
      <LocationForm
        postalCode={postalCode}
        country={country}
        setPostalCode={setPostalCode}
        setCountry={setCountry}
        handleSubmit={handleSubmit}
        toggleView={toggleView}
      />
      <ResultsPage
        toggleView={toggleView}
        onClick={handleReturnHome}
        locationString={locationString}
        localWeatherData={localWeatherData}
      />
    </div>
  );
};
