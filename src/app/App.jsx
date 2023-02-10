import "./App.css";
import { LocationForm } from "../Container/LocationForm/LocationForm";
import { useState, useEffect } from "react";
import { ResultsPage } from "../Container/ResultsPage/ResultsPage";
import {
  getCoordinates,
  getLocalWeatherData,
  getLocationFromCoordinates,
} from "../API/OpenWeather";
import { backgroundSelector } from "../functions/backgroundSelector";
import stateCodes from "../assets/data/stateCodes.json";



function App() {
  // State setters
  const [toggleView, setToggleView] = useState("LocationForm");
  const [location, setLocation] = useState({
    postalCode: "",
    city: "",
    state: "",
    country: { name: "United States", code: "US" },
  });
  const [countryCode, setCountryCode] = useState("US");
  const [country, setCountry] = useState("United States");
  const [units, setUnits] = useState("");
  const [locationString, setLocationString] = useState("");
  const [coordinates, setCoordinates] = useState("");
  const [isValidLocation, setIsValidLocation] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState("");
  const [dataType, setDataType] = useState("Now");
  const [currentData, setCurrentData] = useState({
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
    icon: "",
    daySegment: "",
    weatherType: "",
  });
  const [hourlyData, setHourlyData] = useState([]);
  const [dailyData, setDailyData] = useState([]);
  const [status, setStatus] = useState("idle");

  // Set units to imperial for US, Liberia, and Myanmar
  useEffect(() => {
    setUnits(
      countryCode === "US" || countryCode === "LR" || countryCode === "MM"
        ? "imperial"
        : "metric"
    );
  }, [countryCode]);

  // Set coordinates when a 5-digit code is entered.
  useEffect(() => {
    if (location.postalCode.length === 5 && countryCode === "US") {
      setStatus("loading");
      getCoordinates(location.postalCode, countryCode).then((coordinates) => {
        setCoordinates(coordinates);
      });
    } else {
      setLocationString("");
      setCoordinates("");
    }
  }, [location.postalCode, countryCode]);

  useEffect(() => {
    if (coordinates) {
      getLocationFromCoordinates(
        coordinates.latitude,
        coordinates.longitude
      ).then((locationString) => {
        setStatus("succeeded");
        const city = locationString[0].name;
        let state = locationString[0].state;
        state = stateCodes[state];
        setLocationString(city + ", " + state);
      });
    } else {
      setStatus("idle");
    }
  }, [coordinates]);

  useEffect(() => {
    if (coordinates) {
      getLocationFromCoordinates(
        coordinates.latitude,
        coordinates.longitude
      ).then((locationString) => {
        const city = locationString[0].name;
        let state = locationString[0].state;
        state = stateCodes[state];
        setLocationString(city + ", " + state);
      });
    }
  }, [coordinates]);

  // Set isValidLocation when coordinates load
  useEffect(() => {
    if (location.postalCode.length === 5 && coordinates) {
      setIsValidLocation(true);
    } else {
      setIsValidLocation(false);
    }
  }, [coordinates]);

  // Set location if coordinates loaded by geolocation
  useEffect(() => {
    if (coordinates) {
      getLocationFromCoordinates(
        coordinates.latitude,
        coordinates.longitude
      ).then((location) => {
        setLocationString(
          location[0].name + ", " + stateCodes[location[0].state]
        );
        setIsValidLocation(true);
      });
    }
  }, [coordinates]);

  // Enable or disable submit button
  useEffect(() => {
    const submitButton = document.querySelector("#submit");
    isValidLocation
      ? (submitButton.disabled = false)
      : (submitButton.disabled = true);
  }, [isValidLocation]);

  const gatherData = () => {
    if (coordinates) {
      setStatus("loading");
      return getLocalWeatherData(
        coordinates.latitude,
        coordinates.longitude,
        units
      )
        .then((localWeather) => {
          setStatus("succeeded");
          setCurrentData({
            ...localWeather.currentData.text,
            icon: localWeather.currentData.icon,
            daySegment: localWeather.currentData.daySegment,
            weatherType: localWeather.currentData.weather,
          });
          setHourlyData(localWeather.hourlyData);
          setDailyData(localWeather.dailyData);
        })
        .catch((error) => console.log(error))
        .finally(window.scroll(0, 0));
    }
  };

  // Set background based on weather and day segment
  useEffect(() => {
    setBackgroundImage(
      backgroundSelector(currentData.weatherType, currentData.daySegment)
    );
  }, [currentData.weatherType]);

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

  const handleGeolocate = (e) => {
    navigator.geolocation.getCurrentPosition((position) =>
      setCoordinates({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      })
    );
  };

  const handleReturnHome = (e) => {
    setToggleView("LocationForm");
    setLocationString("");
    setCoordinates("");
    setCurrentData({});
    setCountryCode("US");
    setCountry("United States");
    setBackgroundImage("");
    setHourlyData([]);
    window.scroll(0, 0);
  };

  return (
    <div className="App">
      {toggleView === "LocationForm" && (
        <LocationForm
          countryCode={countryCode}
          country={country}
          location={location}
          setLocation={setLocation}
          setCountryCode={setCountryCode}
          setCountry={setCountry}
          locationString={locationString}
          handleSubmit={handleSubmit}
          coordinates={coordinates}
          handleGeolocate={handleGeolocate}
          status={status}
        />
      )}
      {toggleView === "ResultsPage" && (
        <ResultsPage
          onClick={handleReturnHome}
          locationString={locationString}
          currentData={currentData}
          icon={currentData.icon}
          dataType={dataType}
          setDataType={setDataType}
          hourlyData={hourlyData}
          dailyData={dailyData}
        />
      )}
    </div>
  );
}

export default App;
