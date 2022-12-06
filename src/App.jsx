import "./App.css";
import { MainDiv } from "./Container/MainDiv/MainDiv";
import "./MainDiv.css";
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
  const [isValidPostalCode, setIsValidPostalCode] = useState(false);
  return (
    <div className="App">
      <MainDiv />
    </div>
  );
}

export default App;
