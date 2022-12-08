import "./App.css";
import "./Component/CountrySelector/CountrySelector";
import { LocationForm } from "./Container/LocationForm/LocationForm";
import { useState, useEffect } from "react";
import { ResultsPage } from "./Container/ResultsPage/ResultsPage";
import { getCoordinates, getLocalWeatherData } from "./API/OpenWeather";
import { getLocationString } from "./API/ZipCodeBase";
import { backgroundSelector } from "./functions/backgroundSelector";

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
  const [backgroundImage, setBackgroundImage] = useState("");
  const [weather, setWeather] = useState("");
  const [daySegment, setDaySegment] = useState("");
  const [dataType, setDataType] = useState("Now");
  const [hourlyData, setHourlyData] = useState([]);

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
  }, [postalCode, countryCode]);

  // Set isValidPostalCode when coordinates load
  useEffect(() => {
    if (postalCode.length === 5 && coordinates !== "invalidZip") {
      setIsValidPostalCode(true);
    } else {
      setIsValidPostalCode(false);
    }
  }, [coordinates]);

  // Enable or disable submit button
  useEffect(() => {
    const submitButton = document.querySelector("#submit");
    isValidPostalCode
      ? (submitButton.disabled = false)
      : (submitButton.disabled = true);
  }, [isValidPostalCode]);

  // Set background based on weather and day segment

  const gatherData = () => {
    if (coordinates) {
      return getLocalWeatherData(
        coordinates.latitude,
        coordinates.longitude,
        units
      )
        .then((localWeather) => {
          setLocalWeatherData(localWeather.currentData.text);
          setIcon(localWeather.currentData.icon);
          setWeather(localWeather.currentData.weather);
          setDaySegment(localWeather.currentData.daySegment);
          setHourlyData(localWeather.hourlyData);
        })
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    setBackgroundImage(backgroundSelector(weather, daySegment));
  }, [weather]);

  useEffect(() => {
    document.querySelector(
      ".App"
    ).style.backgroundImage = `url(${backgroundImage})`;
  }, [backgroundImage]);

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
    setBackgroundImage("");
    setWeather("");
    setDaySegment("");
    setHourlyData([]);
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
        dataType={dataType}
        setDataType={setDataType}
        hourlyData={hourlyData}
      />
    </div>
  );
}

export default App;
