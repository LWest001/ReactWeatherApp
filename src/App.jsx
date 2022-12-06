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
  return (
    <div className="App">
      <MainDiv />
    </div>
  );
}

export default App;
